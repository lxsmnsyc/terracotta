import type { DynamicProps, JSX } from '@solidjs/web';
import type { Element } from 'solid-js';
import { Show, children, createComponent } from 'solid-js';
import createDynamic from './create-dynamic';

// An `unmountable` is a kind of component
// where one can decide if it should conditionally
// render or not.
// This is only used for disclosure-based properties
// as some implementations may allow users to use various
// ways to hide the element (e.g. opacity, display, visibility)
export interface UnmountableProps {
  unmount?: boolean | 'offscreen';
}

interface OffscreenProps {
  when: boolean;
  children: JSX.Element;
}

/**
 * The shape `createUnmountable` renders through. `Show` is overloaded, so it
 * only lines up with `Offscreen` once both are read as this one signature.
 */
type Conditional = (props: OffscreenProps) => JSX.Element;

function Offscreen(props: OffscreenProps): JSX.Element {
  // Resolved eagerly, and here rather than inside the branch below: the
  // subtree is then owned by `Offscreen` itself, so the condition going false
  // detaches it instead of disposing it — which is what lets an offscreen
  // element keep its state while hidden.
  const result = children(() => props.children)();

  return createComponent<{ when: boolean; keyed: true; children: Element }>(Show, {
    get when() {
      return props.when;
    },
    keyed: true,
    get children(): Element {
      return result;
    },
  });
}

export function createUnmountable(
  props: UnmountableProps,
  shouldMount: () => boolean,
  render: () => JSX.Element,
): JSX.Element {
  return createDynamic<Conditional>(() => (props.unmount === 'offscreen' ? Offscreen : Show), {
    get when() {
      // `unmount` defaults to true, so an omitted prop has to mean "remove me
      // while hidden". Only an explicit `false` keeps the children mounted
      // regardless of the condition.
      const mode = props.unmount ?? true;
      return mode === false || shouldMount();
    },
    get children() {
      return render();
    },
    // `createDynamic` supplies `component` itself, which `DynamicProps`
    // still asks for here.
  } as DynamicProps<Conditional>);
}
