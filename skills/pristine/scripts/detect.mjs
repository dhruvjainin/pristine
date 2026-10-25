#!/usr/bin/env node
// Pristine detector: zero-dependency static scan for common web UI anti-patterns.
// Usage: node detect.mjs [paths...] [--json]
// Findings are evidence to verify in context, not verdicts.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const argv = process.argv.slice(2);
const asJson = argv.includes("--json");
const roots = argv.filter((a) => !a.startsWith("--"));
if (!roots.length) roots.push(".");

const EXT = new Set([".css", ".scss", ".sass", ".less", ".html", ".htm", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte", ".astro", ".mdx"]);
const SKIP_DIR = new Set(["node_modules", ".git", "dist", "build", "out", ".next", ".nuxt", ".svelte-kit", ".astro", ".output", "coverage", "vendor", ".pristine", ".turbo", ".vercel", "storybook-static"]);
const TOKEN_FILE = /(token|theme|variables|vars|palette|colors?)\.(css|scss|ts|js|json)$|tailwind\.config|globals?\.css$/i;

function walk(p, out) {
  let st;
  try { st = statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const e of readdirSync(p)) if (!SKIP_DIR.has(e) && !e.startsWith(".")) walk(join(p, e), out);
  } else if (EXT.has(extname(p)) && !/\.min\.|\.d\.ts$|\.test\.|\.spec\.|\.stories\./.test(p) && st.size < 1_000_000) {
    out.push(p);
  }
}
const files = [];
for (const r of roots) walk(r, files);

// ---- color helpers (for same-rule contrast) ----
function hexToRgb(h) {
  h = h.replace("#", "");
  if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 && h.length !== 8) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function parseColor(v) {
  v = v.trim().toLowerCase();
  if (v.startsWith("#")) return hexToRgb(v);
  const m = v.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:[\s,/]+([\d.]+%?))?\s*\)$/);
  if (m) { if (m[4] && parseFloat(m[4]) < 1 && !m[4].endsWith("%")) return null; return [+m[1], +m[2], +m[3]]; }
  const named = { white: [255, 255, 255], black: [0, 0, 0] };
  return named[v] || null;
}
const lum = ([r, g, b]) => {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/u;
const findings = [];
const add = (file, line, severity, rule, message) => findings.push({ file: relative(process.cwd(), file) || file, line, severity, rule, message });

// line-level rules: [rule, severity, regex, message, predicate?]
const LINE_RULES = [
  ["transition-all", "warn", /transition\s*:\s*all\b|\btransition-all\b/, "Transitions 'all' properties: animates layout/paint unintentionally; list transform/opacity explicitly."],
  ["outline-removed", "error", /outline\s*:\s*(none|0)\b|\boutline-none\b|\bfocus:outline-none\b/, "Focus outline removed; ensure a visible :focus-visible replacement exists."],
  ["tiny-text", "warn", /font-size\s*:\s*(\d+(?:\.\d+)?)px|\btext-\[(\d+(?:\.\d+)?)px\]/, "Text under 12px is hard to read.", (m) => parseFloat(m[1] ?? m[2]) < 12],
  ["slop-gradient", "warn", /(linear|radial)-gradient\([^)]*(#(?:8b5cf6|7c3aed|6d28d9|a855f7|9333ea|6366f1|4f46e5|ec4899|d946ef)|purple|violet|indigo)|\bfrom-(purple|violet|indigo|fuchsia)-\d+.*\bto-(pink|blue|indigo|purple|cyan)-\d+/i, "Purple/indigo/pink gradient: the default 'AI template' look. Justify it with DESIGN.md or replace."],
  ["gradient-text", "info", /background-clip\s*:\s*text|\bbg-clip-text\b/, "Gradient text: often decorative slop; keep only if it serves the brand and stays legible."],
  ["glassmorphism", "info", /backdrop-filter\s*:\s*blur|\bbackdrop-blur(-\w+)?\b/, "Backdrop blur (glassmorphism): costly to render and often gratuitous; check contrast and perf."],
  ["z-index-war", "warn", /z-index\s*:\s*(\d{4,})|\bz-\[(\d{4,})\]/, "z-index ≥ 1000: use a documented z-index scale."],
  ["important", "info", /!important/, "!important: specificity escape hatch; usually signals system drift."],
  ["layout-transition", "warn", /transition(?:-property)?\s*:[^;]*\b(width|height|top|left|right|bottom|margin|padding)\b/, "Transitioning layout properties drops frames; animate transform/opacity instead."],
  ["zoom-disabled", "error", /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\.0)?\b/, "Viewport disables zoom: fails WCAG 1.4.4."],
  ["lorem", "error", /lorem ipsum/i, "Placeholder lorem ipsum text."],
  ["div-button", "warn", /<(div|span)\b[^>]*\bon(Click|click)\s*=/, "Clickable div/span: use <button> or <a> for keyboard and screen-reader access.", (m, line) => !/\brole\s*=/.test(line)],
  ["img-no-alt", "error", /<img\b(?![^>]*\balt\s*=)[^>]*>/i, "<img> without alt attribute."],
  ["img-no-size", "info", /<img\b(?![^>]*\b(width|height|fill)\s*=)[^>]*>/i, "<img> without width/height: may cause layout shift (CLS)."],
  ["emoji-icon", "info", null, "Emoji used as UI icon/heading decoration: use a consistent icon set."],
  ["fixed-wide", "info", /(?<!max-|min-)width\s*:\s*(\d{4,})px|\bw-\[(\d{4,})px\]/, "Fixed width ≥1000px: likely breaks on mobile; use max-width + fluid width."],
  ["generic-font", "info", /font-family\s*:\s*['"]?(Inter|Roboto|Arial|Open Sans)['"]?\s*[,;]/i, "Default/generic font as the primary family: fine for Operate surfaces, a missed opportunity for Persuade ones."],
  ["ease-in", "warn", /\bease-in\b(?!-out)/, "ease-in on UI motion starts slow and feels sluggish; use ease-out (enter/exit) or ease-in-out (on-screen moves)."],
  ["scale-zero", "warn", /scale\(\s*0(\.0+)?\s*\)|\bscale-0\b|scale\s*:\s*0\s*[,}]/, "Animating from scale(0) looks like it appears from nowhere; start at scale(0.9–0.97) with opacity 0."],
  ["vh-100", "info", /\b100vh\b|\bh-screen\b|\bmin-h-screen\b/, "100vh is taller than the visible area on mobile; use 100dvh (app shells) or 100svh (heroes)."],
  ["heavy-blur", "info", /blur\(\s*(\d+(?:\.\d+)?)px\s*\)/, "Blur over 20px is expensive to render (especially Safari); 2–5px is usually enough.", (m) => parseFloat(m[1]) > 20],
  ["will-change-broad", "warn", /^\s*(\*|html|body)\s*\{[^}]*will-change|will-change\s*:\s*(all|auto\s*,)/, "Broad will-change wastes GPU memory; add it only to the element that animates, after you see a problem."],
  ["select-none-body", "warn", /^\s*(html|body)\s*\{[^}]*user-select\s*:\s*none/, "user-select: none on the whole page blocks copying content; apply it only to controls."],
];

const projectHas = { animation: false, reducedMotion: false };

for (const file of files) {
  let text;
  try { text = readFileSync(file, "utf8"); } catch { continue; }
  const isTokenFile = TOKEN_FILE.test(file);
  const lines = text.split("\n");
  let hexCount = 0;
  if (/@keyframes|animation\s*:|\banimate-|transition\s*:|framer-motion|motion\.\w+|gsap/.test(text)) projectHas.animation = true;
  if (/prefers-reduced-motion|motion-reduce|motion-safe|useReducedMotion/.test(text)) projectHas.reducedMotion = true;

  lines.forEach((line, i) => {
    if (line.length > 2000) return;
    for (const [rule, sev, re, msg, pred] of LINE_RULES) {
      if (rule === "emoji-icon") {
        if (/\.(jsx|tsx|html|htm|vue|svelte|astro)$/.test(file) && EMOJI.test(line) && /<(h[1-6]|button|a|li|span|div|p|label)\b[^>]*>\s*[^<]{0,4}[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(line)) add(file, i + 1, sev, rule, msg);
        continue;
      }
      const m = line.match(re);
      if (m && (!pred || pred(m, line))) add(file, i + 1, sev, rule, msg);
    }
    if (!isTokenFile) hexCount += (line.match(/#[0-9a-fA-F]{3,8}\b(?![\w-])/g) || []).filter((h) => /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(h)).length;
  });

  if (/\.(jsx|tsx|vue|svelte|astro)$/.test(file)) {
    const ghostRe = /<(\w+)\b((?:[^<>]|=>)*?\bvariant\s*=\s*["'](?:ghost|link)["'](?:[^<>]|=>)*?)>\s*([^<{}]+?)\s*<\/\1>/g;
    let g;
    while ((g = ghostRe.exec(text))) {
      if (g[3].split(/\s+/).length < 3) continue;
      add(file, text.slice(0, g.index).split("\n").length, "warn", "ghost-text-action", `Text-only ghost/link action "${g[3].slice(0, 40)}": at rest it can read as body text. Check the still capture; use outline or add an icon unless it sits in a group of actions.`);
    }
  }

  if (/\.(jsx|tsx|vue|svelte|astro)$/.test(file)) {
    const bgRe = /\b(?:\w+\.)*(?:isFetching|isRefetching|isValidating|refreshing)\s*&&\s*\(?\s*<(p|div|span|section|Alert|Callout)\b/g;
    let r;
    while ((r = bgRe.exec(text))) {
      add(file, text.slice(0, r.index).split("\n").length, "warn", "background-refresh-shift", `Background refresh flag renders a <${r[1]}>: it appears and disappears on every poll and moves the content below. Reserve the space, show it inside an existing element, or drop it.`);
    }
  }

  if (!isTokenFile && hexCount >= 8) add(file, 0, "warn", "hardcoded-colors", `${hexCount} hard-coded hex colors outside token files: route through Design System tokens.`);

  // same-rule contrast for CSS-ish blocks
  if (/\.(css|scss|sass|less|vue|svelte|astro|html|htm)$/.test(file)) {
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(text))) {
      const body = m[2];
      const fg = body.match(/(?:^|;|\s)color\s*:\s*([^;!]+)/);
      const bg = body.match(/background(?:-color)?\s*:\s*([^;!]+)/);
      if (!fg || !bg) continue;
      const a = parseColor(fg[1]), b = parseColor(bg[1]);
      if (!a || !b) continue;
      const ratio = contrast(a, b);
      if (ratio < 4.5) {
        const line = text.slice(0, m.index + Math.max(0, m[1].search(/\S/))).split("\n").length;
        add(file, line, ratio < 3 ? "error" : "warn", "low-contrast", `Contrast ${ratio.toFixed(2)}:1 for "${m[1].trim().slice(0, 60)}" (needs 4.5:1 text, 3:1 large/UI).`);
      }
    }
  }
}

if (projectHas.animation && !projectHas.reducedMotion) {
  findings.push({ file: "(project)", line: 0, severity: "warn", rule: "no-reduced-motion", message: "Animations found but no prefers-reduced-motion handling anywhere in scanned files." });
}

const order = { error: 0, warn: 1, info: 2 };
findings.sort((a, b) => order[a.severity] - order[b.severity] || a.file.localeCompare(b.file) || a.line - b.line);

if (asJson) {
  console.log(JSON.stringify({ scanned: files.length, count: findings.length, findings }, null, 2));
} else {
  const icon = { error: "✗", warn: "⚠", info: "·" };
  for (const f of findings) console.log(`${icon[f.severity]} ${f.severity.padEnd(5)} ${f.rule.padEnd(18)} ${f.file}${f.line ? `:${f.line}` : ""}  ${f.message}`);
  const c = (s) => findings.filter((f) => f.severity === s).length;
  console.log(`\nScanned ${files.length} file(s): ${c("error")} error, ${c("warn")} warn, ${c("info")} info. Verify each in context; a clean scan is not proof of quality.`);
}
process.exit(findings.some((f) => f.severity === "error") ? 1 : 0);
