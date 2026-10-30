---
'terracotta': patch
---

`Toaster` is now the live region, with `role="status"` and `aria-live="polite"`, so a toast added to it is announced.
`Toast` no longer has a live role of its own. Keep the `Toaster` mounted while it is empty.
