import {
  createSignal,
  Accessor,
  untrack,
  JSX,
  createContext,
  createComponent,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';
import isEqual from '../utils/is-equal';
import { Ref } from '../utils/types';

export interface SingleSelectStateControlledOptions<T> {
  toggleable?: boolean;
  value: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
}

export interface SingleSelectStateUncontrolledOptions<T> {
  toggleable?: boolean;
  defaultValue: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  by?: (a: T, b: T) => boolean;
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
      if (options.toggleable && equals(untrack(selectedValue) as T, value)) {
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
      return ref ? equals(value, ref.value) : false;
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

export interface SingleSelectStateProviderProps<T> {
  state: SingleSelectStateProperties<T>;
  children: JSX.Element | ((state: SingleSelectStateProperties<T>) => JSX.Element);
}

const SingleSelectStateContext = (
  createContext<SingleSelectStateProperties<any>>()
);

export function SingleSelectStateProvider<T>(
  props: SingleSelectStateProviderProps<T>,
) {
  return (
    createComponent(SingleSelectStateContext.Provider, {
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

export function useSingleSelectState<T>(): SingleSelectStateProperties<T> {
  const ctx = useContext(SingleSelectStateContext);
  assert(ctx, new Error('Missing <SingleSelectStateProvider>'));
  return ctx;
}
