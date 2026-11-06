import { P as Popover, a as PopoverButton, b as PopoverPanel } from './popover-CzzCb_Q9.mjs';
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
import './menu-popup-C0F4Fm9V-DMMCHJS2.mjs';

var _tmpl$ = [
  "<div",
  ' class="stack stage-tall">',
  "</div>"
];
var _tmpl$2 = ["<div", ' class="stack"><label><input type="checkbox"> In stock only</label><label><input type="checkbox"> Free delivery</label><button type="button" class="button">Apply</button></div>'];
var _d$ = {
  get() {
    return [PopoverButton({
      class: "button",
      children: "Filters"
    }), PopoverPanel({
      class: "popover-panel",
      children: ({ close }) => {
        var _v$3;
        return _v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3);
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this.defaultOpen = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
function PopoverCloseFromInside() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Popover(new _P$("popover", false)));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/popover/close-from-inside.tsx";

export { $$moduleUrl, PopoverCloseFromInside as default };
//# sourceMappingURL=close-from-inside-C_nMBXim.mjs.map
