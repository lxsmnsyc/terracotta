import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { type ColorScheme, useColorScheme } from '../lib/color-scheme';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';

const OPTIONS: { value: ColorScheme; label: string; glyph: string }[] = [
  { value: 'system', label: 'System', glyph: '◐' },
  { value: 'light', label: 'Light', glyph: '☀' },
  { value: 'dark', label: 'Dark', glyph: '☾' },
];

export default function SchemePicker(): JSX.Element {
  const [scheme, setScheme] = useColorScheme();

  return (
    <RadioGroup<ColorScheme>
      class="scheme-picker"
      value={scheme()}
      onChange={(value) => {
        if (value) {
          setScheme(value);
        }
      }}
    >
      <RadioGroupLabel class="visually-hidden">Appearance</RadioGroupLabel>
      <For each={OPTIONS}>
        {(option) => (
          <RadioGroupOption class="scheme-picker-option" value={option.value}>
            <RadioGroupLabel class="visually-hidden">{option.label}</RadioGroupLabel>
            <span aria-hidden="true">{option.glyph}</span>
          </RadioGroupOption>
        )}
      </For>
    </RadioGroup>
  );
}
