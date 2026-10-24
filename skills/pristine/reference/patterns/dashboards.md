# Pattern: dashboards, tables, and charts

Use for **Operate** surfaces: apps, admin panels, dashboards, settings, data tools, charts. The goal is task speed and scanability. Restraint is a feature.

## Five-second and skeleton tests

- **Five seconds**: show the Desktop-light capture for 5 seconds. Can the Persona say what this screen is for and where the most important number or action is? If not, hierarchy fails.
- **Skeleton**: blur the capture (or grayscale it and squint). The grouping and the single focal area should still read. If everything is the same gray block, there's no hierarchy.

## Structure

- Four primitives build almost every dashboard: **lists/tables, cards, inputs, tabs**. Reach for a new primitive only when these fail.
- Reading flows top→bottom, left→right. The most important content sits **top-left** of the grid; supporting content flows right and down.
- **Sidebar**: workspace/profile at the top; grouped links with icons and group labels; settings and help pinned at the bottom; a clear active state; collapsible to icons on narrower screens.
- Group related data together and rank groups by importance. Drop labels the UI already implies (a "Dashboard" heading on the dashboard, "Name:" before an obvious name).
- Separate groups with whitespace, not dividers. Use alternating row backgrounds only when rows are dense.
- No cards inside cards. One surface level per group.

## Let the data drive the form

| Data | Form |
|---|---|
| Numbers, currency, percentages | Right-aligned, `tabular-nums`, consistent decimals and units |
| Enumerated values (status, plan, type) | Chips/badges, semantic color only when the status means something |
| Long text | Truncate with ellipsis plus full value on hover/expand |
| Inactive/archived rows | Shaded or reduced-opacity row, still readable |
| Time-based events | Timeline or relative time ("2h ago") with absolute time on hover |
| People ("who") | Avatar plus name; image avatars or neutral initials, never gradient letter blobs |
| Trend over time | Line or bar chart with axes, not a lone big number |

## Tables

- Search, filter, and sort on any table that can exceed one screen.
- Multi-select reveals a contextual bulk-action bar; it disappears when nothing is selected.
- Row actions: one primary inline action at most; the rest in a triple-dot menu or on row hover (with a keyboard/touch path).
- A text button repeated on every row ("Edit", "Copy", "Open") is a finding in tool-style UIs: make it an icon button with a tooltip and an `aria-label` that names the row ("Edit invoice 1042"). Keep text only when no icon is unambiguous for the action, or when it's the row's single primary action and the column has room.
- Sticky header on long tables. Empty, loading (skeleton rows), and no-results states designed.
- Prefer pagination or "Load more" over infinite scroll when anything (footer, totals) lives below.

## Charts

- Axes, gridlines (light), axis labels, units, and a **summary value** (total, change vs. previous period) above the chart.
- A date-range selector when the data is time-based.
- Hover tooltip with exact values; dim sibling bars/series on hover to focus the one under the pointer.
- Bar count matches the data's real granularity. No smoothed or faded lines that misstate values; no rounded-top bars floating without axes.
- Series colors: generate in OKLCH stepping hue by ~25–30°, keeping series ≥10 lightness points apart so they survive grayscale and color-blindness; equal lightness and chroma only when every series is directly labeled. Highlight one series with the accent, mute the rest.
- Legends close to the data, or label lines directly.

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
- Upgrade and limit prompts appear at the moment of need (hitting a limit, trying a paid feature), show what's really at stake (their actual files, the real date a trial ends), price in context, and dismiss with a neutral "Not now". Empty first-run screens follow [onboarding.md](onboarding.md).

## Vibe-coded dashboard tells (fix on sight)

- The same KPI repeated in a stat card, a chart title, and a table footer.
- Two search bars (global and page) doing the same thing on one screen.
- Dead cards: placeholder "Coming soon" or empty decorative charts.
- Every card has 3–4 visible action buttons; collapse to one plus an overflow menu.
- A flyout/popover containing only one or two items; inline them or use a proper menu.
- Bright AI-picked colors on every chart and icon; color should mark status or the one series that matters.
