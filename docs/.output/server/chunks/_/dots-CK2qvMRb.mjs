import { R as RadioGroup, T as RadioGroupLabel, V as RadioGroupOption } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, scope, ssr } from '@solidjs/web';
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
  '<!--/--><p class="hint">Chosen: <!--$-->',
  "<!--/--></p></div>"
];
var _tmpl$2 = ["<span", ' class="radio-dot" aria-hidden="true"></span>'];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const option = this[_m$];
    var _v$4;
    return [(_v$4 = ssrHydrationKey(), ssr(_tmpl$2, _v$4)), RadioGroupLabel({
      class: "radio-row-label",
      children: option
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.class = _p2;
  this.value = _p3;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const value = this[_m$];
    return value();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return [RadioGroupLabel({
      class: "radiogroup-label",
      children: "Send me a summary"
    }), For({
      each: OPTIONS,
      children: (option) => {
        return RadioGroupOption(new _P$(option, "radio-row", option));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p4, _p5, _p6) {
  this[_m$] = _p4;
  this.class = _p5;
  Object.defineProperty(this, "value", _d$2);
  this.onChange = _p6;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
var OPTIONS = [
  "Weekly",
  "Monthly",
  "Never"
];
function RadioDots() {
  const [value, setValue] = createSignal("Weekly");
  var _v$ = ssrHydrationKey(), _v$2 = escape(RadioGroup(new _P$2(value, "radiogroup", (next) => next && setValue(next)))), _v$3 = scope(() => {
    return escape(value());
  });
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/radio-group/dots.tsx";

export { $$moduleUrl, RadioDots as default };
//# sourceMappingURL=dots-CK2qvMRb.mjs.map
