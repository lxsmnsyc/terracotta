---
'terracotta': patch
---

Fix a tab switching back when the closing panel holds a `Listbox` (#47).
`Listbox`, `Popover`, `ContextMenu`, `Dialog`, `AlertDialog` and `CommandBar` only move focus back on close or unmount if they were opened.
