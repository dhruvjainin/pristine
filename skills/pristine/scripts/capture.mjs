#!/usr/bin/env node
// Pristine Capture: screenshots a URL across {light, dark} x {desktop, mobile}.
// Usage: node capture.mjs <url|file> [--out dir] [--label name] [--selector css]
//        [--full] [--wait ms] [--dark-class name] [--dark-attr name=value] [--zoom n]
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = { out: ".pristine/captures", label: "", selector: "", full: false, wait: 800, darkClass: "", darkAttr: "", zoom: 1 };
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
  else if (a === "-h" || a === "--help") { usage(); process.exit(0); }
  else if (!target) target = a;
}
if (!target) { usage(); process.exit(1); }

function usage() {
  console.log("Usage: node capture.mjs <url|file> [--out dir] [--label name] [--selector css] [--full] [--wait ms] [--dark-class name] [--dark-attr name=value] [--zoom n]");
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
const report = { target, outDir, captures: [], dark: { mechanism: "prefers-color-scheme", differs: null }, errors: [] };
const paintByCell = {};

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
      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      const file = join(outDir, `${name}.png`);
      if (opt.selector) {
        const el = page.locator(opt.selector).first();
        await el.scrollIntoViewIfNeeded();
        await el.screenshot({ path: file });
      } else {
        await page.screenshot({ path: file, fullPage: opt.full });
      }
      report.captures.push({ cell: name, file, horizontalOverflow, consoleErrors });
      console.log(`✓ ${name}: ${file}${horizontalOverflow ? "  ⚠ horizontal overflow" : ""}${consoleErrors.length ? `  ⚠ ${consoleErrors.length} console error(s)` : ""}`);
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
if (report.dark.differs === false) {
  console.log("ℹ dark: page paints identically under the dark scheme. Either unsupported, or toggled another way (retry with --dark-class / --dark-attr).");
}
writeFileSync(join(outDir, "capture.json"), JSON.stringify(report, null, 2));
console.log(`Report: ${join(outDir, "capture.json")}`);
process.exit(report.captures.length ? 0 : 1);
