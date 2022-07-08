import { JSX } from 'solid-js';

export interface FragmentProps {
  children?: JSX.Element;
}

export default function Fragment(props: FragmentProps): JSX.Element {
  return props.children;
}
