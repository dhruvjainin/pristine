#!/usr/bin/env node
// Pristine Compare: puts 2-3 HTML mocks side by side in one page, tagged A/B/C.
// Usage: node compare.mjs <a.html> <b.html> [c.html] [--recommend B] [--names "Calm,Dense,Split"]
//        [--out dir] [--no-open]
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = { out: ".pristine/compare", recommend: "", names: [], open: true };
const files = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--out") opt.out = args[++i];
  else if (a === "--recommend") opt.recommend = (args[++i] || "").toUpperCase();
  else if (a === "--names") opt.names = (args[++i] || "").split(",").map((s) => s.trim());
  else if (a === "--no-open") opt.open = false;
  else files.push(a);
}
if (files.length < 2 || files.length > 3) {
  console.error('Usage: node compare.mjs <a.html> <b.html> [c.html] [--recommend B] [--names "x,y,z"] [--out dir] [--no-open]');
  process.exit(1);
}
const tags = ["A", "B", "C"].slice(0, files.length);
if (opt.recommend && !tags.includes(opt.recommend)) {
  console.error(`--recommend must be one of ${tags.join(", ")}`);
  process.exit(1);
}

const W = 1280, H = 800; // desktop viewport; the page scales it to fit each column
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const cols = files.map((f, i) => {
  const tag = tags[i];
  const rec = tag === opt.recommend;
  const name = opt.names[i] ? ` <span class="name">${esc(opt.names[i])}</span>` : "";
  return `<section class="col${rec ? " rec" : ""}">
  <h2><span class="tag">${tag}</span>${name}${rec ? '<span class="badge">Recommended</span>' : ""}</h2>
  <div class="view"><iframe title="Option ${tag}" srcdoc="${esc(readFileSync(f, "utf8"))}"></iframe></div>
  <a class="open" href="${pathToFileURL(resolve(f)).href}" target="_blank" rel="noopener">Open ${tag} full size</a>
</section>`;
}).join("\n");

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pristine compare</title>
<style>
:root{--bg:#f6f6f4;--fg:#1a1a1a;--line:#d4d4d0;--accent:#0b6b3a;--on-accent:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#161616;--fg:#f0f0ee;--line:#3a3a38;--accent:#5ad08a;--on-accent:#0a1f13}}
*{box-sizing:border-box}
body{margin:0;padding:16px;background:var(--bg);color:var(--fg);font:15px/1.4 system-ui,sans-serif}
.grid{display:grid;grid-template-columns:repeat(${files.length},minmax(0,1fr));gap:16px}
.col{border:1px solid var(--line);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px}
.col.rec{border:2px solid var(--accent)}
h2{margin:0;font-size:16px;display:flex;align-items:center;gap:8px}
.tag{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--fg);color:var(--bg)}
.badge{margin-left:auto;padding:2px 8px;border-radius:99px;background:var(--accent);color:var(--on-accent);font-size:12px}
.view{border:1px solid var(--line);border-radius:4px;overflow:auto;height:60vh;background:#fff}
.view.scaled{overflow:hidden}
iframe{display:block;width:${W}px;height:${H}px;border:0;transform-origin:0 0}
.open{color:var(--fg);font-size:14px}
@media (max-width:900px){.grid{grid-template-columns:1fr}}
</style></head><body>
<div class="grid">
${cols}
</div>
<script>
const fit = () => document.querySelectorAll(".view").forEach((v) => {
  const k = v.clientWidth / ${W};
  v.classList.add("scaled");
  v.style.height = ${H} * k + "px";
  v.firstElementChild.style.transform = "scale(" + k + ")";
});
fit();
addEventListener("resize", fit);
</script>
</body></html>
`;

mkdirSync(opt.out, { recursive: true });
const out = resolve(join(opt.out, "compare.html"));
writeFileSync(out, page);
console.log(out);
if (opt.open) {
  try {
    execFileSync(process.platform === "darwin" ? "open" : process.platform === "win32" ? "explorer" : "xdg-open", [out], { stdio: "ignore" });
  } catch {
    console.error("Could not open a browser. Open the file above by hand.");
  }
}
