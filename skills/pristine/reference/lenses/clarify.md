# Clarify

Clarify is about whether the words on screen tell a Persona what is happening, what to do next, and what it will cost them. A designer reads the interface the way a nervous first-time user would, and every string that makes them guess, hesitate, or feel blamed is a design bug.

**Raises:** Copy, Hierarchy & clarity.
**Skip it when:** the copy is clear and the problem is visual (use typeset or layout). For cutting whole sections or features, use distill. Do not change factual claims, legal text, prices, or domain terms without the user's confirmation.

## What a designer looks at

Open the Capture and read the whole flow in order, not isolated strings. Then use it. Run these checks.

**1. Read every label aloud as the Persona.**
- Use their vocabulary, expertise, and emotional state from DESIGN.md. Do you stumble on any word? Would they say it themselves? If not, it is internal jargon. Hunt backend, schema, and protocol vocabulary (`row`, `sponsor`, `allowlist`, protocol acronyms, `server identity`, `private task`, ambiguous `trigger` labels) and replace it with plain mental-model words (`task`, `owner`, `custom integration`, `run`). Where sibling menu options have subtle behavioral differences (such as `One time` vs. `Repeat` vs. `Schedule`), add a plain one-line description under each option.
- Where a product-specific assistant or mascot name appears in settings or secondary screens (such as Memory or Preferences), clarify who or what it is on first reference in plain language instead of assuming the Persona remembers the mascot.
- Do names, structure, and icons match what the Persona already believes about how this works (mental model)? A "cart" that saves for later, a trash icon that deletes permanently, or settings grouped by database table instead of by task all break that belief.
- "Would my parent understand this button?" "Submit", "OK", "Yes/No", "Click here" fail: they describe the gesture, not the outcome.
- Read each link out of context (as a screen reader list would). "Learn more" or "click here" alone means nothing.
- Are nav items and section names specific to their contents ("Invoices", "Library"), or safe umbrellas ("Home", "Misc", "General", "Other stuff")?
- Are icon-only buttons understandable without hovering? If you have to guess, they need a visible label, or at minimum a tooltip (~0.5–1s delay) plus an `aria-label` that matches visible intent.
- Does marketing and onboarding copy say how it helps the user, or only what the feature does? Is it short and friendly, or corporate mush (empower, seamless, unlock, revolutionize)?

