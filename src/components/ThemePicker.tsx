import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from 'terracotta/listbox';
import { useTheme } from '../lib/theme';
import { THEMES, type ThemeMeta } from '../themes';

/**
 * The site's own chrome is built out of Terracotta. The theme picker is the
 * most direct proof available: it is a `Listbox`, and the theme it switches
 * restyles the very listbox you used to switch it.
 */
export default function ThemePicker(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const current = (): ThemeMeta => THEMES.find((entry) => entry.id === theme()) ?? THEMES[0]!;

  return (
    <Listbox<ThemeMeta>
      class="theme-picker"
      defaultOpen={false}
      value={current()}
      onSelectChange={(value) => {
        if (value) {
          setTheme(value.id);
        }
      }}
      by={(a, b) => a.id === b.id}
    >
      <ListboxLabel class="visually-hidden">Theme</ListboxLabel>
      <ListboxButton class="theme-picker-button control">
        <span class="theme-picker-swatch" aria-hidden="true" />
        <span class="theme-picker-value">{current().name}</span>
        <span class="theme-picker-caret" aria-hidden="true">
          ▾
        </span>
      </ListboxButton>
      <ListboxOptions class="theme-picker-options panel">
        <For each={THEMES}>
          {(entry) => (
            <ListboxOption class="theme-picker-option" value={entry}>
              <span class="theme-picker-option-name">{entry.name}</span>
              <span class="theme-picker-option-blurb">{entry.blurb}</span>
            </ListboxOption>
          )}
        </For>
      </ListboxOptions>
    </Listbox>
  );
}
