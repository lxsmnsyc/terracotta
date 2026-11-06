import { an as Disclosure, ao as DisclosureButton, ap as DisclosurePanel, C as ChevronRightIcon } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, memo } from '@solidjs/web';
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
  "<div",
  ' class="stack">',
  "</div>"
];
var _tmpl$2 = [
  "<span",
  ' class="disclosure-chevron" aria-hidden="true">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const isOpen = this[_m$];
    var _v$3, _v$4;
    return [
      memo(() => {
        return isOpen() ? "Hide" : "Show";
      }),
      " the release notes",
      (_v$3 = ssrHydrationKey(), _v$4 = escape(ChevronRightIcon({})), ssr(_tmpl$2, _v$3, _v$4))
    ];
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
function RenderPropDisclosure() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Disclosure({
    class: "disclosure",
    defaultOpen: false,
    children: ({ isOpen }) => {
      return [DisclosureButton(new _P$(isOpen, "disclosure-button")), DisclosurePanel({
        class: "disclosure-panel",
        children: "The label is derived from the state, not tracked separately. No extra signal, no handler, no chance of the two drifting apart."
      })];
    }
  }));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/disclosure/render-prop.tsx";

export { $$moduleUrl, RenderPropDisclosure as default };
//# sourceMappingURL=render-prop-BAdXcFMr.mjs.map
