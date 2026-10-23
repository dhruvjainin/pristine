// Renders public/og.png (1200x630) from the site's own type and tokens.
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { readFileSync } from "node:fs";

const cache = join(process.env.XDG_CACHE_HOME || join(homedir(), ".cache"), "pristine-capture");
const { chromium } = createRequire(join(cache, "package.json"))("playwright");
const font = (pkg, file) => `data:font/woff2;base64,${readFileSync(resolve(`node_modules/@fontsource-variable/${pkg}/files/${file}`)).toString("base64")}`;

const html = `<!doctype html><html><head><style>
@font-face { font-family: Fraunces; src: url(${font("fraunces", "fraunces-latin-wght-normal.woff2")}); font-weight: 100 900; }
@font-face { font-family: Fraunces; font-style: italic; src: url(${font("fraunces", "fraunces-latin-wght-italic.woff2")}); font-weight: 100 900; }
@font-face { font-family: Inter; src: url(${font("inter", "inter-latin-wght-normal.woff2")}); font-weight: 100 900; }
@font-face { font-family: Mono; src: url(${font("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2")}); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f5f0e6; color: #1b1916; font-family: Inter; padding: 72px 80px; display: grid; grid-template-rows: auto 1fr auto; }
.mark { display: flex; align-items: center; gap: 12px; font: 500 30px Fraunces; }
h1 { align-self: center; font: 360 72px/1.06 Fraunces; letter-spacing: -0.03em; font-variation-settings: "opsz" 144; }
em { font-style: italic; }
.foot { display: flex; justify-content: space-between; align-items: end; border-top: 1.5px solid #1b1916; padding-top: 24px; font: 400 22px Mono; color: #58524a; }
.foot b { color: #1b1916; font-weight: 600; }
.foot span.k { background: #f6dc7a; color: #1b1916; padding: 0 6px; border-radius: 4px; }
.score { font: 400 22px Mono; color: #6f685d; }
</style></head><body>
<div class="mark"><svg width="34" height="34" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.25" fill="none" stroke="#1b1916" stroke-width="1.5"/><path d="M7.5 12.5l3 3 6-7" fill="none" stroke="#1b1916" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>pristine</div>
<h1>Your agent ships UI.<br><em>Pristine</em> makes it look designed.</h1>
<div class="foot"><div>$ <b>/pristine</b> <span class="k">critique</span> · <span class="k">design</span> · <span class="k">polish</span></div><div class="score">light · dark · desktop · mobile</div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("wrote public/og.png");
