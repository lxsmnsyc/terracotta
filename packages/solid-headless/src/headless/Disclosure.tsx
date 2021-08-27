import {
  createContext,
  createEffect,
  createSignal,
  JSX,
  untrack,
  useContext,
} from 'solid-js';

export interface HeadlessDisclosureOptions {
  isOpen?: boolean;
  initialOpen?: boolean;
}

export type HeadlessDisclosureProperties = [
  () => boolean,
  (newState: boolean) => void,
];

export function useHeadlessDisclosure(
  options: HeadlessDisclosureOptions = {},
): HeadlessDisclosureProperties {
  const [signal, setSignal] = createSignal(untrack(() => !!options.initialOpen));

  createEffect(() => {
    setSignal(!!options.isOpen);
  });

  return [
    signal,
    setSignal,
  ];
}

const HeadlessDisclosureContext = createContext<HeadlessDisclosureProperties>();

export type HeadlessDisclosureRootRenderProp = (
  (...properties: HeadlessDisclosureProperties) => JSX.Element
);

function isHeadlessDisclosureRootRenderProp(
  children: HeadlessDisclosureRootRenderProp | JSX.Element,
): children is HeadlessDisclosureRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessDisclosureRootProps extends HeadlessDisclosureOptions {
  children?: HeadlessDisclosureRootRenderProp | JSX.Element;
}

export function HeadlessDisclosureRoot(props: HeadlessDisclosureRootProps): JSX.Element {
  const properties = useHeadlessDisclosure(props);
  if (isHeadlessDisclosureRootRenderProp(props.children)) {
    return (
      <HeadlessDisclosureContext.Provider value={properties}>
        {props.children(...properties)}
      </HeadlessDisclosureContext.Provider>
    );
  }
  return (
    <HeadlessDisclosureContext.Provider value={properties}>
      {props.children}
    </HeadlessDisclosureContext.Provider>
  );
}

export function useHeadlessDisclosureChild(): HeadlessDisclosureProperties {
  const properties = useContext(HeadlessDisclosureContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useDisclosureChild` must be used within DisclosureRoot.');
}

export type HeadlessDisclosureChildRenderProp = (
  (...properties: HeadlessDisclosureProperties) => JSX.Element
);

function isHeadlessDisclosureChildRenderProp(
  children: HeadlessDisclosureChildRenderProp | JSX.Element,
): children is HeadlessDisclosureChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessDisclosureChildProps {
  children?: HeadlessDisclosureChildRenderProp | JSX.Element;
}

export function HeadlessDisclosureChild(props: HeadlessDisclosureChildProps): JSX.Element {
  const [state, setState] = useHeadlessDisclosureChild();
  if (isHeadlessDisclosureChildRenderProp(props.children)) {
    return props.children(state, setState);
  }
  return props.children;
}
