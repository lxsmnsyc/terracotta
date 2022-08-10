import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessInputContext,
} from './HeadlessInputContext';
import {
  HeadlessInputProperties,
  HeadlessInputOptions,
  useHeadlessInput,
} from './useHeadlessInput';

export type HeadlessInputRootRenderProp = (
  (properties: HeadlessInputProperties) => JSX.Element
);

function isHeadlessInputRootRenderProp(
  children: JSX.Element | HeadlessInputRootRenderProp,
): children is HeadlessInputRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessInputRootChildren {
  children?: JSX.Element | HeadlessInputRootRenderProp;
}

export type HeadlessInputRootProps = HeadlessInputOptions & HeadlessInputRootChildren;

export function HeadlessInputRoot(props: HeadlessInputRootProps): JSX.Element {
  const properties = useHeadlessInput(props);
  return createComponent(HeadlessInputContext.Provider, {
    value: properties,
    get children() {
      return createMemo(() => {
        const body = props.children;
        if (isHeadlessInputRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    },
  });
}
