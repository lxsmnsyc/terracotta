import { S as Slider, a as SliderLabel, b as SliderTrack, c as SliderThumb } from './slider-CmSZV4KY.mjs';
import { ssrHydrationKey, escape, ssr, scope, ssrStyleProperty } from '@solidjs/web';
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
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$2 = [
  "<div",
  ' class="slider-header"><!--$-->',
  '<!--/--><span class="hint">',
  "</span></div>"
];
var _tmpl$3 = [
  "<span",
  ' class="slider-range" style="',
  '"></span>'
];
var _tmpl$4 = [
  "<div",
  ' class="slider-header"><!--$-->',
  '<!--/--><span class="hint"><!--$-->',
  "<!--/--> \xB0C</span></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return { "inset-inline-start": `${this[_m$].percent()}%` };
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "style", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const state = this[_m$];
    var _v$7, _v$8;
    return [(_v$7 = ssrHydrationKey(), _v$8 = () => {
      return ssrStyleProperty("inline-size:", `${escape(state.percent(), true)}%`);
    }, ssr(_tmpl$3, _v$7, _v$8)), SliderThumb(new _P$(state, "slider-thumb"))];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this[_m$] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return { "inset-inline-start": `${this[_m$].percent()}%` };
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6) {
  this[_m$] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "style", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    const state = this[_m$];
    var _v$12, _v$13;
    return [(_v$12 = ssrHydrationKey(), _v$13 = () => {
      return ssrStyleProperty("inline-size:", `${escape(state.percent(), true)}%`);
    }, ssr(_tmpl$3, _v$12, _v$13)), SliderThumb(new _P$3(state, "slider-thumb"))];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p7, _p8) {
  this[_m$] = _p7;
  this.class = _p8;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
function BasicSlider() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Slider({
    class: "slider",
    defaultValue: 40,
    children: (state) => {
      var _v$4, _v$5, _v$6;
      return [(_v$4 = ssrHydrationKey(), _v$5 = escape(SliderLabel({
        class: "slider-label",
        children: "Volume"
      })), _v$6 = scope(() => {
        return escape(state.value());
      }), ssr(_tmpl$2, _v$4, _v$5, _v$6)), SliderTrack(new _P$2(state, "slider-track"))];
    }
  })), _v$3 = escape(Slider({
    class: "slider",
    defaultValue: 20,
    min: 10,
    max: 30,
    step: 0.5,
    largeStep: 4,
    getValueText: (value) => `${value} degrees Celsius`,
    children: (state) => {
      var _v$9, _v$10, _v$11;
      return [(_v$9 = ssrHydrationKey(), _v$10 = escape(SliderLabel({
        class: "slider-label",
        children: "Temperature"
      })), _v$11 = scope(() => {
        return escape(state.value());
      }), ssr(_tmpl$4, _v$9, _v$10, _v$11)), SliderTrack(new _P$4(state, "slider-track"))];
    }
  }));
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/slider/basic.tsx";

export { $$moduleUrl, BasicSlider as default };
//# sourceMappingURL=basic-Bt_j7_rs.mjs.map
