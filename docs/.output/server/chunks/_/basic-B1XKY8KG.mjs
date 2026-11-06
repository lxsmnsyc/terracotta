import { e as createTag } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { omit } from 'solid-js';
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
var _d$$1 = {
  get() {
    const label = this[_m$];
    return label();
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p) {
  this[_m$] = _p;
  Object.defineProperty(this, "aria-label", _d$$1);
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    return this[_m$].current ? "page" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$3$1 = {
  get() {
    return this[_m$].current ? "" : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p2) {
  this[_m$] = _p2;
  Object.defineProperty(this, "aria-current", _d$2$1);
  Object.defineProperty(this, "tc-current", _d$3$1);
}
_P$2$1.prototype = Object.prototype;
var BREADCRUMB_TAG = createTag("breadcrumb");
var BREADCRUMB_LIST_TAG = createTag("breadcrumb-list");
var BREADCRUMB_ITEM_TAG = createTag("breadcrumb-item");
var BREADCRUMB_LINK_TAG = createTag("breadcrumb-link");
function Breadcrumb(props) {
  const naming = props;
  const label = () => {
    var _a;
    return naming["aria-labelledby"] ? naming["aria-label"] : (_a = naming["aria-label"]) != null ? _a : "Breadcrumb";
  };
  const rest = omit(props, "as");
  return dynamic(() => props.as || "nav")(mergeProps(BREADCRUMB_TAG, rest, new _P$$1(label)));
}
function BreadcrumbList(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "ol")(mergeProps(BREADCRUMB_LIST_TAG, rest));
}
function BreadcrumbItem(props) {
  const rest = omit(props, "as");
  return dynamic(() => props.as || "li")(mergeProps(BREADCRUMB_ITEM_TAG, rest));
}
function BreadcrumbLink(props) {
  const rest = omit(props, "as", "current");
  return dynamic(() => props.as || "a")(mergeProps(BREADCRUMB_LINK_TAG, new _P$2$1(props), rest));
}
var _d$ = {
  get() {
    return BreadcrumbLink({
      class: "breadcrumb-link",
      href: "#home",
      children: "Home"
    });
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
    return BreadcrumbLink({
      class: "breadcrumb-link",
      href: "#components",
      children: "Components"
    });
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2) {
  this.class = _p2;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return BreadcrumbLink({
      class: "breadcrumb-link",
      href: "#breadcrumb",
      current: true,
      children: "Breadcrumb"
    });
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p3) {
  this.class = _p3;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return [
      BreadcrumbItem(new _P$("breadcrumb-item")),
      BreadcrumbItem(new _P$2("breadcrumb-item")),
      BreadcrumbItem(new _P$3("breadcrumb-item"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p4) {
  this.class = _p4;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    return BreadcrumbList(new _P$4("breadcrumb-list"));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p5) {
  this.class = _p5;
  Object.defineProperty(this, "children", _d$5);
}
_P$5.prototype = Object.prototype;
function BasicBreadcrumb() {
  return Breadcrumb(new _P$5("breadcrumb"));
}
var $$moduleUrl = "src/demos/breadcrumb/basic.tsx";

export { $$moduleUrl, BasicBreadcrumb as default };
//# sourceMappingURL=basic-B1XKY8KG.mjs.map
