# Harden

Harden is about whether the design survives real life: real names, real networks, real languages, real people using a keyboard or a screen reader. Harden does not restyle; a designer tries hard to break the existing design, then makes every broken case look intentional.

**Raises:** Robustness & performance, Accessibility.
**Skip it when:** the happy path itself is unclear or ugly; fix that first with layout, typeset, or clarify.

## What a designer looks at

The Capture usually shows perfect data. Look at it, then actively try to break it. Capture each case you test. Use plausible extremes the schema allows (read field limits and optional fields first), never "aaaa"; the catalog is in [../patterns/worst-case-data.md](../patterns/worst-case-data.md).

**1. Paste a 200-character name.**
- Paste a long unbroken string (100+ characters, no spaces), a 1-character name, a long hyphenated or diacritic-heavy name, emoji-first names, accented, CJK, and RTL text, and unbreakable emails, URLs, and IDs. Does anything overflow, clip, or push a button off screen? If yes, a container has a fixed width or a flex child is missing `min-width: 0`.
- Where text is truncated, can the user still read the full value somewhere? Did truncation make two items identical (files, hashes, emails that differ only at the end)? Is a number, amount, or date truncated?
- Do avatars squish into ovals, badges wrap onto two lines, or trailing actions (••• menu) get pushed off the row? Does an avatar centered beside a 3-line name look adrift? Are tall scripts (Thai, Vietnamese) clipped top or bottom? Does raw `<b>`, `&amp;`, or `**markdown**` show?
- Are initials right for "Jo", "… Montgomery III", and a name starting with an emoji?
- Try numbers: 0, negative, 1,000,000,000, many decimals, different currencies, `null`, `NaN`. Do columns hold? Do you see "1 members", raw `1284.000000001`, or "undefined"? Do relative times ("just now", "3 days ago", a date) switch at sensible thresholds?
- Remove avatars and images, break their URLs, and use odd aspect ratios. Is there a designed fallback (initials or neutral placeholder), or a broken image or stretched photo?
- Leave optional fields empty (partial data): do orphaned "—" or blank lines appear? Show every enum status at once, and the current user inside the list.

**2. Empty the database, then overfill it.**
- With 0 items, is there a blank area, or an explanation and a next action? First use, no results, filters, and no permission are different empty states.
- With 1 item, exactly a page size and page size + 1, and 1,000+ items, does the list still look designed? Does a select with 50+ options stay usable?

**3. Unplug the network.**
- Go offline, throttle to slow 3G, force a timeout. Does loading show nothing, or shift the layout when content arrives?
- Force 400/401/403/404/409/429/500 responses. Does each say something useful, or a generic "Error occurred" or a raw stack trace?
- When one widget fails, does the whole page blank? Is the user's typed input still there after an error?

**4. Be impatient.**
- Double-click submit. Does it fire twice?
- Type fast in search: does it fire a request per keystroke? Do stale results overwrite fresh ones?
- Edit the same item in two tabs. Start a drag and alt-tab away mid-drag: does the next interaction still work without reload?
- Type input the way people really do: a phone number with spaces or dashes, a card number pasted with spaces, an email with a trailing space or capitals, a date as "21/10" or "Oct 21", a pasted value with line breaks. Is anything rejected that the system could have normalized?

**5. Try German and Arabic.**
- Add 30–40% to every label. Do buttons break?
- Switch to RTL (Arabic, Hebrew). Does the layout mirror correctly? Do back/forward arrows point the right way? Are dates, numbers, currencies, and plurals formatted for the locale, or hand-built ("1 items")?

**6. Do a keyboard-only pass.** Put the mouse away.
- Can you reach and operate everything? Do you get trapped anywhere? Is there a skip link on long pages?
- Open a dialog: does focus move in, stay in, and return to the trigger on close? Does `Escape` close it?
- Turn on a screen reader: are async results, toasts, and errors announced? Is each error tied to its field?
- Zoom to 200% and turn on forced colors (Windows High Contrast). Do borders, icons, and focus still show? Check no-JavaScript too for content pages.

