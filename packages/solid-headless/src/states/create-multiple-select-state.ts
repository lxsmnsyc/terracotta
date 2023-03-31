import {
  Accessor,
  createComponent,
  createContext,
  createSignal,
  JSX,
  untrack,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';
import isEqual from '../utils/is-equal';
import { Ref } from '../utils/types';

export interface MultipleSelectStateControlledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  value: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export interface MultipleSelectStateUncontrolledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  defaultValue: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
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

  const equals = options.by || isEqual;

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
      const values = selectedValues();
      for (let i = 0, len = values.length; i < len; i += 1) {
        if (equals(value, values[i])) {
          return true;
        }
      }
      return false;
    },
    select(value) {
      const newValues: T[] = [];
      const currentValues = untrack(selectedValues);
      for (let i = 0, len = currentValues.length; i < len; i += 1) {
        const item = currentValues[i];
        if (!(options.toggleable && equals(item, value))) {
          newValues.push(item);
        }
      }
      setSelectedValues(newValues);
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
        return equals(value, ref.value);
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

export interface MultipleSelectStateProviderProps<T> {
  state: MultipleSelectStateProperties<T>;
  children: JSX.Element | ((state: MultipleSelectStateProperties<T>) => JSX.Element);
}

const MultipleSelectStateContext = (
  createContext<MultipleSelectStateProperties<any>>()
);

export function MultipleSelectStateProvider<T>(
  props: MultipleSelectStateProviderProps<T>,
) {
  return (
    createComponent(MultipleSelectStateContext.Provider, {
      value: props.state,
      get children() {
        const current = props.children;
        if (typeof current === 'function') {
          return current(props.state);
        }
        return current;
      },
    })
  );
}

export function useMultipleSelectState<T>(): MultipleSelectStateProperties<T> {
  const ctx = useContext(MultipleSelectStateContext);
  assert(ctx, new Error('Missing <MultipleSelectStateProvider>'));
  return ctx;
}
