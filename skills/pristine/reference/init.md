# Init

`/pristine init` writes (or updates) `DESIGN.md` at the project root: the single source of truth for **Product**, **Personas**, and **Design System**. Every Critique and Polish reads it.

## Step 1: Load current state

- **No DESIGN.md**: explore, interview, write.
- **DESIGN.md exists**: read it, report what looks stale or missing versus the code, and ask only about those gaps. Never silently overwrite confirmed content; edit in place.
- **Other context files** (`PRODUCT.md`, `README`, brand guides, Figma tokens): mine them as evidence. Don't delete them.

## Step 2: Explore before asking

Spend real effort here so the user never repeats what the repo already says.

**Product evidence:** README, landing copy, page titles/meta, routes, feature names, pricing pages, onboarding copy, docs, `package.json` description.

**Design System evidence (draft it from code):**
- Tokens: CSS custom properties, `tailwind.config.*` / `@theme` blocks, theme files (`theme.ts`, `tokens.json`), SCSS variables.
- Color: brand/accent, neutrals, semantic (success/warning/danger/info), and light/dark values.
- Typography: font families and how they're loaded, size scale, weights, line-heights, letter-spacing.
- Spacing, radii, shadows/elevation, breakpoints, z-index layers.
- Motion: durations, easings, existing animation libraries.
- Components: the shared component directory (buttons, inputs, cards, nav, dialogs), the UI library (shadcn, Radix, MUI…), icon set.
- Dark mode: mechanism (`prefers-color-scheme`, class, data attribute) or absent.

Then run a **Capture** of the main surface ([capture.md](capture.md)) so the visual description matches reality, not just the token files.

Treat everything you infer as a hypothesis until the user confirms it.

## Step 3: Interview

Ask one question at a time with the harness's question/choice tool when available; otherwise ask in plain text and wait. Offer your evidence-based guess as the recommended option. Ask only about gaps the evidence doesn't settle. Typical sequence:

1. **What the product does**: one sentence, plus what makes it different from the obvious alternative.
2. **Primary Persona**: who, in what situation, doing what job, on which device, with what expertise. Then: secondary Personas? (Max 3 total.)
3. **What the Persona must feel/believe** within 5 seconds (e.g. "this is trustworthy enough for payroll").
4. **Brand personality**: 3 adjectives, and 1–2 references they admire *and* 1 they'd hate to resemble.
5. **Design System confirmation**: show the drafted tokens; ask what's wrong, missing, or aspirational vs. actual.

Don't ask about constraints. The [default standard](craft-floor.md#default-standard) applies to every project. Record an exception only when the evidence or the user states one (e.g. a stricter AAA target, an IE-era browser contract, SSR-only rendering), along with must-keep assets and legal copy found in the code.

Stop when you could write every section below with confidence. Mark anything still unknown as `TBD` rather than inventing it. Never invent customers, metrics, testimonials, or claims.

## Step 4: Write DESIGN.md

Use this structure. Omit sections that genuinely don't apply; keep everything concrete (values, not adjectives alone).

```markdown
# DESIGN.md: <Product name>

## Product
- **What it is:** <one sentence>
- **Why it's different:** <mechanism or position>
- **Surfaces:** <e.g. marketing site (Persuade), app dashboard (Operate), docs (Read)>
- **Success looks like:** <what the Persona achieves>
- **Constraints:** Pristine default standard (WCAG 2.2 AA; evergreen browsers; static export, readable with JS off; reduced motion respected; LCP < 2.5s on mobile; no new fonts/deps without approval). Exceptions: <none | …>. Must-keep assets / legal copy: <…>

## Personas
### <Name>: <role> (primary)
- **Context:** <situation, device, environment, frequency>
- **Job:** <what they're trying to get done>
- **Expertise:** <novice … expert; domain knowledge>
- **Must feel in 5 seconds:** <belief/emotion>
- **Deal-breakers:** <what makes them leave>
- **Delighted by:** <what makes them stay/share>

### <Name>: <role>
...

## Brand
- **Personality:** <3 adjectives>
- **Voice:** <how copy sounds; words to use/avoid>
- **Admired references:** <…>  **Anti-references:** <…>

## Design System
### Color
| Token | Light | Dark | Use |
|---|---|---|---|
| --color-bg | #… | #… | page background |
| --color-accent | #… | #… | primary actions only |
Rules: <e.g. accent ≤ 10% of any screen; never color-only meaning>

### Typography
- Families: <display / body / mono> (loading: <method>)
- Scale: <token: size/line-height/weight …>
- Rules: <e.g. body 16–18px, measure 60–75ch>

### Spacing & Layout
- Scale: <4/8-based tokens>
- Grid / max widths / breakpoints: <…>

### Shape & Elevation
- Radii: <…>  Shadows: <…>  Borders: <…>

### Motion
- Durations: <micro 120–200ms, standard 200–300ms, large 300–500ms>
- Easing: <curves>
- Reduced motion: <policy>

### Components
- <Button: variants, sizes, states> …
- Icon set: <library, stroke/size>
- Dark mode: <mechanism>

## Do / Don't
- Do: <…>
- Don't: <…>
```

## Step 5: Confirm

Show a short summary of what you wrote and the `TBD`s. Apply corrections. If init was triggered by another command, resume that command.
