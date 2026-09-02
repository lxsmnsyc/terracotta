# terracotta-docs

The documentation site for [Terracotta](https://github.com/lxsmnsyc/terracotta),
the headless UI library for SolidJS.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # dist/client + dist/server
pnpm preview
pnpm lint       # oxlint --type-aware
pnpm format     # oxfmt
pnpm typecheck
```

## Stack

Solid 2 throughout. There is no `@solidjs/start` dependency: on Solid 2 that
serving layer is a mode of the Vite plugin, enabled here with
`solid({ start: true, ssr: true })`. The plugin owns the entries, dev serving
and the build, so there is no `index.html` and no `entry-client` /
`entry-server` pair — `src/App.tsx` is the app and `src/Document.tsx` is the
document shell. Routing is `@solidjs/router` 2.x, configured explicitly in
`src/router.tsx`.

## How a page is built

Prose lives in `content/**.md` and is compiled at build time by
`vite/markdown.ts`. A page module does not export one HTML string; it exports a
list of blocks:

```ts
blocks: [
  { type: 'html', html: '…' },
  { type: 'demo', id: 'disclosure/controlled', title, code, caption },
];
```

`src/components/Prose.tsx` renders that list, so every demo is a real component
rather than a placeholder to be found and upgraded inside an `innerHTML` blob.
Code fences are highlighted with Shiki during the build, in both colour schemes
at once, so no highlighter ships to the browser.

`content/nav.json` fixes the sidebar order. `vite/markdown.ts` also builds
`virtual:content` from it: every page's slug, title and lede, read straight off
the source. That index is synchronous, which is what lets `<title>` and the
description reach `<head>` before the SSR shell flushes.

Cross-links stay writable as ordinary relative markdown links —
`./accordion.md#anatomy` is rewritten to `/components/accordion#anatomy` at
compile time — so the files still read correctly on their own.

## Demos

A demo is a file under `src/demos/<component>/<name>.tsx` with a default
export. Embed it from markdown by id:

```markdown
:::demo disclosure/controlled
An optional caption, in markdown.
:::
```

Each component page also names one **hero** demo, which the page shell renders
directly under the lede — before the anatomy, before the props, before any
prose. The component itself is the first thing on the page:

```markdown
:::hero disclosure/basic
:::
```

There is exactly one source of truth per example. `vite/demos.ts` serves the
file's highlighted source as `virtual:demo-source/<id>` for the Code tab, and
lists every demo in `virtual:demo-registry` for the demo route. Each page
imports only the demos it embeds.

Demos render in an iframe, at `/demo/<id>`, which is a chrome-free route in
this same app. The iframe is not decoration: it gives each demo a real
document, so a modal dialog, a focus trap or a portal behaves exactly as it
would in an application. The costs of the boundary are handled by
`src/lib/demo-bridge.ts`:

- appearance travels in the query string (`?theme=…&scheme=…`) so the frame's
  first paint is already correct, and over `postMessage` afterwards so
  switching theme does not reload the frame and discard the reader's state;
- the frame measures itself with a `ResizeObserver` and posts its height back,
  because the parent cannot measure across the boundary.

## Themes

Terracotta writes `tc-` state attributes and never touches `class`, so a theme
is nothing but CSS. `src/themes/_contract.css` documents the custom properties
every theme must define and carries neutral fallbacks;
`src/themes/terracotta.css` is the worked example.

A theme is scoped to `html[data-theme="<id>"]` and styles two vocabularies: the
site's own chrome classes, and the class names the demos use. Because demos
carry no styles of their own, switching theme restyles the entire site and
every demo at once — the same markup, a different design system. That is the
argument the site is making, so the theme picker is deliberately in the
masthead rather than buried in a settings page.

To add one: write `src/themes/<id>.css`, import it from `src/themes/index.ts`,
and add its entry to `THEMES`. Nothing else changes.

Light and dark are a separate axis, toggling a `dark` class on `<html>` under
the same `theme-preference` key Terracotta uses. It is handled by
`src/lib/color-scheme.tsx` rather than the library's own `ColorSchemeProvider`,
which currently stops its whole subtree from hydrating — see
[docs/color-scheme-hydration.md](docs/color-scheme-hydration.md).

Everything else in the chrome is built from the library it documents: the theme
picker is a `Listbox`, the appearance switch is a `RadioGroup`, the mobile
navigation is a `Disclosure`, and the demo Preview/Code switch is a `TabGroup`.

## Hydration

Two rules this site had to learn the hard way, both of which fail silently:

- **Route components are imported eagerly.** A `lazy` route only hydrates if its
  chunk was preloaded before the client resumes, and nothing here declares the
  matched route module to the build manifest.
- **Reactive owners are created on both sides.** A `createEffect` inside an
  `if (!isServer)` block shifts every hydration id allocated after it, and the
  tree stops matching from that point on. Guard the effect's body, never its
  creation.
