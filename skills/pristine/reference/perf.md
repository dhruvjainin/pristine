# Perf

Make a page load and move faster until it meets a goal. Measure under fixed network and device conditions, fix one bottleneck at a time, re-measure, keep only what wins. Edits code.

The optimize Lens ([lenses/optimize.md](lenses/optimize.md)) is one pass inside polish. Perf is a loop with a goal and a stop rule.

## Step 1: Set the goal

Turn the request into a goal you can check. Write it to `.pristine/perf/goal.md`:

- **Metric**: initial load (FCP, LCP, ready), transitions (click to content), or both.
- **Conditions**: networks (`slow3g`, `fast3g`, `4g`, `none`), devices (`mobile`, `desktop`), cold (first visit) and warm (return visit).
- **Threshold**: a number ("LCP < 2.5s on fast3g mobile") or a competitor ("faster than example.com in every cell").
- **Ready**: the CSS selector that means "the user can act" (for example `main textarea`). Without it, ready is network quiet after load, which is weaker.

If the user gives no conditions, use `fast3g,4g` × `mobile,desktop` × `cold,warm`. Ask once if the metric or competitor is unclear.

## Step 2: Measure the right build

Never measure a dev server. Build for production and serve it locally, or measure the deployed URL. Pages behind sign-in need a session: pass `--storage state.json` (a Playwright storage state), or `--cdp <port>` to attach to a Chrome the user already runs and is signed in to. Ask before attaching to the user's browser; open and close only your own tabs.

```sh
node <skill dir>/scripts/perf.mjs <url> --compare <competitor url> \
  --network fast3g,4g --device mobile,desktop --mode cold,warm --runs 3 \
  --ready "<css>" --steps "Link label,Other label" --label baseline
```

It prints a table of medians (TTFB, FCP, LCP, ready, spread, TBT, CLS, KB, requests, service worker) and, with `--steps`, warm transition times (URL change / content change, ms). Results go to `.pristine/perf/<label>.json`.

Also measure the live site and the competitor from the user's real network (`--cdp`) at least once. CDN location, TLS and real auth calls only show there; record the CDN edge (for Cloudflare, `/cdn-cgi/trace` `colo=`) for both.

## Step 3: Find the top bottleneck

Name the single largest cost, with evidence from a trace, the network log, or the JSON. Check in this order:

1. **Round trips before the first render**: HTML, then JS, then an auth/session call, then data, in series. Each one costs a full RTT on 3G. Look for waterfalls, redirects, and blocking `await`s before the first paint.
2. **Bytes and file count on the first route**: total KB, JS KB, number of chunks, depth of the import chain. Over 170KB gzip JS on a task UI, or dozens of small chunks, is the usual cold-load cost.
3. **Heavy work on the main thread**: TBT and long tasks; decorative widgets (WebGL, canvas, large animations), big libraries loaded eagerly, layout thrash.
4. **Caching**: hashed assets without long `max-age`, HTML that must hit the network on every return visit, no service worker for the app shell.
5. **Server and edge**: TTFB, CDN edge far from the user, uncompressed responses, no HTTP/2 or HTTP/3.
6. **Transitions**: route code fetched on click, data fetched after mount instead of on intent (hover, focus, pointerdown), spinners where the previous screen could stay.

## Step 4: Fix one thing

Make one change that targets the top bottleneck. Common high-yield fixes:

- Cache the app shell (index.html) in a service worker, stale-while-revalidate, so warm loads skip the network.
- Merge tiny chunks and cut the first-route import graph; load heavy features on demand.
- Start auth and first data reads in parallel with the JS, or render a provisional screen from data saved on the last visit.
- Replace heavy decorative widgets with CSS or a static image.
- Preload route code and data on intent, before the click.
- Long `immutable` caching for hashed assets; compress text responses.
- Move the edge closer to users, or report it when it needs a plan or account change.

Don't change looks, copy, or behavior. Ask before adding a dependency.

## Step 5: Re-measure and decide

Run the same command with the same options and a new `--label`. Keep the change only if the target cells improve by at least 10% and by more than the spread (`±`) of both runs, with no cell getting worse beyond its spread. Otherwise revert it. Log each iteration in `.pristine/perf/goal.md`: the change, the numbers before and after, kept or reverted.

## Step 6: Loop or stop

- Goal met in every goal cell: stop. Run a Capture ([capture.md](capture.md)) to show visuals did not change, run the project's tests, and report.
- Not met: go back to Step 3 with the new numbers.
- Three iterations in a row with no kept change: stop and report the blocker with evidence, and ask the user how to proceed (for example a server, CDN or plan change outside the code).

## Caveats

- Chrome network throttling does not apply to requests a service worker serves or fetches. To measure a service worker, serve the build from a local server that adds a fixed delay instead.
- Chrome does not cache responses from origins with certificate errors. Benchmark on `http://localhost`, not a self-signed HTTPS host.
- Medians of 3 runs hide less noise than you think on real networks. Use `--runs 5` when two results are close.
- Never call paid model APIs or live third-party services in a loop to measure; stub them or measure the shell.

## Report

- Goal and conditions.
- A before/after table of the goal cells, and the competitor if one was set.
- Each kept change, with its gain.
- Anything left, with its evidence and what it needs.
