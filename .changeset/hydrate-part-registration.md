---
'terracotta': patch
---

Fix hydration of components with labels or descriptions, such as `RadioGroup` and `Checkbox`. Their parts registered a reactive owner on the client but not on the server, which shifted every hydration key after them and halted the page.
