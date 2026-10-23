# Design

`/pristine design [target]` builds UI in a new direction. It covers two cases, decided by whether the target exists:

- **Fresh**: the UI doesn't exist yet (a new page, section, component, or flow).
- **Redesign**: the UI exists and the user wants a new look, not just a better version of the current one.

Both cases offer 2–3 **Directions**, build the one the user picks, and verify it visually. **It edits code.**

| | Fresh | Redesign |
|---|---|---|
| Starting point | Nothing, or a brief | A working UI the user wants changed, not just refined |
| Before-Capture | Neighboring screens (to match the system), or none | The target itself |
| Must preserve | The Design System, unless the user asks for a new one | Content, features, behavior, routes, data, and accessibility, unless the user says otherwise |
| Free to change | Everything within the system | Layout, hierarchy, type, color, motion, and component styling |

If the user only wants the existing UI to be better without changing its look, that's **polish**, not redesign.

## Step 1: Context

1. Read `DESIGN.md`. If it's missing, gather the minimum from the conversation and the code: what the product does, who the primary Persona is, and what this surface must achieve. Ask only for what you can't infer, one question at a time. For a fresh target with no product context at all, suggest `/pristine init` first, but don't block on it.
2. Identify the mode (Persuade / Operate / Read / Experience, see [critique.md](critique.md)) and read the matching pattern files the same way critique Step 1.3 does. Always read [patterns/vibe-code-tells.md](patterns/vibe-code-tells.md): a fresh design must start without them.
3. Read the code around the target: framework, styling approach, tokens, shared components, and similar screens. Build with what the project already uses. Ask before adding a dependency (library, font, icon set).
4. Resolve where the work lives. For a fresh target named by feature ("pricing page", "onboarding"), choose the route and file location from the project's conventions and state them.
5. **Redesign case only**: write an inventory of what must survive: every feature, piece of factual copy, link, form field, state, route, analytics or test hook, and keyboard behavior. This is the regression checklist for Step 5.

## Step 2: Baseline

- **Redesign**: run a **before** Capture across the Capture Matrix ([capture.md](capture.md), `--label before`), run the detector, and do a quick internal critique ([critique.md](critique.md)): Level, Score per Dimension, and what already works and should carry over (brand equities, a strong illustration, a loved interaction).
- **Fresh**: capture 1–2 neighboring screens if the app already has UI, so the new surface belongs to the same product. Skip if there's nothing to render.

## Step 3: Directions

Propose **2–3 Directions** and let the user pick one. A Direction is a short design brief, not code:

```markdown
### A. <Evocative name>
<One paragraph: the idea, and why it wins the primary Persona.>
- **Structure**: <section order or screen skeleton; where the primary action sits>
- **Type**: <families, scale, and character>
- **Color**: <palette strategy and accent dose; light/dark>
- **Motion**: <where motion lives and how it feels>
- **Signature moment**: <the one thing a Persona will remember>
- **Trade-off**: <what it gives up or risks>
```

Rules:
- Directions must differ in idea, not in shade. Three color swaps of one layout is one Direction.
- Each must reach at least Level 8 for its mode ([critique.md](critique.md) → Levels). No safe filler option.
- Stay inside DESIGN.md's Brand and Design System unless the user asked for a new look; for a redesign, at least one Direction should keep the brand recognizable.
- Ground every choice in the Personas or the brief. "Modern and clean" is not a reason.
- Mark one as **Recommended**, list it first, and say why in one line.
- Present them with the harness's choice UI. If the user already named a direction ("make it brutalist", "like our marketing site"), turn that into a single Direction, state it in two lines, and proceed without asking.
- **A reference image fixes the look, not the behavior.** When the user says "make it like this screenshot", skip the Directions, but don't guess what a still image can't show. Before building, list what the image leaves open: how states change (idle, running, success, error), what moves and how (a pulse, a spin, a progress sweep, nothing), hover and focus, and loading. Ask **one** question about motion and state behavior, offering 2–3 concrete options with a recommended one first (e.g. for a "running" status: 1. a slow opacity pulse, 2. a rotating dashed ring, 3. static with a label). Ask more only if another open behavior would change the build.

## Step 4: Build

1. Read [craft-floor.md](craft-floor.md) before the first edit. Its bans are absolute.
2. **Tokens first.** Extend the existing tokens with what the Direction needs. If the Direction changes the system (new palette, type, radius, motion), update the tokens and the Design System in DESIGN.md together; the user's choice of Direction is consent for that, scoped to the target. Never hard-code one-off values.
3. **Structure before style.** Lay out the content hierarchy and pass the skeleton test from [critique.md](critique.md) before you add color, effects, or motion. Use real content from the product or the brief. Never lorem ipsum; mark genuine placeholders as `TODO(content)` and list them in the report.
4. **Build every state and size from the start**: mobile and desktop, light and dark (if supported), hover/focus/active/disabled, plus loading, empty, error, and [worst-case data](patterns/worst-case-data.md) for anything data-driven.
5. **Apply the Lenses as build rules, not afterthoughts.** Read the Lenses the Direction depends on in `reference/lenses/` (usually layout, typeset, colorize or decolorize, animate, adapt, harden, clarify) and build to them. Use [patterns/motion-recipes.md](patterns/motion-recipes.md) for motion. Use overdrive only when the chosen Direction calls for it.
6. **Redesign case only**: change the look, not the behavior. Keep the props, APIs, routes, and data flow, and reuse the existing logic. Remove the old styles and components you replaced; don't leave both.
7. Finish with the **polish-details** Lens.

## Step 5: Verify (one after-Capture)

1. Run the project's type-check/lint/build if they exist and are fast. Fix what you broke.
2. Run the detector on the new or edited files. Fix real findings.
3. Run an **after** Capture across the Capture Matrix (`--label after`), including the key interaction states. For a redesign, compare it with the before-Capture.
4. **Redesign case only**: walk the Step 1 inventory. Every item must still be present and still work.
5. Score it honestly with the critique Dimensions. If it falls short of Level 8 for its mode, fix the biggest gaps, then re-capture **once**.
6. Apply polish's verify rules ([polish.md](polish.md) Step 5): run the affected tests with specific selectors, justify any accepted detector finding in the report, open any regenerated visual baselines, and update the docs, tokens prose, and references that describe what changed.

## Step 6: Report

```markdown
## Pristine Design (<fresh | redesign>): <target> (<route>; files: <created/edited files>)
**Direction: <name>** · **Score: <before → >Y/10** · Level: <n> · Captured: <cells> (paths)

### What was built
- <structure, signature moment, and the system changes (tokens and DESIGN.md)>

### Preserved (redesign case only)
- <inventory confirmed: features, copy, routes, behavior>

### Dimension scores
| Dimension | <Before> | After |
|---|---|---|

### Still short of 10/10
- <real content, assets, or decisions only the user can make; TODO(content) placeholders>
```

If DESIGN.md was missing, end with: "Run `/pristine init` so future passes judge against your real Personas."
