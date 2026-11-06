import { b as createForwardRef, c as createMultipleSelectState, a as createSingleSelectState, am as createTypeAhead, m as mergeFunc, u as useEventListener, a3 as SELECTED_NODE, F as FocusNavigator, d as createSelectOptionState, q as createOwnerAttribute, B as Button, e as createTag, f as assert, j as createDisabledState, r as createARIADisabledState, n as createSelectedState, a6 as createARIASelectedState, k as createActiveState, S as SelectStateProvider, g as SelectOptionStateProvider, h as createHasActiveState, i as createHasSelectedState } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { createMemo, createEffect, omit, createUniqueId, createContext, useContext } from 'solid-js';

var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _m$7 = /* @__PURE__ */ Symbol();
var _m$8 = /* @__PURE__ */ Symbol();
var _m$9 = /* @__PURE__ */ Symbol();
var _m$10 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].multiple ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    return this[_m$].horizontal ? "horizontal" : "vertical";
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return this[_m$2].hasActive() ? -1 : 0;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this.id = _p3;
  this.role = _p4;
  Object.defineProperty(this, "aria-multiselectable", _d$);
  this.ref = _p5;
  Object.defineProperty(this, "aria-orientation", _d$2);
  Object.defineProperty(this, "tabindex", _d$3);
}
_P$.prototype = Object.prototype;
var _d$4 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p6, _p7) {
  this[_m$] = _p6;
  this.state = _p7;
  Object.defineProperty(this, "children", _d$4);
}
_P$2.prototype = Object.prototype;
var _d$5 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return SelectStateProvider(new _P$2(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p8, _p9) {
  this[_m$] = _p8;
  this[_m$2] = _p9;
  Object.defineProperty(this, "children", _d$5);
}
_P$3.prototype = Object.prototype;
var _d$6 = {
  get() {
    const Root = this[_m$];
    const props = this[_m$2];
    const state = this[_m$3];
    const controllerId = this[_m$4];
    const setRef = this[_m$5];
    const disabledState = this[_m$6];
    const ariaDisabledState = this[_m$7];
    const hasSelectedState = this[_m$8];
    const hasActiveState = this[_m$9];
    const rest = this[_m$10];
    return Root(mergeProps(SELECT_TAG, new _P$(props, state, controllerId, "listbox", setRef), disabledState, ariaDisabledState, hasSelectedState, hasActiveState, rest, new _P$3(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p0, _p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17, _p18) {
  this[_m$] = _p0;
  this[_m$2] = _p1;
  this[_m$3] = _p10;
  this[_m$4] = _p11;
  this[_m$5] = _p12;
  this[_m$6] = _p13;
  this[_m$7] = _p14;
  this[_m$8] = _p15;
  this[_m$9] = _p16;
  this[_m$10] = _p17;
  this.value = _p18;
  Object.defineProperty(this, "children", _d$6);
}
_P$4.prototype = Object.prototype;
var _d$7 = {
  get() {
    return this[_m$].as || "li";
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    return this[_m$2].isActive() ? 0 : -1;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p19, _p20, _p21, _p22) {
  this[_m$] = _p19;
  this[_m$2] = _p20;
  Object.defineProperty(this, "as", _d$7);
  this.role = _p21;
  Object.defineProperty(this, "tabindex", _d$8);
  this.ref = _p22;
}
_P$5.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p23, _p24) {
  this[_m$] = _p23;
  this.state = _p24;
  Object.defineProperty(this, "children", _d$9);
}
_P$6.prototype = Object.prototype;
var _d$10 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return SelectOptionStateProvider(new _P$6(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p25, _p26) {
  this[_m$] = _p25;
  this[_m$2] = _p26;
  Object.defineProperty(this, "children", _d$10);
}
_P$7.prototype = Object.prototype;
var SelectContext = createContext(null);
function useSelectContext(componentName) {
  const context = useContext(SelectContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Select>`));
  return context;
}
function createSelectOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}
var SELECT_TAG = createTag("select");
var SELECT_OPTION_TAG = createTag("select-option");
function isSelectMultiple(props) {
  return !!props.multiple;
}
function isSelectUncontrolled(props) {
  return "defaultValue" in props;
}
function Select(props) {
  return createMemo(() => {
    const controller = createSelectOptionFocusNavigator();
    const [ref, setRef] = createForwardRef(props);
    const state = isSelectMultiple(props) ? createMultipleSelectState(props) : createSingleSelectState(props);
    const pushCharacter = createTypeAhead((value) => {
      controller.setFirstMatch(value);
    });
    createEffect(ref, (current) => {
      if (current instanceof HTMLElement) {
        controller.setRef(current);
        return mergeFunc(() => {
          controller.clearRef();
        }, useEventListener(current, "keydown", (e) => {
          if (!state.disabled()) switch (e.key) {
            case "ArrowUp":
              if (!props.horizontal) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            case "ArrowLeft":
              if (props.horizontal) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            case "ArrowDown":
              if (!props.horizontal) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            case "ArrowRight":
              if (props.horizontal) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            case "Home":
              e.preventDefault();
              controller.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              controller.setLastChecked();
              break;
            case " ":
            case "Enter":
              e.preventDefault();
              break;
            default:
              if (e.key.length === 1) pushCharacter(e.key);
          }
        }), useEventListener(current, "focus", () => {
          if (state.hasSelected()) controller.setFirstChecked(SELECTED_NODE);
          else controller.setFirstChecked();
        }), useEventListener(current, "focusin", (e) => {
          if (e.target && e.target !== current) controller.setCurrent(e.target);
        }));
      }
    });
    const controllerId = controller.getId();
    const disabledState = createDisabledState(() => state.disabled());
    const ariaDisabledState = createARIADisabledState(() => state.disabled());
    const hasSelectedState = createHasSelectedState(() => state.hasSelected());
    const hasActiveState = createHasActiveState(() => state.hasActive());
    const rest = isSelectUncontrolled(props) ? omit(props, "as", "by", "children", "defaultValue", "disabled", "horizontal", "multiple", "onChange", "ref", "toggleable") : omit(props, "as", "by", "children", "value", "disabled", "horizontal", "multiple", "onChange", "ref", "toggleable");
    return SelectContext(new _P$4(dynamic(() => props.as || "ul"), props, state, controllerId, setRef, disabledState, ariaDisabledState, hasSelectedState, hasActiveState, rest, controller));
  });
}
function SelectOption(props) {
  const context = useSelectContext("SelectOption");
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "click", () => {
      state.select();
    }), useEventListener(current, "focus", () => {
      state.focus();
    }), useEventListener(current, "blur", () => {
      state.blur();
    }), useEventListener(current, "mouseenter", () => {
      if (!state.disabled()) current.focus();
    }), useEventListener(current, "mouseleave", () => {
      if (!state.disabled()) state.blur();
    }));
  });
  const ownerAttribute = createOwnerAttribute(context.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(props, "as", "children", "value", "ref");
  return Button(mergeProps(SELECT_OPTION_TAG, ownerAttribute, new _P$5(props, state, "option", setInternalRef), disabledState, ariaDisabledState, selectedState, ariaSelectedState, activeState, rest, new _P$7(props, state)));
}

export { Select as S, SelectOption as a };
//# sourceMappingURL=select-r0N1KBwC.mjs.map
