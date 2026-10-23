# Clarify

Clarify is about whether the words on screen tell a Persona what is happening, what to do next, and what it will cost them. A designer reads the interface the way a nervous first-time user would, and every string that makes them guess, hesitate, or feel blamed is a design bug.

**Raises:** Copy, Hierarchy & clarity.
**Skip it when:** the copy is clear and the problem is visual (use typeset or layout). For cutting whole sections or features, use distill. Do not change factual claims, legal text, prices, or domain terms without the user's confirmation.

## What a designer looks at

Open the Capture and read the whole flow in order, not isolated strings. Then use it. Run these checks.

**1. Read every label aloud as the Persona.**
- Use their vocabulary, expertise, and emotional state from DESIGN.md. Do you stumble on any word? Would they say it themselves? If not, it is internal jargon.
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

**5. Walk the flow's edges.** Can the user skip an optional step, search a long list, pick "Other" when no option fits, and go back without losing input? Is onboarding a 6-bullet modal no one reads, or tips that appear where and when they matter?
- In a multi-step flow (checkout, onboarding, setup), can the Persona see where they are and how much is left? People speed up as the finish gets closer (goal-gradient effect); a flow with no visible progress feels endless, and one that starts at 0% feels like a chore.
- Does the flow start from zero? Count a step the Persona has already done (account created = step 1) so progress never reads 0%; never pad it with fake steps. Are fields pre-filled with the most common or inferred choice?
- Does any screen ask (sign up, pay, allow) before it has given something? Does a decline button guilt-trip? See [../patterns/onboarding.md](../patterns/onboarding.md).
- On pricing, is the price the largest text, the plan name small, any discount shown, and what the next plan adds stated?

**6. Inspect the forms.**
- Cover the placeholders. Can you still tell what each field is? If not, placeholders are being used as labels; they vanish on typing and force the user to remember what was asked (recognition over recall).
- Are format rules shown before submission, or only revealed by the error?
- Are both required *and* optional fields marked? Mark only the minority.
- Does helper text answer the question the user would ask, or just restate the label?

**7. Hunt for repetition and drift.**
- Does the intro repeat the heading? Does helper text repeat the intro? Each idea should be said once.
- Is the same thing called two names ("project" here, "workspace" there)? Varying words for literary effect makes users think they are different things.
- Mixed capitalization (Title Case and Sentence case), or inconsistent number, date, and currency formats?

**8. Wayfinding.** On every screen, can the Persona answer: where am I, where can I go, what's here, and how do I get out? Open each modal, wizard, and full-screen view: is there always a visible way back or out, or does the user get trapped?

**9. Mapping and hidden context.**
- Does each control sit next to what it affects, arranged like the thing it changes? If a control needs a label to explain what it maps to, the mapping is weak.
- Did "clean" mean hiding everything? An interface that buries the needed fact looks minimal but isn't simple. Would one added piece of context (time remaining, items left, what happens next) remove a question?

**10. Stress the strings.** Mentally add 30–40% length (German) and view at 320px. Do buttons truncate or wrap awkwardly? Are any sentences built by concatenating fragments, which cannot be translated?

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
   - **Empty states:** separate copy for first use, no results, filtered out, no permission, and failed to load; each explains the state and offers the next action. First-run: explain the value + one primary action. No results: suggestions and a "Clear filters" action.
   - **Marketing and value copy:** short and punchy; lead with how it helps the user, not what it does; friendly, not corporate.
   - **Onboarding:** sequenced contextual tips at the moment of use, not a front-loaded multi-bullet modal.
   - **Flows:** include skip, search, an "Other" option, and back wherever a Persona could get stuck. Multi-step flows show position and what's left ("Step 2 of 4", named steps), and credit work already done so progress never starts at zero (goal-gradient effect); keep the step count honest.
   - **Pricing:** price large, plan name small, discount shown, and each plan states what it adds over the previous one.
   - **Loading:** name the real operation; show determinate progress when available.
   - **Success:** confirm the outcome briefly; mention the next step only if it changes what the user does.
   - **Helper text:** answers the user's question; does not restate the label.
   - **Navigation and section labels:** name them for their contents; replace "Home", "Misc", "General" with what's actually there.
   - **Feedback:** status for ongoing work, completion for meaningful actions, a warning before a problem, an error after one; validate inline as the user goes, not only on submit.
   - **Wayfinding:** a page title that says where the user is, a current-location marker in nav, and a visible exit (back, close, cancel) from every modal, wizard, and full-screen view.
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
- [ ] No placeholder-as-label; all inputs have visible labels.
- [ ] One term per concept across the flow.
- [ ] No heading/intro/helper text repeating the same idea.
- [ ] No jargon the Personas would not use themselves.
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
