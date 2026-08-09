import type { Accessor, JSX } from 'solid-js';
import { createComponent, createContext, createMemo, createSignal, useContext } from 'solid-js';
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

export type InputStateOptions = InputStateControlledOptions | InputStateUncontrolledOptions;

export interface InputStateProperties {
  value: () => string | undefined;
  setState: (newState?: string) => void;
  disabled: () => boolean;
}

/**
 * Creates a plain string state. Exported for building text-input components.
 *
 * Pass `defaultValue` for uncontrolled state or `value` for controlled.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#input-state}
 */
export function createInputState(options: InputStateOptions): InputStateProperties {
  let signal: Accessor<string | undefined>;
  let setSignal: (value: string | undefined) => void;

  if ('defaultValue' in options) {
    const [input, setInput] = createSignal<string | undefined>(options.defaultValue);
    signal = input;
    setSignal = (value): void => {
      setInput(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    signal = (): string | undefined => options.value;
    setSignal = (value): void => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    value(): string | undefined {
      return signal();
    },
    setState(value): void {
      if (!options.disabled) {
        setSignal(value);
      }
    },
    disabled(): boolean {
      return !!options.disabled;
    },
  };
}

export interface InputStateRenderProps {
  children?: JSX.Element | ((state: InputStateProperties) => JSX.Element);
}

export interface InputStateProviderProps extends InputStateRenderProps {
  state: InputStateProperties;
}

const InputStateContext = createContext<InputStateProperties>();

export function InputStateProvider(props: InputStateProviderProps): JSX.Element {
  return createComponent(InputStateContext.Provider, {
    value: props.state,
    get children() {
      const current = props.children;
      if (typeof current === 'function') {
        return current(props.state);
      }
      return current;
    },
  });
}

/**
 * Reads the nearest input state from context. Throws when there is none.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#input-state}
 */
export function useInputState(): InputStateProperties {
  const ctx = useContext(InputStateContext);
  assert(ctx, new Error('Missing <InputStateProvider>'));
  return ctx;
}

/**
 * Passes the nearest input state to a render prop. A function child is treated
 * as a render prop only when it declares exactly one parameter.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#input-state}
 */
export function InputStateChild(props: InputStateRenderProps): JSX.Element {
  const state = useInputState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function' && current.length === 1) {
      return createMemo(() => current(state));
    }
    return current;
  }) as unknown as JSX.Element;
}
