import {
  createMemo,
  JSX,
} from 'solid-js';

export interface MenuProperties {
  disabled: () => boolean;
}

export type MenuChildRenderProp = (
  (properties: MenuProperties) => JSX.Element
);

function isMenuChildRenderProp(
  children: MenuChildRenderProp | JSX.Element,
): children is MenuChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface MenuChildProps {
  disabled?: boolean;
  children?: MenuChildRenderProp | JSX.Element;
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
