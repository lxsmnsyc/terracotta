import { Link } from 'solid-tiny-router';
import { JSX } from 'solid-js';
import Preview from './Preview';
import { CircularButton } from './CircularButton';
import { NextIcon, PrevIcon } from './Icons';

export interface WindowPreviewBaseProps {
  src: string;
  canonical: string;
}

export interface WindowPreviewProps extends WindowPreviewBaseProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function WindowPreview(props: WindowPreviewProps): JSX.Element {
  let loading = $signal(true);

  effect: {
    loading = !props.src;
  }

  function onLoad() {
    loading = false;
  }

  return (
    <div class="w-full h-[75vh] md:h-full border border-gray-900 dark:border-gray-50 bg-gray-900 dark:bg-gray-50 rounded-lg overflow-hidden flex flex-col">
      <div class="flex-0 flex items-center justify-between">
        <div class="flex-0 p-2 flex items-center justify-center">
          <div class="bg-red-500 m-1 w-3 h-3 rounded-full" />
          <div class="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
          <div class="bg-green-500 m-1 w-3 h-3 rounded-full" />
        </div>
        <div class="flex-1 flex items-center justify-center">
          <Link
            href={props.canonical}
            class="text-xs w-full bg-gray-200 dark:bg-gray-800 rounded-lg py-1 flex justify-between items-center transition duration-150 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75' focus-visible:ring-gray-50 dark:focus-visible:ring-gray-900"
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
          </Link>
        </div>
        <div class="p-2 flex-0 flex items-center justify-center">
          <CircularButton onClick={props.onPrev}>
            <span class="sr-only">View previous component</span>
            <PrevIcon class="w-6 h-6 p-1" />
          </CircularButton>
          <CircularButton onClick={props.onNext}>
            <span class="sr-only">View next component</span>
            <NextIcon class="w-6 h-6 p-1" />
          </CircularButton>
        </div>
      </div>
      <div class={`flex-1 transition duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Preview src={props.src} onLoad={onLoad} />
      </div>
    </div>
  );
}
