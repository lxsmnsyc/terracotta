import {
  Select,
  SelectOption,
} from 'terracotta';
import { createSignal, JSX, For } from 'solid-js';

function CheckIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
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
        stroke-width={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function SelectorIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
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
        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
      />
    </svg>
  );
}

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Example(): JSX.Element {
  const [selected, setSelected] = createSignal(people[0]);

  return (
    <Select value={selected()} onChange={setSelected}>
      <div class="relative mt-1 bg-gray-50 bg-opacity-50 rounded-lg overflow-hidden">
        <For each={people}>
          {(person) => (
            <SelectOption class="focus:outline-none group" value={person}>
              {({ isActive, isSelected }) => (
                <div
                  class={classNames(
                    isActive() ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                    'group-hover:text-amber-900 group-hover:bg-amber-100',
                    'cursor-default select-none relative py-2 pl-10 pr-4',
                  )}
                >
                  <span
                    class={classNames(
                      isSelected() ? 'font-medium' : 'font-normal',
                      'block truncate',
                    )}
                  >
                    {person.name}
                  </span>
                  {isSelected() ? (
                    <span
                      class={classNames(
                        isActive() ? 'text-amber-600' : 'text-amber-600',
                        'group-hover:text-amber-600',
                        'absolute inset-y-0 left-0 flex items-center pl-3',
                      )}
                    >
                      <CheckIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              )}
            </SelectOption>
          )}
        </For>
      </div>
    </Select>
  );
}
