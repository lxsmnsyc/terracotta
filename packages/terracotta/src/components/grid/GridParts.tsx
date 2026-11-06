import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const GRID_HEAD_TAG = createTag('grid-head');
const GRID_BODY_TAG = createTag('grid-body');
const GRID_FOOT_TAG = createTag('grid-foot');
const GRID_ROW_TAG = createTag('grid-row');
const GRID_CELL_TAG = createTag('grid-cell');
const GRID_COLUMN_HEADER_TAG = createTag('grid-column-header');
const GRID_ROW_HEADER_TAG = createTag('grid-row-header');

export type GridHeadProps<T extends ValidComponent = 'thead'> = HeadlessProps<T>;

/**
 * The group of header rows of a `Grid`, with `role="rowgroup"`.
 *
 * Renders a `<thead>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridHead<T extends ValidComponent = 'thead'>(props: GridHeadProps<T>): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'thead');
  return <Root {...GRID_HEAD_TAG} role="rowgroup" {...rest} />;
}

export type GridBodyProps<T extends ValidComponent = 'tbody'> = HeadlessProps<T>;

/**
 * The group of body rows of a `Grid`, with `role="rowgroup"`.
 *
 * Renders a `<tbody>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridBody<T extends ValidComponent = 'tbody'>(props: GridBodyProps<T>): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'tbody');
  return <Root {...GRID_BODY_TAG} role="rowgroup" {...rest} />;
}

export type GridFootProps<T extends ValidComponent = 'tfoot'> = HeadlessProps<T>;

/**
 * The group of footer rows of a `Grid`, such as totals, with
 * `role="rowgroup"`.
 *
 * Renders a `<tfoot>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridFoot<T extends ValidComponent = 'tfoot'>(props: GridFootProps<T>): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'tfoot');
  return <Root {...GRID_FOOT_TAG} role="rowgroup" {...rest} />;
}

export type GridRowProps<T extends ValidComponent = 'tr'> = HeadlessProps<T>;

/**
 * A row of a `Grid`, with `role="row"`.
 *
 * Renders a `<tr>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridRow<T extends ValidComponent = 'tr'>(props: GridRowProps<T>): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'tr');
  return <Root {...GRID_ROW_TAG} role="row" {...rest} />;
}

export type GridCellProps<T extends ValidComponent = 'td'> = HeadlessProps<T>;

/**
 * A cell of a `Grid`, with `role="gridcell"`. Give it text, or one widget that
 * does not need the arrow keys, such as a link, a button or a checkbox.
 *
 * Renders a `<td>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridCell<T extends ValidComponent = 'td'>(props: GridCellProps<T>): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'td');
  return <Root {...GRID_CELL_TAG} role="gridcell" {...rest} />;
}

export type GridColumnHeaderProps<T extends ValidComponent = 'th'> = HeadlessProps<T>;

/**
 * A header cell for a column, with `role="columnheader"`. Pass `aria-sort` on
 * the header of a sorted column.
 *
 * Renders a `<th>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridColumnHeader<T extends ValidComponent = 'th'>(
  props: GridColumnHeaderProps<T>,
): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'th');
  return <Root {...GRID_COLUMN_HEADER_TAG} role="columnheader" {...rest} />;
}

export type GridRowHeaderProps<T extends ValidComponent = 'th'> = HeadlessProps<T>;

/**
 * A header cell for a row, with `role="rowheader"`.
 *
 * Renders a `<th>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/grid.md}
 */
export function GridRowHeader<T extends ValidComponent = 'th'>(
  props: GridRowHeaderProps<T>,
): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'th');
  return <Root {...GRID_ROW_HEADER_TAG} role="rowheader" {...rest} />;
}
