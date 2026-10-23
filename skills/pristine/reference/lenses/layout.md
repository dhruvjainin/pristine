# Layout

Layout is the order in which someone's eye travels, and whether that order matches what the product needs them to see. A good layout lets a Persona know what this screen is, what matters most, and what belongs together, before they read a word.

**Raises:** Layout & spacing, Hierarchy & clarity.
**Skip it when:** structure is sound and only type or color is weak (use typeset or colorize). If the problem is *too much stuff*, run distill first, then layout. If it only breaks at one viewport, use adapt.

## What a designer looks at

Open the Capture and look before touching code. Run these checks in order.

**1. The squint test.** Blur the screenshot (~8px) or step back from the screen until text is unreadable. Also grayscale it, or reduce it to a wireframe of boxes: is the hierarchy still readable? Five-second test: after 5 seconds, can you say what the screen is and what to do?
- What do you see 1st, 2nd, 3rd? Write it down; that is the real visual hierarchy.
- Does that order match what the Persona came to do? If the eye lands on a decorative image or a secondary link first, hierarchy is broken.
- Eyes read top→bottom, left→right: is nav at the top, the main CTA visible without hunting, and the most important dashboard tile top-left?
- Can you still see the groups as distinct blobs? If it's one even grey texture, spacing has no rhythm.

