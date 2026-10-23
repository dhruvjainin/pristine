# Consistency

Consistency is whether the product feels like one thing made by one team, or a collage of screens built at different times. When the same concept always looks, sounds, and behaves the same way, a Persona learns it once and trusts it everywhere.

**Raises:** Consistency.
**Skip it when:** the Design System itself is wrong for the Personas (raise that in the Critique and update DESIGN.md first). Don't use it to restyle a single one-off element; that is polish-details. Consistency unifies; it never introduces a new visual direction.

## What a designer looks at

Open the Capture for two or three screens that share components and look before touching code. Run these checks in order.

**1. Side-by-side comparison.** Place the screens next to each other at the same viewport.
- Does the same button look identical on every screen: height, radius, padding, weight, color? If you spot three styles of "primary", the system has drifted.
- Do cards, inputs, badges, and dialogs share the same corner radius, border, and shadow? Mismatches read as "built by different people".
- Hold each component up against DESIGN.md. Any component that ignores it is drift, even if it looks fine alone.

**2. Component inventory.** List every distinct button, input, card, badge, and modal you can find, in the Capture and in the code.
- How many implementations exist for one concept? Two components doing the same job means one is duplicate.
- Do variants differ by intent (primary, secondary, ghost, danger) or by accident? Accidental variants are drift; intentional ones need a name.
- Does each variant have every state: default, hover, focus-visible, active, disabled, loading? Hover and tab through them to check.

**3. Spacing and shape.**
- Do gaps look like they come from one scale, or do you see odd values (13px, 22px, 37px) when you inspect? Off-scale values mean someone eyeballed it.
- Do small components (buttons, inputs, chips, menus) share one radius? Inside nested rounded shapes, is the inner radius = outer radius − gap, or do corners look pinched/bulging?
- Count radii and shadow styles. More than 3–4 radii or more than 3 elevation levels, or shadows with different light directions, means there's no shared shape language.
- Do borders use one hairline width and one or two colors?

**4. Color.** Inspect a few elements. Are colors raw hex/rgb/hsl/oklch values or semantic tokens? Raw values are where drift and dark-mode bugs hide.

**5. Icons.**
- Are all icons from one library, with one stroke weight and one fill style (outline vs solid), on one size grid? Mixed sets, stroke widths, or fills look like clip art. A second style is acceptable only in a visually separate area (e.g. marketing illustrations vs app chrome).
- Are emoji or Unicode glyphs standing in for icons?
- Do icons align optically with adjacent text the same way everywhere?

**6. Words.**
- Is the same action named the same everywhere ("Delete" / "Remove" / "Trash" is three concepts to the user)? Does the primary nav CTA use the same label as the hero CTA?
- Is capitalization consistent across headings, buttons, and labels?
- Are dates, numbers, and currency formatted one way?

**7. Motion and layering.** Do similar transitions use the same speed and easing, from one shared set of tokens, or does each component define its own `cubic-bezier`? Do dropdowns, sticky bars, overlays, and toasts stack predictably, or do z-index fights show up?

**8. Familiarity.** Do things that look the same behave the same and live in the same place (close, back, save, the account menu)? Look-alikes are read as the same kind of thing (law of similarity). Does any screen break a familiar pattern (platform or in-product) without evidence it's better? Users spend most of their time in other products and expect yours to work the same way (Jakob's law).

**9. Primitives.** Are dialogs, popovers, menus, and toasts built on the project's existing accessible primitives (or native `<dialog>`/popover), or hand-rolled `div`s with manual focus handling?

## How to fix

1. **Read DESIGN.md's Design System in full.** It is the source of truth. If it lacks a category (radii, shadows, motion, icons), derive the dominant existing convention from the code and add it to DESIGN.md before changing components.
2. **Inventory values** across the target and its neighbors. Search for:
   - colors: hex, rgb, hsl, oklch, and color utility classes;
   - spacing: margin, padding, gap values;
   - radii, shadows, borders, z-index, durations, easings;
   - font sizes, weights, line-heights;
   - icon imports (which libraries, sizes, stroke widths);
   - button, input, card, badge, and modal implementations.
3. **Classify each drift:**
   - **missing token:** the value repeats ≥ 3 times with one intent; add a token;
   - **off-scale value:** snap to the nearest token;
   - **duplicate component:** two implementations of the same concept; keep one;
   - **intentional variant:** different intent; keep it and name it.
