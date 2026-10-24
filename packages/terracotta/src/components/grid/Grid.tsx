import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import getFocusableElements from '../../utils/focus-query';
import { mergeFunc } from '../../utils/merge-func';
import { createTag } from '../../utils/namespace';
import useEventListener from '../../utils/use-event-listener';

const GRID_TAG = createTag('grid');

const CELL = '[role="gridcell"], [role="columnheader"], [role="rowheader"]';

/** Fields that need the arrow keys for their own caret or options. */
const EDITABLE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

export interface GridOptions {
  /**
   * Lets the arrow keys wrap from the end of a row to the next row, and from
   * the bottom of a column to the next column. Use it for a layout grid, not a
   * data grid.
   */
  wrap?: boolean;
  /** Rows moved by Page Up and Page Down. Defaults to 5. */
  pageSize?: number;
}

export type GridProps<T extends ValidComponent = 'table'> = HeadlessPropsWithRef<T, GridOptions>;

/**
 * A two-dimensional set of cells, following the ARIA grid pattern. It is one
 * stop in the tab sequence, and the arrow keys move between cells.
 *
 * Focus lands on a cell, or on the one widget inside a cell, such as a link or
 * a checkbox. A cell with several widgets, or with a widget that needs the
 * arrow keys, takes focus itself, and Tab moves on to the widgets inside it.
 *
 * Renders a `<table>` by default, with `role="grid"`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function Grid<T extends ValidComponent = 'table'>(props: GridProps<T>): JSX.Element {
  const [ref, setRef] = createForwardRef(props);

  createEffect(ref, (current) => {
    if (!(current instanceof HTMLElement)) {
      return undefined;
    }
    const root = current;
    // The cell holding the tab stop. It moves to the cell that last had focus.
    let stopCell: HTMLElement | undefined;
    // Widgets inside cells that were set to `tabindex="-1"`, with the value
    // they had before, so they can be put back.
    const demoted = new Map<HTMLElement, string | null>();

    function owns(element: Element): boolean {
      return element.closest('[role="grid"]') === root;
    }

    function rows(): HTMLElement[] {
      return Array.from(root.querySelectorAll<HTMLElement>('[role="row"]')).filter(owns);
    }

    function cellsOf(row: HTMLElement): HTMLElement[] {
      return Array.from(row.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.matches(CELL),
      );
    }

    function restore(): void {
      for (const [element, value] of demoted) {
        if (value == null) {
          element.removeAttribute('tabindex');
        } else {
          element.setAttribute('tabindex', value);
        }
      }
      demoted.clear();
    }

    // The element that takes focus for a cell: its one widget, or the cell.
    function targetOf(cell: HTMLElement): HTMLElement {
      const inner = getFocusableElements(cell).filter((element) => element !== cell);
      return inner.length === 1 && !inner[0].matches(EDITABLE) ? inner[0] : cell;
    }

    const observer = new MutationObserver(() => {
      update();
    });

    // Leaves one element in the tab sequence: the target of the stop cell.
    // When the stop cell takes focus itself, its widgets stay in the tab
    // sequence too, so Tab reaches them.
    function update(): void {
      restore();
      const all = rows().flatMap(cellsOf);
      if (!stopCell || !all.includes(stopCell)) {
        stopCell = all.at(0);
      }
      for (const cell of all) {
        const target = targetOf(cell);
        const inner = getFocusableElements(cell).filter((element) => element !== cell);
        for (const element of inner) {
          if (!(cell === stopCell && (element === target || target === cell))) {
            demoted.set(element, element.getAttribute('tabindex'));
            element.setAttribute('tabindex', '-1');
          }
        }
        if (target === cell) {
          cell.setAttribute('tabindex', cell === stopCell ? '0' : '-1');
        } else {
          cell.removeAttribute('tabindex');
        }
      }
      // Drop the records for the writes above.
      observer.takeRecords();
    }

    function cellOf(target: EventTarget | null): HTMLElement | undefined {
      if (!(target instanceof Element)) {
        return undefined;
      }
      const cell = target.closest<HTMLElement>(CELL);
      return cell && owns(cell) ? cell : undefined;
    }

    function focusCell(cell: HTMLElement | undefined): void {
      if (cell) {
        stopCell = cell;
        update();
        targetOf(cell).focus();
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
      },
      useEventListener(root, 'focusin', (e) => {
        const cell = cellOf(e.target);
        if (cell && cell !== stopCell) {
          stopCell = cell;
          update();
        }
      }),
      useEventListener(root, 'keydown', (e) => {
        const cell = cellOf(e.target);
        if (!cell) {
          return;
        }
        // A field inside a cell keeps its own arrow keys.
        if (e.target instanceof Element && e.target !== cell && e.target.matches(EDITABLE)) {
          return;
        }
        const grid = rows().map(cellsOf);
        const r = grid.findIndex((row) => row.includes(cell));
        if (r === -1) {
          return;
        }
        const c = grid[r].indexOf(cell);
        const wrap = !!props.wrap;
        const at = (row: number, column: number): HTMLElement | undefined => {
          const list = grid.at(row);
          if (!list || row < 0) {
            return undefined;
          }
          return list[Math.min(column, list.length - 1)];
        };
        let next: HTMLElement | undefined;
        switch (e.key) {
          case 'ArrowRight':
            next = grid[r].at(c + 1);
            if (!next && wrap) {
              next = at(r + 1, 0);
            }
            break;
          case 'ArrowLeft':
            next = c > 0 ? grid[r][c - 1] : undefined;
            if (!next && wrap && r > 0) {
              next = grid[r - 1].at(-1);
            }
            break;
          case 'ArrowDown':
            next = at(r + 1, c);
            // From the last column there is no next column to wrap to.
            if (!next && wrap && c + 1 < grid[r].length) {
              next = at(0, c + 1);
            }
            break;
          case 'ArrowUp':
            next = r > 0 ? at(r - 1, c) : undefined;
            if (!next && wrap && c > 0) {
              next = at(grid.length - 1, c - 1);
            }
            break;
          case 'PageDown':
            next =
              r < grid.length - 1
                ? at(Math.min(grid.length - 1, r + (props.pageSize ?? 5)), c)
                : undefined;
            break;
          case 'PageUp':
            next = r > 0 ? at(Math.max(0, r - (props.pageSize ?? 5)), c) : undefined;
            break;
          case 'Home':
            next = e.ctrlKey ? grid.at(0)?.at(0) : grid[r].at(0);
            break;
          case 'End':
            next = e.ctrlKey ? grid.at(-1)?.at(-1) : grid[r].at(-1);
            break;
          default:
            return;
        }
        // Keys that reach an edge leave focus where it is, and still do not
        // scroll the page.
        e.preventDefault();
        focusCell(next);
      }),
    );
  });

  const rest = omit(props, 'as', 'ref', 'wrap', 'pageSize');
  const Root = dynamic(() => props.as || 'table');
  return <Root {...GRID_TAG} role="grid" ref={setRef} {...rest} />;
}
