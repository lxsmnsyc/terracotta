---
'terracotta': patch
---

`AlertDialog` only sets `aria-labelledby` and `aria-describedby` while a title or description is mounted, and your own props now override the ones it sets.
While open, everything outside it is `inert`, and a panel with nothing focusable focuses itself so Escape works.
A closed dialog kept with `unmount={false}` is `inert` and `aria-hidden`, and it no longer sets `aria-disabled` or `disabled`.
