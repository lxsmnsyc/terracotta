import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';

export interface MenuProperties {
  disabled: () => boolean;
}

export type MenuChildRenderProp = (properties: MenuProperties) => JSX.Element;

export interface MenuChildProps {
  disabled?: boolean;
  children?: JSX.Element | MenuChildRenderProp;
}

/**
 * The render prop a `MenuItem` passes to its children, available as a
 * standalone component. It renders no element of its own, and reports its own
 * `disabled` prop rather than the surrounding item's.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/menu.md}
 */
export function MenuChild(props: MenuChildProps): JSX.Element {
  return createMemo(() => {
    const body = props.children;
    if (typeof body === 'function') {
      return body({
        disabled: () => !!props.disabled,
      });
    }
    return body;
  }) as unknown as JSX.Element;
}
