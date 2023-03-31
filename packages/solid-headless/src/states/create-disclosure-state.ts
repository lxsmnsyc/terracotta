import {
  Accessor,
  createComponent,
  createContext,
  createSignal,
  JSX,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';

export interface DisclosureStateControlledOptions {
  isOpen: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}
export interface DisclosureStateUncontrolledOptions {
  defaultOpen: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}

export type DisclosureStateOptions =
  | DisclosureStateControlledOptions
  | DisclosureStateUncontrolledOptions;

export interface DisclosureStateProperties {
  isOpen(): boolean;
  setState(newState: boolean): void;
  disabled(): boolean;
}

export function createDisclosureState(
  options: DisclosureStateOptions,
): DisclosureStateProperties {
  let signal: Accessor<boolean>;
  let setSignal: (value: boolean) => void;

  if ('defaultOpen' in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultOpen);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    signal = () => options.isOpen;
    setSignal = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    isOpen() {
      return signal();
    },
    setState(value) {
      if (!options.disabled) {
        setSignal(value);
      }
    },
    disabled() {
      return !!options.disabled;
    },
  };
}

export interface DisclosureStateProviderRenderProps {
  children: JSX.Element | ((state: DisclosureStateProperties) => JSX.Element);
}

export interface DisclosureStateProviderProps extends DisclosureStateProviderRenderProps {
  state: DisclosureStateProperties;
}

const DisclosureStateContext = (
  createContext<DisclosureStateProperties>()
);

export function DisclosureStateProvider(
  props: DisclosureStateProviderProps,
) {
  return (
    createComponent(DisclosureStateContext.Provider, {
      value: props.state,
      get children() {
        const current = props.children;
        if (typeof current === 'function') {
          return current(props.state);
        }
        return current;
      },
    })
  );
}

export function useDisclosureState(): DisclosureStateProperties {
  const ctx = useContext(DisclosureStateContext);
  assert(ctx, new Error('Missing <DisclosureStateProvider>'));
  return ctx;
}