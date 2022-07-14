import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessDisclosureContext,
} from './HeadlessDisclosureContext';
import {
  HeadlessDisclosureOptions,
  HeadlessDisclosureProperties,
  useHeadlessDisclosure,
} from './useHeadlessDisclosure';

export type HeadlessDisclosureRootRenderProp = (
  (properties: HeadlessDisclosureProperties) => JSX.Element
);

function isHeadlessDisclosureRootRenderProp(
  children: JSX.Element | HeadlessDisclosureRootRenderProp,
): children is HeadlessDisclosureRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessDisclosureRootChildren {
  children?: JSX.Element | HeadlessDisclosureRootRenderProp;
}

export type HeadlessDisclosureRootProps =
  HeadlessDisclosureOptions & HeadlessDisclosureRootChildren;

export function HeadlessDisclosureRoot(props: HeadlessDisclosureRootProps): JSX.Element {
  const properties = useHeadlessDisclosure(props);
  return createComponent(HeadlessDisclosureContext.Provider, {
    value: properties,
    get children() {
      return createMemo(() => {
        const body = props.children;
        if (isHeadlessDisclosureRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    },
  });
}
