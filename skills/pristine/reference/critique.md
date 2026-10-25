# Critique

`/pristine critique [target]` judges the target through the eyes of the Personas in DESIGN.md and scores it out of 10, overall and per Dimension, with brutal honesty and the exact fixes to reach 10/10. **It never edits files.**

## Step 1: Gather context

1. Read `DESIGN.md`. If it is missing, use the code's conventions as the Design System and choose 2 fallback Personas from the table at the bottom. Say so in the report.
2. Identify the surface's **mode**, which changes what "good" means:
   - **Persuade** (landing, marketing, pricing): earn attention, belief, and action. Distinctiveness matters.
   - **Operate** (app, dashboard, admin, settings, tools, charts): task speed, scanability, consistency. Restraint is a virtue.
   - **Read** (docs, blog, articles, changelog): comprehension and reading comfort.
   - **Experience** (portfolio, gallery, showcase): the work leads; UI recedes.
3. Read the matching pattern files: [patterns/landing-pages.md](patterns/landing-pages.md) for Persuade, [patterns/dashboards.md](patterns/dashboards.md) for Operate or any table/chart, [patterns/mobile-web.md](patterns/mobile-web.md) whenever a mobile cell exists, [patterns/onboarding.md](patterns/onboarding.md) for signup, login, verification, setup, first-run, permission, trial, upgrade, or paywall surfaces, and always [patterns/vibe-code-tells.md](patterns/vibe-code-tells.md). Use [patterns/motion-recipes.md](patterns/motion-recipes.md) as the bar when scoring Motion & interaction, and [patterns/worst-case-data.md](patterns/worst-case-data.md) when the target renders user data (Robustness).
4. Read the target's source files when available (components, styles, tokens).

## Step 2: Capture

Run a Capture across the Capture Matrix ([capture.md](capture.md)). For source targets, also run:

```bash
node <skill dir>/scripts/detect.mjs <target source paths>
```

Verify every detector finding in context; drop false positives.

## Step 3: Walk through as each Persona

For each Persona in DESIGN.md (max 3), and on the device they actually use:
1. **First 5 seconds**: what do they see first? Do they know what this is, and what to do? Then the **skeleton test**: blur or squint at the capture; grouping and the one focal point must still read. Then the **cold read**: in each still capture, for every line of text, answer "can I click this?" without the code. An action that reads as text, or text that reads as an action, is a P1 finding. Then the **parity check**: for each set of sibling surfaces (one per provider, plan, or record type), list what each shows; anything one sibling shows and another lacks is a finding.
2. **Primary task**: walk it step by step. Where do they hesitate, misread, or get stuck?
3. **Deal-breakers**: does anything trigger the Persona's listed deal-breakers?
4. **Delight**: anything they'd remember or share?

Write what broke for *that* Persona, naming the element. No generic persona prose.

## Step 4: Score every Dimension (0–10)

