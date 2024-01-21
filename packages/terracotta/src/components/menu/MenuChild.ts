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
