# Capture

A Capture is a set of screenshots of the target across the **Capture Matrix**. It exists so you judge what actually renders, not what you assume the code does.

| | Desktop (1440×900) | Mobile (390×844, touch, DPR 2–3) |
|---|---|---|
| **Light** | desktop-light | mobile-light |
| **Dark** | desktop-dark | mobile-dark |

## When to capture

| Moment | Purpose |
|---|---|
| Before a Critique | Evidence for every score |
| Before a Polish | Baseline ("before") for diagnosis |
| Before a Design | Redesign: baseline ("before") of the target. Fresh: the neighboring screens, if any |
| After a Polish or Design, before the final reply | Verification ("after"); fix what it shows, then re-capture **once** |

Don't screenshot after every small tweak. Batch fixes, then look again.

## Step 1: Resolve something renderable

Start from the resolved target (URL, screenshot, file path, or feature name; see SKILL.md → Target).

- **URL**: use it.
- **Feature name**: capture each route where the feature lives. For multi-step flows, capture every key step.
- **File path**: capture the route or story that renders the file. Scope the capture to its selector if the file is a component.
- **Local project**: find the running dev server (check terminal output, `package.json` scripts, common ports 3000/5173/4321/8080). If none runs, start it in the background with the project's own dev script and wait until it responds. Stop it when you finish if you started it.
- **Static HTML file**: use `file:///absolute/path.html`.
- **Component**: capture the route/story/page that renders it (Storybook, a docs page, or the page using it). Scope screenshots to the component's selector when possible.
- **Screenshot**: it *is* the Capture for the cells it covers. Note the missing cells. If you can find and run the matching code, capture the remaining cells yourself; otherwise ask for them only if they matter to the verdict. During `polish` and `design`, the after-Capture must come from the running code, not from the screenshot.

## Step 2: Pick a capture tool (first available wins)

1. **Browser tool in your harness**: Claude in Chrome, ChatGPT in Chrome / ChatGPT agent browser, `agent-browser`, Playwright MCP, Chrome DevTools MCP, or any equivalent. Search your tool list for "browser", "screenshot", "chrome", or "playwright".
2. **Bundled script**:
   ```bash
   node <skill dir>/scripts/capture.mjs <url> --out .pristine/captures/<label>
   ```
   Options: `--selector "<css>"` to scope to a section, `--full` for full-page, `--wait <ms>` for late content, `--zoom 4` to render at 4× pixel density (use with `--selector`), `--dark-class dark` (or `--dark-attr data-theme=dark`) when dark mode is toggled on `<html>` rather than by `prefers-color-scheme`, `--state hover|focus|active` with `--selector` to capture an interaction state, `--pad <px>` to widen a scoped shot so a tooltip or menu outside the element is included, and `--label before|after`. The script finds Playwright in the project or installs it into a user cache. It writes four PNGs and a `capture.json` with each cell's visible background colour and luminance, whether dark differs from light, and whether dark actually applied (`dark.applied`).
3. **Ask the user** for screenshots of the missing cells. Name exactly which ones.

Never silently skip. If every route fails, say so in the report: **"Not visually verified: <reason>"**, and lower your confidence accordingly.

**Say "verified" only for what you checked under the user's real conditions:** the current build (not a stale bundle or an old dev server), a warm cache like a returning visitor's, and the theme and device mechanism the user actually uses. Anything else gets named for what it was: "checked in the dev server with a cold cache", "checked from the code, not rendered".

## Step 3: Drive each cell

