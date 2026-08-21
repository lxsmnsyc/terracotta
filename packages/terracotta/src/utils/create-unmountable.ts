import type { JSX } from 'solid-js';
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
  when?: boolean;
  children: JSX.Element;
}

function Offscreen(props: OffscreenProps): JSX.Element {
  const result = children(() => props.children);

  return createComponent(Show, {
    get when() {
      return props.when;
    },
    keyed: true,
    get children() {
      return result as unknown as JSX.Element;
    },
  });
}

export function createUnmountable(
  props: UnmountableProps,
  shouldMount: () => boolean,
  render: () => JSX.Element,
): JSX.Element {
  return createDynamic(() => (props.unmount === 'offscreen' ? Offscreen : Show), {
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
  });
}
