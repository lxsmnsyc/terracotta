# Rendering

How Terracotta turns its parts into DOM: which element it renders, which props
reach that element, how you get a handle on it, and what happens to hidden
content.

## `as` — polymorphic rendering

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
