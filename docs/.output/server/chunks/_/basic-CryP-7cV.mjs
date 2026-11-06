import { b as createForwardRef, m as mergeFunc, u as useEventListener, al as getFocusableElements, aL as isEqual, e as createTag, ar as renderChildren, f as assert, l as createExpandedState, as as ChevronDownIcon, C as ChevronRightIcon } from '../routes/_..._.mjs';
import { G as GridHead, a as GridBody, b as GridRow, c as GridColumnHeader, e as GridCell } from './GridParts-DtGbmNA2-hxrXXVvG.mjs';
import { dynamic, mergeProps, memo, ssrHydrationKey, scope, escape, ssr } from '@solidjs/web';
import { createSignal, untrack, createMemo, createEffect, omit, createContext, useContext } from 'solid-js';
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

var _m$$1 = /* @__PURE__ */ Symbol();
var _m$2$1 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _d$$1 = {
  get() {
    const props = this[_m$$1];
    const state = this[_m$2$1];
    return renderChildren(props.children, state);
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2) {
  this[_m$$1] = _p;
  this[_m$2$1] = _p2;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    const state = this[_m$$1];
    const rowValues = this[_m$2$1];
    return {
      ...state,
      registerRow(element, value) {
        rowValues.set(element, { value });
        return () => {
          rowValues.delete(element);
        };
      }
    };
  },
  enumerable: true,
  configurable: true
};
var _d$3$1 = {
  get() {
    const Root = this[_m$3];
    const setRef = this[_m$4];
    const rest = this[_m$5];
    const props = this[_m$6];
    const state = this[_m$$1];
    return Root(mergeProps(TREEGRID_TAG, {
      role: "treegrid",
      ref: setRef
    }, rest, new _P$$1(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p3, _p4, _p5, _p6, _p7, _p8) {
  this[_m$$1] = _p3;
  this[_m$2$1] = _p4;
  this[_m$3] = _p5;
  this[_m$4] = _p6;
  this[_m$5] = _p7;
  this[_m$6] = _p8;
  Object.defineProperty(this, "value", _d$2$1);
  Object.defineProperty(this, "children", _d$3$1);
}
_P$2$1.prototype = Object.prototype;
var _d$4$1 = {
  get() {
    return this[_m$$1].level();
  },
  enumerable: true,
  configurable: true
};
var _d$5$1 = {
  get() {
    const ariaExpanded = this[_m$2$1];
    return ariaExpanded();
  },
  enumerable: true,
  configurable: true
};
var _d$6$1 = {
  get() {
    return this[_m$$1].level();
  },
  enumerable: true,
  configurable: true
};
function _P$3$1(_p9, _p0, _p1, _p10) {
  this[_m$$1] = _p9;
  this[_m$2$1] = _p0;
  this.role = _p1;
  Object.defineProperty(this, "aria-level", _d$4$1);
  Object.defineProperty(this, "aria-expanded", _d$5$1);
  Object.defineProperty(this, "tc-level", _d$6$1);
  this.ref = _p10;
}
_P$3$1.prototype = Object.prototype;
var _d$7$1 = {
  get() {
    const props = this[_m$$1];
    const row = this[_m$2$1];
    return renderChildren(props.children, row);
  },
  enumerable: true,
  configurable: true
};
function _P$4$1(_p11, _p12) {
  this[_m$$1] = _p11;
  this[_m$2$1] = _p12;
  Object.defineProperty(this, "children", _d$7$1);
}
_P$4$1.prototype = Object.prototype;
var TreeGridContext = createContext(null);
function useTreeGridContext(componentName) {
  const context = useContext(TreeGridContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <TreeGrid>`));
  return context;
}
var TREEGRID_TAG = createTag("treegrid");
var CELL = '[role="gridcell"], [role="columnheader"], [role="rowheader"]';
var TREE_ROW = "[tc-treegrid-row]";
var EDITABLE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';
function TreeGrid(props) {
  const [ref, setRef] = createForwardRef(props);
  const equals = (a, b) => {
    var _a;
    return ((_a = props.by) != null ? _a : isEqual)(a, b);
  };
  const [internal, setInternal] = createSignal(untrack(() => {
    var _a;
    return (_a = props.defaultExpanded) != null ? _a : [];
  }));
  const expanded = createMemo(() => {
    var _a;
    return (_a = props.expanded) != null ? _a : internal();
  });
  function isExpanded(value) {
    return expanded().some((item) => equals(item, value));
  }
  function setExpanded(value, open) {
    var _a;
    if (untrack(() => isExpanded(value)) === open) return;
    const current = untrack(expanded);
    const next = open ? [...current, value] : current.filter((item) => !equals(item, value));
    if (props.expanded == null) setInternal(next);
    (_a = props.onExpandedChange) == null ? void 0 : _a.call(props, next);
  }
  const state = {
    isExpanded,
    setExpanded,
    toggle(value) {
      setExpanded(value, !untrack(() => isExpanded(value)));
    }
  };
  const rowValues = /* @__PURE__ */ new Map();
  createEffect(ref, (current) => {
    if (!(current instanceof HTMLElement)) return;
    const root = current;
    let stop;
    const demoted = /* @__PURE__ */ new Map();
    const ownTabIndexes = /* @__PURE__ */ new Map();
    function owns(element) {
      return element.closest('[role="treegrid"]') === root;
    }
    function allRows() {
      return Array.from(root.querySelectorAll('[role="row"]')).filter(owns);
    }
    function treeRows() {
      return allRows().filter((row) => row.matches(TREE_ROW));
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
    function restoreOwn(keep = []) {
      for (const [element, value] of ownTabIndexes) if (!keep.includes(element)) {
        setTabIndex(element, value);
        ownTabIndexes.delete(element);
      }
    }
    function record(element) {
      if (!ownTabIndexes.has(element)) ownTabIndexes.set(element, element.getAttribute("tabindex"));
    }
    function widgetsOf(cell) {
      return getFocusableElements(cell).filter((element) => element !== cell);
    }
    function targetOf(cell) {
      const inner = widgetsOf(cell);
      return inner.length === 1 && !inner[0].matches(EDITABLE) ? inner[0] : cell;
    }
    function rowOf(element) {
      const row = element.closest('[role="row"]');
      return row && owns(row) ? row : void 0;
    }
    const observer = new MutationObserver(() => {
      update();
    });
    function update() {
      var _a;
      restore();
      const rows = treeRows();
      const cells = allRows().flatMap(cellsOf);
      if (!stop || !(rows.includes(stop) || cells.includes(stop))) stop = (_a = rows.at(0)) != null ? _a : cells.at(0);
      const activeRow = stop ? rowOf(stop) : void 0;
      restoreOwn([...rows, ...cells]);
      for (const row of rows) {
        record(row);
        row.setAttribute("tabindex", row === stop ? "0" : "-1");
      }
      for (const cell of cells) {
        record(cell);
        const target = targetOf(cell);
        const keepWidgets = rowOf(cell) === activeRow;
        for (const element of widgetsOf(cell)) if (!keepWidgets) {
          demoted.set(element, element.getAttribute("tabindex"));
          element.setAttribute("tabindex", "-1");
        }
        if (target === cell) cell.setAttribute("tabindex", cell === stop ? "0" : "-1");
        else cell.removeAttribute("tabindex");
      }
      observer.takeRecords();
    }
    function owner(target) {
      if (!(target instanceof Element)) return;
      const cell = target.closest(CELL);
      if (cell && owns(cell)) return cell;
      const row = target.closest(TREE_ROW);
      return row && owns(row) ? row : void 0;
    }
    function focusOn(element) {
      if (element) {
        stop = element;
        update();
        (element.matches(CELL) ? targetOf(element) : element).focus();
      }
    }
    function expand(row, open) {
      const value = rowValues.get(row);
      if (value !== void 0) setExpanded(value.value, open);
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
      restoreOwn();
    }, useEventListener(root, "focusin", (e) => {
      const target = owner(e.target);
      if (target && target !== stop) {
        stop = target;
        update();
      }
    }), useEventListener(root, "keydown", (e) => {
      var _a;
      const target = owner(e.target);
      if (!target) return;
      if (e.target instanceof Element && e.target !== target && e.target.matches(EDITABLE)) return;
      const pageSize = (_a = props.pageSize) != null ? _a : 5;
      let next;
      if (target.matches(TREE_ROW)) {
        const rows = treeRows();
        const r = rows.indexOf(target);
        const isParent = target.hasAttribute("aria-expanded");
        const isOpen = target.getAttribute("aria-expanded") === "true";
        switch (e.key) {
          case "ArrowRight":
            if (isParent && !isOpen) expand(target, true);
            else next = cellsOf(target).at(0);
            break;
          case "ArrowLeft":
            if (isOpen) expand(target, false);
            break;
          case "ArrowDown":
            next = rows.at(r + 1);
            break;
          case "ArrowUp":
            next = r > 0 ? rows[r - 1] : void 0;
            break;
          case "PageDown":
            next = r < rows.length - 1 ? rows[Math.min(rows.length - 1, r + pageSize)] : void 0;
            break;
          case "PageUp":
            next = r > 0 ? rows[Math.max(0, r - pageSize)] : void 0;
            break;
          case "Home":
            next = rows.at(0);
            break;
          case "End":
            next = rows.at(-1);
            break;
          case "Enter":
            if (isParent) expand(target, !isOpen);
            break;
          default:
            return;
        }
      } else {
        const grid = allRows().map(cellsOf);
        const r = grid.findIndex((row) => row.includes(target));
        if (r === -1) return;
        const c = grid[r].indexOf(target);
        const at = (row) => {
          const list = grid.at(row);
          return list && row >= 0 ? list[Math.min(c, list.length - 1)] : void 0;
        };
        switch (e.key) {
          case "ArrowRight":
            next = grid[r].at(c + 1);
            break;
          case "ArrowLeft":
            if (c > 0) next = grid[r][c - 1];
            else {
              const row = rowOf(target);
              next = (row == null ? void 0 : row.matches(TREE_ROW)) ? row : void 0;
            }
            break;
          case "ArrowDown":
            next = at(r + 1);
            break;
          case "ArrowUp":
            next = r > 0 ? at(r - 1) : void 0;
            break;
          case "PageDown":
            next = r < grid.length - 1 ? at(Math.min(grid.length - 1, r + pageSize)) : void 0;
            break;
          case "PageUp":
            next = r > 0 ? at(Math.max(0, r - pageSize)) : void 0;
            break;
          case "Home":
            next = e.ctrlKey ? at(0) : grid[r].at(0);
            break;
          case "End":
            next = e.ctrlKey ? at(grid.length - 1) : grid[r].at(-1);
            break;
          default:
            return;
        }
      }
      e.preventDefault();
      focusOn(next);
    }));
  });
  const rest = omit(props, "as", "children", "ref", "defaultExpanded", "expanded", "onExpandedChange", "by", "pageSize");
  return TreeGridContext(new _P$2$1(state, rowValues, dynamic(() => props.as || "table"), setRef, rest, props));
}
var TREEGRID_ROW_TAG = createTag("treegrid-row");
function TreeGridRow(props) {
  const context = useTreeGridContext("TreeGridRow");
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return context.registerRow(current, props.value);
  });
  const isExpandable = () => !!props.expandable;
  const isExpanded = () => isExpandable() && context.isExpanded(props.value);
  const row = {
    level: () => {
      var _a;
      return (_a = props.level) != null ? _a : 1;
    },
    isExpandable,
    isExpanded,
    toggle() {
      context.toggle(props.value);
    }
  };
  function ariaExpanded() {
    if (!isExpandable()) return;
    return isExpanded() ? "true" : "false";
  }
  const expandedState = createExpandedState(isExpanded);
  const rest = omit(props, "as", "children", "ref", "value", "level", "expandable");
  return dynamic(() => props.as || "tr")(mergeProps(TREEGRID_ROW_TAG, new _P$3$1(row, ariaExpanded, "row", setInternalRef), expandedState, rest, new _P$4$1(props, row)));
}
var _tmpl$ = [
  "<span",
  ' class="tree-caret" aria-hidden="true">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return [GridColumnHeader({
      class: "grid-header",
      children: "Subject"
    }), GridColumnHeader({
      class: "grid-header",
      children: "From"
    })];
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
    const row = this[_m$];
    const thread = this[_m$2];
    var _v$, _v$2;
    return [(_v$ = ssrHydrationKey(), _v$2 = scope(() => {
      return escape(caretOf(row));
    }), ssr(_tmpl$, _v$, _v$2)), memo(() => {
      return thread.subject;
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p, _p2, _p3) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this.class = _p3;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return this[_m$].from;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p4, _p5) {
  this[_m$] = _p4;
  this.class = _p5;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    return this[_m$].id;
  },
  enumerable: true,
  configurable: true
};
var _d$6 = {
  get() {
    return !!this[_m$].replies;
  },
  enumerable: true,
  configurable: true
};
var _d$7 = {
  get() {
    return this[_m$].subject;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p6, _p7, _p8) {
  this[_m$] = _p6;
  this.class = _p7;
  Object.defineProperty(this, "value", _d$5);
  Object.defineProperty(this, "expandable", _d$6);
  Object.defineProperty(this, "aria-label", _d$7);
  this.children = _p8;
}
_P$5.prototype = Object.prototype;
var _d$8 = {
  get() {
    return this[_m$].subject;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p9, _p0) {
  this[_m$] = _p9;
  this.class = _p0;
  Object.defineProperty(this, "children", _d$8);
}
_P$6.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$].from;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p1, _p10) {
  this[_m$] = _p1;
  this.class = _p10;
  Object.defineProperty(this, "children", _d$9);
}
_P$7.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$].id;
  },
  enumerable: true,
  configurable: true
};
var _d$11 = {
  get() {
    const reply = this[_m$];
    return `${reply.subject}, from ${reply.from}`;
  },
  enumerable: true,
  configurable: true
};
var _d$12 = {
  get() {
    const reply = this[_m$];
    return [GridCell(new _P$6(reply, "grid-cell treegrid-indent")), GridCell(new _P$7(reply, "grid-cell"))];
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p11, _p12, _p13) {
  this[_m$] = _p11;
  this.class = _p12;
  Object.defineProperty(this, "value", _d$10);
  this.level = _p13;
  Object.defineProperty(this, "aria-label", _d$11);
  Object.defineProperty(this, "children", _d$12);
}
_P$8.prototype = Object.prototype;
var _d$13 = {
  get() {
    const state = this[_m$];
    return THREADS.map((thread) => [TreeGridRow(new _P$5(thread, "treegrid-row", (row) => {
      return [GridCell(new _P$3(row, thread, "grid-cell")), GridCell(new _P$4(thread, "grid-cell"))];
    })), memo(() => {
      var _a;
      return memo(() => {
        return !!state.isExpanded(thread.id);
      })() ? (_a = thread.replies) == null ? void 0 : _a.map((reply) => TreeGridRow(new _P$8(reply, "treegrid-row", 2))) : state.isExpanded(thread.id);
    })]);
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p14) {
  this[_m$] = _p14;
  Object.defineProperty(this, "children", _d$13);
}
_P$9.prototype = Object.prototype;
var THREADS = [{
  id: "trip",
  subject: "Trip in June",
  from: "Grace",
  replies: [{
    id: "trip-1",
    subject: "Re: Trip in June",
    from: "Ada"
  }, {
    id: "trip-2",
    subject: "Re: Trip in June",
    from: "Katherine"
  }]
}, {
  id: "lunch",
  subject: "Lunch on Friday?",
  from: "Ada"
}];
function caretOf(row) {
  if (!row.isExpandable()) return null;
  return row.isExpanded() ? ChevronDownIcon({}) : ChevronRightIcon({});
}
function BasicTreeGrid() {
  return TreeGrid({
    class: "grid",
    "aria-label": "Inbox",
    defaultExpanded: ["trip"],
    children: (state) => [GridHead(new _P$2()), GridBody(new _P$9(state))]
  });
}
var $$moduleUrl = "src/demos/treegrid/basic.tsx";

export { $$moduleUrl, BasicTreeGrid as default };
//# sourceMappingURL=basic-CryP-7cV.mjs.map
