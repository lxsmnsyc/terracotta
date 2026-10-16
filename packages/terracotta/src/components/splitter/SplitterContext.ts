import type { JSX } from '@solidjs/web';
import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';
import { renderChildren } from '../../utils/render-children';

export interface SplitterStateProperties {
  /** The size of the primary pane, from `min` to `max`. */
  value(): number;
  min(): number;
  max(): number;
  step(): number;
  disabled(): boolean;
  /** Whether the primary pane is at its smallest size. */
  collapsed(): boolean;
  /** Sets the size, kept in range. */
  setValue(value: number): void;
  /** Moves the size by a number of steps. */
  grow(steps?: number): void;
  shrink(steps?: number): void;
  /** Collapses the primary pane, or restores it to its size before. */
  toggle(): void;
}

export interface SplitterContextData {
  state: SplitterStateProperties;
  paneID: string;
  isHorizontal(): boolean;
  root(): HTMLElement | undefined;
}

export const SplitterContext = createContext<SplitterContextData | null>(null);

/**
 * Reads the nearest `Splitter`'s internal context. Throws when called outside
 * a `Splitter`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/splitter.md}
 */
export function useSplitterContext(componentName: string): SplitterContextData {
  const context = useContext(SplitterContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Splitter>`));
  return context;
}

/**
 * Reads the nearest splitter's state. Throws when called outside a `Splitter`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/splitter.md}
 */
export function useSplitterState(): SplitterStateProperties {
  return useSplitterContext('useSplitterState').state;
}

export interface SplitterStateRenderProps {
  children?: JSX.Element | ((state: SplitterStateProperties) => JSX.Element);
}

/**
 * Passes the nearest splitter's state to a render prop.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/splitter.md}
 */
export function SplitterStateChild(props: SplitterStateRenderProps): JSX.Element {
  const state = useSplitterState();
  return renderChildren(props.children, state);
}
