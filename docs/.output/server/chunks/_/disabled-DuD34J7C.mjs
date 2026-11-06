import { B as Button } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import { createSignal } from 'solid-js';
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
  '<!--/--><button type="button" class="button">',
  '</button><p class="hint">While disabled the element leaves the tab order and carries <code>tc-disabled</code>.</p></div>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const saving = this[_m$];
    return saving();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    const saving = this[_m$];
    return saving() ? "Saving\u2026" : "Save";
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "disabled", _d$);
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
function DisabledButton() {
  const [saving, setSaving] = createSignal(true);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Button(new _P$(saving, "button"))), _v$3 = () => {
    return saving() ? "Finish saving" : "Start saving";
  };
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/button/disabled.tsx";

export { $$moduleUrl, DisabledButton as default };
//# sourceMappingURL=disabled-DuD34J7C.mjs.map
