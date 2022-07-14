import {
  createMemo,
  JSX,
} from 'solid-js';
import { NonLazyElement } from '../../utils/types';
import {
  HeadlessSelectProperties,
  useHeadlessSelectProperties,
} from './useHeadlessSelectProperties';

export type HeadlessSelectChildRenderProp<T> = (
  (properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectChildRenderProp<T>(
  children: HeadlessSelectChildRenderProp<T> | NonLazyElement,
): children is HeadlessSelectChildRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessSelectChildProps<T> {
  children?: HeadlessSelectChildRenderProp<T> | NonLazyElement;
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
