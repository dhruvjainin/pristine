# Pattern: motion recipes

Ready implementations for the motion that comes up most. Start from a recipe and adapt it to DESIGN.md's tokens. Read [../lenses/animate.md](../lenses/animate.md) first to decide whether something should animate at all.

## Tokens

Define once, reuse everywhere. Built-in `ease`/`ease-out` keywords are too weak for UI.

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* enter, exit, responses */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* elements moving on screen */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* sheets and drawers */
  --dur-press: 140ms; --dur-small: 180ms; --dur-medium: 240ms; --dur-large: 400ms;
}
```

| Moment | Easing | Duration |
|---|---|---|
| Press feedback | `--ease-out` | 100–160ms |
| Tooltip, small popover | `--ease-out` | 125–200ms |
| Dropdown, select, menu | `--ease-out` | 150–250ms |
| Modal, drawer, sheet | `--ease-out` / `--ease-drawer` | 200–500ms |
| On-screen move or morph | `--ease-in-out` | 200–300ms |
| Hover color change | `ease` | 150ms |
| Progress, marquee, hold-to-confirm fill | `linear` | as needed |
| Marketing / explanatory | any | can be longer |

## Recipes

**Button press** (every pressable element; `scale()` takes the label and icon along):
```css
.btn { transition: transform var(--dur-press) var(--ease-out); }
.btn:active { transform: scale(0.97); }
```

**Popover / dropdown / menu**: grows out of its trigger, never from nothing:
```css
.popover { transform-origin: var(--transform-origin, top); transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out); }
.popover[data-starting-style], .popover[data-ending-style] { opacity: 0; transform: scale(0.95); }
```
Without a primitive that supplies the origin, set `transform-origin` to the side facing the trigger.

**Tooltip**: same as popover at 125ms and `scale(0.97)`. Delay the first one (~500ms); once one is open, neighbors open instantly with `transition-duration: 0ms`. For a row of tooltips (column headings, toolbar icons, a rating scale), wrap them in the library's shared provider/group with a short delay (~200ms), so moving to the neighbor opens it right away. Tooltips are a supplement: the same meaning must reach keyboard and screen-reader users through the control's accessible name (e.g. `aria-label="Speed 1 of 5, slowest"`), never through hover alone.

**Modal**: the exception that stays centered. `transform-origin: center`, `scale(0.96)` + opacity over ~250ms, with the backdrop fading on the same timing so they read as one surface.

**Drawer / sheet**: `transform: translateY(100%)` when closed → `translateY(0)`, `500ms var(--ease-drawer)`. Percent translate moves by the element's own size, so it works at any height.

**Toast**: enter with `@starting-style { opacity: 0; transform: translateY(100%); }` and a transition (not keyframes) so rapid toasts retarget smoothly. Exit along the same edge it entered.

**Accordion**: `height` + `opacity` over ~200ms `--ease-out`. One of the few acceptable layout animations; keep it short and measure the real height rather than animating to `auto` (or use `interpolate-size: allow-keywords` where supported).

**Stagger** (lists the user sees occasionally, not ones they scroll all day): 30–80ms between items, `translateY(8px)` + opacity, 300ms `--ease-out`. Never blocks interaction.

**Hold to confirm** (destructive actions):
```css
.hold .fill { clip-path: inset(0 100% 0 0); transition: clip-path 200ms var(--ease-out); } /* release: fast */
.hold:active .fill { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }           /* press: deliberate */
```

**Tab color transition**: duplicate the tab list styled as active, clip the copy to the active tab, and animate the `clip-path` (~250ms `--ease-in-out`). Text and background change in perfect sync.

**Scroll reveal** (Persuade surfaces only, once per element): `clip-path: inset(0 0 100% 0)` → `inset(0)` or a short fade-up, triggered by `IntersectionObserver` with a ~100px margin. Never on functional UI visited daily.

**Crossfade that won't settle**: when two states visibly overlap mid-transition, add `filter: blur(2px)` + `opacity: 0.7` during the swap. Keep blur under 20px.

**Number change**: `font-variant-numeric: tabular-nums`, then roll or fade digits; never let the width jump.

**Programmatic without a library**: the Web Animations API (`el.animate(keyframes, { duration, easing, fill: 'forwards' })`) runs off the main thread and is interruptible.

**Exit animations in React (no animation library)**: React removes the node before it can animate out. Clone it instead:
1. Before removal, `cloneNode(true)` the element and place the clone at its last position, in a layer marked `aria-hidden="true"` and `inert` (with `pointer-events: none`).
2. Strip the clone's `id`, every `aria-*`, and `data-*` attributes from it and its descendants, so tests, anchors, and assistive tech never see a duplicate.
3. Give the clone `transition: none`. CSS transitions override Web Animations on the same property, so an inherited transition would hijack the exit.
4. Run the exit with `el.animate(...)` and remove the clone in `animation.finished.then(...)`, never on a `setTimeout`.
5. Under reduced motion, run a short fade on the clone instead of skipping it.

## Gestures (drag, swipe, sheets)

- Track 1:1 with the pointer and respect the grab offset; `setPointerCapture` once the drag starts.
- Ignore extra touch points after a drag begins, or switching fingers makes the element jump.
- Dismiss on **velocity** as well as distance: `abs(distance) / elapsedMs > ~0.11` is a flick.
- Past a boundary, resist progressively (rubber-band); never a hard wall.
- Settle with a spring that inherits the release velocity; choose the snap point from where momentum would carry it, not from the release point.
- Interruptible: grabbing a moving element follows the finger from its current position; never lock input mid-transition.
- Set `transform` on the dragged element directly, not via a CSS variable on its parent.

## Springs

- Default: critically damped, no overshoot (`{ type: "spring", bounce: 0, duration: 0.4 }`).
- Add bounce 0.1–0.3 only when the gesture carried momentum (flick, throw, drag release) or the moment is rare and playful.
- Decorative pointer-follow effects: interpolate through a spring rather than binding 1:1, and only when the element is decorative.

## Reduced motion

`@media (prefers-reduced-motion: reduce)`: replace movement (slide, scale, parallax, springs) with a short opacity cross-fade; keep color and opacity changes that aid comprehension. Fewer and gentler, not zero: state changes still fade (~150–200ms), they never jump instantly. Don't use a global `animation: none !important` / `transition: none` reset.

## Vocabulary for reports

Use exact names when describing motion: *fade, slide, scale-in, pop-in, reveal, stagger, crossfade, morph, shared element transition, layout animation, origin-aware, direction-aware transition, press feedback, hold to confirm, swipe to dismiss, rubber-banding, momentum, interruptible, scroll-driven, parallax, view transition, skeleton/shimmer, number ticker, jank, dropped frame, compositing*.
