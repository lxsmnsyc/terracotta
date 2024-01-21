import { Select, SelectOption } from 'terracotta';
import type { JSX } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { CheckIcon, classNames } from './utils';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

export default function MultiSelect(): JSX.Element {
  const [selected, setSelected] = createSignal(people);

  return (
    <div class="flex flex-col gap-2">
      <span class="text-xl font-semibold">Multi Selection</span>
      <Select<{ name: string }>
        multiple
        toggleable
        value={selected()}
        onChange={setSelected}
      >
        <div class="relative mt-1 bg-gray-50 bg-opacity-50 rounded-lg overflow-hidden">
          <For each={people}>
            {(person): JSX.Element => (
              <SelectOption class="focus:outline-none group" value={person}>
                {({ isActive, isSelected }): JSX.Element => (
                  <div
                    class={classNames(
                      isActive()
                        ? 'text-amber-900 bg-amber-100'
                        : 'text-gray-900',
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
    </div>
  );
}
