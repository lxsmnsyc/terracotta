import { ax as TabGroup, ay as TabList, az as TabPanel, aA as Tab } from '../routes/_..._.mjs';
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
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">Automatic activation: the arrow keys move focus and change the panel together.</p></div>'
];
var _d$ = {
  get() {
    return [
      Tab({
        class: "tab",
        value: "account",
        children: "Account"
      }),
      Tab({
        class: "tab",
        value: "billing",
        children: "Billing"
      }),
      Tab({
        class: "tab",
        value: "team",
        disabled: true,
        children: "Team"
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
      TabList(new _P$("tablist")),
      TabPanel({
        class: "tabpanel",
        value: "account",
        children: "Name, email address and password."
      }),
      TabPanel({
        class: "tabpanel",
        value: "billing",
        children: "Payment method and invoices."
      }),
      TabPanel({
        class: "tabpanel",
        value: "team",
        children: "Members, roles and invitations."
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
function HorizontalTabs() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(TabGroup(new _P$2("tabs", true, "account")));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/tabs/horizontal.tsx";

export { $$moduleUrl, HorizontalTabs as default };
//# sourceMappingURL=horizontal-BBCsCXJa.mjs.map
