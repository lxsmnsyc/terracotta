import { D as Dialog, a as DialogOverlay, b as DialogPanel, c as DialogTitle } from './dialog-CMTXcP46.mjs';
import { ssrHydrationKey, escape, ssr } from '@solidjs/web';
import { createSignal } from 'solid-js';
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

var _tmpl$ = ["<p", ' class="hint">Anything can live in here; it is an ordinary element.</p>'];
var _tmpl$2 = ["<button", ' type="button" class="button">Done</button>'];
var _tmpl$3 = [
  "<div",
  ' class="stack stage-tall"><button type="button" class="button">Open the drawer</button><!--$-->',
  "<!--/--></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    var _v$2, _v$3;
    return [
      DialogTitle({
        class: "dialog-title",
        children: "Filters"
      }),
      (_v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2)),
      (_v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3))
    ];
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
    const open = this[_m$];
    return open();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return [DialogOverlay({ class: "dialog-overlay" }), DialogPanel(new _P$("drawer-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3, _p4) {
  this[_m$] = _p2;
  this.class = _p3;
  Object.defineProperty(this, "isOpen", _d$2);
  this.onChange = _p4;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
function DrawerDialog() {
  const [open, setOpen] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$4 = escape(Dialog(new _P$2(open, "dialog", setOpen)));
  return ssr(_tmpl$3, _v$, _v$4);
}
var $$moduleUrl = "src/demos/dialog/drawer.tsx";

export { $$moduleUrl, DrawerDialog as default };
//# sourceMappingURL=drawer-DAurDJJo.mjs.map
