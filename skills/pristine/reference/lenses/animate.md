# Animate

Motion explains state, relationship, and feedback: it tells a Persona "I heard you", "this came from there", and "this changed", closing the feedback loop of every action. Decoration without a job is animation debt, and motion that stutters makes the whole product feel cheap. The more often someone sees a motion, the less of it there should be.

**Raises:** Motion & interaction.
**Skip it when:** the Critique says the UI is already overstimulating (use quieter). Don't add motion to hide weak hierarchy or layout; fix those first. For one ambitious showpiece effect, use overdrive. Ready implementations live in [../patterns/motion-recipes.md](../patterns/motion-recipes.md).

## What a designer looks at

Static Captures can't prove motion. Walk through the interface by hand, then slow it down. Run these checks in order.

**1. Should it move at all?** For each animation, estimate how often the Persona sees it and name its purpose.
- **Frequency gate:** 100+ times a day (keyboard shortcuts, command palette) → no animation; tens a day (hover, list navigation) → remove or near-imperceptible; occasional (modal, drawer, toast) → standard motion; rare or first-time (onboarding, milestone) → may add delight. Does any keyboard-initiated action animate? It shouldn't.
- **Purpose:** feedback, spatial consistency (where it came from or went), state indication, preventing a jarring change, explanation (marketing, onboarding), or delight (rare moments only). "Looks cool" is not a purpose. Does data the user is reading move for style?
- **Personality:** crisp and fast for a dashboard, softer for a playful consumer product? Mismatched motion feels borrowed.

**2. Touch every control.** Hover, press, and Tab through every interactive element.
- Does each one respond to hover, press, and focus? No feedback makes the UI feel dead; the Persona wonders if the click registered.
- Does every pressable (buttons, clickable rows and cards) answer on pointer-down, not only on release?
- Does the focus ring appear immediately, or fade in slowly so keyboard users lose their place?
- Do non-clickable cards lift on hover? That lies about what's interactive. On touch, does hover motion stick after a tap?

**3. Watch state changes.** Open and close menus, panels, dialogs, toasts; expand and collapse sections; submit a form.
- Do things pop in and out with no transition? Abrupt changes are easy to miss and feel jarring.
- Does content below jump when something expands? Layout shift means a layout property is animating or nothing is.
- Can you tell what changed after a save, toggle, or loading → done?
- Does anything grow from `scale(0)`? Do popovers, menus, and tooltips grow from their trigger, or from their own center?
- Do enter and exit travel the same path (a drawer that slides in from the right leaves to the right)?
- In a crossfade, can you see two states overlapping?
- Hover across a toolbar: does each tooltip wait its full delay again, or do neighbors open instantly?

**4. Navigation continuity.** Go from list to detail and back, reorder items, change pages. Does the Persona keep their sense of place, or does every view replace the last with no relationship?

**5. Slow motion.** In DevTools, set animations to 10% speed (Animations panel), or multiply durations 2–5×, and step frame by frame.
- Does every animation have a job: acknowledge, show state, preserve continuity, or direct attention? If you can't name it, it's decoration.
- Do entrances ease out (fast start, gentle landing)? Do exits start moving the instant they're triggered and run faster than entrances? Is anything the user waits on easing in (slow start)?
- Is there bounce or elastic easing on controls? That feels toy-like in a working UI.
- Is `transform-origin` right? Do coordinated properties (opacity + transform, color crossfades) stay in sync? Does the easing stop abruptly?
- Do durations feel related, or does every element use its own timing? Does routine feedback drag past 300ms? Slow feedback feels like lag.

**6. Interrupt it.** Hover off mid-transition, double-click a toggle, add toasts in quick succession, close a menu while it opens, grab a closing drawer. Does it reverse smoothly from where it is, or snap and restart? Is input ignored until the animation finishes?

**7. Throttle and watch for jank.** Set CPU throttling to 4× and record in the Performance panel.
- Are there long frames (> 16ms) or stutter during transitions? That usually means `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, or filters are animating. Diagnose with optimize's animation-performance checks.
- Does anything use `will-change` globally? Do decorative loops keep running offscreen?

**8. Load and scroll.** Reload the page.
- Is content hidden at `opacity: 0` until JS or an IntersectionObserver fires? If JS is slow, the Persona sees a blank page.
- Does every section fade up on scroll, or does a task surface play page-load choreography before the user can work?
- Does the page hijack scroll speed or direction (scrolljacking)?

**9. Optimism and long tasks.** After a like, toggle, or reorder, does the UI update instantly, or wait for the server? Does a task longer than ~1s show progress?

**10. Reduced motion.** Turn on reduced motion in the OS or DevTools. Does translation, scale, parallax, and autoplay stop, while short state feedback (opacity, color) remains?

## How to fix

1. **Read DESIGN.md's motion tokens** (durations, easings) and reuse them; never fork a curve per component. If none exist, define them first and add them to DESIGN.md:
   - `--duration-instant: 100ms`, `--duration-fast: 150ms`, `--duration-base: 220ms`, `--duration-slow: 400ms`;
   - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (enter/exit; `0.16, 1, 0.3, 1` is an equally strong alternative), `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` (moves and morphs on screen; or `0.65, 0, 0.35, 1`), `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (sheets, drawers), `--ease-in: cubic-bezier(0.7, 0, 0.84, 0)` (only for elements thrown fully off-screen). Built-in keywords are too weak for enter/exit.
