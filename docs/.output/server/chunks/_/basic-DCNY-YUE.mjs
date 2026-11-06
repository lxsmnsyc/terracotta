import { b as createForwardRef, al as getFocusableElements, m as mergeFunc, u as useEventListener, e as createTag } from '../routes/_..._.mjs';
import { G as GridHead, a as GridBody, b as GridRow, c as GridColumnHeader, d as GridRowHeader, e as GridCell } from './GridParts-DtGbmNA2-hxrXXVvG.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps, ssrGroup, ssrLinkClaim, scope } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import '@solidjs/web/storage';
import '@solidjs/web/server-functions';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

var GRID_TAG = createTag("grid");
var CELL = '[role="gridcell"], [role="columnheader"], [role="rowheader"]';
var EDITABLE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';
function Grid(props) {
  const [ref, setRef] = createForwardRef(props);
  createEffect(ref, (current) => {
    if (!(current instanceof HTMLElement)) return;
    const root = current;
    let stopCell;
    const demoted = /* @__PURE__ */ new Map();
    const cellTabIndexes = /* @__PURE__ */ new Map();
    function owns(element) {
      return element.closest('[role="grid"]') === root;
    }
    function rows() {
      return Array.from(root.querySelectorAll('[role="row"]')).filter(owns);
    }
    function cellsOf(row) {
      return Array.from(row.children).filter((child) => child instanceof HTMLElement && child.matches(CELL));
    }
    function setTabIndex(element, value) {
      if (value == null) element.removeAttribute("tabindex");
      else element.setAttribute("tabindex", value);
    }
    function restore() {
      for (const [element, value] of demoted) setTabIndex(element, value);
      demoted.clear();
    }
    function restoreCells(keep = []) {
      for (const [cell, value] of cellTabIndexes) if (!keep.includes(cell)) {
        setTabIndex(cell, value);
        cellTabIndexes.delete(cell);
      }
    }
    function targetOf(cell) {
      const inner = getFocusableElements(cell).filter((element) => element !== cell);
      return inner.length === 1 && !inner[0].matches(EDITABLE) ? inner[0] : cell;
    }
    const observer = new MutationObserver(() => {
      update();
    });
    function update() {
      restore();
      const all = rows().flatMap(cellsOf);
      if (!stopCell || !all.includes(stopCell)) stopCell = all.at(0);
      restoreCells(all);
      for (const cell of all) {
        if (!cellTabIndexes.has(cell)) cellTabIndexes.set(cell, cell.getAttribute("tabindex"));
        const target = targetOf(cell);
        const inner = getFocusableElements(cell).filter((element) => element !== cell);
        for (const element of inner) if (!(cell === stopCell && (element === target || target === cell))) {
          demoted.set(element, element.getAttribute("tabindex"));
          element.setAttribute("tabindex", "-1");
        }
        if (target === cell) cell.setAttribute("tabindex", cell === stopCell ? "0" : "-1");
        else cell.removeAttribute("tabindex");
      }
      observer.takeRecords();
    }
    function cellOf(target) {
      if (!(target instanceof Element)) return;
      const cell = target.closest(CELL);
      return cell && owns(cell) ? cell : void 0;
    }
    function focusCell(cell) {
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
      attributeFilter: [
        "disabled",
        "hidden",
        "inert"
      ]
    });
    update();
    return mergeFunc(() => {
      observer.disconnect();
      restore();
      restoreCells();
    }, useEventListener(root, "focusin", (e) => {
      const cell = cellOf(e.target);
      if (cell && cell !== stopCell) {
        stopCell = cell;
        update();
      }
    }), useEventListener(root, "keydown", (e) => {
      var _a, _b, _c, _d;
      const cell = cellOf(e.target);
      if (!cell) return;
      if (e.target instanceof Element && e.target !== cell && e.target.matches(EDITABLE)) return;
      const grid = rows().map(cellsOf);
      const r = grid.findIndex((row) => row.includes(cell));
      if (r === -1) return;
      const c = grid[r].indexOf(cell);
      const wrap = !!props.wrap;
      const at = (row, column) => {
        const list = grid.at(row);
        if (!list || row < 0) return;
        return list[Math.min(column, list.length - 1)];
      };
      let next;
      switch (e.key) {
        case "ArrowRight":
          next = grid[r].at(c + 1);
          if (!next && wrap) next = at(r + 1, 0);
          break;
        case "ArrowLeft":
          next = c > 0 ? grid[r][c - 1] : void 0;
          if (!next && wrap && r > 0) next = grid[r - 1].at(-1);
          break;
        case "ArrowDown":
          next = at(r + 1, c);
          if (!next && wrap && c + 1 < grid[r].length) next = at(0, c + 1);
          break;
        case "ArrowUp":
          next = r > 0 ? at(r - 1, c) : void 0;
          if (!next && wrap && c > 0) next = at(grid.length - 1, c - 1);
          break;
        case "PageDown":
          next = r < grid.length - 1 ? at(Math.min(grid.length - 1, r + ((_a = props.pageSize) != null ? _a : 5)), c) : void 0;
          break;
        case "PageUp":
          next = r > 0 ? at(Math.max(0, r - ((_b = props.pageSize) != null ? _b : 5)), c) : void 0;
          break;
        case "Home":
          next = e.ctrlKey ? (_c = grid.at(0)) == null ? void 0 : _c.at(0) : grid[r].at(0);
          break;
        case "End":
          next = e.ctrlKey ? (_d = grid.at(-1)) == null ? void 0 : _d.at(-1) : grid[r].at(-1);
          break;
        default:
          return;
      }
      e.preventDefault();
      focusCell(next);
    }));
  });
  const rest = omit(props, "as", "ref", "wrap", "pageSize");
  return dynamic(() => props.as || "table")(mergeProps(GRID_TAG, {
    role: "grid",
    ref: setRef
  }, rest));
}
var _tmpl$ = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">Tab in once, then use the arrow keys, <kbd>Home</kbd>, <kbd>End</kbd> and <kbd>Ctrl</kbd>+<kbd>Home</kbd>.</p></div>'
];
var _tmpl$2 = [
  "<a",
  ' class="grid-link" href="',
  '"',
  ">",
  "</a>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return [
      GridColumnHeader({
        class: "grid-header",
        "aria-sort": "ascending",
        children: "Name"
      }),
      GridColumnHeader({
        class: "grid-header",
        children: "Role"
      }),
      GridColumnHeader({
        class: "grid-header",
        children: "Email"
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$() {
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return GridRow(new _P$());
  },
  enumerable: true,
  configurable: true
};
function _P$2() {
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return this[_m$].name;
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return this[_m$].role;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p3, _p4) {
  this[_m$] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    const person = this[_m$];
    var _v$3, _g$, _lv$, _v$6;
    return _v$3 = ssrHydrationKey(), _g$ = ssrGroup(() => {
      return [escape(_lv$ = `mailto:${person.email}`, true), ssrLinkClaim({ href: _lv$ })];
    }, 2), _v$6 = scope(() => {
      return escape(person.email);
    }), ssr(_tmpl$2, _v$3, _g$, _g$, _v$6);
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p5, _p6) {
  this[_m$] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "children", _d$5);
}
_P$5.prototype = Object.prototype;
var _d$6 = {
  get() {
    const person = this[_m$];
    return [
      GridRowHeader(new _P$3(person, "grid-cell grid-row-header")),
      GridCell(new _P$4(person, "grid-cell")),
      GridCell(new _P$5(person, "grid-cell"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p7) {
  this[_m$] = _p7;
  Object.defineProperty(this, "children", _d$6);
}
_P$6.prototype = Object.prototype;
var _d$7 = {
  get() {
    return PEOPLE.map((person) => {
      return GridRow(new _P$6(person));
    });
  },
  enumerable: true,
  configurable: true
};
function _P$7() {
  Object.defineProperty(this, "children", _d$7);
}
_P$7.prototype = Object.prototype;
var _d$8 = {
  get() {
    return [GridHead(new _P$2()), GridBody(new _P$7())];
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p8, _p9) {
  this.class = _p8;
  this["aria-label"] = _p9;
  Object.defineProperty(this, "children", _d$8);
}
_P$8.prototype = Object.prototype;
var PEOPLE = [
  {
    name: "Ada Lovelace",
    role: "Engineer",
    email: "ada@example.com"
  },
  {
    name: "Grace Hopper",
    role: "Admiral",
    email: "grace@example.com"
  },
  {
    name: "Katherine Johnson",
    role: "Mathematician",
    email: "katherine@example.com"
  }
];
function BasicGrid() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Grid(new _P$8("grid", "People")));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/grid/basic.tsx";

export { $$moduleUrl, BasicGrid as default };
//# sourceMappingURL=basic-DCNY-YUE.mjs.map
