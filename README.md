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
is nothing but CSS.

Two stylesheets get painted, and both are written purely in the tokens that
`src/themes/_contract.css` defines:

- `src/styles/chrome.css` (and `prose.css`) — the site's own furniture.
- `src/styles/demos.css` — the **demo vocabulary**: the class names every file
  in `src/demos` uses. Demos carry no styles and no theme-specific classes, so
  this one file dresses all forty-five of them.

A theme is therefore only a token block scoped to `html[data-theme="<id>"]`.
`terracotta.css` is exactly that and nothing more. Beyond tokens it may also
override any baseline rule by repeating the selector under its own scope, which
always wins on specificity — `brutalist.css` does that to reshape borders,
corners, shadows and casing, and `glass.css` to frost every surface, and
neither touches a single component or demo.

`glass.css` also shows how far a theme's licence goes: because
`backdrop-filter` needs something behind it to blur, that theme paints the
document itself — a fixed gradient wash on the root element, with `body` made
transparent — and it clears the opaque background Shiki bakes into highlighted
code so the code blocks frost like everything else. It reverts to flat opaque
surfaces under `prefers-reduced-transparency`.

`terminal.css` goes furthest. It is a phosphor console — one monospace family
for the whole document, no corners, scanlines on a fixed pseudo-element hung
off `body`, and a cursor blinking after the page title. Where it looks like the
HTML changed — the `##` before a heading, the brackets around a button, the `>`
beside the current page, the `$` before the wordmark — it is generated content.
No component, no demo and no line of markup differs from any other theme.

`blueprint.css` is a drawing sheet: grid paper on the root element, hairlines
instead of shadows, stencilled labels on anything that names a part, and sheet
numbers down the left of the headings from a CSS counter on `.prose`. It is the
theme that changes the *information design* rather than the palette — the API
tables become fully ruled parts schedules, and nothing casts a shadow because a
blueprint has no depth.

`x-ray.css` is the one that argues the case outright. Terracotta styles nothing
and publishes its entire state model as `tc-` DOM attributes, so a stylesheet
can select on that model directly — and this theme does, drawing every element
that is expanded, active, selected, checked, pressed, matched or disabled as
you use it. Two channels keep overlapping states legible: an outline outside
the box for what a component is *doing*, a hairline ring inside for what it
*holds*. Neither participates in layout, so all forty-five demos keep their
geometry. It doubles as a live legend for the "State attributes" table on every
component page, and because the docs chrome is built out of Terracotta too, the
theme picker annotates itself while you use it.

`editorial.css` is the one with a voice rather than a technique. Ivory stock, a
serif text face at a book measure, an oxblood rubric, small caps wherever the
page labels itself, a drop cap opening every article, an asterism between
sections, and demos numbered as figures from a counter on `.page`. It exists to
make a point the contract makes easy to forget: `--font-sans` is a token name,
not a promise, and a theme is free to answer it with a serif and to reset the
measure and the leading around it.

`bloom.css` takes the shape axis. Every other theme in the set is drawn with
lines — hairlines, 2px rules, dashes, grids, outlines — and this one has none:
nothing is outlined and nothing is square. Shapes are separated by fill and a
soft tinted shadow, everything you can touch is a pill, and hovering lifts it a
pixel. Most of the file is therefore spent turning borders into backgrounds,
which is a thing a theme can only do because the baseline draws the vocabulary
and the library draws nothing.

`bevel.css` is the only theme with a third dimension. Nothing in it is a
rectangle of colour: controls are moulded — a light-to-dark face, a white
highlight along the top edge, a shadow underneath — while inputs, grooves and
listings are recessed into the page, and pressing a control inverts its
gradient and moves it down a pixel. Four declarations do almost all of it
(`--face`, `--edge`, `--drop`, `--well`), and the accent is lacquered rather
than painted. It is the clearest measure of how little of a design system lives
in the markup: the site goes back to 2008 without a component, a demo or a
class name changing.

Three things every theme after the first has had to know:

- A row that fills on hover or selection repaints only itself. Children that
  carry their own colour — a muted blurb, an accent tick — keep it and vanish
  into the fill, so the fill needs a companion rule making descendants inherit.
  Pseudo-elements need naming explicitly; `*` cannot reach them.