2. **Gate, then list the jobs.** Apply the frequency gate from check 1; delete motion on keyboard-initiated and 100+/day actions. For what remains, name the job: acknowledge an action (hover, press, toggle, submit); show a state change (open/close, expand/collapse, selected, loading → done); preserve continuity (list → detail, reorder, page navigation); direct attention to one meaningful moment.
3. **Pick easing by motion type:** enter/exit → `--ease-out`; on-screen move or morph → `--ease-in-out`; hover and color → `ease`; constant motion (marquee, progress) → `linear`. Never ease-in on entrances, hovers, menus, or anything the user is waiting on; it delays the moment they're watching.
4. **Set durations by distance and consequence; UI motion stays under 300ms by default:**
   - press feedback 100–160ms; hover, focus, toggle 120–200ms;
   - tooltips and small popovers 125–200ms; dropdowns, selects, toasts 150–250ms;
   - modals, drawers, panels, page/view transitions 200–500ms;
   - marketing and explanatory motion can run longer: one authored focal entrance up to ~700ms.
   Exits run ~20–30% faster than entrances. Faster motion makes the whole product feel more performant.
5. **Animate only `transform` and `opacity` by default;** they stay on the compositor and hold 60fps. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`; use `transform: scale/translate`, FLIP, or `grid-template-rows: 0fr → 1fr` for expand/collapse. Blur, `clip-path`, and filters only on small, isolated elements and after measuring. List exact properties; never `transition: all`.
6. **Implement micro-transitions:**
   - **hover:** color/background/opacity change, 120–150ms; optional 1–2px translate only on clickable cards; gate hover motion behind `@media (hover: hover) and (pointer: fine)`;
   - **press:** `transform: scale(0.95–0.98)` (default 0.97) on `:active`, 80–160ms ease-out; every pressable gets it, not just buttons;
   - **focus:** ring appears instantly or ≤ 100ms; never animate it from invisible slowly;
   - **enter:** opacity 0 → 1 plus translate 4–12px or scale 0.9–0.97 → 1, ease-out; never from `scale(0)`; use `@starting-style` for elements entering from `display: none` (no JS needed);
   - **origin:** popovers, menus, and tooltips scale from their trigger (`transform-origin` at the trigger side, or a headless primitive's `--transform-origin` variable); modals are exempt and stay centered;
   - **exit:** same path and edge as the enter, shorter, starting immediately; use `transition-behavior: allow-discrete` for `display`/`overlay`;
   - **tooltips:** delay the first one (~0.5–1s); once one is open, adjacent tooltips open instantly with no animation.
7. **Make it interruptible:** use CSS transitions (they retarget mid-flight) instead of `@keyframes` (they restart) for anything triggered rapidly (toggles, stacking toasts). Never lock input during a transition. Start any new animation from the current on-screen value, not the logical target. Gesture-driven motion uses springs, which do this by default.
8. **Asymmetric timing:** slow where the user decides, fast where the system answers. Hold-to-confirm fills over ~2s `linear`; releasing early snaps back in ~200ms ease-out.
9. **Continuity:** use the View Transitions API (`document.startViewTransition`, or `@view-transition { navigation: auto; }` for multi-page sites) with `view-transition-name` on shared elements. Feature-detect and fall back to an instant change.
10. **Lists:** stagger siblings 30–50ms each (up to 80ms for a few large items), capped at ~300ms total. Never stagger every section on a page. Staggered entrance motion is decorative, for marketing elements only, and never blocks interaction; working controls appear immediately.
11. **Springs for interactive, physical motion** (drag, swipe, sheets, layout moves, gestures that can reverse, "alive" elements): default critically damped (e.g. stiffness ~600, damping ~24) settling in ~300–500ms with no visible overshoot. Allow bounce 0.1–0.3 only when the gesture carried momentum (a flick or drag release) or the moment is rare and playful. Hand the gesture's release velocity to the spring. For decorative pointer-follow, interpolate through a spring rather than binding 1:1. Keep simple hover/color feedback on duration tokens.
12. **Masking a crossfade:** if two states visibly overlap after tuning easing and duration, add `filter: blur(2–5px)` during the transition (keep it under 20px).
13. **Optimistic UI:** reflect the action immediately, then reconcile with the server; roll back with a clear message on failure.
14. **Micro-interaction catalog** (pick only what has a job): text slide on hover, scale-down on press, toast with progress → success state, name tag on avatar hover, delayed tooltips (~0.5–1s), progress bar for long tasks, card stack, search field expanding on focus, hover-to-reveal details (with a touch path), dim sibling bars on chart hover.
15. **Custom page transitions:** if implementing swipe-back, move the background page ~35% of the distance (parallax) while the top page follows the finger.
16. **`will-change` discipline:** add it only right before a known, expensive animation (or after seeing a 1px shift at start/end) and remove it after; never in global CSS or on many elements.
17. **JS animation:** CSS first, then Web Animations API or the project's existing library. Motion that plays during navigation, hydration, or fetching belongs in CSS or WAAPI, which survive a busy main thread. Use `requestAnimationFrame`; never animate from scroll handlers without `passive` listeners or Scroll-driven Animations (`animation-timeline`) behind `@supports`.
18. **Reduced motion means fewer and gentler, not zero:** under `@media (prefers-reduced-motion: reduce)`, remove translation, scale, parallax, overshoot, and autoplay; cross-fade instead of slide; keep short opacity/color transitions (≤ 150ms) that confirm state.
19. **Content visible by default.** Never ship elements at `opacity: 0` waiting for JS or an IntersectionObserver.

## Rules
- [ ] Every animation has a named job; removing it would lose feedback or context.
- [ ] No animation on keyboard-initiated or 100+/day actions; tens-per-day motion is near-imperceptible.
- [ ] Only `transform`/`opacity` animated, except measured exceptions; no `transition: all`.
- [ ] All durations and easings come from tokens; UI motion < 300ms (micro 100–200ms); modals/drawers 200–500ms; only marketing/explanatory motion runs longer.
- [ ] Easing matches motion type; no ease-in on entrances, hovers, or anything the user waits on.
- [ ] Exits faster than entrances and along the same path; no bounce or elastic easing on UI controls (critically-damped springs allowed; bounce 0.1–0.3 only after momentum or in rare playful moments).
- [ ] Every pressable has press feedback (scale 0.95–0.98, ~0.97, on `:active`).
- [ ] Nothing enters from `scale(0)`; popovers, menus, and tooltips grow from their trigger; modals stay centered.
- [ ] Tooltips after the first open instantly.
- [ ] Optimistic updates for reversible actions; progress shown for long tasks.
- [ ] Animations are interruptible (hover off mid-transition reverses smoothly); rapidly re-triggered UI uses transitions, not keyframes; input never locked.
- [ ] Hover motion gated to `(hover: hover) and (pointer: fine)`.
- [ ] `prefers-reduced-motion` path exists and keeps state feedback.
- [ ] No layout shift caused by animation; Performance panel shows no long frames (> 16ms) during transitions.
- [ ] `will-change` is not set globally.
- [ ] Offscreen or hidden loops pause.

## Avoid
- Fade-up-on-scroll on every section.
- Scrolljacking (overriding native scroll speed or direction).
- Page-load choreography on task surfaces; users came to work.
- Hover lift + big shadow on non-clickable cards.
- Animating layout properties or `box-shadow` on large elements; `transition: all`.
- Durations over 300ms for routine UI (over 500ms for anything but marketing); long feedback feels like lag.
- Infinite decorative loops (pulsing buttons, floating blobs).
- `scale(0)` entrances, ease-in on UI, and motion on keyboard-initiated actions.
- `@keyframes` on toggles, toasts, or anything re-triggered rapidly.
- Identical speed for enter and exit; exits that leave by a different edge than they came in.
- A new easing curve per component.

## Verify in the Capture Matrix
- Record or step through each transition in light/dark × desktop/mobile; static Captures can't prove motion, so also inspect computed styles. Review it in slow motion and frame by frame, then again with fresh eyes later.
- **Desktop:** hover and focus feedback visible on every interactive element, including in dark mode where subtle background shifts disappear.
- **Mobile:** press feedback replaces hover; transitions stay smooth with 4× CPU throttling. Drag, swipe, and sheet gestures need a real phone; state which gestures were verified on hardware and which only in emulation.
- Toggle reduced motion and recheck. Motion & interaction should rise with no Robustness & performance regression.
