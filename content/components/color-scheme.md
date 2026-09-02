# ColorScheme

Light / dark / system colour-scheme management. `ColorSchemeProvider` holds the
preference, resolves `'system'` against the operating system, and reflects the
result as a `dark` class on the document element.

It keeps three things in sync:

- the preference, persisted in `localStorage` under the key `theme-preference`
- the `dark` class on `<html>`, toggled to match the resolved scheme
- the OS preference, via a `prefers-color-scheme` media query

It also listens for the `storage` event, and for the page becoming visible
again. A change made in one tab therefore reaches the others.

:::hero color-scheme/basic
The provider toggles `dark` on the document element it is rendered into — which
here is the demo frame, not the page around it. Only this box changes.
:::

```tsx
import {
  ColorSchemeProvider,
  useColorScheme,
  useNativeColorScheme,
  usePreferredColorScheme,
} from 'terracotta/color-scheme';
```

## Types

```ts
type NativeColorScheme = 'light' | 'dark';
type ColorScheme = NativeColorScheme | 'system';
```

`'system'` means "follow the OS". It resolves to `'light'` or `'dark'` when
read.

## Anatomy

```tsx
<ColorSchemeProvider>{/* renders no element — context only */}
  {/* useColorScheme() / usePreferredColorScheme() work anywhere below */}
</ColorSchemeProvider>
```

## Examples

### Provider and a picker

```tsx
import { type JSX } from 'solid-js';
import {
  ColorSchemeProvider,
  useColorScheme,
  type ColorScheme,
} from 'terracotta/color-scheme';

function SchemePicker(): JSX.Element {
  const [scheme, setScheme] = useColorScheme();

  return (
    <label class="field">
      <span>Appearance</span>
      <select
        class="field-control"
        value={scheme()}
        onChange={event => setScheme(event.currentTarget.value as ColorScheme)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}

export default function App(): JSX.Element {
  return (
    <ColorSchemeProvider initialValue="system">
      <SchemePicker />
      <main class="page">…</main>
    </ColorSchemeProvider>
  );
}
```

### Theming with custom properties

The provider toggles a single `dark` class on `<html>`. Define your palette as
custom properties and swap them under that class. Everything else in your CSS is
then written once:

```css
:root {
  --surface: #ffffff;
  --surface-raised: #fafafa;
  --text: #18181b;
  --text-muted: #71717a;
  --border: #e4e4e7;
  --accent: #2563eb;
}

:root.dark {
  --surface: #18181b;
  --surface-raised: #27272a;
  --text: #fafafa;
  --text-muted: #a1a1aa;
  --border: #3f3f46;
  --accent: #60a5fa;
}

.page {
  background: var(--surface);
  color: var(--text);
}

.card {
  background: var(--surface-raised);
  border: 1px solid var(--border);
}
```

The other component pages use colours directly, for clarity. In a real project,
route them through custom properties like this, and dark mode comes for free.

### A three-way segmented control

```tsx
function SchemeButtons(): JSX.Element {
  const [scheme, setScheme] = useColorScheme();
  const options: ColorScheme[] = ['light', 'system', 'dark'];

  return (
    <div class="segmented" role="group" aria-label="Appearance">
      <For each={options}>
        {option => (
          <button
            type="button"
            class="segmented-option"
            aria-pressed={scheme() === option}
            onClick={() => setScheme(option)}
          >
            {option}
          </button>
        )}
      </For>
    </div>
  );
}
```

```css
.segmented {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.segmented-option {
  border: none;
  background: transparent;
  padding: 0.375rem 0.75rem;
  font: inherit;
  text-transform: capitalize;
  cursor: pointer;
}

.segmented-option[aria-pressed="true"] {
  background: var(--accent);
  color: #ffffff;
}
```

### Showing the resolved scheme

`useColorScheme` gives you the *preference*, which may be `'system'`.
`usePreferredColorScheme` gives you what is on screen right now:

```tsx
function ThemeIcon(): JSX.Element {
  const resolved = usePreferredColorScheme();
  return <span aria-hidden="true">{resolved() === 'dark' ? '🌙' : '☀️'}</span>;
}
```

### Distinguishing preference from OS setting

```tsx
function SchemeSummary(): JSX.Element {
  const [scheme] = useColorScheme();
  const native = useNativeColorScheme();

  return (
    <p class="hint">
      Preference: {scheme()}
      <Show when={scheme() === 'system'}> (your system is set to {native()})</Show>
    </p>
  );
}
```

### Controlled

Use this when the preference belongs to a user account rather than the browser:

```tsx
const [scheme, setScheme] = createSignal<ColorScheme>('system');

<ColorSchemeProvider
  value={scheme()}
  onChange={next => {
    setScheme(next);
    void persistToProfile(next);
  }}
>
  …
</ColorSchemeProvider>
```

:::demo color-scheme/controlled
The preference lives in the component's own signal; the provider only reports
changes through `onChange`.
:::


### Avoiding the first-paint flash

The class is applied from an effect, so server-rendered markup does not have it.
Set it before the first paint with a small inline script in your document head:

```html
<script>
  (function () {
    var stored = localStorage.getItem('theme-preference');
    var dark =
      stored === 'dark' ||
      ((!stored || stored === 'system') &&
        matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  })();
</script>
```

## State attributes

`ColorSchemeProvider` renders no element, so it writes no `tc-` attributes. Its
one piece of output is the `dark` class on `<html>`:

| Target | Marker | Present when |
| --- | --- | --- |
| `document.documentElement` | `class="dark"` | The resolved scheme is dark. That means the preference is `'dark'`, or it is `'system'` and the OS prefers dark |

### Styling

```css
/* Light is the default; dark is the override. */
.card {
  background: #ffffff;
  color: #18181b;
}

:root.dark .card {
  background: #18181b;
  color: #fafafa;
}

/* Follow the OS directly where the preference does not apply,
   such as print styles or an embedded widget. */
@media (prefers-color-scheme: dark) {
  .embedded-widget { background: #18181b; }
}
```

### Reading the state in code

| Hook | Returns | Description |
| --- | --- | --- |
| `useColorScheme()` | `[() => ColorScheme, (scheme: ColorScheme) => void]` | The stored preference and a setter. May be `'system'`. |
| `usePreferredColorScheme()` | `() => NativeColorScheme` | The resolved scheme: what is on screen, matching the `dark` class. |
| `useNativeColorScheme()` | `() => NativeColorScheme` | What the OS reports, regardless of the stored preference. |

All three throw if called outside a `ColorSchemeProvider`.

## Keyboard

The provider handles no keys. Whatever control you build to change the scheme
brings its own keyboard behaviour, whether that is a `<select>`, a set of
buttons, or a [`RadioGroup`](./radio-group.md).

## API

### `<ColorSchemeProvider>`

Renders no element of its own, only the context and its children.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialValue` | `ColorScheme` | — | Initial preference, uncontrolled. Mutually exclusive with `value`. |
| `value` | `ColorScheme` | — | Current preference, controlled. Mutually exclusive with `initialValue`. |
| `onChange` | `(scheme: ColorScheme) => void` | — | Called whenever the preference changes, including when it is restored from storage or synced from another tab. |
| `children` | `JSX.Element` | — | The subtree that can read the scheme. |

> A stored preference wins over `initialValue`. On mount the provider reads
> `localStorage` and applies the stored value, or `'system'` when nothing is
> stored. `initialValue` therefore only shows through on the first render.

## Server-side rendering

The provider reads `localStorage` and mutates `document.documentElement` from
effects. It renders on the server, but does nothing there. See
[avoiding the first-paint flash](#avoiding-the-first-paint-flash) above.
