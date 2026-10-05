---
'terracotta': patch
---

When no enabled tab is selected, the first enabled `Tab` is now in the tab order.
Pressing a `toggleable` tab no longer deselects it right away, and leaving a tab no longer changes the selection.
A `Tab` sets `aria-controls` only while its panel is in the DOM, and `TabGroup` no longer sets `aria-disabled` or `disabled`.
