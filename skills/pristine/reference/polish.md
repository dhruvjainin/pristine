# Polish

`/pristine polish [lens…] [target]` (also bare `/pristine` when the target exists and the user wants it improved, not reimagined; see SKILL.md → Intent routing) diagnoses the target, then applies only the Lenses that raise its Score, and verifies the result visually. It keeps the current look and identity. **It edits code.**

## Lenses

Each Lens has a playbook in `reference/lenses/`. Read a Lens's file before applying it.

| Lens | Raises | Use when the Capture shows… |
|---|---|---|
| [bolder](lenses/bolder.md) | Persona fit, Hierarchy & clarity | Safe, generic, timid, forgettable design |
| [quieter](lenses/quieter.md) | Hierarchy & clarity, Persona fit | Loud, busy, everything shouting, visual fatigue |
| [colorize](lenses/colorize.md) | Color & theming | Gray/monochrome UI with no meaning carried by color |
| [decolorize](lenses/decolorize.md) | Color & theming, Hierarchy & clarity | Too many hues, rainbow UI, accent overuse |
| [typeset](lenses/typeset.md) | Typography | Flat or chaotic type, bad measure, default fonts |
| [layout](lenses/layout.md) | Layout & spacing, Hierarchy & clarity | Uneven spacing, weak alignment, monotonous grids |
| [consistency](lenses/consistency.md) | Consistency | One-off values, mixed radii/shadows/icons, drift from DESIGN.md |
| [adapt](lenses/adapt.md) | Responsiveness | Broken/cramped mobile, tiny targets, horizontal scroll |
| [animate](lenses/animate.md) | Motion & interaction | Missing states, janky or absent transitions, non-60fps motion |
| [delight](lenses/delight.md) | Persona fit | Correct but joyless; no memorable moment |
| [overdrive](lenses/overdrive.md) | Persona fit | User wants ambitious, show-stopping effects (opt-in only) |
| [clarify](lenses/clarify.md) | Copy, Hierarchy & clarity | Vague labels, jargon, unhelpful errors, filler |
| [distill](lenses/distill.md) (alias **simplify**) | Hierarchy & clarity, Persona fit | Too many elements, options, or steps |
| [harden](lenses/harden.md) | Robustness & performance, Accessibility | Missing loading/empty/error states, overflow, a11y gaps |
| [optimize](lenses/optimize.md) | Robustness & performance | Slow load, layout shift, heavy assets, janky scroll |
| [polish-details](lenses/polish-details.md) | All | Final pass: alignment, focus rings, states, pixel details |

Conflicts: never apply **bolder + quieter** or **colorize + decolorize** together; pick the one the diagnosis supports. **overdrive** only when the user asks or a forced lens names it.

## Step 1: Context

1. Read `DESIGN.md` (Product, Personas, Design System). If missing, infer the system from tokens/components and proceed; offer `/pristine init` at the end.
2. Read the target's source and its neighbors: shared components, tokens, and similar screens. **Before drawing or hand-styling any component, search the system for one with the same job** (component folders, Storybook, the UI library in `package.json`; search by role: `Tooltip`, `Chip`, `Avatar`, `IconButton`, `EmptyState`). Reuse or extend it. If none exists, say what you searched for in the report. Fix problems at the right level: a missing token goes into the system, a one-off becomes the shared component, a local bug gets fixed locally.
3. Identify the mode (Persuade / Operate / Read / Experience, see [critique.md](critique.md)) and read the matching pattern files: [patterns/landing-pages.md](patterns/landing-pages.md) for Persuade, [patterns/dashboards.md](patterns/dashboards.md) for Operate or any table/chart, [patterns/mobile-web.md](patterns/mobile-web.md) whenever a mobile cell exists, [patterns/onboarding.md](patterns/onboarding.md) for signup, login, verification, setup, first-run, permission, trial, upgrade, or paywall surfaces, and always [patterns/vibe-code-tells.md](patterns/vibe-code-tells.md).

## Step 2: Baseline Capture + diagnosis

1. Run a **before** Capture across the Capture Matrix ([capture.md](capture.md)) with `--label before`.
2. Run the detector on the target's source: `node <skill dir>/scripts/detect.mjs <paths>`.
3. Do a **quick internal critique** using the Dimensions and calibration in [critique.md](critique.md): score each Dimension, list the gaps. Don't print the full critique report; keep it short.
4. Note every vibe-code tell from [patterns/vibe-code-tells.md](patterns/vibe-code-tells.md); each one becomes a planned fix under its listed Lens.
5. If a critique report from this conversation exists for the same target, reuse its Priority fixes.