| # | Dimension | 10/10 means |
|---|---|---|
| 1 | **Persona fit** | Every choice serves the Personas' job, context, and expectations; they'd pick this over competitors |
| 2 | **Hierarchy & clarity** | One obvious focal point per view; purpose and next action clear in 5s; ≤4 competing choices at any decision (Hick's law) |
| 3 | **Layout & spacing** | Consistent spacing scale; deliberate rhythm; strong alignment; related things grouped, distinct things separated (proximity, common region); long runs chunked |
| 4 | **Typography** | Clear type scale (≥1.2 ratio between levels); readable measure (45–75ch); purposeful families; no orphans or ragged headings |
| 5 | **Color & theming** | Purposeful palette from tokens; one accent in product UI, color carries meaning (status, data); status colors reserved for status, decorative lines neutral; meaning never by color alone; dark mode designed (surfaces lighten with elevation), not inverted |
| 6 | **Consistency** | Same thing looks and behaves the same everywhere (similarity), and familiar patterns work as users expect from other products (Jakob's law); no one-off values; one icon family; themeable variables are actually overridable from outside (not re-declared on the component's own root) and match their docs |
| 7 | **Responsiveness** | Designed (not merely squeezed) for 390px through 1440px+; tap targets ≥44px (Fitts' law); no horizontal scroll; thumb-reachable primary actions |
| 8 | **Motion & interaction** | Every interactive element has hover/focus/active/disabled states; motion only where it has a purpose and the action isn't high-frequency; right easing (ease-out enter/exit), origin-aware, interruptible; routine UI under 300ms; transform/opacity only, 60fps; reduced-motion respected |
| 9 | **Accessibility** | WCAG 2.2 AA: contrast 4.5:1 text / 3:1 UI, visible focus, keyboard path, semantic HTML, labels, alt text |
| 10 | **Copy** | Specific, human, in brand voice; clear labels and errors; zero filler or lorem |
| 11 | **Robustness & performance** | Loading, empty, error, long-content states designed; every action answers within 400ms (Doherty threshold); no layout shift; LCP < 2.5s on mobile; readable with JS off; images/fonts optimized |

Mark a Dimension `n/a` only if it truly can't apply (e.g. Motion on a static screenshot of a single state). Say why.

### Calibration: be brutal

- **10**: World-class. Nothing to fix. Rare; you should almost never give it.
- **9**: Excellent; only nitpicks left.
- **7–8**: Good, professional work with clear gaps.
- **5–6**: Works, but generic, inconsistent, or rough in places. This is where most shipped UI lands.
- **3–4**: Real problems hurt the Persona.
- **0–2**: Broken or unusable.

### Levels: place the whole surface first

Before scoring Dimensions, place the surface on this ladder for its mode. It anchors the overall Score; Dimension scores explain *why* it sits there. ([patterns/landing-pages.md](patterns/landing-pages.md) has the Persuade version in detail.)

| Level | Persuade | Operate | Read / Experience |
|---|---|---|---|
| **2: template** | Centered-hero template, stock/AI imagery, hype copy, doesn't say what it does | Default component-kit look, AI-bright colors, repeated KPIs, dead cards, emoji icons | Default theme, unstyled prose, no hierarchy beyond h1/p |
| **6: clean** | Real structure and copy, one real screenshot; correct but could be any product | Consistent spacing and neutrals, works, but every card/table looks the same and nothing is prioritized | Readable measure and scale, but generic and forgettable |
| **8: considered** | Real product visuals cropped to what sells, clear nav/CTA hierarchy, social proof, motion that explains | Data drives the form, clear focal area, progressive disclosure, all states designed, light and dark both tuned | Typography with a voice, navigable structure, designed code/media/callouts |
| **10: memorable** | One well-built idea only this product could have; personality in hover, 404, empty states | Feels instant (optimistic UI, keyboard paths), invisible UI is designed, power users would pick it over rivals | Reading is a pleasure; details (anchors, TOC, progress, dark mode) are flawless |

Rules:
- Every score cites evidence (a screenshot cell, an element, a file/line).
- The **overall Score is a judgment, not an average.** It's capped by the worst blocker: any Dimension ≤3 caps overall at 6; any craft-floor ban ([craft-floor.md](craft-floor.md)) present caps overall at 7.
- Generic "AI-template" look (the craft-floor slop tells) can't score above 6 on Persona fit for a Persuade surface.
- Each vibe-code tell ([patterns/vibe-code-tells.md](patterns/vibe-code-tells.md)) is a finding. Three or more tells cap the overall Score at 6.
- An action that fails the cold read (looks like plain text at rest) caps Hierarchy & clarity at 6 and the overall Score at 7. Knowing from the code that it is a button doesn't count.
- The overall Score can't exceed the surface's Level by more than 1.
- **Don't score what you haven't seen.** A state that exists on the surface but wasn't captured caps the Dimensions that depend on it at 6, and the overall Score at 7: hover, pressed, and tooltip/menu-open states for Motion & interaction; focus-visible for Accessibility; dark mode (when supported) for Color & theming; loading, empty, and error for Robustness. Reading the CSS doesn't count. List the uncaptured states in the report header and lift the cap only after capturing them.
- Don't inflate to be kind. Don't deflate to seem tough. If it's good, say why precisely.

## Step 5: Report

Use this exact structure:

```markdown
## Pristine Critique: <target> (<url | screenshot | file | feature>; files: <resolved files>)
**Overall: X/10** · Level: <2 | 6 | 8 | 10> · Mode: <mode> · Personas: <names> · Captured: <cells and states, or "Not visually verified: reason"> · Not captured: <states, or "none">

> <2–3 sentence brutally honest verdict: the single biggest reason this isn't 10/10.>

### Scores
| Dimension | Score | Why (evidence) | To reach 10/10 |
|---|---|---|---|
| Persona fit | 6/10 | … | … |
| … | | | |

### Through the Personas' eyes
**<Persona name>** (<device>): <what broke, what worked, by element>

### Priority fixes
1. **[P0] <title>**: <what's wrong, where (file/element)> → <exact fix> · Lens: <lens> · Raises: <Dimensions, est. +N>
2. **[P1] …**
(P0 = blocks the Persona or a ban; P1 = major quality gap; P2 = polish detail. 3–8 items, ranked by impact on the overall Score.)

### What's already working
- <2–3 specific strengths to preserve>

### Path to 10/10
<Short sequence: "Fix P0s → ~X/10; then P1s → ~Y/10; to hit 10 also needs …">
```

Then offer, in one line: "Run `/pristine polish` to apply these fixes?" If the Level is below 6 or the fixes amount to a new visual direction, offer `/pristine design` (redesign) instead. Do not edit anything unless the user agrees.

## Fallback Personas (only when DESIGN.md has none)

| Surface | Use |
|---|---|
| Landing / marketing | First-timer, Mobile skimmer |
| Dashboard / admin / charts | Power user, Keyboard & screen-reader user |
| Docs / blog | First-timer, Mobile skimmer |
| Forms / checkout / onboarding | First-timer, Mobile skimmer, Keyboard & screen-reader user |

- **Power user**: expert; wants speed, shortcuts, density, bulk actions; hates hand-holding and slow animation.
- **First-timer**: new to the category; reads labels literally; needs the first action obvious in 5s; abandons on jargon or ambiguity.
- **Keyboard & screen-reader user**: tabs linearly, relies on focus, labels, headings, and announced state; zooms to 200%.
- **Mobile skimmer**: one thumb, interrupted, slow network; needs big targets, bottom-reachable actions, fast load, preserved state.
