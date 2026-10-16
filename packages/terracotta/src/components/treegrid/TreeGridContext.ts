import type { JSX } from '@solidjs/web';
import { createContext, createMemo, useContext } from 'solid-js';
import assert from '../../utils/assert';
import { renderChildren } from '../../utils/render-children';

export interface TreeGridStateProperties<V> {
  isExpanded(value: V): boolean;
  setExpanded(value: V, expanded: boolean): void;
  toggle(value: V): void;
}

interface TreeGridContextData<V> extends TreeGridStateProperties<V> {
  /** Ties a row element to its value until the returned function is called. */
  registerRow(element: HTMLElement, value: V): () => void;
}

export const TreeGridContext = createContext<TreeGridContextData<unknown> | null>(null);

/** Reads the nearest `TreeGrid`'s internal context. */
export function useTreeGridContext<V>(componentName: string): TreeGridContextData<V> {
  const context = useContext(TreeGridContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TreeGrid>`));
  return context;
}

/**
 * Reads the nearest treegrid's expansion state. Throws when called outside a
 * `TreeGrid`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/treegrid.md}
 */
export function useTreeGridState<V>(): TreeGridStateProperties<V> {
  const context = useContext(TreeGridContext);
  assert(context, new Error('Must be used inside a <TreeGrid>'));
  return context;
}

export interface TreeGridStateRenderProps<V> {
  children?: JSX.Element | ((state: TreeGridStateProperties<V>) => JSX.Element);
}

/**
 * Passes the nearest treegrid's expansion state to a render prop.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/treegrid.md}
 */
export function TreeGridStateChild<V>(props: TreeGridStateRenderProps<V>): JSX.Element {
  const state = useTreeGridState<V>();
  return createMemo(() => renderChildren(props.children, state)) as unknown as JSX.Element;
}
