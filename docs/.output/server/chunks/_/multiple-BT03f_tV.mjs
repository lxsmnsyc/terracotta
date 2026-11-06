import { C as ChevronRightIcon } from '../routes/_..._.mjs';
import { A as Accordion, a as AccordionItem, b as AccordionHeader, c as AccordionPanel, d as AccordionButton } from './accordion-DOgbjwG-.mjs';
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

var _tmpl$ = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">Open: <!--$-->',
  "<!--/--></p></div>"
];
var _tmpl$2 = [
  "<span",
  ' class="accordion-marker" aria-hidden="true">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const section = this[_m$];
    var _v$4, _v$5;
    return [memo(() => {
      return section.title;
    }), (_v$4 = ssrHydrationKey(), _v$5 = escape(ChevronRightIcon({})), ssr(_tmpl$2, _v$4, _v$5))];
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
    const section = this[_m$];
    return AccordionButton(new _P$(section, "accordion-button"));
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
    return this[_m$].body;
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6) {
  this[_m$] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return this[_m$].value;
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const section = this[_m$];
    return [AccordionHeader(new _P$2(section, "accordion-header")), AccordionPanel(new _P$3(section, "accordion-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p7, _p8) {
  this[_m$] = _p7;
  this.class = _p8;
  Object.defineProperty(this, "value", _d$4);
  Object.defineProperty(this, "children", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    const open = this[_m$];
    return open();
  },
  enumerable: true,
  configurable: true
};
var _d$7 = {
  get() {
    return For({
      each: SECTIONS,
      children: (section) => {
        return AccordionItem(new _P$4(section, "accordion-item"));
      }
    });
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p9, _p0, _p1, _p10) {
  this[_m$] = _p9;
  this.class = _p0;
  this.multiple = _p1;
  Object.defineProperty(this, "value", _d$6);
  this.onChange = _p10;
  Object.defineProperty(this, "children", _d$7);
}
_P$5.prototype = Object.prototype;
var SECTIONS = [
  {
    value: "account",
    title: "Account",
    body: "Name, email address and password."
  },
  {
    value: "billing",
    title: "Billing",
    body: "Payment method and invoices."
  },
  {
    value: "team",
    title: "Team",
    body: "Members, roles and invitations."
  }
];
function MultipleAccordion() {
  const [open, setOpen] = createSignal(["account", "team"]);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Accordion(new _P$5(open, "accordion", true, setOpen))), _v$3 = scope(() => {
    return escape(open().join(", ") || "nothing");
  });
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/accordion/multiple.tsx";

export { $$moduleUrl, MultipleAccordion as default };
//# sourceMappingURL=multiple-BT03f_tV.mjs.map
