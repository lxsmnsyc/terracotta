import { type JSX, isServer } from '@solidjs/web';
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  useContext,
} from 'solid-js';

export type NativeColorScheme = 'light' | 'dark';
export type ColorScheme = NativeColorScheme | 'system';

/** The key Terracotta's own `ColorSchemeProvider` uses. Kept identical. */
export const SCHEME_STORAGE_KEY = 'theme-preference';

interface ColorSchemeContextValue {
  scheme: () => ColorScheme;
  setScheme: (value: ColorScheme) => void;
  /** The scheme actually in effect, with `'system'` resolved. */
  preferred: () => NativeColorScheme;
  /** What the OS reports, whatever the preference says. */
  native: () => NativeColorScheme;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue>();

function readStoredScheme(): ColorScheme {
  if (isServer) {
    return 'system';
  }
  try {
    const stored = localStorage.getItem(SCHEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  } catch {
    return 'system';
  }
}

/**
 * A local re-implementation of Terracotta's `ColorSchemeProvider`, matching it
 * exactly: the same `theme-preference` storage key, the same `dark` class on
 * `<html>`, the same `'system'` resolution and cross-tab `storage` sync.
 *
 * The library's own provider cannot be used here yet. Under SSR it stops its
 * entire subtree from hydrating — silently, with no error — because it writes
 * the scheme from an effect while hydration is still in progress. With the
 * provider wrapping the router, that left the whole site as static HTML: no
 * client-side navigation, no theme switching, and no messaging into the demo
 * frames. A twelve-line reproduction is in `docs/color-scheme-hydration.md`.
 *
 * Everything below is deliberately hydration-safe: the signal starts from what
 * the boot script already wrote into the DOM, so the server tree and the
 * client tree agree, and nothing is written until after hydration settles.
 */
export function ColorSchemeProvider(props: { children: JSX.Element }): JSX.Element {
  const [scheme, setScheme] = createSignal<ColorScheme>(readStoredScheme());
  const [systemDark, setSystemDark] = createSignal(
    !isServer && matchMedia('(prefers-color-scheme: dark)').matches,
  );

  const preferred = createMemo<NativeColorScheme>(() =>
    scheme() === 'dark' || (scheme() === 'system' && systemDark()) ? 'dark' : 'light',
  );

  // Reactive owners must be created on both sides. Creating an effect only on
  // the client shifts every hydration id allocated after it, which desyncs the
  // whole tree — the guard belongs inside the effect, not around it. Effects do
  // not run during SSR anyway, so the bodies are client-only regardless.
  if (!isServer) {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const onMedia = (): void => {
      setSystemDark(media.matches);
    };
    media.addEventListener('change', onMedia);

    // Storage events only fire in *other* documents of this origin, which is
    // exactly what keeps the demo iframes in step with the page around them.
    const onStorage = (event: StorageEvent): void => {
      if (event.key === SCHEME_STORAGE_KEY) {
        setScheme(readStoredScheme());
      }
    };
    window.addEventListener('storage', onStorage);

    onCleanup(() => {
      media.removeEventListener('change', onMedia);
      window.removeEventListener('storage', onStorage);
    });
  }

  createEffect(
    () => scheme(),
    (value) => {
      try {
        localStorage.setItem(SCHEME_STORAGE_KEY, value);
      } catch {
        // Private browsing. The class is still applied; only the memory is lost.
      }
    },
  );

  createEffect(
    () => preferred(),
    (value) => {
      document.documentElement.classList.toggle('dark', value === 'dark');
    },
  );

  const value: ColorSchemeContextValue = {
    scheme,
    setScheme: (next) => {
      setScheme(next);
    },
    preferred,
    native: () => (systemDark() ? 'dark' : 'light'),
  };

  return <ColorSchemeContext value={value}>{props.children}</ColorSchemeContext>;
}

export function useColorScheme(): [() => ColorScheme, (value: ColorScheme) => void] {
  const context = useContext(ColorSchemeContext);
  return [context.scheme, context.setScheme];
}

export function usePreferredColorScheme(): () => NativeColorScheme {
  return useContext(ColorSchemeContext).preferred;
}

export function useNativeColorScheme(): () => NativeColorScheme {
  return useContext(ColorSchemeContext).native;
}
