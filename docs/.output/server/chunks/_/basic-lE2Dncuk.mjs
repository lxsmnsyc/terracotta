import { aq as Switch } from '../routes/_..._.mjs';
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

var _tmpl$ = ["<span", ' class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>'];
var _tmpl$2 = ["<span", ">Aeroplane mode</span>"];
var _tmpl$3 = ["<span", ">Locked by your administrator</span>"];
var _tmpl$4 = [
  "<div",
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _d$ = {
  get() {
    var _v$2, _v$3;
    return [(_v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2)), (_v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this.defaultChecked = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    var _v$5, _v$6;
    return [(_v$5 = ssrHydrationKey(), ssr(_tmpl$, _v$5)), (_v$6 = ssrHydrationKey(), ssr(_tmpl$3, _v$6))];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4, _p5) {
  this.class = _p3;
  this.defaultChecked = _p4;
  this.disabled = _p5;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
function BasicSwitch() {
  var _v$ = ssrHydrationKey(), _v$4 = escape(Switch(new _P$("switch", false))), _v$7 = escape(Switch(new _P$2("switch", true, true)));
  return ssr(_tmpl$4, _v$, _v$4, _v$7);
}
var $$moduleUrl = "src/demos/switch/basic.tsx";

export { $$moduleUrl, BasicSwitch as default };
//# sourceMappingURL=basic-lE2Dncuk.mjs.map
