#!/usr/bin/env node
// Pristine Perf: loads a URL across a matrix of {network} x {device} x {cold, warm}, times page
// transitions, and prints medians. Same conditions every run, so before/after numbers compare.
// Usage: node perf.mjs <url> [--compare url] [--network slow3g,fast3g,4g,none] [--device mobile,desktop]
//        [--mode cold,warm] [--runs 3] [--ready css] [--steps "Label,Label"] [--content css]
//        [--storage state.json] [--cdp port] [--out dir] [--label name]
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = { compare: "", network: "fast3g,4g", device: "mobile,desktop", mode: "cold,warm", runs: 3, ready: "", steps: "", content: "main", storage: "", cdp: "", out: ".pristine/perf", label: "run" };
const urls = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "-h" || a === "--help") { usage(); process.exit(0); }
  if (a.startsWith("--")) { const k = a.slice(2); if (!(k in opt)) { console.error(`Unknown option ${a}`); process.exit(1); } opt[k] = args[++i]; }
  else urls.push(a);
}
if (!urls.length) { usage(); process.exit(1); }
if (opt.compare) urls.push(opt.compare);
opt.runs = Math.max(1, Number(opt.runs) || 3);

function usage() {
  console.log('Usage: node perf.mjs <url> [--compare url] [--network slow3g,fast3g,4g,none] [--device mobile,desktop] [--mode cold,warm] [--runs 3] [--ready css] [--steps "Label,Label"] [--content css] [--storage state.json] [--cdp port] [--out dir] [--label name]');
}

// RTT ms, down/up bytes per second. fast3g matches the common "slow 4G" lab profile.
const NETWORKS = { slow3g: [400, 62500, 62500], fast3g: [150, 200000, 93750], "4g": [70, 1125000, 375000], none: [0, -1, -1] };
const DEVICES = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, cpu: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3, mobile: true, cpu: 4, ua: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36" },
};
const pick = (list, table) => list.split(",").map(s => s.trim()).filter(Boolean).map(k => { if (!table[k]) { console.error(`Unknown value ${k}; use ${Object.keys(table).join(", ")}`); process.exit(1); } return k; });
const networks = pick(opt.network, NETWORKS), devices = pick(opt.device, DEVICES);
const modes = opt.mode.split(",").filter(m => m === "cold" || m === "warm");
const steps = opt.steps.split(",").map(s => s.trim()).filter(Boolean);

const CACHE = join(process.env.XDG_CACHE_HOME || join(homedir(), ".cache"), "pristine-capture");
function loadPlaywright() {
  for (const root of [join(process.cwd(), "package.json"), join(CACHE, "package.json")])
    for (const name of ["playwright", "playwright-core", "@playwright/test"]) { try { return createRequire(root)(name); } catch {} }
  return null;
}
let pw = loadPlaywright();
if (!pw) {
  console.error(`[pristine] Playwright not found; installing into ${CACHE} (one time)...`);
  mkdirSync(CACHE, { recursive: true });
  if (!existsSync(join(CACHE, "package.json"))) writeFileSync(join(CACHE, "package.json"), '{"private":true}');
  execFileSync("npm", ["install", "--silent", "--no-audit", "--no-fund", "playwright"], { cwd: CACHE, stdio: "inherit", shell: process.platform === "win32" });
  pw = loadPlaywright();
  if (!pw) { console.error("[pristine] Could not load Playwright."); process.exit(2); }
}
const { chromium } = pw;

// --cdp attaches to a browser the user already runs (their real network, cookies and CDN route);
// pages opened here are closed again and the browser is left running.
let browser, context;
if (opt.cdp) {
  browser = await chromium.connectOverCDP(`http://127.0.0.1:${opt.cdp}`);
  context = browser.contexts()[0] ?? await browser.newContext();
} else {
  try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "chrome" }); }
  context = await browser.newContext(opt.storage ? { storageState: opt.storage } : {});
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const median = v => { const s = v.filter(x => x != null).sort((a, b) => a - b); return s.length ? s[s.length >> 1] : null; };
const OBSERVE = `window.__pf={lcp:0,cls:0,tbt:0,long:0};
new PerformanceObserver(l=>{for(const e of l.getEntries())__pf.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)__pf.cls+=e.value}).observe({type:'layout-shift',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries()){__pf.long++;__pf.tbt+=Math.max(0,e.duration-50)}}).observe({type:'longtask',buffered:true});`;

async function openPage(network, device) {
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const [rtt, down, up] = NETWORKS[network], d = DEVICES[device];
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: rtt, downloadThroughput: down, uploadThroughput: up });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: d.cpu });
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: d.width, height: d.height, deviceScaleFactor: d.deviceScaleFactor, mobile: d.mobile });
  await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: d.mobile });
  if (d.ua) await cdp.send("Emulation.setUserAgentOverride", { userAgent: d.ua });
  await page.addInitScript(OBSERVE);
  const net = { inflight: new Set(), bytes: 0, requests: 0 };
  // The page's own responseStart skips the emulated latency, so the document's first byte is timed from CDP.
  cdp.on("Network.requestWillBeSent", e => { net.inflight.add(e.requestId); net.requests++; if (e.type === "Document" && e.request.url !== "about:blank") net.doc = { id: e.requestId, start: e.timestamp }; });
  cdp.on("Network.responseReceived", e => { if (net.doc?.id === e.requestId) net.ttfb = (e.timestamp - net.doc.start) * 1000; });
  cdp.on("Network.loadingFinished", e => { net.inflight.delete(e.requestId); net.bytes += e.encodedDataLength; });
  cdp.on("Network.loadingFailed", e => net.inflight.delete(e.requestId));
  return { page, cdp, net };
}

