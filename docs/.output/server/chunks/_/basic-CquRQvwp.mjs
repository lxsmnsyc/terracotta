import { as as ChevronDownIcon } from '../routes/_..._.mjs';
import { L as Listbox, a as ListboxLabel, b as ListboxButton, c as ListboxOptions, d as ListboxOption } from './listbox-DKa1GaQ_.mjs';
import { ssrHydrationKey, scope, escape, ssr } from '@solidjs/web';
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
    const selected = this[_m$];
    var _v$, _v$2, _v$3, _v$4;
    return [(_v$ = ssrHydrationKey(), _v$2 = scope(() => {
      return escape(selected().name);
    }), ssr(_tmpl$, _v$, _v$2)), (_v$3 = ssrHydrationKey(), _v$4 = escape(ChevronDownIcon({})), ssr(_tmpl$2, _v$3, _v$4))];
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
    return this[_m$].name;
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
    return For({
      each: PEOPLE,
      children: (person) => ListboxOption(new _P$2(person, "listbox-option", person))
    });
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p6) {
  this.class = _p6;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    const selected = this[_m$];
    return selected();
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const selected = this[_m$];
    return [
      ListboxLabel({
        class: "listbox-label",
        children: "Assignee"
      }),
      ListboxButton(new _P$(selected, "listbox-button")),
      ListboxOptions(new _P$3("listbox-options"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p7, _p8, _p9, _p0, _p1) {
  this[_m$] = _p7;
  this.class = _p8;
  this.defaultOpen = _p9;
  Object.defineProperty(this, "value", _d$4);
  this.onSelectChange = _p0;
  this.by = _p1;
  Object.defineProperty(this, "children", _d$5);
}
_P$4.prototype = Object.prototype;
var PEOPLE = [
  {
    id: 1,
    name: "Wade Cooper"
  },
  {
    id: 2,
    name: "Arlene Mccoy"
  },
  {
    id: 3,
    name: "Devon Webb"
  },
  {
    id: 4,
    name: "Tom Cook"
  }
];
function BasicListbox() {
  const [selected, setSelected] = createSignal(PEOPLE[0]);
  return Listbox(new _P$4(selected, "listbox", false, (value) => value && setSelected(value), (a, b) => a.id === b.id));
}
var $$moduleUrl = "src/demos/listbox/basic.tsx";

export { $$moduleUrl, BasicListbox as default };
//# sourceMappingURL=basic-CquRQvwp.mjs.map
