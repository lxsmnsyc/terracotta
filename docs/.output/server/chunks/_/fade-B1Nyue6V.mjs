import { T as Transition } from './transition-ndn6Mawg.mjs';
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

var _tmpl$ = ["<div", ' class="transition-box">The element stays mounted until the leave transition has finished.</div>'];
var _tmpl$2 = [
  "<div",
  ' class="stack"><button type="button" class="button">',
  "</button><!--$-->",
  "<!--/--></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const show = this[_m$];
    return show();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    var _v$3;
    return _v$3 = ssrHydrationKey(), ssr(_tmpl$, _v$3);
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5, _p6, _p7) {
  this[_m$] = _p;
  Object.defineProperty(this, "show", _d$);
  this.enter = _p2;
  this.enterFrom = _p3;
  this.enterTo = _p4;
  this.leave = _p5;
  this.leaveFrom = _p6;
  this.leaveTo = _p7;
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
function FadeTransition() {
  const [show, setShow] = createSignal(true);
  var _v$ = ssrHydrationKey(), _v$2 = () => {
    return show() ? "Hide" : "Show";
  }, _v$4 = escape(Transition(new _P$(show, "fade-enter", "fade-from", "fade-to", "fade-leave", "fade-to", "fade-from")));
  return ssr(_tmpl$2, _v$, _v$2, _v$4);
}
var $$moduleUrl = "src/demos/transition/fade.tsx";

export { $$moduleUrl, FadeTransition as default };
//# sourceMappingURL=fade-B1Nyue6V.mjs.map
