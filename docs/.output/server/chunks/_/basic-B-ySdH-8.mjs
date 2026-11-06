import { T as Toolbar } from './toolbar-C_j5AYNQ.mjs';
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

var _tmpl$ = ["<button", ' type="button" class="toolbar-button">Bold</button>'];
var _tmpl$2 = ["<button", ' type="button" class="toolbar-button">Italic</button>'];
var _tmpl$3 = ["<button", ' type="button" class="toolbar-button" disabled>Underline</button>'];
var _tmpl$4 = ["<span", ' class="toolbar-separator" role="separator" aria-orientation="vertical"></span>'];
var _tmpl$5 = ["<button", ' type="button" class="toolbar-button">Link</button>'];
var _tmpl$6 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">Tab reaches the toolbar once; the arrow keys move within it, skipping the disabled control.</p></div>'
];
var _d$ = {
  get() {
    var _v$2, _v$3, _v$4, _v$5, _v$6;
    return [
      (_v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2)),
      (_v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3)),
      (_v$4 = ssrHydrationKey(), ssr(_tmpl$3, _v$4)),
      (_v$5 = ssrHydrationKey(), ssr(_tmpl$4, _v$5)),
      (_v$6 = ssrHydrationKey(), ssr(_tmpl$5, _v$6))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this["aria-label"] = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
function BasicToolbar() {
  var _v$ = ssrHydrationKey(), _v$7 = escape(Toolbar(new _P$("toolbar", "Text formatting")));
  return ssr(_tmpl$6, _v$, _v$7);
}
var $$moduleUrl = "src/demos/toolbar/basic.tsx";

export { $$moduleUrl, BasicToolbar as default };
//# sourceMappingURL=basic-B-ySdH-8.mjs.map
