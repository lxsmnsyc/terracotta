import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import { useTreeItemContext } from './TreeContext';
import { TREE_GROUP_TAG } from './tags';

export type TreeGroupProps<T extends ValidComponent = 'ul'> = HeadlessPropsWithRef<
  T,
  Prettify<UnmountableProps & { children?: JSX.Element }>
>;

/**
 * The children of a `TreeItem`, with `role="group"`. Its presence makes the
 * item a parent node with `aria-expanded`. It is shown while the item is
 * expanded.
 *
 * Renders a `<ul>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tree.md}
 */
export function TreeGroup<T extends ValidComponent = 'ul'>(props: TreeGroupProps<T>): JSX.Element {
  const item = useTreeItemContext('TreeGroup');
  // Registered here, outside the part that unmounts, so a closed item still
  // knows it has children.
  item.group.register();

  const expandedState = createExpandedState(() => item.isExpanded());
  const rest = omit(props, 'as', 'unmount', 'children');
  const Root = dynamic(() => props.as || 'ul');
  return (
    <Unmountable unmount={props.unmount} when={item.isExpanded()}>
      <Root {...TREE_GROUP_TAG} role="group" {...expandedState} {...rest}>
        {props.children}
      </Root>
    </Unmountable>
  );
}
