import {
  createComponent,
  createContext,
  JSX,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';
import { useSelectState } from './create-select-state';

export interface SelectOptionOptions<T> {
  value: T;
  disabled?: boolean;
}

export interface SelectOptionProperties {
  isSelected(): boolean;
  select(): void;
  isActive(): boolean;
  focus(): void;
  blur(): void;
  disabled(): boolean;
}

export function createSelectOption<T>(
  options: SelectOptionOptions<T>,
): SelectOptionProperties {
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

export interface SelectOptionRenderProps {
  children: JSX.Element | ((state: SelectOptionProperties) => JSX.Element);
}

export interface SelectOptionProviderProps extends SelectOptionRenderProps {
  state: SelectOptionProperties;
}

const SelectOptionContext = createContext<SelectOptionProperties>();

export function SelectOptionProvider(props: SelectOptionProviderProps) {
  return (
    createComponent(SelectOptionContext.Provider, {
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

export function useSelectOption(): SelectOptionProperties {
  const ctx = useContext(SelectOptionContext);
  assert(ctx, new Error('Missing <SelectOptionProvider>'));
  return ctx;
}
