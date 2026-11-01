# Pattern: forms

Use for every surface where the Persona enters or picks data: settings, create/edit dialogs, checkout, contact and lead forms, filters with an apply step, setup wizards, and any single question with a submit button. A form is a conversation the Persona didn't ask to have: every field costs time and trust, so the job is to ask less, ask clearly, and never lose what they typed.

Signup, login, and verification forms also follow [onboarding.md](onboarding.md). Forms that render user data follow [worst-case-data.md](worst-case-data.md).

## The four levels

| Level | What it looks like |
|---|---|
| **2: template** | Placeholder-as-label, asterisks on every field, a disabled grey submit with no reason, "Invalid input" after submit, the form clears on error, "Submit" button |
| **6: clean** | Visible labels, sensible order, inline errors that say how to fix, correct input types; but every field is asked, every field is the same width, and help text restates the label |
| **8: considered** | Only the fields needed now, smart defaults, widths that hint at the answer, control types matched to option counts, inline validation on blur, focus moves to the first error, nothing lost on failure |
| **10: memorable** | Feels like it fills itself: inferred values, autofill everywhere, the button says the outcome ("Create 3 invoices"), errors are rare because the form accepts what people naturally type |

## 1. Ask less

- **Every field earns its place.** For each one, name what breaks if it's removed. "Nice to have for sales" fails; make it optional and later, or delete it (Tesler's law: the system carries complexity it can derive).
- **Infer before asking:** country and currency from locale, city and region from postcode, card type from the number, workspace name from the email domain, timezone from the browser. Show the inferred value as an editable default.
- **Defaults are the most common honest choice** (cognitive bias): never a paid add-on, never marketing consent.
- **No double entry:** no "confirm email" or "confirm password" (use a show/hide toggle); a "same as billing" checkbox, checked by default, instead of a second address.
- **One name field** (`autocomplete="name"`) unless the data genuinely needs given and family names separately.

## 2. Structure and layout

