# Changelog

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
