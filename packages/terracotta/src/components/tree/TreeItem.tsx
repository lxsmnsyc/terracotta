import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit } from 'solid-js';
import { createPresence } from '../../utils/create-presence';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { mergeFunc } from '../../utils/merge-func';
import { renderChildren } from '../../utils/render-children';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { TreeItemContext, useParentTreeItem, useTreeContext } from './TreeContext';
import { TREE_ITEM_TAG } from './tags';

export interface TreeItemProperties {
  /** The depth of the item, from 1 for a root node. */
  level(): number;
  isSelected(): boolean;
  isExpanded(): boolean;
  /** Whether the item has a `TreeGroup`. */
  isParent(): boolean;
  disabled(): boolean;
  /** Opens or closes the item. */
  toggle(): void;
  select(): void;
}

export interface TreeItemOptions<V> {
  /** Identifies the item for selection and expansion. */
  value: V;
  disabled?: boolean;
  children?: JSX.Element | ((properties: TreeItemProperties) => JSX.Element);
}

export type TreeItemProps<V, T extends ValidComponent = 'li'> = HeadlessPropsWithRef<
  T,
  TreeItemOptions<V>
>;

/**
 * A node of a `Tree`, with `role="treeitem"`. Put a `TreeItemLabel` inside to
 * name it, and a `TreeGroup` with more items to make it a parent. Clicking it
 * selects it.
 *
 * Renders an `<li>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tree.md}
 */
export function TreeItem<V, T extends ValidComponent = 'li'>(
  props: TreeItemProps<V, T>,
): JSX.Element {
  const tree = useTreeContext<V>('TreeItem');
  const parent = useParentTreeItem<V>();

  const labelID = createUniqueId();
  const label = createPresence();
  // A leaf must not claim to be a parent in server-rendered HTML.
  const group = createPresence(false);

  const [internalRef, setInternalRef] = createForwardRef(props);

  const level = (parent?.level ?? 0) + 1;
  const disabled = (): boolean => !!props.disabled || tree.selection.disabled();
  const isSelected = (): boolean => tree.selection.isSelected(props.value);
  const isExpanded = (): boolean => tree.isExpanded(props.value);
  const isVisible = (): boolean => (parent ? parent.isExpanded() && parent.isVisible() : true);

  const properties: TreeItemProperties = {
    level: () => level,
    isSelected,
    isExpanded,
    isParent: group.isPresent,
    disabled,
    toggle(): void {
      tree.setExpanded(props.value, !isExpanded());
    },
    select(): void {
      if (!disabled()) {
        tree.selection.select(props.value);
      }
    },
  };

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        tree.register({
          element: current,
          isVisible,
          isSelected,
          disabled,
          isParent: group.isPresent,
          isExpanded,
          setExpanded(open): void {
            tree.setExpanded(props.value, open);
          },
          select: properties.select,
        }),
        useEventListener(current, 'focus', () => {
          tree.setFocused(current);
        }),
        useEventListener(current, 'click', (e) => {
          // A click inside a nested item belongs to that item.
          if (e.target instanceof Element && e.target.closest('[role="treeitem"]') === current) {
            properties.select();
            current.focus();
          }
        }),
      );
    }
    return undefined;
  });

  // End nodes carry no `aria-expanded`, or they would read as parents.
  function ariaExpanded(): 'true' | 'false' | undefined {
    if (!group.isPresent()) {
      return undefined;
    }
    return isExpanded() ? 'true' : 'false';
  }

  const ownerAttribute = createOwnerAttribute(tree.ownerID);
  const selectedState = createSelectedState(isSelected);
  const expandedState = createExpandedState(() => group.isPresent() && isExpanded());
  const disabledState = createDisabledState(disabled);
  const ariaDisabledState = createARIADisabledState(disabled);
  const rest = omit(props, 'as', 'children', 'ref', 'value', 'disabled');
  const Root = dynamic(() => props.as || 'li');
  return (
    <TreeItemContext
      value={{
        value: props.value,
        level,
        labelID,
        label,
        group,
        isExpanded,
        isVisible,
      }}
    >
      <Root
        {...TREE_ITEM_TAG}
        {...ownerAttribute}
        role="treeitem"
        tabindex={tree.tabStop() === internalRef() ? 0 : -1}
        aria-level={level}
        aria-selected={isSelected() ? 'true' : 'false'}
        aria-expanded={ariaExpanded()}
        aria-labelledby={label.isPresent() ? labelID : undefined}
        tc-level={level}
        ref={setInternalRef}
        {...selectedState}
        {...expandedState}
        {...disabledState}
        {...ariaDisabledState}
        {...rest}
      >
        {renderChildren(props.children, properties)}
      </Root>
    </TreeItemContext>
  );
}
