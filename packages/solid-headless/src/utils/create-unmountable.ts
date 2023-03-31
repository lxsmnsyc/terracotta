import {
  JSX,
} from 'solid-js';
import createShow from './create-show';

export interface UnmountableProps {
  unmount?: boolean;
}

export function createUnmountable(
  props: UnmountableProps,
  shouldMount: () => boolean,
  render: () => JSX.Element,
): JSX.Element {
  return createShow(
    () => props.unmount ?? true,
    () => createShow(shouldMount, render),
    render,
  );
}
