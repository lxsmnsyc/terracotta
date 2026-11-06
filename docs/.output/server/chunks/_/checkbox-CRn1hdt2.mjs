import { I as createPresence, J as createCheckState, K as useCheckState, b as createForwardRef, u as useEventListener, B as Button, e as createTag, f as assert, j as createDisabledState, r as createARIADisabledState, L as createCheckedState, M as createARIACheckedState, N as CheckStateProvider, O as CheckStateChild } from '../routes/_..._.mjs';
import { dynamic, mergeProps, memo } from '@solidjs/web';
import { createUniqueId, omit, createContext, createEffect, useContext } from 'solid-js';

var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return CheckStateProvider(new _P$(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this[_m$] = _p3;
  this[_m$2] = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const Root = this[_m$];
    const disabledState = this[_m$2];
    const checkedState = this[_m$3];
    const rest = this[_m$4];
    const props = this[_m$5];
    const state = this[_m$6];
    return Root(mergeProps(CHECKBOX_TAG, disabledState, checkedState, rest, new _P$2(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7, _p8, _p9, _p0, _p1) {
  this[_m$] = _p5;
  this[_m$2] = _p6;
  this[_m$3] = _p7;
  this[_m$4] = _p8;
  this[_m$5] = _p9;
  this[_m$6] = _p0;
  this.value = _p1;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return this[_m$].descriptionID;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p10) {
  this[_m$] = _p10;
  Object.defineProperty(this, "id", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p11) {
  this[_m$] = _p11;
  Object.defineProperty(this, "children", _d$5);
}
_P$5.prototype = Object.prototype;
var _d$6 = {
  get() {
    const props = this[_m$];
    return CheckStateChild(new _P$5(props));
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p12) {
  this[_m$] = _p12;
  Object.defineProperty(this, "children", _d$6);
}
_P$6.prototype = Object.prototype;
var _d$7 = {
  get() {
    const context = this[_m$];
    return memo(() => {
      return !!context.label.isPresent();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    const context = this[_m$];
    return memo(() => {
      return !!context.description.isPresent();
    })() ? context.descriptionID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p13) {
  this[_m$] = _p13;
  Object.defineProperty(this, "aria-labelledby", _d$7);
  Object.defineProperty(this, "aria-describedby", _d$8);
}
_P$7.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$].indicatorID;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p14, _p15, _p16) {
  this[_m$] = _p14;
  Object.defineProperty(this, "id", _d$9);
  this.role = _p15;
  this.ref = _p16;
}
_P$8.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p17) {
  this[_m$] = _p17;
  Object.defineProperty(this, "children", _d$10);
}
_P$9.prototype = Object.prototype;
var _d$11 = {
  get() {
    const props = this[_m$];
    return CheckStateChild(new _P$9(props));
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p18) {
  this[_m$] = _p18;
  Object.defineProperty(this, "children", _d$11);
}
_P$10.prototype = Object.prototype;
var _d$12 = {
  get() {
    return this[_m$].labelID;
  },
  enumerable: true,
  configurable: true
};
var _d$13 = {
  get() {
    return this[_m$].indicatorID;
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p19) {
  this[_m$] = _p19;
  Object.defineProperty(this, "id", _d$12);
  Object.defineProperty(this, "for", _d$13);
}
_P$11.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p20) {
  this[_m$] = _p20;
  Object.defineProperty(this, "children", _d$14);
}
_P$12.prototype = Object.prototype;
var _d$15 = {
  get() {
    const props = this[_m$];
    return CheckStateChild(new _P$12(props));
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p21) {
  this[_m$] = _p21;
  Object.defineProperty(this, "children", _d$15);
}
_P$13.prototype = Object.prototype;
var CheckboxContext = createContext(null);
function useCheckboxContext(componentName) {
  const context = useContext(CheckboxContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Checkbox>`));
  return context;
}
var CHECKBOX_TAG = createTag("checkbox");
var CHECKBOX_DESCRIPTION = createTag("checkbox-description");
var CHECKBOX_INDICATOR = createTag("checkbox-indicator");
var CHECKBOX_LABEL = createTag("checkbox-label");
function isCheckboxUncontrolled(props) {
  return "defaultChecked" in props;
}
function Checkbox(props) {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const indicatorID = createUniqueId();
  const descriptionID = createUniqueId();
  const label = createPresence();
  const description = createPresence();
  const state = createCheckState(props);
  const disabledState = createDisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  const rest = isCheckboxUncontrolled(props) ? omit(props, "as", "children", "defaultChecked", "disabled", "onChange") : omit(props, "as", "children", "checked", "disabled", "onChange");
  return CheckboxContext(new _P$3(dynamic(() => props.as || "div"), disabledState, checkedState, rest, props, state, {
    ownerID,
    labelID,
    indicatorID,
    descriptionID,
    label,
    description
  }));
}
function CheckboxDescription(props) {
  const context = useCheckboxContext("CheckboxDescription");
  const state = useCheckState();
  context.description.register();
  const rest = omit(props, "as", "children");
  const disabledState = createDisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  return dynamic(() => props.as || "p")(mergeProps(rest, CHECKBOX_DESCRIPTION, new _P$4(context), disabledState, checkedState, new _P$6(props)));
}
function CheckboxIndicator(props) {
  const context = useCheckboxContext("CheckboxIndicator");
  const state = useCheckState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      state.toggle();
    });
  });
  const rest = omit(props, "children", "ref");
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  const ariaCheckedState = createARIACheckedState(() => state.checked());
  return Button(mergeProps(new _P$7(context), rest, CHECKBOX_INDICATOR, new _P$8(context, "checkbox", setInternalRef), disabledState, ariaDisabledState, checkedState, ariaCheckedState, new _P$10(props)));
}
function CheckboxLabel(props) {
  const context = useCheckboxContext("CheckboxLabel");
  const state = useCheckState();
  context.label.register();
  const rest = omit(props, "as", "children");
  const disabledState = createDisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  return dynamic(() => props.as || "label")(mergeProps(rest, CHECKBOX_LABEL, new _P$11(context), disabledState, checkedState, new _P$13(props)));
}

export { Checkbox as C, CheckboxIndicator as a, CheckboxLabel as b, CheckboxDescription as c };
//# sourceMappingURL=checkbox-CRn1hdt2.mjs.map
