---
'terracotta': patch
---

Skip elements hidden by `visibility: hidden` when looking for something to
focus.

`checkVisibility()` only rules out what is not rendered at all unless it is
asked for more, so an element left in the layout by `visibility: hidden` was
still offered to a panel as a focus target. The browser refuses to focus it, so
focus stayed where it was.
