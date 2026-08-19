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
 * Renders the children of a `Menu` without adding an element of its own.
 * Useful when the items come from a wrapper component that would otherwise
 * break the parent-child relationship the menu relies on.
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
