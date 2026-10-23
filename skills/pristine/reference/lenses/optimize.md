# Optimize

Optimize is about how fast the product feels to the Persona on their real device, not on a developer's laptop. A designer judges speed by what they see: when the main content appears, whether things jump, and whether every tap answers instantly; then they measure, fix the biggest bottleneck, and measure again.

**Raises:** Robustness & performance.
**Skip it when:** nothing is measurably slow; do not optimize by guesswork. Never trade accessibility, content, or the Design System's visual quality for a better number.

## What a designer looks at

Look at the Capture, then load and use the target as the Persona would. DESIGN.md names their devices and connections; a mid-range Android on 4G is a sane default.

**1. First load on throttled 4G.** Use a production build with mobile emulation (4× CPU throttle, slow 4G).
- What appears first? How long until the hero image or headline shows? If the main content arrives late, LCP is the problem.
- Do you stare at a blank page while scripts load? That means render-blocking JS or CSS, or no server rendering above the fold.

**2. Watch things jump.**
- Reload and watch the screenshot sequence. Does text move when an image, ad, banner, or async block arrives? Does anything get inserted above what you are reading? That is CLS.
- Do fonts flash or swap visibly, reflowing the text?
- Does the dark theme flash light (or the wrong theme) before first paint?

**3. Tap, type, and wait.**
- Click buttons, type in inputs, open menus. Does the response lag? Anything slower than ~200ms feels broken (INP).
- Does every action answer within 400ms with its result, an optimistic update, or a progress cue? Past that, attention drifts and people stop trusting the click (Doherty threshold).
- Does typing in search stutter because work runs on every keystroke?

**4. Scroll fast.**
- Fling through long lists and long pages. Does scrolling freeze or drop frames? Do animations stutter?
- Long lists that freeze scrolling usually need virtualization; stutter during animation usually means animating layout properties.

**5. Check the waterfall.** Open the Network and Performance panels.
- Is the LCP element lazy-loaded, or requested late? Is it an oversized JPEG/PNG?
- How big are JS, CSS, fonts, and images? Is there a 2MB image? Are heavy widgets (charts, editors, maps) loaded on routes that don't show them?
- How many font files? Are they woff2 and subset? Are there unused third-party scripts?
- In the Performance panel, are there long tasks > 50ms or frame drops during interaction?

**6. Profile the motion.** The frame budget is 16.7ms at 60Hz and ~8ms at 120Hz; design for the smaller one, judged on a mid-range phone, not a fast laptop. Record a Performance trace while each animation plays (open a drawer, drag, switch tabs during navigation).
- Which tier does each animated property hit? Composite-only (`transform`, `opacity`; increasingly `filter`, `clip-path`, `background-color`) is cheap; paint (`box-shadow`, `border-radius`, `color`) redraws every frame; layout (`width`, `height`, `padding`, `margin`, `top`, `left`, `border-width`) re-measures, and also moves neighbors (a sidebar animating `margin` re-lays out the whole page).
- Does it stutter only while the page is busy (navigation, hydration, fetch)? Then it is a main-thread animation (rAF or a JS library) competing with that work.
- Does it get worse as content grows? Suspect an inherited CSS variable updated per frame on a parent, or too many nodes.
- Does a React component re-render every frame (state set inside `requestAnimationFrame`, `pointermove`, `scroll`, or drag handlers)?
- Does an element shift 1px when motion starts or ends? Does animated blur lag (especially in Safari)?

**7. Compare with the field.** If real-user data exists, use it; a fast desktop result proves nothing.

Before editing, record the baseline and name the top 3 bottlenecks with evidence. For animation jank, name the cause before changing code, in this order: animated properties → busy main thread → per-frame re-render → degrades with content (inherited CSS variable, too many nodes) → animated CSS variable → blur → `will-change`. Say which findings are verified from code and which need a device trace.

## How to fix

1. **Read DESIGN.md**: Personas' devices and connections, plus the fonts and imagery the Design System requires.
2. **Measure a baseline** with Lighthouse or the browser Performance panel under the throttling above; use field data if available. Record:
   - **LCP** target < 2.5s; **INP** < 200ms; **CLS** < 0.1;
   - JS transferred (target < 170KB gzip for initial route on task UIs), CSS, fonts, images;
   - long tasks > 50ms and frame drops during interaction.
3. **Fix the top 3 bottlenecks in order of impact.**
4. **LCP:**
   - identify the LCP element; if it is an image, serve AVIF/WebP at the displayed size via `srcset`/`sizes`, add `fetchpriority="high"`, never `loading="lazy"` on it;
   - preload the LCP image and critical fonts; inline critical CSS; remove render-blocking scripts (`defer`/`async`);
   - server-render or pre-render above-the-fold content.
5. **CLS:**
   - `width`/`height` or `aspect-ratio` on every image, video, iframe, and embed;
   - reserve space for ads, banners, and async content; never insert content above existing content;
   - skeletons sized like the final content;
   - metric-matched font fallbacks (`size-adjust`, `ascent-override`, `descent-override`).
