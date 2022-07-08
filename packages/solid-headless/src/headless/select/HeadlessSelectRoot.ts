import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  HeadlessSelectContext,
  HeadlessSelectProperties,
} from './useHeadlessSelectProperties';
import useHeadlessSelect, {
  HeadlessSelectOptions,
} from './useHeadlessSelect';

export type HeadlessSelectRootRenderProp<T> = (
  (properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectRootRenderProp<T>(
  children: HeadlessSelectRootRenderProp<T> | JSX.Element,
): children is HeadlessSelectRootRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export type HeadlessSelectRootProps<T> = {
  children?: HeadlessSelectRootRenderProp<T> | JSX.Element;
} & HeadlessSelectOptions<T>;

export function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element {
  const properties = useHeadlessSelect(props);
  return (
    createComponent(HeadlessSelectContext.Provider, {
      value: properties,
      children: () => {
        const body = props.children;
        if (isHeadlessSelectRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      },
    })
  );
}
