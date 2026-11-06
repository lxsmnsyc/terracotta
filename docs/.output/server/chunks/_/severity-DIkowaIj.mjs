import { A as Alert } from './alert-Duso26VS.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import { For } from 'solid-js';
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
  ' class="stack">',
  "</div>"
];
var _tmpl$2 = [
  "<code",
  '>data-severity="<!--$-->',
  '<!--/-->"</code>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const level = this[_m$];
    var _v$3, _v$4;
    return [
      "This one is styled from ",
      (_v$3 = ssrHydrationKey(), _v$4 = escape(level), ssr(_tmpl$2, _v$3, _v$4)),
      "."
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.class = _p2;
  this["data-severity"] = _p3;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
function AlertSeverity() {
  const levels = [
    "info",
    "warning",
    "danger"
  ];
  var _v$ = ssrHydrationKey(), _v$2 = escape(For({
    each: levels,
    children: (level) => {
      return Alert(new _P$(level, "alert", level));
    }
  }));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/alert/severity.tsx";

export { $$moduleUrl, AlertSeverity as default };
//# sourceMappingURL=severity-DIkowaIj.mjs.map
