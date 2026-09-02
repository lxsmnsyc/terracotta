# Toast

Toast notifications are short, non-blocking messages. They appear in a corner of
the screen and go away again. Terracotta splits this into three pieces:

- `ToasterStore` — a framework-agnostic queue. Create it outside your components
  and push messages into it from anywhere.
- `useToaster(store)` — subscribes to a store and returns a Solid accessor.
- `<Toaster>` / `<Toast>` — the markup, with the right live-region roles.

The queue lives outside the component tree, so any code can raise a toast
without prop drilling: a fetch handler, a router guard, a worker callback.

```tsx
import { Toast, Toaster, ToasterStore, useToaster } from 'terracotta/toast';
```

## Anatomy

```tsx
<Toaster>  {/* the region that holds the queue */}
  <Toast/> {/* role="status" aria-live="polite" */}
</Toaster>
```

## Examples

### The store and the region

```tsx
import { For, type JSX } from 'solid-js';
import { Toast, Toaster, ToasterStore, useToaster } from 'terracotta/toast';

export interface Notice {
  title: string;
  tone: 'info' | 'success' | 'error';
}

// Created once, outside any component
export const notices = new ToasterStore<Notice>();

export function Notifications(): JSX.Element {
  const queue = useToaster(notices);

  return (
    <Toaster class="toaster">
      <For each={queue()}>
        {item => (
          <Toast class="toast" data-tone={item.data.tone}>
            <p class="toast-title">{item.data.title}</p>
            <button
              type="button"
              class="toast-dismiss"
              aria-label="Dismiss"
              onClick={() => notices.remove(item.id)}
            >
              ×
            </button>
          </Toast>
        )}
      </For>
    </Toaster>
  );
}
```

```css
.toaster {
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  inline-size: min(22rem, calc(100vw - 2rem));
  z-index: 50;
}

.toast {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  border: 1px solid #e4e4e7;
  border-inline-start-width: 4px;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}

.toast[data-tone="success"] { border-inline-start-color: #16a34a; }
.toast[data-tone="error"]   { border-inline-start-color: #dc2626; }
.toast[data-tone="info"]    { border-inline-start-color: #2563eb; }

.toast-title { margin: 0; flex: 1; }

.toast-dismiss {
  border: none;
  background: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}
```

Anywhere else in the app:

```tsx
notices.create({ title: 'Project saved', tone: 'success' });
```

### Auto-dismiss

The store has no timing policy. Add one where you create the toast:

```tsx
export function notify(data: Notice, ms = 4000): string {
  const id = notices.create(data);
  setTimeout(() => notices.remove(id), ms);
  return id;
}
```

### Animating entry and exit

The queue removes an item immediately. To animate a toast out, wrap it in a
[`Transition`](./transition.md):

```tsx
<For each={queue()}>
  {item => (
    <Transition
      show={true}
      enter="toast-enter"
      enterFrom="toast-enter-from"
      enterTo="toast-enter-to"
    >
      <Toast class="toast">{item.data.title}</Toast>
    </Transition>
  )}
</For>
```

```css
.toast-enter { transition: opacity 150ms ease-out, translate 150ms ease-out; }
.toast-enter-from { opacity: 0; translate: 0 0.5rem; }
.toast-enter-to   { opacity: 1; translate: none; }
```

For a leave animation, keep the item in the queue until the transition finishes.
Flip a local signal, then call `notices.remove(item.id)` from `afterLeave`.

### Clearing the queue

```tsx
<button type="button" onClick={() => notices.clear()}>
  Dismiss all
</button>
```

### Several independent regions

Each store is its own queue, so one page can have several:

```tsx
export const systemNotices = new ToasterStore<Notice>();
export const uploadNotices = new ToasterStore<UploadProgress>();
```

```tsx
<Toaster class="toaster toaster-top">{/* systemNotices */}</Toaster>
<Toaster class="toaster toaster-bottom">{/* uploadNotices */}</Toaster>
```

### Reading the queue outside a component

```tsx
notices.getQueue().length; // non-reactive snapshot

const unsubscribe = notices.subscribe(queue => {
  console.log(`${queue.length} notice(s) pending`);
});
```

`useToaster` is the reactive equivalent. It unsubscribes with the component.

## State attributes

Neither component carries dynamic state. A toast is either in the queue or it is
not, so only the markers are written.

| Element | Attribute | Present when |
| --- | --- | --- |
| `Toaster` | `tc-toaster` | Always |
| `Toast` | `tc-toast` | Always |

Anything that varies per toast is your own data: severity, position, whether it
has an action. Pass a `data-*` attribute and select on it, as in the example
above.

### Styling

```css
[tc-toaster] {
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

[tc-toast] {
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}

/* Stack newest on top without touching the markup */
[tc-toaster] { flex-direction: column-reverse; }
```

### Reading the state in code

There is no component state. The queue is the state, and you read it with
`useToaster(store)`:

| Member | Type | Description |
| --- | --- | --- |
| `useToaster(store)` | `() => ToastData<T>[]` | Reactive accessor for the queue. |
| `store.getQueue()` | `() => ToastData<T>[]` | Non-reactive snapshot. |
| `store.subscribe(cb)` | `(cb) => () => void` | Manual subscription. Returns an unsubscribe function. |

## Keyboard

Neither component handles keys. A toast is not a focus stop, and that is the
point: it must not interrupt what the user is typing. For a dismiss or undo
action, put a real `<button>` inside the toast. <kbd>Tab</kbd> reaches it the
normal way.

If the message must be acted on, it is not a toast. Use
[`AlertDialog`](./alert-dialog.md).

## API

### `ToasterStore<T>`

A subscribable queue of `{ id, data }` entries. `T` is whatever shape you want a
toast to carry.

| Member | Type | Description |
| --- | --- | --- |
| `create(data)` | `(data: T) => string` | Appends a toast and returns its generated id. |
| `remove(id)` | `(id: string) => void` | Removes the toast with that id. |
| `clear()` | `() => void` | Empties the queue. |
| `getQueue()` | `() => ToastData<T>[]` | The current queue. Not reactive. |
| `subscribe(callback)` | `(cb: (queue: ToastData<T>[]) => void) => () => void` | Subscribes to changes and returns an unsubscribe function. Each notification receives a fresh array. |

`ToastData<T>` is `{ id: string; data: T }`.

### `useToaster(store)`

| Signature | Description |
| --- | --- |
| `useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[]` | Subscribes for the lifetime of the calling component and returns an accessor for the queue. |

### `<Toaster>`

The container that owns the toast context. `<Toast>` must be rendered inside
one, and throws otherwise. Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `children` | `JSX.Element` | — | The toasts. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes: `tc-toaster`.

### `<Toast>`

A single notification. Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `children` | `JSX.Element` | — | The message. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"status"` |
| `aria-live` | `"polite"` |
| `tc-toast` | `""` |

`role="status"` announces the toast without interrupting the user. For a message
that must interrupt, use [`Alert`](./alert.md) instead.
