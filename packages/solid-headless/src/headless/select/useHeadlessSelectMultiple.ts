import {
  Accessor,
  batch,
  createSignal,
  untrack,
} from 'solid-js';
import {
  Ref,
} from '../../utils/types';
import {
  HeadlessSelectProperties,
} from './useHeadlessSelectProperties';

export interface HeadlessSelectMultipleControlledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  value: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

export interface HeadlessSelectMultipleUncontrolledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  defaultValue: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

export type HeadlessSelectMultipleOptions<T> =
  | HeadlessSelectMultipleControlledOptions<T>
  | HeadlessSelectMultipleUncontrolledOptions<T>;

export function useHeadlessSelectMultiple<T>(
  options: HeadlessSelectMultipleOptions<T>,
): HeadlessSelectProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValues: Accessor<T[]>;
  let setSelectedValues: (value: T[]) => void;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T[]>(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      batch(() => {
        setSelected(() => value);
        options.onChange?.(value);
      });
    };
  } else {
    selectedValues = () => options.value;
    setSelectedValues = (value) => options.onChange?.(value);
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
