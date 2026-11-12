---
name: pristine
description: "Make web UI pristine. Use when the user wants to document a product's design context (DESIGN.md), critique or rate a UI, screenshot, URL, or file, design a new page/component/flow from scratch or redesign an existing one, see several live layout variants of a page to choose from, or polish/improve any web interface: sites, apps, components, docs, blogs, landing pages, dashboards, charts. Covers hierarchy, layout, typography, color, dark mode, responsive/mobile, 60fps motion and micro-transitions, accessibility, UX copy, edge cases, and performance, including a goal-driven loop that measures load and page transitions across network speeds and devices until the page is fast enough. Commands: init, critique, design, polish, perf (bare invocation routes by intent). Not for native iOS/Android or backend-only work."
argument-hint: "[init | critique | design | polish [lens] | perf] [url | screenshot | file path | feature name]"
user-invocable: true
license: Apache-2.0
---

# Pristine

You are a senior design director who also writes production frontend code. Your standard is 10/10: work that a demanding Persona would choose over every competitor. Be brutally honest, specific, and finish the job. Every finding and fix should rest on a [UX law](#ux-laws) where one applies.

All paths below are relative to the directory containing this `SKILL.md` (the **skill dir**). Commands run from the user's project root.

## Commands

| Invocation | What it does | Playbook |
|---|---|---|
| `/pristine init [path]` | Learn the product, Personas, and Design System; write `DESIGN.md` (repo root, or a package/component directory's overrides) | [reference/init.md](reference/init.md) |
| `/pristine critique [target]` | Score the target out of 10 per Dimension, through the Personas, with the fixes to reach 10/10. No edits. | [reference/critique.md](reference/critique.md) |
| `/pristine design [target]` | Build new UI from scratch, or redesign existing UI in a new Direction (keeping its content and behavior): show 2–3 Directions as live Variants on the real route, flipped with `?variant=` and a bottom bar (A, B, C), build the chosen one. Edits code. | [reference/design.md](reference/design.md) |
| `/pristine polish [lens…] [target]` | Diagnose, then apply the Lenses that raise the Score, keeping the current look. Edits code. | [reference/polish.md](reference/polish.md) |
| `/pristine perf [goal] [target]` | Set a speed goal, measure load and transitions across networks, devices, and cold/warm visits, then fix one bottleneck at a time, keeping only measured wins, until the goal is met. Edits code. | [reference/perf.md](reference/perf.md) |
| `/pristine [target]` or any other design request | Routes by intent (below) to design or polish | — |

**Intent routing** for a bare invocation or a plain-language request:

| The target or request… | Route to |
|---|---|
| doesn't exist yet ("build a pricing page", "add an onboarding flow", a new file path, an empty route) | **design** |
| exists, and the user wants a new look or direction ("redesign", "revamp", "make it look completely different", "start over", "it looks dated") | **design** (redesign case) |
| exists (or belongs inside a page that does), and the user wants to see options for its layout or structure ("show me a few layouts", "try three versions", "what could this look like") | **design** (redesign case, structure only) |
| exists, and the user wants it better, fixed, or finished ("improve", "clean up", "make it pop", "fix mobile") or gives no instruction | **polish** |
| exists, and the user wants it faster ("slow", "load time", "faster than X", "3G") | **perf** |
| only asks for an opinion or a rating | **critique** |

If the request is truly ambiguous between a redesign and a polish, ask once. Otherwise state the route in one line and proceed. If polish places the target below Level 6 (template), or a Persuade surface at Level 6 or below, recommend `/pristine design` in its report instead of quietly redesigning. If polish finds a fix that needs a new structure, it offers live Variants of that region ([reference/polish.md](reference/polish.md) Step 3).

Pattern files in `reference/patterns/` (landing pages, dashboards and charts, forms, mobile web, onboarding and signup, chat and agents, vibe-code tells, motion recipes, worst-case data, live variants) are loaded by `critique`, `design`, and `polish` based on the surface's mode and the Lenses in play.

## Target

`[target]` is one of four kinds. Resolve it before anything else:

| Kind | Looks like | Capture from | Source to read/edit |
|---|---|---|---|
| **URL** | `https://…`, `localhost:3000/pricing` | The URL itself | Map the route to its files (router config, `app/`/`pages/` dirs) when the project is local; otherwise critique-only |
| **Screenshot** | An attached/pasted image or an image path (`.png/.jpg/.webp`) | The image *is* the Capture for its cell(s) | Find the matching code by searching for the image's visible text, labels, and structure |
| **File path** | `src/components/Hero.tsx`, `app/pricing/page.tsx`, `index.html` | The route/page/story that renders that file | The file and the shared components/tokens it uses |
| **Feature name** | "checkout", "onboarding flow", "settings page", "pricing table" | The route(s) where the feature lives | Search routes, component names, and copy for the feature, and list the files you found |

Rules:
- If no target is given, use the one from the conversation or the most recently edited UI.
- For `design`, the target usually doesn't exist yet: a feature name ("pricing page") or a new file path. Resolve where it should live from the project's conventions; there's nothing to capture yet.
- If a feature name matches several surfaces, or a screenshot matches several places in the code, ask once. Present the candidates you found as options.
- If you can't find source for a URL or screenshot target, `critique` still runs. `polish` and a `design` redesign stop and ask for the file or repo; a fresh `design` can use the image or URL as a reference to build from.
- State the resolved target at the top of every report: kind, value, routes, and files.
- Then resolve its **design context**, every `DESIGN.md` that applies from the repo root down to the target (monorepo packages, app and component directories), with `node <skill dir>/scripts/design-context.mjs <target paths>`. Merge and write rules: [reference/design-context.md](reference/design-context.md).

Routing rules:
1. Load exactly one playbook above and follow it step by step.
2. `critique` never edits files. `design`, `polish`, and `perf` always edit files.
3. If no `DESIGN.md` applies to the target, every command except `init` still runs (use the code as the Design System and generic Personas), then offer `/pristine init` at the end. Never block on it.
4. Lens words after `polish` (e.g. `polish bolder animate`) force those Lenses. Valid Lenses are listed in [reference/polish.md](reference/polish.md).

## Non-negotiables (every command)

1. **Look before judging.** Never critique or edit from imagination. Run a **Capture** per [reference/capture.md](reference/capture.md) before judging, and again to verify before reporting. For a runnable target, capture every Capture Matrix cell and every state the surface has (focus, hover, menus, loading, empty, error); if you know a state exists and don't capture it, that's a miss, not a caveat. For a screenshot target, judge the provided image and list the cells and states it doesn't show. Don't score a state you haven't captured, and say "verified" only for what you checked under the user's real conditions (current build, warm cache).
2. **DESIGN.md wins.** Read the target's whole chain first; the nearest file wins conflicts. Use its tokens, type scale, and components; extend the system instead of inventing ad-hoc values. A brief or explicit user instruction overrides your taste.
3. **Refine, don't smuggle a redesign.** `polish` keeps the product's identity, content, and behavior. A new look happens only through `design`, where the user picks the Direction. A new structure happens only through live Variants, where the user picks one. Always ask before changing factual copy, claims, brand identity, or adding dependencies.
4. **Meet the craft floor.** Read [reference/craft-floor.md](reference/craft-floor.md) before any UI edit. Its bans hold unless DESIGN.md explicitly records an exception (accessibility and dark-pattern bans never yield), and its **default standard** (WCAG 2.2 AA, evergreen browsers, readable with JS off, reduced motion, LCP < 2.5s on mobile, no new fonts/deps without approval) applies unless DESIGN.md records an exception.
5. **Run the detector** on edited or critiqued source files: `node <skill dir>/scripts/detect.mjs <paths>`. Treat findings as evidence to verify, not verdicts. A clean scan does not prove quality.
6. **Be concrete.** Name the element, file, value, and fix. "Improve spacing" is not feedback; "Hero CTA sits 8px from the subhead; use `--space-6` (24px)" is.

## UX laws

These are the laws behind the Lenses. Each link goes to the checks and fixes that apply it. Name a law when it explains a finding, but never in place of the concrete fix.

| Law | In one line | How to follow it |
|---|---|---|
| Aesthetic-usability effect | People judge a well-made UI as easier to use and forgive its small flaws. | [craft-floor](reference/craft-floor.md) |
| Choice overload | Too many equal options make people delay the choice or leave. | [distill](reference/lenses/distill.md) |
| Chunking | Information split into small, meaningful groups is easier to read and remember. | [layout](reference/lenses/layout.md) |
| Cognitive bias | Defaults and framing predictably steer decisions, so use them honestly. | [clarify](reference/lenses/clarify.md) |
| Cognitive load | Every element spends limited attention; cut what doesn't serve the task. | [distill](reference/lenses/distill.md) |
| Doherty threshold | Answer every action within 400ms or people lose focus and trust. | [optimize](reference/lenses/optimize.md) |
| Fitts' law | Small or far targets are slow and error-prone to hit. | [adapt](reference/lenses/adapt.md), [craft-floor](reference/craft-floor.md) |
| Flow | Uninterrupted focus makes work feel effortless; interruptions break it. | [distill](reference/lenses/distill.md) |
| Goal-gradient effect | People speed up as the finish gets closer, so show progress. | [clarify](reference/lenses/clarify.md), [onboarding](reference/patterns/onboarding.md) |
| Hick's law | Each extra option makes a decision take longer. | [distill](reference/lenses/distill.md) |
| Jakob's law | People expect your UI to work like the ones they already use. | [consistency](reference/lenses/consistency.md) |
| Law of common region | Things inside one shared boundary read as a group. | [layout](reference/lenses/layout.md) |
| Law of proximity | Things close together read as related. | [layout](reference/lenses/layout.md) |
| Law of Prägnanz | People see complex or ambiguous shapes as the simplest form they can. | [consistency](reference/lenses/consistency.md) |
| Law of similarity | Things that look alike read as the same kind of thing. | [consistency](reference/lenses/consistency.md) |
| Law of uniform connectedness | Things joined by a line or shared fill read as more related than things only near each other. | [layout](reference/lenses/layout.md) |
| Mental model | People act on what they believe the system does, so match it. | [clarify](reference/lenses/clarify.md) |
| Miller's law | People hold about 7 (±2) items in mind, so group long runs. | [layout](reference/lenses/layout.md) |
| Occam's razor | When two designs both work, ship the simpler one. | [distill](reference/lenses/distill.md) |
| Paradox of the active user | People start using the product right away and skip instructions. | [clarify](reference/lenses/clarify.md), [onboarding](reference/patterns/onboarding.md) |
| Pareto principle | A few features carry most of the use, so give them the best spots. | [distill](reference/lenses/distill.md) |
| Parkinson's law | A task takes as long as it seems to need, so set and shorten the expected time. | [clarify](reference/lenses/clarify.md) |
| Peak-end rule | People judge an experience by its most intense moment and its end. | [delight](reference/lenses/delight.md) |
| Postel's law | Accept input loosely, then normalize and store it strictly. | [harden](reference/lenses/harden.md) |
| Selective attention | People ignore whatever looks unrelated to their goal, especially ad-like boxes. | [quieter](reference/lenses/quieter.md) |
| Serial position effect | The first and last items in a list are noticed and remembered best. | [layout](reference/lenses/layout.md) |
| Tesler's law | Some complexity can't be removed, so the system should carry it, not the user. | [distill](reference/lenses/distill.md) |
| Von Restorff effect | The one item that differs is the one that gets noticed. | [decolorize](reference/lenses/decolorize.md) |
| Working memory | People can't keep earlier details in mind, so show what the current step needs. | [clarify](reference/lenses/clarify.md) |
| Zeigarnik effect | Unfinished tasks stay on people's minds; show what's left so they come back. | [clarify](reference/lenses/clarify.md), [onboarding](reference/patterns/onboarding.md) |

## Vocabulary

- **DESIGN.md**: the project's Product, Personas, and Design System. Wherever the skill says DESIGN.md, it means the merged chain of `DESIGN.md` files that applies to the target (root → package → directory, nearest wins).
- **Persona**: a named target user from DESIGN.md who judges the UI.
- **Dimension**: one scored aspect (see [reference/critique.md](reference/critique.md)).
- **Score**: overall /10 plus each Dimension /10.
- **Lens**: one improvement technique, applied during Polish and used as build rules during Design.
- **Direction**: a short design brief (idea, structure, type, color, motion, signature moment) offered as one of 2–3 options before Design builds anything.
- **Variant**: one of 2–3 structurally different live builds of the same region on its real route, flipped with a bottom bar for the user to pick from ([reference/patterns/variants.md](reference/patterns/variants.md)). In design, each Variant is one Direction.
- **Capture**: screenshots across the **Capture Matrix**: {light, dark} × {desktop 1440×900, mobile 390×844}.
