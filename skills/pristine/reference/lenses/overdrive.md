# Overdrive

Overdrive is the one extraordinary moment that makes a Persona say "I didn't know a website could do that". It has the highest risk of misfiring of any lens, so propose first, build second.

**Raises:** Persona fit.
**Skip it when:** fundamentals are weak (hierarchy, type, contrast, states); technical ambition can't mask them. Use it only when the floor is met (Dimensions mostly ≥ 7/10). Don't combine with quieter on the same target. Skip surfaces where Personas need calm focus and the effect adds no function (e.g. a particle background on a settings page).

## What a designer looks at

Open the Capture and use the target as the Persona would. Look for the single place where going further would change how the product feels. Run these checks in order.

**1. The unforgettable question.** What would make this unforgettable for this Persona? Not "what's cool", but what would they tell a friend about? If you can't answer it in one sentence tied to the Persona, overdrive isn't warranted here.

**2. Is the floor met?** Squint at hierarchy, check type, contrast, and every state. If any are weak, stop: a showpiece on a shaky base looks like a gimmick.

**3. Where is the candidate moment?** Look for a target that deserves it:
- a hero or portfolio that needs a signature visual;
- a dialog that should morph from its trigger;
- a table with 100k rows that must scroll at 60fps;
- a chart that should transition between states;
- a search that must filter instantly.

**4. What kind of extraordinary fits this surface?**
- **Marketing/portfolio:** sensory (scroll-linked reveal, shader or canvas visual, cinematic transition).
- **Functional UI:** feel (morphing dialogs, optimistic instant updates, smooth drag-and-drop).
- **Data-heavy UI:** fluidity (virtualized lists, animated chart transitions, canvas/WebGL for large datasets).
- **Performance-critical UI:** invisible speed (work in a Web Worker, never block input).

**5. Competition.** Count showpieces on the page or flow. More than one means they fight; pick one.

**6. Context fit.** Does the idea relate to the product and brand, or is it a particle background, cursor trail, or 3D blob that could sit on any site? Does it change how the product *feels*, or creep into changing what it *does* (new backend features)?

**7. Cost on a real phone.** Picture it on a mid-range phone with 4× CPU throttle. Would it hold ≥ 50fps? Would it hide content until JS runs? What happens on a browser without the API?

## How to fix

1. **Read DESIGN.md:** Personas, product voice, Design System, and any performance budget. Decide what "extraordinary" means here (check 4).
2. **Write 2–3 directions.** For each: what the user sees and feels, the technique, browser support, performance cost, and the fallback.
3. **Present the directions to the user and wait for a choice.** If you can't ask (non-interactive run), pick the lowest-risk direction that still clears the "wow" bar and state why.
4. **Build with progressive enhancement.** The experience without the enhancement must still be good:
   - `@supports (animation-timeline: scroll()) { … }` for scroll-driven animation;
   - `if (document.startViewTransition)` for View Transitions;
   - WebGPU → WebGL2 → static image or CSS fallback;
   - `@property` to animate custom properties (gradients, angles) where supported.
5. **Pick tools by goal:**
   - cinematic transitions: View Transitions API, `@starting-style`, FLIP, spring physics via the project's motion library;
   - beyond CSS: Canvas 2D, OffscreenCanvas in a Worker, WebGL (Three.js/OGL), SVG filters for small regions;
   - big data: virtual scrolling (render only visible rows), canvas-rendered charts, animated data transitions;
   - heavy work: Web Workers, WASM.
6. **Hold performance:**
   - 60fps target; if frames drop below 50fps on a mid-range phone, simplify;
   - lazy-initialize heavy contexts (WebGL, WASM) only when near the viewport;
   - pause rendering when offscreen or the tab is hidden (`IntersectionObserver`, `visibilitychange`);
   - keep the main thread free for input (INP < 200ms).
7. **Accessibility:** `prefers-reduced-motion` gets a static or gently faded version; canvas content has a text alternative; nothing flashes more than 3 times per second; sound requires opt-in.
8. **Spend the last 20% on tuning:** easing, timing offsets, secondary motion. Ship the version that feels inevitable, not the first that runs.
9. **Record any new technique, motion token, or dependency in DESIGN.md.**

## Rules
- [ ] Directions proposed (or lowest-risk choice justified) before any code.
- [ ] Exactly one extraordinary moment per page or flow.
- [ ] Works and looks good with the enhancement unavailable.
- [ ] ≥ 50fps on a mid-range phone (4× CPU throttle); no long tasks > 50ms during interaction.
- [ ] Heavy resources lazy-load and pause offscreen.
- [ ] Reduced-motion path exists; no flashing; sound opt-in only.
- [ ] Added JS/asset weight is justified (state it in KB).
- [ ] The effect fits the brand and Personas.

## Avoid
- Multiple competing showpieces on one page.
- Particle backgrounds, cursor trails, and 3D blobs with no relationship to the product.
- Bleeding-edge APIs without a fallback.
- Effects that hide content until JS runs.
- Changing what the product does (new backend features) instead of how it feels.

## Verify in the Capture Matrix
- Capture the effect's start, middle, and end states in light/dark × desktop/mobile, plus the fallback.
- **Mobile:** test on a real or throttled mid-range device; reduce or disable the effect if it janks.
- **Dark:** shaders and canvases often hard-code colors; read them from the theme tokens.
- Run two tests: the removal test (does the experience feel diminished without it?) and the context test (does it fit this brand?). Persona fit should rise with no Robustness & performance or Accessibility regression.
