import type { JSX } from '@solidjs/web';

/**
 * The icons the demos and the chrome use. Each is a 1em square stroked in
 * `currentColor`, so it takes the size and colour of the text around it, and
 * every theme colours it without knowing it is there. They are decoration:
 * the component carries the state, so each icon is hidden from assistive
 * technology.
 */
function Icon(props: { children: JSX.Element; class?: string }): JSX.Element {
  return (
    <svg
      class={props.class ? `icon ${props.class}` : 'icon'}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {props.children}
    </svg>
  );
}

export function CheckIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M3 8.5l3.25 3.25L13 4.75" />
    </Icon>
  );
}

export function MinusIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M3.5 8h9" />
    </Icon>
  );
}

export function PlusIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M8 3.5v9M3.5 8h9" />
    </Icon>
  );
}

export function ChevronRightIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M6 3.5L10.5 8 6 12.5" />
    </Icon>
  );
}

export function ChevronDownIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M3.5 6L8 10.5 12.5 6" />
    </Icon>
  );
}

export function CloseIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </Icon>
  );
}