**7. Hit destructive actions.** Is delete/remove styled semantic red, and does it confirm (naming the object) or offer undo?

**8. Change who you are.** Log in as read-only, no access, and with an expired session. Do you see broken controls, or a clear explanation of what you can't do and who can grant it?

**9. Change the environment.** Render in the component's real container width (not only full page), at 320px and the widest screen, at 200% zoom, in dark mode, in RTL, and with touch only (hover-only actions are unreachable). Turn on reduced transparency and increased contrast: do translucent surfaces and faint borders still hold?

Before editing, read the Personas' locales, devices, connection quality, and roles in DESIGN.md, and build the stress list for this target. Map each field (source, type, schema limit, optional?) first, then swap the data at the fixture boundary (a dev-only `?data=worst` switch or fixture file), never by editing the markup.

## How to fix

1. **Read DESIGN.md**: Personas' locales, devices, connections, and roles/permissions; the Design System's state tokens and components (error, empty, skeleton).
2. **Overflow and wrapping:**
   - `min-width: 0` on flex/grid children holding text;
   - `overflow-wrap: anywhere` on user-generated strings and URLs;
   - single-line truncation with `text-overflow: ellipsis` plus the full value in a `title` or tooltip;
   - multi-line clamp with `line-clamp: 2–3` only where a detail view exists;
   - decide per field: **wrap** identifying text (names, titles); **end-truncate** secondary metadata (role, preview); **middle-truncate** values that differ at the end (file names, hashes, paths, shared-domain emails); **clamp** card previews; **never truncate** numbers, amounts, or dates;
   - no fixed widths on buttons or text containers; allow 30–40% expansion for translations.
   **Failure signature → fix:**
   - squished avatar or icon → `flex-shrink: 0`;
   - text overflowing in flex/grid → `min-width: 0` (grid: `minmax(0, 1fr)`);
   - trailing action pushed off → `min-width: 0` on the middle, `flex-shrink: 0` on the action;
   - wrapped badge → `white-space: nowrap; flex-shrink: 0`, and decide what yields instead;
   - avatar adrift beside wrapped text → `align-items: flex-start`;
   - tall scripts clipped → looser `line-height`, no `overflow: hidden` on text boxes;
   - mid-word breaks in headings → `overflow-wrap: anywhere`, not `word-break: break-all`;
   - ellipsis with no way to read the value → `title`/tooltip plus the full value in a detail view;
   - raw HTML or markdown in data → escape once at render; never inject user data as HTML;
   - wrong initials → first + last word via grapheme clusters (`Intl.Segmenter`), icon fallback;
   - missing optional field → omit the line or reserve its height on purpose.
3. **States, using Design System components:**
   - **loading:** skeletons matching final layout dimensions (no CLS); spinner only for small inline actions; show text after ~1s ("Loading invoices…");
   - **empty:** explain why (first use, no results, filters, no permission) and offer the next action;
   - **error:** inline near the cause, preserve user input, offer retry; do not blank the whole page when one widget fails;
   - **partial:** show what loaded and mark what failed;
   - **missing media:** fallback avatars (initials or neutral) and image placeholders with fixed dimensions; `object-fit: cover` plus `aspect-ratio` for odd-shaped images; fall back on load error, not only on a missing URL;
   - **feedback channel:** field and section errors inline; transient errors, warnings, and background results as toasts (announced).
