# Distill

Distill is about removing the obstacles between a Persona and their goal. Simplicity is not emptiness: every element on screen must justify its place, and anything that does not is noise the user has to read past. When two solutions both work, ship the simpler one (Occam's razor).

**Raises:** Hierarchy & clarity, Persona fit.
**Skip it when:** the target is sparse and the problem is flatness (use bolder) or missing information (use clarify or harden). For intensity problems without excess elements, use quieter. Never remove features the Personas need. This lens also covers "simplify".

## What a designer looks at

Open the Capture and look before touching code. Then walk the primary task. Run these checks.

**1. Name the one goal.**
- From DESIGN.md, what is the Persona here to do? Can you say this screen's goal in one sentence? If you can't, the screen is trying to do too much.
- Look at the screenshot for 3 seconds. Is the action that serves that goal the most obvious thing? If the critique flagged high cognitive load or an unclear primary action, start here.

**2. Count the actions.**
- How many buttons look primary (filled, accent-colored)? More than one means the user must choose before they can act.
- How many secondary actions compete beside it? More than 2–3 visible is clutter.
- How many options in each choice (selects, radios, tabs)? More than 5–7 visible needs search or grouping; every extra option slows the decision (Hick's law).

**3. Inventory every element and ask "what if this were gone?"**
- Point at each element and tag it: essential (needed for the goal), supporting (needed sometimes), redundant (said elsewhere), decorative (no function).
- Hunt what the UI already implies: labels that restate the obvious, duplicate KPIs, a second search bar, dead or placeholder cards, unneeded arrows, strokes, and dividers.
- If removing it changes nothing for the Persona, it is decorative or redundant. If they would need it only sometimes, it can move behind disclosure.
- Look at the sidebar: is its content used on most visits? Settings and options shown all at once?
- Does every card show its full action row? Does a flyout or submenu open to only 1–2 items?
- Pricing: more than 3–4 plans? On mobile, is one screen trying to do more than one thing?

**4. Count the containers.**
- How many boxes, borders, shadows, and background fills are there? Are any cards wrappers that only add a border? Any card inside a card?
- Does each border, shadow, or background mark hierarchy or state? If not, it is decoration.

**5. Count the visual system.**
- How many colors? 5+ means the accent has lost its meaning.
- How many font families (3+ is too many), sizes, weights, radii, spacing values?

**6. Count the steps.**
- Walk the primary task and count clicks, screens, and questions. Can two steps merge? Can a step be inferred? Can a question become a smart default?
- Does any edit open a modal where inline editing would do?
- Which questions could the system answer itself? Some complexity can't be removed, only moved (Tesler's law): asking for country, currency, timezone, a city the postcode implies, or a file type the system can detect pushes it onto the user.

**7. Measure the copy.**
- Is there long copy no one will read? Would half the words say the same thing?
- Does a heading restate the intro below it? Is any information repeated elsewhere on the screen?

**8. Check you are not over-cutting.** Is this a genuinely complex domain where the Persona needs density? Would cutting hide critical information behind hover or clicks, or leave icon-only controls and unlabeled inputs?

Write the screen's ONE goal in one sentence before editing.

## How to fix

1. **Read DESIGN.md**: the Product's core purpose for this target and the Personas' primary task.
2. **Remove decorative and redundant elements first,** including anything the UI already implies: redundant labels, duplicate KPIs or search bars, dead/placeholder cards, and arrows, strokes, or dividers that spacing already handles. Cut pricing to ≤ 3–4 plans.
3. **Reduce the action set:**
   - exactly one primary action per view;
   - ≤ 2–3 secondary actions visible;
   - everything else in an overflow menu, a settings page, or progressive disclosure (`<details>`, "Advanced" sections, step-through flows);
   - use a spectrum of explicitness: primary actions always visible; secondary on hover (with a touch/keyboard path), in popovers, or a triple-dot menu; collapse cluttered per-card actions into one overflow menu.
4. **Flatten structure:**
   - remove wrapper cards that only add borders; use spacing and headings;
   - never nest cards;
   - move sidebar content inline or behind disclosure if it is not used on most visits;
   - prefer one linear column for forms and reading;
   - replace sparse flyouts (1–2 items) with inline controls or a popover/modal that holds real content;
   - one mobile screen does one thing; split multi-purpose mobile screens.
5. **Simplify the visual system on this target** using DESIGN.md tokens:
   - 1 accent + neutrals + semantic colors;
   - 1 family (2 at most), 3–5 sizes, 2–3 weights;
   - one spacing scale; one radius per component type;
   - remove borders, shadows, and backgrounds that do not mark hierarchy or state.
6. **Simplify interaction:**
   - smart defaults instead of questions;
   - move unavoidable complexity into the system, not the user (Tesler's law): infer from context (locale, currency, timezone, city from postcode), prefill from data already known, auto-detect formats and file types; never cut a choice the Persona needs just so the screen looks simpler;
   - inline editing instead of modal flows;
   - remove steps (merge them, or infer them);
   - fewer options in choices (≤ 5–7 visible; search or group beyond that).
7. **Simplify copy:** cut each paragraph by roughly half; active voice; no headings that restate intros; essential information only.
8. **Simplify code:** delete dead CSS, unused components and variants, and orphaned files the cuts left behind.
9. **Record what moved:** note what was removed or moved and where it is now reachable, so nothing a Persona needs is lost. Update DESIGN.md if a component variant or pattern was retired.

## Rules
- [ ] The screen's one goal is stated and the primary action serves it.
- [ ] Exactly one primary-styled action per view; ≤ 2–3 secondary actions visible.
- [ ] ≤ 5–7 visible options per choice; search or group beyond that.
- [ ] No duplicate KPIs, search bars, or placeholder cards; ≤ 3–4 pricing plans.
- [ ] Per-card secondary actions live in an overflow menu; no flyout with only 1–2 items.
- [ ] Each mobile screen does one thing.
- [ ] No question asks for what the system can infer, prefill, or detect.
- [ ] Element count visibly lower than before; every remaining element is essential or supporting.
- [ ] No nested cards; no containers that exist only for decoration.
- [ ] ≤ 1 accent hue, ≤ 2 families, ≤ 5 type sizes (3–5), 2–3 weights on the target.
- [ ] Every removed feature is either truly unused or reachable elsewhere.
- [ ] Copy says each idea once.
- [ ] Dead code from the removed elements is deleted.

## Avoid
- Removing functionality Personas rely on.
- Hiding critical information behind hover or clicks; only secondary actions go behind disclosure.
- Minimalism that becomes mystery: icon-only controls with no labels, unlabeled inputs.
- Flattening hierarchy so everything has equal weight.
- Over-simplifying genuinely complex domains; match complexity to the task.
- Removing labels, ARIA attributes, or focus states in the name of cleanliness.

## Verify in the Capture Matrix
- Compare before/after Captures in light/dark × desktop/mobile; count elements and actions per viewport.
- **Mobile light/dark:** the primary action is visible in the first viewport; disclosure controls are ≥ 44px tap targets.
- **Desktop and mobile dark:** with fewer borders and backgrounds, groups must still separate (check surface lightness steps).
- Walk the primary task end to end; it should take the same or fewer steps. Hierarchy & clarity and Persona fit should rise with no loss of completeness.
