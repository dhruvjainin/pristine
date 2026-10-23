# Delight

Delight is product character revealed through a useful moment, not a layer of generic whimsy. It is the result of getting purpose, clarity, and craft right, not confetti on top. A designer looks for the few moments where a Persona feels something (relief, pride, worry, boredom) and makes the product respond like it understands.

**Raises:** Persona fit.
**Skip it when:** the floor is not met (broken states, contrast failures, unclear copy); fix those with harden, clarify, or polish-details first. Don't add delight to high-stakes moments (payments, deletion, security, data loss) beyond calm clarity. If the Critique says the UI is already busy, use quieter.

## What a designer looks at

Open the Capture and walk the flow as the Persona. Look for emotional moments, not missing decoration, starting wherever the Critique flags low personality or weak emotional fit for the Personas. Run these checks in order.

**1. Find the moments.** Trigger each one and capture it:
- **First use and empty states:** is it a blank screen or a bare "No data"? That's the product's first impression wasted.
- **Success after effort:** after the first project, publish, or milestone, is there just a bare "Saved"? Big effort deserves acknowledgement.
- **Waiting:** anything over ~1 second with only a spinner and nothing else? The Persona doesn't know what's happening or how long.
- **Errors and recovery:** is the error generic at a stressful moment?
- **The repeated core interaction** (check off, send, like): does it feel good, or mechanical?
- **Discovering a power feature:** is there any moment of reward for finding it?
- **The end of the flow:** what is the last thing the Persona sees after checkout, sign-up, publish, or the final step? A bare redirect or a generic toast wastes the moment they'll remember the whole flow by.

- **Hidden states and "invisible UI":** hovers, tooltips, empty, 404, and success pages. This is where delight lives; are they bare defaults?

**2. The screenshot test.** Would anyone screenshot this moment and share it? If nothing in the flow is memorable, the product feels anonymous.

**3. The swap test.** Could a neighboring product use this empty state, error, or success message unchanged? If yes, it has no character.

**4. Voice fit.** Read the copy out loud. Does it sound like DESIGN.md's voice and the Persona's world? A tool for accountants and a game for teens need very different delight. "Oops!", "Woohoo!", and "Something went wrong 🙈" are generic whimsy, not voice.

**5. The 100th time.** Imagine doing the core action 100 times a day. Would the response still feel good, or would a long or random variation get annoying? Is any flourish spent on a frequent path (hover, list navigation, keyboard shortcuts) instead of a rare moment (first run, success, empty, celebration)?

**6. Cost to the task.** With the delight present, is the primary task any slower or less clear? Does a celebration block the next action? Does the empty state still say what to do next?

**7. Stakes.** Is there any joke or flourish near money, deletion, security, privacy, or data loss? Those moments need calm clarity only.

**8. Structure first.** Is the layout and hierarchy already sound? Delight builds in order: structure, then purposeful motion, then one well-built surprise. Does existing motion showcase the product (e.g. scrolling morphs into the real dashboard), or just decorate? Are product visuals real screens cropped to the important part, or stock imagery?

**9. Honesty and control.** Is progress real, or faked? Is completion delayed to show an animation? Does sound play without opt-in? Does it work muted, with reduced motion, with a keyboard, and with a screen reader?

Rank the moments by emotional weight and pick 1–3. People judge a whole flow by its most intense moment and its last one (peak-end rule), so weight the peak and the ending above everything in between. For each, write a one-sentence **delight thesis**: what the Persona should feel (calm, confident, excited…), and why it belongs to this product. Every other decision in that moment should reinforce the same emotion.

## How to fix

1. **Read DESIGN.md:** the product's voice, emotional range, and Personas.
2. **Pick 1–3 moments** from the checks above, ranked by emotional weight, each with a written thesis. If the flow's ending is bare, it is one of them: a closing screen that confirms what was done and what happens next, in the product's voice.
3. **Choose the smallest treatment that delivers it:**
   - **copy:** product-specific, warm, still clear (the next action stays obvious);
   - **micro-interaction:** a tactile response on the core action (check mark draw, count tick), 150–400ms; e.g. a hold-to-confirm fill (`clip-path` growing over ~2s linear, snapping back fast on release), a number ticker on `tabular-nums` so digits don't jitter, a `clip-path` reveal on a milestone;
   - **illustration or icon moment:** drawn in the Design System's style, not stock;
   - **useful waiting:** real progress, what is happening, or a tip relevant to the task;
   - **celebration:** only for genuine milestones, proportional to effort;
   - **personality pages:** 404, empty, and success pages with a product-specific idea, still offering the way forward;
   - **context elements:** playful product-related elements around a centered message, trailing off toward the edges, with subtle parallax (off under reduced motion).
4. **One surprise, built well:** after structure and purposeful motion are right, add a single well-crafted moment rather than many small ones. Prefer motion that shows the product itself over decorative motion.
5. **Use real product visuals** over stock imagery, cropped to the part that matters.
6. **Scale intensity to frequency:** actions done 100× a day get subtle, consistent feedback; actions done once get more. The delight budget lives in rare moments only (first run, success, empty, celebration); frequent paths stay quiet.
7. **Keep it truthful:** never fake progress, delay completion to show an animation, or add claims.
8. **Respect control:** sound only after opt-in and respecting mute; animations follow `prefers-reduced-motion`; celebrations are skippable and never block the next action.
9. **Keep assets light:** SVG/Lottie < ~50KB, lazy-loaded.
10. **Add any new illustration style, voice rule, or motion token to DESIGN.md.**

## Rules
- [ ] Each delight moment has a written thesis tied to a Persona and a named target emotion.
- [ ] Every key flow ends on a designed moment (confirmation of what happened and what's next), not a bare redirect.
- [ ] Delight appears only in rare moments (first run, success, empty, celebration); frequent paths and keyboard-driven actions stay quiet.
- [ ] The primary task is no slower and no less clear with the delight present.
- [ ] Empty states explain the state and offer the next action before adding personality.
- [ ] Errors lead with the problem and the fix; warmth is secondary; no jokes about loss, money, or privacy.
- [ ] Celebrations ≤ 1.5s, skippable, and reserved for real milestones.
- [ ] Repeated interactions still feel good on the 100th use (no long or random variations).
- [ ] Works with keyboard, screen reader (announced text is meaningful), muted audio, and reduced motion.
- [ ] At most one signature surprise per flow; it showcases the product, not decoration.
- [ ] 404, empty, and success pages have product-specific character and a next action.
- [ ] Product visuals are real screens, cropped to the important part.
- [ ] Assets added are small (SVG/Lottie < ~50KB) and lazy-loaded.

## Avoid
- Confetti on routine actions, or delight used to paper over unclear purpose or unfinished craft.
- Generic whimsy ("Oops!", "Woohoo!", "Something went wrong 🙈").
- Emoji as illustrations or icons.
- Stock photos standing in for the product.
- Motion layered on before structure and hierarchy work.
- Mascots and illustrations unrelated to the product or Design System.
- Easter eggs that hide required functionality.
- Fake loading messages ("Reticulating splines…") that don't describe real work.

## Verify in the Capture Matrix
- Capture each delight moment (empty, success, error, loading) in light/dark × desktop/mobile.
- **Dark:** illustrations and celebratory colors keep contrast and don't glow harshly.
- **Mobile:** the moment fits the viewport without pushing the next action off-screen.
- Rerun the swap test: if a neighboring product could use it unchanged, make it more specific. Persona fit should rise without lowering Hierarchy & clarity or Robustness & performance.
