import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import { renderChildren } from '../../utils/render-children';
import { createExpandedState } from '../../utils/state-props';
import { useTreeGridContext } from './TreeGridContext';

const TREEGRID_ROW_TAG = createTag('treegrid-row');

export interface TreeGridRowProperties {
  level(): number;
  /** Whether the row has child rows. */
  isExpandable(): boolean;
  isExpanded(): boolean;
  toggle(): void;
}

export interface TreeGridRowOptions<V> {
  /** Identifies the row for expansion. */
  value: V;
  /** The depth of the row, from 1 for a top-level row. Defaults to 1. */
  level?: number;
  /** Marks a parent row, which has child rows and gets `aria-expanded`. */
  expandable?: boolean;
  children?: JSX.Element | ((row: TreeGridRowProperties) => JSX.Element);
}

export type TreeGridRowProps<V, T extends ValidComponent = 'tr'> = HeadlessPropsWithRef<
  T,
  TreeGridRowOptions<V>
>;

/**
 * A focusable row of a `TreeGrid`, with `role="row"` and `aria-level`. The
 * rows of a treegrid are not nested in the markup, so pass each row its
 * `level`, and `expandable` on parent rows. Render the child rows after their
 * parent while it is expanded.
 *
 * Use a plain `GridRow` for a header row, which does not take focus.
 *
 * Renders a `<tr>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/treegrid.md}
 */
export function TreeGridRow<V, T extends ValidComponent = 'tr'>(
  props: TreeGridRowProps<V, T>,
): JSX.Element {
  const context = useTreeGridContext<V>('TreeGridRow');

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return context.registerRow(current, props.value);
    }
    return undefined;
  });

  const isExpandable = (): boolean => !!props.expandable;
  const isExpanded = (): boolean => isExpandable() && context.isExpanded(props.value);

  const row: TreeGridRowProperties = {
    level: () => props.level ?? 1,
    isExpandable,
    isExpanded,
    toggle(): void {
      context.toggle(props.value);
    },
  };

  // End rows carry no `aria-expanded`, or they would read as parents.
  function ariaExpanded(): 'true' | 'false' | undefined {
    if (!isExpandable()) {
      return undefined;
    }
    return isExpanded() ? 'true' : 'false';
  }

  const expandedState = createExpandedState(isExpanded);
  const rest = omit(props, 'as', 'children', 'ref', 'value', 'level', 'expandable');
  const Root = dynamic(() => props.as || 'tr');
  return (
    <Root
      {...TREEGRID_ROW_TAG}
      role="row"
      aria-level={row.level()}
      aria-expanded={ariaExpanded()}
      tc-level={row.level()}
      ref={setInternalRef}
      {...expandedState}
      {...rest}
    >
      {renderChildren(props.children, row)}
    </Root>
  );
}
