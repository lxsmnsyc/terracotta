import {
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

const ThemePreferenceContext = $createContext<ThemePreferenceContext>();

export function useThemePreference(): ThemePreferenceContext {
  const context = $useContext(ThemePreferenceContext);
  if (context) {
    return context;
  }
  throw new Error('Missing "ThemePreferenceContext"');
}

export function useDarkPreference(): () => boolean {
  const preference = $derefMemo(useThemePreference().preference);
  const isDarkTheme = $derefMemo(usePrefersDark());

  const darkMode = $memo((preference === 'dark') || (preference === 'system' && isDarkTheme));

  return $refMemo(darkMode);
}

const STORAGE_KEY = 'theme-preference';

interface ThemeAdapterProps {
  children: JSX.Element;
}

export function ThemeAdapter(props: ThemeAdapterProps): JSX.Element {
  const preference = usePrefersDark();
  const visibility = usePageVisibility();

  let local = $signal<ThemePreference>('system');

  // Since storage events only work for other windows
  // we need to make the main window sync
  effect: {
    visibility();

    const onChange = () => {
      const value = localStorage.getItem(STORAGE_KEY);

      if (value) {
        local = value as ThemePreference;
      } else {
        local = 'system';
      }
    };
    window.addEventListener('storage', onChange, false);

    onChange();

    cleanup: {
      window.removeEventListener('storage', onChange, false);
    }
  }

  const setPreference = (value: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, value);
    local = value;
  };

  effect: {
    const { classList } = document.documentElement;
    if ((local === 'system' && preference()) || (local === 'dark')) {
      if (!classList.contains('dark')) {
        classList.add('dark');
      }
    } else {
      classList.remove('dark');
    }
  }

  return (
    <ThemePreferenceContext.Provider
      value={{
        preference: $get(local),
        setPreference,
      }}
    >
      {props.children}
    </ThemePreferenceContext.Provider>
  );
}
