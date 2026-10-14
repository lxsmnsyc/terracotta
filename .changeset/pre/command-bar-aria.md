---
'terracotta': patch
---

`CommandBar` only sets `aria-labelledby` and `aria-describedby` while a title or description is mounted, and no longer sets `aria-disabled` or `disabled`.
While open, everything outside it is `inert`, and a panel with nothing focusable focuses itself so Escape works.
A closed bar kept with `unmount={false}` is `inert` and `aria-hidden`, and drops `aria-modal`.
