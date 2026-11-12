# Live Variants

Used by `design` Step 3 (one **Variant** per Direction) and by `polish` Step 3 (a fix that needs a new structure). The user sees 2–3 Variants of the target running on its real route, flips between them with a bar at the bottom of the page (`?variant=A`, `B`, `C`), and picks one. The chosen Variant is then built properly and the rest is removed.

A Variant is a live build of one option. It is a sketch to choose from, not the final code.

## Step 1: Host and scope

1. Pick the **host**, in this order:
   1. The target's existing route. Data loading, params, and auth stay; only the rendered region swaps.
   2. For a surface that doesn't exist yet but belongs inside a page (a new card, section, or step): that page.
   3. Only when no page can host it: a new route in the project's routing convention whose path contains `prototype`.
2. Scope the swap to the smallest region that holds the question (the hero, the table, the form, the page body). The app shell (header, sidebar, footer) stays as it is, so each Variant is judged against the real surroundings.
3. Write the question in one line and put it at the top of the report, e.g. "Three Variants of the settings body on `/settings`, switched with `?variant=`."

## Step 2: Plan the Variants

Build **3** Variants: `A`, `B`, `C`. Build 2 only when a third would repeat one of them. In design, each Variant is one Direction.

Write one skeleton line per Variant before coding:

```
A · Stacked    — single column of grouped sections; Save sticks to the bottom
B · Split      — section nav on the left, one section visible; Save per section
C · Checklist  — collapsed rows with a status each; Save inside the open row
```

Each pair of Variants must differ in **at least two** of these, read from the skeleton lines:

| Axis | Examples |
|---|---|
| Layout primitive of the region | single column, split pane, table, card grid, tabs, stepper, list + detail |
| Order of the first three content blocks | what the eye meets first |
| Where the primary action sits | inline, top right, sticky bottom, per row |
| How much shows at once | everything, one group at a time, summary then detail |

If two skeleton lines name the same layout primitive, rewrite one of them. Three card grids with different gaps, or three color swaps of one layout, are one Variant.

