import { as as ChevronDownIcon } from '../routes/_..._.mjs';
import { L as Listbox, a as ListboxLabel, b as ListboxButton, c as ListboxOptions, d as ListboxOption } from './listbox-DKa1GaQ_.mjs';
import { ssrHydrationKey, scope, memo, escape, ssr } from '@solidjs/web';
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
  "<span",
  ' class="listbox-value">',
  "</span>"
];
var _tmpl$2 = [
  "<span",
  ' class="listbox-caret" aria-hidden="true">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const values = this[_m$];
    var _v$, _v$2, _v$3, _v$4;
    return [(_v$ = ssrHydrationKey(), _v$2 = scope((() => {
      var _c$ = memo(() => {
        return !!values().length;
      });
      return () => {
        return _c$() ? escape(values().join(", ")) : "Choose labels";
      };
    })()), ssr(_tmpl$, _v$, _v$2)), (_v$3 = ssrHydrationKey(), _v$4 = escape(ChevronDownIcon({})), ssr(_tmpl$2, _v$3, _v$4))];
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
    return For({
      each: LABELS,
      children: (label) => ListboxOption({
        class: "listbox-option",
        value: label,
        children: label
      })
    });
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3) {
  this.class = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const values = this[_m$];
    return values();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    const values = this[_m$];
    return [
      ListboxLabel({
        class: "listbox-label",
        children: "Labels"
      }),
      ListboxButton(new _P$(values, "listbox-button")),
      ListboxOptions(new _P$2("listbox-options"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p4, _p5, _p6, _p7, _p8) {
  this[_m$] = _p4;
  this.class = _p5;
  this.defaultOpen = _p6;
  this.multiple = _p7;
  Object.defineProperty(this, "value", _d$3);
  this.onSelectChange = _p8;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
var LABELS = [
  "Bug",
  "Documentation",
  "Enhancement",
  "Question",
  "Wontfix"
];
function MultipleListbox() {
  const [values, setValues] = createSignal(["Bug", "Question"]);
  return Listbox(new _P$3(values, "listbox", false, true, setValues));
}
var $$moduleUrl = "src/demos/listbox/multiple.tsx";

export { $$moduleUrl, MultipleListbox as default };
//# sourceMappingURL=multiple-BMaSxqRk.mjs.map
