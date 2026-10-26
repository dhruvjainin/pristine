# Typeset

Typeset is about whether the words are comfortable to read and whether their size, weight, and spacing tell you what each piece of text is. A designer looks for decisions: a real scale, deliberate weights, a readable measure, and type that survives every viewport, theme, and font load.

**Raises:** Typography.
**Skip it when:** the type is sound and the problem is structure (use layout) or copy (use clarify). Do not swap typefaces when DESIGN.md confirms them; improve their use instead. Replacing the brand's typeface is a DESIGN.md decision to confirm with the user.

## What a designer looks at

Open the Capture and look before touching code. Run these checks in order.

**1. The squint test.** Blur the screenshot (~8px).
- Can you still tell heading, body, label, and caption apart? If heading and body sizes are too close, they merge into one grey block.
- Is hierarchy carried by size alone? Good hierarchy combines size, weight, color, and space. Can you see ~3 text tints (heading near-black, body dark gray, subtext mid gray)?

**2. Count the sizes and weights.** Inventory every distinct font-size, weight, line-height, and letter-spacing in use, with where it appears. More than ~8 sizes or ~4 weights usually means no system; random font sizes are a sign nobody chose a scale. One weight everywhere means nothing is emphasized. One `letter-spacing` applied to every size is wrong somewhere: large text looks loose or tiny text looks cramped.

**3. Read a paragraph aloud.** Where do you lose your place?
- Lines longer than ~80 characters make the eye miss the next line.
- Cramped leading makes lines collide; loose leading makes a paragraph fall apart.
- Center-aligned paragraphs longer than 3 lines are hard to scan.
- Do accented, Vietnamese, or Thai lines collide or clip at the same leading as Latin text?

**4. Look at the defaults.** Is this default system or Inter styling with one weight and default tracking, with no visible decisions? If so, it looks generic. Are display or script faces used in buttons, labels, inputs, or data? Is monospace worn as a "techy" costume on non-code text?

**5. Check line breaks.** Does any heading wrap into a single orphan word? Does any text clip or overflow its container, especially long words and URLs?

**6. Look at the numbers.** In tables, prices, and timers, do digits jump in width as values change or fail to line up in columns? That means proportional numerals where tabular ones belong.

