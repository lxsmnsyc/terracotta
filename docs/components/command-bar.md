# CommandBar

A modal command palette. `CommandBar` is a dialog that also installs a global
<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> shortcut on `window` to open itself.
Mount it once near the root of your app and forget about it.

It provides the shell only. Put a [`Command`](./command.md) inside it for the
searchable list of actions.

```tsx
import {
  CommandBar,
  CommandBarPanel,
  CommandBarOverlay,
  CommandBarTitle,
  CommandBarDescription,
} from 'terracotta/command-bar';
import { DisclosureStateChild, useDisclosureState } from 'terracotta/states';
```

## Anatomy

```tsx
<CommandBar>                 {/* role="dialog", Cmd/Ctrl+K opens it */}
  <CommandBarOverlay/>       {/* backdrop; closes on click */}
  <CommandBarPanel>          {/* focus trap */}
    <CommandBarTitle/>       {/* labels the dialog */}
    <CommandBarDescription/> {/* describes the dialog */}
    {/* usually a <Command> here */}
  </CommandBarPanel>
</CommandBar>
```

## Examples

### Uncontrolled — the shortcut just works

With `defaultOpen`, the bar owns its state and the global shortcut needs no
wiring:

```tsx
<CommandBar class="commandbar" defaultOpen={false}>
  <CommandBarOverlay class="commandbar-overlay" />
  <CommandBarPanel class="commandbar-panel">
    <CommandBarTitle class="visually-hidden">Command palette</CommandBarTitle>
    <CommandBarDescription class="visually-hidden">
      Search for an action and press Enter to run it.
    </CommandBarDescription>
    {/* … */}
  </CommandBarPanel>
</CommandBar>
```

```css
.commandbar {
  position: fixed;
  inset: 0;
  display: grid;
  justify-items: center;
  align-content: start;
  padding-block-start: 6rem;
  padding-inline: 1rem;
  z-index: 60;
}

.commandbar-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.4);
}

.commandbar-panel {
  position: relative;
  inline-size: min(32rem, 100%);
  border-radius: 0.75rem;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 24px 48px rgb(0 0 0 / 0.25);
}

.visually-hidden {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

### Controlled, with a Command palette inside

```tsx
import { For, createSignal, type JSX } from 'solid-js';
import { Command, CommandInput, CommandOption, CommandOptions } from 'terracotta/command';
import {
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
} from 'terracotta/command-bar';

interface Action { id: string; label: string; run: () => void }

export function Palette(props: { actions: Action[] }): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <CommandBar
      class="commandbar"
      isOpen={open()}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <CommandBarOverlay class="commandbar-overlay" />
      <CommandBarPanel class="commandbar-panel">
        <CommandBarTitle class="visually-hidden">Command palette</CommandBarTitle>
        <CommandBarDescription class="visually-hidden">
          Search for an action and press Enter to run it.
        </CommandBarDescription>

        <Command<Action>
          defaultValue={undefined as unknown as Action}
          by={(a, b) => a.id === b.id}
          matchBy={(action, query) =>
            action.label.toLowerCase().includes(query.toLowerCase())
          }
          onChange={action => {
            action?.run();
            setOpen(false);
          }}
        >
          <CommandInput class="commandbar-input" placeholder="Type a command…" />
          <CommandOptions class="commandbar-list">
            <For each={props.actions}>
              {action => (
                <CommandOption class="commandbar-option" value={action}>
                  {action.label}
                </CommandOption>
              )}
            </For>
          </CommandOptions>
        </Command>
      </CommandBarPanel>
    </CommandBar>
  );
}
```

```css
.commandbar-input {
  inline-size: 100%;
  border: none;
  border-block-end: 1px solid #e4e4e7;
  padding: 0.875rem 1rem;
  font: inherit;
}

.commandbar-input:focus { outline: none; }

.commandbar-list {
  max-block-size: 18rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
}

.commandbar-option {
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

/* Hide entries that do not match the query */
.commandbar-option:not([tc-matches]) { display: none; }

.commandbar-option[tc-active] { background: #f4f4f5; }
.commandbar-option[tc-disabled] { color: #a1a1aa; }
```

The keyboard shortcut calls the state's `open()` directly. A **controlled**
`CommandBar` therefore needs `onOpen`, or `onChange`, wired back to your signal.
Without that, the shortcut fires but nothing appears.

### Adding your own trigger

```tsx
<button type="button" class="search-trigger" onClick={() => setOpen(true)}>
  Search <kbd>⌘K</kbd>
</button>
```

```css
.search-trigger kbd {
  border: 1px solid #d4d4d8;
  border-radius: 0.25rem;
  padding: 0.0625rem 0.25rem;
  font-size: 0.75rem;
}
```

### Closing after running an action

```tsx
<CommandBar class="commandbar" defaultOpen={false}>
  {({ close }) => (
    <>
      <CommandBarOverlay class="commandbar-overlay" />
      <CommandBarPanel class="commandbar-panel">
        <button type="button" onClick={() => { openSettings(); close(); }}>
          Settings
        </button>
      </CommandBarPanel>
    </>
  )}
</CommandBar>
```

### Yielding the shortcut to another handler

The global listener ignores events that already had `preventDefault()` called on
them. A more specific handler can therefore claim the combination:

```tsx
// Inside a code editor that wants Cmd+K for its own "insert link"
editor.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault(); // CommandBar will now skip this event
    insertLink();
  }
});
```

### With a transition

```tsx
<Transition show={open()}>
  <CommandBar class="commandbar" isOpen={open()} onClose={() => setOpen(false)} unmount={false}>
    <TransitionChild
      enter="fade-enter" enterFrom="fade-from" enterTo="fade-to"
      leave="fade-leave" leaveFrom="fade-to" leaveTo="fade-from"
    >
      <CommandBarOverlay class="commandbar-overlay" />
    </TransitionChild>
    <TransitionChild
      enter="drop-enter" enterFrom="drop-from" enterTo="drop-to"
      leave="drop-leave" leaveFrom="drop-to" leaveTo="drop-from"
    >
      <CommandBarPanel class="commandbar-panel">…</CommandBarPanel>
    </TransitionChild>
  </CommandBar>
