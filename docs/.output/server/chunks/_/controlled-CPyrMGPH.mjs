import { aC as Toggle } from '../routes/_..._.mjs';
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
  '<!--/--><button type="button" class="button">Toggle from outside</button><p class="hint">Nothing changes on screen until <code>setMuted</code> runs.</p></div>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const muted = this[_m$];
    return muted();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    const muted = this[_m$];
    return muted() ? "Unmute" : "Mute";
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "pressed", _d$);
  this.onChange = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
function ControlledToggle() {
  const [muted, setMuted] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Toggle(new _P$(muted, "toggle", setMuted)));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/toggle/controlled.tsx";

export { $$moduleUrl, ControlledToggle as default };
//# sourceMappingURL=controlled-CPyrMGPH.mjs.map
