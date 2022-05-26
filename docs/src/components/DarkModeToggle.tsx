import {
  JSX, Show,
} from 'solid-js';
import {
  useColorScheme,
  usePreferredColorScheme,
} from 'solid-headless';
import { CircularButton } from './CircularButton';
import {
  SunIcon,
  MoonIcon,
} from './Icons';

export default function DarkModeToggle(): JSX.Element {
  const colorScheme = $derefMemo(usePreferredColorScheme());
  const [, setPreference] = useColorScheme();

  return (
    <CircularButton
      type="button"
      onClick={() => {
        setPreference(colorScheme === 'dark' ? 'light' : 'dark');
      }}
      title="Toggle Dark Mode"
    >
      <span class="sr-only">Toggle Dark Mode</span>
      <Show when={colorScheme === 'dark'} fallback={<SunIcon class="w-10 h-10 p-2" />}>
        <MoonIcon class="w-10 h-10 p-2" />
      </Show>
    </CircularButton>
  );
}
