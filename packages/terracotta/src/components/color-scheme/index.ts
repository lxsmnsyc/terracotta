import {
  createContext,
  createEffect,
  createMemo,
  onCleanup,
  useContext,
  JSX,
  Accessor,
  createSignal,
  createComponent,
} from 'solid-js';
import { usePrefersDark } from 'solid-use/media-query';
import usePageVisibility from 'solid-use/page-visibility';
import assert from '../../utils/assert';

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

interface ColorSchemeContext {
  value: ColorScheme;
  setValue: (newScheme: ColorScheme) => void;
  native: NativeColorScheme;
  preferred: NativeColorScheme;
}

const ColorSchemeContext = createContext<ColorSchemeContext>();

const STORAGE_KEY = 'theme-preference';

export function ColorSchemeProvider(props: ColorSchemeProviderProps) {
  let get: Accessor<ColorScheme>;
  let set: (scheme: ColorScheme) => void;

  if ('initialValue' in props) {
    const [scheme, setScheme] = createSignal<ColorScheme>(props.initialValue);
    get = scheme;
    set = (value) => {
      setScheme(value);
      props.onChange?.(value);
    };
  } else {
    get = () => props.value;
    set = (value) => props.onChange?.(value);
  }

  const prefersDark = usePrefersDark();
  const isVisible = usePageVisibility();

  const shouldToggle = createMemo(() => (
    (get() === 'system' && prefersDark()) || (get() === 'dark')
  ));

  // Since storage events only work for other windows
  // we need to make the main window sync
  createEffect(() => {
    isVisible();

    const onChange = () => {
      const value = localStorage.getItem(STORAGE_KEY);

      if (value) {
        set(value as ColorScheme);
      } else {
        set('system');
      }
    };
    window.addEventListener('storage', onChange, false);

    onChange();

    onCleanup(() => {
      window.removeEventListener('storage', onChange, false);
    });
  });

  // Sync storage when signal changes
  createEffect(() => {
    localStorage.setItem(STORAGE_KEY, get());
  });

  // Sync document class
  createEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      shouldToggle(),
    );
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

function useColorSchemeContext(): ColorSchemeContext {
  const ctx = useContext(ColorSchemeContext);
  assert(ctx, new Error('Missing <ColorSchemeProvider>'));
  return ctx;
}

export function useColorScheme(): [() => ColorScheme, (newScheme: ColorScheme) => void] {
  const ctx = useColorSchemeContext();
  return [
    () => ctx.value,
    ctx.setValue,
  ];
}

export function useNativeColorScheme(): () => NativeColorScheme {
  const ctx = useColorSchemeContext();
  return () => ctx.native;
}

export function usePreferredColorScheme(): () => NativeColorScheme {
  const ctx = useColorSchemeContext();
  return () => ctx.preferred;
}