## Step 3: Plan the Lenses

- **Forced Lenses** (named by the user) always run. Also fix any P0 issue you see, and mention it.
- **Otherwise** pick the Lenses for every Dimension scoring below 9, ordered by impact. Usually 3–6 Lenses; **polish-details** always runs last.
- Fix in this order: broken or blocked tasks and a11y blockers → missing states → hierarchy/layout/responsive → type/color/consistency → motion/delight → cleanup.

**Ask before proceeding only if** the plan would: change brand identity or the overall visual direction (that's a redesign; offer to switch to `/pristine design`, see [design.md](design.md)), change factual copy or claims, add a dependency (font, library), or remove a feature. Otherwise proceed without asking; state the plan in one or two lines.

If the baseline Level is below 6 (template-level), polish can't reach 10/10 on its own. Still apply the Lenses, but recommend `/pristine design` (redesign) under "Still short of 10/10".

## Step 4: Apply

1. Read [craft-floor.md](craft-floor.md) once before the first edit.
2. For each planned Lens, read its file in `reference/lenses/` and apply it to the target. When animate or delight runs, build from [patterns/motion-recipes.md](patterns/motion-recipes.md); when harden runs on a data-driven component, test it against [patterns/worst-case-data.md](patterns/worst-case-data.md).
3. Use DESIGN.md tokens. If a needed value doesn't exist, add a token to the system (and to DESIGN.md) instead of hard-coding.
4. Keep changes scoped to the target and to the shared code it genuinely needs. No drive-by refactors.
   - **Check what's coupled to the geometry before changing it.** A spacing, indent, or size value may drive something else: connector lines in trees, timeline rails, avatar stacks, sticky offsets, scroll calculations, or canvas/SVG math. Search for the value and its token before proposing a change; if it's coupled, change both together or leave it.
5. Remove what you made obsolete: dead styles, unused imports, duplicate values, debug code.

## Step 5: Verify (one after-Capture)

1. Run the project's type-check/lint/build if they exist and are fast. Fix what you broke.
2. Re-run the detector on edited files. Fix real findings. Accept a flagged item only after you've verified it's safe, and record why in the report (e.g. `outline: none` is fine only when you confirmed a visible `:focus-visible` replacement such as a ring or border, in light and dark).
3. Run the project's tests that touch what you changed. New UI can break selectors: e.g. a search box inside a popup adds a second combobox, so tests must find each one by its accessible name, not by role alone. Update tests to be specific; never delete or skip them to pass.
4. Run an **after** Capture across the same cells (`--label after`), plus rest, hover, pressed, and focus-visible (and tooltip/menu states) for every control you changed. Confirm each dark cell really rendered dark ([capture.md](capture.md) → Step 3). Check for regressions in every cell, especially dark mode and mobile.
5. Fix what the Capture shows, then re-capture **once** to confirm. Don't loop on cosmetic churn.
6. **If you regenerated visual-test baselines, open and look at them.** A baseline clipped by the test viewport, or taken mid-animation, locks in a bug. Fix the test's viewport or wait condition, not just the image.
7. **"Done" includes the surrounding docs.** Update everything that describes what you changed: prose about motion, tokens, and components (DESIGN.md, READMEs, Storybook/MDX docs, code comments), skill or agent references, and visual baselines. A token that was renamed or retimed must match everywhere it's documented.
8. Re-score each Dimension honestly, applying the uncaptured-state caps from [critique.md](critique.md) → Calibration. In the report, say "verified" only for what was checked under the user's real conditions ([capture.md](capture.md) → Step 2).

## Step 6: Report

```markdown
## Pristine Polish: <target> (<url | screenshot | file | feature>; files: <edited files>)
**Score: X/10 → Y/10** · Lenses: <applied> · Captured: <cells and states> (before/after paths) · Not captured: <states, or "none">

### Changes
| Before | After | Why (for the Persona) |
|---|---|---|
| `<file>`: `transition: all 300ms` | `transition: transform 160ms var(--ease-out)` | <Lens>: … |

One row per meaningful change, grouped by Lens. Use the real old and new values, not paraphrase.

### Dimension deltas
| Dimension | Before | After |
|---|---|---|

### Accepted detector findings
- <rule> at <file:line>: <why it's safe, and how you verified it> (omit if none)

### Still short of 10/10
- <remaining gaps, with what it would take: content, assets, or decisions only the user can make>
```

Keep it tight. If DESIGN.md was missing, end with: "Run `/pristine init` so future passes judge against your real Personas."
