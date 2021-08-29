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
  defaultOpen?: boolean;
  disabled?: boolean;
}

export interface HeadlessDisclosureProperties {
  isOpen(): boolean;
  setState(newState: boolean): void;
  disabled(): boolean;
}

export function useHeadlessDisclosure(
  options: HeadlessDisclosureOptions = {},
): HeadlessDisclosureProperties {
  const [signal, setSignal] = createSignal(untrack(() => !!options.defaultOpen));

  createEffect(() => {
    setSignal(!!options.isOpen);
  });

  return {
    isOpen() {
      return signal();
    },
    setState(value) {
      setSignal(value);
    },
    disabled() {
      return !!options.disabled;
    },
  };
}

const HeadlessDisclosureContext = createContext<HeadlessDisclosureProperties>();

export type HeadlessDisclosureRootRenderProp = (
  (properties: HeadlessDisclosureProperties) => JSX.Element
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

export function useHeadlessDisclosureChild(): HeadlessDisclosureProperties {
  const properties = useContext(HeadlessDisclosureContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useDisclosureChild` must be used within DisclosureRoot.');
}

export type HeadlessDisclosureChildRenderProp = (
  (properties: HeadlessDisclosureProperties) => JSX.Element
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
  const properties = useHeadlessDisclosureChild();
  const body = props.children;
  if (isHeadlessDisclosureChildRenderProp(body)) {
    return body(properties);
  }
  return body;
}
