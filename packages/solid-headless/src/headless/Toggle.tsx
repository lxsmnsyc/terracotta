import {
  createContext,
  JSX,
  useContext,
} from 'solid-js';
import useControlledSignal from '../utils/use-controlled-signal';

export interface HeadlessToggleOptions {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
  CONTROLLED?: boolean;
}

export interface HeadlessToggleProperties {
  checked(): boolean | undefined;
  setState(newState?: boolean): void;
  disabled(): boolean;
}

export function useHeadlessToggle(
  options: HeadlessToggleOptions = {},
): HeadlessToggleProperties {
  const isControlled = 'CONTROLLED' in options ? options.CONTROLLED : 'checked' in options;

  const [signal, setSignal] = useControlledSignal(
    options.defaultChecked,
    isControlled ? () => options.checked : undefined,
    (value) => options.onChange?.(value),
  );

  return {
    checked() {
      return signal();
    },
    setState(value) {
      if (!options.disabled) {
        setSignal(value);
        options.onChange?.(value);
      }
    },
    disabled() {
      return !!options.disabled;
    },
  };
}

const HeadlessToggleContext = createContext<HeadlessToggleProperties>();

export type HeadlessToggleRootRenderProp = (
  (properties: HeadlessToggleProperties) => JSX.Element
);

function isHeadlessToggleRootRenderProp(
  children: HeadlessToggleRootRenderProp | JSX.Element,
): children is HeadlessToggleRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessToggleRootProps extends HeadlessToggleOptions {
  children?: HeadlessToggleRootRenderProp | JSX.Element;
}

export function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element {
  const properties = useHeadlessToggle(props);
  return (
    <HeadlessToggleContext.Provider value={properties}>
      {(() => {
        const body = props.children;
        if (isHeadlessToggleRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      })()}
    </HeadlessToggleContext.Provider>
  );
}

export function useHeadlessToggleChild(): HeadlessToggleProperties {
  const properties = useContext(HeadlessToggleContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useToggleChild` must be used within ToggleRoot.');
}

export type HeadlessToggleChildRenderProp = (
  (properties: HeadlessToggleProperties) => JSX.Element
);

function isHeadlessToggleChildRenderProp(
  children: HeadlessToggleChildRenderProp | JSX.Element,
): children is HeadlessToggleChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessToggleChildProps {
  children?: HeadlessToggleChildRenderProp | JSX.Element;
}

export function HeadlessToggleChild(props: HeadlessToggleChildProps): JSX.Element {
  const properties = useHeadlessToggleChild();
  const body = props.children;
  if (isHeadlessToggleChildRenderProp(body)) {
    return body(properties);
  }
  return body;
}
