---
'terracotta': patch
---

`ContextMenuPanel` now focuses the first menu item when it opens, and closes on Tab or when a menu item is activated.
The boundary and root no longer carry `aria-expanded`, `aria-disabled` or `disabled`, which are not allowed on elements without a role.
