import type { JSX } from '@solidjs/web';
import {
  createComponent,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext,
  type Accessor,
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

/**
 * Holds the chosen colour scheme, writes it to `localStorage` under `theme-
 * preference`, and reflects it as a `dark` class on the document element. Pass
 * `initialValue` to let it own the preference, or `value` and `onChange` to
 * store the preference somewhere else, such as a user account.
 *
 * Renders nothing of its own.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/color-scheme.md}
 */
export function ColorSchemeProvider(props: ColorSchemeProviderProps): JSX.Element {
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

  const shouldToggle = createMemo(() => (get() === 'system' && prefersDark()) || get() === 'dark');

  // Since storage events only work for other windows
  // we need to make the main window sync
  createEffect(isVisible, () => {
    const onChange = (): void => {
      const value = localStorage.getItem(STORAGE_KEY);

      if (value) {
        set(value as ColorScheme);
      } else {
        set('system');
      }
    };
    onChange();
    return useEventListener(window, 'storage', onChange, false);
  });

  // Sync storage when signal changes
  createEffect(get, value => {
    localStorage.setItem(STORAGE_KEY, value);
  });

  // Sync document class
  createEffect(shouldToggle, value => {
    document.documentElement.classList.toggle('dark', value);
  });

  return createComponent(ColorSchemeContext, {
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

/**
 * Reads and writes the chosen colour scheme: `'light'`, `'dark'` or
 * `'system'`. Returns a signal-like tuple. Throws when called outside a {@link
 * ColorSchemeProvider}.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/color-scheme.md}
 */
export function useColorScheme(): [() => ColorScheme, (newScheme: ColorScheme) => void] {
  const ctx = useColorSchemeContext();
  return [(): ColorScheme => ctx.value, ctx.setValue];
}

/**
 * Reads what the operating system currently prefers, ignoring the user's
 * choice. Returns `true` when the system is in dark mode.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/color-scheme.md}
 */
export function useNativeColorScheme(): () => NativeColorScheme {
  const ctx = useColorSchemeContext();
  return () => ctx.native;
}

/**
 * Reads the scheme that is actually in effect: the user's choice, or the
 * system preference when that choice is `'system'`. This is the one to style
 * from.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/color-scheme.md}
 */
export function usePreferredColorScheme(): () => NativeColorScheme {
  const ctx = useColorSchemeContext();
  return () => ctx.preferred;
}
