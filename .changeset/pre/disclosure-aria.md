---
'terracotta': patch
---

The `Disclosure` root no longer sets `aria-disabled` or `disabled`, which do not apply to a plain container. It still sets `tc-disabled`.