- `:root` is a pseudo-class, so `:root.dark .shiki` in `prose.css` scores three
  classes and ties with `[data-theme='x'].dark .shiki`. A theme overriding a
  dark-scheme baseline rule has to carry `:root` too, or the winner is whichever
  stylesheet the bundler emits last.
- Setting `border-style` on an element the baseline gives a single border to
  boxes it in on all four sides. Name the side.
- A gradient is `background-image`, and an element painted with one alone has
  no `background-color` — it reads as transparent to anything that asks, the
  contrast checks in `tests/` included. Declare both.

## Tests

`pnpm test` runs the Playwright suite in `tests/`. It starts the dev server
itself, so nothing has to be running first.

The suite runs against the dev server, which is why `vite.config.ts` points
`optimizeDeps.entries` at `src/**/*.tsx`. Demos are loaded lazily, so without
it Vite does not discover the Terracotta subpaths they import until the first
visit to a component page, then re-optimises mid-flight and 504s whatever was
in the air — including the module a page was hydrating with. Crawling them up
front settles the dependency set before the first request, and the suite passes
from a cold `node_modules/.vite`.

- `pages.spec.ts` walks every page in the sidebar and fails on anything in the
  console. A page that fails to hydrate still renders — it just stops
  responding — so the console is where that shows up and nowhere else.
- `themes.spec.ts` puts each theme through both colour schemes, checks the
  contract's tokens all resolve, and asserts that switching theme moves the
  chrome and the demo frames together.
- `contrast.spec.ts` measures text against the ground it actually sits on —
  compositing translucent layers down the ancestor chain, which `glass` needs —
  and holds filled buttons and active rows to 4.5:1 in every theme and scheme.
  Every contrast bug this site has had was a fill repainted without its label.
  Colours are resolved by painting them to a canvas rather than by parsing the
  computed string: a fill caught mid-transition comes back as `oklab(...)` and a
  hand-rolled parser reads its lightness of `0.75` as 0.75 of 255, reporting a
  bright red button as nearly black.
- `theme-picker.spec.ts` covers the appearance controls, including that the
  picker names the stored theme on first paint. That one is a hydration trap:
  the server cannot know the visitor's theme, and hydration rewrites a text node
  only when the value changes.

Switching theme therefore restyles the entire site and every demo at once: the
same markup, a different design system. That is the argument the site is
making, so the theme picker sits in the masthead rather than in a settings page.

To add one: write `src/themes/<id>.css`, import it from `src/themes/index.ts`,
and add its entry to `THEMES`. Nothing else changes.

Light and dark are a separate axis, toggling a `dark` class on `<html>` under
the same `theme-preference` key Terracotta uses. It is handled by
`src/lib/color-scheme.tsx` rather than the library's own `ColorSchemeProvider`,
which currently stops its whole subtree from hydrating — see
[docs/color-scheme-hydration.md](docs/color-scheme-hydration.md).

Everything else in the chrome is built from the library it documents: the theme
picker and the appearance switch are `RadioGroup`s, the mobile navigation is a
`Disclosure`, and the demo Preview/Code switch is a `TabGroup`.

The theme picker is a radio group rather than a popup because the point of the
control is comparison: every theme stays on screen, so switching between two of
them is two clicks in the same place instead of two round trips through a menu
that closes over the page you are trying to look at. Each swatch is painted by
the theme it stands for — `themes/<id>.css` carries an unscoped
`.theme-swatch-<id>` rule — so a theme is still one file plus one entry in
`THEMES`, and no palette is written down twice.

## Hydration

Two rules this site had to learn the hard way, both of which fail silently:

- **Route components are imported eagerly.** A `lazy` route only hydrates if its
  chunk was preloaded before the client resumes, and nothing here declares the
  matched route module to the build manifest.
- **Reactive owners are created on both sides.** A `createEffect` inside an
  `if (!isServer)` block shifts every hydration id allocated after it, and the
  tree stops matching from that point on. Guard the effect's body, never its
  creation.
