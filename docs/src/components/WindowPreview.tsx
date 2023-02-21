import { JSX } from 'solid-js';
import Preview from './Preview';
import { CircularButton } from './CircularButton';
import { NextIcon, PrevIcon } from './Icons';
import { Link } from '../internal/router';
import ClientOnly from './ClientOnly';

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

  $effect(() => {
    loading = !props.src;
  });

  function onLoad() {
    loading = false;
  }

  return (
    <div class="w-full h-[75vh] md:h-full border-2 divide-y-2 divide-gray-800 dark:divide-gray-50 border-gray-800 dark:border-gray-50 bg-gray-800 rounded-lg overflow-hidden flex flex-col">
      <div class="flex-0 flex items-center justify-between">
        <div class="flex-0 p-2 hidden md:flex items-center justify-center">
          <div class="bg-red-500 m-1 w-3 h-3 rounded-full" />
          <div class="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
          <div class="bg-green-500 m-1 w-3 h-3 rounded-full" />
        </div>
        <div class="flex-1 flex items-center justify-center px-1">
          <Link
            href={props.canonical}
            class="text-xs w-full bg-gray-200 dark:bg-gray-700 rounded-lg py-1 flex justify-between items-center transition duration-150 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75' focus-visible:ring-gray-50 dark:focus-visible:ring-gray-900"
          >
            <span class="px-2">{props.canonical}</span>
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
        <ClientOnly>
          <Preview src={props.src} onLoad={onLoad} />
        </ClientOnly>
      </div>
    </div>
  );
}
