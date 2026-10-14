---
'terracotta': patch
---

Ctrl+Home and Ctrl+End in a `Feed` now move focus to the elements before and after `FeedContent`.
`FeedArticle` sets `role="article"`, so it keeps the role with `as="div"`.
The feed and its articles set `aria-labelledby` and `aria-describedby` only when the label and description parts are rendered.
