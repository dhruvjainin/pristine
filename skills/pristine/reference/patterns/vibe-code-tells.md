# Pattern: vibe-code tells

Signals that a UI was generated and shipped without a designer's eye. Each one costs trust with any Persona who has seen a hundred AI-built apps. Critique names every tell it finds; Polish removes them. They complement the bans in [../craft-floor.md](../craft-floor.md).

| Tell | Why it hurts | Fix | Lens |
|---|---|---|---|
| Emojis as icons (🚀 ✨ 📊) | Cheap, inconsistent sizing and color across OSes | One SVG library (Lucide, Phosphor, Heroicons), one stroke weight | consistency |
| Icon in a rounded or tinted square above each feature heading, where the icon only pictures the heading's noun (shield = "Safe", layers = "Batch") | The icon row becomes the section's loudest element and says nothing; reads as generated on sight | Test: swap the icons between items. If nothing reads wrong, they're decoration: remove them, or replace each with a product artifact (snippet, output, real number) | distill |
| AI-picked bright, saturated colors on everything | No hierarchy; color stops meaning anything | Neutral foundation, one accent, semantic colors only for status | decolorize |
| Gradient letter-avatars | Instantly reads as generated | Real image, or neutral initials on a subtle tinted surface | decolorize |
| The same KPI shown 2–3 times | Wastes the most valuable space; implies no one checked | Show each number once, where it's most useful | distill |
| Duplicate search bars / duplicate nav | Confuses which one to use | Keep the one with the right scope | distill |
| Workspace or org switcher buried inside the bottom-left personal account menu | Breaks scope hierarchy: workspace switching governs everything in the sidebar and gets lost inside personal settings | Anchor the workspace switcher top-left beside the primary creation action; isolate personal account tasks at bottom-left ([app-shell](app-shell.md)) | layout |
| Opaque "More" accordion hiding sibling top-level navigation items | Forces hunting and prevents spatial muscle memory | Replace with small, flat named groups (~3–4 items each) ordered by daily frequency ([app-shell](app-shell.md)) | distill |
| Unbounded sidebar recents list pushing core navigation or footer controls below the fold | High-churn items bury stable navigation and utilities | Cap recents (~5 items) with an explicit "Show N more" / "Show fewer" toggle ([app-shell](app-shell.md)) | layout |
| Command palette (`⌘K`) that only filters static page names, hides behind an undocumented shortcut, or duplicates actions across sections | Violates mental model when live workspace content isn't searchable, or goes undiscovered | Expose a visible `Search` trigger with `⌘K`/`Ctrl K`, query live workspace entities + synonyms, deduplicate sections, and offer one-click recovery on zero matches ([app-shell](app-shell.md)) | clarify |
| Generic "Navigation" mobile drawer title, or a sub-mode (e.g. Settings) back button that dumps users at `/` | Loses orientation and forces re-navigation | Title the drawer for the active workspace or mode; return from sub-modes to the exact prior route with a contextual label ([app-shell](app-shell.md)) | clarify |
| Bright focus ring painted around a non-interactive `<h1>` on initial route load | Reads as a stray visual artifact on every navigation | Suppress visual focus outlines on programmatic route-announcement targets (`h1[tabindex="-1"]`) while keeping `:focus-visible` rings on interactive controls ([craft-floor](../craft-floor.md#states)) | polish-details |
| Tall all-green readiness or preflight checklist pushing the primary "Run" / "Use" CTA below the fold | Makes the main action disappear behind diagnostics that need no action | Collapse passing checklists into one calm status line with a `"View checklist"` toggle; expand automatically only on failure ([dashboards](dashboards.md#structure)) | distill |
| Internal architecture or schema jargon in UI copy (`row`, `sponsor`, protocol acronyms, `allowlist`), or adjacent features colliding on one noun (calling integrations `"Your apps"` beside user-built `"Apps"`) | Leaks engineering internals and confuses which feature a surface belongs to | Use plain mental-model words with 1-line disambiguators on subtle menu options, and enforce strict 1-to-1 naming across headings, tabs, buttons, placeholders, and empty states ([clarify](../lenses/clarify.md)) | clarify |
| Disabled switches shown in a visually "checked / ON" state when their prerequisite integration isn't connected | Looks active while refusing clicks, causing instant confusion | Replace inert controls with a single-step setup prompt until the prerequisite is connected ([forms](forms.md#4-pick-the-right-control)) | clarify |
| Empty trailing action `<th>` header, raw UUID exposed when a record title is blank, or un-capped mobile table cells pushing sibling columns off-screen | Fails accessibility checks (`empty-table-header`), leaks storage keys, and breaks narrow viewports | Add `sr-only` `"Actions"` header text, fall back to a readable placeholder when blank, and cap flexible cells responsively on small viewports ([dashboards](dashboards.md#tables)) | harden |
| Model picker hiding billing source/cost, or a paused feature that doesn't say which limit was hit or where to raise it | Forces users to guess billing impact and hunt through settings to unblock themselves | Show billing source and relative cost/capability inside the picker; name the exact limit hit and link straight to where it can be raised ([dashboards](dashboards.md#feedback)) | clarify |
| Dead cards ("Coming soon", empty decorative charts) | Promises that break on click | Remove, or replace with a real empty state | distill |
| Cluttered card actions (3–4 buttons per card) | Every card shouts; nothing is primary | One primary action plus an overflow menu | distill |
| Sparse flyouts (1–2 items) | Extra click for nothing | Inline the actions, or use a proper menu/modal | layout |
| Menu, popover, or card items copied from other products without a job here (the email under the name in an account menu, a Help item beside a visible Help icon) | The part survives but its reason doesn't; the Persona reads past items that answer nothing | Purpose test ([distill](../lenses/distill.md) check 3): name the question each item answers for this Persona on this surface. No answer, or the answer is already visible or one click away: cut it, and fill the space with the Persona's own tasks | distill |
| A chevron that points away from where its menu opens (a down arrow on a bottom-of-screen account button whose menu opens upward) | The signal and the result disagree. P2 only; doesn't count toward critique's three-tell cap | Point the chevron toward where the menu opens, or use a neutral up-down chevron | polish-details |
| Three dropdowns (day, month, year) for a near date | The user must work out which date "this Friday" is; the system pushed its work onto them | A calendar grid with weekday headers that also accepts a typed date ([forms](forms.md#4-pick-the-right-control)) | distill |
| Entity names (project, owner, assignee, customer) shown as plain text; pages reach each other only through the sidebar | Each feature was built as its own page and never wired to the others; a quick question costs several clicks and loses the current page | Link every entity name to its detail page, with a hover preview card ([dashboards](dashboards.md#linked-entities)) | layout |
| Too many pricing plans | Choice paralysis | ≤3–4 plans with one recommended | distill |
| Hype copy ("Supercharge your workflow") | Says nothing; reads as filler | What it does → how it helps, in specific terms | clarify |
| Icons with mixed styles or stroke weights | Feels assembled from parts | One library, one weight, one size grid | consistency |
| Every element has the same radius, shadow, and hover-lift | Flat sameness; nothing is primary | Reserve elevation and motion for what's interactive and important | quieter |
| Nested cards (padding on padding) | Wasted space, muddy hierarchy | One surface; group inside with spacing | layout |
| Rounded-top bar charts with no axes, smoothed lines | Pretty but unreadable data | Axes, gridlines, labels, real values | polish-details |
| 60-30-10 color applied to a product UI | Far too much color for an app | Product UI runs ~90% neutral / 8% secondary / 2% accent | decolorize |
| Infinite scroll on a page with a footer | Footer unreachable | Pagination or "Load more" | layout |
| Welcome modal or slides that explain the product (a 6-bullet list, "Next" through 4 slides) | Skipped instantly; explaining the product doesn't help anyone use it | Ask 2–3 questions, then build the first real object with the user ([onboarding](onboarding.md#setup-steps)); sequenced contextual tips after that | clarify |
| Everything animates: command palette, every hover, fade-up on every section, `transition: all` | Feels slow; motion stops meaning anything | Animate only by purpose and frequency; never keyboard-triggered actions | animate |
| Popovers that pop from `scale(0)` or the center, with `ease-in` | Feels detached and sluggish | Grow from the trigger at `scale(0.95)`, `--ease-out`, `--dur-medium` or shorter | animate |
| Results blurred behind "Sign up to see your report" | Feels like a ransom; visitors leave | Show a useful partial result, then "Save your report" | clarify |
| Guilt-trip dismiss copy ("I'll risk it"), fake countdowns | Reads as manipulation; trust drops | Neutral "Not now", real deadlines only | clarify |
| Signup form with email, password, confirm password, name, company | Each field drops completion | SSO + email only; ask the rest later | distill |
| Demo data only ("Jane Doe", 12 members) | Breaks on the first real customer | Test with worst-case data | harden |

## How to check

1. Run `node <skill dir>/scripts/detect.mjs <paths>` (catches emoji icons, gradient text, slop gradients, and some others).
2. Look at the Capture for the visual tells the detector can't see: duplicate KPIs, dead cards, cluttered actions, avatar style, color overuse.
3. In a Critique, list each tell as a finding under Consistency, Hierarchy & clarity, or Color & theming, with its fix.
