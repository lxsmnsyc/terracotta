import { a9 as CommandBar, aa as CommandBarOverlay, ab as CommandBarPanel, ac as CommandBarTitle, ad as CommandBarDescription, ae as Command, af as CommandLabel, ag as CommandInput, ah as CommandOptions, ai as CommandOption } from '../routes/_..._.mjs';
import { ssrHydrationKey, memo, escape, ssr } from '@solidjs/web';
import { createSignal, For } from 'solid-js';
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
  ' class="stack stage-tall"><p class="hint">Click inside this frame first, then press <kbd>&#8984;</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>. The shortcut is registered by the component; nothing here listens for it.</p><button type="button" class="button">&#8230;or open it with a button</button><p class="hint">',
  "</p><!--$-->",
  "<!--/--></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].label;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.class = _p2;
  this.value = _p3;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return For({
      each: ACTIONS,
      children: (action) => CommandOption(new _P$(action, "command-option", action))
    });
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p4) {
  this.class = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return [
      CommandLabel({
        class: "visually-hidden",
        children: "Commands"
      }),
      CommandInput({
        class: "command-input",
        placeholder: "Type a command\u2026"
      }),
      CommandOptions(new _P$2("command-options"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7, _p8, _p9) {
  this.class = _p5;
  this.defaultValue = _p6;
  this.by = _p7;
  this.matchBy = _p8;
  this.onChange = _p9;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    const setRan = this[_m$];
    const setOpen = this[_m$2];
    return [
      CommandBarTitle({
        class: "visually-hidden",
        children: "Command palette"
      }),
      CommandBarDescription({
        class: "visually-hidden",
        children: "Search for an action and press Enter to run it."
      }),
      Command(new _P$3("command", void 0, (a, b) => a.id === b.id, (action, query) => action.label.toLowerCase().includes(query.toLowerCase()), (action) => {
        if (action) {
          setRan(action.label);
          setOpen(false);
        }
      }))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p0, _p1, _p10) {
  this[_m$] = _p0;
  this[_m$2] = _p1;
  this.class = _p10;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    const open = this[_m$];
    return open();
  },
  enumerable: true,
  configurable: true
};
var _d$6 = {
  get() {
    const setRan = this[_m$2];
    const setOpen = this[_m$3];
    return [CommandBarOverlay({ class: "commandbar-overlay" }), CommandBarPanel(new _P$4(setRan, setOpen, "commandbar-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p11, _p12, _p13, _p14, _p15) {
  this[_m$] = _p11;
  this[_m$2] = _p12;
  this[_m$3] = _p13;
  this.class = _p14;
  Object.defineProperty(this, "isOpen", _d$5);
  this.onChange = _p15;
  Object.defineProperty(this, "children", _d$6);
}
_P$5.prototype = Object.prototype;
var ACTIONS = [
  {
    id: "new",
    label: "New document"
  },
  {
    id: "open",
    label: "Open recent\u2026"
  },
  {
    id: "share",
    label: "Share with team"
  },
  {
    id: "settings",
    label: "Open settings"
  }
];
function BasicCommandBar() {
  const [open, setOpen] = createSignal(false);
  const [ran, setRan] = createSignal();
  var _v$ = ssrHydrationKey(), _v$2 = (() => {
    var _c$ = memo(() => {
      return !!ran();
    });
    return () => {
      return _c$() ? `Ran: ${escape(ran())}` : "Nothing run yet.";
    };
  })(), _v$3 = escape(CommandBar(new _P$5(open, setRan, setOpen, "commandbar", setOpen)));
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/command-bar/basic.tsx";

export { $$moduleUrl, BasicCommandBar as default };
//# sourceMappingURL=basic-CVFbOF2F.mjs.map
