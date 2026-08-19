import type { JSX } from '@solidjs/web';
import {
  createComponent,
  createContext,
  createMemo,
  untrack,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';
import { useAutocompleteState } from './create-autocomplete-state';

export interface AutocompleteOptionStateOptions<T> {
  value: T;
  disabled?: boolean;
}

export interface AutocompleteOptionStateProperties {
  isSelected(): boolean;
  select(): void;
  isActive(): boolean;
  focus(): void;
  blur(): void;
  disabled(): boolean;
  matches(): boolean;
}

/**
 * Creates one option's view of the nearest autocomplete state, so the option
 * can ask whether it is selected, active, or a match for the current query.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#autocomplete-option-state}
 */
export function createAutocompleteOptionState<T>(
  options: AutocompleteOptionStateOptions<T>,
): AutocompleteOptionStateProperties {
  const state = useAutocompleteState<T>();
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
    matches: createMemo(() => state.matches(options.value)),
    disabled: isDisabled,
  };
}

export interface AutocompleteOptionStateRenderProps {
  children?:
    | JSX.Element
    | ((state: AutocompleteOptionStateProperties) => JSX.Element);
}

export interface AutocompleteOptionStateProviderProps
  extends AutocompleteOptionStateRenderProps {
  state: AutocompleteOptionStateProperties;
}

const AutocompleteOptionStateContext =
  createContext<AutocompleteOptionStateProperties>();

export function AutocompleteOptionStateProvider(
  props: AutocompleteOptionStateProviderProps,
): JSX.Element {
  return createComponent(AutocompleteOptionStateContext, {
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
 * Reads the nearest autocomplete option state from context. Throws when there
 * is none.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#autocomplete-option-state}
 */
export function useAutocompleteOptionState(): AutocompleteOptionStateProperties {
  const ctx = useContext(AutocompleteOptionStateContext);
  assert(ctx, new Error('Missing <AutocompleteOptionStateProvider>'));
  return ctx;
}

/**
 * Passes the nearest autocomplete option state to a render prop. A function
 * child is treated as a render prop only when it declares exactly one
 * parameter.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#autocomplete-option-state}
 */
export function AutocompleteOptionStateChild(
  props: AutocompleteOptionStateRenderProps,
): JSX.Element {
  const state = useAutocompleteOptionState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function' && current.length === 1) {
      return createMemo(() => current(state));
    }
    return current;
  }) as unknown as JSX.Element;
}
