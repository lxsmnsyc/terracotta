import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from 'terracotta';
import type { JSX } from 'solid-js';

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

export default function App(): JSX.Element {
  return (
    <div class="w-full">
      <div class="w-full max-w-md p-2 mx-auto bg-white rounded-2xl space-y-2">
        <Disclosure defaultOpen as="div">
          <DisclosureButton as="div" class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            {({ isOpen }): JSX.Element => (
              <>
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  class={`${isOpen() ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                />
              </>
            )}
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            If you're unhappy with your purchase for any reason, email us
            within 90 days and we'll refund you in full, no questions asked.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure defaultOpen as="div">
          <DisclosureButton class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            {({ isOpen }): JSX.Element => (
              <>
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  class={`${isOpen() ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                />
              </>
            )}
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            No.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
}
