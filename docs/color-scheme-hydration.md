# `ColorSchemeProvider` prevents its subtree from hydrating

Terracotta 2.0.0-next.8, Solid 2.0.0-rc.5, `@solidjs/vite-plugin` 3.0.0-next.37
in start mode with `ssr: true`.

Under SSR, `ColorSchemeProvider` leaves everything below it inert. The markup
is server-rendered correctly and no error is thrown, but no handler in the
subtree is ever attached. A sibling of the provider hydrates normally, so the
damage is scoped to its own children.

That is why this site cannot use it yet: with the provider wrapping the router,
the entire documentation site rendered as static HTML — no client-side
navigation, no theme switching, and no `postMessage` reaching the demo frames.
`src/lib/color-scheme.tsx` is a like-for-like local replacement, using the same
`theme-preference` storage key and the same `dark` class on `<html>`.

## Reproduction

`src/App.tsx` of a stock start-mode project:

```tsx
import { createSignal } from 'solid-js';
import { ColorSchemeProvider } from 'terracotta/color-scheme';

export default function App() {
  const [count, setCount] = createSignal(0);
  return (
    <ColorSchemeProvider initialValue="system">
      <button id="inc" onClick={() => setCount((c) => c + 1)}>
        count: {count()}
      </button>
    </ColorSchemeProvider>
  );
}
```

Load the page and click the button: the label stays at `count: 0`. Move the
button outside the provider and it counts normally. The controlled form
(`value` / `onChange`) fails in the same way, so the internal `createSignal` is
not the cause.

## Likely cause

The provider creates three `createEffect`s and reads `usePrefersDark()` /
`usePageVisibility()`. The first effect calls `set(...)` synchronously on its
first run, which writes the scheme while hydration is still resuming.

Whatever the precise mechanism, the general rule this site had to learn applies
here too: **a reactive owner created on one side only shifts every hydration id
allocated after it**, and the tree stops matching from that point on. The same
mistake in this repo's own code (`createEffect` inside an `if (!isServer)`
block) produced exactly the same symptom, with the same silence. Hoisting the
effects out of the guard fixed it here; the guard belongs inside the effect
body, which does not run during SSR anyway.
