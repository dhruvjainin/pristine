# Pattern: app shells, navigation, and global search

Use whenever the target includes an app shell, sidebar or top navigation, workspace/account switcher, sub-mode (such as settings), or global search / command palette (`⌘K` / `Ctrl K`). The goal is an interface the Persona understands on first glance: clear spatial hierarchy, predictable orientation and escape, zero hunting behind opaque menus, and instant access to real workspace content.

Load alongside [dashboards.md](dashboards.md) for Operate surfaces and [mobile-web.md](mobile-web.md) whenever a mobile cell exists.

## The four levels

| Level | What it looks like |
|---|---|
| **2: template** | Workspace switcher buried in a bottom-left profile menu; sibling top-level areas hidden behind a collapsed "More" accordion; unbounded recents pushing footer links off-screen; `⌘K` undocumented or filtering only static route names; dead "No results" text; generic "Navigation" mobile drawer |
| **6: clean** | Grouped sidebar links with active styling; visible search trigger; working mobile drawer; settings page with a back button to `/` |
| **8: considered** | Clear workspace vs. personal scope separation; priority-first flat named groups; bounded recents with expand/collapse; contextual sub-mode back button returning to the exact prior route; `⌘K` searching live workspace entities with synonyms, recents, category filters, and recovery actions |
| **10: memorable** | Spatial muscle memory works on visit one: tight desktop rhythm, touch-sized mobile drawer, session-dismissible notices, instant keyboard paths with skip link and `aria-current="page"`, and a command palette that replaces hunting through navigation |

## Four tests for an intuitive shell

1. **Self-evident first glance (mental model):** A first-time Persona can point to scope (which workspace), primary creation action, primary daily work, and personal account within 5 seconds, with zero mystery-meat icons or undocumented shortcuts.
2. **Progressive disclosure without burial:** Primary workflows surface immediately; sibling top-level areas stay visible in small named groups rather than hiding behind an opaque `"More"` toggle that forces hunting.
3. **Predictable orientation and escape:** Every view answers where the Persona is (`aria-current="page"`, accurate drawer/page title), where they came from, and how to return in one click.
4. **Forgiving defaults and recovery:** Empty states, zero-result searches, and non-blocking banners guide the next step or dismiss cleanly rather than dead-ending or permanently nagging.

## Scope separation and information architecture

