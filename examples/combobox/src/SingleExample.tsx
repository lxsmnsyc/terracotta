import type { JSX } from 'solid-js';
import { For, createSignal } from 'solid-js';
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  DisclosureStateChild,
  Transition,
} from 'terracotta';
import { CheckIcon, classNames } from './utils';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

export default function SingleExample(): JSX.Element {
  const [selected, setSelected] = createSignal(people[0]);

  function matchBy(item: { name: string }, query: string): boolean {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }

  return (
    <div class="w-72 h-96">
      <Combobox<{ name: string }>
        class="flex flex-col gap-2"
        defaultOpen
        value={selected()}
        onSelectChange={setSelected}
        matchBy={matchBy}
      >
        <ComboboxLabel class="text-xl font-semibold">
          Single Selection
        </ComboboxLabel>
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          placeholder="Select an item"
          value={selected()?.name ?? ''}
        />
        <DisclosureStateChild>
          {({ isOpen }): JSX.Element => (
            <Transition
              show={isOpen()}
              class="relative"
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-out duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ComboboxOptions
                unmount={false}
                class="absolute w-full bg-gray-50 bg-opacity-50 rounded-lg overflow-hidden"
              >
                <For each={people}>
                  {(person): JSX.Element => (
                    <ComboboxOption
                      class="focus:outline-none group"
                      value={person}
                    >
                      {({ isActive, isSelected, matches }): JSX.Element => (
                        <div
                          class={classNames(
                            isActive()
                              ? 'text-amber-900 bg-amber-100'
                              : 'text-gray-900',
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
                                isActive()
                                  ? 'text-amber-600'
                                  : 'text-amber-600',
                                'group-hover:text-amber-600',
                                'absolute inset-y-0 left-0 flex items-center pl-3',
                              )}
                            >
                              <CheckIcon
                                title="Selected"
                                class="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </ComboboxOption>
                  )}
                </For>
              </ComboboxOptions>
            </Transition>
          )}
        </DisclosureStateChild>
      </Combobox>
    </div>
  );
}
