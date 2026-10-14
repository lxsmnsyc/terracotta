---
'terracotta': patch
---

`Toolbar` now uses a roving tabindex, so Tab and Shift+Tab enter and leave it in one step.
The toolbar element is no longer focusable, and only the last focused control, or the first enabled one, is in the tab order.
