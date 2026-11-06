import { R as RadioGroup, T as RadioGroupLabel, V as RadioGroupOption } from '../routes/_..._.mjs';
import { C as ColorSchemeProvider, u as useColorScheme, a as usePreferredColorScheme } from './color-scheme-WN86dKat.mjs';
import { ssrHydrationKey, escape, scope, ssr, memo } from '@solidjs/web';
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

var _tmpl$ = ["<span", ' class="radio-dot" aria-hidden="true"></span>'];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">The preference lives in this component: <!--$-->',
  "<!--/--></p></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const preferred = this[_m$];
    return [
      "Appearance (",
      memo(() => {
        return preferred();
      }),
      ")"
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const option = this[_m$];
    var _v$;
    return [(_v$ = ssrHydrationKey(), ssr(_tmpl$, _v$)), RadioGroupLabel({
      class: "radio-row-label",
      children: option
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4, _p5) {
  this[_m$] = _p3;
  this.class = _p4;
  this.value = _p5;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const scheme = this[_m$];
    return scheme();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    const preferred = this[_m$2];
    return [RadioGroupLabel(new _P$(preferred, "radiogroup-label")), For({
      each: OPTIONS,
      children: (option) => {
        return RadioGroupOption(new _P$2(option, "radio-row", option));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p6, _p7, _p8, _p9) {
  this[_m$] = _p6;
  this[_m$2] = _p7;
  this.class = _p8;
  Object.defineProperty(this, "value", _d$3);
  this.onChange = _p9;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
var _d$5 = {
  get() {
    const scheme = this[_m$];
    return scheme();
  },
  enumerable: true,
  configurable: true
};
var _d$6 = {
  get() {
    return Picker();
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p0, _p1) {
  this[_m$] = _p0;
  Object.defineProperty(this, "value", _d$5);
  this.onChange = _p1;
  Object.defineProperty(this, "children", _d$6);
}
_P$4.prototype = Object.prototype;
var OPTIONS = [
  "light",
  "dark",
  "system"
];
function Picker() {
  const [scheme, setScheme] = useColorScheme();
  const preferred = usePreferredColorScheme();
  return RadioGroup(new _P$3(scheme, preferred, "radiogroup", (next) => next && setScheme(next)));
}
function ColorSchemeControlled() {
  const [scheme, setScheme] = createSignal("system");
  var _v$2 = ssrHydrationKey(), _v$3 = escape(ColorSchemeProvider(new _P$4(scheme, setScheme))), _v$4 = scope(() => {
    return escape(scheme());
  });
  return ssr(_tmpl$2, _v$2, _v$3, _v$4);
}
var $$moduleUrl = "src/demos/color-scheme/controlled.tsx";

export { $$moduleUrl, ColorSchemeControlled as default };
//# sourceMappingURL=controlled-DsQVG8ag.mjs.map
