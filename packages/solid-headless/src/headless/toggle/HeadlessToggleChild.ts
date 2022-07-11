import {
  createMemo,
  JSX,
} from 'solid-js';
import {
  useHeadlessToggleProperties,
} from './HeadlessToggleContext';
import {
  HeadlessToggleProperties,
} from './useHeadlessToggle';

export type HeadlessToggleChildRenderProp = (
  (properties: HeadlessToggleProperties) => JSX.Element
);

function isHeadlessToggleChildRenderProp(
  children: HeadlessToggleChildRenderProp | JSX.Element,
): children is HeadlessToggleChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessToggleChildProps {
  children?: HeadlessToggleChildRenderProp | JSX.Element;
}

export function HeadlessToggleChild(props: HeadlessToggleChildProps): JSX.Element {
  const properties = useHeadlessToggleProperties();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessToggleChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
