import {
  TailwindPopover,
  TailwindPopoverButton,
  TailwindPopoverPanel,
  TailwindTransition,
  TailwindMenu,
  TailwindMenuItem,
} from 'solid-headless';
import { For, JSX } from 'solid-js';

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

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
  );
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
                'text-white group bg-purple-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              )}
            >
              <span>Action</span>
              <ChevronDownIcon
                class={classNames(
                  isOpen() && 'text-opacity-70',
                  'ml-2 h-5 w-5 text-purple-300 group-hover:text-opacity-80 transition ease-in-out duration-150'
                )}
                aria-hidden="true"
              />
            </TailwindPopoverButton>
            <TailwindTransition
              show={isOpen()}
              enter="transition duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <TailwindPopoverPanel unmount={false} class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <TailwindMenu class="overflow-hidden w-64 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-col space-y-1 p-1">
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
                    Open Link in New Tab
                  </TailwindMenuItem>
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
                    Open Link in New Window
                  </TailwindMenuItem>
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
                    Open Link in New Incognito Window
                  </TailwindMenuItem>
                  <Separator />
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
                    Save Link As...
                  </TailwindMenuItem>
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
                    Copy Link Address
                  </TailwindMenuItem>
                  <Separator />
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
                    Inspect
                  </TailwindMenuItem>
                </TailwindMenu>
              </TailwindPopoverPanel>
            </TailwindTransition>
          </>
        )}
      </TailwindPopover>
    </div>
  );
}
