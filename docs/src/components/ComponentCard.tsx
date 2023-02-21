import {
  JSX,
} from 'solid-js';
import { Link } from '../internal/router';
import classNames from '../utils/classnames';
import ClientOnly from './ClientOnly';
import Preview from './Preview';

export interface ComponentCardProps {
  target: string;
  name: string;
}

const CARD = classNames(
  'rounded-lg overflow-hidden m-2 flex flex-col',
  'transition duration-200',
  'bg-gray-900',
  'text-gray-50 ',
  'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
  'focus-visible:ring-gray-900',
  'dark:focus-visible:ring-gray-50',
  'border-2 border-gray-900 dark:border-gray-50 divide-y divide-gray-900 dark:divide-gray-50',
  'hover:bg-gray-700 hover:border-gray-700 hover:divide-gray-700',
  // 'dark:hover:bg-gray-200 dark:hover:border-gray-200 dark:hover:divide-gray-200',
  'active:bg-gray-800 active:border-gray-800 active:divide-gray-800',
  // 'dark:active:bg-gray-100 dark:active:border-gray-100 dark:active:divide-gray-100',
);

export default function ComponentCard(props: ComponentCardProps): JSX.Element {
  let loading = $signal(true);
  return (
    <div class="w-full md:w-1/2 lg:w-1/3">
      <Link href={`/component/${props.target}`} class={CARD}>
        <div class="w-full h-auto transition-colors duration-200 relative overflow-hidden">
          <div class="aspect-w-16 aspect-h-9 relative overflow-hidden">
            <div class="absolute w-[200%] h-[200%] top-0 left-0 transform-gpu scale-50 origin-top-left">
              <ClientOnly>
                <Preview
                  src={`/preview/${props.target}`}
                  onLoad={() => {
                    loading = false;
                  }}
                />
              </ClientOnly>
            </div>
          </div>
          {loading && <div class="absolute top-0 w-full h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
          <div class="absolute top-0 w-full h-full" />
        </div>
        <div class="p-4">
          <span>{props.name}</span>
        </div>
      </Link>
    </div>
  );
}
