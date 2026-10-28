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

for (const [name, expected] of [["before", 4], ["after", 0], ["non-summary", 0]]) {
  const output = execFileSync(process.execPath, [
    "skills/pristine/scripts/detect.mjs",
    `scripts/fixtures/brand-summary/${name}.tsx`,
    "--json",
  ], { cwd: root, encoding: "utf8" });
  const result = JSON.parse(output);
  assert.equal(result.scanned, 1);
  const findings = result.findings.filter((finding) => finding.rule === "duplicate-brand-summary");
  assert.equal(findings.length, expected, `${name}: unique brand summary`);
  if (expected) {
    assert.deepEqual(findings.map((finding) => finding.line), [12, 13, 14, 19]);
    assert.ok(findings.every((finding) => finding.severity === "warn"));
  }
}
console.log("✓ duplicate-brand-summary: old projections flagged; unique summaries and action lists pass");

for (const [name, expected] of [["before", 2], ["after", 0], ["diagnostics", 0]]) {
  const output = execFileSync(process.execPath, [
    "skills/pristine/scripts/detect.mjs",
    `scripts/fixtures/task-titles/${name}.tsx`,
    "--json",
  ], { cwd: root, encoding: "utf8" });
  const result = JSON.parse(output);
  assert.equal(result.scanned, 1);
  const findings = result.findings.filter((finding) => finding.rule === "raw-task-title");
  assert.equal(findings.length, expected, `${name}: readable task titles`);
  if (expected) {
    assert.deepEqual(findings.map((finding) => finding.line), [6, 14]);
    assert.ok(findings.every((finding) => finding.severity === "warn"));
  }
}
console.log("✓ raw-task-title: raw titles flagged; readable names, detail keys and diagnostics pass");
