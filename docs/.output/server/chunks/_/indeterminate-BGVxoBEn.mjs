import { Q as MinusIcon, H as CheckIcon } from '../routes/_..._.mjs';
import { C as Checkbox, a as CheckboxIndicator, b as CheckboxLabel } from './checkbox-CRn1hdt2.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import { createSignal, For } from 'solid-js';
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
  '<!--/--><div class="checkbox-children">',
  "</div></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const parentState = this[_m$];
    return parentState();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    return [CheckboxIndicator({
      class: "checkbox-box",
      children: (state) => markFor(state.checked())
    }), CheckboxLabel({
      class: "checkbox-label",
      children: "All notifications"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "checked", _d$);
  this.onChange = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
var _d$3 = {
  get() {
    var _a;
    const items = this[_m$];
    const index = this[_m$2];
    return (_a = items()[index()]) != null ? _a : false;
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    const label = this[_m$3];
    return [CheckboxIndicator({
      class: "checkbox-box",
      children: (state) => markFor(state.checked())
    }), CheckboxLabel({
      class: "checkbox-label",
      children: label
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p4, _p5, _p6, _p7, _p8) {
  this[_m$] = _p4;
  this[_m$2] = _p5;
  this[_m$3] = _p6;
  this.class = _p7;
  Object.defineProperty(this, "checked", _d$3);
  this.onChange = _p8;
  Object.defineProperty(this, "children", _d$4);
}
_P$2.prototype = Object.prototype;
var LABELS = [
  "Comments",
  "Mentions",
  "Weekly digest"
];
function markFor(checked) {
  if (checked === void 0) return MinusIcon({});
  return checked ? CheckIcon({}) : null;
}
function IndeterminateCheckbox() {
  const [items, setItems] = createSignal([
    true,
    false,
    true
  ]);
  const parentState = () => {
    const all = items();
    if (all.every(Boolean)) return true;
    if (all.every((value) => !value)) return false;
  };
  var _v$ = ssrHydrationKey(), _v$2 = escape(Checkbox(new _P$(parentState, "checkbox", (next) => setItems(items().map(() => !!next))))), _v$3 = escape(For({
    each: LABELS,
    children: (label, index) => Checkbox(new _P$2(items, index, label, "checkbox", (next) => setItems((current) => current.map((value, i) => i === index() ? !!next : value))))
  }));
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/checkbox/indeterminate.tsx";

export { $$moduleUrl, IndeterminateCheckbox as default };
//# sourceMappingURL=indeterminate-BGVxoBEn.mjs.map
