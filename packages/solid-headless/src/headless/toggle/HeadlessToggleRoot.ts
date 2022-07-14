import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessToggleContext,
} from './HeadlessToggleContext';
import {
  HeadlessToggleProperties,
  HeadlessToggleOptions,
  useHeadlessToggle,
} from './useHeadlessToggle';

export type HeadlessToggleRootRenderProp = (
  (properties: HeadlessToggleProperties) => JSX.Element
);

function isHeadlessToggleRootRenderProp(
  children: JSX.Element | HeadlessToggleRootRenderProp,
): children is HeadlessToggleRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessToggleRootChildren {
  children?: JSX.Element | HeadlessToggleRootRenderProp;
}

export type HeadlessToggleRootProps = HeadlessToggleOptions & HeadlessToggleRootChildren;

export function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element {
  const properties = useHeadlessToggle(props);
  return createComponent(HeadlessToggleContext.Provider, {
    value: properties,
    get children() {
      return createMemo(() => {
        const body = props.children;
        if (isHeadlessToggleRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    },
  });
}
