---
'terracotta': major
---

Ship the components as JSX instead of compiled JavaScript.

- Every entry now resolves to a `.jsx` file under both the `solid` and `default` conditions.
- Your app's Solid compiler builds Terracotta for your target, so the same package works for client and server rendering.
- A bundler that does not run Solid's JSX compiler on dependencies can no longer import the package. `@solidjs/vite-plugin` does this by default.
