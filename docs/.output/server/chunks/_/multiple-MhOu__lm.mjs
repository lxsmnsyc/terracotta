import { H as CheckIcon } from '../routes/_..._.mjs';
import { S as Select, a as SelectOption } from './select-r0N1KBwC.mjs';
import { ssrHydrationKey, escape, scope, memo, ssr } from '@solidjs/web';
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
  '<!--/--><p class="hint">',
  "</p></div>"
];
var _tmpl$2 = [
  "<span",
  ' class="select-tick" aria-hidden="true">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const label = this[_m$];
    var _v$4, _v$5;
    return [label, (_v$4 = ssrHydrationKey(), _v$5 = escape(CheckIcon({})), ssr(_tmpl$2, _v$4, _v$5))];
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
    const values = this[_m$];
    return values();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return For({
      each: LABELS,
      children: (label) => {
        return SelectOption(new _P$(label, "select-option", label));
      }
    });
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p4, _p5, _p6, _p7) {
  this[_m$] = _p4;
  this.class = _p5;
  this.multiple = _p6;
  Object.defineProperty(this, "value", _d$2);
  this.onChange = _p7;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
var LABELS = [
  "Bug",
  "Documentation",
  "Enhancement",
  "Question"
];
function MultipleSelect() {
  const [values, setValues] = createSignal(["Bug"]);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Select(new _P$2(values, "select", true, setValues))), _v$3 = scope((() => {
    var _c$ = memo(() => {
      return !!values().length;
    });
    return () => {
      return _c$() ? escape(values().join(", ")) : "No labels";
    };
  })());
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/select/multiple.tsx";

export { $$moduleUrl, MultipleSelect as default };
//# sourceMappingURL=multiple-MhOu__lm.mjs.map
