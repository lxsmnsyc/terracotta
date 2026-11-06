import { ax as TabGroup, ay as TabList, az as TabPanel, aA as Tab } from '../routes/_..._.mjs';
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
      Tab({
        class: "tab",
        value: "general",
        children: "General"
      }),
      Tab({
        class: "tab",
        value: "appearance",
        children: "Appearance"
      }),
      Tab({
        class: "tab",
        value: "advanced",
        children: "Advanced"
      })
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
    return [
      TabList(new _P$("tablist tablist-vertical")),
      TabPanel({
        class: "tabpanel",
        value: "general",
        children: "Language, timezone and start page."
      }),
      TabPanel({
        class: "tabpanel",
        value: "appearance",
        children: "Theme, density and font size."
      }),
      TabPanel({
        class: "tabpanel",
        value: "advanced",
        children: "Experiments and developer options."
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3, _p4) {
  this.class = _p2;
  this.horizontal = _p3;
  this.defaultValue = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
function VerticalTabs() {
  return TabGroup(new _P$2("tabs tabs-vertical", false, "general"));
}
var $$moduleUrl = "src/demos/tabs/vertical.tsx";

export { $$moduleUrl, VerticalTabs as default };
//# sourceMappingURL=vertical-C_AZXh-b.mjs.map
