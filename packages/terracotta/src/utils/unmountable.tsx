import { dynamic, type JSX } from '@solidjs/web';
import { Show, children } from 'solid-js';

// An `unmountable` is a kind of component
// where one can decide if it should conditionally
// render or not.
// This is only used for disclosure-based properties
// as some implementations may allow users to use various
// ways to hide the element (e.g. opacity, display, visibility)
export interface UnmountableProps {
  unmount?: boolean | 'offscreen';
}

interface ConditionalProps {
  when: boolean;
  children: JSX.Element;
}

/**
 * The shape `Unmountable` renders through. `Show` is overloaded, so it only
 * lines up with `Offscreen` once both are read as this one signature.
 */
type Conditional = (props: ConditionalProps) => JSX.Element;

function Offscreen(props: ConditionalProps): JSX.Element {
  // Resolved eagerly, and here rather than inside the branch below: the
  // subtree is then owned by `Offscreen` itself, so the condition going false
  // detaches it instead of disposing it — which is what lets an offscreen
  // element keep its state while hidden.
  const result = children(() => props.children)();

  return (
    <Show when={props.when} keyed>
      {result}
    </Show>
  );
}

export interface UnmountableComponentProps extends UnmountableProps {
  /** Whether the children should be on screen. */
  when: boolean;
  children: JSX.Element;
}

/**
 * Shows its children while `when` holds, and decides what hiding means from
 * `unmount`: removing them (the default), keeping them in place (`false`), or
 * detaching them while keeping them alive (`'offscreen'`).
 */
export function Unmountable(props: UnmountableComponentProps): JSX.Element {
  const Root = dynamic<Conditional>(() => (props.unmount === 'offscreen' ? Offscreen : Show));
  return (
    <Root
      // `unmount` defaults to true, so an omitted prop has to mean "remove me
      // while hidden". Only an explicit `false` keeps the children mounted
      // regardless of the condition.
      when={(props.unmount ?? true) === false || props.when}
    >
      {props.children}
    </Root>
  );
}
