import { aq as Switch, R as RadioGroup, T as RadioGroupLabel, V as RadioGroupOption, H as CheckIcon } from '../routes/_..._.mjs';
import { C as Checkbox, a as CheckboxIndicator, b as CheckboxLabel } from './checkbox-CRn1hdt2.mjs';
import { S as Slider, a as SliderLabel, b as SliderTrack, c as SliderThumb } from './slider-CmSZV4KY.mjs';
import { ssrHydrationKey, escape, ssr, scope, ssrStyleProperty } from '@solidjs/web';
import { createSignal, For, Show } from 'solid-js';
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

var _tmpl$ = ["<span", ' class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>'];
var _tmpl$2 = ["<span", ">Ship prereleases</span>"];
var _tmpl$3 = [
  "<div",
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--><!--$-->",
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$4 = ["<span", ' class="radio-dot" aria-hidden="true"></span>'];
var _tmpl$5 = [
  "<div",
  ' class="slider-header"><!--$-->',
  '<!--/--><span class="hint"><!--$-->',
  "<!--/-->%</span></div>"
];
var _tmpl$6 = [
  "<span",
  ' class="slider-range" style="',
  '"></span>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    var _v$2, _v$3;
    return [(_v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2)), (_v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this.defaultChecked = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const option = this[_m$];
    var _v$8;
    return [(_v$8 = ssrHydrationKey(), ssr(_tmpl$4, _v$8)), RadioGroupLabel({
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
    const channel = this[_m$];
    return channel();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    return [RadioGroupLabel({
      class: "radiogroup-label",
      children: "Channel"
    }), For({
      each: CHANNELS,
      children: (option) => {
        return RadioGroupOption(new _P$2(option, "radio-row", option));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p6, _p7, _p8) {
  this[_m$] = _p6;
  this.class = _p7;
  Object.defineProperty(this, "value", _d$3);
  this.onChange = _p8;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
var _d$5 = {
  get() {
    return { "inset-inline-start": `${this[_m$].percent()}%` };
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p9, _p0) {
  this[_m$] = _p9;
  this.class = _p0;
  Object.defineProperty(this, "style", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    const state = this[_m$];
    var _v$12, _v$13;
    return [(_v$12 = ssrHydrationKey(), _v$13 = () => {
      return ssrStyleProperty("inline-size:", `${escape(state.percent(), true)}%`);
    }, ssr(_tmpl$6, _v$12, _v$13)), SliderThumb(new _P$4(state, "slider-thumb"))];
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p1, _p10) {
  this[_m$] = _p1;
  this.class = _p10;
  Object.defineProperty(this, "children", _d$6);
}
_P$5.prototype = Object.prototype;
var _d$7 = {
  get() {
    return this[_m$].checked();
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    return CheckIcon({});
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p11) {
  this[_m$] = _p11;
  Object.defineProperty(this, "when", _d$7);
  Object.defineProperty(this, "children", _d$8);
}
_P$6.prototype = Object.prototype;
var _d$9 = {
  get() {
    return [CheckboxIndicator({
      class: "checkbox-box",
      children: (state) => Show(new _P$6(state))
    }), CheckboxLabel({
      class: "checkbox-label",
      children: "Notify the team"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p12, _p13) {
  this.class = _p12;
  this.defaultChecked = _p13;
  Object.defineProperty(this, "children", _d$9);
}
_P$7.prototype = Object.prototype;
var CHANNELS = [
  "latest",
  "next",
  "canary"
];
function Specimen() {
  const [channel, setChannel] = createSignal("next");
  var _v$ = ssrHydrationKey(), _v$4 = escape(Switch(new _P$("switch", true))), _v$5 = escape(RadioGroup(new _P$3(channel, "radiogroup", (next) => next && setChannel(next)))), _v$6 = escape(Slider({
    class: "slider",
    defaultValue: 64,
    children: (state) => {
      var _v$9, _v$10, _v$11;
      return [(_v$9 = ssrHydrationKey(), _v$10 = escape(SliderLabel({
        class: "slider-label",
        children: "Rollout"
      })), _v$11 = scope(() => {
        return escape(state.value());
      }), ssr(_tmpl$5, _v$9, _v$10, _v$11)), SliderTrack(new _P$5(state, "slider-track"))];
    }
  })), _v$7 = escape(Checkbox(new _P$7("checkbox", true)));
  return ssr(_tmpl$3, _v$, _v$4, _v$5, _v$6, _v$7);
}
var $$moduleUrl = "src/demos/landing/specimen.tsx";

export { $$moduleUrl, Specimen as default };
//# sourceMappingURL=specimen-BeBCiogN.mjs.map
