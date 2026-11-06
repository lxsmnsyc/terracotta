import { an as Disclosure, ao as DisclosureButton, ap as DisclosurePanel, C as ChevronRightIcon } from '../routes/_..._.mjs';
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

var _tmpl$ = [
  "<span",
  ' class="disclosure-chevron" aria-hidden="true">',
  "</span>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["What is a headless component?", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$2, _v$3))];
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
    return [DisclosureButton(new _P$("disclosure-button")), DisclosurePanel({
      class: "disclosure-panel",
      children: "One that ships behaviour and accessibility, but no styles. Everything you can see here comes from the theme you picked in the header."
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3) {
  this.class = _p2;
  this.defaultOpen = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    var _v$5, _v$6;
    return ["Does it manage focus?", (_v$5 = ssrHydrationKey(), _v$6 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$5, _v$6))];
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
    return [DisclosureButton(new _P$3("disclosure-button")), DisclosurePanel({
      class: "disclosure-panel",
      children: "Only as far as a disclosure should: the button is focusable, the panel is reachable with Tab while open, and nothing is trapped."
    })];
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
function BasicDisclosure() {
  var _v$ = ssrHydrationKey(), _v$4 = escape(Disclosure(new _P$2("disclosure", false))), _v$7 = escape(Disclosure(new _P$4("disclosure", false)));
  return ssr(_tmpl$2, _v$, _v$4, _v$7);
}
var $$moduleUrl = "src/demos/disclosure/basic.tsx";

export { $$moduleUrl, BasicDisclosure as default };
//# sourceMappingURL=basic-BF3PUaQR.mjs.map
