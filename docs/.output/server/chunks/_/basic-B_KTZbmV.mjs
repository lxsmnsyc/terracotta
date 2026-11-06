import { e as createTag, f as assert, aB as CloseIcon } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps, scope } from '@solidjs/web';
import { createSignal, onSettled, createUniqueId, omit, createContext, For, useContext } from 'solid-js';
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

var _a;
var _m$$1 = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _d$$1 = {
  get() {
    const Root = this[_m$$1];
    const rest2 = this[_m$2];
    return Root(mergeProps(TOASTER_TAG, {
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "false",
      "aria-relevant": "additions text"
    }, rest2));
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2, _p3) {
  this[_m$$1] = _p;
  this[_m$2] = _p2;
  this.value = _p3;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
var TOAST_TAG = createTag("toast");
var TOASTER_TAG = createTag("toaster");
var ToastContext = createContext(null);
function useToastContext(componentName) {
  const context = useContext(ToastContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Toaster>`));
  return context;
}
function Toast(props) {
  useToastContext("Toast");
  const rest = omit(props, "as");
  return dynamic(() => props.as || "div")(mergeProps(TOAST_TAG, rest));
}
function Toaster(props) {
  const ownerID = createUniqueId();
  const rest2 = omit(props, "as");
  return ToastContext(new _P$$1(dynamic(() => props.as || "div"), rest2, { ownerID }));
}
var ToasterStore = (_a = class {
  constructor() {
    this.queue = [];
    this.listeners = /* @__PURE__ */ new Set();
    this.toastID = 0;
    this.id = _a.toasterID;
    _a.toasterID += 1;
  }
  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }
  notify() {
    const clone = [...this.queue];
    for (const listener of this.listeners.keys()) listener(clone);
  }
  create(data) {
    const id = `toast-${this.id}-${this.toastID}`;
    this.toastID += 1;
    this.queue.push({
      id,
      data
    });
    this.notify();
    return id;
  }
  remove(id) {
    this.queue = this.queue.filter((item) => item.id !== id);
    this.notify();
  }
  clear() {
    this.queue = [];
    this.notify();
  }
  getQueue() {
    return this.queue;
  }
}, _a.toasterID = 0, _a);
function useToaster(toaster) {
  const [signal, setSignal] = createSignal(toaster.getQueue());
  onSettled(() => toaster.subscribe(setSignal));
  return signal;
}
var _tmpl$ = [
  "<div",
  ' class="stack"><div class="row"><button type="button" class="button">Success</button><button type="button" class="button">Error</button><button type="button" class="button">Clear</button></div><!--$-->',
  "<!--/--></div>"
];
var _tmpl$2 = [
  "<p",
  ' class="toast-title">',
  "</p>"
];
var _tmpl$3 = [
  "<button",
  ' type="button" class="toast-dismiss" aria-label="Dismiss">',
  "</button>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].data.tone;
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    const item = this[_m$];
    var _v$3, _v$4, _v$5, _v$6;
    return [(_v$3 = ssrHydrationKey(), _v$4 = scope(() => {
      return escape(item.data.title);
    }), ssr(_tmpl$2, _v$3, _v$4)), (_v$5 = ssrHydrationKey(), _v$6 = escape(CloseIcon({})), ssr(_tmpl$3, _v$5, _v$6))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "data-tone", _d$);
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
var _d$3 = {
  get() {
    const queue = this[_m$];
    return queue();
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this[_m$] = _p3;
  Object.defineProperty(this, "each", _d$3);
  this.children = _p4;
}
_P$2.prototype = Object.prototype;
var _d$4 = {
  get() {
    const queue = this[_m$];
    return For(new _P$2(queue, (item) => {
      return Toast(new _P$(item, "toast"));
    }));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6) {
  this[_m$] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
var notices = new ToasterStore();
function BasicToast() {
  const queue = useToaster(notices);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Toaster(new _P$3(queue, "toaster")));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/toast/basic.tsx";

export { $$moduleUrl, BasicToast as default };
//# sourceMappingURL=basic-B_KTZbmV.mjs.map
