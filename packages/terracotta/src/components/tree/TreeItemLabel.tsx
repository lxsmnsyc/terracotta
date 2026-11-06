import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { useTreeItemContext } from './TreeContext';
import { TREE_ITEM_LABEL_TAG } from './tags';

export type TreeItemLabelProps<T extends ValidComponent = 'span'> = HeadlessPropsWithRef<T>;

/**
 * The name of a `TreeItem`. The item points `aria-labelledby` at it, so the
 * names of its children are not read as part of its own. Type-ahead matches
 * this text.
 *
 * Renders a `<span>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tree.md}
 */
export function TreeItemLabel<T extends ValidComponent = 'span'>(
  props: TreeItemLabelProps<T>,
): JSX.Element {
  const item = useTreeItemContext('TreeItemLabel');
  item.label.register();

  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'span');
  return <Root {...TREE_ITEM_LABEL_TAG} id={item.labelID} {...rest} />;
}
