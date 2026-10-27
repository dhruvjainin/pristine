# Changelog

## 0.2.17

- `design` and redesign now show their 2–3 Directions as real HTML mocks in a browser, side by side as A, B, C with one marked Recommended, then ask the user to pick in the harness's choice UI. Skipped when the Directions are not visual, or the user named a direction or gave a reference image.
- Add `scripts/compare.mjs` (Node built-ins only) and `reference/patterns/direction-mocks.md`.
- Mocks render at a desktop viewport (1280×800) scaled to fit each column, so they never show as mobile strips; mobile only for mobile-only targets. Rule in `direction-mocks.md`, enforced by `compare.mjs`.
- Add a live Directions example to the site.

## 0.2.16

- Require provider/brand summaries to contain each brand once, in first-seen order, with matching accessible names and unique badge keys. Preserve distinct tool action IDs and helper agents.
- Add `duplicate-brand-summary`, a narrow warning for direct brand/provider `map` or conditional `flatMap` projections passed to `AgentFanout.tools`. Verify actual duplicates at runtime; the scan does not follow aliases or prove upstream uniqueness.
- Add fixtures proving the repeated-brand projection is flagged, Set-wrapped summaries pass, and action lists are not flagged.

## 0.2.15

- Require silent bot checks to have no challenge panel until a provider interaction callback or error; keep required challenges mounted, visible and keyboard-usable.
- Separate editable drafts from server-verified send gating across main, quick and handoff composers. Preserve editor identity, draft, focus and replay payloads; callbacks and retries must not queue or duplicate sends.
- Require runtime captures of silent, interactive, expired, error/retry and verified states, including a held server response after token delivery. Label fixtures separately from public verification; no speculative static detector is added.

## 0.2.14

- Check newly inserted live tool/status labels during entrance motion, not only after settling: readable small text must maintain 4.5:1 contrast from its first visible frame.
- Inspect ancestor opacity as well as text colors. Remove label fades through a scoped component token when needed; retain unrelated motion and never mask the failure with delayed accessibility checks.
- This requires rendered frames and composited colors; a static opacity match cannot establish contrast or which text is visible.

## 0.2.13

- Require subtree exclusions in shared CSS to preserve selector specificity and the computed styles of unaffected routes.
- Add `subtree-exclusion-specificity`, a narrow warning for `:not(.scope *)` and ID equivalents outside an immediate `:where(...)` wrapper.
- Add before/after fixtures proving the old exclusion is flagged and its zero-specificity wrapper passes. Runtime captures still establish whether a cascade regression occurs.

## 0.2.12

- Verify exactly one exposed level-one heading in each composed document, including embedded applications after hydration and navigation. Inspect the actual tags rendered by shared headers, not their component names.
- Require capability-limited controls to match the effective backend operation across primary and quick composers, stored preferences and handoffs. Check the selected label and new-send payload; replay preserves the original payload and request ID.
- These checks require the composed DOM and the runtime capability/transport contract. A source-only scan cannot establish which headings coexist or which model the backend actually executes.

## 0.2.11

- Require SSR/first-client tree parity on direct entry, handoff, reload of the marked history entry, and Back/Forward restoration, with zero hydration errors.
- Verify retained editor node identity, draft and selection during live handoff, the intended standalone layout on reload, and no navigation-triggered duplicate sends.
- Add the narrow `history-render-parity` warning for browser-guarded scalar `history.state` assignments immediately selecting returned JSX. It does not establish SSR or detect every render-time read; history handlers and guarded transition state remain allowed.
- Add dependency-free detector fixtures: the old render is flagged, while server-matching initial state with observed path-transition handling and ordinary history handlers pass (`node scripts/test-detect.mjs`).

## 0.2.10

- Chart axis rule: a line chart's plotted span must fill at least half of the axis range, so a fixed range cannot leave the plot mostly empty.
- Before/after comparisons and recordings must use the same emulated theme in both cells, checked with `dark.applied`.
- A static scan cannot read series data or the visitor's OS theme, so neither rule has a `detect.mjs` check.

## 0.2.9

- Require real tool activity before the answer, with no extra generic thinking indicator during tool execution.
- Verify receipt identity, replay and attempt isolation, reload persistence, and preservation of authorized metadata omissions.
- Extend chat captures to running, completed and failed tool calls. Allow parallel tool states within one activity region.
- These checks require event and history fixtures. A static scan cannot establish whether the backend supplies tool receipts or permits their metadata.

