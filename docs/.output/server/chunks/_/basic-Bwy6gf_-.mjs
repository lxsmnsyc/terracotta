import { I as createPresence, f as assert, e as createTag, ar as renderChildren } from '../routes/_..._.mjs';
import { c as createPartID } from './create-part-id-C9i7Veuh-CM2qScam.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, scope, ssrStyleProperty, mergeProps, memo } from '@solidjs/web';
import { createMemo, omit, createContext, useContext } from 'solid-js';
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

var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _m$7 = /* @__PURE__ */ Symbol();
var _m$8 = /* @__PURE__ */ Symbol();
var _m$9 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const value = this[_m$];
    return value();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    const min = this[_m$2];
    return min();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    const max = this[_m$3];
    return max();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    var _a;
    const props = this[_m$4];
    const value = this[_m$];
    return (_a = props.getValueText) == null ? void 0 : _a.call(props, value());
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const label = this[_m$5];
    const labelID = this[_m$6];
    return memo(() => {
      return !!label.isPresent();
    })() ? labelID.id() : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5, _p6, _p7) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this[_m$3] = _p3;
  this[_m$4] = _p4;
  this[_m$5] = _p5;
  this[_m$6] = _p6;
  this.role = _p7;
  Object.defineProperty(this, "aria-valuenow", _d$);
  Object.defineProperty(this, "aria-valuemin", _d$2);
  Object.defineProperty(this, "aria-valuemax", _d$3);
  Object.defineProperty(this, "aria-valuetext", _d$4);
  Object.defineProperty(this, "aria-labelledby", _d$5);
}
_P$.prototype = Object.prototype;
var _d$6 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return renderChildren(props.children, state);
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p8, _p9) {
  this[_m$] = _p8;
  this[_m$2] = _p9;
  Object.defineProperty(this, "children", _d$6);
}
_P$2.prototype = Object.prototype;
var _d$7 = {
  get() {
    const Root = this[_m$];
    const value = this[_m$2];
    const min = this[_m$3];
    const max = this[_m$4];
    const props = this[_m$5];
    const label = this[_m$6];
    const labelID = this[_m$7];
    const rest = this[_m$8];
    const state = this[_m$9];
    return Root(mergeProps(METER_TAG, new _P$(value, min, max, props, label, labelID, "meter"), rest, new _P$2(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p0, _p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17) {
  this[_m$] = _p0;
  this[_m$2] = _p1;
  this[_m$3] = _p10;
  this[_m$4] = _p11;
  this[_m$5] = _p12;
  this[_m$6] = _p13;
  this[_m$7] = _p14;
  this[_m$8] = _p15;
  this[_m$9] = _p16;
  this.value = _p17;
  Object.defineProperty(this, "children", _d$7);
}
_P$3.prototype = Object.prototype;
var _d$8 = {
  get() {
    var _a;
    const props = this[_m$];
    const context = this[_m$2];
    return (_a = props.id) != null ? _a : context.labelID.id();
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p18, _p19) {
  this[_m$] = _p18;
  this[_m$2] = _p19;
  Object.defineProperty(this, "id", _d$8);
}
_P$4.prototype = Object.prototype;
var METER_TAG = createTag("meter");
var METER_LABEL_TAG = createTag("meter-label");
var MeterContext = createContext(null);
function Meter(props) {
  const labelID = createPartID();
  const label = createPresence();
  const min = () => {
    var _a;
    return (_a = props.min) != null ? _a : 0;
  };
  const max = () => {
    var _a;
    const hi = (_a = props.max) != null ? _a : 100;
    return hi > min() ? hi : min() + 1;
  };
  const value = createMemo(() => Math.min(max(), Math.max(min(), props.value)));
  const state = {
    value,
    min,
    max,
    percent: () => (value() - min()) / (max() - min()) * 100
  };
  const rest = omit(props, "as", "children", "value", "min", "max", "getValueText");
  return MeterContext(new _P$3(dynamic(() => props.as || "div"), value, min, max, props, label, labelID, rest, state, {
    labelID,
    label
  }));
}
function MeterLabel(props) {
  const context = useContext(MeterContext);
  assert(context, /* @__PURE__ */ new Error("<MeterLabel> must be used inside a <Meter>"));
  context.label.register();
  context.labelID.register(() => props.id);
  const rest = omit(props, "as");
  return dynamic(() => props.as || "span")(mergeProps(METER_LABEL_TAG, new _P$4(props, context), rest));
}
var _tmpl$ = [
  "<div",
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$2 = [
  "<div",
  ' class="meter-header"><!--$-->',
  '<!--/--><span class="hint"><!--$-->',
  "<!--/-->%</span></div>"
];
var _tmpl$3 = [
  "<span",
  ' class="meter-track"><span class="meter-fill" style="',
  '"></span></span>'
];
var _tmpl$4 = [
  "<div",
  ' class="meter-header"><!--$-->',
  '<!--/--><span class="hint"><!--$-->',
  "<!--/--> of 64 GB</span></div>"
];
function BasicMeter() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Meter({
    class: "meter",
    value: 62,
    getValueText: (value) => `${value}%, about 5 hours left`,
    children: (state) => {
      var _v$4, _v$5, _v$6, _v$7, _v$8;
      return [(_v$4 = ssrHydrationKey(), _v$5 = escape(MeterLabel({
        class: "meter-label",
        children: "Battery"
      })), _v$6 = scope(() => {
        return escape(state.value());
      }), ssr(_tmpl$2, _v$4, _v$5, _v$6)), (_v$7 = ssrHydrationKey(), _v$8 = () => {
        return ssrStyleProperty("inline-size:", `${escape(state.percent(), true)}%`);
      }, ssr(_tmpl$3, _v$7, _v$8))];
    }
  })), _v$3 = escape(Meter({
    class: "meter",
    value: 18,
    max: 64,
    getValueText: (value) => `${value} of 64 GB used`,
    children: (state) => {
      var _v$9, _v$10, _v$11, _v$12, _v$13;
      return [(_v$9 = ssrHydrationKey(), _v$10 = escape(MeterLabel({
        class: "meter-label",
        children: "Storage"
      })), _v$11 = scope(() => {
        return escape(state.value());
      }), ssr(_tmpl$4, _v$9, _v$10, _v$11)), (_v$12 = ssrHydrationKey(), _v$13 = () => {
        return ssrStyleProperty("inline-size:", `${escape(state.percent(), true)}%`);
      }, ssr(_tmpl$3, _v$12, _v$13))];
    }
  }));
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/meter/basic.tsx";

export { $$moduleUrl, BasicMeter as default };
//# sourceMappingURL=basic-Bwy6gf_-.mjs.map
