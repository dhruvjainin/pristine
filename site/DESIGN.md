# DESIGN.md: Pristine (site)

## Product
- **What it is:** The landing site for Pristine, an agent skill that critiques, designs, and polishes web UI toward a 10/10.
- **Why it's different:** It proves itself. Every claim is backed by a real before/after built with the skill, live and inspectable, with the score and the exact changes.
- **Surfaces:** home (Persuade), example detail pages (Read), live demo pages (Experience: the demos themselves).
- **Success looks like:** a visitor sees one before and after side by side, believes the difference, copies the install command.
- **Constraints:** Pristine default standard (WCAG 2.2 AA; evergreen browsers; static export, readable with JS off; reduced motion respected; LCP < 2.5s on mobile; no new fonts/deps without approval). Exceptions: none. Fonts approved: Fraunces, Inter, JetBrains Mono (self-hosted). Deploy: Cloudflare Pages, static `dist/`.

## Personas
### Maya: design engineer (primary)
- **Context:** desktop, between tasks, uses Claude Code or Copilot daily; has seen a hundred AI-built UIs.
- **Job:** decide in under a minute whether this skill makes her agent's UI output better than her own prompt does.
- **Expertise:** expert in CSS, a11y, and motion; allergic to hype.
- **Must feel in 5 seconds:** "This is made by someone with taste, and the proof is right here."
- **Deal-breakers:** purple gradients, fake metrics, vague claims, a site that itself looks AI-generated.
- **Delighted by:** real code, honest scores, details like focus rings and dark mode done right.

### Arjun: indie founder
- **Context:** mobile or laptop, shipping a SaaS alone with an agent.
- **Job:** make his product look professional without hiring a designer.
- **Expertise:** strong developer, no design training.
- **Must feel in 5 seconds:** "I can install this in one line and my app will stop looking like a template."
- **Deal-breakers:** setup friction, jargon he can't act on.

## Brand
- **Personality:** exacting, warm, candid.
- **Voice:** a senior designer marking up your work in red pen: specific, a little dry, never cruel, never hype. Numbers are real.
- **Admired references:** printed proof sheets, editorial magazines, good code review.
- **Anti-references:** AI-tool landing pages with glowing gradients and "Supercharge your workflow".

## Design System
### Color
| Token | Light | Dark | Use |
|---|---|---|---|
| --paper | #F5F0E6 | #14120F | page background |
| --surface | #FBF8F1 | #1C1915 | cards, frames |
| --surface-2 | #EFE8DA | #24201B | wells, code blocks |
| --ink | #1B1916 | #EEE8DC | primary text, primary buttons |
| --ink-2 | #58524A | #A79F90 | secondary text |
| --ink-3 | #6F685D | #8F877A | tertiary, captions; ≥ 4.5:1 on paper, surface and surface-2 |
| --rule | #DCD3C3 | #332E27 | hairlines, borders |
| --pen | #C2341C | #EE6A50 | critique marks and "before" scores only |
| --ok | #1E6B57 | #5BBE9E | "after" scores and approval only |
| --mark / --on-mark | #F6DC7A / #1B1916 | #5C4B12 / #FBECB4 | highlighter: the subcommand in a command line only |
Rules: red pen and green are reserved for critique and approval; never decorative, and never the brand (the wordmark, logo and "Pristine" in headlines are ink). Primary actions are ink, not color. Every text token, including `--ink-3`, passes 4.5:1 at any size.

### Typography
- Families: display Fraunces Variable (opsz, soft), body Inter Variable, mono JetBrains Mono Variable (commands, labels, scores). Loading: @fontsource, `font-display: swap`.
- Scale (px): 13 / 15 / 17 / 20 / 26 / 36 / 52 / 80. Body 17/1.6, measure ≤ 68ch. Display line-height 1.02–1.1, tracking −0.02em.
- Numbers: `font-variant-numeric: tabular-nums` on scores.

### Spacing & Layout
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Container 1200px, gutters 24px (mobile 20px). Breakpoints 640 / 960 / 1200.

### Shape & Elevation
- Radii: 6 (controls), 12 (frames). Shadows: one soft paper shadow for frames; no glows.
- Control height: `--control-h` 48px for buttons and copy boxes in page content, so a row of them lines up. The header's compact controls are 40px.
- Borders: 1px `--rule` hairlines.

### Motion
- Durations: 120ms press, 180ms hover/state, 240ms reveals; scores count over 400ms.
- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- Reduced motion: no movement; opacity fades only; scores jump.

### Components
- Button: primary (ink), secondary (outline), copy-command (mono, with copied state).
- Compare: before and after side by side as full-page shots in scroll frames that scroll together; desktop/mobile and light/dark toggles.
- Scorecard: before → after per Dimension, pen/ok colors.
- Icon set: inline SVG, 1.5px stroke.
- Dark mode: `prefers-color-scheme` plus a toggle that sets `data-theme` on `<html>`.

## Do / Don't
- Do: show real artifacts, real scores, real diffs.
- Don't: gradients, glow, emoji icons, invented testimonials or user counts.
