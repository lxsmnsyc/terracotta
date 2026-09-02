import type { JSX } from '@solidjs/web';
import { For, createEffect, createSignal } from 'solid-js';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';
import { useTheme } from '../lib/theme';
import { DEFAULT_THEME, THEMES } from '../themes';

/**
 * The site's own chrome is built out of Terracotta, and the theme picker is the
 * most direct proof available: it is a `RadioGroup`, and the theme it switches
 * restyles the very radio group you used to switch it.
 *
 * A radio group rather than a popup because the whole point of the control is
 * comparison. Every theme stays on screen and one click away from the last, so
 * switching between two of them is two clicks in the same place rather than
 * two round trips through a menu that closes over the page you are trying to
 * look at.
 *
 * Each swatch is painted by the theme it stands for: `themes/<id>.css` carries
 * an unscoped `.theme-swatch-<id>` rule, so a theme still arrives as one file
 * plus one entry in `THEMES`, and no palette is duplicated here.
 */
export default function ThemePicker(): JSX.Element {
  const { theme, setTheme } = useTheme();

  /*
   * The server cannot know which theme is in the visitor's storage, so it
   * renders the default as checked — and hydration reuses the server's DOM,
   * moving the mark only when the value *changes*. Starting from the server's
   * answer and stepping to the real one in an effect makes it a change, so the
   * mark lands on the theme the page is actually painted in.
   */
  const [checked, setChecked] = createSignal(DEFAULT_THEME);
  createEffect(
    () => theme(),
    (value) => {
      setChecked(value);
    },
  );

  return (
    <RadioGroup<string>
      class="theme-picker"
      value={checked()}
      onChange={(value) => {
        if (value) {
          setTheme(value);
        }
      }}
    >
      <RadioGroupLabel class="visually-hidden">Theme</RadioGroupLabel>
      <For each={THEMES}>
        {(entry) => (
          <RadioGroupOption
            class="theme-swatch"
            value={entry.id}
            data-theme-id={entry.id}
            title={`${entry.name} — ${entry.blurb}`}
          >
            <RadioGroupLabel class="visually-hidden">{entry.name}</RadioGroupLabel>
            <span class={`theme-swatch-chip theme-swatch-${entry.id}`} aria-hidden="true" />
          </RadioGroupOption>
        )}
      </For>
    </RadioGroup>
  );
}
