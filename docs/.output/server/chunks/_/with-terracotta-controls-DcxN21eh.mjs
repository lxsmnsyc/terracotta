import { aC as Toggle } from '../routes/_..._.mjs';
import { T as Toolbar } from './toolbar-C_j5AYNQ.mjs';
import 'solid-js';
import '@solidjs/web';
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

var _d$ = {
  get() {
    return [
      Toggle({
        class: "toolbar-toggle",
        defaultPressed: true,
        children: "B"
      }),
      Toggle({
        class: "toolbar-toggle",
        defaultPressed: false,
        children: "I"
      }),
      Toggle({
        class: "toolbar-toggle",
        defaultPressed: false,
        children: "U"
      })
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
function ToolbarWithControls() {
  return Toolbar(new _P$("toolbar", "Formatting"));
}
var $$moduleUrl = "src/demos/toolbar/with-terracotta-controls.tsx";

export { $$moduleUrl, ToolbarWithControls as default };
//# sourceMappingURL=with-terracotta-controls-DcxN21eh.mjs.map
