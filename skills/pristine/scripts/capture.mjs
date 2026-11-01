#!/usr/bin/env node
// Pristine Capture: screenshots a URL across {light, dark} x {desktop, mobile}.
// Usage: node capture.mjs <url|file> [--out dir] [--label name] [--selector css]
//        [--full] [--wait ms] [--dark-class name] [--dark-attr name=value] [--zoom n]
//        [--state hover|focus|active] [--pad px]
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = { out: ".pristine/captures", label: "", selector: "", full: false, wait: 800, darkClass: "", darkAttr: "", zoom: 1, state: "", pad: 0 };
let target = "";
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--out") opt.out = args[++i];
  else if (a === "--label") opt.label = args[++i];
  else if (a === "--selector") opt.selector = args[++i];
  else if (a === "--full") opt.full = true;
  else if (a === "--wait") opt.wait = Number(args[++i]);
  else if (a === "--dark-class") opt.darkClass = args[++i];
  else if (a === "--dark-attr") opt.darkAttr = args[++i];
  else if (a === "--zoom") opt.zoom = Math.max(1, Number(args[++i]) || 1);
  else if (a === "--state") opt.state = args[++i];
  else if (a === "--pad") opt.pad = Math.max(0, Number(args[++i]) || 0);
  else if (a === "-h" || a === "--help") { usage(); process.exit(0); }
  else if (!target) target = a;
}
if (!target) { usage(); process.exit(1); }
if (opt.state && !["hover", "focus", "active"].includes(opt.state)) { console.error("--state must be hover, focus or active"); process.exit(1); }
if ((opt.state || opt.pad) && !opt.selector) { console.error("--state and --pad need --selector"); process.exit(1); }

function usage() {
  console.log("Usage: node capture.mjs <url|file> [--out dir] [--label name] [--selector css] [--full] [--wait ms] [--dark-class name] [--dark-attr name=value] [--zoom n] [--state hover|focus|active] [--pad px]");
}

if (!/^[a-z]+:\/\//i.test(target)) {
  const p = resolve(target);
  if (!existsSync(p)) { console.error(`Target not found: ${target}`); process.exit(1); }
  target = pathToFileURL(p).href;
}

const CACHE = join(process.env.XDG_CACHE_HOME || join(homedir(), ".cache"), "pristine-capture");

function loadPlaywright() {
  for (const root of [join(process.cwd(), "package.json"), join(CACHE, "package.json")]) {
    for (const name of ["playwright", "playwright-core", "@playwright/test"]) {
      try { return createRequire(root)(name); } catch {}
    }
  }
  return null;
}

function run(cmd, cmdArgs, cwd) {
  execFileSync(cmd, cmdArgs, { cwd, stdio: ["ignore", "inherit", "inherit"], shell: process.platform === "win32" });
}

let pw = loadPlaywright();
if (!pw) {
  console.error(`[pristine] Playwright not found; installing into ${CACHE} (one time)...`);
  mkdirSync(CACHE, { recursive: true });
  if (!existsSync(join(CACHE, "package.json"))) writeFileSync(join(CACHE, "package.json"), '{"private":true}');
  run("npm", ["install", "--silent", "--no-audit", "--no-fund", "playwright"], CACHE);
  pw = loadPlaywright();
  if (!pw) { console.error("[pristine] Could not load Playwright. Ask the user for screenshots."); process.exit(2); }
}
const { chromium } = pw;

async function launch() {
  try { return await chromium.launch(); } catch {
    try { return await chromium.launch({ channel: "chrome" }); } catch {
      console.error("[pristine] Installing Chromium for Playwright (one time)...");
      try {
        const cli = createRequire(join(CACHE, "package.json")).resolve("playwright/cli");
        run(process.execPath, [cli, "install", "chromium"], CACHE);
      } catch {
        run("npx", ["-y", "playwright", "install", "chromium"], process.cwd());
      }
      return chromium.launch();
    }
  }
}

const viewports = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: {
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
};
// Zoom renders at a higher pixel density so small marks (icons, status dots) can be judged; layout stays the same.
if (opt.zoom > 1) {
  viewports.desktop.deviceScaleFactor = opt.zoom;
  viewports.mobile.deviceScaleFactor = Math.max(3, opt.zoom);
  if (!opt.selector) console.warn("--zoom works best with --selector; a zoomed full page is a very large image.");
}

const outDir = resolve(opt.out, opt.label || "");
mkdirSync(outDir, { recursive: true });

