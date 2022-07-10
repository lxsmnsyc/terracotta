import {
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
  children: HeadlessDisclosureRootRenderProp | JSX.Element,
): children is HeadlessDisclosureRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessDisclosureRootChildren {
  children?: HeadlessDisclosureRootRenderProp | JSX.Element;
}

export type HeadlessDisclosureRootProps =
  HeadlessDisclosureOptions & HeadlessDisclosureRootChildren;

export function HeadlessDisclosureRoot(props: HeadlessDisclosureRootProps): JSX.Element {
  const properties = useHeadlessDisclosure(props);
  return (
    <HeadlessDisclosureContext.Provider value={properties}>
      {(() => {
        const body = props.children;
        if (isHeadlessDisclosureRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      })()}
    </HeadlessDisclosureContext.Provider>
  );
}