import { RouterLink, RouterLinkProps } from 'rigidity';
import {
  JSX,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import classNames from '../utils/classnames';

const CLASSES = classNames(
  'rounded-full transition duration-150',
  'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
  'focus-visible:ring-gray-900',
  'dark:focus-visible:ring-gray-50',
  // Background
  'bg-opacity-25 dark:bg-opacity-25 active:bg-opacity-25 dark:active:bg-opacity-25 hover:bg-opacity-25 dark:hover:bg-opacity-25',
  'bg-gray-900 hover:bg-gray-700 active:bg-gray-800',
  'dark:bg-gray-50 dark:hover:bg-gray-200 dark:active:bg-gray-100',
  // Foreground
  'text-gray-50 hover:text-gray-200 active:text-gray-100',
  'dark:text-gray-900 dark:hover:text-gray-700 dark:active:text-gray-800',
);

export function CircularLink(props: RouterLinkProps): JSX.Element {
  return (
    <RouterLink
      class={`${CLASSES} ${props.class ?? ''}`}
      {...omitProps(props, ['class'])}
    >
      {props.children}
    </RouterLink>
  );
}

export function CircularButton(props: JSX.IntrinsicElements['button']): JSX.Element {
  return (
    <button
      type="button"
      class={`${CLASSES} ${props.class ?? ''}`}
      {...omitProps(props, ['class'])}
    >
      {props.children}
    </button>
  );
}
