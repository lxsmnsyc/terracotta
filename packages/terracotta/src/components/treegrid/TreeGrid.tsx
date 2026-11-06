import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createMemo, createSignal, omit, untrack } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import getFocusableElements from '../../utils/focus-query';
import isEqual from '../../utils/is-equal';
import { mergeFunc } from '../../utils/merge-func';
import { createTag } from '../../utils/namespace';
import { renderChildren } from '../../utils/render-children';
import useEventListener from '../../utils/use-event-listener';
import type { TreeGridStateProperties, TreeGridStateRenderProps } from './TreeGridContext';
import { TreeGridContext } from './TreeGridContext';

const TREEGRID_TAG = createTag('treegrid');

const CELL = '[role="gridcell"], [role="columnheader"], [role="rowheader"]';

/** The rows that take focus, as opposed to header rows. */
const TREE_ROW = '[tc-treegrid-row]';

/** Fields that need the arrow keys for their own caret or options. */
const EDITABLE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

export interface TreeGridOptions<V> {
  /** The values of the rows that start expanded, uncontrolled. */
  defaultExpanded?: V[];
  /** The values of the expanded rows, controlled. */
  expanded?: V[];
  onExpandedChange?: (expanded: V[]) => void;
  /** Compares row values. Defaults to reference equality. */
  by?: (a: V, b: V) => boolean;
  /** Rows moved by Page Up and Page Down. Defaults to 5. */
  pageSize?: number;
}

export type TreeGridProps<V, T extends ValidComponent = 'table'> = HeadlessPropsWithRef<
  T,
  TreeGridOptions<V> & TreeGridStateRenderProps<V>
>;

/**
 * A grid whose rows open and close like a tree, following the ARIA treegrid
 * pattern. It is one stop in the tab sequence. Both rows and cells take focus:
 * <kbd>Right</kbd> and <kbd>Left</kbd> open and close a focused row, and move
 * between its cells.
 *
 * Renders a `<table>` by default, with `role="treegrid"`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/treegrid.md}
 */