const browser = await launch();
const report = { target, outDir, captures: [], dark: { mechanism: "prefers-color-scheme", differs: null, applied: null }, errors: [] };
const paintByCell = {};

// The colour actually visible at the viewport centre: the topmost opaque background there, else html/body, else the canvas.
function readBackground() {
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const opaque = (el) => { const [r, g, b, a = 1] = parse(getComputedStyle(el).backgroundColor); return a >= 0.95 ? [r, g, b] : null; };
  const stack = [...document.elementsFromPoint(innerWidth / 2, innerHeight / 2), document.body, document.documentElement].filter(Boolean);
  let rgb = null, source = "canvas";
  for (const el of stack) { if ((rgb = opaque(el))) { source = el.tagName.toLowerCase(); break; } }
  if (!rgb) rgb = /dark/.test(getComputedStyle(document.documentElement).colorScheme) ? [18, 18, 18] : [255, 255, 255];
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const luminance = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  return { color: `rgb(${rgb.join(", ")})`, source, luminance: Math.round(luminance * 1000) / 1000 };
}

// Controls that sit side by side (input next to a segmented control, button next to a select) must share one height.
// Measures each control's visible box: the outermost bordered/filled wrapper (≤ 40px taller) that holds only that
// control, or a segmented group whose controls touch edge to edge. Then it
// chains boxes that overlap vertically within 48px horizontally, and reports rows whose heights differ by more than 1px.
function readRowMismatches() {
  const SEL = 'input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=range]):not([type=color]), select, button, [role=button], [role=tab], [role=combobox], [role=searchbox]';
  const visible = (r, s) => r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  const painted = (s) => parseFloat(s.borderTopWidth) > 0 && !/transparent|rgba\(0, 0, 0, 0\)/.test(s.borderTopColor)
    || !/transparent|rgba\(0, 0, 0, 0\)/.test(s.backgroundColor);
  const label = (el) => {
    const t = (el.getAttribute("aria-label") || el.placeholder || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30);
    return `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${t ? ` "${t}"` : ""}`;
  };
  const boxes = new Map();
  for (const el of document.querySelectorAll(SEL)) {
    const r0 = el.getBoundingClientRect();
    if (!visible(r0, getComputedStyle(el))) continue;
    let box = el;
    for (let p = el.parentElement, i = 0; p && p !== document.body && i < 4; p = p.parentElement, i++) {
      const r = p.getBoundingClientRect();
      if (r.height > r0.height + 40) break;
      if (!painted(getComputedStyle(p))) continue;
      const inner = [...p.querySelectorAll(SEL)].map((c) => c.getBoundingClientRect()).filter((c) => c.width > 0).sort((a, b) => a.left - b.left);
      const segmented = inner.length > 1 && inner.every((c, k) => !k || Math.abs(c.left - inner[k - 1].right) <= 2) && r.height <= Math.max(...inner.map((c) => c.height)) * 1.3;
      if (inner.length === 1 || segmented) box = p;
      else break;
    }
    if (!boxes.has(box)) boxes.set(box, { r: box.getBoundingClientRect(), name: label(el) });
  }
  const list = [...boxes.values()].sort((a, b) => a.r.left - b.r.left);
  const rows = [];
  for (const b of list) {
    const row = rows.find((row) => row.some((o) => {
      const overlap = Math.min(o.r.bottom, b.r.bottom) - Math.max(o.r.top, b.r.top);
      const gap = b.r.left - o.r.right;
      return overlap > Math.min(o.r.height, b.r.height) * 0.5 && gap >= -1 && gap <= 48;
    }));
    row ? row.push(b) : rows.push([b]);
  }
  return rows
    .filter((row) => row.length > 1 && Math.max(...row.map((b) => b.r.height)) - Math.min(...row.map((b) => b.r.height)) > 1)
    .map((row) => row.map((b) => ({ control: b.name, height: Math.round(b.r.height * 10) / 10, top: Math.round(b.r.top + scrollY) })));
}

async function applyState(page, el) {
  await el.scrollIntoViewIfNeeded();
  if (opt.state === "hover") await el.hover();
  else if (opt.state === "focus") {
    // Keyboard-style focus so :focus-visible matches.
    await page.keyboard.press("Shift");
    await el.focus();
  } else if (opt.state === "active") { await el.hover(); await page.mouse.down(); }
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const go = (y) => window.scrollTo({ top: y, behavior: "instant" });
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      go(y);
      await new Promise((r) => setTimeout(r, 120));
    }
    go(0);
    for (let i = 0; i < 20 && window.scrollY !== 0; i++) await new Promise((r) => setTimeout(r, 50));
  });
}

