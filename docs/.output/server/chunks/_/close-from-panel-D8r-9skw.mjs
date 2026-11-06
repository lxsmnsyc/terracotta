import { an as Disclosure, ao as DisclosureButton, ap as DisclosurePanel, C as ChevronRightIcon } from '../routes/_..._.mjs';
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

var _tmpl$ = [
  "<span",
  ' class="disclosure-chevron" aria-hidden="true">',
  "</span>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack">',
  "</div>"
];
var _tmpl$3 = ["<div", ' class="stack"><label><input type="checkbox"> In stock only</label><label><input type="checkbox"> Free delivery</label><button type="button" class="button">Apply</button></div>'];
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["Filters", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$2, _v$3))];
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
    return [DisclosureButton(new _P$("disclosure-button")), DisclosurePanel({
      class: "disclosure-panel",
      children: ({ close }) => {
        var _v$5;
        return _v$5 = ssrHydrationKey(), ssr(_tmpl$3, _v$5);
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3) {
  this.class = _p2;
  this.defaultOpen = _p3;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
function CloseFromPanel() {
  var _v$ = ssrHydrationKey(), _v$4 = escape(Disclosure(new _P$2("disclosure", false)));
  return ssr(_tmpl$2, _v$, _v$4);
}
var $$moduleUrl = "src/demos/disclosure/close-from-panel.tsx";

export { $$moduleUrl, CloseFromPanel as default };
//# sourceMappingURL=close-from-panel-D8r-9skw.mjs.map
