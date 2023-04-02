import {
  Accessor,
  createComponent,
  createContext,
  createMemo,
  createSignal,
  JSX,
  untrack,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';

export interface CheckStateControlledOptions {
  checked: boolean | undefined;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
}

export interface CheckStateUncontrolledOptions {
  defaultChecked: boolean | undefined;
  disabled?: boolean;
  onChange?: (state?: boolean) => void;
}

export type CheckStateOptions =
  | CheckStateControlledOptions
  | CheckStateUncontrolledOptions;

export interface CheckStateProperties {
  checked(): boolean | undefined;
  setState(newState?: boolean): void;
  disabled(): boolean;
  check(): void;
  uncheck(): void;
  reset(): void;
  toggle(): void;
}

export function createCheckState(
  options: CheckStateOptions,
): CheckStateProperties {
  // Reference to the signal read
  let signal: Accessor<boolean | undefined>;
  // Reference to the signal write
  let setSignal: (value: boolean | undefined) => void;

  // Type branding
  // Check if state is uncontrolled
  if ('defaultChecked' in options) {
    // Uncontrolled toggle means the toggle
    // manages its own state.
    const [isOpen, setIsOpen] = createSignal<boolean | undefined>(options.defaultChecked);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    // Controlled means relying on 3P state
    signal = createMemo(() => options.checked);
    setSignal = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  return {
    checked() {
      return signal();
    },
    setState(value) {
      if (!untrack(isDisabled)) {
        setSignal(value);
      }
    },
    disabled: isDisabled,
    check() {
      if (!untrack(isDisabled)) {
        setSignal(true);
      }
    },
    uncheck() {
      if (!untrack(isDisabled)) {
        setSignal(false);
      }
    },
    reset() {
      if (!untrack(isDisabled)) {
        setSignal(undefined);
      }
    },
    toggle() {
      if (!untrack(isDisabled)) {
        setSignal(!untrack(signal));
      }
    },
  };
}

export interface CheckStateRenderProps {
  children: JSX.Element | ((state: CheckStateProperties) => JSX.Element);
}

export interface CheckStateProviderProps extends CheckStateRenderProps {
  state: CheckStateProperties;
}

const CheckStateContext = (
  createContext<CheckStateProperties>()
);

export function CheckStateProvider(
  props: CheckStateProviderProps,
) {
  return (
    createComponent(CheckStateContext.Provider, {
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

export function useCheckState(): CheckStateProperties {
  const ctx = useContext(CheckStateContext);
  assert(ctx, new Error('Missing <CheckStateProvider>'));
  return ctx;
}

export function CheckStateChild(
  props: CheckStateRenderProps,
): JSX.Element {
  const state = useCheckState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function') {
      return current(state);
    }
    return current;
  }) as unknown as JSX.Element;
}
