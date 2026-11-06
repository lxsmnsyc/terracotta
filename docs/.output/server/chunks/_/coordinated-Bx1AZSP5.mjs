import { T as Transition, a as TransitionChild } from './transition-ndn6Mawg.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
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

var _tmpl$ = ["<div", ' class="transition-backdrop"></div>'];
var _tmpl$2 = ["<div", ' class="transition-card">The card arrives after the backdrop.</div>'];
var _tmpl$3 = [
  "<div",
  ' class="transition-stage"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$4 = [
  "<div",
  ' class="stack"><button type="button" class="button">',
  "</button><!--$-->",
  "<!--/--></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    var _v$4;
    return _v$4 = ssrHydrationKey(), ssr(_tmpl$, _v$4);
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5, _p6) {
  this.enter = _p;
  this.enterFrom = _p2;
  this.enterTo = _p3;
  this.leave = _p4;
  this.leaveFrom = _p5;
  this.leaveTo = _p6;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    var _v$6;
    return _v$6 = ssrHydrationKey(), ssr(_tmpl$2, _v$6);
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p7, _p8, _p9, _p0, _p1, _p10) {
  this.enter = _p7;
  this.enterFrom = _p8;
  this.enterTo = _p9;
  this.leave = _p0;
  this.leaveFrom = _p1;
  this.leaveTo = _p10;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const show = this[_m$];
    return show();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    var _v$3, _v$5, _v$7;
    return _v$3 = ssrHydrationKey(), _v$5 = escape(TransitionChild(new _P$("fade-enter", "fade-from", "fade-to", "fade-leave", "fade-to", "fade-from"))), _v$7 = escape(TransitionChild(new _P$2("slide-enter", "slide-from", "slide-to", "slide-leave", "slide-to", "slide-from"))), ssr(_tmpl$3, _v$3, _v$5, _v$7);
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p11) {
  this[_m$] = _p11;
  Object.defineProperty(this, "show", _d$3);
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
function CoordinatedTransition() {
  const [show, setShow] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$2 = () => {
    return show() ? "Close" : "Open";
  }, _v$8 = escape(Transition(new _P$3(show)));
  return ssr(_tmpl$4, _v$, _v$2, _v$8);
}
var $$moduleUrl = "src/demos/transition/coordinated.tsx";

export { $$moduleUrl, CoordinatedTransition as default };
//# sourceMappingURL=coordinated-Bx1AZSP5.mjs.map