## 0.2.8

- Capture the full chat lifecycle, including pending sends, incremental replies, interruptions and restored sends, rather than treating route coverage as chat coverage.
- Require one native progress indicator per pending reply and no first-run welcome during active or recovering conversations.
- Prove streaming before completion with delayed transport chunks; verify replay deduplication, retained text and zero resend requests on reconnect.
- These are runtime checks. Static placeholder matches cannot prove which indicators render together or whether text arrived incrementally.

## 0.2.7

- Capture embedded, expanded and standalone entry points separately, including mobile title and action bounds after handoff.
- Verify successful connected empty arrays with a usable next action, distinct from offline and failed requests.
- Measure rendered heading sizes against their declared roles and reject pointless horizontal scrolling in one-column catalogs.
- These checks use browser state and computed layout. Static selectors alone cannot establish whether they pass.

## 0.2.6

- Interactive demos require a rendered navigation inventory with 100% destination coverage across both themes and screen sizes.
- Verify example switching from secondary pages, suggestion-to-chat handoff, page scroll reset and unclipped narrow-screen header actions.
- Keep live-service blockers separate from independent presentation work. These checks require browser state and are not inferred from a static scan.

## 0.2.5

- Craft floor: finished preflight tool steps fold to one header row once live agents, results or an approval appear; running steps and failures stay open, and the folded row reopens by click and keyboard.
- `detect.mjs`: new `open-finished-tools` warning for `ToolActivity variant="stepper"` in a file that also renders `AgentFanout` (advisory; it can't tell whether the stepper sits above the fanout).

## 0.2.4

- Craft floor: a background refresh, poll or revalidation never inserts or removes content that moves the page; only a first load with no data may show a loading block.
- Capture: watch polling surfaces for 10–15 seconds, sample the list's position every frame, and confirm a background request happened by wrapping `fetch` after load (in-page mocks hide it from the network tab).
- `detect.mjs`: new `background-refresh-shift` warning for `isFetching`/`refreshing`/`isValidating && <p|div|…>`.

## 0.2.3

- Capture: an error, "could not load" or empty state the scenario didn't ask for is a bug to fix (failing request, mock or route) before scoring, then the success state is captured with realistic data.
- Critique: a section seen only failing or empty counts as uncaptured and caps the overall Score at 7.

## 0.2.2

- Craft floor: when the UI acts on or counts a set of items, the user can see that list and each item's state on the same page; sibling providers list their items alike.
- Critique: a parity check compares sibling surfaces (one per provider, plan or record type) and makes anything missing from one of them a finding.

## 0.2.1

- Craft floor: every action must look clickable at rest in a still capture; a lone text-only ghost button that reads as body text fails.
- Critique: a cold read of each still capture asks "can I click this?" for every line of text; an action that reads as text caps the overall Score at 7.
- `detect.mjs`: new `ghost-text-action` warning for text-only ghost/link buttons of three or more words, across multi-line JSX.

## 0.2.0

- Scoring: a state that exists but wasn't captured (hover, pressed, tooltip, focus-visible, dark, loading/empty/error) caps its Dimension at 6 and the overall Score at 7. Reports list what wasn't captured.
- Reports say "verified" only for checks run under the user's real conditions: current build, warm cache.
- `capture.mjs`: records each cell's visible background colour and luminance and warns when dark mode didn't apply (`dark.applied`); new `--state hover|focus|active` and `--pad` flags capture interaction states and tooltips.
- Craft floor: hover and pressed fills must differ visibly from rest (≥ 0.04 OKLCH lightness); inline chips sit on the text baseline; small targets reach 44px with a `::after` hit area instead of `min-height`, without overlapping in wrapped rows; one image fallback for missing, failed and loading, with no error icon while loading.
- Polish and design search the system for an existing component with the same job before drawing one.
- Dashboards: a text button repeated on every row becomes an icon button with a tooltip.

## 0.1.0

First public release.

- Commands: `init`, `critique`, `design`, `polish`, with a bare `/pristine` routing by intent.
- 16 Lenses and pattern guides for landing pages, dashboards, onboarding, mobile web and motion.
- `capture.mjs` for light/dark and desktop/mobile screenshots, element and zoom capture.
- `detect.mjs` static scan for common UI defects.
- Plugin manifests for Claude Code, Codex and GitHub Copilot; `agents/openai.yaml` for Codex.
