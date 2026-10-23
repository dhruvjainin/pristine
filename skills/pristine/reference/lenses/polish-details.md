# Polish details

Polish is the final pass where a designer hunts the small defects that make a product feel unfinished: edges a few pixels off, a missing hover, a focus ring that vanishes on one background. Refine, never redesign; preserve the visual direction, content, behavior, and everything outside scope.

**Raises:** All Dimensions (Persona fit, Hierarchy & clarity, Layout & spacing, Typography, Color & theming, Consistency, Responsiveness, Motion & interaction, Accessibility, Copy, Robustness & performance).
**Skip it when:** the concept, hierarchy, or layout is wrong; detail work cannot rescue a wrong structure. Name the real problem in the Critique and apply bolder, layout, or distill instead. Use it only when structure, direction, and copy are already right. Never smuggle a redesign into this pass.

## What a designer looks at

Walk the full path the Persona takes (arrive → act → result → recover) with mouse, keyboard, and touch. Capture each state, then inspect closely.

**1. Zoom the screenshot to 200% and inspect edges.**
- Do shared left edges align to the pixel? Are baselines aligned in rows that mix text sizes?
- Are icons optically centered with adjacent text, or 1px high/low? Is the icon + label gap the same everywhere (6–8px)?
- Does any text touch a container edge? Is there more space above headings than below?

**2. Compare siblings.**
- Put similar components side by side (buttons, cards, inputs). Is internal padding identical? Is every value on the spacing scale?
- Is there one radius per component type? Do nested corners look concentric, or does the inner corner bulge?
- Are borders the same 1px hairline and dividers the same color? Do shadows share one light direction? Any border + large shadow combos?
- Are icons from one set with one stroke width? Do ambiguous icons have a tooltip?

**3. Hover every control, then tab through every control.**
- Does every control react on hover, focus-visible, and active? Is any hover effect missing, or showing on a disabled control?
- Is the focus ring visible on *every* background, including colored, image, and dark surfaces? Does it appear on mouse click (it should only show on `:focus-visible`)? Has `outline` been removed with nothing in its place?

**4. Check every state.**
- For each control: default, hover, focus-visible, active, disabled, loading, and where relevant selected, error, success. Which are missing?
- Is disabled the *only* signal of why an action is unavailable?
- Click a button that loads: does it change width, allow a second submit, or lose its label?
- Does the page show loading, empty, error, success, disabled, and permission states, or are some missing?

**5. Look at the browser's own surfaces.**
- Select text: is the selection highlight the default blue? Is the caret themed? Do checkboxes and radios use the palette?
- Are scrollbars jarring in dark mode? Is `color-scheme` set?
- Do link underlines collide with descenders? Do aligned number columns wobble because digits are proportional?
- Is there a favicon and a meaningful page `<title>`?

**6. Inspect charts and tables.** Do charts have axes, gridlines, labels, a summary value, a date-range selector, and a hover tooltip? Are bars rounded on top with no axis, or lines smoothed/faded so they misrepresent the data? Do dense tables use alternating row backgrounds?

**7. Read the type closely.** Single orphan words on the last line of headings? Straight quotes and apostrophes instead of real ones? Mixed capitalization? Numbers formatted differently in different places?

**8. Look at layers and overlays.**
- Is a light translucent surface stacked on another translucent surface, so text on it washes out? Is text on glass the same thin gray as on solid surfaces?
- Does a sticky header have a hard 1px divider even when nothing scrolls beneath it, or no edge treatment where content does?
- Does a modal task dim and push back the background? Does a non-blocking side panel wrongly add a scrim that blocks the page?

**9. Hunt the unseen details.** Individually invisible, they compound into "this feels right": do popovers grow from their trigger (`transform-origin`)? Do tooltips after the first open instantly? Does every pressable scale slightly on press? Are changing numbers in `tabular-nums`? Are file names and hashes middle-truncated? Is focus visible and correctly placed?

**10. Watch images load and open the console.** Does any image shift layout, stretch, or crop off the subject? Is alt text useful? Are there console errors, warnings, or stray `console.log` output?

Triage what you found before editing (see step 2 below). Fix tasks and states before pixels. Report details as a **Before / After / Why** table, one row per fix (e.g. `scale(0)` entry | `scale(0.95)` + opacity | nothing appears from nothing), so each change is reviewable on its own.

## How to fix

1. **Read DESIGN.md's Design System.** Every fix uses its tokens; if a needed value is missing, add a token to DESIGN.md rather than hard-coding it (but never create tokens for single exceptions).
2. **Triage and fix in this order:**
   1. broken or blocked tasks, data loss, misleading state, inaccessible paths;
   2. missing states (loading, empty, error, success, disabled, permission);
   3. alignment, spacing, and type inconsistencies;
   4. color, icon, and motion inconsistencies;
   5. code and asset cleanup.
