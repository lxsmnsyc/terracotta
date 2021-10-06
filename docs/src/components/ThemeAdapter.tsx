import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
  JSX,
} from 'solid-js';
import {
  usePrefersDark,
  usePageVisibility,
} from 'solid-use';

export type ThemePreference = 'dark' | 'light' | 'system';

interface ThemePreferenceContext {
  preference: () => ThemePreference;
  setPreference: (value: ThemePreference) => void;
}

const ThemePreferenceContext = createContext<ThemePreferenceContext>();

export function useThemePreference(): ThemePreferenceContext {
  const context = useContext(ThemePreferenceContext);
  if (context) {
    return context;
  }
  throw new Error('Missing "ThemePreferenceContext"');
}

export function useDarkPreference(): () => boolean {
  const { preference } = useThemePreference();
  const isDarkTheme = usePrefersDark();

  const darkMode = () => (
    (preference() === 'dark') || (preference() === 'system' && isDarkTheme())
  );

  return darkMode;
}

const STORAGE_KEY = 'theme-preference';

interface ThemeAdapterProps {
  children: JSX.Element;
}

export function ThemeAdapter(props: ThemeAdapterProps): JSX.Element {
  const preference = usePrefersDark();

  const visibility = usePageVisibility();

  const [local, setLocal] = createSignal<ThemePreference>('system');

  // Since storage events only work for other windows
  // we need to make the main window sync
  createEffect(() => {
    visibility();

    const onChange = () => {
      const value = localStorage.getItem(STORAGE_KEY);

      if (value) {
        setLocal(value as ThemePreference);
      } else {
        setLocal('system');
      }
    };
    window.addEventListener('storage', onChange, false);

    onChange();

    onCleanup(() => {
      window.removeEventListener('storage', onChange, false);
    });
  });

  const setPreference = (value: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, value);
    setLocal(value);
  };

  createEffect(() => {
    const { classList } = document.documentElement;
    if ((local() === 'system' && preference()) || (local() === 'dark')) {
      if (!classList.contains('dark')) {
        classList.add('dark');
      }
    } else {
      classList.remove('dark');
    }
  });

  return (
    <ThemePreferenceContext.Provider
      value={{
        preference: local,
        setPreference,
      }}
    >
      {props.children}
    </ThemePreferenceContext.Provider>
  );
}
