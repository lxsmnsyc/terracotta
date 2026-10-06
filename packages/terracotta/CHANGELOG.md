# terracotta

## 2.0.0-next.10

### Major Changes

- bebcb25: Ship the components as JSX instead of compiled JavaScript.

  - Every entry now resolves to a `.jsx` file under both the `solid` and `default` conditions.
  - Your app's Solid compiler builds Terracotta for your target, so the same package works for client and server rendering.
  - A bundler that does not run Solid's JSX compiler on dependencies can no longer import the package. `@solidjs/vite-plugin` does this by default.

### Minor Changes

- 8614da8: Add `Menubar` for a list of actions that stays on screen.
  It takes `MenuItem`s like `Menu`, and is one stop in the tab sequence.

### Patch Changes

- 26b3fb9: The arrow keys, Home and End now only navigate when focus is on an `AccordionButton`, so inputs inside a panel work.
  `AccordionPanel` has `role="region"`, and an open section that cannot be closed reports `aria-disabled="true"` on its button.
  `AccordionButton` keeps `aria-controls` while its panel stays mounted, and `Accordion` and `AccordionItem` no longer set `aria-disabled` or `disabled`.
- 4676246: `AlertDialog` only sets `aria-labelledby` and `aria-describedby` while a title or description is mounted, and your own props now override the ones it sets.
  While open, everything outside it is `inert`, and a panel with nothing focusable focuses itself so Escape works.
  A closed dialog kept with `unmount={false}` is `inert` and `aria-hidden`, and it no longer sets `aria-disabled` or `disabled`.
- b81c62b: A disabled `Button` rendered as a `<div>`, `<li>` or `<a>` can no longer be activated by click, Enter or Space.
  Space now activates on key release and no longer scrolls the page.
  A link with an `href` no longer fires twice on Enter.
- b81c62b: `CheckboxIndicator` now sets `aria-labelledby` and `aria-describedby` only when `CheckboxLabel` and `CheckboxDescription` are rendered, and your own values take precedence.
  The `Checkbox` root no longer carries `aria-disabled` or `disabled`.
- 0663940: `ComboboxInput` now sets `aria-autocomplete="list"`, carries `tc-combobox-input` instead of `tc-command-input`, and clears `aria-activedescendant` when the popup closes or nothing matches. `ComboboxOptions` is named by the label, and the root no longer carries `aria-labelledby` or `aria-disabled`. <kbd>Escape</kbd> and <kbd>Enter</kbd> are passed on while the popup is closed, so a surrounding dialog can close and a form can submit.
- 0663940: `CommandInput` and `CommandOptions` are now named by `CommandLabel`, and the input sets `aria-autocomplete="list"`. The root no longer carries `aria-labelledby` or `aria-disabled`.
- 4676246: `CommandBar` only sets `aria-labelledby` and `aria-describedby` while a title or description is mounted, and no longer sets `aria-disabled` or `disabled`.
  While open, everything outside it is `inert`, and a panel with nothing focusable focuses itself so Escape works.
  A closed bar kept with `unmount={false}` is `inert` and `aria-hidden`, and drops `aria-modal`.
- b81c62b: `ContextMenuPanel` now focuses the first menu item when it opens, and closes on Tab or when a menu item is activated.
  The boundary and root no longer carry `aria-expanded`, `aria-disabled` or `disabled`, which are not allowed on elements without a role.
- 4676246: `Dialog` only sets `aria-labelledby` and `aria-describedby` while a `DialogTitle` or `DialogDescription` is mounted, and no longer sets `aria-disabled` or `disabled`.
  While open, everything outside the dialog is `inert`, and a `DialogPanel` with nothing focusable focuses itself so Escape works.
  A closed dialog kept with `unmount={false}` is `inert` and `aria-hidden`, and drops `aria-modal`.
- 26b3fb9: The `Disclosure` root no longer sets `aria-disabled` or `disabled`, which do not apply to a plain container. It still sets `tc-disabled`.
- 26b3fb9: Ctrl+Home and Ctrl+End in a `Feed` now move focus to the elements before and after `FeedContent`.
  `FeedArticle` sets `role="article"`, so it keeps the role with `as="div"`.
  The feed and its articles set `aria-labelledby` and `aria-describedby` only when the label and description parts are rendered.
