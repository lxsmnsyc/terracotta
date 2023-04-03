import {
  JSX,
} from 'solid-js';
import createShow from './create-show';

// An `unmountable` is a kind of component
// where one can decide if it should conditionally
// render or not.
// This is only used for disclosure-based properties
// as some implementations may allow users to use various
// ways to hide the element (e.g. opacity, display, visibility)
export interface UnmountableProps {
  unmount?: boolean;
}

export function createUnmountable(
  props: UnmountableProps,
  shouldMount: () => boolean,
  render: () => JSX.Element,
): JSX.Element {
  return createShow(
    () => (props.unmount == null ? true : props.unmount),
    () => createShow(shouldMount, render),
    render,
  );
}