**7. Check the details.** Straight quotes ("), hyphens used for ranges, and all-caps paragraphs are signs of unfinished type.

**8. Watch it load.** Reload on a throttled connection. Does the layout jump when fonts load? Is there a flash of invisible text?

**9. Consider the Persona's reading context:** scanning a dashboard, reading long docs, or judging a landing page. Each wants a different scale: dashboards and product UI use smaller sizes with tighter steps; landing pages use bigger sizes with wider steps. Does large display text (≳ 70–80px) still have default tracking? It will look loose.

**10. Turn the text up.** Set the browser's default font size to 20px, then zoom to 200%. Does text scale, or is it locked in px? Does spacing scale with it, or do labels collide and containers clip?

## How to fix

1. **Read DESIGN.md's Design System typography:** families, weights, scale, and roles, plus the Personas' reading context.
2. **Define roles before values:** `display`, `h1`–`h3`, `body`, `body-sm`, `label`, `caption`, `mono`/`data`. Use the fewest roles that make hierarchy unmistakable.
3. **Choose a scale ratio by surface:**
   - task UIs (dashboards, tools, settings): 1.125–1.2, fixed rem sizes;
   - docs and articles: 1.2–1.25;
   - marketing and portfolios: 1.25–1.5, display may use `clamp()` (e.g. `clamp(2.5rem, 5vw + 1rem, 5rem)`).
4. **Set the values:**
   - body 16–18px (1rem–1.125rem); never below 16px for body on mobile (iOS zooms inputs under 16px); mobile web base ≈ 16–17px, and text often gets *bigger* on mobile, not smaller;
   - dense desktop app UI (tables, sidebars, toolbars) may use 13–14px for secondary/data text; reading body and all inputs stay ≥ 16px;
   - line-height runs inverse to size: body 1.5–1.7; headings 1.05–1.25; tighter as size grows; looser for scripts with tall ascenders or stacked diacritics; tighter (≈1.3–1.4) for dense data UI;
   - prose `max-width: 60–70ch`;
   - tracking is size-specific, never one value for all sizes: display -0.01 to -0.03em (floor -0.04em), always applied to text ≳ 70–80px; body ≈ 0; small caps, labels, and tiny text (≤ 12px) slightly positive (+0.04 to +0.1em for caps);
   - weights: body 400, emphasis 500–600, headings 600–800; adjacent roles differ by ≥ 200 weight or ≥ 1.25× size;
   - tints: 3 text colors (heading, body, subtext) combined with weight and size for hierarchy;
   - set size, weight, and leading together per role; to emphasize inside a role, add weight before size.
5. **Pairing:** one family is often enough for task UIs. The system font stack (`system-ui`) is a legitimate default with good optical sizing, provided weights, tracking, and scale are still deliberately tuned (check 4 applies); a custom face needs a reason (brand voice, a job system fonts can't do). Set `font-optical-sizing: auto` on variable fonts. Add a second family only when it does a job the first cannot (display voice, code). Never more than two families plus mono.
6. **Line breaks:** `text-wrap: balance` on headings and short centered text; `text-wrap: pretty` on paragraphs. Hand-break headings only between phrases, and check every viewport.
7. **Details:** `font-variant-numeric: tabular-nums` on tables, prices, timers; `lining-nums` in UI; real quotes and apostrophes (“ ” ’); en dash for ranges; `hyphens: auto` only on narrow justified or long-word text.
8. **Respect the user's text size:** font sizes in `rem`; spacing that sits around text in `rem`/`em` so it grows with it; no fixed px heights on text containers; the root font size is never set in px.
9. **Dark mode:** light text on dark reads heavier and tighter; add +0.02–0.05 line-height and +0.01em tracking, or drop one weight step if the face blooms.
10. **Loading:** load only used weights (woff2, subsetted), `font-display: swap` with a metric-matched fallback (`size-adjust`, `ascent-override`) so swap causes no visible shift; preload the 1–2 critical files.
11. **Record the scale as tokens in DESIGN.md** and replace every ad-hoc size with a role token.

## Rules
- [ ] Every text element maps to a named role; no stray px values.
- [ ] Measure `getComputedStyle(heading).fontSize` after fonts and styles settle in every entry point and matrix cell. It must match the role's declared size (within 1px), or its declared fluid range. A declaration is not evidence when a generic heading selector wins the cascade; fix scope or specificity at the owning role, not by overriding library typography globally.
- [ ] Heading, body, label, and caption distinguishable in a blurred Capture.
- [ ] Body ≥ 16px, line-height 1.5–1.7, measure ≤ 75ch (dense desktop data/secondary text may be 13–14px; inputs never < 16px).
- [ ] Hierarchy uses 3 text tints + weight + size, not size alone.
- [ ] Display text ≳ 70–80px has negative tracking.
- [ ] No heading wraps to a single orphan word at any captured width.
- [ ] Tracking never below -0.04em; all-caps only on short labels with positive tracking.
- [ ] Tracking and line-height vary by role (negative tracking/tight leading on display, ≈ 0/looser on body, positive on tiny labels); no single global `letter-spacing`.
- [ ] Sizes and text-adjacent spacing in `rem`/`em`; a 20px browser default and 200% zoom don't break layout.
- [ ] A custom typeface has a stated reason; variable fonts use `font-optical-sizing: auto`.
- [ ] ≤ 2 families (+ mono); ≤ 4 weights loaded.
- [ ] Tabular numerals wherever numbers align or change.
- [ ] Text zooms to 200% without clipping or overlap.
- [ ] Font loading causes no visible layout shift (CLS contribution ≈ 0).

## Avoid
- Generic Inter-on-white with one weight and default tracking; if Inter is the choice, tune it.
- Display or script faces in buttons, labels, inputs, or data.
- Monospace as a "techy" costume for non-code text.
- Fluid `clamp()` sizes on dense app UI; they shrink unpredictably in panels.
- Gradient text and all-caps paragraphs.
- Center-aligned paragraphs longer than 3 lines.
- Using size alone for hierarchy; combine size, weight, color, and space.
- One `letter-spacing` value for every size; px font sizes that ignore the user's setting.
- `overflow: hidden` plus tight leading on text that may contain tall scripts.

## Verify in the Capture Matrix
- **Desktop light/dark:** blur the Capture; roles still separate. Check dark-mode weight and leading compensation.
- **Mobile light/dark:** headings wrap cleanly at 375px and 320px; body stays ≥ 16px; long words and URLs wrap instead of overflowing.
- Test real copy, the longest localized string you can find, and 200% zoom.
- Typography should rise with no overflow regressions.
