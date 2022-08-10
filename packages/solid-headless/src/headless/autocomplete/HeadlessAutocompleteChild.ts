import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessAutocompleteProperties,
  useHeadlessAutocompleteProperties,
} from './useHeadlessAutocompleteProperties';

export type HeadlessAutocompleteChildRenderProp = (
  (properties: HeadlessAutocompleteProperties) => JSX.Element
);

function isHeadlessAutocompleteChildRenderProp(
  children: JSX.Element | HeadlessAutocompleteChildRenderProp,
): children is HeadlessAutocompleteChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessAutocompleteChildProps {
  children?: JSX.Element | HeadlessAutocompleteChildRenderProp;
}

export function HeadlessAutocompleteChild(props: HeadlessAutocompleteChildProps): JSX.Element {
  const properties = useHeadlessAutocompleteProperties();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessAutocompleteChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

export function createHeadlessAutocompleteChild(
  props: HeadlessAutocompleteChildProps,
): { children: JSX.Element } {
  return {
    get children() {
      return createComponent(HeadlessAutocompleteChild, {
        get children() {
          return props.children;
        },
      });
    },
  };
}