- 7e4d0db: Fix a tab switching back when the closing panel holds a `Listbox` (#47).
  `Listbox`, `Popover`, `ContextMenu`, `Dialog`, `AlertDialog` and `CommandBar` only move focus back on close or unmount if they were opened.
- d7ca181: Skip elements hidden by `visibility: hidden` when looking for something to
  focus.

  `checkVisibility()` only rules out what is not rendered at all unless it is
  asked for more, so an element left in the layout by `visibility: hidden` was
  still offered to a panel as a focus target. The browser refuses to focus it, so
  focus stayed where it was.

- 0663940: `ListboxButton` is now named by the label followed by its own text, and `ListboxOptions` is named by the label. The root no longer carries `aria-labelledby` or `aria-disabled`.
- b81c62b: `Menu` type-ahead now searches from the item after the focused one and wraps around.
  Keys pressed with Ctrl, Meta or Alt no longer trigger type-ahead.
  Disabled `MenuItem`s can no longer be activated.
- 4676246: `Popover` no longer sets `aria-disabled` or `disabled` on its root element. The `tc-disabled` attribute is still there for styling.
- 8614da8: A `Popover` holding a `Menu` now follows the menu button pattern.
  - Opening it focuses the first menu item.
  - With `aria-haspopup="menu"` on the button, Down and Up open it on the first and last item.
  - Tab and activating a menu item close it.
- b81c62b: When no option is checked, the first enabled `RadioGroupOption` is now in the tab order, and focusing it no longer checks it.
  `aria-labelledby` and `aria-describedby` are set only when a label or description is rendered, and your own values take precedence.
- 0663940: Moving the pointer off a `SelectOption` no longer blurs it. It clears the highlight and keeps keyboard focus on the option.
- 4f5fbe7: Require Solid 2.0.0-rc.13 or later.
  The peer ranges for `solid-js` and `@solidjs/web` are now `^2.0.0-rc.13`.
- 26b3fb9: When no enabled tab is selected, the first enabled `Tab` is now in the tab order.
  Pressing a `toggleable` tab no longer deselects it right away, and leaving a tab no longer changes the selection.
  A `Tab` sets `aria-controls` only while its panel is in the DOM, and `TabGroup` no longer sets `aria-disabled` or `disabled`.
- 4676246: `Toaster` is now the live region, with `role="status"` and `aria-live="polite"`, so a toast added to it is announced.
  `Toast` no longer has a live role of its own. Keep the `Toaster` mounted while it is empty.
- 26b3fb9: `Toolbar` now uses a roving tabindex, so Tab and Shift+Tab enter and leave it in one step.
  The toolbar element is no longer focusable, and only the last focused control, or the first enabled one, is in the tab order.

## 2.0.0-next.9

### Patch Changes

- c128bcf: Fix the query that finds focusable elements inside a panel.

  It now looks past the element it was given for anything that takes a subtree out
  of the tab order, so a panel is no longer offered content hidden by an `inert`
  or `hidden` ancestor. `Transition` marks a leaving element `inert`, which made
  this reachable: focus could be sent into a panel that was fading out, where the
  browser would refuse it and leave focus where it was. Where the browser provides
  `checkVisibility`, content hidden by CSS is skipped as well.

  The selector itself is more accurate too. `input[type="hidden"]` and
  `contenteditable="false"` are no longer offered, `object` and `embed` are gone
  since neither is tab-navigable, and `summary`, `audio[controls]` and
  `video[controls]` are now included.

- 19fb94b: Fix a panel flashing at its final appearance before it enters.

  The starting state and the class carrying the `transition` declaration were
  applied in the same change, so whenever the element's style had already been
  computed once, the browser treated the starting state as somewhere to animate
  _to_: the panel appeared fully visible, faded out to its `enterFrom` state over
  the whole duration, and only then entered. A `PopoverPanel` inside a
  `Transition` hit this reliably, because opening the popover computes the panel's
  style before the transition applies its classes.

  The starting state is now committed on its own before the transition can act on
  it, in both directions, so an enter begins from `enterFrom` and a leave from
  `leaveFrom` however the element came to be on screen.

## 2.0.0-next.8

### Patch Changes

- e6d20a0: Stop a nested popup from letting the panel around it act on the same keypress.

  `DialogPanel`, `AlertDialogPanel`, `CommandBarPanel`, `ContextMenuPanel`,
  `PopoverPanel`, `ListboxOptions` and `ComboboxInput` now stop the `Tab` and
  `Escape` they handle from bubbling. A `Popover` inside a `Dialog` used to move
  focus twice per `Tab` — once for its own trap, once for the dialog's — which
  skipped an element and dropped focus outside the popover, closing it. One
  `Escape` likewise closed the popup _and_ the dialog. Each now acts on one layer.

- 13a3f49: Fix an infinite re-creation loop when a `Transition` or `TransitionChild` is
  paired with a disclosure component through the `as` prop — `<Transition
as={PopoverPanel}>`, `<DialogPanel as={TransitionChild}>` and every combination
  of the two — or used as the sole child of one.

  `TransitionChild` assigned its own mounted state from an effect. Solid resolves
  a provider's children eagerly, so that write landed inside the very computation
  that had just built the component and invalidated it, and the component rebuilt
  itself forever. Mounted state is now derived from a memo, which removes the
  cycle: an element that is no longer wanted stays mounted until its leave
  transition has finished with it, without anything having to write the signal its
  own mount depends on.

  `createUnmountable` is rewritten around a `Show` for the ordinary modes and a
  small `Offscreen` component for `unmount="offscreen"`. Behaviour of all three
  `unmount` modes is unchanged, and is now covered by tests.

## 2.0.0-next.7

### Minor Changes

- 2bc2ae2: Drive transitions from a shared `TransitionState` that waits on the element's
  running animations (`Element.getAnimations()`) instead of listening for
  `transitionend`/`animationend`.

  - An element with no transition or animation now advances immediately instead of
    stalling, so a missing duration no longer strands it on screen.
  - `appear` now does something: it mounts a `TransitionChild` and starts its enter
    on the first render, rather than waiting for its parent to finish entering.
  - Panels that move focus into themselves (`DialogPanel`, `PopoverPanel`,
    `ContextMenuPanel`, `CommandBarPanel`, `ListboxOptions`, `ComboboxOptions`) now
    wait for the transition to finish before focusing.
  - `ComboboxOptions` now really does activate an option when the popup opens — the
    selected one, or the first. It always meant to, but it ran before the options
    had mounted, so the popup opened with no active option until the first arrow
    key.
  - Siblings of one transition apply their starting classes against the same style
    baseline. Reading `Element.getAnimations()` flushes style, so the first
    sibling's read used to freeze the resting style of one that had not applied
    its classes yet — that sibling then animated _into_ its starting state before
    animating out of it, a phase behind the rest of the group.
  - Transitions run against the element that is actually on screen. A transition
    whose element had been unmounted and rebuilt (`show` going `false` then `true`
    again under the default `unmount`) used to apply its classes to the detached
    element the ref still held, leaving the newly mounted one unanimated.
  - Transitions are interruptible. Toggling `show` while one is running reverses
    it immediately; it used to be ignored outright, which could leave an element
    stuck visible after `show` had gone `false`.
  - `Transition` and `TransitionChild` mark their element `inert` while it leaves
    and while it stays mounted afterwards under `unmount={false}`, so a panel on
    its way out is no longer clickable or reachable by Tab. The enter phases stay
    interactive.
  - `TransitionState` and its `TransitionClasses`, `TransitionHooks` and
    `TransitionStates` types are exported.

## 2.0.0-next.6

### Patch Changes

- fix JSX path

## 2.0.0-next.5

### Patch Changes

- beta.15 compat

## 2.0.0-next.4

### Patch Changes

- e0ed99d: Fix transition orchestration

## 2.0.0-next.3

### Patch Changes

- fix transition orchestration

## 2.0.0-next.2

### Patch Changes

- ea215d4: fix dependencies

## 2.0.0-next.1

### Patch Changes

- c6133fc: cleanup omitProps and context values

## 2.0.0-next.0

### Major Changes

- Solid 2.0 support, multi-entry exports, transition fix

## 1.1.0

### Minor Changes

- d7a5ab5: migration
