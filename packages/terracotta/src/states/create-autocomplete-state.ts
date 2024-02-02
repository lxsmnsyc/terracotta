import type { Accessor, JSX } from 'solid-js';
import {
  createComponent,
  createContext,
  createMemo,
  createSignal,
  untrack,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';
import createInputReader from '../utils/create-input-reader';
import isEqual from '../utils/is-equal';
import type { Ref } from '../utils/types';

export interface AutocompleteStateProperties<T> {
  isSelected(value: T): boolean;
  select(value: T): void;
  hasSelected(): boolean;
  isActive(value: T): boolean;
  hasActive(): boolean;
  focus(value: T): void;
  blur(): void;
  disabled(): boolean;
  query(): string;
  setQuery(value: string): void;
  matches(value: T): boolean;
  hasQuery(): boolean;
}

export interface SingleAutocompleteStateControlledOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  value: T;
  matchBy: (value: T, query: string) => boolean;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export interface SingleAutocompleteStateUncontrolledOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  defaultValue: T;
  matchBy: (value: T, query: string) => boolean;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export type SingleAutocompleteStateOptions<T> =
  | SingleAutocompleteStateControlledOptions<T>
  | SingleAutocompleteStateUncontrolledOptions<T>;

export function createSingleAutocompleteState<T>(
  options: SingleAutocompleteStateOptions<T>,
): AutocompleteStateProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValue: Accessor<T | undefined>;
  let setSelectedValue: (value: T | undefined) => void;

  const equals = options.by || isEqual;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T | undefined>(
      options.defaultValue,
    );
    selectedValue = selected;
    setSelectedValue = (value): void => {
      setSelected(() => value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    selectedValue = createMemo(() => options.value);
    setSelectedValue = (value): void => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  const [input, setInput] = createInputReader();

  return {
    isSelected(value): boolean {
      return isEqual(value, selectedValue());
    },
    select(value): void {
      if (!untrack(isDisabled)) {
        if (options.toggleable && equals(untrack(selectedValue) as T, value)) {
          setSelectedValue(undefined);
        } else {
          setSelectedValue(value);
        }
      }
    },
    hasSelected(): boolean {
      return selectedValue() != null;
    },
    disabled: isDisabled,
    hasActive(): boolean {
      return !!active();
    },
    isActive(value): boolean {
      const ref = active();
      return ref ? equals(value, ref.value) : false;
    },
    focus(value): void {
      if (!untrack(isDisabled)) {
        setActive({
          value,
        });
      }
    },
    blur(): void {
      if (!untrack(isDisabled)) {
        setActive(undefined);
      }
    },
    query(): string {
      return input();
    },
    setQuery(value): void {
      if (!untrack(isDisabled)) {
        setInput(value);
      }
    },
    matches(value): boolean {
      return options.matchBy(value, input());
    },
    hasQuery: createMemo(() => !!input()),
  };
}

export interface MultipleAutocompleteStateControlledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  value: T[];
  matchBy: (value: T, query: string) => boolean;
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export interface MultipleAutocompleteStateUncontrolledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  defaultValue: T[];
  matchBy: (value: T, query: string) => boolean;
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export type MultipleAutocompleteStateOptions<T> =
  | MultipleAutocompleteStateControlledOptions<T>
  | MultipleAutocompleteStateUncontrolledOptions<T>;

export function createMultipleAutocompleteState<T>(
  options: MultipleAutocompleteStateOptions<T>,
): AutocompleteStateProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValues: Accessor<T[]>;
  let setSelectedValues: (value: T[]) => void;

  const equals = options.by || isEqual;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T[]>(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value): void => {
      setSelected(() => value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    selectedValues = createMemo(() => options.value);
    setSelectedValues = (value): void => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  const [input, setInput] = createInputReader();

  return {
    isSelected(value): boolean {
      const values = selectedValues();
      // Looks up for the value
      for (let i = 0, len = values.length; i < len; i += 1) {
        if (equals(value, values[i])) {
          return true;
        }
      }
      return false;
    },
    select(value): void {
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
    isActive(value): boolean {
      const ref = active();
      if (ref) {
        return equals(value, ref.value);
      }
      return false;
    },
    focus(value): void {
      if (!untrack(isDisabled)) {
        setActive({
          value,
        });
      }
    },
    blur(): void {
      if (!untrack(isDisabled)) {
        setActive(undefined);
      }
    },
    query(): string {
      return input();
    },
    setQuery(value): void {
      setInput(value);
    },
    matches(value): boolean {
      return options.matchBy(value, input());
    },
    hasQuery: createMemo(() => !!input()),
  };
}

export interface AutocompleteStateRenderProps<T> {
  children?:
    | JSX.Element
    | ((state: AutocompleteStateProperties<T>) => JSX.Element);
}

export interface AutocompleteStateProviderProps<T>
  extends AutocompleteStateRenderProps<T> {
  state: AutocompleteStateProperties<T>;
}

const AutocompleteStateContext =
  createContext<AutocompleteStateProperties<unknown>>();

export function AutocompleteStateProvider<T>(
  props: AutocompleteStateProviderProps<T>,
): JSX.Element {
  return createComponent(AutocompleteStateContext.Provider, {
    value: props.state,
    get children() {
      const current = props.children;
      if (typeof current === 'function') {
        return current(props.state);
      }
      return current;
    },
  });
}

export function useAutocompleteState<T>(): AutocompleteStateProperties<T> {
  const ctx = useContext(AutocompleteStateContext);
  assert(ctx, new Error('Missing <AutocompleteStateProvider>'));
  return ctx;
}

export function AutocompleteStateChild<T>(
  props: AutocompleteStateRenderProps<T>,
): JSX.Element {
  const state = useAutocompleteState<T>();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function' && current.length === 1) {
      return createMemo(() => current(state));
    }
    return current;
  }) as unknown as JSX.Element;
}