Rules:
- Each Variant keeps all of the region's content, features, and actions. A Variant may hide something behind a tab or disclosure; it may not drop it.
- Each Variant gets a 1–2 word name (`Stacked`, `Split`, `Checklist`).
- Mark one **Recommended** and say why in one line, tied to the primary Persona and a [UX law](../../SKILL.md#ux-laws) where one applies.

## Step 3: Build the Variants

1. **One file per Variant, plus one switcher file.** Every such file has `.prototype.` in its name (`SettingsStacked.prototype.tsx`, `VariantSwitcher.prototype.tsx`, `settings.prototype.css`) and sits next to the target.
2. **Variants share data, not layout.** Each one receives the same props or data the region already has. They may share leaf components (button, input, avatar). They must not share a layout wrapper.
3. **Real data, no writes.** Read through the page's existing loaders. Where the surface is new, use in-memory mock data that includes the cases in [worst-case-data.md](worst-case-data.md). Point every mutation (save, delete, send) at a stub that only updates in-memory state. Store nothing: no database, no `localStorage`, no cookies.
4. **Use the system.** DESIGN.md tokens and existing components, with the real copy. No lorem ipsum, no new dependency or font.
   - From **polish**: the look does not change. No new token.
   - From **design**: a Direction may change the look. Declare its tokens as CSS custom properties scoped to the Variant's root element in its own `.prototype.` file. Do not edit the shared tokens or DESIGN.md until the user has chosen.
5. **Sketch depth.** Build each Variant's default state at desktop and mobile widths, in the themes the project supports. Skip tests, loading/empty/error states, and motion; the chosen Variant gets those when it is built properly. Accessibility basics still hold: real `<button>`/`<a>`/`<label>` elements and visible focus.
6. **Wire the host in one place.** Read `variant` from the URL query, default to `A` when it is missing or unknown, and render the matching Variant where the region was. Keep the original region's code untouched beside it until Step 6.

## Step 4: Switcher

One fixed bar, rendered once on the host:

- **Position**: `position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%)`, above the app's highest `z-index`.
- **Contents**, left to right: a previous `<button aria-label="Previous variant">`, the label `B · Split (2/3)`, a next `<button aria-label="Next variant">`. Both buttons wrap around. Each is at least 40×40px.
- **URL**: each change replaces the `variant` query param through the project's router (or `history.replaceState`), keeping every other param. A reload or a shared link shows the same Variant.
- **Keys**: `←` and `→` cycle. Ignore them while focus is in an `<input>`, `<textarea>`, `<select>`, or `[contenteditable]`.
- **Looks like a tool, not the design**: dark pill on light pages and light pill on dark ones, system font, its own hard-coded colors (the one place a Variant may skip tokens).
- **Development only**: render it behind the framework's development flag (`import.meta.env.DEV`, `process.env.NODE_ENV !== "production"`, or the equivalent). Its root element carries `data-pristine-prototype`.
- **Hidden in a frame**: render nothing when `window.self !== window.top`, so a capture or embed shows only the design.

## Step 5: Show and choose

1. Start the project's dev server if it isn't running (background mode; stop it at the end if you started it).
2. Capture each Variant at desktop and mobile ([capture.md](../capture.md)), e.g. `node <skill dir>/scripts/capture.mjs "<url>?variant=B" --label proto-b`. Look at every image. Fix a Variant that fails to render, overflows horizontally, or looks the same as another at thumbnail size. This is a render check, not a Score.
3. Give the user one URL per Variant (each opens the same page with the bottom bar to flip), then ask with the harness's choice UI, one question, Recommended first:

```
Which Variant do I build?
1. B – Split (Recommended): <one-line reason>   <url>?variant=B
2. A – Stacked: <one-line trade-off>            <url>?variant=A
3. C – Checklist: <one-line trade-off>          <url>?variant=C
4. Type your answer
```

4. A mix is a valid answer ("the nav from B with the rows from C"). Restate the mix as one skeleton line and confirm it only if two parts conflict.
5. If the user rejects all of them, ask what each one got wrong, then run Steps 2–5 once more with new skeletons. After two rounds with no pick, stop and report.
6. If the user can't be reached, leave the Variants in place, report the URLs and the Recommended Variant, and stop. Never pick for them.

## Step 6: Build the choice, remove the rest

1. **Keep the full set first.** In a git repo, commit only the `.prototype.` files and the host wiring to a local branch `prototype/<target-slug>`, then return to the working branch. Don't push or merge it. Name the branch in the report. Outside git, skip this.
2. **Rebuild, don't promote.** Write the chosen structure into the real files with the real components. Variant code skipped states and tests, so use it as a sketch, not as the source.
   - From **design**: continue at [design.md](../design.md) Step 4. Move the chosen Variant's scoped tokens into the shared tokens there.
   - From **polish**: return to [polish.md](../polish.md) Step 3 with the chosen structure as the first planned fix.
3. **Remove everything else** from the working branch: every `.prototype.` file, the switcher, the `variant` query read, the stubs, and the old region's code that the new structure replaced.
4. **Verify the removal.** All three must hold:
   - `git status` and a filename search show no `.prototype.` file.
   - A search of the source for `data-pristine-prototype` and for the `variant` query read returns nothing.
   - The route renders the chosen structure with no query param, and adding `?variant=B` changes nothing.

## Report line

The design report ([design.md](../design.md) Step 6) names the choice like this:

```markdown
**Direction: <name>** (from A · <name>, B · <name>, C · <name>) · Full set: branch `prototype/<target-slug>`
```

A run from polish adds one row to the polish Changes table (Before: the old structure's skeleton line; After: the chosen one; Why: the user's pick and the reason), and the branch name under it.

If the run stopped before a choice (Step 5.6), report instead: the question, the skeleton lines, one URL per Variant, the Recommended one, and the files to delete if the user drops the idea.
