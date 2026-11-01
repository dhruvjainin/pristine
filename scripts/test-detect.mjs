import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const scan = (name) => {
  const output = execFileSync(process.execPath, [
    "skills/pristine/scripts/detect.mjs",
    `scripts/fixtures/history-hydration/${name}.tsx`,
    "--json",
  ], { cwd: root, encoding: "utf8" });
  const result = JSON.parse(output);
  assert.equal(result.scanned, 1);
  return result.findings.filter((finding) => finding.rule === "history-render-parity");
};

const before = scan("before");
assert.equal(before.length, 1, "Direct render-time history marker must be flagged");
assert.equal(before[0].line, 3);
assert.equal(before[0].severity, "warn");
assert.equal(scan("after").length, 0, "Observed path-transition state must pass");
assert.equal(scan("handlers").length, 0, "History use in effects and handlers must pass");
console.log("✓ history-render-parity: old render flagged; guarded transition and handlers pass");

for (const [name, expected] of [["before", 1], ["after", 0]]) {
  const output = execFileSync(process.execPath, [
    "skills/pristine/scripts/detect.mjs",
    `scripts/fixtures/subtree-exclusion/${name}.css`,
    "--json",
  ], { cwd: root, encoding: "utf8" });
  const result = JSON.parse(output);
  assert.equal(result.scanned, 1);
  const findings = result.findings.filter((finding) => finding.rule === "subtree-exclusion-specificity");
  assert.equal(findings.length, expected, `${name}: subtree exclusion specificity`);
  if (expected) assert.equal(findings[0].line, 1);
}
console.log("✓ subtree-exclusion-specificity: raised specificity flagged; zero-specificity wrapper passes");