- **One column.** Labels above fields. Two fields share a row only when they are one short pair read together (city + postcode, expiry + CVC, first + last name) and the row still fits at 390px.
- **Field width hints at the answer:** postcode ~8ch, CVC ~5ch, expiry ~7ch, phone ~16ch, quantity ~6ch; names, emails, and addresses fill the column. Set width with `ch` units or a `size`-matching `max-width`, not a fixed px value.
- **Group with `<fieldset>` and `<legend>`** when there are more than ~7 fields (Miller's law): 3–7 fields per headed group, in the order the Persona thinks about the information (who → where → how to pay), not database order.
- **A field lives in the group its meaning belongs to.** "Name on card" goes under Payment, not Billing address; a group heading must describe every field under it.
- **Group headings outrank labels by at least one type step:** legend ≥ 1.125rem/600 when labels are ~0.9375rem/500. A heading that looks like a label reads as a field with no input.
- **Fields sharing a row align to the top and keep their own height** (`align-items: start`); a helper line under one field must not stretch its neighbour's input.
- **Spacing:** label → its input 4–8px; input → its helper or error 4–8px; field → next field 16–24px; group → group 32–48px. A helper line must sit closer to its own field than to the next field or the submit button (law of proximity).
- **The submit button** follows the last field, aligned to the form's left edge on desktop; full width only on mobile or narrow dialogs. Secondary actions (Cancel, Back) sit beside it as quieter buttons; never a "Reset" button.

## 3. Labels, help, and required

- **Every input has a visible `<label for>`.** Placeholder text is only an example ("e.g. Acme Ltd"), never the label; it vanishes on typing (working memory).
- **Label and control use one noun.** A "Team" field's placeholder says "Choose a team", not "Choose a resource" (mental model).
- **Mark the minority.** If most fields are required, mark only the optional ones "(optional)"; if most are optional, mark the required ones. A form or step with a single field marks neither. Never a bare `*` without a legend.
- **Helper text answers the Persona's question** (why we ask, what format, what happens with it) and sits under the field, tied with `aria-describedby`. If it restates the label or describes system internals, delete it.
- **Helper text stays true for every option the form allows.** "Shown to everyone you invite" is false when the default visibility is the whole team; check each help line against each default and choice.
- **Dependent fields follow what they depend on.** When one answer changes another field's format (card brand → CVC length and location, country → postcode), that field's label, help, rule, and error message all update together.
- **Format rules show before typing** (password rules, file size and type limits), not only in the error.

## 4. Pick the right control

| The choice | Use |
|---|---|
| 2–5 options, one answer | Radio group or segmented control: all options visible, nothing to open (Hick's law) |
| 2–5 options, several answers | Checkboxes |
| 6–15 options | `<select>` or a listbox, with a sensible default or an explicit "Choose a …" |
| More than 15 options, or options the Persona knows by name (country, timezone, user) | Combobox with type-to-filter, recent/common options first |
| On/off that applies immediately | Switch |
| On/off that applies on submit, or consent | Checkbox |
| A number with a small range | Stepper or number input with `inputmode="numeric"`; a slider only when the exact value doesn't matter |
| A date | Native `type="date"` for near dates; three labelled text fields (day, month, year) for birthdays and known dates |
| Long free text | `<textarea>` that grows with content, with a visible character count only when a limit exists |

Never a dropdown for yes/no, never a select for 2–3 options, never a free-text field for something with a fixed set of answers.

## 5. Input attributes

Every field gets the attributes that make the browser and the keyboard help:

- `type`: `email`, `tel`, `url`, `number` only for true quantities (never for card numbers, codes, or IDs; use `inputmode="numeric"` there), `password`, `search`, `date`.
- `autocomplete` tokens on every field the browser can fill: `name`, `email`, `tel`, `organization`, `street-address`, `address-line1`, `postal-code`, `country`, `cc-number`, `cc-exp`, `cc-csc`, `one-time-code`, `new-password`, `current-password`, `username`. `autocomplete="off"` only for fields that must never be filled (a recipient's address on a gift form).
- `inputmode` (`numeric`, `decimal`, `email`, `tel`), `enterkeyhint` (`next`, `done`, `search`, `send`), `autocapitalize="none"` and `spellcheck="false"` on emails, usernames, and codes.
- `maxlength` and `pattern` from the real schema limit, matched by the server.
- Font size ≥ 16px on inputs so iOS doesn't zoom on focus.
- Never block paste, autofill, or password managers.

## 6. Accept what people type

Be liberal in what you accept, strict in what you store (Postel's law):

- Trim leading and trailing whitespace on every text field.
- Normalize on blur so the Persona sees the stored form, and again before sending so pasted or autofilled values that never blurred are clean too.
- Accept spaces, dashes, dots, and brackets in phone, card, IBAN, and ID numbers; strip them before validating.
- Accept common date formats and both `,` and `.` decimal separators where the locale is ambiguous; show the normalized value after blur. Card expiry accepts `1/28`, `01/28`, `0128`, and `01/2028`, and shows `01 / 28`.
- **Address fields follow the country.** Country comes first (inferred from locale), and its value sets the postcode label, `inputmode`, pattern, and example: "ZIP code" 5 digits (US), "Postcode" letters and digits (UK), "PIN code" 6 digits (India). Hide region or postcode for countries that don't use them. Never hard-code one country's format.
- Case-insensitive matching for emails and codes.
- Reject only what can't be normalized, and say how to fix it.

## 7. Validation and errors

- **When:** validate a field on blur, after the Persona has typed in it; re-validate on every input once it is in error, so the message clears as soon as it's fixed. Required-but-empty fields are flagged on submit, never on first focus or while typing for the first time.
- **What the message says:** what's wrong and how to fix it, in the Persona's words: "Enter a date like 21/10/2026", not "Invalid date". No blame, no codes in the headline.
- **Where:** directly under its field, red text plus an icon (never colour alone), the field gets `aria-invalid="true"` and the message is in its `aria-describedby`.
- **On submit with errors:** move focus to the first invalid field. For forms longer than one screen, also show an error summary at the top (`role="alert"`) listing each error as a link to its field.
- **Server errors map to fields:** a 400 with field details shows under those fields; a 409 explains the conflict; other failures show a form-level message with retry. See [../lenses/harden.md](../lenses/harden.md).
- **A form-level failure** sits directly above the submit button, takes focus (`role="alert"`, `tabindex="-1"`), and says whether anything happened ("Nothing was charged", "Your project wasn't created") before what to do next.
- **Derived fields don't blame the Persona.** A field filled from another one (URL from name, display name from email) is validated on its own only after the Persona edits it. Until then, an empty or invalid value is reported once, on the source field.
- **Never clear the form** on any error. Typed values, uploaded files, and selections survive validation, network failure, and re-auth.

## 8. The submit button

- **Label = verb + object, or the outcome:** "Create project", "Save changes", "Pay $48", "Send invite to 3 people". Never "Submit", "OK", or "Continue" when a specific verb exists.
- **Keep it enabled.** A disabled submit hides why it's disabled and can't receive focus. Let the click run validation and show the errors. Disable it only while the request is in flight.
- **While submitting:** keep the button's width and height (label on one line with `white-space: nowrap`; the spinner replaces or overlays the label, it doesn't push it), show a spinner or progress inside it, set `aria-busy="true"`, and block double submission. Acknowledge within 100ms; if the result takes longer than 400ms, the in-button progress must already be visible (Doherty threshold).
- **After success:** say what happened and where it is ("Project created" with a link, or navigate to the new item). After a modal form, close it and confirm with a toast. An inline success replaces the form, takes focus, repeats the key values (name, amount, where the receipt went), and offers the next action; never a line of text below the buttons, where it can land off-screen on mobile.

## 9. Long and multi-step forms

- **Split into steps** when there are more than ~10 fields across distinct topics, or when later questions depend on earlier answers. Each step has one topic and a name.
- **Show progress with named steps** ("2 of 4: Billing"), and say up front how long it takes ("About 3 minutes") (goal-gradient effect, Parkinson's law).
- **Back keeps every answer.** Show earlier answers the current step depends on (working memory).
- **Save drafts.** Autosave long forms and restore them on return with "Continue where you left off" (Zeigarnik effect). Warn before leaving with unsaved changes (`beforeunload`, or an in-app "Discard changes?" dialog naming what's lost).
- **Review before irreversible actions:** a final step summarises every answer with an edit link per section before payment, deletion, or sending.

## 10. Accessibility and themes

- Radio and checkbox groups use `<fieldset>` + `<legend>`; the legend is the question.
- The whole label is clickable, and each radio, checkbox, and switch has a ≥ 44×44px hit area.
- Tab order follows the visual order; no positive `tabindex`.
- `required` on required fields (the visible "required"/"optional" text still matters).
- Input borders and focus rings ≥ 3:1 against the surface in both themes; placeholder text ≥ 4.5:1.
- Disabled fields look different from read-only ones; read-only values stay selectable and copyable.
- Autofilled fields keep the theme in dark mode (override `:-webkit-autofill` background with an inset `box-shadow` of the input's surface colour and set `-webkit-text-fill-color`).
- Error states are distinguishable in grayscale (icon and text, not just a red border).
- One focus ring per control. A radio or checkbox inside a selectable card shows the ring on the input or on the card, never both.

## Bans

- Placeholder text as the only label.
- A disabled submit button with no visible reason.
- Clearing any field, file, or selection after an error.
- "Confirm email" / "confirm password" fields.
- A "Reset" or "Clear form" button beside submit.
- Phone or card numbers split into several boxes (one-time codes excepted).
- Blocking paste, autofill, or password managers.
- Validating while the Persona is still typing their first attempt.
- "Required" on the only field of a form or step; a bare `*` with no legend.
- Pre-ticked marketing consent or paid add-ons.

## Verify

Run this before showing any form, including a mock or prototype; following the rules above while writing doesn't replace checking them. Capture every state of the form in light/dark × desktop/mobile ([../capture.md](../capture.md)): empty, filled with realistic and worst-case values, focus-visible on each control type, open select/combobox, each field's error state, the error summary after an empty submit, an error that has been fixed (message gone), submitting, success, and a server failure (inputs preserved). Then:

- Complete the form keyboard-only: Tab order matches the layout; Enter submits from a text field; focus lands on the first error after an invalid submit.
- On mobile, focus each field: the right keyboard appears (`email`, `tel`, numeric) and the page doesn't zoom.
- Submit with a valid address for each supported country, and compare the submit button's box before and during submitting: same width and height.
- Fill it with the browser's autofill and a password manager; every fillable field fills.
- Paste formatted values (`+44 (0)20 7946 0958`, `GB82 WEST 1234 5698 7654 32`, a padded email) and confirm they're accepted and normalized.
- At 200% zoom and 320px width, labels, errors, and the submit button stay visible without horizontal scroll.
- With a screen reader, each field announces its label, required state, helper text, and error.
