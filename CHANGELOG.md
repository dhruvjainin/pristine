# Changelog

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
