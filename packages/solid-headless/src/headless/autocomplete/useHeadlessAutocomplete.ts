import {
  createSignal,
  Accessor,
  untrack,
  batch,
} from 'solid-js';
import {
  Ref,
} from '../../utils/types';
import {
  HeadlessAutocompleteProperties,
} from './useHeadlessAutocompleteProperties';

export interface HeadlessAutocompleteControlledOptions {
  toggleable?: boolean;
  value: string | undefined;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  matches?: (base: string, search: string) => boolean;
}

export interface HeadlessAutocompleteUncontrolledOptions {
  toggleable?: boolean;
  defaultValue: string | undefined;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  matches?: (base: string, search: string) => boolean;
}

export type HeadlessAutocompleteOptions =
  | HeadlessAutocompleteControlledOptions
  | HeadlessAutocompleteUncontrolledOptions;

export function useHeadlessAutocomplete(
  options: HeadlessAutocompleteOptions,
): HeadlessAutocompleteProperties {
  const [active, setActive] = createSignal<Ref<string>>();

  let signal: Accessor<string | undefined>;
  let setSignal: (value: string | undefined) => void;

  if ('defaultValue' in options) {
    const [input, setInput] = createSignal<string | undefined>(options.defaultValue);
    signal = input;
    setSignal = (value) => {
      batch(() => {
        setInput(() => value);
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
    setValue(value) {
      if (options.toggleable && Object.is(untrack(signal), value)) {
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
        return Object.is(value, ref.value);
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
