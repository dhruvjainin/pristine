# Decolorize

Decolorize is about making color rare enough to mean something: when every section, tag, and button has its own hue, the primary action no longer stands out and the product feels cheap or templated. The goal is a restrained neutral palette with ONE accent that does real work; restrained is not gray, because neutrals carry a slight brand tint and the single accent gains force from its rarity.

**Raises:** Color & theming, Hierarchy & clarity.
**Skip it when:** the UI is already monochrome and state or hierarchy is unclear (use colorize). Never apply decolorize and colorize to the same target in one Polish. If the issue is overall intensity (weights, motion, shadows) rather than hue count, use quieter.

## What a designer looks at

Open the Capture and look before touching code. Run these checks in order.

**1. Count the colors.** Count every distinct non-semantic hue on one screen. 4+ means too many hues are competing. Check mobile too; it often reveals leftover colored badges and banners.

**2. The squint test.** Blur the screenshot (~8px). Do only the accent and the focal content pop? If colored sections, tags, and icons all pop equally, that is visual noise and weak hierarchy: the accent has been spent on decoration and the primary action no longer stands out.

**3. Find the primary action.** Is it the single most saturated element on the screen? The one thing that differs is the one that gets noticed (von Restorff effect). If a decorative illustration, a tag, or a gradient heading is louder, color hierarchy is inverted.

**4. Classify what you see.** For each color, ask what it is doing: neutral, accent, semantic (success/warning/danger/info), data (charts), or decoration. Decoration is the target of this lens.

**5. Look for the usual offenders:**
- rainbow category tags;
- colored backgrounds on every section;
- gradients on buttons and headings;
- accent on decorative icons, illustrations, or dividers;
- colored icons that convey no status;
- bright saturated colors everywhere and gradient letter-avatars (the auto-generated-palette tell);
- multi-hue gradients and colored or dark heavy shadows.

**6. Check the grays.** Are neutrals mixed warm and cool, or pure untinted gray? Mixed grays look accidental; pure gray reads as unfinished.

**7. The grayscale test.** Convert the Capture to grayscale. Does hierarchy survive on size, weight, and spacing alone? If not, color has been carrying hierarchy, and those cues must be strengthened as color is removed.

**8. Measure the dose.** Estimate the share of the screen per color. Product UI should land near ~90% neutral / ~8% secondary / ~2% accent; 60-30-10 is a marketing ratio and reads loud on a tool.

Write down before editing: **the one accent** and **the list of decoration colors** to delete or map.

## How to fix

1. **Read DESIGN.md.** Identify the one brand accent. If none is declared, pick the color already used for the primary action and confirm it is in DESIGN.md before proceeding.
2. **Inventory every color in the target:** search for hex, rgb, hsl, oklch, named colors, and utility classes like `bg-*`, `text-*`. Classify each as in check 4.
3. **Delete or map decoration colors.** Each one becomes a neutral surface, the accent, or nothing.
4. **Build the neutral ramp:** 9–11 steps from near-white to near-black, all tinted 1–3% chroma toward the brand hue (e.g. OKLCH C 0.005–0.015 at the brand's hue angle). Assign roles: canvas, raised surface, sunken surface, border, border-strong, text-muted, text.
5. **Restrict the accent** to these roles only: primary action, current/selected state, focus ring, links, and at most one highlight per viewport. Accent covers ≤ 10% of the visible surface (product UI: closer to ~2%). Color must carry meaning (action, status, data), never decoration; make icons neutral unless they convey status.
6. **Keep semantic colors,** but desaturate their backgrounds (subtle tints at L 0.95+ in light, L 0.25– in dark) and reserve full strength for icons and text.
7. **Replace colored section backgrounds** with neutral surface steps or spacing. Replace gradients with solid fills; if DESIGN.md keeps a gradient, keep it subtle and within one hue family. Shadows: soft light gray, large blur, low opacity, or none.
   Replace gradient letter-avatars with a neutral fill or a real image.
8. **Replace color-coded category tags** with neutral tags plus an icon or label; if categories must stay colored (e.g. calendars), limit to ≤ 6 hues of equal lightness and chroma.
9. **Charts:** use the accent for the focus series and neutral steps for the rest; keep a categorical palette only when series truly need distinction.
10. **Update DESIGN.md's Design System:** remove dead color tokens, document the neutral ramp and the accent's allowed roles.

## Rules
- [ ] Visible hues per screen: neutrals + 1 accent + semantic states (+ chart palette if needed). Product UI: at most one accent.
- [ ] Icons are neutral unless they convey status.
- [ ] Accent appears only on actions, selection, focus, links, and ≤ 1 highlight per viewport.
- [ ] No gradients, gradient text, or colored section backgrounds remain unless DESIGN.md requires them; any kept gradient stays within one hue family.
- [ ] Neutrals are tinted consistently (same hue angle), not mixed warm and cool grays.
- [ ] Primary action is the single most saturated element on each screen.
- [ ] Body text ≥ 4.5:1, large text and controls ≥ 3:1 in both themes.
- [ ] Hierarchy is carried by size, weight, and spacing now that color does less.
- [ ] No unused color tokens remain in the codebase or DESIGN.md.

## Avoid
- Pure grayscale with no tint; it reads as unfinished.
- Removing semantic color from errors and warnings.
- Muddy mid-gray text (#888-ish) on white to "soften" things; it fails contrast.
- Swapping five loud colors for five pastel ones; that is still five colors.
- Keeping the accent on decorative icons, illustrations, or dividers.
- Applying 60-30-10 to product UI; it over-colors tools and dashboards.
- Replacing semantic red on destructive actions with the brand accent.

## Verify in the Capture Matrix
- **Light:** squint; only the accent and the focal content should pop. Check that tinted neutrals do not look dirty.
- **Dark:** use tinted near-black canvas (L 0.14–0.20), lift surfaces by lightness, and raise accent lightness slightly so it stays visible without increasing chroma.
- **Desktop and mobile:** count hues in each Capture; mobile often reveals leftover colored badges and banners.
- Color & theming and Hierarchy & clarity should rise; Persona fit must not drop (the accent and type should still carry the brand).