export function TreeGrid<V, T extends ValidComponent = 'table'>(
  props: TreeGridProps<V, T>,
): JSX.Element {
  const [ref, setRef] = createForwardRef(props);

  const equals = (a: V, b: V): boolean => (props.by ?? isEqual)(a, b);

  const [internal, setInternal] = createSignal<V[]>(untrack(() => props.defaultExpanded ?? []));
  const expanded = createMemo((): V[] => props.expanded ?? internal());

  function isExpanded(value: V): boolean {
    return expanded().some((item) => equals(item, value));
  }

  function setExpanded(value: V, open: boolean): void {
    if (untrack(() => isExpanded(value)) === open) {
      return;
    }
    const current = untrack(expanded);
    const next = open ? [...current, value] : current.filter((item) => !equals(item, value));
    if (props.expanded == null) {
      setInternal(next);
    }
    props.onExpandedChange?.(next);
  }

  const state: TreeGridStateProperties<V> = {
    isExpanded,
    setExpanded,
    toggle(value): void {
      setExpanded(value, !untrack(() => isExpanded(value)));
    },
  };

  // Boxed, so a row whose value is `undefined` still counts.
  const rowValues = new Map<HTMLElement, { value: V }>();

  createEffect(ref, (current) => {
    if (!(current instanceof HTMLElement)) {
      return undefined;
    }
    const root = current;
    // The row or cell holding the tab stop.
    let stop: HTMLElement | undefined;
    const demoted = new Map<HTMLElement, string | null>();
    // The `tabindex` each row and cell had before the tree grid first set it.
    const ownTabIndexes = new Map<HTMLElement, string | null>();

    function owns(element: Element): boolean {
      return element.closest('[role="treegrid"]') === root;
    }

    function allRows(): HTMLElement[] {
      return Array.from(root.querySelectorAll<HTMLElement>('[role="row"]')).filter(owns);
    }

    function treeRows(): HTMLElement[] {
      return allRows().filter((row) => row.matches(TREE_ROW));
    }

    function cellsOf(row: HTMLElement): HTMLElement[] {
      return Array.from(row.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.matches(CELL),
      );
    }

    function setTabIndex(element: HTMLElement, value: string | null): void {
      if (value == null) {
        element.removeAttribute('tabindex');
      } else {
        element.setAttribute('tabindex', value);
      }
    }

    function restore(): void {
      for (const [element, value] of demoted) {
        setTabIndex(element, value);
      }
      demoted.clear();
    }

    function restoreOwn(keep: HTMLElement[] = []): void {
      for (const [element, value] of ownTabIndexes) {
        if (!keep.includes(element)) {
          setTabIndex(element, value);
          ownTabIndexes.delete(element);
        }
      }
    }

    function record(element: HTMLElement): void {
      if (!ownTabIndexes.has(element)) {
        ownTabIndexes.set(element, element.getAttribute('tabindex'));
      }
    }

    function widgetsOf(cell: HTMLElement): HTMLElement[] {
      return getFocusableElements(cell).filter((element) => element !== cell);
    }

    // The element that takes focus for a cell: its one widget, or the cell.
    function targetOf(cell: HTMLElement): HTMLElement {
      const inner = widgetsOf(cell);
      return inner.length === 1 && !inner[0].matches(EDITABLE) ? inner[0] : cell;
    }

    function rowOf(element: HTMLElement): HTMLElement | undefined {
      const row = element.closest<HTMLElement>('[role="row"]');
      return row && owns(row) ? row : undefined;
    }

    const observer = new MutationObserver(() => {
      update();
    });

    // One tab stop: the stop row or cell. Widgets in the row that holds it
    // stay in the tab sequence, so Tab moves through them before leaving.
    function update(): void {
      restore();
      const rows = treeRows();
      const cells = allRows().flatMap(cellsOf);
      if (!stop || !(rows.includes(stop) || cells.includes(stop))) {
        stop = rows.at(0) ?? cells.at(0);
      }
      const activeRow = stop ? rowOf(stop) : undefined;
      // A row or cell that left the tree grid gets its own `tabindex` back.
      restoreOwn([...rows, ...cells]);
      for (const row of rows) {
        record(row);
        row.setAttribute('tabindex', row === stop ? '0' : '-1');
      }
      for (const cell of cells) {
        record(cell);
        const target = targetOf(cell);
        const keepWidgets = rowOf(cell) === activeRow;
        for (const element of widgetsOf(cell)) {
          if (!keepWidgets) {
            demoted.set(element, element.getAttribute('tabindex'));
            element.setAttribute('tabindex', '-1');
          }
        }
        if (target === cell) {
          cell.setAttribute('tabindex', cell === stop ? '0' : '-1');
        } else {
          cell.removeAttribute('tabindex');
        }
      }
      observer.takeRecords();
    }

    function owner(target: EventTarget | null): HTMLElement | undefined {
      if (!(target instanceof Element)) {
        return undefined;
      }
      const cell = target.closest<HTMLElement>(CELL);
      if (cell && owns(cell)) {
        return cell;
      }
      const row = target.closest<HTMLElement>(TREE_ROW);
      return row && owns(row) ? row : undefined;
    }

    function focusOn(element: HTMLElement | undefined): void {
      if (element) {
        stop = element;
        update();
        (element.matches(CELL) ? targetOf(element) : element).focus();
      }
    }

    function expand(row: HTMLElement, open: boolean): void {
      const value = rowValues.get(row);
      if (value !== undefined) {
        setExpanded(value.value, open);
      }
    }

    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'hidden', 'inert'],
    });
    update();

    return mergeFunc(
      () => {
        observer.disconnect();
        restore();
        restoreOwn();
      },
      useEventListener(root, 'focusin', (e) => {
        const target = owner(e.target);
        if (target && target !== stop) {
          stop = target;
          update();
        }
      }),
      useEventListener(root, 'keydown', (e) => {
        const target = owner(e.target);
        if (!target) {
          return;
        }
        if (e.target instanceof Element && e.target !== target && e.target.matches(EDITABLE)) {
          return;
        }
        const pageSize = props.pageSize ?? 5;
        let next: HTMLElement | undefined;
        if (target.matches(TREE_ROW)) {
          const rows = treeRows();
          const r = rows.indexOf(target);
          const isParent = target.hasAttribute('aria-expanded');
          const isOpen = target.getAttribute('aria-expanded') === 'true';
          switch (e.key) {
            case 'ArrowRight':
              if (isParent && !isOpen) {
                expand(target, true);
              } else {
                next = cellsOf(target).at(0);
              }
              break;
            case 'ArrowLeft':
              if (isOpen) {
                expand(target, false);
              }
              break;
            case 'ArrowDown':
              next = rows.at(r + 1);
              break;
            case 'ArrowUp':
              next = r > 0 ? rows[r - 1] : undefined;
              break;
            case 'PageDown':
              next =
                r < rows.length - 1 ? rows[Math.min(rows.length - 1, r + pageSize)] : undefined;
              break;
            case 'PageUp':
              next = r > 0 ? rows[Math.max(0, r - pageSize)] : undefined;
              break;
            case 'Home':
              next = rows.at(0);
              break;
            case 'End':
              next = rows.at(-1);
              break;
            case 'Enter':
              if (isParent) {
                expand(target, !isOpen);
              }
              break;
            default:
              return;
          }
        } else {
          const grid = allRows().map(cellsOf);
          const r = grid.findIndex((row) => row.includes(target));
          if (r === -1) {
            return;
          }
          const c = grid[r].indexOf(target);
          const at = (row: number): HTMLElement | undefined => {
            const list = grid.at(row);
            return list && row >= 0 ? list[Math.min(c, list.length - 1)] : undefined;
          };
          switch (e.key) {
            case 'ArrowRight':
              next = grid[r].at(c + 1);
              break;
            case 'ArrowLeft': {
              if (c > 0) {
                next = grid[r][c - 1];
              } else {
                // The first cell leads back to its row.
                const row = rowOf(target);
                next = row?.matches(TREE_ROW) ? row : undefined;
              }
              break;
            }
            case 'ArrowDown':
              next = at(r + 1);
              break;
            case 'ArrowUp':
              next = r > 0 ? at(r - 1) : undefined;
              break;
            case 'PageDown':
              next = r < grid.length - 1 ? at(Math.min(grid.length - 1, r + pageSize)) : undefined;
              break;
            case 'PageUp':
              next = r > 0 ? at(Math.max(0, r - pageSize)) : undefined;
              break;
            case 'Home':
              next = e.ctrlKey ? at(0) : grid[r].at(0);
              break;
            case 'End':
              next = e.ctrlKey ? at(grid.length - 1) : grid[r].at(-1);
              break;
            default:
              return;
          }
        }
        e.preventDefault();
        focusOn(next);
      }),
    );
  });

  const rest = omit(
    props,
    'as',
    'children',
    'ref',
    'defaultExpanded',
    'expanded',
    'onExpandedChange',
    'by',
    'pageSize',
  );
  const Root = dynamic(() => props.as || 'table');
  return (
    <TreeGridContext
      value={{
        ...state,
        registerRow(element: HTMLElement, value: V): () => void {
          rowValues.set(element, { value });
          return () => {
            rowValues.delete(element);
          };
        },
      }}
    >
      <Root {...TREEGRID_TAG} role="treegrid" ref={setRef} {...rest}>
        {renderChildren(props.children, state)}
      </Root>
    </TreeGridContext>
  );
}
