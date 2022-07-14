import {
  createComponent,
  JSX,
} from 'solid-js';
import { NonLazyElement } from '../../utils/types';
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
  children: HeadlessToggleRootRenderProp | NonLazyElement,
): children is HeadlessToggleRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessToggleRootChildren {
  children?: HeadlessToggleRootRenderProp | NonLazyElement;
}

export type HeadlessToggleRootProps = HeadlessToggleOptions & HeadlessToggleRootChildren;

export function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element {
  const properties = useHeadlessToggle(props);
  return createComponent(HeadlessToggleContext.Provider, {
    value: properties,
    children: () => {
      const body = props.children;
      if (isHeadlessToggleRootRenderProp(body)) {
        return body(properties);
      }
      return body;
    },
  });
}
