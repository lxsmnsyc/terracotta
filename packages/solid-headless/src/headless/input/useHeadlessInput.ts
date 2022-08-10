import {
  Accessor,
  batch,
  createSignal,
} from 'solid-js';

export interface HeadlessInputControlledOptions {
  value: string | undefined;
  disabled?: string;
  onChange?: (state?: string) => void;
}

export interface HeadlessInputUncontrolledOptions {
  defaultValue: string | undefined;
  disabled?: boolean;
  onChange?: (state?: string) => void;
}

export type HeadlessInputOptions =
  | HeadlessInputControlledOptions
  | HeadlessInputUncontrolledOptions;

export interface HeadlessInputProperties {
  value(): string | undefined;
  setState(newState?: string): void;
  disabled(): boolean;
}

export function useHeadlessInput(
  options: HeadlessInputOptions,
): HeadlessInputProperties {
  let signal: Accessor<string | undefined>;
  let setSignal: (value: string | undefined) => void;

  if ('defaultValue' in options) {
    const [input, setInput] = createSignal<string | undefined>(options.defaultValue);
    signal = input;
    setSignal = (value) => {
      batch(() => {
        setInput(value);
        options.onChange?.(value);
      });
    };
  } else {
    signal = () => options.value;
    setSignal = (value) => options.onChange?.(value);
  }

  return {
    value() {
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