6. **INP:**
   - break long tasks (`scheduler.yield()` or `setTimeout` chunks); move heavy work to Web Workers;
   - debounce input-driven work (~150–300ms); avoid synchronous layout reads after writes (batch reads, then writes);
   - virtualize lists over ~200 rows (1,000+ rows must be virtualized or paginated; say which); use `content-visibility: auto` with `contain-intrinsic-size` for long pages;
   - minimize re-renders (memoize expensive components and values; stable keys);
   - keep every action inside the Doherty threshold: acknowledge on press (~100ms: pressed state, disabled submit), then show the result within 400ms; when the server can't, use an optimistic update (rolled back visibly on failure) for low-risk actions, or a progress cue that names the operation.
7. **Images:** compress at ~75–85% quality; max 2× the displayed size; `loading="lazy"` and `decoding="async"` below the fold; SVG for icons and logos.
8. **Fonts:** woff2 only; subset to used characters; load only used weights (≤ 4 files); `font-display: swap` (or `optional` for non-brand faces); self-host instead of third-party CSS where possible.
9. **JS and CSS:** route- and component-level code splitting; dynamic `import()` for heavy widgets (charts, editors, maps); remove unused dependencies and dead CSS; replace heavy libraries with platform features where possible.
10. **Rendering:** animate only `transform`/`opacity`; `will-change` only during animation; `contain: layout paint` on independent widgets; passive scroll listeners; `IntersectionObserver` instead of scroll math.
11. **Animation performance:**
   - swap down a tier: size → `scale()`; position → `translate()` (percentages are relative to the element's own size, right for elements of unknown size); `display`/`visibility` → `opacity`; `box-shadow` → `filter: drop-shadow()` or the `opacity` of a pseudo-element carrying the shadow;
   - motion that plays during navigation, hydration, or fetching runs in CSS or WAAPI (`el.animate()`), not rAF; Framer Motion's `x`/`y`/`scale` shorthands are not hardware-accelerated, so use a transform string (`animate={{ transform: "translateX(100px)" }}`) when it must survive load;
   - in React, never `setState` per frame; write to `ref.current.style.transform` or a motion value;
   - set `transform` on the moving element itself, not a CSS variable on a parent that every descendant inherits;
   - animated `blur()` under 20px (2–5px is usually enough);
   - `will-change: transform` only after seeing a 1px shift or measured drops, on the animating element only, never on `*` or large containers.
12. **Network:** cache static assets with long-lived immutable hashes; compress with Brotli; preconnect to required origins; remove unused third-party scripts.
13. **Theme before first paint:** set `color-scheme` and the theme before first paint so there is no flash of the wrong theme.
14. **Re-measure under the same conditions** and record before/after numbers. Keep fonts and imagery as DESIGN.md specifies; if a new token is needed, add it there.

## Rules
- [ ] Baseline and after numbers recorded under identical conditions.
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile emulation (or a clear improvement with the remaining blocker named).
- [ ] Every core action shows its result, an optimistic update, or a progress cue within 400ms.
- [ ] Initial-route JS < 170KB gzip on task UIs.
- [ ] LCP element is prioritized, not lazy-loaded.
- [ ] Every media element has dimensions or `aspect-ratio`.
- [ ] Fonts: woff2, subset, ≤ 4 files, no visible layout shift on swap.
- [ ] No long task > 50ms during core interactions.
- [ ] Heavy components load on demand.
- [ ] Animations stay inside an 8ms frame on a mid-range phone trace; only composite-tier properties animate unless measured.
- [ ] No per-frame React state updates or per-frame inherited CSS variables; motion during navigation/hydration runs in CSS or WAAPI.
- [ ] Lists of 1,000+ rows are virtualized or paginated.
- [ ] Functionality and visuals unchanged.

## Avoid
- Optimizing without measuring, or micro-optimizing while a 2MB image remains.
- `loading="lazy"` on above-the-fold images.
- `will-change` on many elements (wastes memory), on `*`, or on large containers.
- Animating `box-shadow`, `margin`, or `width` when a `filter`, `translate`, or `scale` swap looks the same.
- Changing animation code before naming the cause, or judging smoothness only on a fast laptop.
- Removing focus styles, alt text, or content to win a score.
- Measuring only on a fast desktop.

## Verify in the Capture Matrix
- Take the Capture after optimization in light/dark × desktop/mobile; images, fonts, and layout must look identical to before (compare side by side).
- **Mobile light/dark:** measure with throttling; this is where wins and regressions show. For animation fixes, attach a Performance recording; say which causes were confirmed by a trace and which were inferred from code and still need a real device.
- **Desktop and mobile dark:** theme switching must not cause a flash of the wrong theme (`color-scheme` and theme set before first paint).
- Robustness & performance should rise with measured evidence; no other Dimension may drop.
