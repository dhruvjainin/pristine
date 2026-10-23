# Bolder

Bolder is about conviction: the screen should take a clear position on what matters and say it with confidence. A designer reaches for it when a section reads flat, timid, or interchangeable, and the fix is a decisive move, not more effects; gradients, glows, and animation are the opposite of bold.

**Raises:** Persona fit, Hierarchy & clarity.
**Skip it when:** the Critique says the UI is too loud, busy, or tiring (use quieter or distill). Never apply bolder and quieter to the same target in one Polish. Skip it for dense task surfaces (tables, settings, editors) where the problem is clarity, not conviction; use layout or typeset instead.

## What a designer looks at

Open the Capture and look before touching code. Run these checks in order.

**1. The five-second test.** Look at the target for one second, then look away.
- Can you name the one thing it wanted you to see? If not, there is no focal point.
- If two or three things tied for attention, nothing leads and the section reads flat.

**2. The squint test.** Blur the screenshot (~8px).
- Does one shape clearly peak? If the target dissolves into an even grey texture, scale and weight contrast are missing.
- Are headings barely larger than body? If a heading and its paragraph blur into the same mass, hierarchy is timid.

**3. Compare to the strongest neighbor.** Put the target next to the best section on the same page. List what the neighbor does that the target does not:
- display type at full scale and weight;
- the brand or accent color used on a meaningful region;
- a structural device (asymmetric split, full-bleed band, oversized number, image crop);
- a shift in density or pacing.
If the target opts out of devices its neighbors already use, that is the diagnosis.

**4. The swap-the-logo test.** Cover the logo. Could this section belong to any competitor? If yes, it is interchangeable: the brand color is absent from key moments and no signature motif from DESIGN.md is present. For an audience that expects confidence, that is a Persona fit failure.

**5. Count the weights.** How many weights are visible, and how far apart are they? If adjacent roles differ by less than 300 weight and less than 2× size, nothing has conviction.

**6. Where does the accent live?** If the brand color appears only as small specks (an icon, a link underline), it is sprinkled, not committed.

**7. Skeleton test.** Blur or remove the copy. Do the hierarchy and the system's devices alone still show what matters most? If the section only works because of what the words say, the design is not carrying its weight.

Write down before editing: **why it reads flat** (from check 3) and **the ONE move** you will make.

## How to fix

1. **Read DESIGN.md.** Note the Design System's type scale, color roles, signature motifs, and which Personas see this target. Bolder must still look like the same brand.
2. **Fix the scope.** Touch only the named target. Everything outside it stays byte-for-byte unchanged unless the user asks otherwise.
3. **Choose ONE decisive move.** Options, in order of preference:
   - **Scale contrast:** raise the lead element 1.5–2.5× over its current size (stay ≤ 6rem) and drop secondary text one step.
   - **Weight contrast:** pair a heavy display weight (700–900) with a light body (300–400); adjacent roles should differ by ≥ 300 weight.
   - **Color commitment:** let the accent own a whole region (a band, a panel, the primary action) instead of sprinkling it on small details.
   - **Space:** double the whitespace around the focal element so it reads as the peak of the scroll.
   - **Composition:** break the even grid once (asymmetric 7/5 or 8/4 split, a deliberate overlap, a full-bleed image).
4. **Make the move completely, then quiet everything around it:** reduce competing weights, remove secondary accents, shorten supporting copy. If everything got louder, the target got flatter.
5. **Use only existing tokens.** If the Design System cannot express the move (e.g. no display size above 3rem), add a token to DESIGN.md with a one-line reason, then use it. Never hard-code a one-off value.
6. **Rerun the skeleton test** on the result: blur or remove the copy; hierarchy and devices alone must show what matters most.
7. **Recheck contrast and the craft floor:** bigger color areas often break text contrast on top of them.

## Rules
- [ ] Exactly one focal element per viewport; it is identifiable within 1 second in the Capture.
- [ ] Lead element ≥ 2× the size of body text, or ≥ 300 weight heavier than its neighbors.
- [ ] Accent color covers a deliberate region or role, not scattered specks.
- [ ] No new font family, color, radius, or shadow outside DESIGN.md (or added to it with a reason).
- [ ] Primary action is still the most findable control.
- [ ] All existing claims, links, and actions still work the same way.
- [ ] Text on any newly colored region passes contrast (≥ 4.5:1 body, ≥ 3:1 large).
- [ ] The result is recognizably the same brand, only more sure of itself.

## Avoid
- Purple-blue gradients, gradient text, neon glows, or glassmorphism as a shortcut to "bold".
- Making every element bigger, heavier, or more colorful at once.
- Animating things to add energy; motion is the animate lens's job.
- Restyling neighbors or migrating the page to a new visual direction.
- Inventing statistics, testimonials, or claims to fill a bolder layout.
- Display text above 6rem or tracking tighter than -0.04em.
- All-caps paragraphs; caps only for short labels (≤ 3 words) with +0.05–0.1em tracking.

## Verify in the Capture Matrix
- **Desktop light/dark:** the focal element still leads in both themes; the accent region keeps contrast in dark mode (re-tune lightness, do not just invert).
- **Mobile light/dark:** the scaled-up headline wraps cleanly at 375px and 320px with no single-word orphan line; the bold move still exists on mobile instead of collapsing into a plain stack.
- Compare before/after Captures side by side. Persona fit and Hierarchy & clarity should rise without lowering Typography.
