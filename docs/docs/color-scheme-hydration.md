# `ColorSchemeProvider` prevents its subtree from hydrating

> **Fixed upstream.** `solid-use@1.0.0-next.3` builds the same reactive nodes on
> both sides, creating `createSignal` and `onSettled` unconditionally with the
> `matchMedia` and `document` access moved inside the `onSettled` callback,
> which is a no-op on the server. Verified against
> `terracotta@2.0.0-next.9`: with `ColorSchemeProvider` wrapping this entire
> site, the chrome hydrates, theme switching works, the demo frames respond, and
> the dev console is silent. The report below is kept because the rule it
> established still applies to any primitive that branches on `isServer`.

Terracotta 2.0.0-next.8, Solid 2.0.0-rc.5, `@solidjs/vite-plugin` 3.0.0-next.37
in start mode with `ssr: true`.

Under SSR, `ColorSchemeProvider` leaves everything below it inert. The markup
is server-rendered correctly and no error is thrown, but no handler in the
subtree is ever attached. A sibling of the provider hydrates normally, so the
damage is scoped to its own children.

That is why this site cannot use it yet: with the provider wrapping the router,
the entire documentation site rendered as static HTML, with no client-side
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

## Cause

`ColorSchemeProvider` calls `usePrefersDark()` and `usePageVisibility()` from
`solid-use`. Both pick their implementation at module scope:

```ts
const useMediaQuery = isServer
  ? _query => () => false                     // no reactive nodes at all
  : query => {
      const [state, setState] = createSignal(false);
      onSettled(() => { /* … */ });           // an owner
      return state;
    };
```

The server branch creates nothing. The client branch creates a signal and an
`onSettled` owner, twice over, once per hook. So the client builds two reactive
owners at that point in the tree that the server never built.

Solid 2 allocates hydration keys as owners are created while it walks the tree.
Two extra owners shift every key allocated after them, so the keys the client
computes for the provider's children no longer match the `_hk` attributes in the
server's HTML. Hydration cannot find those nodes and gives up on them.

## Evidence

Each case is a stock start-mode app with a counter button; "broken" means the
button renders but never counts.

| Case | Result |
| --- | --- |
| `createSignal` created on the client only | hydrates |
| `onSettled` created on the client only | **broken**, silently |
| `onSettled` created on both sides | hydrates |
| Client-only `onSettled` in a wrapper, button inside it | **broken** |
| The same wrapper, button rendered *before* it | hydrates |

So `onSettled` is not the problem and neither is the signal: creating a
reactive owner **on one side only** is. That also explains why the controlled
form (`value` / `onChange`) fails identically: that branch only chooses
`get`/`set`, and both hooks are called either way.

## Fix

Create the same nodes on both sides and guard the *body* instead:
`createSignal` and `onSettled` unconditionally, with the `window` / `document`
access inside the callback, which does not run during SSR anyway. The table
above shows an unconditional `onSettled` server-renders fine.

The rule, which cost this repo the same bug in its own code: **`isServer` may
decide what a reactive node does, never whether it exists.**

This repo made the same mistake in its own code, putting a `createEffect`
inside an `if (!isServer)` block, and got exactly the same symptom, with the same
silence. Hoisting the effects out of the guard fixed it.
