import { ax as TabGroup, ay as TabList, az as TabPanel, aA as Tab } from '../routes/_..._.mjs';
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
  '<!--/--><button type="button" class="button">Next step</button></div>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return [
      Tab({
        class: "tab",
        value: "one",
        children: "Step 1"
      }),
      Tab({
        class: "tab",
        value: "two",
        children: "Step 2"
      }),
      Tab({
        class: "tab",
        value: "three",
        children: "Step 3"
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
    const tab = this[_m$];
    return tab();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return [
      TabList(new _P$("tablist")),
      TabPanel({
        class: "tabpanel",
        value: "one",
        children: "Choose a plan."
      }),
      TabPanel({
        class: "tabpanel",
        value: "two",
        children: "Enter your details."
      }),
      TabPanel({
        class: "tabpanel",
        value: "three",
        children: "Confirm and pay."
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3, _p4, _p5) {
  this[_m$] = _p2;
  this.class = _p3;
  this.horizontal = _p4;
  Object.defineProperty(this, "value", _d$2);
  this.onChange = _p5;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
function ControlledTabs() {
  const [tab, setTab] = createSignal("one");
  var _v$ = ssrHydrationKey(), _v$2 = escape(TabGroup(new _P$2(tab, "tabs", true, (value) => value && setTab(value))));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/tabs/controlled.tsx";

export { $$moduleUrl, ControlledTabs as default };
//# sourceMappingURL=controlled-BRGaIOFY.mjs.map
