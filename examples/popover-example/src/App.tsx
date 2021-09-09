import {
  TailwindPopover,
  TailwindPopoverButton,
  TailwindPopoverPanel,
  TailwindTransition,
} from 'solid-headless';
import { For, JSX, Show } from 'solid-js';

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        stroke-width="2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        stroke-width="2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        stroke-width="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        stroke-width="2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        stroke-width="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
]

function ChevronDownIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function App(): JSX.Element {
  return (
    <div class="w-full flex items-center justify-center">
      <TailwindPopover class="relative">
        {({ isOpen }) => (
          <>
            <TailwindPopoverButton
              class={classNames(
                isOpen() && 'text-opacity-90',
                'text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              )}
            >
              <span>Solutions</span>
              <ChevronDownIcon
                class={classNames(
                  isOpen() && 'text-opacity-70',
                  'ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150'
                )}
                aria-hidden="true"
              />
            </TailwindPopoverButton>
            <TailwindTransition
              show={isOpen()}
              enterDuration={200}
              leaveDuration={150}
              enter="transition duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <TailwindPopoverPanel unmount={false} class="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    <For each={solutions}>
                      {(item) => (
                        <a
                          href={item.href}
                          class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                            <item.icon aria-hidden="true" />
                          </div>
                          <div class="ml-4">
                            <p class="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p class="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      )}
                    </For>
                  </div>
                  <div class="p-4 bg-gray-50">
                    <a
                      href="##"
                      class="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span class="flex items-center">
                        <span class="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span class="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div>
              </TailwindPopoverPanel>
            </TailwindTransition>
          </>
        )}
      </TailwindPopover>
    </div>
  );
}
