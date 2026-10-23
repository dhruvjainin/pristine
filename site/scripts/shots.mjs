// Builds the site, serves it, captures every demo's before/after across the Capture Matrix,
// full page, and writes WebP shots to public/shots/<slug>/<before|after>/<view>-<scheme>.webp.
// Usage: npm run shots [-- slug ...]   (rebuild afterwards so dist/ picks up the shots)
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const capture = resolve(root, "../skills/pristine/scripts/capture.mjs");
const port = 4399;
const only = process.argv.slice(2);
const slugs = readdirSync(join(root, "src/data/examples"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(root, "src/data/examples", f), "utf8")).slug)
  .filter((s) => !only.length || only.includes(s));

execFileSync("npx", ["astro", "build"], { cwd: root, stdio: "inherit" });
const server = spawn("npx", ["astro", "preview", "--port", String(port)], { cwd: root, stdio: "ignore", detached: true });
const stop = () => { try { process.kill(-server.pid); } catch {} };
process.on("exit", stop);

for (let i = 0; ; i++) {
  try { if ((await fetch(`http://localhost:${port}/`)).ok) break; } catch {}
  if (i > 60) throw new Error("preview server did not start");
  await new Promise((r) => setTimeout(r, 500));
}

const tmp = join(tmpdir(), "pristine-shots");
rmSync(tmp, { recursive: true, force: true });

for (const slug of slugs) {
  for (const side of ["before", "after"]) {
    const out = join(tmp, slug, side);
    execFileSync(process.execPath, [capture, `http://localhost:${port}/demo/${slug}/${side}`, "--out", out, "--wait", "600", "--full"], { stdio: "ignore" });
    const dest = join(root, "public/shots", slug, side);
    mkdirSync(dest, { recursive: true });
    for (const cell of ["desktop-light", "desktop-dark", "mobile-light", "mobile-dark"]) {
      const width = cell.startsWith("mobile") ? 600 : 1200;
      const { data, info } = await sharp(join(out, `${cell}.png`), { limitInputPixels: false }).resize({ width }).toBuffer({ resolveWithObject: true });
      const img = sharp(data);
      if (info.height > 16000) img.extract({ left: 0, top: 0, width: info.width, height: 16000 });
      await img.webp({ quality: 80 }).toFile(join(dest, `${cell}.webp`));
    }
    console.log(`shot ${slug}/${side}`);
  }
}

rmSync(tmp, { recursive: true, force: true });
stop();
process.exit(0);
