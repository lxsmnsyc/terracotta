import {
  createComponent,
  createContext,
  createMemo,
  JSX,
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
  const properties = useSelectState<T>();
  const isDisabled = () => {
    const local = options.disabled || false;
    const parent = properties.disabled();
    return local || parent;
  };
  return {
    isSelected() {
      return properties.isSelected(options.value);
    },
    isActive() {
      return properties.isActive(options.value);
    },
    select() {
      if (!isDisabled()) {
        properties.select(options.value);
      }
    },
    focus() {
      if (!isDisabled()) {
        properties.focus(options.value);
      }
    },
    blur() {
      if (!isDisabled() && this.isActive()) {
        properties.blur();
      }
    },
    disabled: isDisabled,
  };
}

export interface SelectOptionStateRenderProps {
  children: JSX.Element | ((state: SelectOptionStateProperties) => JSX.Element);
}

export interface SelectOptionStateProviderProps extends SelectOptionStateRenderProps {
  state: SelectOptionStateProperties;
}

const SelectOptionStateContext = createContext<SelectOptionStateProperties>();

export function SelectOptionStateProvider(props: SelectOptionStateProviderProps) {
  return (
    createComponent(SelectOptionStateContext.Provider, {
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
    if (typeof current === 'function') {
      return current(state);
    }
    return current;
  }) as unknown as JSX.Element;
}
