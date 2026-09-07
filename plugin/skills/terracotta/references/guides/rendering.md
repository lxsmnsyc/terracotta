<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Rendering

How Terracotta turns its parts into DOM: which element it renders, which props
reach that element, how you get a handle on it, and what happens to hidden
content.

## `as`, or polymorphic rendering

Every rendered component accepts `as`. It picks the element or component to
render, and takes either an intrinsic tag name (`'section'`, `'li'`, …) or any
Solid component.

```tsx
<DisclosureButton as="a" href="#panel">Toggle</DisclosureButton>
<DialogPanel as={MyCard}>…</DialogPanel>
```

Each component page documents its own default. The types follow `as`: with
`as="a"`, the component also accepts `<a>` props such as `href`.

Behaviour comes from the component, not the tag. A `Button` rendered `as="div"`
still responds to <kbd>Enter</kbd> and <kbd>Space</kbd>, because Terracotta adds
the keyboard handling that a native `<button>` would have given you.

## Prop passthrough

Props that a component does not use itself are forwarded to the rendered
element. That includes `class`, `classList`, `style`, `id` and DOM event
handlers. Terracotta strips its own props (`value`, `disabled`, `unmount`, …)
first, so they never show up in the DOM as stray attributes.

```tsx
<ListboxOption value={person} class="option" data-analytics="picker">
  {person.name}
</ListboxOption>
```

The component consumes `value`. `class` and `data-analytics` land on the `<li>`.

## `ref`

Components that need a DOM handle accept `ref`. Terracotta assigns it from an
effect instead of writing to it directly. A `ref` callback therefore runs in the
same reactive scope it would have if you had written the element yourself, so
`createEffect` works inside one.

Components that take no `ref` say so in their reference table.

## `unmount`

Components that hide content accept `unmount`:

| Value | Behaviour |
| --- | --- |
| `true` *(default)* | Children are removed from the DOM while hidden, and rebuilt when shown. |
| `false` | Children are always rendered. Use this to hide with CSS, or to wrap the element in a `<Transition>` that needs it to survive a leave animation. |
| `'offscreen'` | Children are created once and reused, but still attached conditionally. Keeps expensive subtrees alive across toggles. |

The default is the safe one. Hidden content is really gone, so <kbd>Tab</kbd>
cannot reach it and screen readers cannot announce it. Use `false` only when
something else needs the element to stay alive, such as a transition or a
measurement, and hide it yourself.

Inside a [`Transition`](../components/transition.md), `unmount={false}` is
handled for you: the transitioning element is marked `inert` once it starts
leaving and stays that way while hidden, so its content leaves the tab order and
the accessibility tree even though it is still in the DOM.

### `unmount="offscreen"`

`'offscreen'` sits between the two. The children are built the first time the
component renders and are never torn down again; hiding only detaches them from
the document, and showing puts the very same nodes back.

```tsx
<PopoverPanel class="panel" unmount="offscreen">
  <ExpensiveChart data={points()} />
</PopoverPanel>
```

The chart is constructed once. Reopening the popover reattaches the element that
was already there rather than mounting a second chart, so anything the component
holds in its own state, whether a computed layout, a loaded dataset or an
uncontrolled input's value, is still there. Being detached, the content is out of the
document while hidden, so <kbd>Tab</kbd> cannot reach it and screen readers
cannot announce it, exactly as with the default.

What does not stop is the work. A detached subtree is still mounted as far as
Solid is concerned: its effects keep running, its subscriptions stay subscribed,
and any interval or polling loop it started keeps firing while nothing is on
screen. `'offscreen'` is worth it for a subtree that is expensive to *build* and
cheap to keep; it is the wrong choice for one that is expensive to *run*. Prefer
the default there, or pause the work yourself while the component is closed.

Measurements are the other thing to watch. A detached element has no layout, so
`getBoundingClientRect()` reads zeroes and `offsetWidth` is `0` until it is
attached again. Measure after it becomes visible, not while it is hidden.

## Async content

Panels hold whatever you put in them, `Loading` included, and a boundary inside
a panel behaves the way it would anywhere else. What is worth knowing is how it
lines up with the two things a panel does when it opens: transition, and move
focus.

```tsx
<Transition show={isOpen()} enter="panel-enter" enterFrom="from" enterTo="to">
  <DisclosurePanel unmount={false}>
    <Loading fallback={<Spinner />}>
      <Comments />
    </Loading>
  </DisclosurePanel>
</Transition>
```

**Transitions do not wait for the resource.** The transition drives the panel
element, and the boundary swaps its own contents underneath. The panel animates
in on schedule with the fallback inside it, and the content replaces the
fallback whenever it arrives, mid-animation or long after. Closing while the
resource is still pending is fine too: the leave transition runs, and the
pending boundary is removed along with the panel.

Put the boundary the other way round, with a `Loading` wrapping the
`Transition`, and the transitioning element is not in the document while
suspended, so nothing
animates until the boundary resolves. Solid holds back the effects created under
a suspended boundary, so the transition runs when the content lands rather than
being missed.

**Focus is taken once, when the panel opens.** Dialog, AlertDialog, Popover,
ContextMenu and CommandBar look through the panel for something focusable as
they open. A panel showing a fallback usually has nothing to offer, so focus
stays where it was, and the content that arrives a moment later does not get
focus either, and no second look is taken. The
[dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) expects
focus to be inside the dialog, so this is worth designing around. An async read
defers even when its value has already settled, so a boundary always shows its
fallback for the render the panel looks at, so having the data ready in advance
does not help.

Two ways to keep focus where it belongs:

- Keep something focusable in the panel that is not behind the boundary, such as
  a close button, which a dialog usually wants anyway. It is there
  when the panel opens, takes focus, and keeps it while the content loads.

  ```tsx
  <DialogPanel>
    <button type="button" onClick={close}>Close</button>
    <Loading fallback={<Spinner />}>
      <Details />
    </Loading>
  </DialogPanel>
  ```

- Or hoist the boundary above the component, so the panel is built only once
  its content is ready and finds it on the first look.

  ```tsx
  <Loading fallback={<Spinner />}>
    <Dialog isOpen={isOpen()}>
      <DialogPanel>
        <Details />
      </DialogPanel>
    </Dialog>
  </Loading>
  ```

  The trade-off is that nothing of the dialog exists while loading, so the
  fallback has to stand in for the whole thing rather than for its contents.
