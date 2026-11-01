#!/usr/bin/env node
// Pristine Design Context: resolves which DESIGN.md files apply to each target.
// Usage: node design-context.mjs [paths…] [--json]
// For each path: every DESIGN.md from the repo root down to the path's directory, plus any
// file pulled in by an `Extends:` line, ordered lowest precedence first (the last one wins).
// For a directory path, also lists DESIGN.md files below it; they govern only their own subtree.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const targets = args.filter((a) => a !== "--json");
if (!targets.length) targets.push(".");

const SKIP = new Set(["node_modules", ".git", "dist", "build", "out", ".next", ".nuxt", ".svelte-kit", ".astro", ".turbo", ".vercel", "coverage", ".pristine"]);
const isDesign = (name) => name === "DESIGN.md";
const rel = (p) => relative(process.cwd(), p) || ".";

function designIn(dir) {
  try {
    const hit = readdirSync(dir).find(isDesign);
    return hit ? join(dir, hit) : null;
  } catch { return null; }
}

function repoRoot(dir) {
  for (let d = dir; ; d = dirname(d)) {
    if (existsSync(join(d, ".git"))) return d;
    if (dirname(d) === d) return null;
  }
}

function extendsOf(file) {
  const head = readFileSync(file, "utf8").split("\n").slice(0, 30).join("\n");
  const out = [];
  for (const m of head.matchAll(/^[\s>*_-]*Extends\**:?\**\s*(.+)$/gim)) {
    const line = m[1];
    const pick = [/\]\(([^)\s]+)\)/g, /`([^`]+)`/g, /(\S+?\.md)\b/gi].map((re) => [...line.matchAll(re)]);
    for (const ref of pick.find((p) => p.length) || []) {
      const p = resolve(dirname(file), ref[1]);
      const f = existsSync(p) && statSync(p).isDirectory() ? designIn(p) : p;
      out.push({ file: f, ok: !!f && existsSync(f), from: file });
    }
  }
  return out;
}

const missing = [];
function withExtends(file, chain, seen) {
  if (seen.has(file)) return;
  seen.add(file);
  for (const e of extendsOf(file)) {
    if (e.ok) withExtends(e.file, chain, seen);
    else missing.push(`${rel(e.from)} extends a missing file`);
  }
  chain.push(file);
}

function below(dir, acc = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    if (e.isDirectory() && !SKIP.has(e.name)) {
      const f = designIn(join(dir, e.name));
      if (f) acc.push(f);
      below(join(dir, e.name), acc);
    }
  }
  return acc;
}

const results = targets.map((t) => {
  const abs = resolve(t);
  const isDir = existsSync(abs) && statSync(abs).isDirectory();
  // A target that doesn't exist yet (a new file for `design`) resolves from its nearest existing parent.
  let start = isDir ? abs : dirname(abs);
  while (!existsSync(start) && dirname(start) !== start) start = dirname(start);
  const cwd = process.cwd();
  const root = repoRoot(start) || (relative(cwd, start).startsWith("..") ? start : cwd);
  const dirs = [];
  for (let d = start; ; d = dirname(d)) {
    dirs.unshift(d);
    if (d === root || dirname(d) === d) break;
  }
  const chain = [];
  const seen = new Set();
  for (const d of dirs) {
    const f = designIn(d);
    if (f) withExtends(f, chain, seen);
  }
  return { target: t, root: rel(root), chain: chain.map(rel), nested: isDir ? below(abs).map(rel) : [] };
});

if (asJson) {
  console.log(JSON.stringify({ results, warnings: [...new Set(missing)] }, null, 2));
} else {
  for (const r of results) {
    console.log(`${r.target}  (repo root: ${r.root})`);
    if (!r.chain.length) console.log("  no DESIGN.md applies");
    r.chain.forEach((f, i) => console.log(`  ${i + 1}. ${f}${i === r.chain.length - 1 ? "  ← nearest, wins conflicts" : ""}`));
    if (r.nested.length) {
      console.log("  nested (govern only their own subtree):");
      for (const f of r.nested) console.log(`    - ${f}`);
    }
  }
  for (const w of new Set(missing)) console.log(`⚠ ${w}`);
}
