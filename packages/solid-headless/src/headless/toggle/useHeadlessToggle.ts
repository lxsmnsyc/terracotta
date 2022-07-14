import {
  Accessor,
  batch,
  createSignal,
} from 'solid-js';

export interface HeadlessToggleControlledOptions {
  checked: boolean | undefined;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
}

export interface HeadlessToggleUncontrolledOptions {
  defaultChecked: boolean | undefined;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
}

export type HeadlessToggleOptions =
  | HeadlessToggleControlledOptions
  | HeadlessToggleUncontrolledOptions;

export interface HeadlessToggleProperties {
  checked(): boolean | undefined;
  setState(newState?: boolean): void;
  disabled(): boolean;
}

export function useHeadlessToggle(
  options: HeadlessToggleOptions,
): HeadlessToggleProperties {
  let signal: Accessor<boolean | undefined>;
  let setSignal: (value: boolean | undefined) => void;

  if ('defaultChecked' in options) {
    const [isOpen, setIsOpen] = createSignal<boolean | undefined>(options.defaultChecked);
    signal = isOpen;
    setSignal = (value) => {
      batch(() => {
        setIsOpen(value);
        options.onChange?.(value);
      });
    };
  } else {
    signal = () => options.checked;
    setSignal = (value) => options.onChange?.(value);
  }

  return {
    checked() {
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
