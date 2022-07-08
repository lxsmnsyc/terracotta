import {
  Accessor,
  createSignal,
} from 'solid-js';

export interface HeadlessDisclosureControlledOptions {
  isOpen: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}
export interface HeadlessDisclosureUncontrolledOptions {
  defaultOpen: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}

export type HeadlessDisclosureOptions =
  | HeadlessDisclosureControlledOptions
  | HeadlessDisclosureUncontrolledOptions;

export interface HeadlessDisclosureProperties {
  isOpen(): boolean;
  setState(newState: boolean): void;
  disabled(): boolean;
}

export function useHeadlessDisclosure(
  options: HeadlessDisclosureOptions,
): HeadlessDisclosureProperties {
  let signal: Accessor<boolean>;
  let setSignal: (value: boolean) => void;

  if ('defaultOpen' in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultOpen);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      options.onChange?.(value);
    };
  } else {
    signal = () => options.isOpen;
    setSignal = (value) => options.onChange?.(value);
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
