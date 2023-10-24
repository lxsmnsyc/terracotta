import {
  Toggle,
  Toolbar,
} from 'terracotta';
import type { JSX } from 'solid-js';
import { For, createSignal } from 'solid-js';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface ToolbarOption {
  label: string;
  title: string;
  class: string;
}

const FONT_OPTIONS: ToolbarOption[] = [
  { label: 'B', title: 'Bold', class: 'font-bold' },
  { label: 'I', title: 'Italic', class: 'italic' },
  { label: 'U', title: 'Underlined', class: 'underline' },
  { label: 'S', title: 'Strike Through', class: 'line-through' },
];

export default function App(): JSX.Element {
  return (
    <div class="w-auto">
      <div class="p-2 bg-white rounded-lg">
        <Toolbar class="flex w-full space-x-1" horizontal>
          <For each={FONT_OPTIONS}>
            {(item): JSX.Element => {
              const [checked, setChecked] = createSignal(false);
              return (
                <Toggle
                  pressed={checked()}
                  class={classNames(
                    checked() ? 'text-color-600 bg-purple-200' : '',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-400 focus-visible:ring-opacity-75',
                    'w-6 h-6 flex items-center justify-center rounded transition',
                  )}
                  onChange={setChecked}
                >
                  <span class={item.class}>{item.label}</span>
                </Toggle>
              );
            }}
          </For>
        </Toolbar>
      </div>
    </div>
  );
}
