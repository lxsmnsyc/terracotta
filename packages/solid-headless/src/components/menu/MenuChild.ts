import {
  createMemo,
  JSX,
} from 'solid-js';
import { NonLazyElement } from '../../utils/types';

export interface MenuProperties {
  disabled: () => boolean;
}

export type MenuChildRenderProp = (
  (properties: MenuProperties) => JSX.Element
);

function isMenuChildRenderProp(
  children: MenuChildRenderProp | NonLazyElement,
): children is MenuChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface MenuChildProps {
  disabled?: boolean;
  children?: MenuChildRenderProp | NonLazyElement;
}

export function MenuChild(props: MenuChildProps): JSX.Element {
  return createMemo(() => {
    const body = props.children;
    if (isMenuChildRenderProp(body)) {
      return body({
        disabled: () => !!props.disabled,
      });
    }
    return body;
  });
}
