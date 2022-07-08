import {
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
  children: HeadlessToggleRootRenderProp | JSX.Element,
): children is HeadlessToggleRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessToggleRootChildren {
  children?: HeadlessToggleRootRenderProp | JSX.Element;
}

export type HeadlessToggleRootProps = HeadlessToggleOptions & HeadlessToggleRootChildren;

export function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element {
  const properties = useHeadlessToggle(props);
  return (
    <HeadlessToggleContext.Provider value={properties}>
      {() => {
        const body = props.children;
        if (isHeadlessToggleRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      }}
    </HeadlessToggleContext.Provider>
  );
}
