import { as as ChevronDownIcon } from '../routes/_..._.mjs';
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
var _tmpl$2 = ["<p", ">Nothing new since Tuesday.</p>"];
var _tmpl$3 = [
  "<div",
  ' class="stack stage-tall"><!--$-->',
  '<!--/--><p class="hint"><kbd>Escape</kbd> closes it and returns focus to the button, and so does clicking away.</p></div>'
];
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["Notifications", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronDownIcon({})), ssr(_tmpl$, _v$2, _v$3))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p) {
  this.class = _p;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    var _v$4;
    return _v$4 = ssrHydrationKey(), ssr(_tmpl$2, _v$4);
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2) {
  this.class = _p2;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return [PopoverButton(new _P$("button")), PopoverPanel(new _P$2("popover-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p3, _p4) {
  this.class = _p3;
  this.defaultOpen = _p4;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
function BasicPopover() {
  var _v$ = ssrHydrationKey(), _v$5 = escape(Popover(new _P$3("popover", false)));
  return ssr(_tmpl$3, _v$, _v$5);
}
var $$moduleUrl = "src/demos/popover/basic.tsx";

export { $$moduleUrl, BasicPopover as default };
//# sourceMappingURL=basic-BL9AWBZU.mjs.map
