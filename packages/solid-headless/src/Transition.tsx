import { JSX } from 'solid-js';
import { HeadlessTransitionRootProps, TransitionStates } from './headless/Transition';

interface Styles {
  className?: string;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

function applyStyle(state: TransitionStates, style: Styles): string {
  const className = style.className ?? '';
  const enter = style.enter ?? '';
  const leave = style.leave ?? '';
  switch (state) {
    case 'before-enter':
    case 'during-enter':
      return `${className} ${enter} ${style.enterFrom ?? ''}`;
    case 'after-enter':
      return `${className} ${enter} ${style.enterTo ?? ''}`;
    case 'before-leave':
    case 'during-leave':
      return `${className} ${leave} ${style.leaveFrom ?? ''}`;
    case 'after-leave':
      return `${className} ${leave} ${style.leaveTo ?? ''}`;
    default:
      return className;
  }
}

export type TransitionProps<K extends keyof JSX.IntrinsicElements> = {
  as?: K;
  enter?: string;
  enterFrom?: string;
  enterTo: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  appear?: boolean;
  show?: boolean;
  unmount?: boolean;
} & JSX.IntrinsicElements[K];

export function Transition<K extends keyof JSX.IntrinsicElements>(
  props: TransitionProps<K>,
): JSX.Element {
  const enterDuration = props.enter;
}
