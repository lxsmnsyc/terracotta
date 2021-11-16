import { RouterLink } from 'rigidity';
import { JSX } from 'solid-js';
import { Transition } from 'solid-headless';
import Preview from './Preview';

export interface WindowPreviewProps {
  src: string;
  canonical: string;
}

export default function WindowPreview(props: WindowPreviewProps): JSX.Element {
  let loading = $signal(true);

  function onLoad() {
    console.log('Loaded!');
    setTimeout(() => {
      loading = false;
    }, 1000);
  }

  effect: {
    console.log(loading);
  }

  return (
    <div class="w-full h-full border shadow-lg border-gray-900 dark:border-gray-50 rounded-lg overflow-hidden">
      <div class="flex items-center relative bg-gray-900 dark:bg-gray-50">
        <div class="p-1 flex items-center justify-center">
          <div class="bg-red-500 m-1 w-3 h-3 rounded-full" />
          <div class="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
          <div class="bg-green-500 m-1 w-3 h-3 rounded-full" />
        </div>
        <div class="w-full flex items-center justify-center absolute left-0">
          <RouterLink
            href={props.canonical}
            class="text-xs bg-gray-200 dark:bg-gray-800 w-1/2 rounded-lg py-1 flex justify-between items-center"
          >
            <div class="flex items-center justify-center pl-4">
              <span class="">{props.canonical}</span>
            </div>
            <div class="flex pr-4">
              <span class="text-gray-500 w-4 h-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-full w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="relative w-full h-full">
        <div class={`w-full h-full transition duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Preview src={props.src} onLoad={onLoad} />
        </div>
        <Transition
          show={loading}
          class="absolute inset-0 w-full h-full animate-pulse bg-gray-900"
          enter="transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-300"
          leaveTo="opacity-0"
          leaveFrom="opacity-100"
        />
      </div>
    </div>
  );
}
