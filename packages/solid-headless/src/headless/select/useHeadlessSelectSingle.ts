import {
  createSignal,
  Accessor,
  untrack,
} from 'solid-js';
import {
  Ref,
} from '../../utils/types';
import {
  HeadlessSelectProperties,
} from './useHeadlessSelectProperties';

export interface HeadlessSelectSingleControlledOptions<T> {
  toggleable?: boolean;
  value: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
}

export interface HeadlessSelectSingleUncontrolledOptions<T> {
  toggleable?: boolean;
  defaultValue: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
}

export type HeadlessSelectSingleOptions<T> =
  | HeadlessSelectSingleControlledOptions<T>
  | HeadlessSelectSingleUncontrolledOptions<T>;

export function useHeadlessSelectSingle<T>(
  options: HeadlessSelectSingleOptions<T>,
): HeadlessSelectProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValue: Accessor<T | undefined>;
  let setSelectedValue: (value: T | undefined) => void;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T | undefined>(options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      setSelected(() => value);
      options.onChange?.(value);
    };
  } else {
    selectedValue = () => options.value;
    setSelectedValue = (value) => options.onChange?.(value);
  }

  return {
    isSelected(value) {
      return Object.is(value, selectedValue());
    },
    select(value) {
      if (options.toggleable && Object.is(untrack(selectedValue), value)) {
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
