import {
  createSignal,
  Accessor,
  untrack,
} from 'solid-js';
import isEqual from '../utils/is-equal';
import { Ref } from '../utils/types';

export interface AutocompleteStateControlledOptions {
  toggleable?: boolean;
  value: string | undefined;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  matches?: (base: string, search: string) => boolean;
}

export interface AutocompleteStateUncontrolledOptions {
  toggleable?: boolean;
  defaultValue: string | undefined;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  matches?: (base: string, search: string) => boolean;
}

export type AutocompleteStateOptions =
  | AutocompleteStateControlledOptions
  | AutocompleteStateUncontrolledOptions;

export interface AutocompleteStateProperties {
  value(): string | undefined;
  setValue(value?: string): void;
  matches(value: string): boolean;
  isActive(value: string): boolean;
  hasActive(): boolean;
  focus(value: string): void;
  blur(): void;
  disabled(): boolean;
}

export function useAutocompleteState(
  options: AutocompleteStateOptions,
): AutocompleteStateProperties {
  const [active, setActive] = createSignal<Ref<string>>();

  let signal: Accessor<string | undefined>;
  let setSignal: (value: string | undefined) => void;

  if ('defaultValue' in options) {
    const [input, setInput] = createSignal<string | undefined>(options.defaultValue);
    signal = input;
    setSignal = (value) => {
      setInput(() => value);
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
    setValue(value) {
      if (options.toggleable && isEqual(untrack(signal), value)) {
        setSignal(undefined);
      } else {
        setSignal(value);
      }
    },
    matches(value) {
      const currentValue = signal();
      if (!currentValue) {
        return false;
      }
      if (options.matches) {
        return options.matches(currentValue, value);
      }
      return currentValue.includes(value);
    },
    disabled() {
      return !!options.disabled;
    },
    hasActive() {
      return !!active();
    },
    isActive(value) {
      const ref = active();
      if (ref) {
        return isEqual(value, ref.value);
      }
      return false;
    },
    focus(value) {
      return setActive({
        value,
      });
    },
    blur() {
      return setActive(undefined);
    },
  };
}
