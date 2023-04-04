import {
  Command,
  CommandInput,
  CommandOptions,
  CommandOption,
  CommandLabel,
} from 'terracotta';
import { createSignal, JSX, For } from 'solid-js';
import { CheckIcon, classNames } from './utils';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

export default function MultipleSelect(): JSX.Element {
  const [selected, setSelected] = createSignal(people);

  function toValue() {
    selected();
    return '';
  }

  function matchBy(item: { name: string }, query: string) {
    // split queries
    const queries = query.split(',');

    return queries.some((text) => item.name.toLowerCase().includes(text.trim().toLowerCase()));
  }

  return (
    <div class="w-72 h-96">
      <Command<{ name: string }>
        class="flex flex-col gap-2"
        multiple
        toggleable
        value={selected()}
        onChange={setSelected}
        matchBy={matchBy}
      >
        <CommandLabel class="text-xl font-semibold">Multi Selection</CommandLabel>
        <div class="p-2 bg-gray-50 bg-opacity-50 rounded-lg flex flex-wrap gap-1">
          <For each={selected()} fallback={<span class="block truncate">No selected.</span>}>
            {(item) => (
              <span class="inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                {item.name}
              </span>
            )}
          </For>
        </div>
        <CommandInput
          class="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          placeholder="Select an item"
          value={toValue()}
        />
        <CommandOptions>
          <div class="bg-gray-50 bg-opacity-50 rounded-lg overflow-hidden">
            <For each={people}>
              {(person) => (
                <CommandOption class="focus:outline-none group" value={person}>
                  {({ isActive, isSelected, matches }) => (
                    <div
                      class={classNames(
                        isActive() ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                        'group-hover:text-amber-900 group-hover:bg-amber-100',
                        'cursor-default select-none relative py-2 pl-10 pr-4',
                        matches() ? 'visible' : 'hidden',
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
                </CommandOption>
              )}
            </For>
          </div>
        </CommandOptions>
      </Command>
    </div>
  );
}
