# Terracotta plugin for Claude Code

Teaches an agent to write correct, accessible [Terracotta](https://github.com/lxsmnsyc/terracotta)
code for SolidJS: the component catalogue and part names, subpath imports,
controlled versus uncontrolled state, render props, `as` and prop passthrough,
the `tc-*` styling attributes, `unmount`, transitions, and keyboard and focus
behaviour.

## Install

```
/plugin marketplace add lxsmnsyc/terracotta
/plugin install terracotta@terracotta
```

The skill loads on its own when you are working in SolidJS code that imports
from `terracotta`. Nothing else needs configuring.

## What is in it

| Path | Contents |
| --- | --- |
| `skills/terracotta/SKILL.md` | The conventions every component shares |
| `skills/terracotta/references/recipes.md` | Complete, typechecked examples for the common components |

Per-component reference — key bindings, every prop, worked markup — stays in
[the repository docs](https://github.com/lxsmnsyc/terracotta/tree/main/docs),
which the skill links to rather than duplicating.

## Versions

This plugin documents **Terracotta 2.x**, which needs Solid 2 (`solid-js` and
`@solidjs/web` at `^2.0.0-rc.0`). It notes where Terracotta 1.x on Solid 1
differs — chiefly that 1.x has a package root entry, so `import { Dialog } from
'terracotta'` is correct there.

Every export name and code sample was taken from the built package and
typechecked against it, not written from memory.
