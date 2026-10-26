# Craft floor

The minimum every UI must meet before any Lens, Critique, or Polish counts as done. Read it before editing UI, apply it silently, and check it against the Capture, not against your intentions. Craft is not cosmetic: people judge a well-made UI as easier to use and forgive its small flaws (aesthetic-usability effect), and a sloppy one loses that trust before it is used.

DESIGN.md wins over this file where they conflict: if its Design System or a Persona explicitly calls for something listed under "Bans", follow DESIGN.md. Your own habits never override it.

## Default standard

Every project meets this unless DESIGN.md → Product → Constraints records an explicit exception. `init` never asks about it.

- **Accessibility:** WCAG 2.2 AA.
- **Browsers:** evergreen: the last 2 versions of Chrome, Safari, Firefox, and Edge, plus iOS Safari.
- **Rendering:** static export (or server-rendered where the stack requires it); content is readable with JavaScript off.
- **Motion:** `prefers-reduced-motion` is respected.
- **Performance:** LCP under 2.5s on mobile.
- **Dependencies:** no new fonts or dependencies without the user's approval.

## Floor (every item must pass)

### Contrast
- [ ] Body text, placeholder text, and small labels: contrast ≥ 4.5:1 against their actual background.
- [ ] Large text (≥ 24px, or ≥ 18.66px bold): ≥ 3:1.
- [ ] Icons, input borders, control boundaries, and focus indicators: ≥ 3:1.
- [ ] Every pair passes in light AND dark theme, and in hover, active, selected, and disabled states (disabled is exempt from contrast, but must still be recognizable).
- [ ] Text on colored surfaces uses a tint or shade of that surface's hue, or the foreground color at reduced opacity. Never neutral gray on color.

### Color system
- [ ] Product UI: one accent; color marks meaning (status, data, the primary action). Icons are neutral unless they show status.
- [ ] Status colors (success, warning, error, info, live/active) are reserved for status. Decorative structure (connector lines, rails, dividers, borders) stays neutral; color only the part that carries meaning, e.g. the live path through a tree or timeline.
- [ ] Destructive actions use semantic red; success, warning, and error colors are semantic, not brand choices.
- [ ] Brand colors that fail contrast are darkened (or swapped to an analogous role) for text and buttons.
- [ ] Interactive states: hover lighter, pressed darker, disabled desaturated, and each one visibly different from rest. Hover and pressed fills differ from the resting fill by ≥ 0.04 OKLCH lightness (about 1.1:1 contrast between the two fills), or the state adds a visible border, underline, or shadow change. Check it in both themes from zoomed captures of rest, hover, and pressed placed side by side; a change you can't see in the shot doesn't count.
- [ ] Dark mode is designed, not inverted: surfaces get lighter as they elevate, with larger steps between layers than in light mode (≈4–6% vs ≈2%); text is off-white, not pure white; brand colors are desaturated and use a lighter ramp step.

### Typography
- [ ] Body text ≥ 16px on the web (14px only for genuinely secondary metadata; never below 12px).
- [ ] Prose measure 45–75 characters (`max-width: 65ch` is a good default).
- [ ] Body line-height 1.4–1.7; headings 1.0–1.25.
- [ ] Letter-spacing never tighter than -0.04em; display text usually reads best at -0.01 to -0.03em.
- [ ] Display text ≤ 6rem.
- [ ] Headings use `text-wrap: balance`; body uses `text-wrap: pretty`.
- [ ] Heading, body, label, and metadata roles are distinguishable at a glance (adjacent steps differ by ≥ 1.2× size or ≥ 200 weight).
- [ ] Real copy never overflows or clips at any viewport in the Capture Matrix.

### Spacing and layout
- [ ] All spacing comes from one scale (4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96).
- [ ] Related items sit tight; distinct groups are separated by at least 2 steps more.
- [ ] More space above a heading than below it.
- [ ] Nothing causes horizontal scroll at 320px wide.
- [ ] Controls that sit in one row (button next to input, copy box, select, tab) share one height token and one radius. Measure the rendered heights; padding plus an inner button easily adds 10px.
- [ ] Chips, badges, and tags inline with text sit on the text baseline: the row uses `align-items: baseline`, and the icon inside a chip uses `align-self: center`. Check in a zoomed capture that the chip label and the neighbouring text share one baseline.

