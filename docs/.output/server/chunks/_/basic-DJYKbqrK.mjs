import { H as CheckIcon } from '../routes/_..._.mjs';
import { C as Checkbox, a as CheckboxIndicator, b as CheckboxLabel, c as CheckboxDescription } from './checkbox-CRn1hdt2.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import { Show } from 'solid-js';
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
  ' class="checkbox-text"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].checked();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    return CheckIcon({});
  },
  enumerable: true,
  configurable: true
};
function _P$(_p) {
  this[_m$] = _p;
  Object.defineProperty(this, "when", _d$);
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
var _d$3 = {
  get() {
    var _v$2, _v$3, _v$4;
    return [CheckboxIndicator({
      class: "checkbox-box",
      children: (state) => Show(new _P$(state))
    }), (_v$2 = ssrHydrationKey(), _v$3 = escape(CheckboxLabel({
      class: "checkbox-label",
      children: "Email notifications"
    })), _v$4 = escape(CheckboxDescription({
      class: "checkbox-description",
      children: "We will only write when something needs your attention."
    })), ssr(_tmpl$, _v$2, _v$3, _v$4))];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3) {
  this.class = _p2;
  this.defaultChecked = _p3;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
var _d$4 = {
  get() {
    return [CheckboxIndicator({ class: "checkbox-box" }), CheckboxLabel({
      class: "checkbox-label",
      children: "Unavailable on your plan"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p4, _p5, _p6) {
  this.class = _p4;
  this.defaultChecked = _p5;
  this.disabled = _p6;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
function BasicCheckbox() {
  var _v$ = ssrHydrationKey(), _v$5 = escape(Checkbox(new _P$2("checkbox", false))), _v$6 = escape(Checkbox(new _P$3("checkbox", false, true)));
  return ssr(_tmpl$2, _v$, _v$5, _v$6);
}
var $$moduleUrl = "src/demos/checkbox/basic.tsx";

export { $$moduleUrl, BasicCheckbox as default };
//# sourceMappingURL=basic-DJYKbqrK.mjs.map