- **Separate workspace scope from personal scope.** Anchor the workspace or organization switcher at **top-left**, visually governing every navigation group beneath it, and pair it cleanly with the primary creation action (e.g., `New chat`, `New doc`, `New issue`). Isolate the personal account/profile menu at **bottom-left** for personal tasks only (profile, personal preferences, notifications, sign out). Never bury a workspace switcher inside the bottom-left personal menu.
- **Order top-level navigation by daily frequency (Pareto principle).** Place high-frequency daily work surfaces (active threads/work, inbox/notifications, assigned tasks) in the top primary group, above secondary domain groups (automation, data, integrations) and admin/utility destinations (`Members & teams`, `Settings`) near the footer.
- **Flat, named groups beat opaque `"More"` drawers.** Replace collapsed `"More"` accordions that hide sibling top-level destinations with small, scannable named groups of ~3–4 items (≤ 7 items per group, Miller's law). Users build spatial muscle memory only when top-level areas occupy stable, visible positions.
- **Bound dynamic lists such as Recents.** Cap sidebar recent lists (default 5 items) with an explicit `"Show N more"` / `"Show fewer"` toggle so high-churn items never push core navigation or footer controls below the fold.
- **Contextual sub-mode escape.** Sub-modes that replace the primary sidebar (such as Settings or admin areas) show a contextual back control (`Back to <workspace>` or the origin label) that returns to the exact route the Persona came from, never dumping them at a generic root.
- **Session-dismissible non-blocking banners.** Warning or status banners in the shell (usage limits, low credits, trial notices) must be dismissible for at least the current session so they inform without permanently eating vertical space or nagging across every navigation.

## Sidebar density, rhythm, and portaled drawers

- **Keep desktop vertical rhythm tight and subordinate.** Oversized group gaps (`≥ 20px`) and full-size (`14px`) section headings disconnect groups and push core navigation below the fold. Use:
  - subordinate section labels: `12px`, muted foreground, clear contrast (≥ 4.5:1);
  - tight inter-group rhythm: `10–12px` between groups, and tighter (`4–8px`) immediately beneath the sidebar header/search trigger;
  - compact desktop rows: `~28–32px` height with vertically centered icons and trailing chevrons/actions (`align-items: center`).
- **Keep mobile drawers touch-friendly.** Inside mobile navigation drawers, keep row heights touch-sized (`36–40px+`, with ≥ 44px hit areas via padding or `::after` overlays per [../craft-floor.md](../craft-floor.md#states)) rather than inheriting compact desktop row heights.
- **Scope styles for portaled drawers.** Mobile drawers, popovers, and dialogs often portal into `document.body`, outside the app shell's DOM ancestor. Never depend on shell-scoped selectors (`.app-shell .nav-row`) or shell-scoped CSS variables to style portaled drawer rows, density, or theme colors. Attach styles directly to the portaled container or `:root` / theme scope, and verify computed styles inside the rendered portal.

## Keyboard and accessibility fundamentals

- **Skip link:** Provide a focus-visible `"Skip to content"` link as the first focusable control in the shell, targeting the `<main>` landmark (`id="main-content"`, `tabindex="-1"`).
- **Active navigation semantics:** Mark the current route with `aria-current="page"` on the active nav link, never visual styling alone.
- **Accurate mobile drawer titles:** Name the mobile navigation drawer for the active workspace or sub-mode (e.g., `"Acme Workspace"`, `"Settings"`), never a generic `"Navigation"` or `"Menu"`.
- **Collapsed rail parity:** When a desktop sidebar collapses to an icon rail, every icon-only item keeps a descriptive `aria-label` and a delayed tooltip (`~0.5–1s`, instant when moving between adjacent icons).

## Global search and command palette (`⌘K` / `Ctrl K`)

- **Make the trigger discoverable.** Place a visible `Search` button with an OS-aware shortcut badge (`⌘K` on macOS, `Ctrl K` on Windows/Linux) directly in the sidebar header or top bar. Never hide global search behind an undocumented shortcut.
- **Search live workspace content, not only static routes.** A command palette that filters only static page names breaks the Persona's mental model. Query live workspace entities (items, threads, tables, records, workflows, files, members) in parallel alongside static pages and quick actions. Debounce network queries (`~150–300ms`), abort stale requests (`AbortController`), and cache recent lookups for the session so repeated opens feel instant (Doherty threshold).
- **Zero-state utility without duplication.** On open (empty query), surface:
  1. persisted **Recent picks**;
  2. **Quick actions** (creation and high-frequency commands);
  3. **single-category filter chips** so the Persona can browse a category before typing a character.
  Deduplicate strictly across sections: a quick action or destination must never appear in both Quick actions and Static pages.
- **Synonym-aware matching and descriptions.** Index intent keywords and synonyms alongside titles (e.g., `"billing"`, `"invoices"` → `Usage`; `"invite"`, `"roles"` → `Members & teams`) and render concise secondary descriptions so Personas find features by task, not by memorized route names.
- **One-click recovery on zero matches.** When a query matches nothing, never dead-end on a bare `"No results"` string. Provide one-click recovery buttons: clear the search, switch or clear the active category filter, or start the primary creation action (prefilled or scoped when useful).
- **Viewport-safe placeholder microcopy.** Keep the search input placeholder concise (`~24–32` characters, e.g., `"Search workspace…"`) so it never clips mid-word on narrow `375px` mobile dialogs.
- **Zero opening lag.** Keyboard-initiated command palettes never animate open or closed ([../craft-floor.md](../craft-floor.md#motion)).

## Verify

Capture light/dark × desktop (`1440×900`) and mobile (`375–390px`), plus these shell states:

- [ ] **Expanded and collapsed desktop sidebar:** workspace switcher sits top-left with primary creation action; personal account menu sits bottom-left; no opaque `"More"` toggle hides top-level siblings; section labels are subordinate (`12px`, muted) with `10–12px` inter-group gaps (`4–8px` under header/search); recents are capped with a `"Show N more"` / `"Show fewer"` toggle; core nav and footer controls stay above the fold.
- [ ] **Portaled mobile drawer (`375–390px`):** opens cleanly in light and dark mode; drawer title names the active workspace or sub-mode (not `"Navigation"`); computed row styles and theme tokens apply inside the portal; tap targets are touch-friendly (`≥ 44px` hit area).
- [ ] **Sub-mode escape:** enter a sub-mode (e.g., Settings) from a deep route, verify the back button names the origin/workspace, click it, and confirm it returns to the exact prior route.
- [ ] **Command palette — three states:** capture **empty/zero-state** (recent picks, quick actions with zero duplicates across sections, category filter chips), **active query** (live workspace entities + synonym match returning expected destination), and **zero-match query** (one-click recovery actions present). At `375px` width, verify the search placeholder does not clip mid-word.
- [ ] **Keyboard and banners:** first `Tab` reveals `"Skip to content"`; active nav item has `aria-current="page"`; `⌘K` / `Ctrl K` opens and `Escape` closes the palette; dismissing a non-blocking banner keeps it closed across navigation in the same session.