4. **Unify tokens** to these targets (adjust if DESIGN.md says otherwise):
   - spacing: one 4px-base scale (4, 8, 12, 16, 24, 32, 48, 64, 96), favoring 8px multiples; values larger than the scale round to multiples of 10 (or 5), never odd one-offs;
   - radii: 3–4 values max (e.g. 4px inputs/chips, 8px buttons, 12–16px cards/dialogs, full for pills/avatars); one small-component radius (e.g. 8–10px) used for every button, input, and chip; nested radius: inner = outer − gap (pills exempt);
   - shadows: 2–3 elevation levels, same light direction and color family;
   - borders: one hairline width (1px) and 1–2 border colors;
   - z-index: named layers (base, dropdown, sticky, overlay, modal, toast);
   - motion: 2–3 durations and 1–2 easings, defined once as tokens (see animate) and reused everywhere; never fork a new curve per component.
5. **Unify components:** one Button with variants (primary, secondary, ghost, danger) and sizes (sm, md, lg), not separate ad-hoc buttons. Same for inputs, cards, badges, and dialogs. Every variant has all states: default, hover, focus-visible, active, disabled, loading.
6. **Prefer existing primitives:** migrate hand-rolled dialogs, popovers, menus, and toasts to the project's accessible primitives (or native `<dialog>`/popover) instead of duplicating focus and dismissal logic.
7. **Keep familiar patterns familiar:** same-looking controls get the same behavior and placement everywhere; break a known pattern only with evidence (a test or research) that the new one is better, and record it in DESIGN.md.
8. **Unify icons:** one library, one stroke width (e.g. 1.5px or 2px), one size grid (16/20/24px), same optical alignment with text. Replace emoji and Unicode glyphs used as icons.
9. **Unify copy:** one term per concept, one capitalization style (sentence case recommended for UI), consistent verb + object on buttons, consistent date, number, and currency formats.
10. **Migrate every instance** to the shared token or component, then delete the old implementations and dead CSS.
11. **Bend the system intentionally, never accidentally.** The Design System is a shared language; a deliberate exception gets a name and a reason in DESIGN.md, otherwise it's drift.
12. **Update DESIGN.md:** new tokens with their role, component variants with when to use each, and a short terminology list.

## Rules
- [ ] Zero raw color values in components; all through semantic tokens.
- [ ] All spacing, radius, shadow, and duration values are tokens from DESIGN.md.
- [ ] ≤ 4 radii, ≤ 3 shadow levels, ≤ 3 durations in use.
- [ ] One implementation per component concept; variants are props, not copies.
- [ ] Every component variant has default, hover, focus-visible, active, disabled, and loading states.
- [ ] One icon library, one stroke width, one fill style, sizes on the 16/20/24 grid; no emoji or glyphs as icons.
- [ ] One small-component radius everywhere; nested corners follow inner = outer − gap (pills exempt).
- [ ] The same action has the same label, icon, and style everywhere; nav CTA label matches the hero CTA.
- [ ] One capitalization style across headings, buttons, and labels.
- [ ] Same-looking things behave the same and sit in the same place; any broken familiar pattern has recorded evidence.
- [ ] One set of easing and duration tokens; no per-component curves.
- [ ] Dialogs, popovers, menus, and toasts use the project's accessible primitives, not hand-rolled divs.
- [ ] DESIGN.md matches what the code now does.

## Avoid
- Creating a token for a value used once; premature abstraction is worse than duplication.
- Merging components that look alike but serve different intents.
- Inventing a new visual direction while "unifying".
- Mixing icon libraries or outline and filled icons in the same area.
- Leaving old components in place "for compatibility" with no migration.
- Renaming tokens to framework defaults when the project already has names.
- Hand-rolling a dialog, menu, or toast when the project already ships an accessible one.

## Verify in the Capture Matrix
- Capture two or three screens that share components in light/dark × desktop/mobile and place them side by side. The same component must look identical in every matching cell.
- **Dark:** every token has a dark value; drift often hides in hard-coded light-only colors.
- **Mobile:** size variants (sm/md/lg) and touch targets stay consistent.
- Consistency should rise with no visual regression in neighboring screens.
