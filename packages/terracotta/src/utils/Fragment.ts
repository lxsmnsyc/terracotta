import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';

export interface FragmentProps {
  children?: JSX.Element;
}

// Solid doesn't have this
export default function Fragment(props: FragmentProps): JSX.Element {
  return createMemo(() => props.children) as unknown as JSX.Element;
}