4. **Map API errors:** 400 → field errors; 401 → re-auth preserving work; 403 → explain permission and who can grant it; 404 → not-found state with a way back; 409 → conflict resolution; 429 → wait time; 5xx → retry + support path.
5. **Concurrency:** disable and show progress on submit buttons during requests; debounce search (~300ms); abort stale requests; optimistic updates roll back visibly on failure.
6. **i18n:** logical properties (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror directional icons under `[dir="rtl"]`; `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.PluralRules`, `Intl.RelativeTimeFormat` instead of hand formatting; guard `null`/`NaN` before formatting; `lang` attribute set.
7. **Accessibility edge cases:** focus trapped inside open dialogs and returned to the trigger on close; `Escape` closes overlays; `aria-live="polite"` for async results and toasts, `role="alert"` for blocking errors; errors linked with `aria-describedby` and `aria-invalid`; skip link on long pages; works in forced-colors mode (use `currentColor`, keep borders); `prefers-reduced-transparency: reduce` solidifies translucent surfaces (raise opacity, drop `backdrop-filter`); `prefers-contrast: more` gets solid backgrounds and defined borders.
8. **Gestures:** on drag controls, handle `pointercancel`, `lostpointercapture`, and window `blur` by clearing drag state; the next interaction must work without reload.
9. **Destructive actions:** semantic red, plus a confirmation naming the object and consequence, or undo when recovery is possible. Prefer undo for slips; reserve confirmation dialogs for truly destructive, irreversible actions, because confirming everything trains click-through.
10. **Validate on the client for speed and on the server always.** Be liberal in what you accept and strict in what you store and show (Postel's law): trim whitespace, accept separators in phone, card, and ID numbers, parse common date formats, accept paste; normalize on save and display the normalized value. Reject only what can't be normalized, and say how to fix it.
11. **Add any new state component or token to DESIGN.md.**

## Rules
- [ ] 100-character unbroken string does not overflow any container.
- [ ] Stress data is schema-plausible and swapped at the fixture boundary; every field has a deliberate wrap/truncate/clamp choice; numbers, amounts, and dates are never truncated.
- [ ] Avatars, icons, badges, and trailing actions keep their size and stay reachable with the longest content.
- [ ] 0, 1, page size, page size + 1, and 1,000+ items hold; every enum status renders.
- [ ] Every data view has loading, empty, error, and success states Captured.
- [ ] Skeletons match final layout (CLS < 0.1).
- [ ] User input survives validation and network errors.
- [ ] Submit cannot fire twice.
- [ ] Inputs accept spaces, separators, casing, and paste the system can normalize; stored and displayed values are normalized.
- [ ] Missing avatars and images fall back cleanly; 0 items and huge numbers hold.
- [ ] Destructive actions are red and confirmed or undoable.
- [ ] Every API error status maps to a specific, recoverable state.
- [ ] RTL layout mirrors correctly using logical properties.
- [ ] Dates, numbers, currencies, plurals use `Intl`.
- [ ] Dialogs trap and restore focus; `Escape` closes them.
- [ ] Async updates are announced to screen readers.
- [ ] Usable at 200% zoom and in forced-colors mode.
- [ ] Reduced-transparency and increased-contrast preferences produce solid, bordered surfaces.
- [ ] Confirmations only for irreversible actions; everything else undoable.

## Avoid
- Generic "Error occurred" or raw stack traces.
- Blocking the whole interface for one failed widget.
- Fixed-width text containers and English-length assumptions.
- `${count} item${count !== 1 ? 's' : ''}` style pluralization.
- Spinners in the middle of content that cause layout jumps.
- Trusting client-side validation alone.
- "aaaa" or lorem ipsum as stress data; editing markup to fake a case instead of changing the fixture.
- End-truncating values that only differ at the end; `word-break: break-all`.
- Confirmation dialogs on routine, reversible actions.

## Verify in the Capture Matrix
- Capture each stress case in light/dark × desktop/mobile; error and empty states must be designed in both themes, not just light.
- **Mobile light/dark:** long strings and translated labels at 320px; error messages visible when the keyboard is open.
- **Desktop and mobile dark:** error, warning, and success colors keep ≥ 4.5:1 for text and ≥ 3:1 for icons.
- State which cases were tested with real data, mocks, or throttling and what stayed untested. Robustness & performance and Accessibility should rise.
