import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  type ColorScheme,
  ColorSchemeProvider,
  useColorScheme,
  usePreferredColorScheme,
} from 'terracotta/color-scheme';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';

const OPTIONS: ColorScheme[] = ['light', 'dark', 'system'];

function Picker(): JSX.Element {
  const [scheme, setScheme] = useColorScheme();
  const preferred = usePreferredColorScheme();

  return (
    <RadioGroup<ColorScheme>
      class="radiogroup"
      value={scheme()}
      onChange={(next) => next && setScheme(next)}
    >
      <RadioGroupLabel class="radiogroup-label">Appearance ({preferred()})</RadioGroupLabel>
      <For each={OPTIONS}>
        {(option) => (
          <RadioGroupOption class="radio-row" value={option}>
            <span class="radio-dot" aria-hidden="true" />
            <RadioGroupLabel class="radio-row-label">{option}</RadioGroupLabel>
          </RadioGroupOption>
        )}
      </For>
    </RadioGroup>
  );
}

export default function ColorSchemeControlled(): JSX.Element {
  const [scheme, setScheme] = createSignal<ColorScheme>('system');

  return (
    <div class="stack">
      <ColorSchemeProvider value={scheme()} onChange={setScheme}>
        <Picker />
      </ColorSchemeProvider>
      <p class="hint">The preference lives in this component: {scheme()}</p>
    </div>
  );
}
