import type { JSX } from 'solid-js';
import { children, createMemo } from 'solid-js';

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
      const current = children(() => render());
      return createMemo(() => condition() && current);
    }
    if (currentMode) {
      const condition = createMemo(() => shouldMount());
      return createMemo(() => condition() && render);
    }
    return render;
  }) as unknown as JSX.Element;
}
