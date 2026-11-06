import { A as Alert } from './alert-Duso26VS.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import { createSignal, Show } from 'solid-js';
import '../routes/_..._.mjs';
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
  '<!--/--><button type="button" class="button">Trigger a failure</button><button type="button" class="button">Clear</button><p class="hint">The alert is only rendered once there is something to say, so the live region announces on arrival rather than on every keystroke.</p></div>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const message = this[_m$];
    return message();
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
    const error = this[_m$];
    return error();
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this[_m$] = _p3;
  Object.defineProperty(this, "when", _d$2);
  this.children = _p4;
}
_P$2.prototype = Object.prototype;
function FormErrorAlert() {
  const [error, setError] = createSignal();
  var _v$ = ssrHydrationKey(), _v$2 = escape(Show(new _P$2(error, (message) => Alert(new _P$(message, "alert")))));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/alert/form-error.tsx";

export { $$moduleUrl, FormErrorAlert as default };
//# sourceMappingURL=form-error-XhuiFGxh.mjs.map