**2. Break it, then try to recover.**
- Submit an empty form, a bad date, a short password. Read the error. Does it say what is wrong *and* how to fix it, next to the field? "Invalid input" or "Something went wrong" leaves the user stuck.
- Is a raw error code the headline? Codes belong in secondary text.
- Does any message blame the user ("You entered…wrong")? Blame raises stress without helping.
- Does validation appear inline as the user goes (on blur or after a pause), or only after submit? Is every feedback kind covered: status (what's happening), completion (it worked), warning (before a problem), error (after one)? Every action should close its feedback loop; silence makes users click again.

**3. Find the risky moments.**
- Click every delete, remove, or cancel. Does the confirmation name the object and the consequence ("Delete 3 invoices? This can't be undone.")? Does the button repeat the action, or just say "Yes"?
- If recovery is possible, is there undo instead of a confirmation dialog?
- Check the tone: are there jokes, "Oops!", or "Uh oh!" on errors involving money, data loss, or privacy? Tone must match the stakes (routine, success, stress, risk).

**4. Look at every non-default state.**
- **Empty:** does it just say "No data"? First use, no results, filtered out, no permission, and failed to load are different situations; each needs its own explanation and next action.
- **Loading:** does it say "Loading…" or name the real operation ("Importing 1,240 contacts…")? Is there determinate progress when the system knows it?
- **Success:** does it confirm the outcome briefly? Does it mention a next step only when that changes what the user does?

**5. Walk the flow's edges.** Can the user skip an optional step, search a long list, pick "Other" when no option fits, and go back without losing input? Is onboarding a 6-bullet modal no one reads, or tips that appear where and when they matter? People start using the product right away and skip instructions (paradox of the active user), so any help that must be read first gets skipped.
- In a multi-step flow (checkout, onboarding, setup), can the Persona see where they are and how much is left? People speed up as the finish gets closer (goal-gradient effect); a flow with no visible progress feels endless, and one that starts at 0% feels like a chore.
- Does the flow start from zero? Count a step the Persona has already done (account created = step 1) so progress never reads 0%; never pad it with fake steps. Are fields pre-filled with the most common or inferred choice?
- Leave the flow halfway, then come back. Is the work saved, and does the screen show what's left ("2 of 5 done", a saved draft, "Continue setup")? Unfinished tasks stay on people's minds and pull them back (Zeigarnik effect), but only if the product shows what's unfinished.
- Does the flow say how long it takes ("About 2 minutes", "3 steps")? A task stretches to fill the time it seems to need (Parkinson's law). Do fields carry `autocomplete` tokens so the browser can fill them?
- Does step N need something from an earlier step (plan picked, address, selected filters, items in the cart)? If the Persona has to remember it, show it on the screen. People hold only a few things in mind at once (working memory).
- Look at the defaults and framing. Is the preselected option the one most Personas would pick, at no extra cost? Are anchors honest (a crossed-out price that was really charged)? Defaults and framing steer decisions (cognitive bias). Using them against the user (preselected paid add-ons, fake countdowns, fake scarcity) breaks trust.
- Does any screen ask (sign up, pay, allow) before it has given something? Does a decline button guilt-trip? See [../patterns/onboarding.md](../patterns/onboarding.md).
- On pricing, is the price the largest text, the plan name small, any discount shown, and what the next plan adds stated?

**6. Inspect the forms.** The full form rules are in [../patterns/forms.md](../patterns/forms.md).
- Cover the placeholders. Can you still tell what each field is? If not, placeholders are being used as labels; they vanish on typing and force the user to remember what was asked (recognition over recall).
- Are format rules shown before submission, or only revealed by the error?
- Are both required *and* optional fields marked? Mark only the minority.
- Does helper text answer the question the user would ask, or just restate the label?

**7. Hunt for repetition and drift.**
- Does the intro repeat the heading? Does helper text repeat the intro? Each idea should be said once.
- Is the same thing called two names ("project" here, "workspace" there)? Varying words for literary effect makes users think they are different things.
- Do two different concepts collide on the same word (e.g. calling third-party integrations `"Your apps"` or `"Add custom app"` when the product also has user-built `"Apps"`, or labeling a background-runs search bar `"Search tasks"` beside a `"Tasks"` board)? Enforce strict 1-to-1 naming across page headings, tabs, buttons, search placeholders, table headers, and empty states.
- Mixed capitalization (Title Case and Sentence case), or inconsistent number, date, and currency formats?

**8. Wayfinding.** On every screen, can the Persona answer: where am I, where can I go, what's here, and how do I get out? Open each modal, wizard, and full-screen view: is there always a visible way back or out, or does the user get trapped? When work spans two related surfaces (such as a tasks board and background runs, or a paused resource and workspace usage/limits), is there an explicit link right in the header or banner so the Persona can jump to the sibling view without hunting?

**9. Mapping and hidden context.**
- Does each control sit next to what it affects, arranged like the thing it changes? If a control needs a label to explain what it maps to, the mapping is weak.
- Did "clean" mean hiding everything? An interface that buries the needed fact looks minimal but isn't simple. Would one added piece of context (time remaining, items left, what happens next) remove a question?

**10. Stress the strings.** Mentally add 30–40% length (German) and view at 320–375px. Do buttons truncate or wrap awkwardly? Do search or input placeholders clip mid-word on narrow mobile screens? Are any sentences built by concatenating fragments, which cannot be translated?

Before editing, list every unclear string with its location and why it fails: vague, jargon, missing consequence, missing recovery, inconsistent, redundant, or wrong tone.

## How to fix

1. **Read DESIGN.md**: product terminology, voice, and Personas (their expertise, vocabulary, and emotional state when using this target).
2. **Decide what each screen or state must say**, in this order:
   1. the one fact the user needs now;
   2. the next action;
   3. context that changes the decision (cost, time, reversibility);
   4. tone for the moment (routine, success, stress, risk).
3. **Rewrite by function:**
   - **Buttons and links:** verb + object ("Create project", "Export CSV"). Describe the outcome, not the gesture. When the outcome is known, put it on the button ("Show 12 flights", "Start 14-day trial: no card"). Link text makes sense out of context.
   - **Destructive actions:** name the object and consequence; the button repeats the action ("Delete invoices"), not "Yes". Prefer undo over confirmation when recovery is possible.
   - **Forms:** persistent visible labels; placeholders show an example only; format rules before submission; mark the minority (optional or required), not both.
   - **Validation:** what is wrong + how to fix, next to the field ("Use at least 8 characters"); no blame ("Invalid input" → "Enter a date like 21/10/2026").
   - **Errors:** what failed, why (if known and useful), how to recover; keep codes secondary.
   - **Empty states:** separate copy for first use, no results, filtered out, no permission, and failed to load; each explains the state and offers the next action. First-run: explain the value + one primary action. No results: suggestions and one-click recovery (clear search/filters, switch category filter, or start the primary creation action).
   - **Marketing and value copy:** short and punchy; lead with how it helps the user, not what it does; friendly, not corporate.
   - **Onboarding:** sequenced contextual tips at the moment of use, not a front-loaded multi-bullet modal; nothing must be read before the product can be used (paradox of the active user).
   - **Flows:** include skip, search, an "Other" option, and back wherever a Persona could get stuck. Multi-step flows show position and what's left ("Step 2 of 4", named steps), and credit work already done so progress never starts at zero (goal-gradient effect); keep the step count honest. State the expected time up front ("About 2 minutes") and add `autocomplete` tokens to every field the browser can fill (Parkinson's law). Autosave partial work and show what's unfinished on return ("Continue setup: 2 of 5 done") (Zeigarnik effect). Show earlier choices the current step depends on, such as a summary of the order, plan, or filters, instead of asking the Persona to remember them (working memory).
   - **Defaults and framing:** preselect the option most Personas would pick, never a paid extra; anchors and urgency must be true (cognitive bias).
   - **Names and structure:** match the Persona's mental model: their words for things, grouping by their task, and icons that do what they usually do. Strip backend, schema, and protocol jargon (`row`, `sponsor`, `allowlist`, protocol acronyms, ambiguous `trigger` labels), add one-line disambiguators inside menus when sibling options are easily confused (`One time` vs. `Repeat` vs. `Schedule`), and introduce any assistant or mascot name in plain language on first reference in settings or secondary screens.
   - **Pricing, plans, and limits:** price large, plan name small, discount shown, and each plan states what it adds over the previous one. In model, tier, or plan pickers, show billing source and relative cost or capability directly at selection time; when a feature is paused due to a quota or spending cap, state *which* limit was hit and link straight to where it can be raised.
   - **Loading:** name the real operation; show determinate progress when available.
   - **Success:** confirm the outcome briefly; mention the next step only if it changes what the user does.
   - **Helper text:** answers the user's question; does not restate the label.
   - **Navigation and section labels:** name them for their contents; replace "Home", "Misc", "General" with what's actually there.
   - **Feedback:** status for ongoing work, completion for meaningful actions, a warning before a problem, an error after one; validate inline as the user goes, not only on submit.
   - **Wayfinding:** a page title that says where the user is, a current-location marker in nav (`aria-current="page"`), accurate mobile drawer titles (the workspace or mode name, never generic `"Navigation"`), explicit header or banner cross-links when work spans split surfaces (such as manual tasks vs. background runs, or a paused resource vs. usage settings), and a visible exit (back, close, cancel) from every modal, wizard, and full-screen view. Sub-modes such as Settings return to the exact prior route with a contextual label (`Back to <workspace>`) rather than a generic root.
   - **Mapping:** move a control beside what it affects before writing a longer label to explain it.
   - **Context over minimalism:** add the one fact that removes a question (time remaining, count left, consequence) even if the screen gets slightly busier.
4. **Cut redundancy:** if the heading says it, the intro adds new information or disappears. Say each idea once.
5. **Make it consistent:** one term per concept, one capitalization style (sentence case for UI unless DESIGN.md says otherwise), consistent number, date, and currency formats.
6. **Accessibility and i18n:** icon-only buttons get `aria-label`s matching visible intent; alt text conveys information (empty alt for decoration); full translatable sentences, no string concatenation; allow 30–40% expansion; use plural-aware formatting.
7. **On mobile, shorten wording rather than shrinking type** when clearer labels get long.
8. **Add a short terminology list and voice rules to DESIGN.md** if the inconsistency spans the product.

## Rules
- [ ] Every button is a specific verb (+ object); no "Submit", "OK", "Yes/No", "Click here".
- [ ] No link text that is only "click here" or "learn more".
- [ ] Every error states the problem and the recovery; codes are secondary.
- [ ] Every empty state has an explanation and a next action (first-run: primary action; no-results: suggestions + clear filters).
- [ ] Unfamiliar icons have a visible label or a delayed tooltip (~0.5–1s).
- [ ] Flows offer skip, back, and "Other" where choices may not fit.
- [ ] Multi-step flows show the current step and what's left.
- [ ] Multi-step flows state their expected time; fillable fields have `autocomplete` tokens.
- [ ] Leaving a flow halfway keeps the work and shows what's unfinished on return.
- [ ] No step asks the Persona to remember an earlier choice; it is shown on screen.
- [ ] No preselected paid option, fake countdown, or untrue anchor price.
- [ ] Nothing must be read before first use; help appears in context.
- [ ] No placeholder-as-label; all inputs have visible labels.
- [ ] Strict 1-to-1 terminology across the flow and adjacent features: one concept never has two names, and two distinct concepts never share one name across headers, tabs, buttons, search placeholders, table headers, and empty states.
- [ ] No heading/intro/helper text repeating the same idea.
- [ ] No internal architecture, schema, or protocol jargon the Personas would not use themselves; ambiguous sibling menu options carry a plain one-line description, and branded/mascot names are explained on first reference in settings.
- [ ] Model/plan pickers surface billing source and relative cost/capability at selection time; paused-by-limit states name *which* limit was hit and link directly to where it can be raised.
- [ ] Tone matches stakes: no jokes on errors involving money, data loss, or privacy.
- [ ] Strings fit at 320px and with +40% length.
- [ ] Every screen answers where am I, where can I go, what's here, how do I get out; no dead ends.
- [ ] Nav and section labels name their contents; no "Home"/"Misc" umbrellas.
- [ ] Forms validate inline; status, completion, warning, and error feedback each exist where relevant.
- [ ] Controls sit beside what they affect; no label compensating for weak mapping.

## Avoid
- Hype words and corporate mush: "Unlock", "Supercharge", "Seamless", "Effortless", "Revolutionary", "Empower", "Revolutionize".
- Onboarding as a single modal of 6 bullets.
- Passive, vague outcomes ("Changes may have been applied").
- Over-apologizing or cute filler ("Oops!", "Uh oh!").
- Inventing features, numbers, or promises in copy.
- Varying words for literary effect; interfaces need repetition.
- Hiding needed information to look minimal; simplicity is the right fact at the right time, not fewer pixels.
- Trapping users in a modal, wizard, or full-screen view with no visible way out.

## Verify in the Capture Matrix
- Capture key states (default, error, empty, loading, success) in light/dark × desktop/mobile.
- **Mobile light/dark:** longer, clearer labels must not truncate or wrap awkwardly in buttons; shorten wording rather than shrinking type.
- **Desktop and mobile, both themes:** helper and error text keep ≥ 4.5:1 contrast.
- Read the flow aloud once as each Persona. Copy and Hierarchy & clarity should rise; copy should be as short as possible without losing meaning or recovery.
