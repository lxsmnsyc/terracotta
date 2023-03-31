import {
  Accessor,
  createComponent,
  createContext,
  createSignal,
  JSX,
  useContext,
} from 'solid-js';
import assert from '../utils/assert';

export interface ToggleStateControlledOptions {
  pressed: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}

export interface ToggleStateUncontrolledOptions {
  defaultPressed: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}

export type ToggleStateOptions =
  | ToggleStateControlledOptions
  | ToggleStateUncontrolledOptions;

export interface ToggleStateProperties {
  pressed(): boolean;
  setState(newState: boolean): void;
  disabled(): boolean;
}

export function createToggleState(
  options: ToggleStateOptions,
): ToggleStateProperties {
  // Reference to the signal read
  let signal: Accessor<boolean>;
  // Reference to the signal write
  let setSignal: (value: boolean) => void;

  // Type branding
  // Toggle if state is uncontrolled
  if ('defaultPressed' in options) {
    // Uncontrolled toggle means the toggle
    // manages its own state.
    const [isOpen, setIsOpen] = createSignal<boolean>(options.defaultPressed);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    // Controlled means relying on 3P state
    signal = () => options.pressed;
    setSignal = (value) => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  return {
    pressed() {
      return signal();
    },
    setState(value) {
      if (!options.disabled) {
        setSignal(value);
      }
    },
    disabled() {
      return !!options.disabled;
    },
  };
}

export interface ToggleStateRenderProps {
  children: JSX.Element | ((state: ToggleStateProperties) => JSX.Element);
}

export interface ToggleStateProviderProps extends ToggleStateRenderProps {
  state: ToggleStateProperties;
}

const ToggleStateContext = createContext<ToggleStateProperties>();

export function ToggleStateProvider(props: ToggleStateProviderProps) {
  return (
    createComponent(ToggleStateContext.Provider, {
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

export function useToggleState(): ToggleStateProperties {
  const ctx = useContext(ToggleStateContext);
  assert(ctx, new Error('Missing <ToggleStateProvider>'));
  return ctx;
}
