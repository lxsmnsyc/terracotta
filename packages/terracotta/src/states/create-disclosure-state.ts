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

export interface DisclosureStateControlledOptions {
  isOpen: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
}
export interface DisclosureStateUncontrolledOptions {
  defaultOpen: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
}

export type DisclosureStateOptions =
  | DisclosureStateControlledOptions
  | DisclosureStateUncontrolledOptions;

export interface DisclosureStateProperties {
  isOpen(): boolean;
  setState(newState: boolean): void;
  disabled(): boolean;
  close(): void;
  open(): void;
  toggle(): void;
}

export function createDisclosureState(
  options: DisclosureStateOptions,
): DisclosureStateProperties {
  let signal: Accessor<boolean>;
  let setSignal: (value: boolean) => void;

  if ('defaultOpen' in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultOpen);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (value && options.onOpen) {
        options.onOpen();
      }
      if (options.onChange) {
        options.onChange(value);
      }
      if (!value && options.onClose) {
        options.onClose();
      }
    };
  } else {
    signal = createMemo(() => options.isOpen);
    setSignal = (value) => {
      if (value && options.onOpen) {
        options.onOpen();
      }
      if (options.onChange) {
        options.onChange(value);
      }
      if (!value && options.onClose) {
        options.onClose();
      }
    };
  }

  const isDisabled = createMemo(() => !!options.disabled);

  return {
    isOpen() {
      return signal();
    },
    setState(value) {
      if (!untrack(isDisabled)) {
        setSignal(value);
      }
    },
    disabled: isDisabled,
    open() {
      if (!untrack(isDisabled)) {
        setSignal(true);
      }
    },
    close() {
      if (!untrack(isDisabled)) {
        setSignal(false);
      }
    },
    toggle() {
      if (!untrack(isDisabled)) {
        setSignal(!untrack(signal));
      }
    },
  };
}

export interface DisclosureStateRenderProps {
  children: JSX.Element | ((state: DisclosureStateProperties) => JSX.Element);
}

export interface DisclosureStateProviderProps extends DisclosureStateRenderProps {
  state: DisclosureStateProperties;
}

const DisclosureStateContext = (
  createContext<DisclosureStateProperties>()
);

export function DisclosureStateProvider(
  props: DisclosureStateProviderProps,
) {
  return (
    createComponent(DisclosureStateContext.Provider, {
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

export function useDisclosureState(): DisclosureStateProperties {
  const ctx = useContext(DisclosureStateContext);
  assert(ctx, new Error('Missing <DisclosureStateProvider>'));
  return ctx;
}

export function DisclosureStateChild(
  props: DisclosureStateRenderProps,
): JSX.Element {
  const state = useDisclosureState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === 'function') {
      return current(state);
    }
    return current;
  }) as unknown as JSX.Element;
}
