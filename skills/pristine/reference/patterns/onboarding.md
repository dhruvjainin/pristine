# Pattern: onboarding and signup

Use for every surface where a product turns a visitor into an active user: signup and login, email or phone verification, welcome and setup steps, first-run empty states, permission prompts, product tours, trial/upgrade prompts, and paywalls. The goal is that the Persona reaches their first real success (the **aha moment**) as fast as possible, and that every ask comes after something worth giving it for.

Onboarding is judged in mode **Operate** for the steps and **Persuade** for any screen that asks for commitment (signup wall, upgrade, paywall). Load this file alongside the matching mode's pattern file.

## The four levels

| Level | What it looks like |
|---|---|
| **2: template** | Signup wall first; long form; email + password + confirm password; a 6-bullet welcome modal; 0% progress; empty dashboard with "No data" |
| **6: clean** | Short form, SSO options, clear errors; a few setup steps with progress; empty states with one action |
| **8: considered** | Value before the account; smart defaults; progress starts from real work done; each step explains why it's asked; sample data or templates fill the first screen |
| **10: memorable** | The Persona has built or seen something of their own before signing up; the aha moment lands in the first minute; every later ask feels like a natural next step, never a toll |

## Principles

**1. Give value before you ask.** Let the Persona try the product, see a result, or get a useful partial answer before asking for an account, email, payment, or permission. Show the result unlocked: a score, the top issues, a first draft, a real preview. Ask for the account in order to *save, share, or go deeper* ("Save your report"), never to see what they just made. A blurred or locked result is a ransom note.

**2. Let them build before they sign up.** Choosing a goal, a name, a template, a style, or doing the first lesson creates ownership; people value what they made. Collect those choices first, keep them across the signup step, and label the button "Continue", not "Sign up". Never discard work done before signup.

**3. Never start at zero.** Count real work already done: an account created, a choice made, data imported. "Step 2 of 5" or a 20% bar from that real step creates momentum; 0% says "you haven't started". Progress must reflect real, completed steps; never pad it with fake ones.

**4. Smart defaults over questions.** Pre-fill the most common or inferred choice for every field (locale, timezone, currency, workspace name from the email domain, the plan most people pick). Most users keep defaults and read them as recommendations, so the default must be the choice that serves *them* (never pre-ticked marketing consent, paid add-ons, or the most expensive plan). The user's job becomes "scan and adjust", not "fill from scratch".

**5. Ask only what you need now.** Every field and step costs completion. Defer anything not needed for the first success (job title, company size, avatar, team invites) to later, contextual moments. If a question exists only for sales or analytics, make it optional and skippable, or remove it.

**6. Buttons say what happens next.** "Show 12 flights", "Create workspace", "Start 14-day trial: no card" beat "Search", "Submit", "Next". If you know the result count or the outcome, put it on the button.

**7. Frame the ask with real stakes.** People act more to avoid losing what they have than to gain something new. When asking someone to upgrade, verify, or save, show what's genuinely at stake: their real files, their streak, the report they just made, the date the trial really ends. Facts only (see Bans).

**8. Show cost in context.** Never show a price alone. Show an add-on next to the main purchase ("$50/mo: 2.6% of your laptop"), a per-seat or per-day breakdown when it's honest, and the plans ordered so the recommended one is clearly marked. The first number seen becomes the ruler for the rest.

## Signup and login

- **One screen, minimal fields.** Email (or SSO), then continue. No "confirm password", no username unless it's public, no name if you can ask later.
- **SSO first** for the Persona's real providers (Google, Microsoft, GitHub, Apple), then email. Passwordless (magic link or code) is a strong default.
- **Password fields:** show/hide toggle; show the rules before typing, not after failing; `autocomplete="new-password"` on signup and `current-password` on login; allow paste and password managers.
- **Correct input attributes:** `type="email"`, `autocomplete="email"`, `autocapitalize="none"`, `spellcheck="false"`; one-time codes use `autocomplete="one-time-code"` and `inputmode="numeric"`, accept paste into any box, and auto-submit when complete.
- **Login and signup cross over:** an existing email on signup offers to log in (and vice versa) instead of a dead-end error. Don't reveal whether an account exists where that leaks private data; say "If an account exists, we've sent a link."
- **Errors inline** next to the field, on blur or submit, saying how to fix it; never clear the form.
- **Legal and consent:** terms are a link under the button ("By continuing you agree to…"); marketing consent is a separate, unticked checkbox.
- **Verification doesn't block value.** Let the Persona keep going and verify later where the product allows. The "check your inbox" screen names the address, offers resend with a visible cooldown, a way to change the email, and links to the common inbox apps on mobile.

## Setup steps

- 3–5 steps maximum, each with one clear purpose. Show position ("2 of 4") and allow back without losing input.
- Each question says why it's asked when it isn't obvious ("So we can suggest templates for your team").
- Every non-essential step has a visible "Skip", and skipped items come back later as gentle, contextual prompts.
- Personalize visibly: what they pick must change what they see next. A question with no visible effect is a waste of their time.
- End on the product doing something useful, not a "You're all set!" screen with nothing to do.

## First run

- **No blank first screen.** Use templates, sample data (clearly labeled and removable in one click), or a guided first action. The empty state names what will appear, why it matters, and the one action to create it.
- **Teach in context, not in a tour.** Replace multi-step coach-mark tours and welcome modals with sequenced, contextual hints that appear when the related feature is first needed, and can be dismissed for good.
- **A checklist only for real setup work** (3–5 items, progress counted from real steps, dismissible, collapses once done). Never a checklist of features to "explore".
- **Permission prompts in context.** Ask for notifications, location, camera, or contacts at the moment it's needed, after a short in-product explanation of the benefit, with a "Not now" that doesn't ask again on every visit. Never on page load.
- **Celebrate the first real success** briefly and specifically ("Your first invoice is sent"), then point to the next useful step.

## Trials, upgrades, and paywalls

- Say clearly what's free, what's paid, when a trial ends, and whether a card is needed, before the Persona commits.
- Paywalls name what they get, show the real price in context, and let them dismiss with a neutral "Not now" that leaves them where they were.
- Upgrade prompts appear at the moment of need (they hit a limit, try a paid feature), not as interruptions on login.
- Downgrading or cancelling is as easy to find as upgrading, and says what happens to their data.

## Bans (dark patterns)

These break trust and are absolute, whatever they do to conversion in the short term:

- **Guilt-trip dismiss copy** ("No thanks, I hate saving money", "I'll risk it"). Decline options stay neutral: "Not now", "Skip", "No thanks".
- **Fake urgency and scarcity**: countdowns that reset, invented "3 people are viewing this", deadlines that aren't real.
- **Fake progress**: bars that jump without real work done, or steps added only to look further along.
- **Locked or blurred results** shown only to force signup.
- **Pre-ticked consent** for marketing, data sharing, or paid add-ons.
- **Hidden costs** revealed only at the last step; a card required for a "free" trial without saying so up front.
- **Roach motel**: signup in one click, cancellation behind a phone call or a hidden page.
- **Nagging**: the same prompt on every visit after the Persona said no.

## Verify

Walk the flow as the primary Persona on mobile and desktop, from first visit to first real success, and count: screens, fields, clicks, and seconds until the aha moment. Then check each step for: value before the ask, smart defaults, honest progress, skip and back, inline errors, worst-case input (long names, international phone numbers, `+` in emails), password-manager and autofill behavior, and a neutral way out.
