import {
  JSX,
  createMemo,
} from 'solid-js';

// An `unmountable` is a kind of component
// where one can decide if it should conditionally
// render or not.
// This is only used for disclosure-based properties
// as some implementations may allow users to use various
// ways to hide the element (e.g. opacity, display, visibility)
export interface UnmountableProps {
  unmount?: boolean | 'offscreen';
}

export function createUnmountable(
  props: UnmountableProps,
  shouldMount: () => boolean,
  render: () => JSX.Element,
): JSX.Element {
  const mode = createMemo(() => (props.unmount == null ? true : props.unmount));
  return createMemo(() => {
    const currentMode = mode();

    if (currentMode === 'offscreen') {
      const condition = createMemo(() => shouldMount());
      const children = createMemo(() => render());
      return createMemo(() => {
        if (condition()) {
          return children;
        }
        return undefined;
      });
    }
    if (currentMode) {
      const condition = createMemo(() => shouldMount());
      return createMemo(() => {
        if (condition()) {
          return createMemo(() => render());
        }
        return undefined;
      });
    }
    return createMemo(() => render());
  }) as unknown as JSX.Element;
}
