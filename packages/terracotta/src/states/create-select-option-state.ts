import type { JSX } from '@solidjs/web';
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

/**
 * Creates one option's view of the nearest select state, so the option can ask
 * whether it is selected or active without knowing about the others.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#select-option-state}
 */
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
  return createComponent(SelectOptionStateContext, {
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

/**
 * Reads the nearest select option state from context. Throws when there is
 * none.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#select-option-state}
 */
export function useSelectOptionState(): SelectOptionStateProperties {
  const ctx = useContext(SelectOptionStateContext);
  assert(ctx, new Error('Missing <SelectOptionStateProvider>'));
  return ctx;
}

/**
 * Passes the nearest select option state to a render prop. A function child is
 * treated as a render prop only when it declares exactly one parameter.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#select-option-state}
 */
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
