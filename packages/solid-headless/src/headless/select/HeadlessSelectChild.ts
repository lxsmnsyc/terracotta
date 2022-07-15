import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessSelectProperties,
  useHeadlessSelectProperties,
} from './useHeadlessSelectProperties';

export type HeadlessSelectChildRenderProp<T> = (
  (properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectChildRenderProp<T>(
  children: JSX.Element | HeadlessSelectChildRenderProp<T>,
): children is HeadlessSelectChildRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessSelectChildProps<T> {
  children?: JSX.Element | HeadlessSelectChildRenderProp<T>;
}

export function HeadlessSelectChild<T>(props: HeadlessSelectChildProps<T>): JSX.Element {
  const properties = useHeadlessSelectProperties<T>();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessSelectChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

export function createHeadlessSelectChild<T>(
  props: HeadlessSelectChildProps<T>,
): { children: JSX.Element } {
  return {
    get children() {
      return createComponent(HeadlessSelectChild, {
        get children() {
          return props.children;
        },
      });
    },
  };
}
