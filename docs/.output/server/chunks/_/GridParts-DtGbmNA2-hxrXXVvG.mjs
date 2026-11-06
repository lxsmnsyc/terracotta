import { e as createTag } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { omit } from 'solid-js';

var GRID_HEAD_TAG = createTag("grid-head");
var GRID_BODY_TAG = createTag("grid-body");
var GRID_ROW_TAG = createTag("grid-row");
var GRID_CELL_TAG = createTag("grid-cell");
var GRID_COLUMN_HEADER_TAG = createTag("grid-column-header");
var GRID_ROW_HEADER_TAG = createTag("grid-row-header");
function GridHead(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "thead")(mergeProps(GRID_HEAD_TAG, { role: "rowgroup" }, rest));
}
function GridBody(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "tbody")(mergeProps(GRID_BODY_TAG, { role: "rowgroup" }, rest));
}
function GridRow(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "tr")(mergeProps(GRID_ROW_TAG, { role: "row" }, rest));
}
function GridCell(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "td")(mergeProps(GRID_CELL_TAG, { role: "gridcell" }, rest));
}
function GridColumnHeader(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "th")(mergeProps(GRID_COLUMN_HEADER_TAG, { role: "columnheader" }, rest));
}
function GridRowHeader(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "th")(mergeProps(GRID_ROW_HEADER_TAG, { role: "rowheader" }, rest));
}

export { GridHead as G, GridBody as a, GridRow as b, GridColumnHeader as c, GridRowHeader as d, GridCell as e };
//# sourceMappingURL=GridParts-DtGbmNA2-hxrXXVvG.mjs.map
