# Quieter

Quieter is about volume: when every element shouts, nothing is heard, and people who spend long sessions in the UI get tired. A designer turns the volume down everywhere except the one thing that should lead, and keeps a point of view while doing it, because quiet is harder than loud and generic quiet (gray text on white, one weight, identical cards) is a failure, not a success.

**Raises:** Hierarchy & clarity, Persona fit.
**Skip it when:** the Critique says the UI is flat, timid, or generic (use bolder). Never apply quieter and bolder to the same target in one Polish. If the problem is too many elements rather than too much intensity, use distill. If the main problem is color count specifically, use decolorize.

## What a designer looks at

Open the Capture and look before touching code. Run these checks in order, and write each intensity source down with its selector or token.

**1. The squint test.** Blur the screenshot (~8px).
- How many shapes pop? If three or more compete, there are competing focal points and every element is shouting at the same volume.
- Is there any restful space, or is the blur one busy texture?

**2. Count the hues.** How many distinct saturated colors are visible? Several saturated colors competing means the accent has lost its meaning. Note how much area the accent covers.

**3. Count the bold.** How many elements use weights ≥ 700? If body-level items, labels, and buttons are all bold, emphasis has stopped meaning anything.

**4. Look at the surfaces.** List shadows, glows, gradients, blurs, and textures. Stacked shadows plus a border plus a gradient on one card is decoration, not elevation.

**5. Watch it for ten seconds.** How many animations run without user input? Decorative loops and autoplay pull the eye away from the task every few seconds.

**6. Scan the type jumps.** Look for extreme scale jumps between adjacent roles and all-caps text. Both raise the volume.

**7. Think about the Persona's session.** Would someone stare at this for hours (a dashboard, an editor, an inbox)? Loudness that is fine on a landing page is tiring there.

Write down before editing: **what stays loud** (at most ONE focal element per viewport, plus the primary action). Everything else recedes.

## How to fix

1. **Read DESIGN.md.** Identify the brand color, type scale, and which Personas use this surface and for how long. Keep the brand's character; reduce its volume.
2. **Reduce color:**
   - lower chroma of accents by 15–30% (in OKLCH, e.g. C 0.20 → 0.14);
   - cut visible hues to brand accent + semantic states + neutrals;
   - accent covers ≤ 10% of the surface;
   - tint neutrals 1–3% toward the brand hue instead of pure gray.
3. **Reduce weight:** 900 → 600, 700 → 500 where the element is not the focal point. Keep at least two clearly different weights so hierarchy survives.
4. **Flatten surfaces:** remove decorative gradients, glows, textures, and stacked shadows. Use one subtle elevation token (e.g. `0 1px 2px` + `0 4px 12px` at ≤ 8% opacity) or a 1px hairline border, not both.
5. **Calm motion:** shorten travel to 4–12px, durations to 150–250ms, use ease-out (`cubic-bezier(0.25, 1, 0.5, 1)`). Remove autoplaying and decorative loops. No bounce or elastic.
6. **Add air:** increase section spacing by one or two steps on the spacing scale; reduce scale jumps between adjacent type roles to 1.2–1.333.
7. **Express all changes through tokens.** Update DESIGN.md if a token's value changes globally.

## Rules
- [ ] At most one focal element per viewport; the primary action is still obvious.
- [ ] ≤ 1 brand accent hue plus semantic colors; accent ≤ 10% of visible area.
- [ ] Bold (≥ 700) used only on headings or the focal element.
- [ ] No glow halos, gradient text, or decorative blur remain.
- [ ] No animation runs without user input except meaningful progress indicators.
- [ ] Section spacing visibly more generous than before.
- [ ] Contrast still passes: body ≥ 4.5:1, large text and controls ≥ 3:1. Quieter must not mean lower-contrast text.
- [ ] The surface still looks like this brand, not a generic template.

## Avoid
- Turning everything gray. Quiet is not grayscale.
- Making every element the same size and weight; hierarchy must survive.
- Light-gray body text (e.g. #999 on white) to "soften" the page.
- Removing affordances: buttons still look like buttons, links still look like links.
- Hairline 0.5px borders that disappear on non-retina screens.
- Removing focus rings or state colors in the name of calm.

## Verify in the Capture Matrix
- **Light:** check that tinted neutrals do not read as dirty or muddy; body text keeps ≥ 4.5:1.
- **Dark:** desaturated accents often go dull on dark backgrounds; raise lightness slightly rather than chroma. Avoid pure #000 canvases; use a tinted near-black (OKLCH L 0.14–0.20).
- **Desktop:** squint at the Capture; one element should still lead.
- **Mobile:** the extra air must not push the primary action below the first viewport.
- Compare before/after. Hierarchy & clarity and Persona fit should rise without Color & theming dropping.
