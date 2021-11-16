import {
  JSX, Show,
} from 'solid-js';
import { CircularButton } from './CircularButton';
import {
  SunIcon,
  MoonIcon,
} from './Icons';
import {
  useDarkPreference,
  useThemePreference,
} from './ThemeAdapter';

export default function DarkModeToggle(): JSX.Element {
  const isDarkMode = $derefMemo(useDarkPreference());
  const { setPreference } = useThemePreference();

  return (
    <CircularButton
      type="button"
      onClick={() => {
        setPreference(isDarkMode ? 'light' : 'dark');
      }}
      title="Toggle Dark Mode"
    >
      <span class="sr-only">Toggle Dark Mode</span>
      <Show when={isDarkMode} fallback={<SunIcon class="w-10 h-10 p-2" />}>
        <MoonIcon class="w-10 h-10 p-2" />
      </Show>
    </CircularButton>
  );
}
