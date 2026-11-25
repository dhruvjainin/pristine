# Pattern: dashboards, tables, and charts

Use for **Operate** surfaces: apps, admin panels, dashboards, settings, data tools, charts. The goal is task speed and scanability. Restraint is a feature.

## Five-second and skeleton tests

- **Five seconds**: show the Desktop-light capture for 5 seconds. Can the Persona say what this screen is for and where the most important number or action is? If not, hierarchy fails.
- **Skeleton**: blur the capture (or grayscale it and squint). The grouping and the single focal area should still read. If everything is the same gray block, there's no hierarchy.

## Structure

- Four primitives build almost every dashboard: **lists/tables, cards, inputs, tabs**. Reach for a new primitive only when these fail.
- Reading flows top→bottom, left→right. The most important content sits **top-left** of the grid; supporting content flows right and down.
- **Sidebar, app shell, and global search**: follow [app-shell.md](app-shell.md) — anchor the workspace switcher at top-left (governing every nav group below it) beside the primary creation action, isolate the personal account menu at bottom-left, use flat named groups over opaque "More" drawers, bound recents, keep desktop vertical rhythm tight and mobile drawers touch-friendly, and pair a discoverable `⌘K` / `Ctrl K` trigger with entity-aware global search.
- **Account menu**: personal scope only (never bury the workspace switcher here). Items come from this Persona's personal tasks in this product (a task tracker: set away status, pause notifications, theme, sign out), not from other products' account menus. It doesn't repeat what its trigger already shows (name, then email beneath it) or a control already on screen (a Help item beside a Help icon). Show the email only when it tells accounts apart (several signed-in accounts).
- Group related data together and rank groups by importance. Drop labels the UI already implies (a "Dashboard" heading on the dashboard, "Name:" before an obvious name).
- Separate groups with whitespace, not dividers. Inside tables, default to horizontal row dividers only; zebra striping replaces the dividers (never both) only on dense tables wider than 6 columns.
- No cards inside cards. One surface level per group.
- **Primary action above the fold; collapse green diagnostics.** On detail and overview screens (an active automation, deployment, or agent), never let a tall readiness or preflight checklist push the primary `"Run"` or `"Use"` action below the first viewport. When all checks pass, collapse the checklist into a single calm status summary with a `"View checklist"` toggle so the primary action sits immediately above the fold; expand automatically only when a check fails or needs user input.
- **Progressive disclosure for settings matrices.** In dense settings screens with workspace-wide defaults and per-entity overrides (such as per-agent concurrency, rate, or credit limits), surface workspace defaults up front and tuck per-entity overrides inside a collapsible section with explicit column headers.

## Let the data drive the form

