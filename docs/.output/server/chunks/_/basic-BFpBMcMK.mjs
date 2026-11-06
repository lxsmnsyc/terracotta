import { b as Menubar, a as MenuItem } from './menu-Bxrz9siR.mjs';
import { ssrHydrationKey, escape, memo, ssr } from '@solidjs/web';
import { createSignal } from 'solid-js';
import '../routes/_..._.mjs';
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
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">',
  "</p></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const setChosen = this[_m$];
    return [
      MenuItem({
        class: "menu-item",
        onClick: () => setChosen("Duplicate"),
        children: "Duplicate"
      }),
      MenuItem({
        class: "menu-item",
        onClick: () => setChosen("Rename"),
        children: "Rename"
      }),
      MenuItem({
        class: "menu-item",
        disabled: true,
        children: "Move to\u2026"
      }),
      MenuItem({
        class: "menu-item menu-item-danger",
        onClick: () => setChosen("Delete"),
        children: "Delete"
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4) {
  this[_m$] = _p;
  this.class = _p2;
  this.horizontal = _p3;
  this["aria-label"] = _p4;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
function BasicMenu() {
  const [chosen, setChosen] = createSignal();
  var _v$ = ssrHydrationKey(), _v$2 = escape(Menubar(new _P$(setChosen, "menu", false, "File actions"))), _v$3 = (() => {
    var _c$ = memo(() => {
      return !!chosen();
    });
    return () => {
      return _c$() ? `Chose: ${escape(chosen())}` : "Tab in, then arrow keys move; typing jumps to a matching item.";
    };
  })();
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/menu/basic.tsx";

export { $$moduleUrl, BasicMenu as default };
//# sourceMappingURL=basic-BFpBMcMK.mjs.map
