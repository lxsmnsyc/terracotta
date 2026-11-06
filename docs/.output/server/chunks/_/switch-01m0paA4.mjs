import { C as Checkbox, b as CheckboxLabel, a as CheckboxIndicator } from './checkbox-CRn1hdt2.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import '../routes/_..._.mjs';
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

var _tmpl$ = ["<span", ' class="switch-knob"></span>'];
var _tmpl$2 = [
  "<div",
  ' class="stack">',
  "</div>"
];
var _d$ = {
  get() {
    var _v$2;
    return _v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2);
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
    return [CheckboxLabel({
      class: "checkbox-label",
      children: "Share anonymous usage data"
    }), CheckboxIndicator(new _P$("switch-track"))];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3) {
  this.class = _p2;
  this.defaultChecked = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
function CheckboxSwitch() {
  var _v$ = ssrHydrationKey(), _v$3 = escape(Checkbox(new _P$2("checkbox-switch", true)));
  return ssr(_tmpl$2, _v$, _v$3);
}
var $$moduleUrl = "src/demos/checkbox/switch.tsx";

export { $$moduleUrl, CheckboxSwitch as default };
//# sourceMappingURL=switch-01m0paA4.mjs.map
