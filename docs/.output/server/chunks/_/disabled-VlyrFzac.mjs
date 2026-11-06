import { an as Disclosure, ao as DisclosureButton, ap as DisclosurePanel, C as ChevronRightIcon } from '../routes/_..._.mjs';
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
  "<span",
  ' class="disclosure-chevron" aria-hidden="true">',
  "</span>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><button type="button" class="button">',
  '</button><p class="hint">While disabled the root carries <code>tc-disabled</code>, and clicking the button does nothing.</p></div>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    var _v$2, _v$3;
    return ["Attachments", (_v$2 = ssrHydrationKey(), _v$3 = escape(ChevronRightIcon({})), ssr(_tmpl$, _v$2, _v$3))];
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
    const hasContent = this[_m$];
    return !hasContent();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return [DisclosureButton(new _P$("disclosure-button")), DisclosurePanel({
      class: "disclosure-panel",
      children: "Two files, 1.4 MB."
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3, _p4) {
  this[_m$] = _p2;
  this.class = _p3;
  this.defaultOpen = _p4;
  Object.defineProperty(this, "disabled", _d$2);
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
function DisabledDisclosure() {
  const [hasContent, setHasContent] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$4 = escape(Disclosure(new _P$2(hasContent, "disclosure", false))), _v$5 = () => {
    return hasContent() ? "Remove the attachments" : "Add attachments";
  };
  return ssr(_tmpl$2, _v$, _v$4, _v$5);
}
var $$moduleUrl = "src/demos/disclosure/disabled.tsx";

export { $$moduleUrl, DisabledDisclosure as default };
//# sourceMappingURL=disabled-VlyrFzac.mjs.map
