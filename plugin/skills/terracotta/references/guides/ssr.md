<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Server-side rendering

Rendering is SSR-safe. The DOM work happens in effects, and effects do not run
on the server.

That means a component renders its markup and ARIA attributes on the server,
then wires up event listeners, focus handling and measurements once it hydrates
in the browser.

## `ColorSchemeProvider`

`ColorSchemeProvider` is the one to keep in mind. It reads `localStorage` and
mutates `document.documentElement`, both from effects. It renders on the server
without error, but takes effect only in the browser.

The consequence is a flash. The server cannot know the visitor's saved scheme,
so the first paint uses whatever your CSS defaults to, and the provider corrects
it after hydration. The fix is a small inline script in your document head that
reads the same `theme-preference` key and sets the class before the first paint.
See
[avoiding the first-paint flash](../components/color-scheme.md#avoiding-the-first-paint-flash).
