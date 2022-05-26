import {
  createContext,
  createEffect,
  createMemo,
  onCleanup,
  useContext,
} from 'solid-js';
import {
  JSX,
} from 'solid-js/jsx-runtime';
import {
  usePageVisibility,
  usePrefersDark,
} from 'solid-use';
import useControlledSignal from '../utils/use-controlled-signal';

export type NativeColorScheme = 'light' | 'dark';
export type ColorScheme = NativeColorScheme | 'system';

export interface ColorSchemeProviderProps {
  initialValue?: ColorScheme;
  value?: ColorScheme;
  onChange?: (scheme: ColorScheme) => void;
  children?: JSX.Element;
}

interface ColorSchemeContext {
  value: ColorScheme;
  setValue: (newScheme: ColorScheme) => void;
  native: NativeColorScheme;
  preferred: NativeColorScheme;
}

const ColorSchemeContext = createContext<ColorSchemeContext>();

const STORAGE_KEY = 'theme-preference';

export function ColorSchemeProvider(props: ColorSchemeProviderProps) {
  const [get, set] = useControlledSignal<ColorScheme>(
    props.initialValue ?? 'system',
    'value' in props ? (() => props.value ?? 'system') : undefined,
    (value) => props.onChange?.(value),
  );

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

  return (
    <ColorSchemeContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </ColorSchemeContext.Provider>
  );
}

function useColorSchemeContext(): ColorSchemeContext {
  const ctx = useContext(ColorSchemeContext);
  if (ctx) {
    return ctx;
  }
  throw new Error('Missing <ColorSchemeProvider>');
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
