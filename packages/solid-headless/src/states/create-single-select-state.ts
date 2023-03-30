import {
  createSignal,
  Accessor,
  untrack,
} from 'solid-js';
import isEqual from '../utils/is-equal';
import { Ref } from '../utils/types';

export interface SingleSelectStateControlledOptions<T> {
  toggleable?: boolean;
  value: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
}

export interface SingleSelectStateUncontrolledOptions<T> {
  toggleable?: boolean;
  defaultValue: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
}

export type SingleSelectStateOptions<T> =
  | SingleSelectStateControlledOptions<T>
  | SingleSelectStateUncontrolledOptions<T>;

export interface SingleSelectStateProperties<T> {
  isSelected(value: T): boolean;
  select(value: T): void;
  hasSelected(): boolean;
  isActive(value: T): boolean;
  hasActive(): boolean;
  focus(value: T): void;
  blur(): void;
  disabled(): boolean;
}

export function createSingleSelectState<T>(
  options: SingleSelectStateOptions<T>,
): SingleSelectStateProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValue: Accessor<T | undefined>;
  let setSelectedValue: (value: T | undefined) => void;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T | undefined>(options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      setSelected(() => value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    selectedValue = () => options.value;
    setSelectedValue = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    isSelected(value) {
      return isEqual(value, selectedValue());
    },
    select(value) {
      if (options.toggleable && isEqual(untrack(selectedValue), value)) {
        setSelectedValue(undefined);
      } else {
        setSelectedValue(value);
      }
    },
    hasSelected() {
      return selectedValue() != null;
    },
    disabled() {
      return !!options.disabled;
    },
    hasActive() {
      return !!active();
    },
    isActive(value) {
      const ref = active();
      return ref ? isEqual(value, ref.value) : false;
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
