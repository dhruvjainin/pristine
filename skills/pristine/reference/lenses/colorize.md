# Colorize

Colorize is about giving color a job: a gray-on-gray screen hides the primary action, blurs selected and unselected states, and feels anonymous. A designer treats color as a role system, not a bag of swatches, so every color added must encode hierarchy, action, state, category, or a deliberate atmosphere from DESIGN.md.

**Raises:** Color & theming.
**Skip it when:** the Critique flags too many colors or visual noise (use decolorize or quieter). Never apply colorize and decolorize to the same target in one Polish. Do not use colorize to invent a new brand identity; that is a DESIGN.md decision to confirm with the user first.

## What a designer looks at

Open the Capture and look before touching code. Run these checks in order, and list every place where missing color hurts.

**1. Find the primary action in one second.** If the main button is the same gray as everything else, color is not doing its most important job.

**2. Selection and location.**
- Do selected and unselected items (tabs, rows, nav links, filters) look alike? If you can't tell where you are, wayfinding is broken.
- Is focus visible? A missing or gray-on-gray focus ring is both a color and an accessibility failure.

**3. Status.** Can you tell success from warning from error at a glance? If every badge and alert is neutral, status is unclear.

**4. Data.** Do charts use one hue for every series? If series can't be told apart, the chart can't be read.

**5. The grayscale test.** Convert the Capture to grayscale. Anything that only worked because of hue (status dots, chart lines, selected tabs) will vanish. Those need a non-color cue as well as color.

**6. Persona feel.** Does the screen feel anonymous or cold for Personas who expect warmth or energy? Is there an empty canvas that a deliberate atmosphere from DESIGN.md should fill?

**7. Contrast spot-check.** On any already-colored surface, is secondary text neutral gray? Gray text on a colored background looks dirty and often fails contrast. Does any brand color used for text or a button fail contrast?

**8. Neutral foundation.** In product UI, can you name ~4 background layers, 1–2 stroke colors, and 3 text tints (heading, body, subtext)? Are card borders light gray or harsh near-black? In light mode, is it one model (darker page + white cards, or white page + slightly darker cards), not a mix?

**9. Dark mode and states.** In dark, do surfaces get *lighter* as they elevate, with visible steps? Is text off-white rather than pure #fff? Do hover, pressed, and disabled each look different from rest?

Write a one-line **color strategy** before editing:
- **Temperature:** warm, cool, or neutral.
- **Dosage:** restrained ≈ 5–10% accent, committed ≈ 20–40%, immersive > 50%. Task surfaces (dashboards, tools, settings) default to restrained; marketing and portfolio surfaces may go committed. For product UI, 60-30-10 is too loud: aim near ~90% neutral / ~8% secondary / ~2% accent.
- **Strongest role:** which role gets the strongest color.

## How to fix

1. **Read DESIGN.md's Design System.** Record confirmed brand colors and existing color roles. Never replace a confirmed brand color.
2. **Build roles as semantic tokens on top of primitives:**
   - `surface`, `surface-raised`, `surface-sunken`
   - `text`, `text-muted`, `text-on-accent`
   - `accent`, `accent-hover`, `accent-active`, `focus-ring`, `selection`
   - `border`, `border-strong`
   - `success`, `warning`, `danger`, `info` (each with a subtle background and a foreground)
   - `chart-1` … `chart-n` only if the target has data visualizations
