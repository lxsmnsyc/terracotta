import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  useHeadlessDisclosureProperties,
} from './HeadlessDisclosureContext';
import {
  HeadlessDisclosureProperties,
} from './useHeadlessDisclosure';

export type HeadlessDisclosureChildRenderProp = (
  (properties: HeadlessDisclosureProperties) => JSX.Element
);

function isHeadlessDisclosureChildRenderProp(
  children: JSX.Element | HeadlessDisclosureChildRenderProp,
): children is HeadlessDisclosureChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessDisclosureChildProps {
  children?: JSX.Element | HeadlessDisclosureChildRenderProp;
}

export function HeadlessDisclosureChild(props: HeadlessDisclosureChildProps): JSX.Element {
  const properties = useHeadlessDisclosureProperties();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessDisclosureChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

export function createHeadlessDisclosureChildProps(
  props: HeadlessDisclosureChildProps,
): HeadlessDisclosureChildProps {
  return {
    get children() {
      return createComponent(HeadlessDisclosureChild, {
        get children() {
          return props.children;
        },
      });
    },
  };
}
