import {
  createMemo,
  JSX,
} from 'solid-js';
import {
  useHeadlessInputProperties,
} from './HeadlessInputContext';
import {
  HeadlessInputProperties,
} from './useHeadlessInput';

export type HeadlessInputChildRenderProp = (
  (properties: HeadlessInputProperties) => JSX.Element
);

function isHeadlessInputChildRenderProp(
  children: JSX.Element | HeadlessInputChildRenderProp,
): children is HeadlessInputChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessInputChildProps {
  children?: JSX.Element | HeadlessInputChildRenderProp;
}

export function HeadlessInputChild(props: HeadlessInputChildProps): JSX.Element {
  const properties = useHeadlessInputProperties();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessInputChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
