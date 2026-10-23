# Working in this repo

This repo ships one agent skill, `skills/pristine`, and its showcase site, `site/`.

## Rules

- The skill must not name or credit outside sources (other skills, authors, videos, courses). Write rules in our own words. CI doesn't check this; reviewers do.
- `SKILL.md` stays short and routes to `reference/`. Put detail in the reference, Lens or pattern files.
- Write rules an agent can verify: a value, a selector, a threshold. No taste words without a test.
- Four commands only: `init`, `critique`, `design`, `polish`. New behaviour goes in a Lens or a pattern.
- Scripts in `skills/pristine/scripts/` use Node built-ins only; `capture.mjs` installs Playwright into `~/.cache/pristine-capture` on demand.
- When you change the skill, bump `version` in `.claude-plugin/plugin.json` and add a matching `## <version>` section at the top of `CHANGELOG.md`.
- The `site/src/pages/demo/*/before.astro` pages are deliberately bad. Don't fix them, and don't copy patterns from them.
- The site follows `site/DESIGN.md`. Use `/pristine` on site changes and capture light/dark × desktop/mobile before calling them done.

## Checks

```bash
node scripts/validate.mjs
node skills/pristine/scripts/detect.mjs $(find site/src -name '*.astro' ! -name before.astro) site/src/styles
cd site && npm run build
```

Site-specific notes: `site/AGENTS.md`.
