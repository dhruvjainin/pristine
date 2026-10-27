# Compare mocks

Used by `polish compare [target]`. The user sees 2–3 rendered options side by side and picks one before any code is edited.

## Build the mocks

1. Pick **one** decision to compare: the layout or structure of the target's focal region (hero, pricing table, settings form, nav). Do not compare whole sites.
2. Write 3 standalone HTML files (`A`, `B`, `C`) to `.pristine/compare/`. Each:
   - Uses the real copy, the DESIGN.md tokens (inlined as CSS custom properties), and the real fonts the project already loads. No lorem ipsum, no new fonts or dependencies.
   - Renders without JS and without network. Inline CSS only, at most 250 lines per file.
   - Stays within polish's limits: same brand, content, and behavior. The options differ in **structure** (order, grid, density, where the primary action sits), not in shade. Three color swaps of one layout is one option.
   - Works at 390px and at 480px wide: the page shows each in a column about that wide.
3. Mark one **Recommended**. Say why in one line, tied to the primary Persona.
4. Name each option in 1–2 words (e.g. `Calm`, `Dense`, `Split`).

## Show them

```bash
node <skill dir>/scripts/compare.mjs .pristine/compare/a.html .pristine/compare/b.html .pristine/compare/c.html --recommend B --names "Calm,Dense,Split"
```

The script writes `.pristine/compare/compare.html` (columns tagged A, B, C; the recommended one outlined with a badge) and opens it in the default browser. If it cannot open a browser, give the user the printed path. Pass `--no-open` when a harness browser tool will load the page instead; then screenshot it.

## Let the user choose

Ask with the harness's choice UI, one question, recommended option first:

```
❓ Which layout do I build?
1. B – Dense (Recommended): <one-line reason>
2. A – Calm: <one-line trade-off>
3. C – Split: <one-line trade-off>
4. Type your answer
```

Then continue polish from Step 4 with the chosen option as the layout plan. Build it with the real components, not by pasting the mock. Delete `.pristine/compare/` when done.
