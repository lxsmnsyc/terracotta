import type { Accessor } from 'solid-js';
import {
  createComponent,
  createContext,
  createMemo,
  createSignal,
  untrack,
  useContext,
} from 'solid-js';
import type { JSX } from '@solidjs/web';
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
  check(): void;
  uncheck(): void;
  toggle(): void;
}

/**
 * Creates a pressed/unpressed state. Backs `Toggle`.
 *
 * Pass `defaultPressed` for uncontrolled state or `pressed` for controlled.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#toggle-state}
 */
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
    setSignal = (value): void => {
      setIsOpen(value);
      if (options.onChange) {
        options.onChange(value);
      }
    };
  } else {
    // Controlled means relying on 3P state
    signal = createMemo(() => options.pressed);
    setSignal = (value): void => {
      if (options.onChange) {
        options.onChange(value);
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  return {
    pressed(): boolean {
      return signal();
    },
    setState(value): void {
      if (!untrack(isDisabled)) {
        setSignal(value);
      }
    },
    disabled: isDisabled,
    check(): void {
      if (!untrack(isDisabled)) {
        setSignal(true);
      }
    },
    uncheck(): void {
      if (!untrack(isDisabled)) {
        setSignal(false);
      }
    },
    toggle(): void {
      if (!untrack(isDisabled)) {
        setSignal(!untrack(signal));
      }
    },
  };
}

export interface ToggleStateRenderProps {
  children?: JSX.Element | ((state: ToggleStateProperties) => JSX.Element);
}

export interface ToggleStateProviderProps extends ToggleStateRenderProps {
  state: ToggleStateProperties;
}

const ToggleStateContext = createContext<ToggleStateProperties>();

export function ToggleStateProvider(
  props: ToggleStateProviderProps,
): JSX.Element {
  return createComponent(ToggleStateContext, {
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
 * Reads the nearest toggle state from context. Throws when there is none.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#toggle-state}
 */
export function useToggleState(): ToggleStateProperties {
  const ctx = useContext(ToggleStateContext);
  assert(ctx, new Error('Missing <ToggleStateProvider>'));
  return ctx;
}

/**
 * Passes the nearest toggle state to a render prop. A function child is
 * treated as a render prop only when it declares exactly one parameter.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/states.md#toggle-state}
 */
export function ToggleStateChild(props: ToggleStateRenderProps): JSX.Element {
  const state = useToggleState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function' && current.length === 1) {
      return createMemo(() => current(state));
    }
    return current;
  }) as unknown as JSX.Element;
}
