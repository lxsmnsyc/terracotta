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

export function SearchIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </Icon>
  );
}

/** A page of prose: a guide or the reference. */
export function PageIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M4 1.75h5.25L12.5 5v9.25H4z" />
      <path d="M9 2v3.25h3.25M6.25 8.5h4M6.25 11h4" />
    </Icon>
  );
}

/** A component page. */
export function ComponentIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <rect x="2.25" y="2.25" width="4.5" height="4.5" rx="1" />
      <rect x="9.25" y="2.25" width="4.5" height="4.5" rx="1" />
      <rect x="2.25" y="9.25" width="4.5" height="4.5" rx="1" />
      <rect x="9.25" y="9.25" width="4.5" height="4.5" rx="1" />
    </Icon>
  );
}

/** A section of a page. */
export function HashIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M6.5 2.5L5 13.5M11 2.5L9.5 13.5M2.75 6h11M2.25 10h11" />
    </Icon>
  );
}

/** Something to run rather than somewhere to go. */
export function BoltIcon(props: { class?: string }): JSX.Element {
  return (
    <Icon class={props.class}>
      <path d="M9 1.75L3.5 9h4.25L7 14.25 12.5 7H8.25z" />
    </Icon>
  );
}
