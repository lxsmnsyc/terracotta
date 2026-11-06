import { an as Disclosure, ao as DisclosureButton, ap as DisclosurePanel, C as ChevronRightIcon } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
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
  ' class="disclosure-chevron" aria-hidden="true">',
  "</span>"
];
var _tmpl$2 = ["<code", ">setOpen</code>"];
var _tmpl$3 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><button type="button" class="button">Toggle from outside</button><p class="hint">State lives in the page: <!--$-->',
  "<!--/-->.</p></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["Shipping details", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$2, _v$3))];
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
    return [
      "Nothing here moves until ",
      (_v$4 = ssrHydrationKey(), ssr(_tmpl$2, _v$4)),
      " runs. The button below writes the same signal, so both stay in step."
    ];
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
    const open = this[_m$];
    return open();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    return [DisclosureButton(new _P$("disclosure-button")), DisclosurePanel(new _P$2("disclosure-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p3, _p4, _p5) {
  this[_m$] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "isOpen", _d$3);
  this.onChange = _p5;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
function ControlledDisclosure() {
  const [open, setOpen] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$5 = escape(Disclosure(new _P$3(open, "disclosure", setOpen))), _v$6 = () => {
    return open() ? "open" : "closed";
  };
  return ssr(_tmpl$3, _v$, _v$5, _v$6);
}
var $$moduleUrl = "src/demos/disclosure/controlled.tsx";

export { $$moduleUrl, ControlledDisclosure as default };
//# sourceMappingURL=controlled-C4M0tpCT.mjs.map
