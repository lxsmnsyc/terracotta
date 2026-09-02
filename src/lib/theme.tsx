import { type JSX, isServer } from '@solidjs/web';
import { createContext, createEffect, createSignal, useContext } from 'solid-js';
import { DEFAULT_THEME, isTheme } from '../themes';
import { SCHEME_STORAGE_KEY } from './color-scheme';

export const THEME_STORAGE_KEY = 'tc-docs-theme';

export interface ThemeContextValue {
  theme: () => string;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>();

function readStoredTheme(): string {
  if (isServer) {
    return DEFAULT_THEME;
  }
  const attribute = document.documentElement.dataset.theme;
  if (isTheme(attribute)) {
    return attribute;
  }
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider(props: { children: JSX.Element }): JSX.Element {
  // The boot script in `Document` has already written `data-theme` before
  // paint, so reading the attribute keeps hydration in step with what the user
  // is actually looking at.
  const [theme, setTheme] = createSignal(readStoredTheme());

  createEffect(
    () => theme(),
    (value) => {
      document.documentElement.dataset.theme = value;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, value);
      } catch {
        // Private browsing. The attribute is still applied; only the memory is lost.
      }
    },
  );

  const value: ThemeContextValue = {
    theme,
    setTheme: (id) => {
      setTheme(id);
    },
  };

  return <ThemeContext value={value}>{props.children}</ThemeContext>;
}

/** Throws outside a `<ThemeProvider>` — the context is deliberately default-less. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/**
 * Written into `<head>` as a blocking inline script. It runs before the first
 * paint so a reload never flashes the default theme or the wrong colour
 * scheme, and it leaves the DOM in the exact state hydration expects.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{
var q=new URLSearchParams(location.search);
var t=q.get('theme')||localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t)document.documentElement.dataset.theme=t;
var s=q.get('scheme')||localStorage.getItem(${JSON.stringify(SCHEME_STORAGE_KEY)})||'system';
var dark=s==='dark'||(s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
document.documentElement.classList.toggle('dark',dark);
}catch(e){}})()`;