**2. Grouping by proximity.** Things that sit close together read as related (law of proximity).
- Does a label sit closer to its *own* field than to the field above it? Does a heading sit closer to its section than to the previous one?
- Look for "floating" elements: a button equidistant from two groups reads as belonging to neither.
- Count containers and dividers. Are boxes or lines doing work that whitespace could do? A card inside a card (padding on padding) is a sign grouping was solved with borders instead of space.
- Count the items in each undivided run: form fields, settings, nav links, filter options. More than ~7 with no subgroup or heading overloads working memory (Miller's law).

**3. Rhythm.**
- Is every gap the same (all 16px, all 24px)? Uniform spacing feels flat and makes grouping invisible.
- Is there visible contrast between *within a group* < *between groups* < *between sections*?
- Is there more space above each heading than below it? If not, headings visually attach to the wrong content.

**4. Alignment.**
- Draw imaginary vertical lines down the left edges. How many distinct edges are there? Every extra edge is noise.
- Check optical alignment: icons next to text, play triangles in circles, quotes and bullets hanging. Mathematically centered often *looks* off.

**5. The grid and width.**
- Does the grid fit the content, or is it the framework default (three equal cards because that's what the template had)?
- Are repeated items visually equal even though one matters more?
- On a wide screen, do text lines run past ~75 characters? Does content sprawl across a 2560px display?

**6. Reading and focus order.**
- Does the visual order match the DOM/tab order? Tab through it: does focus jump around the screen?
- Do sticky headers or footers cover content or the focused element when scrolling?
- Do menus and popovers get clipped by a parent container?
- In nav, menus, tab bars, and action rows, what sits first and last? Those slots are noticed and remembered best (serial position effect); a key item buried mid-list gets missed.

**7. Data shape.** Does each value's form match its data? Numbers right-aligned, enumerated values as chips, long text truncated, inactive rows shaded, time-based data on a timeline, "who" shown with avatars.

**8. Overlays and long lists.** Is each overlay the right weight for its task? Does an infinite scroll make the footer unreachable?

**9. Stress.** Mentally (or actually) fill it with long content, empty content, and 200% zoom. Does the structure hold?

Write a 3-line **spatial thesis** before editing:
- **Primary path:** what the Persona sees/does first, then next.
- **Groups:** what belongs together, what must separate.
- **Density:** compact (task UI), comfortable (docs), or airy (marketing).

## How to fix

1. **Read DESIGN.md**: spacing scale, grid, container widths, and the Persona's primary task here.
2. **Group with space first, containers last.** Spacing tokens (4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128):
   - inside a group: 4–12px;
   - between groups: 24–48px;
   - between page sections: 64–128px;
   - chunk long runs (forms, settings, nav, option lists) into headed groups of ~3–7 items (Miller's law), and format long values in chunks (phone, card, IBAN, IDs).
3. **Remove containers that whitespace can replace**: swap a card wrapper for spacing, a heading, or a 1px divider. Never nest a card inside a card. Keep a shared container only where a group must read as one unit against busy neighbors (law of common region): one card per selectable item, one panel per settings group.
4. **Pick a grid for the content, not the framework:**
   - marketing and dashboards: 12 columns, and break symmetry with 7/5 or 8/4 splits when one side leads;
   - reading: single column at 60–75ch;
   - apps: sidebar 240–320px + fluid main;
   - container max-width 1120–1440px, so text never spans a 4K screen.
5. **Make importance visible.** Repeated items look equal only if their content is equal. If one matters more, make it larger or place it first. In nav and action rows, put the most-used items first and last (serial position effect); rarely used items go in the middle or an overflow menu.
6. **Implement rhythm cleanly:** use `gap` on flex/grid for sibling spacing instead of margins on children; add `min-width: 0` on flex/grid children that contain text.
7. **Align every edge to a shared line**, then fix optical alignment after rendering (icons beside text, hanging punctuation, play triangles).
8. **Keep DOM order = visual order.** Avoid `order` and absolute positioning that reorder content for keyboard and screen-reader users. Set `scroll-padding-top` when there's a sticky header.
9. **Let the data drive the form:** right-align numbers (with tabular numerals), chips for enumerated values, truncate long text with the full value on hover/expand, shade inactive rows, timelines for time-based data, avatars for people. Use alternating row backgrounds only when rows are dense.
10. **Pick the overlay by task size:** popover for simple, non-blocking tasks; modal for complex tasks in the same context, followed by a confirming toast; a new page for large or permanent tasks, with back/breadcrumb.
11. **Prefer "load more" over infinite scroll** so the footer stays reachable.
12. **Let overlays escape clipping:** use `<dialog>`, the popover API, a portal, or `position: fixed` for menus and popovers inside `overflow: hidden` ancestors.
13. **Add any new spacing or container value to DESIGN.md as a token.** No one-off pixel values.

## Rules
- [ ] Blurred Capture shows primary, secondary, and the groups in the intended order.
- [ ] All spacing comes from the scale; within-group < between-group < between-section.
- [ ] More space above each heading than below it.
- [ ] No card inside a card; no identical card grid where content differs in importance.
- [ ] Groups separated by whitespace before dividers; zebra rows only on dense tables.
- [ ] No undivided run of more than ~7 fields, settings, or links.
- [ ] Most-used nav and action items sit first or last, never buried mid-row.
- [ ] Nav at top, primary CTA visible, most important dashboard content top-left.
- [ ] Hierarchy still reads in a blurred, grayscale, or wireframe Capture.
- [ ] Numbers right-aligned; enumerations as chips; long text truncated.
- [ ] Overlay weight matches the task (popover < modal < page); footer reachable (no infinite scroll trap).
- [ ] All left edges in a column share one alignment line.
- [ ] Text measure ≤ 75ch; container max-width set.
- [ ] Tab order matches visual order.
- [ ] Sticky headers/footers don't cover focused elements (`scroll-padding-top` set).
- [ ] Long content, empty states, and 200% zoom don't break the structure.

## Avoid
- Centered-everything hero templates and fully centered pages.
- Uniform 16px or 24px spacing on everything; rhythm needs contrast.
- Colored left-border stripes as a grouping device.
- Eyebrow labels and decorative section numbers above every heading.
- Fixed pixel heights on text containers.
- A modal where an inline expansion or a new page fits better.
- Divider lines between every group when spacing would do.
- Infinite scroll on pages with a footer people need.

## Verify in the Capture Matrix
- **Desktop light/dark:** squint again. Borders and dividers that defined groups in light mode must stay visible in dark (≥ 3:1 if they carry meaning).
- **Mobile light/dark:** stacking order follows priority, not source-order accident. Section spacing drops about one step (e.g. 96 → 64px) but stays larger than group spacing. Mobile needs more vertical space than expected; don't cram rows to fit a fold. Nothing scrolls horizontally at 320px.
- Layout & spacing and Hierarchy & clarity should rise. Confirm no state (empty, error, long text) regressed.
