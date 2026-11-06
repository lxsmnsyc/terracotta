---
'terracotta': patch
---

The arrow keys, Home and End now only navigate when focus is on an `AccordionButton`, so inputs inside a panel work.
`AccordionPanel` has `role="region"`, and an open section that cannot be closed reports `aria-disabled="true"` on its button.
`AccordionButton` keeps `aria-controls` while its panel stays mounted, and `Accordion` and `AccordionItem` no longer set `aria-disabled` or `disabled`.