for (const [device, ctxOpts] of Object.entries(viewports)) {
  for (const scheme of ["light", "dark"]) {
    const name = `${device}-${scheme}`;
    const context = await browser.newContext({ ...ctxOpts, colorScheme: scheme });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    page.on("pageerror", (e) => consoleErrors.push(String(e)));
    try {
      await page.goto(target, { waitUntil: "networkidle", timeout: 45000 })
        .catch(() => page.goto(target, { waitUntil: "load", timeout: 45000 }));
      if (scheme === "dark" && (opt.darkClass || opt.darkAttr)) {
        await page.evaluate(({ cls, attr }) => {
          const el = document.documentElement;
          if (cls) el.classList.add(cls);
          if (attr) { const [k, v = ""] = attr.split("="); el.setAttribute(k, v); }
        }, { cls: opt.darkClass, attr: opt.darkAttr });
        report.dark.mechanism = opt.darkClass ? `class "${opt.darkClass}"` : `attribute ${opt.darkAttr}`;
      }
      await scrollThrough(page);
      await page.waitForTimeout(opt.wait);
      paintByCell[name] = await page.evaluate(() => {
        const h = getComputedStyle(document.documentElement), b = document.body && getComputedStyle(document.body);
        return [h.backgroundColor, h.color, b?.backgroundColor, b?.color].join("|");
      });
      const background = await page.evaluate(readBackground);
      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      const rowMismatches = await page.evaluate(readRowMismatches);
      const file = join(outDir, `${name}.png`);
      if (opt.selector) {
        const el = page.locator(opt.selector).first();
        await el.scrollIntoViewIfNeeded();
        if (opt.state) { await applyState(page, el); await page.waitForTimeout(opt.wait); }
        if (opt.pad) {
          const box = await el.boundingBox();
          const vp = page.viewportSize();
          const x = Math.max(0, box.x - opt.pad), y = Math.max(0, box.y - opt.pad);
          await page.screenshot({ path: file, clip: {
            x, y, width: Math.min(vp.width, box.x + box.width + opt.pad) - x, height: Math.min(vp.height, box.y + box.height + opt.pad) - y,
          } });
        } else {
          await el.screenshot({ path: file });
        }
        if (opt.state === "active") await page.mouse.up();
      } else {
        await page.screenshot({ path: file, fullPage: opt.full });
      }
      const darkMissing = scheme === "dark" && background.luminance > 0.4;
      report.captures.push({ cell: name, file, state: opt.state || "rest", background, horizontalOverflow, rowMismatches, consoleErrors });
      console.log(`✓ ${name}: ${file}  bg ${background.color}${darkMissing ? "  ⚠ background is light; dark mode did not apply" : ""}${horizontalOverflow ? "  ⚠ horizontal overflow" : ""}${rowMismatches.length ? `  ⚠ ${rowMismatches.length} row(s) of controls with unequal heights` : ""}${consoleErrors.length ? `  ⚠ ${consoleErrors.length} console error(s)` : ""}`);
      for (const row of rowMismatches) console.log(`    ↳ ${row.map((b) => `${b.control} ${b.height}px`).join("  |  ")}`);
    } catch (e) {
      report.errors.push({ cell: name, error: String(e?.message || e) });
      console.error(`✗ ${name}: ${e?.message || e}`);
    }
    await context.close();
  }
}
await browser.close();

for (const d of Object.keys(viewports)) {
  const light = paintByCell[`${d}-light`], dark = paintByCell[`${d}-dark`];
  if (light && dark) report.dark.differs = Boolean(report.dark.differs) || light !== dark;
}
const darkCells = report.captures.filter((c) => c.cell.endsWith("-dark"));
if (darkCells.length) report.dark.applied = darkCells.every((c) => c.background.luminance <= 0.4);
if (report.dark.applied === false && report.dark.differs !== false) {
  console.log("⚠ dark: the scheme changed something, but the visible background is still light. Check the dark PNGs before judging dark mode; the toggle may need --dark-class / --dark-attr, or a theme script overrode it.");
}
if (report.dark.differs === false) {
  console.log("ℹ dark: page paints identically under the dark scheme. Either unsupported, or toggled another way (retry with --dark-class / --dark-attr).");
}
writeFileSync(join(outDir, "capture.json"), JSON.stringify(report, null, 2));
console.log(`Report: ${join(outDir, "capture.json")}`);
process.exit(report.captures.length ? 0 : 1);
