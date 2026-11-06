import { C as ChevronRightIcon } from '../routes/_..._.mjs';
import { A as Accordion, a as AccordionItem, b as AccordionHeader, c as AccordionPanel, d as AccordionButton } from './accordion-DOgbjwG-.mjs';
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
  ' class="accordion-marker" aria-hidden="true">',
  "</span>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">Arrow-key navigation skips the disabled header rather than stopping on it.</p></div>'
];
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["Available", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$2, _v$3))];
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
    return AccordionButton(new _P$("accordion-button"));
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
    return [AccordionHeader(new _P$2("accordion-header")), AccordionPanel({
      class: "accordion-panel",
      children: "An ordinary section."
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p3, _p4) {
  this.class = _p3;
  this.value = _p4;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    var _v$4, _v$5;
    return ["Unavailable on your plan", (_v$4 = ssrHydrationKey(), _v$5 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$4, _v$5))];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p5) {
  this.class = _p5;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    return AccordionButton(new _P$4("accordion-button"));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p6) {
  this.class = _p6;
  Object.defineProperty(this, "children", _d$5);
}
_P$5.prototype = Object.prototype;
var _d$6 = {
  get() {
    return [AccordionHeader(new _P$5("accordion-header")), AccordionPanel({
      class: "accordion-panel",
      children: "You will never see this."
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p7, _p8, _p9) {
  this.class = _p7;
  this.value = _p8;
  this.disabled = _p9;
  Object.defineProperty(this, "children", _d$6);
}
_P$6.prototype = Object.prototype;
var _d$7 = {
  get() {
    return [AccordionItem(new _P$3("accordion-item", "one")), AccordionItem(new _P$6("accordion-item", "two", true))];
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p0, _p1, _p10) {
  this.class = _p0;
  this.defaultValue = _p1;
  this.toggleable = _p10;
  Object.defineProperty(this, "children", _d$7);
}
_P$7.prototype = Object.prototype;
function DisabledAccordion() {
  var _v$ = ssrHydrationKey(), _v$6 = escape(Accordion(new _P$7("accordion", "one", true)));
  return ssr(_tmpl$2, _v$, _v$6);
}
var $$moduleUrl = "src/demos/accordion/disabled.tsx";

export { $$moduleUrl, DisabledAccordion as default };
//# sourceMappingURL=disabled-CzrAPT5E.mjs.map