3. **Generate ramps in OKLCH** (or the project's existing color space). Vary lightness in even steps; reduce chroma near L 0.95+ and L 0.20- so tints and shades do not go garish.
   - Use a 50–950 ramp per hue: main/primary at 500/600, hover 700 (light mode), links 400/500.
   - Tint near-black and near-white backgrounds toward the brand hue instead of pure #000/#fff.
   - Theme variants: from a base, shift OKLCH lightness −0.03, chroma +0.02, and rotate hue.
   - A brand color that fails contrast: use a darker ramp step for text/buttons, or give that role to an analogous/complementary color.
4. **Build the product neutral foundation:** ~4 background layers; 1–2 stroke colors (card borders ≈ 85% white, i.e. light gray, never black); 3 text tints: heading ≈ near-black (~11% lightness), body a slightly lighter dark gray (~15–20%), subtext a mid gray (~30–40%), all still passing contrast. In light mode pick one model: darker page with white cards, or white page with slightly darker cards.
5. **Apply with intent:**
   - the strongest color owns one role (usually the primary action or one hero region); the more important a button, the darker/more saturated it is;
   - color carries meaning (action, status, data), not decoration: icons stay neutral unless they signal status;
   - tint neutrals 1–3% toward the brand hue for cohesion;
   - secondary text on colored surfaces derives from that surface's hue, never neutral gray;
   - selected and current states get a subtle accent background plus a non-color cue (weight, icon, indicator bar inside the element).
6. **Charts:** use categorical hues with distinct lightness (≥ 10 L points apart), plus labels, patterns, or markers so color is never the only code. Generate them in OKLCH at equal chroma, stepping hue ~25–30°; equal lightness *and* chroma is fine only for directly labeled series or non-data sets (tags, avatars). Use a sequential single-hue ramp for magnitude and a diverging ramp only for data with a meaningful midpoint.
7. **States:** hover one step off rest (slightly lighter on neutral and dark surfaces; the 700 step on a filled light-mode primary), pressed slightly darker than hover, disabled desaturated with lower contrast. Semantic colors are not brand choices: destructive = red, success = green, warning = amber.
8. **Design dark mode explicitly:** lift surfaces by lightness for elevation (e.g. L 0.18 → 0.22 → 0.26), lower accent chroma ~10–20%, never invert the light palette mechanically.
   - Surfaces get lighter as they elevate; layer steps ~4–6% lightness (about double light mode's ~2%).
   - Background ≈ the 950 step; primary moves to a lighter step (300/400).
   - Text off-white/light gray, not pure white; dim text slightly, brighten borders slightly, desaturate brand colors.
9. **Add new tokens to DESIGN.md's Design System** with their role.

## Rules
- [ ] Every new color maps to a named role token; no raw hex in components.
- [ ] Primary action is the most saturated interactive element on screen.
- [ ] Body text ≥ 4.5:1; large text, icons, controls, focus rings ≥ 3:1, in every state and both themes.
- [ ] Status and selection are understandable in grayscale (non-color cue present).
- [ ] Semantic colors are consistent across the product (danger is always the same red); destructive actions are always semantic red.
- [ ] Product UI uses at most one accent; icons are neutral unless they convey status.
- [ ] Neutral foundation defined: ~4 surfaces, 1–2 strokes, 3 text tints; card borders light gray, not black.
- [ ] Hover, pressed, and disabled colors are distinct from rest.
- [ ] Brand colors used for text or buttons pass contrast (darkened step or reassigned role).
- [ ] Charts pass a deuteranopia/protanopia simulation and have direct labels or a legend.
- [ ] Dark theme composed separately, not inverted: elevated surfaces lighter, text off-white, primary on a lighter ramp step.
- [ ] Result still reads as this product, not a generic "colorful" template.

## Avoid
- Purple-blue gradients, rainbow palettes, or gradient text.
- Colored glows and halos; colored side-stripe borders on cards and alerts.
- Accent color on inactive or decorative elements, which steals attention from actions.
- Gray text on colored backgrounds.
- Translucent overlay chains whose contrast depends on what is behind them; prefer solid computed colors.
- Bright, saturated colors scattered everywhere and gradient letter-avatars: the tell of an auto-generated palette.
- Mixing light-mode surface models (white cards on white and gray cards on gray on the same screen).
- Picking hue by category cliché (blue = trust, green = money) instead of DESIGN.md's brand.

## Verify in the Capture Matrix
- **Light and dark, desktop and mobile:** recheck every text/background pair the change touched, including hover, active, selected, disabled, error, and text over images.
- Convert one Capture to grayscale: hierarchy and state must still read.
- **Mobile:** large color regions can dominate a small viewport; confirm the accent dosage still matches the strategy.
- Color & theming should rise; no contrast regression is acceptable.