// Ready = the --ready selector is visible, else network quiet for 500ms after load.
async function waitReady(page, net) {
  if (opt.ready) { await page.waitForSelector(opt.ready, { state: "visible", timeout: 120000 }); return page.evaluate(() => performance.now()); }
  await page.waitForLoadState("load", { timeout: 120000 });
  let quietSince = Date.now();
  while (Date.now() - quietSince < 500) { await sleep(50); if (net.inflight.size) quietSince = Date.now(); }
  return (await page.evaluate(() => performance.now())) - 500;
}

async function load(url, network, device, mode) {
  const { page, cdp, net } = await openPage(network, device);
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: mode === "cold" });
  await cdp.send("Network.setBypassServiceWorker", { bypass: mode === "cold" });
  if (mode === "warm") { await page.goto(url); await waitReady(page, net); await sleep(2000); }
  const rows = [];
  for (let i = 0; i < opt.runs; i++) {
    await page.goto("about:blank");
    net.bytes = 0; net.requests = 0; net.doc = null; net.ttfb = null;
    await page.goto(url, { waitUntil: "commit", timeout: 120000 });
    const ready = await waitReady(page, net);
    await sleep(300);
    const m = await page.evaluate(() => {
      const n = performance.getEntriesByType("navigation")[0];
      return { fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime, lcp: __pf.lcp || null, dcl: n?.domContentLoadedEventEnd, cls: __pf.cls, tbt: __pf.tbt, sw: !!navigator.serviceWorker?.controller };
    });
    rows.push({ ...m, ttfb: net.ttfb, ready, kb: net.bytes / 1024, requests: net.requests });
  }
  const pageResult = { page, net };
  const result = { url, network, device, mode, sw: rows.some(r => r.sw) };
  for (const k of ["ttfb", "fcp", "lcp", "dcl", "ready", "tbt", "kb", "requests"]) result[k] = Math.round(median(rows.map(r => r[k])) ?? NaN);
  result.cls = +median(rows.map(r => r.cls)).toFixed(3);
  result.spread = Math.round(Math.max(...rows.map(r => r.ready)) - Math.min(...rows.map(r => r.ready)));
  return { result, pageResult };
}

// A step clicks the first visible link or button whose text is the label, then times the URL
// change and the first change of --content that stays put while the network is quiet.
async function transitions({ page, net }) {
  const out = [];
  for (const label of steps) {
    await sleep(1000);
    const readContent = () => page.evaluate(sel => document.querySelector(sel)?.innerText ?? "", opt.content).catch(() => "");
    const beforeUrl = page.url(), beforeContent = await readContent();
    // Timed on the Node clock: a full-page navigation resets the page's own clock.
    const t0 = Date.now();
    const clicked = await page.evaluate(label => {
      const el = [...document.querySelectorAll("a,button,[role=tab],[role=menuitem]")].find(e => e.innerText?.trim() === label && e.getClientRects().length);
      if (!el) return false; el.click(); return true;
    }, label);
    if (!clicked) { out.push({ label, error: "not found" }); continue; }
    let url = null, content = null, quietSince = 0;
    while (Date.now() - t0 < 30000) {
      const c = await readContent();
      if (url == null && page.url() !== beforeUrl) url = Date.now() - t0;
      if (content == null && c && c !== beforeContent) content = Date.now() - t0;
      if (content != null && !net.inflight.size) { quietSince ||= Date.now(); if (Date.now() - quietSince > 500) break; } else quietSince = 0;
      await sleep(25);
    }
    out.push({ label, url, content });
  }
  return out;
}

const results = [], flows = [];
for (const url of urls)
  for (const network of networks)
    for (const device of devices)
      for (const mode of modes) {
        const { result, pageResult } = await load(url, network, device, mode);
        results.push(result);
        if (steps.length && mode === "warm") flows.push({ url, network, device, steps: await transitions(pageResult) });
        await pageResult.page.close();
        console.error(`[pristine] ${new URL(url).host} ${network} ${device} ${mode}: ready ${result.ready}ms`);
      }
if (opt.cdp) browser.close = () => {}; else await browser.close();

const pad = (v, n) => String(v ?? "-").padStart(n);
console.log(`\n${"target".padEnd(24)}${pad("network", 8)}${pad("device", 8)}${pad("mode", 6)}${pad("ttfb", 7)}${pad("fcp", 7)}${pad("lcp", 7)}${pad("ready", 7)}${pad("±", 6)}${pad("tbt", 6)}${pad("cls", 7)}${pad("KB", 7)}${pad("req", 5)}${pad("sw", 4)}`);
for (const r of results) console.log(`${new URL(r.url).host.slice(0, 23).padEnd(24)}${pad(r.network, 8)}${pad(r.device, 8)}${pad(r.mode, 6)}${pad(r.ttfb, 7)}${pad(r.fcp, 7)}${pad(r.lcp, 7)}${pad(r.ready, 7)}${pad(r.spread, 6)}${pad(r.tbt, 6)}${pad(r.cls, 7)}${pad(r.kb, 7)}${pad(r.requests, 5)}${pad(r.sw ? "y" : "", 4)}`);
for (const f of flows) console.log(`\n${new URL(f.url).host} ${f.network} ${f.device} transitions (url / content ms): ${f.steps.map(s => s.error ? `${s.label} ${s.error}` : `${s.label} ${s.url ?? "-"}/${s.content ?? "-"}`).join(", ")}`);

mkdirSync(opt.out, { recursive: true });
const file = join(opt.out, `${opt.label}.json`);
writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), options: opt, results, flows }, null, 2));
console.log(`\nSaved ${file}`);
