# Changelog

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
