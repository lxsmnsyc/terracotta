import { ae as Command, af as CommandLabel, ag as CommandInput, ah as CommandOptions, ai as CommandOption } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, memo, ssr, scope } from '@solidjs/web';
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
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint">',
  "</p></div>"
];
var _tmpl$2 = [
  "<span",
  ">",
  "</span>"
];
var _tmpl$3 = [
  "<span",
  ' class="command-hint">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const action = this[_m$];
    var _v$4, _v$5, _v$6, _v$7;
    return [(_v$4 = ssrHydrationKey(), _v$5 = scope(() => {
      return escape(action.label);
    }), ssr(_tmpl$2, _v$4, _v$5)), (_v$6 = ssrHydrationKey(), _v$7 = scope(() => {
      return escape(action.hint);
    }), ssr(_tmpl$3, _v$6, _v$7))];
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
      children: (action) => {
        return CommandOption(new _P$(action, "command-option", action));
      }
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
var ACTIONS = [
  {
    id: "new",
    label: "New document",
    hint: "\u2318N"
  },
  {
    id: "open",
    label: "Open recent\u2026",
    hint: "\u2318O"
  },
  {
    id: "share",
    label: "Share with team",
    hint: "\u2318\u21E7S"
  },
  {
    id: "export",
    label: "Export as PDF",
    hint: ""
  },
  {
    id: "settings",
    label: "Open settings",
    hint: "\u2318,"
  }
];
function CommandPalette() {
  const [ran, setRan] = createSignal();
  var _v$ = ssrHydrationKey(), _v$2 = escape(Command(new _P$3("command", void 0, (a, b) => a.id === b.id, (action, query) => action.label.toLowerCase().includes(query.toLowerCase()), (action) => action && setRan(action.label)))), _v$3 = (() => {
    var _c$ = memo(() => {
      return !!ran();
    });
    return () => {
      return _c$() ? `Ran: ${escape(ran())}` : "Type to filter, then press Enter.";
    };
  })();
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/command/palette.tsx";

export { $$moduleUrl, CommandPalette as default };
//# sourceMappingURL=palette-M1SKOKbY.mjs.map