3. **Alignment and spacing:** every element on the spacing scale; similar components share identical padding; shared left edges align to the pixel; baselines align in rows mixing text sizes; icons optically centered with adjacent text (often a 1px nudge); icon + label gap 6–8px; more space above headings than below.
4. **Interactive states for every control:** default, hover, focus-visible, active, disabled, loading, and (where relevant) selected, error, success.
   - focus ring: ≥ 2px, ≥ 3:1 contrast against adjacent colors, `outline-offset: 2px`, visible on every background, only on `:focus-visible`;
   - disabled: reduced emphasis plus `cursor: not-allowed` and no hover effect; never the only way to explain why;
   - loading: button keeps its width; label or spinner inside; double submit prevented.
5. **Pixel details:**
   - one radius per component type; nested radii follow `inner = outer − padding` (pills exempt); optional corner smoothing (squircle) if the Design System uses it;
   - borders 1px (hairline) consistently; dividers use the same color token;
   - shadows share the same light direction; no border + large shadow combos;
   - images with `aspect-ratio`, `object-fit: cover`, correct crop focus, useful `alt`;
   - no text touching container edges (≥ 12px inner padding on small components, ≥ 16px on cards).
6. **Feedback and data details:** tooltips on ambiguous icons; a confirming toast after a modal task completes; alternating row backgrounds on dense tables; charts with axes, gridlines, labels, a summary value, a date-range selector, and a hover tooltip.
7. **Browser surfaces:** `::selection`, `caret-color`, `accent-color` from the palette; `color-scheme` set; scrollbars consistent with the theme; `text-underline-offset` ≈ 0.15em on links; `tabular-nums` on aligned numbers; favicon and page `<title>` present.
8. **Typography details:** no orphan words in headings (`text-wrap: balance`), real quotes and apostrophes, consistent capitalization, numbers formatted consistently.
9. **Layers and overlays:**
   - never stack a light translucent surface on another; put text on translucent surfaces at higher contrast and one weight heavier than on solid ones;
   - under sticky headers, use a soft scroll-edge fade (small gradient or blur mask) instead of a hard 1px divider, only where content actually scrolls beneath;
   - modal tasks get a scrim and push the background back; non-blocking side panels get no scrim.
10. **Unseen details:** apply the check-9 list (trigger-origin popovers, instant follow-up tooltips, press scale, `tabular-nums`, middle truncation, focus) using animate and harden for the specifics.
11. **Cleanup:** remove console errors and warnings, `console.log`, dead CSS, unused imports, duplicated styles, and temporary files. Replace one-off implementations with shared components where the Design System owns the pattern.
12. **Review the diff:** each fix appears as a row in the Before / After / Why table; only intended changes remain.

## Rules
- [ ] Every control has all applicable states, Captured.
- [ ] Focus-visible ring visible on every background in both themes.
- [ ] All spacing, radii, shadows, and colors come from tokens.
- [ ] Similar components have identical internal padding and alignment.
- [ ] Icons from one set, one stroke width, optically aligned.
- [ ] Nested radii are concentric (inner = outer − padding; pills exempt).
- [ ] Every interactive element has hover, press, focus, and disabled states.
- [ ] Ambiguous icons have tooltips; modal completion ends with a toast.
- [ ] Charts have axes, labels, a summary value, and a hover tooltip.
- [ ] No image layout shift; all images have dimensions and alt.
- [ ] Selection, caret, scrollbars, and underlines themed.
- [ ] No console errors; no dead code introduced or left behind.
- [ ] No translucent-on-translucent stacks; text on translucent surfaces passes contrast; scroll-edge treatment only where content scrolls beneath.
- [ ] Modal tasks dim the background; non-blocking panels don't.
- [ ] Every fix reported as a Before / After / Why row.
- [ ] Nothing outside scope changed.

## Avoid
- Redesigning while "polishing".
- Perfecting one corner while other states stay broken.
- Adding animation just to make polish visible.
- Creating tokens for single exceptions.
- Removing `outline` without a visible replacement.
- Rounded-top bars without axes; smoothed or faded lines that misrepresent data.
- Hard dividers under sticky headers where nothing scrolls beneath; scrims behind non-blocking panels.

## Verify in the Capture Matrix
- Re-Capture every state in light/dark × desktop/mobile, plus 768px if the layout changes there.
- **Desktop and mobile dark:** focus rings, borders, dividers, and disabled states are the first things to vanish; check each.
- **Mobile light/dark:** tap targets ≥ 44px, no hover-only affordances, inputs ≥ 16px.
- Zoom one Capture to 200% and inspect edges and alignment. Every Dimension should hold or rise.
