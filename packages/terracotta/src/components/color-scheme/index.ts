import type { Accessor, JSX } from 'solid-js';
import {
  createComponent,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext,
} from 'solid-js';
import { usePrefersDark } from 'solid-use/media-query';
import usePageVisibility from 'solid-use/page-visibility';
import assert from '../../utils/assert';
import useEventListener from '../../utils/use-event-listener';

export type NativeColorScheme = 'light' | 'dark';
export type ColorScheme = NativeColorScheme | 'system';

export interface ColorSchemeProviderControlledProps {
  value: ColorScheme;
  onChange?: (scheme: ColorScheme) => void;
  children?: JSX.Element;
}
export interface ColorSchemeProviderUncontrolledProps {
  initialValue: ColorScheme;
  onChange?: (scheme: ColorScheme) => void;
  children?: JSX.Element;
}

export type ColorSchemeProviderProps =
  | ColorSchemeProviderControlledProps
  | ColorSchemeProviderUncontrolledProps;

interface ColorSchemeContextData {
  value: ColorScheme;
  setValue: (newScheme: ColorScheme) => void;
  native: NativeColorScheme;
  preferred: NativeColorScheme;
}

const ColorSchemeContext = createContext<ColorSchemeContextData>();

const STORAGE_KEY = 'theme-preference';

export function ColorSchemeProvider(
  props: ColorSchemeProviderProps,
): JSX.Element {
  let get: Accessor<ColorScheme>;
  let set: (scheme: ColorScheme) => void;

  if ('initialValue' in props) {
    const [scheme, setScheme] = createSignal<ColorScheme>(props.initialValue);
    get = scheme;
    set = (value): void => {
      setScheme(value);
      if (props.onChange) {
        props.onChange(value);
      }
    };
  } else {
    get = (): ColorScheme => props.value;
    set = (value): void => {
      if (props.onChange) {
        props.onChange(value);
      }
    };
  }

  const prefersDark = usePrefersDark();
  const isVisible = usePageVisibility();

  const shouldToggle = createMemo(
    () => (get() === 'system' && prefersDark()) || get() === 'dark',
  );

  // Since storage events only work for other windows
  // we need to make the main window sync
  createEffect(() => {
    isVisible();

    const onChange = (): void => {
      const value = localStorage.getItem(STORAGE_KEY);

      if (value) {
        set(value as ColorScheme);
      } else {
        set('system');
      }
    };
    onChange();
    useEventListener(window, 'storage', onChange, false);
  });

  // Sync storage when signal changes
  createEffect(() => {
    localStorage.setItem(STORAGE_KEY, get());
  });

  // Sync document class
  createEffect(() => {
    document.documentElement.classList.toggle('dark', shouldToggle());
  });

  return createComponent(ColorSchemeContext.Provider, {
    value: {
      get value() {
        return get();
      },
      setValue(val) {
        set(val);
      },
      get preferred() {
        return shouldToggle() ? 'dark' : 'light';
      },
      get native() {
        return prefersDark() ? 'dark' : 'light';
      },
    },
    get children() {
      return props.children;
    },
  });
}

function useColorSchemeContext(): ColorSchemeContextData {
  const ctx = useContext(ColorSchemeContext);
  assert(ctx, new Error('Missing <ColorSchemeProvider>'));
  return ctx;
}

export function useColorScheme(): [
  () => ColorScheme,
  (newScheme: ColorScheme) => void,
] {
  const ctx = useColorSchemeContext();
  return [(): ColorScheme => ctx.value, ctx.setValue];
}

export function useNativeColorScheme(): () => NativeColorScheme {
  const ctx = useColorSchemeContext();
  return () => ctx.native;
}

export function usePreferredColorScheme(): () => NativeColorScheme {
  const ctx = useColorSchemeContext();
  return () => ctx.preferred;
}
