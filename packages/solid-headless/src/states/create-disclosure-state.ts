import {
  Accessor,
  createSignal,
} from 'solid-js';

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
