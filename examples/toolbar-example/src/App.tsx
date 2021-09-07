import {
  TailwindSelect,
  TailwindSelectOption,
  TailwindToggle,
  TailwindToolbar,
} from 'solid-headless';
import { JSX, For } from 'solid-js';

function ChevronUpIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
}

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="h-full border-l border-gray-500" />
    </div>
  );
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface ToolbarOption {
  label: string;
  title: string;
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
        <TailwindToolbar class="flex w-full space-x-1">
          <For each={FONT_OPTIONS}>
            {(item) => (
              <TailwindToggle
                class={classNames(
                  // isSelected(item) ? 'text-color-600 bg-purple-200' : '',
                  // isActive(item) ? 'outline-none ring ring-purple-400 ring-opacity-75' : '',
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
