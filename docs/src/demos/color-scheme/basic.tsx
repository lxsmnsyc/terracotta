import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import {
  type ColorScheme,
  ColorSchemeProvider,
  useColorScheme,
  useNativeColorScheme,
  usePreferredColorScheme,
} from 'terracotta/color-scheme';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';

const OPTIONS: ColorScheme[] = ['light', 'dark', 'system'];

function Picker(): JSX.Element {
  const [scheme, setScheme] = useColorScheme();
  const preferred = usePreferredColorScheme();
  const native = useNativeColorScheme();

  return (
    <div class="stack">
      <RadioGroup<ColorScheme>
        class="radiogroup"
        value={scheme()}
        onChange={(next) => next && setScheme(next)}
      >
        <RadioGroupLabel class="radiogroup-label">Appearance</RadioGroupLabel>
        <For each={OPTIONS}>
          {(option) => (
            <RadioGroupOption class="radio-row" value={option}>
              <span class="radio-dot" aria-hidden="true" />
              <RadioGroupLabel class="radio-row-label">{option}</RadioGroupLabel>
            </RadioGroupOption>
          )}
        </For>
      </RadioGroup>
      <p class="hint">
        Resolved to {preferred()}; this machine reports {native()}.
      </p>
    </div>
  );
}

export default function ColorSchemeBasic(): JSX.Element {
  return (
    <ColorSchemeProvider initialValue="system">
      <Picker />
    </ColorSchemeProvider>
  );
}
