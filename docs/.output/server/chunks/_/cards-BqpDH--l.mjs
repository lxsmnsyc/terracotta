import { R as RadioGroup, T as RadioGroupLabel, V as RadioGroupOption, av as RadioGroupDescription } from '../routes/_..._.mjs';
import 'solid-js';
import '@solidjs/web';
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

var _d$ = {
  get() {
    return [RadioGroupLabel({
      class: "radio-card-title",
      children: "Standard"
    }), RadioGroupDescription({
      class: "radio-card-hint",
      children: "3\u20135 working days, free"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this.value = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return [RadioGroupLabel({
      class: "radio-card-title",
      children: "Express"
    }), RadioGroupDescription({
      class: "radio-card-hint",
      children: "Next working day, \xA36"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this.class = _p3;
  this.value = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return [RadioGroupLabel({
      class: "radio-card-title",
      children: "Overnight"
    }), RadioGroupDescription({
      class: "radio-card-hint",
      children: "Not available to your address"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7) {
  this.class = _p5;
  this.value = _p6;
  this.disabled = _p7;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return [
      RadioGroupLabel({
        class: "radiogroup-label",
        children: "Delivery speed"
      }),
      RadioGroupOption(new _P$("radio-card", "standard")),
      RadioGroupOption(new _P$2("radio-card", "express")),
      RadioGroupOption(new _P$3("radio-card", "overnight", true))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p8, _p9) {
  this.class = _p8;
  this.defaultValue = _p9;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
function RadioCards() {
  return RadioGroup(new _P$4("radiogroup", "standard"));
}
var $$moduleUrl = "src/demos/radio-group/cards.tsx";

export { $$moduleUrl, RadioCards as default };
//# sourceMappingURL=cards-BqpDH--l.mjs.map
