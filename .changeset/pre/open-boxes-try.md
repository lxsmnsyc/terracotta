---
'terracotta': major
---

Support Solid 2.0. Solid 1.x is no longer supported. Use `terracotta@1` with Solid 1.x; that line lives on the `1.x` branch.

- `solid-js` and `@solidjs/web` `^2.0.0` are now peer dependencies.
- Each component has its own entry, such as `terracotta/dialog` or `terracotta/listbox`. The root `terracotta` import is gone.
- There is no CommonJS build any more.
