// Checks the plugin manifests, SKILL.md frontmatter and openai.yaml agree.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const fail = (m) => errors.push(m);
const json = (p) => JSON.parse(readFileSync(p, "utf8"));

const plugin = json(".claude-plugin/plugin.json");
const market = json(".claude-plugin/marketplace.json");
if (!market.plugins.some((p) => p.name === plugin.name)) fail(`marketplace.json does not list plugin "${plugin.name}"`);

for (const dir of plugin.skills) {
  const file = join(dir, "SKILL.md");
  if (!existsSync(file)) { fail(`${file} missing`); continue; }
  const fm = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { fail(`${file}: no frontmatter`); continue; }
  const name = fm[1].match(/^name:\s*(.+)$/m)?.[1].trim();
  const desc = fm[1].match(/^description:\s*(.+)$/m)?.[1].trim();
  if (name !== dir.split("/").pop()) fail(`${file}: name "${name}" does not match folder`);
  if (!desc || desc.length > 1024) fail(`${file}: description missing or over 1024 chars`);
  const lic = fm[1].match(/^license:\s*(.+)$/m)?.[1].trim();
  if (lic && lic !== plugin.license) fail(`${file}: license ${lic} differs from plugin.json ${plugin.license}`);

  const yaml = join(dir, "agents/openai.yaml");
  if (!existsSync(yaml)) fail(`${yaml} missing`);
  else {
    const y = readFileSync(yaml, "utf8");
    const sd = y.match(/short_description:\s*"([^"]*)"/)?.[1];
    if (!/display_name:\s*"[^"]+"/.test(y)) fail(`${yaml}: display_name missing`);
    if (!sd || sd.length < 25 || sd.length > 64) fail(`${yaml}: short_description must be 25-64 chars`);
  }

  for (const ref of readFileSync(file, "utf8").matchAll(/\]\((reference\/[^)#]+)\)/g)) {
    if (!existsSync(join(dir, ref[1]))) fail(`${file}: broken link ${ref[1]}`);
  }
}

const top = readFileSync("CHANGELOG.md", "utf8").match(/^## (\S+)/m)?.[1];
if (top !== plugin.version) fail(`CHANGELOG.md top entry "${top}" does not match plugin.json version "${plugin.version}"`);
const tag = process.env.GITHUB_REF_TYPE === "tag" ? process.env.GITHUB_REF_NAME : null;
if (tag && tag !== `v${plugin.version}`) fail(`tag ${tag} does not match plugin.json version v${plugin.version}`);

const listed = new Set(plugin.skills.map((s) => s.replace(/^\.\//, "")));
for (const d of readdirSync("skills")) if (!listed.has(`skills/${d}`)) fail(`skills/${d} not listed in plugin.json`);

if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join("\n")); process.exit(1); }
console.log(`✓ ${plugin.name} ${plugin.version}: manifests, frontmatter and openai.yaml OK`);
