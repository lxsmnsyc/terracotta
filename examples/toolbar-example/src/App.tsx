import {
  TailwindToggle,
  TailwindToolbar,
} from 'solid-headless';
import { JSX, For } from 'solid-js';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const FONT_OPTIONS = [
  { label: 'B', title: 'Bold', class: 'font-bold' },
  { label: 'I', title: 'Italic', class: 'italic' },
  { label: 'U', title: 'Underlined', class: 'underline' },
  { label: 'S', title: 'Strike Through', class: 'line-through' },
];

export default function App(): JSX.Element {
  return (
    <div class="w-auto">
      <div class="p-2 bg-white rounded-lg">
        <TailwindToolbar class="flex w-full space-x-1" horizontal>
          <For each={FONT_OPTIONS}>
            {(item) => (
              <TailwindToggle
                class={classNames(
                  // isSelected(item) ? 'text-color-600 bg-purple-200' : '',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-400 focus-visible:ring-opacity-75',
                  'w-6 h-6 flex items-center justify-center rounded',
                )}
              >
                <span class={item.class}>{item.label}</span>
              </TailwindToggle>
            )}
          </For>
        </TailwindToolbar>
      </div>
    </div>
  );
}
