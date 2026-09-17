# Terracotta plugin for Claude Code

Teaches an agent to write correct, accessible [Terracotta](https://github.com/lxsmnsyc/terracotta)
code for SolidJS: the component catalogue and part names, subpath imports,
controlled versus uncontrolled state, render props, `as` and prop passthrough,
the `tc-*` styling attributes, `unmount`, transitions, and keyboard and focus
behaviour.

## Install

```text
/plugin marketplace add lxsmnsyc/terracotta
/plugin install terracotta@terracotta
```

The skill loads on its own when you are working in SolidJS code that imports
from `terracotta`. Nothing else needs configuring.

## What is in it

| Path                            | Contents                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `skills/terracotta/SKILL.md`    | The API shape and the conventions every component shares. Hand-written, and the only part not in the docs. |
| `skills/terracotta/references/` | The prose the documentation site is built from, so per-component detail is available offline.              |

The reference tree is **generated**, not maintained by hand: `pnpm skill:sync`
copies `docs/content` into it, dropping the site's demo directives and writing
an index from its `nav.json`. The same command rebuilds the component catalogue
inside `SKILL.md`, between its `catalogue` markers, from each page's anatomy
sample and the names its component folder exports. `pnpm skill:check` fails when
either is stale. Edit `docs/content`, never the copy.

## Versions

This plugin documents **Terracotta 2.x**, which needs Solid 2 (`solid-js` and
`@solidjs/web` at `^2.0.0-rc.0`). It notes where Terracotta 1.x on Solid 1
differs — chiefly that 1.x has a package root entry, so `import { Dialog } from
'terracotta'` is correct there.

Every export name in `SKILL.md` was taken from the built package rather than
written from memory.
