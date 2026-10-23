# Contributing

Thanks for helping. Pristine is a prompt, so most changes are edits to Markdown. Small, specific changes land fastest.

## Reporting a problem

Open an issue with the **Bug** template. Include:

- what you ran, and the part of the session where it went wrong
- the harness (Claude Code, Codex, Copilot, Cursor...) and how you installed
- the model and effort level
- what it should have done, and which line of `SKILL.md` or a reference file says so (if any)

A screenshot of the page it judged helps a lot.

## Changing the skill

- `skills/pristine/SKILL.md` stays short. It routes to reference files; detail belongs in `reference/`.
- One idea per change. If a rule came from a real session, say what happened in the PR.
- Write rules as instructions an agent can check: a value, a selector, a threshold. Avoid taste words without a test.
- Don't add a new command. New behaviour usually belongs in a Lens or a pattern file.
- Keep the scripts dependency-free apart from Playwright, which `capture.mjs` installs on demand.

Try your change on a real page before opening the PR, and paste the before and after.

## Working on the site

```bash
cd site
npm install
npm run dev     # http://localhost:4321
npm run build
npm run shots -- <slug>   # recapture a demo's screenshots
```

See [site/README.md](site/README.md) for adding an example.

## Checks

CI validates the plugin manifests and the skill frontmatter, runs `scripts/detect.mjs` on the site, and builds the site. Run the same locally:

```bash
node skills/pristine/scripts/detect.mjs $(find site/src -name '*.astro' ! -name before.astro) site/src/styles
cd site && npm run build
```

By contributing you agree your work is licensed under [Apache-2.0](LICENSE).
