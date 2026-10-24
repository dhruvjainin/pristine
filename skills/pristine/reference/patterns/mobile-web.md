# Pattern: mobile web

Use whenever the Capture Matrix has a mobile cell (390×844), and for any Persona who uses a phone. Mobile is a different layout, not a squeezed desktop.

## Navigation

- App-like products: a bottom tab bar with 3–4 items (5 at most), icons plus short labels, active state obvious. Or a home screen whose sections replace the desktop sidebar.
- Content sites: a top bar with a menu button; keep the primary CTA visible.
- Back is always available and predictable. Custom page transitions that slide: the previous page moves ~35% (parallax), not 100%.

## Layout

- One screen does one thing. Split desktop multi-panel views into a list → detail flow.
- One scroll direction per section. Horizontal scrollers show a peeking next item so they're discoverable.
- More vertical space than you expect: bigger gaps between groups, generous padding (16–20px page gutter).
- Tables become cards or stacked rows: the key value on top, secondary values below, actions in a menu.
- Things often get **bigger** on mobile: base text 16–17px, tap targets ≥44×44px (hit area via a `::after` overlay when the visible mark is smaller, never overlapping a neighbour's), inputs ≥16px font (prevents zoom on focus).
- Primary actions in thumb reach: bottom of the screen, full-width or a sticky bottom bar.

## Interaction

- No hover on touch. Every hover-revealed action needs a visible or long-press path; give press states (slightly darker, scale ~0.97) instead.
- Bottom sheets for small tasks (filters, pickers, quick edits) keep context better than a new page.
- Contextual actions appear and disappear as needed: a selection bar when items are selected, a "save" bar when a form is dirty.
- Long-press for preview or secondary actions only when there's also a visible path.

## Content

- Design for imperfect content: long names wrap or truncate cleanly; 0, 1, and many items all look intentional; numbers don't overflow.
- Text or icons over images get a contrast scrim or circle background.
- Empty states: first-run (explain plus one action) and no-results (suggestions, clear filters).
- Onboarding: sequenced contextual tips at the moment they matter, not a carousel or a 6-bullet modal.

## Platform layer: feel installed, not embedded

Most "feels janky on my phone" reports are not design problems; they're one-line platform fixes. Gate by capability (`hover`, `pointer` media queries), never by user agent or screen width; touch and mouse can coexist on one device.

| Symptom | Fix |
|---|---|
| Hover style sticks after a tap | Put every `:hover` rule inside `@media (hover: hover) and (pointer: fine)`; give touch an `:active` state instead |
| Gray/blue flash on tap | `html { -webkit-tap-highlight-color: transparent; }`, then make sure every tappable has its own `:active` |
| Full-height layout overflows under the URL bar | `100dvh` for app shells and bottom-pinned UI; `100svh` for heroes (no shift while scrolling); not `100vh` |
| Page zooms into a focused input | Inputs, selects, textareas ≥ 16px font. Never fix it with `maximum-scale=1` or `user-scalable=no` |
| Taps feel laggy | Feedback on press (`:active`, `pointerdown`), not on `click`; `touch-action: manipulation` on buttons and links |
| Pull-to-refresh or page bounce fights an app UI | `overscroll-behavior: none` on `html, body` for app-like surfaces; `overscroll-behavior: contain` on inner scrollers (sheets, chat lists). Leave it alone on documents |
| Content stops short of, or hides under, the notch | `viewport-fit=cover` in the viewport meta, then pad fixed headers, bottom bars, sheets, and toasts with `env(safe-area-inset-*)` |
| Long-press selects a button's label | `user-select: none` and `-webkit-touch-callout: none` on controls only (buttons, tabs, chips, drag handles); never on `body` |
| Horizontal carousel scrolls the page vertically | Native scroll with `scroll-snap-type: x mandatory`; for custom gestures, `touch-action: pan-y` on the track |
| Status bar color clashes in one theme | Two `<meta name="theme-color">` tags, one per `prefers-color-scheme`, matching the top of the page |
| Wrong keyboard | `inputmode` (`numeric`, `decimal`), `type="email"`/`"tel"`, `autocapitalize="none"` on codes and usernames, `enterkeyhint` (`search`, `send`, `done`) |
| Software keyboard covers bottom-pinned inputs (Android) | `interactive-widget=resizes-content` in the viewport meta |

Emulated devices in a desktop browser reproduce none of these: sticky hover, tap delay, safe areas, overscroll, and the keyboard need a real phone. Say which fixes you verified from code and which need hardware.

## Verify

Capture Mobile-light and Mobile-dark. Check: no horizontal scroll at 320–390px, every target ≥44px, primary action reachable with a thumb, nothing hover-only, and the first screen answers "what is this and what do I do".
