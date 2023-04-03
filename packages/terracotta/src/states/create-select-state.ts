import {
  createSignal,
  Accessor,
  untrack,
  JSX,
  createContext,
  createComponent,
  useContext,
  createMemo,
} from 'solid-js';
import assert from '../utils/assert';
import isEqual from '../utils/is-equal';
import { Ref } from '../utils/types';

export interface SelectStateProperties<T> {
  isSelected(value: T): boolean;
  select(value: T): void;
  hasSelected(): boolean;
  isActive(value: T): boolean;
  hasActive(): boolean;
  focus(value: T): void;
  blur(): void;
  disabled(): boolean;
}

export interface SingleSelectStateControlledOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  value: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export interface SingleSelectStateUncontrolledOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  defaultValue: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export type SingleSelectStateOptions<T> =
  | SingleSelectStateControlledOptions<T>
  | SingleSelectStateUncontrolledOptions<T>;

export function createSingleSelectState<T>(
  options: SingleSelectStateOptions<T>,
): SelectStateProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValue: Accessor<T | undefined>;
  let setSelectedValue: (value: T | undefined) => void;

  const equals = options.by || isEqual;

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
    selectedValue = createMemo(() => options.value);
    setSelectedValue = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  return {
    isSelected(value) {
      return isEqual(value, selectedValue());
    },
    select(value) {
      if (!untrack(isDisabled)) {
        if (options.toggleable && equals(untrack(selectedValue) as T, value)) {
          setSelectedValue(undefined);
        } else {
          setSelectedValue(value);
        }
      }
    },
    hasSelected() {
      return selectedValue() != null;
    },
    disabled: isDisabled,
    hasActive() {
      return !!active();
    },
    isActive(value) {
      const ref = active();
      return ref ? equals(value, ref.value) : false;
    },
    focus(value) {
      if (!untrack(isDisabled)) {
        setActive({
          value,
        });
      }
    },
    blur() {
      if (!untrack(isDisabled)) {
        setActive(undefined);
      }
    },
  };
}

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

export function createMultipleSelectState<T>(
  options: MultipleSelectStateOptions<T>,
): SelectStateProperties<T> {
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
    selectedValues = createMemo(() => options.value);
    setSelectedValues = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  return {
    isSelected(value) {
      const values = selectedValues();
      // Looks up for the value
      for (let i = 0, len = values.length; i < len; i += 1) {
        if (equals(value, values[i])) {
          return true;
        }
      }
      return false;
    },
    select(value) {
      if (!untrack(isDisabled)) {
        const newValues: T[] = [];
        const currentValues = untrack(selectedValues);
        let hasValue = false;
        for (let i = 0, len = currentValues.length; i < len; i += 1) {
          const item = currentValues[i];
          // Compare ahead
          const isSame = equals(item, value);
          // If it's the same then we mark the the target value
          // as already existing in the array
          if (isSame) {
            hasValue = true;
          }
          // If it's the same and the list is toggleable
          // don't push the item
          if (!(options.toggleable && isSame)) {
            newValues.push(item);
          }
        }
        // The value doesn't exist, push the new value
        if (!hasValue) {
          newValues.push(value);
        }
        setSelectedValues(newValues);
      }
    },
    hasSelected: createMemo(() => selectedValues().length > 0),
    disabled: isDisabled,
    hasActive: createMemo(() => !!active()),
    isActive(value) {
      const ref = active();
      if (ref) {
        return equals(value, ref.value);
      }
      return false;
    },
    focus(value) {
      if (!untrack(isDisabled)) {
        setActive({
          value,
        });
      }
    },
    blur() {
      if (!untrack(isDisabled)) {
        setActive(undefined);
      }
    },
  };
}

export interface SelectStateRenderProps<T> {
  children: JSX.Element | ((state: SelectStateProperties<T>) => JSX.Element);
}

export interface SelectStateProviderProps<T> extends SelectStateRenderProps<T> {
  state: SelectStateProperties<T>;
}

const SelectStateContext = (
  createContext<SelectStateProperties<any>>()
);

export function SelectStateProvider<T>(
  props: SelectStateProviderProps<T>,
) {
  return (
    createComponent(SelectStateContext.Provider, {
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

export function useSelectState<T>(): SelectStateProperties<T> {
  const ctx = useContext(SelectStateContext);
  assert(ctx, new Error('Missing <SelectStateProvider>'));
  return ctx;
}

export function SelectStateChild<T>(
  props: SelectStateRenderProps<T>,
): JSX.Element {
  const state = useSelectState<T>();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function') {
      return current(state);
    }
    return current;
  }) as unknown as JSX.Element;
}
