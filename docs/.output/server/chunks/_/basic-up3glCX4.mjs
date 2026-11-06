import { H as CheckIcon } from '../routes/_..._.mjs';
import { S as Select, a as SelectOption } from './select-r0N1KBwC.mjs';
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
  '<!--/--><p class="hint">Assigned to <!--$-->',
  "<!--/-->.</p></div>"
];
var _tmpl$2 = [
  "<span",
  ' class="select-tick" aria-hidden="true">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const person = this[_m$];
    var _v$4, _v$5;
    return [memo(() => {
      return person.name;
    }), (_v$4 = ssrHydrationKey(), _v$5 = escape(CheckIcon({})), ssr(_tmpl$2, _v$4, _v$5))];
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
    const selected = this[_m$];
    return selected();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return For({
      each: PEOPLE,
      children: (person) => {
        return SelectOption(new _P$(person, "select-option", person));
      }
    });
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p4, _p5, _p6, _p7) {
  this[_m$] = _p4;
  this.class = _p5;
  Object.defineProperty(this, "value", _d$2);
  this.onChange = _p6;
  this.by = _p7;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
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
function BasicSelect() {
  const [selected, setSelected] = createSignal(PEOPLE[0]);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Select(new _P$2(selected, "select", setSelected, (a, b) => a.id === b.id))), _v$3 = scope(() => {
    var _a, _b;
    return escape((_b = (_a = selected()) == null ? void 0 : _a.name) != null ? _b : "nobody");
  });
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/select/basic.tsx";

export { $$moduleUrl, BasicSelect as default };
//# sourceMappingURL=basic-up3glCX4.mjs.map
