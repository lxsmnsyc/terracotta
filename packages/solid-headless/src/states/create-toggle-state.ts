import {
  Accessor,
  createSignal,
} from 'solid-js';

export interface ToggleStateControlledOptions {
  checked: boolean | undefined;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
}

export interface ToggleStateUncontrolledOptions {
  defaultChecked: boolean | undefined;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
}

export type ToggleStateOptions =
  | ToggleStateControlledOptions
  | ToggleStateUncontrolledOptions;

export interface ToggleStateProperties {
  checked(): boolean | undefined;
  setState(newState?: boolean): void;
  disabled(): boolean;
}

export function createToggleState(
  options: ToggleStateOptions,
): ToggleStateProperties {
  // Reference to the signal read
  let signal: Accessor<boolean | undefined>;
  // Reference to the signal write
  let setSignal: (value: boolean | undefined) => void;

  // Type branding
  // Check if state is uncontrolled
  if ('defaultChecked' in options) {
    // Uncontrolled toggle means the toggle
    // manages its own state.
    const [isOpen, setIsOpen] = createSignal<boolean | undefined>(options.defaultChecked);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    // Controlled means relying on 3P state
    signal = () => options.checked;
    setSignal = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    checked() {
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
