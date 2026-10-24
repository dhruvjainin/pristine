# Pattern: worst-case data

Demo data is chosen, usually without anyone noticing, to make a design look good: names that fit one line, counts with no separator, every optional field filled. Real users break it. Use this when hardening any component that renders data, and in Critique when judging Robustness.

## Rules

1. **Plausible or schema-backed, never random.** `"aaaaaaaa…"` proves nothing. Use values a real user could produce, or the actual limit from the validation schema, DB column, or API type. No limit found? That's a finding ("unbounded").
2. **Change the data, not the component.** Swap the fixture, mock, or props at the same boundary demo data enters. Never hand-edit markup to fake a break.
3. **Spread failures across rows.** Row 1 long name, row 2 long email, row 3 one-letter name: the first screenful is what users see.
4. **Also test Empty, One, and Huge** (0 items, exactly 1 for plurals, 1,000+ rows).
5. Where you add a dev-only toggle (`?data=worst`) to flip fixtures, it never ships.

## Values that break UI

| Kind | Try | Breaks |
|---|---|---|
| Long name | `Aleksandra Wiśniewska-Kowalczyk`, `Christopher Alexander Montgomery III` | Wraps, overflows rows, naive initials (`CI`) |
| Short name | `Jo`, `J` | Empty-looking columns, tiny click targets |
| Non-Latin / diacritics | `Đặng Thị Ngọc Hân`, `王秀英`, `نور الهدى` | Clipped by tight line-height, initials logic, RTL alignment |
| Emoji-first | `🦊 Fox`, `👩🏽‍💻 Priya` | `.charAt(0)` gives half a character; use grapheme segmentation |
| Messy spacing / case | `  Sam   Lee `, `dana` | Empty initials, odd gaps, lowercase initials |
| Missing | no name, only email; no avatar | Fallback must exist and match real-avatar size |
| Unbreakable strings | `bartholomew.fitzgerald@northwind-industries-holdings.example.com`, long URLs, UUIDs, `IMG_20250914_183022_HDR.HEIC` | Pushes siblings off the row |
| Long labels | `Senior Product Design Engineer, Platform Infrastructure`, `Benachrichtigungseinstellungen`, translations (+30%) | Badges wrap, buttons overflow |
| Many tags | 12 tags, or one 40-char tag | Tag rows become walls; need `+8` overflow |
| Empty / markup-like | `""`, `   `, `<b>hi</b>`, `&amp;`, newline in a single-line field | Collapsed rows, raw markup, doubled height |
| Numbers | `0`, `1`, `1284`, `1000000`, `-42.5`, `142%`, `null`, `NaN`, live `99→100` | Plurals, separators, overflow, bars past bounds, literal "NaN", width jitter |
| Locale | `1.284` (de) vs `1,284` (en) | Hard-coded separators |
| Collections | 0, 1, page size, page size+1, 1,000+, one item 10× taller, duplicate names | Missing empty state, lonely grid, off-by-one pagination, slow render |
| Time | now, 12 days ago, future, `1970-01-01`, cross-timezone midnight | "0 seconds ago", "-3 days ago", epoch shown as real date |
| Images | 404 URL, panorama/tall image, transparent dark logo on dark mode, slow load | Broken icon, error icon flashing while loading, a different fallback per failure, distortion, invisible logo, layout shift |
| States | loading, API error, partial data, every enum status at once, no permission, current user in list | Mismatched skeletons, raw `TypeError`, misaligned rows, "You" handling |

## Failure signatures → fixes

| You see | Fix |
|---|---|
| Avatar/icon squished into an oval | `flex-shrink: 0` on fixed-size boxes |
| Text overflows its flex/grid cell | `min-width: 0` (grid: `minmax(0, 1fr)`) on the text column |
| Email/URL runs past the edge | `overflow-wrap: anywhere` on that element |
| Trailing action (•••) pushed off-screen | `min-width: 0` on the middle, `flex-shrink: 0` on the action |
| Badge wraps to two lines | `white-space: nowrap; flex-shrink: 0`, and decide what yields instead |
| Avatar adrift beside wrapped text | `align-items: flex-start` once text can wrap |
| Heading breaks mid-word | `overflow-wrap: anywhere`, not `word-break: break-all` |
| Wrong initials | Grapheme-aware (`Intl.Segmenter`), first + last word, icon fallback |
| Orphaned `—` for a missing field | Omit the line, or reserve its space deliberately |
| "1 members" | `Intl.PluralRules` or per-count strings |
| Numbers jitter / columns misalign | `font-variant-numeric: tabular-nums` |
| `1284`, `0.30000000000000004`, `NaN` | `Intl.NumberFormat` with the user's locale; guard null |
| Translated button overflows | Content width with `min-width`, never fixed `width` |
| Diacritics clipped | Looser `line-height`, no `overflow: hidden` on text |
| Broken image icon | `onError` → initials; `object-fit: cover`; `aspect-ratio` set |
| Ellipsis with no way to read the rest | `title`/tooltip plus the full value in a detail view |
| 1,000 rows stutter | Virtualize or paginate |
| Raw `<b>` / `&amp;` / `**text**` | Escape once, at render |

## Truncate, wrap, or clamp: decide per field

- **Wrap** what identifies something (names, titles in detail views). Two lines is fine; four means the column is too narrow.
- **End-truncate** secondary metadata where the start carries meaning (role, preview), and give a way to see it all.
- **Middle-truncate** things that differ at the end: file names, paths, hashes, emails sharing a domain.
- **Clamp** (`line-clamp: 2`) card previews so heights stay predictable.
- **Never truncate** numbers, amounts, or dates people compare.

## Check it in

The component's real container width (a sidebar is not a page), 320px, the widest layout, browser zoom 200%, dark mode, `dir="rtl"` if supported, and touch (hover-only actions are unreachable). Report each break as **Broken** (unreadable, unreachable, wrong data), **Ugly** (readable but visibly wrong), or **Fragile** (fine now, one realistic step from breaking), plus what held up.
