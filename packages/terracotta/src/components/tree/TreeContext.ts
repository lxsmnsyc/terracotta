import { type Accessor, createContext, useContext } from 'solid-js';
import type { SelectStateProperties } from '../../states/create-select-state';
import assert from '../../utils/assert';
import type { Presence } from '../../utils/create-presence';

export interface TreeItemEntry {
  element: HTMLElement;
  /** Whether every ancestor is expanded, so the item is on screen. */
  isVisible: () => boolean;
  isSelected: () => boolean;
  disabled: () => boolean;
  /** Whether the item has a `TreeGroup`, so it is a parent node. */
  isParent: () => boolean;
  isExpanded: () => boolean;
  setExpanded: (expanded: boolean) => void;
  select: () => void;
}

export interface TreeContextData<V> {
  ownerID: string;
  selection: SelectStateProperties<V>;
  multiple: boolean;
  isExpanded(value: V): boolean;
  setExpanded(value: V, expanded: boolean): void;
  /** Adds an item until the returned function is called. */
  register(entry: TreeItemEntry): () => void;
  /** The item that has `tabindex="0"`. */
  tabStop: Accessor<HTMLElement | undefined>;
  /**
   * Returns `true` for the first caller only. On the server no item registers,
   * so the first root item claims the tab stop this way.
   */
  claimServerTabStop(): boolean;
  setFocused(element: HTMLElement): void;
}

export interface TreeItemContextData<V> {
  value: V;
  /** The depth of the item, from 1 for a root node. */
  level: number;
  labelID: string;
  label: Presence;
  /** Registered by `TreeGroup`, so the item knows it is a parent. */
  group: Presence;
  isExpanded(): boolean;
  isVisible(): boolean;
}

export const TreeContext = createContext<TreeContextData<unknown> | null>(null);

export const TreeItemContext = createContext<TreeItemContextData<unknown> | null>(null);

/**
 * Reads the nearest `Tree`'s internal context. Throws when called outside a
 * `Tree`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tree.md}
 */
export function useTreeContext<V>(componentName: string): TreeContextData<V> {
  const context = useContext(TreeContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Tree>`));
  return context;
}

/**
 * Reads the nearest `TreeItem`'s internal context. Throws when called outside a
 * `TreeItem`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tree.md}
 */
export function useTreeItemContext<V>(componentName: string): TreeItemContextData<V> {
  const context = useContext(TreeItemContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TreeItem>`));
  return context as TreeItemContextData<V>;
}

/** The parent item, or `null` for a root node. */
export function useParentTreeItem<V>(): TreeItemContextData<V> | null {
  return useContext(TreeItemContext) as TreeItemContextData<V> | null;
}