### Theming variables
- [ ] A CSS variable that callers are told to set ("set `--card-padding`") is never re-declared on the component's own root element; a value set there beats anything a parent sets. Read it with a fallback (`padding: var(--card-padding, 16px)`), or put the default on `:root` or a zero-specificity `:where()` wrapper.
- [ ] Docs, props, and comments name only variables that truly work from outside. Test one by overriding it from a parent.
- [ ] Portaled content (popovers, tooltips, menus, dialogs rendered into `body`) doesn't inherit variables set on the component's DOM ancestors. Set the needed variables on the portaled element itself, or define them at `:root` or the theme scope.

### Depth
- [ ] Elevation is declared once per element: border OR shadow, not a 1px border under a large soft shadow.
- [ ] Shadows have a vertical offset and a soft blur. No zero-offset colored glow halos.
- [ ] Card radii 8–16px; fully rounded pills only for small controls (chips, tags, toggles, small buttons).
- [ ] Nested corners: inner radius = outer radius − padding between them (pills exempt).

### States
- [ ] Every interactive element has default, hover, focus-visible, active, and disabled states.
- [ ] **Clickable at rest.** In a still capture with no hover, every action is recognisable as an action: a fill, a border, an icon, or link styling (underline or accent colour) distinct from nearby body text. A borderless ghost button is allowed only in a group of actions or a toolbar, or as an icon button; never as the only action in a row, and never in the same colour and weight as the text around it. Its text must align with the content edge it sits under (no ghost padding indent).
- [ ] Every data view has loading, empty, error, and success states.
- [ ] **Show the things you count.** When the UI acts on a set of items (channels, repositories, files, members) or states a count of them ("26 of 27 repositories"), the user can see that list and each item's state from the same page. Parity: if one provider lists its items, every provider of the same kind does too.
- [ ] **Background work never moves the page.** A background refresh, poll, or revalidation (`isFetching`, `refreshing`, `isValidating`) must not insert or remove anything that pushes content: no "Checking…", "Refreshing…" or "Syncing…" line above a list. Show it in space that is always reserved (a fixed-width status slot, a spinner inside an existing badge or button, `aria-busy`), or not at all. Only a first load with no data may show a loading block.
- [ ] **Finished steps yield to live work.** When an agent's preflight tool calls finish and live work (sub-agents, results, an approval) appears below, the finished tool list folds to one header row ("Used 3 tools") that reopens by click and keyboard (Enter/Space). Running steps and failures stay open. A finished stepper must not fill the view while the agents it led to sit below the fold.
- [ ] Focus ring is visible on every background: ≥ 2px, ≥ 3:1 contrast, offset 2px.
- [ ] Meaning shown on hover (tooltips, hover cards) is also in the control's accessible name or visible text; hover is never the only way to learn it.
- [ ] Touch targets ≥ 44×44px (Fitts' law). When the visible mark is smaller, keep its size and enlarge only the hit area with an overlay: `position: relative` on the control and `::after { content: ""; position: absolute; inset: -8px; }` (pick the inset that reaches 44px). Don't use `min-height`/padding that bloats a visible chip or icon button. In wrapped rows and stacked lists, hit areas must not overlap: each side's overlay extends at most half the gap to the next target; if that can't reach 44px, widen the gap, not the mark.
- [ ] Images have one fallback look: a missing URL, a failed load, and the loading state show the same placeholder at the final size. Loading never shows the error or broken-image icon, not even for a frame; start in the placeholder and swap only on `load`.
- [ ] Data-driven components survive worst-case data ([patterns/worst-case-data.md](patterns/worst-case-data.md)): long and one-letter names, unbreakable emails, 0/1/1,000 items, missing images, locale-formatted numbers.

### Conversation lifecycle
- [ ] **One reply, one progress presentation.** Reuse the design system's thinking or activity component. Before the first response text, each pending reply has one thinking component or a live tool-activity region, not both for the same work or separate "Thinking" and "Working" placeholders. Parallel tools may each show their own state within that region. On confirmed completion, cancellation or failure, no active progress remains.
- [ ] **Tool work is visible and factual.** If the transport supplies an authorized tool event, render its label and state through the system's tool-activity component before the answer arrives. A running tool has zero additional generic thinking indicators. Replaying the same receipt adds zero rows; stale attempts cannot change its state. After reload, the same saved receipt IDs remain inspectable in their persisted order. Use only display metadata returned by the authorized event or history response; never invent calls or reconstruct redacted URLs and arguments.
- [ ] **Empty history is not a new conversation.** The first-run welcome is absent while sending, loading an existing conversation, restoring an interrupted send, streaming or recovering from an error. An empty existing conversation has its own empty state. A loading failure never replaces retained messages with the welcome screen.
- [ ] **Streaming must be observed before completion.** Delay two real transport chunks and the terminal event independently. The first chunk must render while the second and terminal event are withheld; the second must extend the same reply. Revealing a completed answer with timers does not pass. If previews are unavailable for a conversation type, report that limit and preserve its permission checks.
- [ ] **Recovery preserves identity and text.** Drop and reconnect the stream after the first chunk, then replay an event. Previously shown text remains, replay adds no duplicate text, and terminal history leaves exactly one final reply. Reconnecting alone creates zero send requests. Navigating to a new conversation closes the old subscription and cannot leak its partial reply.

### Mobile platform
- [ ] Inputs ≥ 16px font; zoom never disabled.
- [ ] Full-height layouts use `dvh`/`svh`, not `vh`; fixed bars respect `env(safe-area-inset-*)`.
- [ ] No tap-highlight flash; no sticky hover on touch.

### Browser surfaces (the most-skipped signal of care)
- [ ] `::selection` color themed from the palette.
- [ ] `caret-color` and `accent-color` set from the palette.
- [ ] Scrollbars styled (or left native deliberately) in both themes; `color-scheme` set.
- [ ] Links use `text-underline-offset` (≈ 0.15em) and a deliberate underline thickness.
- [ ] Numbers in tables and changing values use `font-variant-numeric: tabular-nums`.

### Motion
- [ ] Only `transform` and `opacity` animate by default; anything else is justified and measured.
- [ ] Micro-interactions 120–300ms; larger transitions 300–500ms; nothing routine exceeds 500ms. Routine UI (dropdowns, popovers, tooltips) stays under 300ms; only modals, drawers, and marketing moments go longer.
- [ ] Enter/exit uses ease-out, on-screen movement ease-in-out, from shared easing tokens. No `ease-in` on UI.
- [ ] Nothing animates from `scale(0)`; popovers and menus grow from their trigger (modals stay centered).
- [ ] Every pressable element gives press feedback on `:active` (e.g. `scale(0.97)`).
- [ ] No animation on keyboard-initiated or 100+/day actions (command palette, shortcuts).
- [ ] Hover effects are gated behind `@media (hover: hover) and (pointer: fine)`.
- [ ] Every animation has a `prefers-reduced-motion: reduce` path that still fades (never an instant jump, never a global `animation: none` reset).
- [ ] Content is visible without JavaScript or animation running (never start at `opacity: 0` and depend on a script).

### Copy and content
- [ ] Buttons name their action ("Save draft", not "Submit" or "OK"), and state the outcome when it's known ("Show 12 flights").
- [ ] Prices and costs are never shown alone: next to the main purchase, the plan, or an honest per-unit breakdown.
- [ ] Errors say what went wrong and how to fix it.
- [ ] No lorem ipsum, placeholder names, fake metrics, or invented claims.
- [ ] Every requirement from DESIGN.md's Product section is present and findable within 5 seconds.

## Bans (AI-slop tells)

Each of these marks a UI as generated rather than designed. Remove or rewrite the element; do not just tone it down.

### Color and surface
- Purple-to-blue (or pink-to-orange) gradients as the default brand look, on buttons, hero backgrounds, and headings alike.
- Gradient text. Emphasis comes from size and weight.
- Glassmorphism (`backdrop-filter: blur` plus translucent white) as general decoration. Allowed only over real, varied content where the blur does a job (e.g. a sticky header over imagery).
- Neon glows, colored halos, and `box-shadow: 0 0 40px <brand color>` on cards or buttons.
- Gray text on a colored background.
- Pure `#000` on pure `#fff` across large surfaces, or pure gray neutrals when the palette has a hue; tint neutrals slightly toward the brand hue.
- Dark mode chosen "because it looks techy"; choose theme from where and how Personas use the product.
- Decorative grid or stripe backgrounds and noise/grain overlays with no subject-matter reason.
- AI-picked bright, saturated colors spread across icons, cards, and charts. A 60-30-10 split applied to product UI (apps run closer to 90% neutral / 8% / 2% accent).
- Gradient letter-avatars.

### Layout and structure
- The centered-everything hero template: centered badge pill, centered giant headline, centered subhead, two centered buttons, then a logo strip.
- Grids of identical cards (icon + heading + two lines) as the page's main structure.
- Cards inside cards. Use spacing, dividers, or headings for inner grouping.
- The hero-metric template: giant number, tiny label, row of supporting stats, accent bar.
- Eyebrow/kicker labels ("FEATURES", "WHY US") above every section heading.
- Section numbers (01 / 02 / 03) when order carries no meaning.
- Colored `border-left` stripes (> 1px) on cards, list items, alerts, or callouts.
- A modal for a task that needs neither interruption nor focus protection.
- The same KPI shown more than once on a screen; duplicate search bars; dead "coming soon" cards.
- Three or more visible action buttons on every card; flyouts holding one or two items.
- Infinite scroll on a page whose footer holds content people need.

### Type and iconography
- Generic Inter (or system sans) on white with no typographic decisions: one weight, one size step, default tracking. If Inter is the choice, make it a choice: tuned weights, tracking, and scale.
- Monospace used as a "technical" costume rather than for code, data, or measurements.
- Emoji or Unicode glyphs (✨ 🚀 ✓ →) used as the icon system. Use one SVG icon library with one stroke width and size grid.
- Mixed icon sets, or icons with different stroke weights on the same screen.
- Sketchy hand-drawn SVG doodles, blob shapes, and generic 3D illustrations used as filler.

### Effects and motion
- The same fade-up-on-scroll applied to every section.
- Bounce or elastic easing on UI controls.
- Hover lift (`translateY(-4px)` + bigger shadow) on every card, including non-clickable ones.
- Hard offset shadows (`4px 4px 0 #000`) unless DESIGN.md defines a neobrutalist system.
- Sparklines, progress rings, and fake charts used as decoration with no real data.
- Charts without axes or labels, rounded-top bars floating free, and smoothed or faded lines that misstate values.
- Scrolljacking.

### Copy
- Hype filler: "Unlock", "Supercharge", "Seamless", "Elevate", "Revolutionize", "Next-gen", "All-in-one".
- Three-item feature triplets with interchangeable copy.
- Fake testimonials, fake logos, and invented numbers.
- Guilt-trip dismiss copy ("No thanks, I hate saving money", "I'll risk it"); declines stay neutral ("Not now", "Skip").
- Fake urgency or progress: resetting countdowns, invented scarcity, progress bars not backed by real completed steps.
- Results blurred or locked only to force signup; pre-ticked marketing consent or paid add-ons. See [patterns/onboarding.md](patterns/onboarding.md).

## How to use the floor

1. Before editing, read DESIGN.md (Product, Personas, Design System). Use its tokens; extend them rather than inventing values.
2. After editing, take a Capture across the Capture Matrix (light/dark × desktop/mobile, where each exists).
3. Walk the Floor checklist against the Capture. Fix failures before claiming any Score improvement.
4. Scan for every Ban. Any remaining ban is a Critique finding; Polish is not done until it is fixed or DESIGN.md explicitly allows it.
5. The floor is a minimum, not a goal. Once it passes, spend effort on what makes this product distinct for its Personas.
