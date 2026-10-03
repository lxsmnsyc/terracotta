import type { JSX } from '@solidjs/web';

/**
 * The children of a state provider: rendered as they are, or called with the
 * state when they are a render prop.
 */
export function renderChildren<T>(
  children: JSX.Element | ((state: T) => JSX.Element) | undefined,
  state: T,
): JSX.Element {
  if (typeof children === 'function') {
    return children(state);
  }
  return children;
}
