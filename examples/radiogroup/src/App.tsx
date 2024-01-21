import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from 'terracotta';
import type { JSX } from 'solid-js';
import { createSignal, For } from 'solid-js';

const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
];

function CheckIcon(
  props: JSX.IntrinsicElements['svg'] & { title: string },
): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <title>{props.title}</title>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        stroke-width={1.5}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function App(): JSX.Element {
  const [selected, setSelected] = createSignal(plans[0]);

  return (
    <div class="w-full px-4 py-16">
      <div class="w-full max-w-md mx-auto">
        <RadioGroup value={selected()} onChange={setSelected}>
          {({ isSelected, isActive }): JSX.Element => (
            <>
              <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
              <div class="space-y-2">
                <For each={plans}>
                  {(plan): JSX.Element => (
                    <RadioGroupOption
                      value={plan}
                      class={classNames(
                        isSelected(plan)
                          ? 'bg-sky-900 bg-opacity-75 text-white'
                          : 'bg-white',
                        isActive(plan) &&
                          'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60',
                        'relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none',
                      )}
                    >
                      {({ isSelected: checked }): JSX.Element => (
                        <div class="flex items-center justify-between w-full">
                          <div class="flex items-center">
                            <div class="text-sm">
                              <RadioGroupLabel
                                as="p"
                                class={`font-medium ${
                                  checked() ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {plan.name}
                              </RadioGroupLabel>
                              <RadioGroupDescription
                                as="span"
                                class={`inline ${
                                  checked() ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>{`${plan.ram}/${plan.cpus}`}</span>{' '}
                                <span aria-hidden="true">&middot;</span>{' '}
                                <span>{plan.disk}</span>
                              </RadioGroupDescription>
                            </div>
                          </div>
                          {checked() && (
                            <div class="flex-shrink-0 text-white">
                              <CheckIcon class="w-6 h-6" title="Checked" />
                            </div>
                          )}
                        </div>
                      )}
                    </RadioGroupOption>
                  )}
                </For>
              </div>
            </>
          )}
        </RadioGroup>
      </div>
    </div>
  );
}
