# Adapt

Adapting is rethinking the experience for the context the Persona is in, not scaling pixels down. A phone on a bus, a laptop at a desk, and a 27-inch monitor each need the same product to feel native to them.

**Raises:** Responsiveness (especially for Personas who use the product on phones).
**Skip it when:** the issue is the same on every viewport (use layout or typeset). Pristine is web only: don't produce native iOS/Android guidance; adapt covers responsive web, mobile web, and installable web apps.

## What a designer looks at

Open the mobile and desktop Captures and look before touching code. Then interact. Run these checks in order.

**1. The slow resize.** Drag the window slowly from 1440px down to 320px, then up to 1920px.
- Where does it first break? Note the exact width. Breakpoints belong where content breaks, not at device names.
- Does anything scroll horizontally, overflow, or overlap? Do tables spill out of the viewport?
- Is the mobile view a rethink or just the desktop layout shrunk? Multi-column layouts squeezed into 375px mean nobody designed mobile.
- On wide screens, does the layout stretch edge to edge, with text lines running far past ~75 characters?

**2. Thumb zone and one-handed use.** Hold a phone (or picture it) in one hand.
- Can the thumb reach the primary action? On long flows, if it sits at the top, the Persona has to shift their grip every time.
- Are tap targets at least 44×44px with ≥ 8px between them? Tiny or crowded targets mean mis-taps; small, far targets are slow to hit (Fitts' law).
- Do sticky headers and bottom bars eat the viewport, leaving a sliver for content?

**3. Readability on a phone.** Is body text below 16px? Do inputs zoom the page when focused (a sign their font is under 16px)? Do labels sit beside fields and get squeezed?

**4. Hover dependence.** Use only touch. Is there any menu, tooltip, or action that only appears on hover? If so, that function doesn't exist for touch users. Does every control show a press state on tap, the instant the finger lands (pointer-down), not on release? After a tap, does a hover style stick? Does double-tap zoom delay taps on buttons?
- Then try a touch laptop or a tablet with a trackpad: does the UI assume touch and mouse are exclusive (hover effects missing for the trackpad, or targets too small for the finger)? Is the code sniffing the user agent instead of querying capabilities?

**5. Feature parity.** List every desktop feature. Can you reach each one on mobile, maybe reorganized? Anything hidden with `display: none` is lost, not adapted.

**6. Device edges.**
- Do fixed bars collide with the notch or home indicator?
- Does a full-height section get cut off by mobile browser chrome?
- When the keyboard opens, do sticky elements cover the focused input?
- Turn the phone landscape (e.g. 844×390). Is the primary action still visible?

**7. Scroll and navigation on a phone.**
- Does any section scroll both ways? Does a horizontal scroller show a peeking next item, or does it look like the end?
- Does a small task (filter, quick edit, pick one) navigate to a full page where a bottom sheet would keep context?
- Do contextual actions appear only when relevant (e.g. a bulk-action bar after selecting rows), or sit there permanently?

**8. Imperfect content.** Fill it with long names, wrapping titles, and 0, 1, and many items. Does text or an icon over an image stay legible on light and dark photos?

**9. Components in more than one context.** Does a card that lives in both a sidebar and the main column look right in both, or only where it was designed?

## How to fix

1. **Read DESIGN.md:** Personas' devices and contexts (on the go vs at a desk), breakpoints, and spacing/type tokens.
2. **Capture at 320, 375, 768, 1024, 1440, and 1920px.** List what breaks at each width and what is missing, hidden, or unreachable.
3. **Write mobile-first CSS:** base styles for the narrowest screen, then `min-width` queries to add complexity. Place breakpoints where content breaks, typically around 640, 768, 1024, and 1280px; use the project's existing breakpoints if DESIGN.md defines them.
4. **Prefer intrinsic layouts** that need fewer breakpoints:
   - `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))`;
   - `flex-wrap: wrap` with `gap`;
   - container queries (`container-type: inline-size; @container (min-width: 480px)`) for components that live in both sidebars and main columns.
5. **Use bounded fluid values:** `clamp()` for display type and section spacing (e.g. `padding-block: clamp(3rem, 8vw, 8rem)`). Keep body text at a fixed 1rem–1.125rem.
6. **Restructure, don't shrink:**
   - multi-column → single column ordered by priority;
   - side navigation → top bar with a drawer, a bottom tab bar with 3–4 primary destinations (max 5), or a home screen that replaces the sidebar;
   - small tasks (filters, quick edits, pickers) → bottom sheet that keeps context instead of full-page navigation;
   - persistent action rows → contextual actions that appear when needed (e.g. bulk bar on selection);
   - one scroll direction per section; horizontal scrollers show a peeking next item (e.g. ~15–20% of the next card);
   - wide tables → priority columns + horizontal scroll container with a visible affordance, or stacked rows with labels;
   - hover tooltips and menus → tap-to-open, or always-visible text;
   - dense toolbars → overflow menu for secondary actions.
7. **Touch:** targets ≥ 44×44px with ≥ 8px between adjacent targets. When the visible mark is smaller, enlarge the hit area with a `::after` overlay (see [../craft-floor.md](../craft-floor.md) → States), not a `min-height` that bloats the visible chip; in wrapped rows, overlays must not overlap. Put primary actions within thumb reach (bottom half) on long mobile flows. Press states (`:active`) replace hover on touch; every hover-revealed action needs a tap path.
8. **Imperfect content:** truncate or wrap long names deliberately, design 0/1/many item states, and add a scrim or gradient behind text and icons placed on images.
9. **Detect input, not device:** `@media (hover: hover) and (pointer: fine)` for hover effects; `(pointer: coarse)` for larger targets; `any-pointer`/`any-hover` when a device has both. Touch and mouse are not exclusive, so gate by capability, never by UA sniffing or screen width. Never put essential function behind hover.
   - Pointer-down feedback on every tappable (`:active` styles) and `touch-action: manipulation` to remove double-tap-zoom delay on controls.
   - Platform fixes (`dvh`/`svh`, safe areas, 16px inputs, tap highlight, overscroll, `theme-color`) are collected in [../patterns/mobile-web.md](../patterns/mobile-web.md).
10. **Safe areas:** `viewport-fit=cover` in the viewport meta tag and `padding: max(1rem, env(safe-area-inset-*))` on fixed headers and bottom bars.
11. **Viewport units:** `100dvh`/`100svh` instead of `100vh` for full-height sections so mobile browser chrome doesn't hide content.
12. **Forms:** inputs ≥ 16px font, correct `type`, `inputmode`, and `autocomplete`; labels above fields on mobile.
13. **Images:** `srcset` + `sizes` for resolution, `<picture>` for art-directed crops; set `width`/`height` or `aspect-ratio`.
14. **Wide screens:** cap content width (1120–1440px) and line length (≤ 75ch); use extra space for secondary panels, not longer lines.
15. **Flexibility:** when no single layout fits every Persona, let people personalize (collapse panels, reorder or hide what they don't use) rather than forcing one compromise.
16. **Add any new breakpoints or fluid tokens to DESIGN.md.**

## Rules
- [ ] No horizontal scroll at 320px.
- [ ] Body ≥ 16px on mobile; inputs ≥ 16px.
- [ ] Every tap target ≥ 44×44px with ≥ 8px spacing; small marks keep their visible size and grow the hit area with `::after`; no two hit areas overlap, including across wrapped rows.
- [ ] No functionality available only on hover; every control has a touch press state.
- [ ] Hover and pointer behavior gated by capability media queries (`hover`, `pointer`), never UA or width; tappables have pointer-down feedback and `touch-action: manipulation`.
- [ ] Bottom tab bar (if used) has 3–4 items, max 5, each ≥ 44px tall.
- [ ] One scroll direction per section; horizontal scrollers show a peeking next item.
- [ ] Text and icons over images have a scrim; long names, 0, 1, and many items hold.
- [ ] Every desktop feature is reachable on mobile (maybe reorganized, never removed).
- [ ] Full-height sections use `dvh`/`svh`; fixed bars respect safe areas.
- [ ] Container queries used for components rendered in more than one width context.
- [ ] Content max-width set for ≥ 1440px screens.
- [ ] Landscape phone (e.g. 844×390) keeps the primary action visible.

## Avoid
- Hiding core content with `display: none` on mobile.
- Device sniffing instead of feature and media queries; assuming a device is either touch or mouse, never both.
- Separate mobile and desktop information architectures.
- Fixed pixel widths on text containers and buttons.
- Fluid `clamp()` on dense app UI body text.
- Bottom sheets and drawers that trap scroll or lack a close control.
- Full-page navigation for small tasks a bottom sheet could hold.
- Horizontal carousels whose last visible item ends flush at the edge (no peek).

## Verify in the Capture Matrix
- **Mobile light/dark:** the primary task completes with touch; no overflow; sticky elements don't cover inputs when the keyboard opens.
- **Desktop light/dark:** hover enhancements appear only for fine pointers; layout uses space without over-stretching lines.
- Add intermediate widths (768, 1024) to the Capture when the layout changes there. Screenshots prove layout only; state which gestures were tested and how (emulation vs real device).
- Responsiveness should rise on mobile without lowering desktop.
