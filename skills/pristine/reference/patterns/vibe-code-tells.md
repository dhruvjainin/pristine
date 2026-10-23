# Pattern: vibe-code tells

Signals that a UI was generated and shipped without a designer's eye. Each one costs trust with any Persona who has seen a hundred AI-built apps. Critique names every tell it finds; Polish removes them. They complement the bans in [../craft-floor.md](../craft-floor.md).

| Tell | Why it hurts | Fix | Lens |
|---|---|---|---|
| Emojis as icons (🚀 ✨ 📊) | Cheap, inconsistent sizing and color across OSes | One SVG library (Lucide, Phosphor, Heroicons), one stroke weight | consistency |
| AI-picked bright, saturated colors on everything | No hierarchy; color stops meaning anything | Neutral foundation, one accent, semantic colors only for status | decolorize |
| Gradient letter-avatars | Instantly reads as generated | Real image, or neutral initials on a subtle tinted surface | decolorize |
| The same KPI shown 2–3 times | Wastes the most valuable space; implies no one checked | Show each number once, where it's most useful | distill |
| Duplicate search bars / duplicate nav | Confuses which one to use | Keep the one with the right scope | distill |
| Dead cards ("Coming soon", empty decorative charts) | Promises that break on click | Remove, or replace with a real empty state | distill |
| Cluttered card actions (3–4 buttons per card) | Every card shouts; nothing is primary | One primary action plus an overflow menu | distill |
| Sparse flyouts (1–2 items) | Extra click for nothing | Inline the actions, or use a proper menu/modal | layout |
| Too many pricing plans | Choice paralysis | ≤3–4 plans with one recommended | distill |
| Hype copy ("Supercharge your workflow") | Says nothing; reads as filler | What it does → how it helps, in specific terms | clarify |
| Icons with mixed styles or stroke weights | Feels assembled from parts | One library, one weight, one size grid | consistency |
| Every element has the same radius, shadow, and hover-lift | Flat sameness; nothing is primary | Reserve elevation and motion for what's interactive and important | quieter |
| Nested cards (padding on padding) | Wasted space, muddy hierarchy | One surface; group inside with spacing | layout |
| Rounded-top bar charts with no axes, smoothed lines | Pretty but unreadable data | Axes, gridlines, labels, real values | polish-details |
| 60-30-10 color applied to a product UI | Far too much color for an app | Product UI runs ~90% neutral / 8% secondary / 2% accent | decolorize |
| Infinite scroll on a page with a footer | Footer unreachable | Pagination or "Load more" | layout |
| Modal with a 6-bullet onboarding list | Skipped instantly | Sequenced contextual tips | clarify |
| Everything animates: command palette, every hover, fade-up on every section, `transition: all` | Feels slow; motion stops meaning anything | Animate only by purpose and frequency; never keyboard-triggered actions | animate |
| Popovers that pop from `scale(0)` or the center, with `ease-in` | Feels detached and sluggish | Grow from the trigger at `scale(0.95)`, ease-out, under 250ms | animate |
| Results blurred behind "Sign up to see your report" | Feels like a ransom; visitors leave | Show a useful partial result, then "Save your report" | clarify |
| Guilt-trip dismiss copy ("I'll risk it"), fake countdowns | Reads as manipulation; trust drops | Neutral "Not now", real deadlines only | clarify |
| Signup form with email, password, confirm password, name, company | Each field drops completion | SSO + email only; ask the rest later | distill |
| Demo data only ("Jane Doe", 12 members) | Breaks on the first real customer | Test with worst-case data | harden |

## How to check

1. Run `node <skill dir>/scripts/detect.mjs <paths>` (catches emoji icons, gradient text, slop gradients, and some others).
2. Look at the Capture for the visual tells the detector can't see: duplicate KPIs, dead cards, cluttered actions, avatar style, color overuse.
3. In a Critique, list each tell as a finding under Consistency, Hierarchy & clarity, or Color & theming, with its fix.