With a harness browser tool:
- **Viewport**: set it to 1440×900, then 390×844. If the tool can't resize, use device emulation, or a narrow window.
- **Theme**: emulate `prefers-color-scheme: dark` (DevTools emulation), or flip the site's own theme toggle, or the class from DESIGN.md / code (`html.dark`, `[data-theme="dark"]`).
- **Confirm dark actually applied** before judging a dark cell. Read the computed background colour of the visible page (`getComputedStyle(document.body).backgroundColor`, or the topmost opaque element at the viewport centre): its relative luminance must be ≤ 0.4 and differ from the light cell. If it's still light, the toggle didn't take (a theme script may have overwritten it, or the site uses another mechanism); fix the toggle and re-capture, never judge a light screenshot as dark. The bundled script does this check and warns.
- Scroll top to bottom once so lazy content and scroll-triggered animations settle, then capture. Capture full page when the target is a page; capture the element when the target is a section. Scroll with `behavior: "instant"` and confirm `scrollY` is back at 0 before a full-page shot: on pages with `scroll-behavior: smooth`, a plain `scrollTo(0, 0)` animates, and the shot shows the sticky header covering the content, which is not a real bug.
- **Wait out deliberate delays.** Tooltips, hover cards, and menus often open after a delay (some libraries default to 600ms or more). Before calling a hover state missing, read the component library's default delay or the props in the code, wait longer than that, and check the DOM for the opened element.
- **Wait for hydration before interacting.** Components that hydrate when scrolled into view ignore early clicks. Scroll the element into view, then wait for a hydration signal (an attached handler, a removed `data-pending` or skeleton, or `networkidle` plus a short settle) before clicking or recording.
- **Wait for layout to settle before judging.** Content that is still growing (fonts, images, data, expanding animations) looks cut off. Before calling something clipped or overflowing, measure it: compare `getBoundingClientRect()` / `scrollHeight` against `clientHeight` twice, a few hundred ms apart. A bug is what is still wrong once the numbers stop changing.
- **Freeze motion to capture it.** Element screenshots land too late, and slowing playback is unreliable. Pause every animation at the frame you want, then capture:
  ```js
  document.getAnimations().forEach(a => { a.pause(); a.currentTime = 120; });
  ```
  Take 2–3 frames (start, middle, end) to judge an animation's path. CSS transitions and animations both show up in `getAnimations()`.
- **Zoom in on small things.** The Capture Matrix sizes are whole-page layouts; a 12px status dot, icon, badge, or focus ring can't be judged from them. Take a zoomed pass of each small element that matters to the verdict, scoped to it, at 3–4×: `--selector "<css>" --zoom 4` with the bundled script, or the browser tool's device-scale/zoom setting plus an element screenshot. Judge shape, alignment, anti-aliasing, and contrast from the zoomed shot, and size and weight from the normal one.
- **Capture the cramped places too.** Small containers (preview cards, sidebars, popovers, embedded widgets, a 208px-tall card) need their own scoped pass at their real size; a full-page shot hides their clipping.
- **Watch live surfaces for movement.** If the surface polls or refreshes in the background (progress, sync status, live counts), keep it open for 10–15 seconds with no input and sample the top offset of the main list or table every frame (`getBoundingClientRect().top` in a `setInterval` of 16ms). Confirm at least one background request actually happened: count calls by wrapping `window.fetch` *after* load, because in-page mocks replace `fetch` and the network tab never sees them. Any change in offset, or any status text that flashes in and out, fails **Background work never moves the page** ([craft-floor.md](craft-floor.md)). Still screenshots can't catch this.
- **Capture interaction states.** For each kind of interactive element on the surface (button, link, chip, row, input), capture rest, hover, pressed, and focus-visible, plus any tooltip, menu, or error state it has. With the bundled script: `--selector "<css>" --state hover --pad 48 --zoom 3`. A state you didn't capture can't be scored ([critique.md](critique.md) → Calibration).
- **Chat needs a lifecycle capture, not just a route capture.** In each Capture Matrix cell, inspect the first-send wait, first text chunk, growing reply, completed reply and interrupted/error state. Also exercise restored sends, delayed history, stream reconnection and conversation switching. Apply the [conversation lifecycle checks](craft-floor.md#conversation-lifecycle). Hold later chunks and completion at the transport, not with a visual typing timer. Label synthetic transport evidence separately from a real provider run; neither a polished empty screen nor a final-response fixture verifies streaming.

## Step 4: Decide which cells exist

- **Dark mode**: exists if the site responds to `prefers-color-scheme`, has a theme toggle, or DESIGN.md declares one. If not, record "dark: not supported" and don't invent it. Missing dark mode is a finding only when Personas or DESIGN.md expect it.
- **Mobile**: always exists on the web. A broken mobile layout is a finding, not a reason to skip.

## Step 5: Look properly

For each image, check before writing anything: first-glance focal point, hierarchy, alignment, spacing rhythm, text overflow/wrapping, contrast, cut-off or overlapping elements, horizontal scroll on mobile, theme-specific bugs (invisible borders, unreadable text, images with white boxes in dark).

**Unasked-for error states are bugs, not states.** If a capture shows an error, "could not load", or empty state that the scenario didn't ask for, stop: find the failing request (console, network, mock handler) and fix the data or route before scoring. Then capture the success state with realistic data. Never score a section that you have only seen failing or empty.

Keep screenshots under `.pristine/captures/` (suggest adding `.pristine/` to `.gitignore`). Reference them by path in reports.