| Data | Form |
|---|---|
| Numbers, currency, percentages | Right-aligned, `tabular-nums`, consistent decimals and units |
| Enumerated values (status, plan, type) | Chips/badges, semantic color only when the status means something |
| Long text | Wrap, truncate, or clamp per [worst-case-data](worst-case-data.md#truncate-wrap-or-clamp-decide-per-field) |
| Inactive/archived rows | Shaded or reduced-opacity row, still readable |
| Time-based events | Timeline or relative time ("2h ago") with absolute time on hover |
| People ("who") | Avatar plus name; image avatars or neutral initials, never gradient letter blobs |
| Trend over time | Line or bar chart with axes, not a lone big number |

## Tables

- Search, filter, and sort on any table that can exceed one screen.
- Multi-select reveals a contextual bulk-action bar; it disappears when nothing is selected.
- Row actions: one primary inline action at most; the rest in a triple-dot menu or on row hover (with a keyboard/touch path). Never leave trailing action column headers (`<th>`) empty: include visually hidden (`sr-only`) header text such as `"Actions"` so screen readers and table accessibility checks (`empty-table-header`) pass cleanly.
- A text button repeated on every row ("Edit", "Copy", "Open") is a finding in tool-style UIs: make it an icon button with a tooltip and an `aria-label` that names the row ("Edit invoice 1042"). When a record's primary text field is blank, fall back to a human-readable label (e.g., `"Untitled record"`) instead of exposing raw UUIDs or storage keys in visible text or action `aria-label`s. Keep text only when no icon is unambiguous for the action, or when it's the row's single primary action and the column has room.
- Sticky header on long tables. Empty, loading (skeleton rows), and no-results states designed.
- Exercise a successful connected response with an empty array, separately from offline, loading and error states. After loading settles, require a visible explanation and one usable next action; invoke it and check the destination, that any entered input is kept, and that nothing submits automatically.
- A one-column name catalog must have `scrollWidth <= clientWidth + 1` at 390px, including its longest name. Do not inherit a multi-column table's minimum width. True column tables may scroll inside their own container, never the page.
- Prefer pagination or "Load more" over infinite scroll when anything (footer, totals) lives below.

### Row geometry

- **Every row has the same height.** Cells are one line (`white-space: nowrap`). A cell with several values shows the first, then a `+N` chip whose tooltip or popover lists the rest. If two values share the same label, show the label once with all of their icons in front.
- **Every cell shares one alignment axis.** Single-line rows share one vertical center (`vertical-align: middle` on table cells, or `align-items: center` on grid rows), with icons and text in an `align-items: center` flex row. When a primary cell stacks a title over a metadata subtitle, top-align every column (`vertical-align: top` / `align-items: start`) so status badges and timestamps line up cleanly with the title instead of floating in the gap. Never render a row's primary link inside a horizontally padded button variant—the link text must sit flush-left with its column header and subtext beneath it. Chips inline with running text elsewhere use `align-items: baseline`, but inside single-line table cells center wins ([craft-floor](../craft-floor.md#spacing-and-layout)).
- **Columns size to their content.** Fixed-format columns (status, type, dates, numbers, actions) take their content width. One flexible column, usually the name, takes the leftover space. Cap flexible text cells with responsive `max-width` bounds on narrow viewports so a long text cell never pushes neighboring columns or trailing actions off-screen. Any text column may end-truncate or middle-truncate per [worst-case-data](worst-case-data.md#truncate-wrap-or-clamp-decide-per-field), with the full value on hover and focus.
- **Rows are separated by horizontal lines only.** Drop the vertical lines between columns; alignment already makes the columns. Zebra striping replaces the row lines (never both) only on dense tables wider than 6 columns.
- **A warning in a row comes with its fix.** A missing-permission chip sits next to the action that fixes it.

Verify with the worst-case fixture (longest name, a cell with the most values, an empty cell):
- [ ] Every body row's `getBoundingClientRect().height` is equal, within 1px.
- [ ] In each row, every cell's first text line has the same vertical center, within 1px.
- [ ] Only the flexible column takes leftover space. Every truncated cell shows its full value on hover and on focus.

## Linked entities

- Every entity name on a page (project, owner, assignee, customer, parent item) links to its detail page. Pages reach each other through their content, not only through the sidebar.
- Entity links get a hover preview card that answers the quick question without leaving the page. It shows 2–4 fields chosen for the page it opens from (from a task, a project card shows assignees, status, and team; not every project field), plus a link to the full page.
- The card opens after ~500ms of hover and on keyboard focus, stays open while the pointer is on the card, closes on Escape, and never holds the only path to its data. On touch, a tap follows the link.
- **Cross-link split mental models.** When a Persona's work spans two related surfaces (such as a tasks board vs. background agent runs, or a paused resource vs. workspace billing/usage settings), surface an explicit badge or link directly in the page header or alert banner so users never wonder where the other half of their work or its resolution lives.

Verify: from each detail page, the Persona's next question is answered in at most one click without leaving the page.

## Charts

- Axes, gridlines (light), axis labels, units, and a **summary value** (total, change vs. previous period) above the chart.
- A date-range selector when the data is time-based.
- Hover tooltip with exact values; dim sibling bars/series on hover to focus the one under the pointer.
- Bar count matches the data's real granularity. No smoothed or faded lines that misstate values; no rounded-top bars floating without axes.
- Series colors: generate in OKLCH stepping hue by ~25–30°, keeping series ≥10 lightness points apart so they survive grayscale and color-blindness; equal lightness and chroma only when every series is directly labeled. Highlight one series with the accent, mute the rest.
- Legends close to the data, or label lines directly.
- Set the y-axis range from the data. For a line chart, (max − min of the plotted values) ÷ (axis max − axis min) ≥ 0.5, rounded to even ticks. A fixed range that parks the series in the bottom fifth leaves the plot mostly empty. Bar charts start at 0.

## Overlays: pick by task weight

| Task | Use | After |
|---|---|---|
| Simple, non-blocking (rename, quick filter, pick a value) | Popover / dropdown anchored to the trigger | Inline update |
| Complex but same context (create an item, edit several fields) | Modal or side sheet | Confirming toast |
| Large or permanent (settings area, multi-step setup, destructive bulk) | New page | Back button or breadcrumb |

Warnings and errors that don't block: toast or inline. Destructive actions: semantic red plus confirm or undo.

## Feedback

- Optimistic UI: reflect the change immediately, reconcile or roll back with a toast on failure.
- Tooltips on icon-only controls (~0.5–1s delay, instant when moving between adjacent tooltips).
- Progress indicators for anything over ~1s; skeletons over spinners for content areas.
- Upgrade and limit prompts appear at the moment of need (hitting a limit, trying a paid feature), show what's really at stake (their actual files, the real date a trial ends), price in context, and dismiss with a neutral "Not now". When a feature or resource is paused due to a limit, explain *which* limit was hit and link straight to where it can be raised. In model or plan pickers, show billing source and relative cost/capability directly at selection time. Empty first-run screens follow [onboarding.md](onboarding.md).

## Vibe-coded dashboard tells (fix on sight)

- The same KPI repeated in a stat card, a chart title, and a table footer.
- Two search bars (global and page) doing the same thing on one screen.
- Dead cards: placeholder "Coming soon" or empty decorative charts.
- Every card has 3–4 visible action buttons; collapse to one plus an overflow menu.
- A flyout/popover containing only one or two items; inline them or use a proper menu.
- Entity names as plain text, and pages that link only to the sidebar, never to each other.
- Bright AI-picked colors on every chart and icon; color should mark status or the one series that matters.
