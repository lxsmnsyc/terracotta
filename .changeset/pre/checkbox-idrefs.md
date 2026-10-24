---
'terracotta': patch
---

`CheckboxIndicator` now sets `aria-labelledby` and `aria-describedby` only when `CheckboxLabel` and `CheckboxDescription` are rendered, and your own values take precedence.
The `Checkbox` root no longer carries `aria-disabled` or `disabled`.
