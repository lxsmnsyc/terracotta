---
'terracotta': patch
---

`Dialog` only sets `aria-labelledby` and `aria-describedby` while a `DialogTitle` or `DialogDescription` is mounted, and no longer sets `aria-disabled` or `disabled`.
While open, everything outside the dialog is `inert`, and a `DialogPanel` with nothing focusable focuses itself so Escape works.
A closed dialog kept with `unmount={false}` is `inert` and `aria-hidden`, and drops `aria-modal`.
