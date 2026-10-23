# pristine site

The showcase for the `pristine` skill, built with the skill itself. Design context lives in `DESIGN.md`.

```sh
npm install
npm run dev        # http://localhost:4321
npm run shots      # re-capture every demo's before/after into public/shots (needs a build-able tree)
npm run build      # static output in dist/
node scripts/og.mjs # regenerate public/og.png (social card)
```

## Pages

- `/` home: commands, examples, built with Pristine (Sprout), how it judges, the 20 laws in five groups, install
- `/docs/` command reference; `/docs/<command|lens>` one page per command and Lens with prompts to try (data in `src/data/docs.ts`)
- `/404` branded not-found page
- `/examples/<slug>` critique, scorecard and Before/After/Why for one example
- `/demo/<slug>/before|after` the live demo pages (noindex)

Add an example: write `src/pages/demo/<slug>/{before,after}.astro` and `src/data/examples/<slug>.json` (shape in `src/data/schema.ts`), then `npm run shots <slug>`.

`public/shots/sprout/*.webp` are element captures of the live demos on sprout.tulipfarm.ai (light and dark, 846×560); they are not produced by `npm run shots`.

## Deploy (Cloudflare Pages)

Git integration: build command `npm run build`, output directory `dist`, root directory `site`.

Direct upload: `npm run build && npx wrangler pages deploy dist --project-name pristine`.
