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

/*
 * Deliberately *not* Terracotta's own `theme-preference`. The ColorScheme page
 * demos mount the real provider, which writes that key on mount, so sharing it
 * would mean opening that page silently overwrote the reader's own choice for
 * the whole site. A docs-scoped key keeps the demos honest: they use the
 * unmodified library, and what they store stays theirs.
 */
export const SCHEME_STORAGE_KEY = 'tc-docs-scheme';

interface ColorSchemeContextValue {
  scheme: () => ColorScheme;
  setScheme: (value: ColorScheme) => void;
  /** The scheme actually in effect, with `'system'` resolved. */
  preferred: () => NativeColorScheme;
  /** What the OS reports, whatever the preference says. */
  native: () => NativeColorScheme;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue>();

function isScheme(value: string | null): value is ColorScheme {
  return value === 'light' || value === 'dark' || value === 'system';
}

function readStoredScheme(): ColorScheme {
  if (isServer) {
    return 'system';
  }
  try {
    const stored = localStorage.getItem(SCHEME_STORAGE_KEY);
    return isScheme(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

/**
 * A demo frame is told which appearance to render through the query string, so
 * that its first paint already matches the page around it. The boot script in
 * `Document` reads it, and so must this: starting from storage instead would
 * flip the frame back to the visitor's own scheme the moment it hydrated,
 * which is also what a reader saw after following a demo's "Open" link out of
 * a dark page.
 */
function schemeFromQuery(): ColorScheme | null {
  if (isServer) {
    return null;
  }
  const requested = new URLSearchParams(location.search).get('scheme');
  return isScheme(requested) ? requested : null;
}

/**
 * A local re-implementation of Terracotta's `ColorSchemeProvider`: the same
 * `dark` class on `<html>`, the same `'system'` resolution, the same cross-tab
 * `storage` sync.
 *
 * It was originally written because the library's provider could not hydrate at
 * all. It stopped its entire subtree dead, silently, which with the provider
 * wrapping the router left the whole site as static HTML. That is fixed as of
 * `terracotta@2.0.0-next.9` and `solid-use@1.0.0-next.3`; the account is kept in
 * `docs/color-scheme-hydration.md` because the rule it turned on is worth
 * remembering.
 *
 * Two things keep this file around anyway, and both are about the docs rather
 * than about the library:
 *
 *   1. It honours `?scheme=` so a demo frame renders, and stays, in the
 *      appearance the page around it asked for.
 *   2. It stores under a docs-scoped key, leaving `theme-preference` free for
 *      the ColorScheme demos to use the real provider on the real key.
 */
export function ColorSchemeProvider(props: { children: JSX.Element }): JSX.Element {
  const requested = schemeFromQuery();
  const [scheme, setScheme] = createSignal<ColorScheme>(requested ?? readStoredScheme());
  const [systemDark, setSystemDark] = createSignal(
    !isServer && matchMedia('(prefers-color-scheme: dark)').matches,
  );

  const preferred = createMemo<NativeColorScheme>(() =>
    scheme() === 'dark' || (scheme() === 'system' && systemDark()) ? 'dark' : 'light',
  );

  // Reactive owners must be created on both sides. Creating an effect only on
  // the client shifts every hydration id allocated after it, which desyncs the
  // whole tree. The guard belongs inside the effect, not around it. Effects do
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
      // A frame showing someone else's appearance must not write it into this
      // browser's preference, but a scheme chosen *inside* the frame still
      // counts, so only the value that came from the query is skipped.
      if (requested !== null && value === requested) {
        return;
      }
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
