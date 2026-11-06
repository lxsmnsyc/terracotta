import { aH as Tree, aI as TreeItem, aJ as TreeItemLabel, aK as TreeGroup, as as ChevronDownIcon, C as ChevronRightIcon } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, memo, ssr, scope, ssrStyleProperty } from '@solidjs/web';
import { createSignal } from 'solid-js';
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

var _tmpl$ = [
  "<span",
  ' class="tree-row" style="',
  '"><span class="tree-caret" aria-hidden="true">',
  "</span><!--$-->",
  "<!--/--></span>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">',
  "</p></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].node.name;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p) {
  this[_m$] = _p;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return this[_m$].node.children.map((child) => Item({ node: child }));
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3) {
  this[_m$] = _p2;
  this.class = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return this[_m$].node.name;
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p4, _p5, _p6) {
  this[_m$] = _p4;
  this.class = _p5;
  Object.defineProperty(this, "value", _d$3);
  this.children = _p6;
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return FILES.map((node) => Item({ node }));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p7, _p8, _p9, _p0, _p1) {
  this.class = _p7;
  this["aria-label"] = _p8;
  this.defaultValue = _p9;
  this.onChange = _p0;
  this.defaultExpanded = _p1;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var FILES = [
  {
    name: "Documents",
    children: [{ name: "CV.pdf" }, {
      name: "Letters",
      children: [{ name: "Bank.txt" }, { name: "Landlord.txt" }]
    }]
  },
  {
    name: "Music",
    children: [{ name: "Album.flac" }]
  },
  { name: "Notes.md" }
];
function caretOf(item) {
  if (!item.isParent()) return null;
  return item.isExpanded() ? ChevronDownIcon({}) : ChevronRightIcon({});
}
function Item(props) {
  return TreeItem(new _P$3(props, "tree-item", (item) => {
    var _v$, _v$2, _v$3, _v$4;
    return [(_v$ = ssrHydrationKey(), _v$2 = () => {
      return ssrStyleProperty("padding-inline-start:", `${escape(item.level(), true) - 1}rem`);
    }, _v$3 = scope(() => {
      return escape(caretOf(item));
    }), _v$4 = escape(TreeItemLabel(new _P$(props))), ssr(_tmpl$, _v$, _v$2, _v$3, _v$4)), memo(() => {
      return memo(() => {
        return !!props.node.children;
      })() ? TreeGroup(new _P$2(props, "tree-group")) : props.node.children;
    })];
  }));
}
function BasicTree() {
  const [selected, setSelected] = createSignal();
  var _v$5 = ssrHydrationKey(), _v$6 = escape(Tree(new _P$4("tree", "Files", void 0, setSelected, ["Documents"]))), _v$7 = (() => {
    var _c$ = memo(() => {
      return !!selected();
    });
    return () => {
      return _c$() ? `Selected: ${escape(selected())}` : "Arrow keys move and open folders.";
    };
  })();
  return ssr(_tmpl$2, _v$5, _v$6, _v$7);
}
var $$moduleUrl = "src/demos/tree/basic.tsx";

export { $$moduleUrl, BasicTree as default };
//# sourceMappingURL=basic-D6V5QgVF.mjs.map
