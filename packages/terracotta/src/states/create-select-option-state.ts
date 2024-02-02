import type { JSX } from 'solid-js';
import {
  createComponent,
  createContext,
  createMemo,
  untrack,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';
import { useSelectState } from './create-select-state';

export interface SelectOptionStateOptions<T> {
  value: T;
  disabled?: boolean;
}

export interface SelectOptionStateProperties {
  isSelected(): boolean;
  select(): void;
  isActive(): boolean;
  focus(): void;
  blur(): void;
  disabled(): boolean;
}

export function createSelectOptionState<T>(
  options: SelectOptionStateOptions<T>,
): SelectOptionStateProperties {
  const state = useSelectState<T>();
  const isDisabled = createMemo(() => options.disabled || state.disabled());
  return {
    isSelected: createMemo(() => state.isSelected(options.value)),
    isActive: createMemo(() => state.isActive(options.value)),
    select(): void {
      if (!untrack(isDisabled)) {
        state.select(options.value);
      }
    },
    focus(): void {
      if (!untrack(isDisabled)) {
        state.focus(options.value);
      }
    },
    blur(): void {
      if (!untrack(isDisabled) && this.isActive()) {
        state.blur();
      }
    },
    disabled: isDisabled,
  };
}

export interface SelectOptionStateRenderProps {
  children?:
    | JSX.Element
    | ((state: SelectOptionStateProperties) => JSX.Element);
}

export interface SelectOptionStateProviderProps
  extends SelectOptionStateRenderProps {
  state: SelectOptionStateProperties;
}

const SelectOptionStateContext = createContext<SelectOptionStateProperties>();

export function SelectOptionStateProvider(
  props: SelectOptionStateProviderProps,
): JSX.Element {
  return createComponent(SelectOptionStateContext.Provider, {
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

export function useSelectOptionState(): SelectOptionStateProperties {
  const ctx = useContext(SelectOptionStateContext);
  assert(ctx, new Error('Missing <SelectOptionStateProvider>'));
  return ctx;
}

export function SelectOptionStateChild(
  props: SelectOptionStateRenderProps,
): JSX.Element {
  const state = useSelectOptionState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function' && current.length === 1) {
      return createMemo(() => current(state));
    }
    return current;
  }) as unknown as JSX.Element;
}
