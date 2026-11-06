import { as as ChevronDownIcon } from '../routes/_..._.mjs';
import { M as Menu, a as MenuItem } from './menu-Bxrz9siR.mjs';
import { P as Popover, a as PopoverButton, b as PopoverPanel } from './popover-CzzCb_Q9.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import 'solid-js';
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
import './menu-popup-C0F4Fm9V-DMMCHJS2.mjs';

var _tmpl$ = [
  "<span",
  ' class="popover-caret" aria-hidden="true">',
  "</span>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack stage-tall">',
  "</div>"
];
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["Actions", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronDownIcon({})), ssr(_tmpl$, _v$2, _v$3))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this["aria-haspopup"] = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return [
      MenuItem({
        class: "menu-item",
        children: "Duplicate"
      }),
      MenuItem({
        class: "menu-item",
        children: "Rename"
      }),
      MenuItem({
        class: "menu-item menu-item-danger",
        children: "Delete"
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3) {
  this.class = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return Menu(new _P$2("menu"));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p4) {
  this.class = _p4;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return [PopoverButton(new _P$("button", "menu")), PopoverPanel(new _P$3("popover-panel popover-panel-flush"))];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p5, _p6) {
  this.class = _p5;
  this.defaultOpen = _p6;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
function MenuAsDropdown() {
  var _v$ = ssrHydrationKey(), _v$4 = escape(Popover(new _P$4("popover", false)));
  return ssr(_tmpl$2, _v$, _v$4);
}
var $$moduleUrl = "src/demos/menu/as-dropdown.tsx";

export { $$moduleUrl, MenuAsDropdown as default };
//# sourceMappingURL=as-dropdown-eXQtZ4yT.mjs.map
