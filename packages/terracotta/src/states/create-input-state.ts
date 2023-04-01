import {
  Accessor,
  createComponent,
  createContext,
  createMemo,
  createSignal,
  JSX,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';

export interface InputStateControlledOptions {
  value: string | undefined;
  disabled?: string;
  onChange?: (state?: string) => void;
}

export interface InputStateUncontrolledOptions {
  defaultValue: string | undefined;
  disabled?: boolean;
  onChange?: (state?: string) => void;
}

export type InputStateOptions =
  | InputStateControlledOptions
  | InputStateUncontrolledOptions;

export interface InputStateProperties {
  value(): string | undefined;
  setState(newState?: string): void;
  disabled(): boolean;
}

export function createInputState(
  options: InputStateOptions,
): InputStateProperties {
  let signal: Accessor<string | undefined>;
  let setSignal: (value: string | undefined) => void;

  if ('defaultValue' in options) {
    const [input, setInput] = createSignal<string | undefined>(options.defaultValue);
    signal = input;
    setSignal = (value) => {
      setInput(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    signal = () => options.value;
    setSignal = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    value() {
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

export interface InputStateRenderProps {
  children: JSX.Element | ((state: InputStateProperties) => JSX.Element);
}

export interface InputStateProviderProps extends InputStateRenderProps {
  state: InputStateProperties;
}

const InputStateContext = (
  createContext<InputStateProperties>()
);

export function InputStateProvider(
  props: InputStateProviderProps,
) {
  return (
    createComponent(InputStateContext.Provider, {
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

export function useInputState(): InputStateProperties {
  const ctx = useContext(InputStateContext);
  assert(ctx, new Error('Missing <InputStateProvider>'));
  return ctx;
}

export function InputStateChild(
  props: InputStateRenderProps,
): JSX.Element {
  const state = useInputState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function') {
      return current(state);
    }
    return current;
  }) as unknown as JSX.Element;
}
