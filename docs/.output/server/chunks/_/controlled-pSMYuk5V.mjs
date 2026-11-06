import { aq as Switch } from '../routes/_..._.mjs';
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

var _tmpl$ = ["<span", ' class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>'];
var _tmpl$2 = ["<span", ">Notifications</span>"];
var _tmpl$3 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">Notifications are <!--$-->',
  "<!--/-->.</p></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const enabled = this[_m$];
    return enabled();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    var _v$2, _v$3;
    return [(_v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2)), (_v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "checked", _d$);
  this.onChange = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
function ControlledSwitch() {
  const [enabled, setEnabled] = createSignal(true);
  var _v$ = ssrHydrationKey(), _v$4 = escape(Switch(new _P$(enabled, "switch", setEnabled))), _v$5 = () => {
    return enabled() ? "on" : "off";
  };
  return ssr(_tmpl$3, _v$, _v$4, _v$5);
}
var $$moduleUrl = "src/demos/switch/controlled.tsx";

export { $$moduleUrl, ControlledSwitch as default };
//# sourceMappingURL=controlled-pSMYuk5V.mjs.map
