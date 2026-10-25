# Pattern: landing and marketing pages

Use for **Persuade** surfaces: landing, home, pricing, product, feature, and campaign pages. The goal is to earn attention, belief, and action, and to look like *this* product rather than a template.

## The four levels

Place the page on this ladder before scoring. It anchors the Persona fit and Hierarchy scores.

| Level | Looks like |
|---|---|
| **2/10: template** | Centered badge + giant headline + two buttons + logo strip + 3 identical feature cards; stock or AI imagery; hype copy; nothing says what the product actually does |
| **6/10: clean** | Real structure and spacing, readable copy, one real screenshot. Correct but forgettable: could be any SaaS |
| **8/10: considered** | Real product visuals cropped to the important part; clear nav hierarchy; social proof; sections designed around the product's story; motion that explains |
| **10/10: memorable** | Everything at 8, plus one well-built idea that only fits this product (e.g. the hero scroll-morphs into the real dashboard); personality in the hidden places (hover, 404, empty states) |

## Hero

- In 5 seconds a first-timer knows **what it is, who it's for, and what to do next**.
- A stacked hero (headline, subhead, CTA, then a large product visual) is a safe, strong default; deviate when the product's story needs it.
- Show the real product. Crop to the part that sells it rather than a full, unreadable screenshot. Stock photos and generic 3D illustrations are not product visuals.
- A subtle, single-hue background gradient or line grid is fine; it supports, never leads.

## Navigation

- Logo left, links center or left, CTA right. The primary nav CTA uses **the same label** as the hero CTA ("Start free" in both places, not "Get started" vs "Sign up").
- Secondary nav action (Log in) is visibly quieter than the primary.
- Large sites: mega menus with grouped links, short descriptions, and optionally an image or featured item.

## Sections that work

- **Logo social proof** right after the hero; most top software sites do this. Real logos only, monochrome, evenly sized by optical weight.
- **Bento grids** to show several features at once: varied tile sizes ranked by importance, each tile showing the feature, not an icon and two lines.
- **Clickable multi-section** (tabs or steps that swap a product visual): design every tab's state, not only the first.
- **Testimonials** with real names, roles, photos, and specific outcomes.
- **Pricing**: ≤3–4 plans; mark the recommended plan and order plans so it reads as the reasonable choice (the first price seen sets the ruler); show add-ons beside what they protect, never alone; price large, plan name small; show the annual discount; each plan states what it adds over the previous one; highlight one recommended plan.
- **Final CTA** repeating the hero action.
- **Footer** reachable (no infinite scroll above it).

## Copy

- Short and punchy. Move from **what it does** to **how it helps you**: "Track every invoice" → "Get paid two weeks faster".
- Friendly and specific, not corporate. Avoid "corporate AI mush": empower, seamless, unlock, supercharge, revolutionize, next-gen, all-in-one.
- Every claim is true and sourced from DESIGN.md or the user. Never invent numbers or testimonials.

## Captivating sections

Captivating = **structure first, then purposeful motion, then one well-built surprise.**

- Motion should showcase the product (a UI that assembles, a workflow that plays), not decorate.
- Playful context elements (cards, avatars, product fragments) around a centered message, trailing off and fading toward the edges, with subtle parallax.
- Entrance motion for decorative elements, staggered; never the same fade-up on every section.
- Scrolljacking almost never.
- Personality lives in hidden places too: hover states, the 404 page, empty states, success screens.

## Mobile

Re-compose for 390px; don't just stack. The hero visual still shows the product, crop it tighter. Nav collapses to a menu with the CTA still visible.

## Interactive product demos

- Inventory the visible demo navigation from the rendered sidebar, tabs and menus, not from the screens already implemented. Visit 100% of those destinations at 390px and 1440px in both themes before scoring the whole demo.
- Every destination has a non-empty page title and meaningful content or an intentional empty state with a next action. A blank panel fails even if its composer and navigation still work.
- From every secondary page, switch the top-level example. The selected example, title and body must all change together. One owner controls the selected page; a stale local selection must not override it.
- Suggested tasks and typed requests use the same entry path. Click a suggestion and verify the destination, exact draft, focus and send state. A prefilled but permanently disabled composer is a broken action.
- Navigation starts new pages at the top without resetting user edits. Keep manual scroll position only when returning to the same view by an explicit back action.
- On narrow screens, page-specific actions move to a second header row before either the title or action label clips. Verify each action's full label and focus ring at 390px.
- Separate blocked live services from editable presentation work. Report a live-service blocker, but finish the independent demo screens. Do not award a requested score to an uncaptured state or use the blocker to excuse unrelated gaps.
