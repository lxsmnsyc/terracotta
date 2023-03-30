import {
  Accessor,
  batch,
  createSignal,
} from 'solid-js';

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

export function useInputState(
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
