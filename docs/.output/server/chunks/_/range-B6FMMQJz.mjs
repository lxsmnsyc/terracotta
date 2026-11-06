import { S as Slider, a as SliderLabel, b as SliderTrack, c as SliderThumb } from './slider-CmSZV4KY.mjs';
import { ssrHydrationKey, escape, ssr, scope, ssrStyleProperties } from '@solidjs/web';
import '../routes/_..._.mjs';
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
  "<div",
  ' class="stack">',
  "</div>"
];
var _tmpl$2 = [
  "<div",
  ' class="slider-header"><!--$-->',
  '<!--/--><span class="hint">$<!--$-->',
  "<!--/--> to $<!--$-->",
  "<!--/--></span></div>"
];
var _tmpl$3 = [
  "<span",
  ' class="slider-range" style="',
  '"></span>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return { "inset-inline-start": `${this[_m$].percent(0)}%` };
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4) {
  this[_m$] = _p;
  this.class = _p2;
  this.index = _p3;
  this["aria-label"] = _p4;
  Object.defineProperty(this, "style", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return { "inset-inline-start": `${this[_m$].percent(1)}%` };
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p5, _p6, _p7, _p8) {
  this[_m$] = _p5;
  this.class = _p6;
  this.index = _p7;
  this["aria-label"] = _p8;
  Object.defineProperty(this, "style", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const state = this[_m$];
    var _v$7, _v$8;
    return [
      (_v$7 = ssrHydrationKey(), _v$8 = () => {
        return ssrStyleProperties("inset-inline-start:", `${escape(state.percent(0), true)}%`, "inline-size:", `${escape(state.percent(1), true) - escape(state.percent(0), true)}%`);
      }, ssr(_tmpl$3, _v$7, _v$8)),
      SliderThumb(new _P$(state, "slider-thumb", 0, "Minimum price")),
      SliderThumb(new _P$2(state, "slider-thumb", 1, "Maximum price"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p9, _p0) {
  this[_m$] = _p9;
  this.class = _p0;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
function RangeSlider() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Slider({
    class: "slider",
    defaultValue: [200, 650],
    max: 1e3,
    step: 10,
    largeStep: 10,
    children: (state) => {
      var _v$3, _v$4, _v$5, _v$6;
      return [(_v$3 = ssrHydrationKey(), _v$4 = escape(SliderLabel({
        class: "slider-label",
        children: "Price"
      })), _v$5 = scope(() => {
        return escape(state.values()[0]);
      }), _v$6 = scope(() => {
        return escape(state.values()[1]);
      }), ssr(_tmpl$2, _v$3, _v$4, _v$5, _v$6)), SliderTrack(new _P$3(state, "slider-track"))];
    }
  }));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/slider/range.tsx";

export { $$moduleUrl, RangeSlider as default };
//# sourceMappingURL=range-B6FMMQJz.mjs.map
