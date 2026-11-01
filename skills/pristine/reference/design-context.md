# Design context

A project can have more than one `DESIGN.md`: one at the repo root, one per app or package in a monorepo, one beside a component or feature directory. In every playbook and Lens, "DESIGN.md" means the **merged chain** that applies to the target, not only the root file.

## Resolve the chain

Run this once per command, after resolving the target, on every source file or directory in it:

```bash
node <skill dir>/scripts/design-context.mjs <target files or dirs>
```

For each path it prints, lowest precedence first:

1. Every file named exactly `DESIGN.md` (uppercase; a lowercase `design.md` is usually unrelated docs) from the repo root (nearest `.git`; without one, the current directory) down to the path's directory.
2. Any file named on an `Extends:` line in the first 30 lines of one of those files, placed just before the file that extends it. Use this for a shared design-system package that isn't an ancestor, e.g. `> **Extends:** [packages/ui](../../packages/ui/DESIGN.md)`.

For a directory target it also lists **nested** `DESIGN.md` files below it. Each one governs only the files in its own subtree; apply it when you judge or edit those files, not the rest of the target.

A target that doesn't exist yet (a new file for `design`) resolves from its nearest existing parent directory.

## Merge rules

Read every file in the chain, in order. Then:

- **Nearest wins, per item.** A token, Persona, rule, or Constraint defined in a later file overrides the same item from an earlier one. Match tokens by name (`--color-accent`), Personas by name, sections by heading.
- **Everything else is inherited.** A section, token, or Persona the nearer file doesn't mention comes from the earlier files unchanged.
- **Explicit removal only.** A nearer file drops an inherited item only by saying so (e.g. "Personas: replaces root", "No dark mode in this package"). Silence never removes anything.
- **Constraints only tighten by default.** A nested file can raise the bar (AAA, smaller budget) on its own. Loosening an inherited Constraint needs a stated reason in that file; without one, keep the stricter value and report the conflict.
- **A target spanning several chains** (files in two packages) is judged per file against its own chain. List the chains in the report and flag any shared component whose chains disagree on the same token.

If the chain is empty, fall back as the playbook says (code as the Design System, fallback Personas) and offer `/pristine init`.

## Report it

At the top of every report, under the resolved target, list the chain: `Design context: DESIGN.md → packages/ui/DESIGN.md → apps/web/DESIGN.md`. Name which file each cited token or Persona came from when the chain has more than one file.

## Write to the right file

When a command adds or changes a token, rule, or Persona, edit the **nearest file in the chain whose scope matches the change**:

- Used only inside one app, package, or component directory: that directory's `DESIGN.md`. Create it if absent, holding only the overrides and a one-line scope note; never copy inherited sections into it.
- Shared across the repo or by a design-system package: the file that already defines the item (the root or the `Extends:` target).
- Never change an ancestor to fix one package; override it in the nearer file instead.
