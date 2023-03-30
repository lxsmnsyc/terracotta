import {
  Accessor,
  createSignal,
  untrack,
} from 'solid-js';
import isEqual from '../utils/is-equal';
import { Ref } from '../utils/types';

export interface MultipleSelectStateControlledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  value: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

export interface MultipleSelectStateUncontrolledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  defaultValue: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

export type MultipleSelectStateOptions<T> =
  | MultipleSelectStateControlledOptions<T>
  | MultipleSelectStateUncontrolledOptions<T>;

export interface MultipleSelectStateProperties<T> {
  isSelected(value: T): boolean;
  select(value: T): void;
  hasSelected(): boolean;
  isActive(value: T): boolean;
  hasActive(): boolean;
  focus(value: T): void;
  blur(): void;
  disabled(): boolean;
}

export function createMultipleSelectState<T>(
  options: MultipleSelectStateOptions<T>,
): MultipleSelectStateProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValues: Accessor<T[]>;
  let setSelectedValues: (value: T[]) => void;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T[]>(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      setSelected(() => value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    selectedValues = () => options.value;
    setSelectedValues = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    isSelected(value) {
      return new Set(selectedValues()).has(value);
    },
    select(value) {
      const set = new Set(untrack(selectedValues));
      if (options.toggleable && set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      setSelectedValues([
        ...set,
      ]);
    },
    hasSelected() {
      return selectedValues().length > 0;
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