</Transition>
```

```css
.fade-enter { transition: opacity 180ms ease-out; }
.fade-leave { transition: opacity 120ms ease-in; }
.fade-from  { opacity: 0; }
.fade-to    { opacity: 1; }

.drop-enter { transition: opacity 180ms ease-out, translate 180ms ease-out; }
.drop-leave { transition: opacity 120ms ease-in, translate 120ms ease-in; }
.drop-from  { opacity: 0; translate: 0 -0.5rem; }
.drop-to    { opacity: 1; translate: none; }
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `CommandBar` | `tc-command-bar` | Always (whenever rendered) |
| `CommandBar` | `tc-expanded` | The bar is open |
| `CommandBar` | `tc-disabled` | The bar is disabled |
| `CommandBarOverlay` | `tc-command-bar-overlay` | Always |
| `CommandBarOverlay` | `tc-expanded`, `tc-disabled` | Mirrors the bar |
| `CommandBarPanel` | `tc-command-bar-panel` | Always |
| `CommandBarPanel` | `tc-expanded`, `tc-disabled` | Mirrors the bar |
| `CommandBarTitle` | `tc-command-bar-title` | Always |
| `CommandBarTitle` | `tc-expanded`, `tc-disabled` | Mirrors the bar |
| `CommandBarDescription` | `tc-command-bar-description` | Always |
| `CommandBarDescription` | `tc-expanded`, `tc-disabled` | Mirrors the bar |

### Styling

```css
/* With unmount={false}, you own visibility */
[tc-command-bar]:not([tc-expanded]) { display: none; }

[tc-command-bar-overlay] { position: fixed; inset: 0; background: rgb(0 0 0 / 0.4); }
[tc-command-bar-panel]   { border-radius: 0.75rem; background: #ffffff; overflow: hidden; }

@media (prefers-reduced-motion: no-preference) {
  [tc-command-bar-panel] { animation: commandbar-in 160ms ease-out; }
}

@keyframes commandbar-in {
  from { opacity: 0; translate: 0 -0.5rem; }
  to   { opacity: 1; translate: none; }
}
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the bar is open. |
| `open()` / `close()` | `() => void` | Opens / closes it. No-op while disabled. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the bar is disabled. |

You can reach this state as the render-prop argument on `CommandBar` and each of
its parts, through `<DisclosureStateChild>`, or with `useDisclosureState()` in
any descendant. Full reference in
[disclosure state](../states.md#disclosure-state).

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> | Opens the bar, from anywhere on the page |
| <kbd>Escape</kbd> | Closes it (handled by `CommandBarPanel`) |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles focus within the panel |

The global listener is registered for as long as the `CommandBar` is mounted,
open or not. Mount only one.

## API

### `<CommandBar>`

Owns the [disclosure state](../states.md#disclosure-state) and renders a `<div>`
by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultOpen` | `boolean` | — | Initial state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | — | Current state, controlled. Mutually exclusive with `defaultOpen`. |
| `disabled` | `boolean` | `false` | Blocks opening and closing, including via the shortcut. |
| `onChange` | `(state: boolean) => void` | — | Called with the new state on every change. |
| `onOpen` | `() => void` | — | Called when it opens, including from the keyboard shortcut. |
| `onClose` | `() => void` | — | Called when it closes, including via <kbd>Escape</kbd> and overlay clicks. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the bar behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="dialog"`, `aria-modal="true"`,
`aria-labelledby` and `aria-describedby`.

### `<CommandBarPanel>`

The focus trap. It focuses its first focusable child when the bar opens, so put
the `CommandInput` first and typing starts immediately. Renders a `<div>` by
default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Stops the panel's own key handling. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CommandBarOverlay>`

The backdrop. Closes the bar when clicked. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CommandBarTitle>`

The accessible name. Renders an `<h2>` by default. Does not take a `ref`. Hide
it visually if the palette has no visible heading.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'h2'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Title text, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CommandBarDescription>`

Renders a `<p>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'p'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Description text, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Every descendant throws if rendered outside a `<CommandBar>`.
