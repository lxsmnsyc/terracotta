import {
  JSX, Show,
} from 'solid-js';
import {
  SunIcon,
  MoonIcon,
} from './Icons';
import {
  useDarkPreference,
  useThemePreference,
} from './ThemeAdapter';

export default function DarkModeToggle(): JSX.Element {
  const isDarkMode = useDarkPreference();
  const { setPreference } = useThemePreference();

  return (
    <div class="py-4 px-2 flex">
      <button
        type="button"
        onClick={() => {
          setPreference(isDarkMode() ? 'light' : 'dark');
        }}
        class="w-6 h-6 transition-transform transform-gpu hover:scale-110"
        title="Toggle Dark Mode"
      >
        <span class="sr-only">Toggle Dark Mode</span>
        <Show when={isDarkMode()} fallback={<SunIcon class="w-6 h-6" />}>
          <MoonIcon class="w-6 h-6" />
        </Show>
      </button>
    </div>
  );
}
