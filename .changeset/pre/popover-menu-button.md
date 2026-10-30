---
'terracotta': patch
---

A `Popover` holding a `Menu` now follows the menu button pattern.
- Opening it focuses the first menu item.
- With `aria-haspopup="menu"` on the button, Down and Up open it on the first and last item.
- Tab and activating a menu item close it.
