import { c as createMultipleSelectState, a as createSingleSelectState, b as createForwardRef, m as mergeFunc, u as useEventListener, F as FocusNavigator, d as createSelectOptionState, e as createTag, f as assert, S as SelectStateProvider, g as SelectOptionStateProvider, h as createHasActiveState, i as createHasSelectedState, j as createDisabledState, k as createActiveState, l as createExpandedState, n as createSelectedState, o as useSelectOptionState, U as Unmountable, p as SelectOptionStateChild, q as createOwnerAttribute, B as Button, r as createARIADisabledState, s as createARIAExpandedState } from '../routes/_..._.mjs';
import { dynamic, mergeProps, memo } from '@solidjs/web';
import { createMemo, createEffect, omit, createUniqueId, createContext, createSignal, useContext, onSettled } from 'solid-js';

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
    return SelectStateProvider(new _P$(props, state));
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
    const rest = this[_m$2];
    const setRef = this[_m$3];
    const controllerId = this[_m$4];
    const disabledState = this[_m$5];
    const hasSelectedState = this[_m$6];
    const hasActiveState = this[_m$7];
    const props = this[_m$8];
    const state = this[_m$9];
    return Root(mergeProps(rest, ACCORDION_TAG, {
      ref: setRef,
      id: controllerId
    }, disabledState, hasSelectedState, hasActiveState, new _P$2(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7, _p8, _p9, _p0, _p1, _p10, _p11, _p12) {
  this[_m$] = _p5;
  this[_m$2] = _p6;
  this[_m$3] = _p7;
  this[_m$4] = _p8;
  this[_m$5] = _p9;
  this[_m$6] = _p0;
  this[_m$7] = _p1;
  this[_m$8] = _p10;
  this[_m$9] = _p11;
  this.value = _p12;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    return this[_m$].buttonID;
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const itemContext = this[_m$];
    return memo(() => {
      return !!itemContext.hasPanel();
    })() ? itemContext.panelID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p13, _p14) {
  this[_m$] = _p13;
  Object.defineProperty(this, "id", _d$4);
  this.ref = _p14;
  Object.defineProperty(this, "aria-controls", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    const isDisabled = this[_m$];
    const isLocked = this[_m$2];
    return isDisabled() || isLocked() ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p15, _p16) {
  this[_m$] = _p15;
  this[_m$2] = _p16;
  Object.defineProperty(this, "aria-disabled", _d$6);
}
_P$5.prototype = Object.prototype;
var _d$7 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p17) {
  this[_m$] = _p17;
  Object.defineProperty(this, "children", _d$7);
}
_P$6.prototype = Object.prototype;
var _d$8 = {
  get() {
    const props = this[_m$];
    return SelectOptionStateChild(new _P$6(props));
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p18) {
  this[_m$] = _p18;
  Object.defineProperty(this, "children", _d$8);
}
_P$7.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p19) {
  this[_m$] = _p19;
  Object.defineProperty(this, "children", _d$9);
}
_P$8.prototype = Object.prototype;
var _d$10 = {
  get() {
    const props = this[_m$];
    return SelectOptionStateChild(new _P$8(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p20) {
  this[_m$] = _p20;
  Object.defineProperty(this, "children", _d$10);
}
_P$9.prototype = Object.prototype;
var _d$11 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p21, _p22) {
  this[_m$] = _p21;
  this.state = _p22;
  Object.defineProperty(this, "children", _d$11);
}
_P$10.prototype = Object.prototype;
var _d$12 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return SelectOptionStateProvider(new _P$10(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p23, _p24) {
  this[_m$] = _p23;
  this[_m$2] = _p24;
  Object.defineProperty(this, "children", _d$12);
}
_P$11.prototype = Object.prototype;
var _d$13 = {
  get() {
    const Root = this[_m$];
    const rest = this[_m$2];
    const disabledState = this[_m$3];
    const selectedState = this[_m$4];
    const expandedState = this[_m$5];
    const activeState = this[_m$6];
    const props = this[_m$7];
    const state = this[_m$8];
    return Root(mergeProps(rest, ACCORDION_ITEM_TAG, disabledState, selectedState, expandedState, activeState, new _P$11(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32, _p33) {
  this[_m$] = _p25;
  this[_m$2] = _p26;
  this[_m$3] = _p27;
  this[_m$4] = _p28;
  this[_m$5] = _p29;
  this[_m$6] = _p30;
  this[_m$7] = _p31;
  this[_m$8] = _p32;
  this.value = _p33;
  Object.defineProperty(this, "children", _d$13);
}
_P$12.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$].panelID;
  },
  enumerable: true,
  configurable: true
};
var _d$15 = {
  get() {
    return this[_m$].buttonID;
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p34) {
  this[_m$] = _p34;
  Object.defineProperty(this, "id", _d$14);
  Object.defineProperty(this, "aria-labelledby", _d$15);
}
_P$13.prototype = Object.prototype;
var _d$16 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$14(_p35) {
  this[_m$] = _p35;
  Object.defineProperty(this, "children", _d$16);
}
_P$14.prototype = Object.prototype;
var _d$17 = {
  get() {
    const props = this[_m$];
    return SelectOptionStateChild(new _P$14(props));
  },
  enumerable: true,
  configurable: true
};
function _P$15(_p36) {
  this[_m$] = _p36;
  Object.defineProperty(this, "children", _d$17);
}
_P$15.prototype = Object.prototype;
var _d$18 = {
  get() {
    return this[_m$].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$19 = {
  get() {
    return this[_m$2].isSelected();
  },
  enumerable: true,
  configurable: true
};
var _d$20 = {
  get() {
    const Root = this[_m$3];
    const rest = this[_m$4];
    const context = this[_m$5];
    const disabledState = this[_m$6];
    const selectedState = this[_m$7];
    const expandedState = this[_m$8];
    const activeState = this[_m$9];
    const props = this[_m$];
    return Root(mergeProps({ role: "region" }, rest, ACCORDION_PANEL_TAG, new _P$13(context), disabledState, selectedState, expandedState, activeState, new _P$15(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$16(_p37, _p38, _p39, _p40, _p41, _p42, _p43, _p44, _p45) {
  this[_m$] = _p37;
  this[_m$2] = _p38;
  this[_m$3] = _p39;
  this[_m$4] = _p40;
  this[_m$5] = _p41;
  this[_m$6] = _p42;
  this[_m$7] = _p43;
  this[_m$8] = _p44;
  this[_m$9] = _p45;
  Object.defineProperty(this, "unmount", _d$18);
  Object.defineProperty(this, "when", _d$19);
  Object.defineProperty(this, "children", _d$20);
}
_P$16.prototype = Object.prototype;
var AccordionContext = createContext(null);
function useAccordionContext(componentName) {
  const context = useContext(AccordionContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Accordion>`));
  return context;
}
function createAccordionFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}
var ACCORDION_TAG = createTag("accordion");
var ACCORDION_BUTTON_TAG = createTag("accordion-button");
var ACCORDION_HEADER_TAG = createTag("accordion-header");
var ACCORDION_ITEM_TAG = createTag("accordion-item");
var ACCORDION_PANEL_TAG = createTag("accordion-panel");
function isAccordionUncontrolled(props) {
  return "defaultValue" in props;
}
function isAccordionMultiple(props) {
  return !!props.multiple;
}
function Accordion(props) {
  return createMemo(() => {
    const state = isAccordionMultiple(props) ? createMultipleSelectState(props) : createSingleSelectState(props);
    const controller = createAccordionFocusNavigator();
    const [ref, setRef] = createForwardRef(props);
    const ownerQuery = `[tc-owner="${controller.getId()}"]`;
    function isHeaderButton(target) {
      return target instanceof Element && target.matches(ownerQuery);
    }
    createEffect(ref, (current) => {
      if (current instanceof HTMLElement) {
        controller.setRef(current);
        return mergeFunc(() => controller.clearRef(), useEventListener(current, "keydown", (e) => {
          if (!state.disabled() && isHeaderButton(e.target)) switch (e.key) {
            case "ArrowUp":
              e.preventDefault();
              controller.setPrevChecked(true);
              break;
            case "ArrowDown":
              e.preventDefault();
              controller.setNextChecked(true);
              break;
            case "Home":
              e.preventDefault();
              controller.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              controller.setLastChecked();
          }
        }), useEventListener(current, "focusin", (e) => {
          if (e.target && e.target !== current) controller.setCurrent(e.target);
        }));
      }
    });
    const rest = isAccordionUncontrolled(props) ? omit(props, "as", "by", "children", "defaultValue", "disabled", "multiple", "onChange", "ref", "toggleable") : omit(props, "as", "by", "children", "value", "disabled", "multiple", "onChange", "ref", "toggleable");
    const controllerId = controller.getId();
    const disabledState = createDisabledState(() => state.disabled());
    const hasSelectedState = createHasSelectedState(() => state.hasSelected());
    const hasActiveState = createHasActiveState(() => state.hasActive());
    return AccordionContext(new _P$3(dynamic(() => props.as || "div"), rest, setRef, controllerId, disabledState, hasSelectedState, hasActiveState, props, state, {
      navigator: controller,
      isToggleable() {
        return !!props.toggleable;
      }
    }));
  });
}
var AccordionItemContext = createContext(null);
function useAccordionItemContext(componentName) {
  const context = useContext(AccordionItemContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <AccordionItem>`));
  return context;
}
function AccordionButton(props) {
  const rootContext = useAccordionContext("AccordionButton");
  const itemContext = useAccordionItemContext("AccordionButton");
  const state = useSelectOptionState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isDisabled = () => state.disabled() || props.disabled;
  const isLocked = () => state.isSelected() && !rootContext.isToggleable();
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "click", () => {
      if (!isDisabled()) state.select();
    }), useEventListener(current, "focus", () => {
      if (!isDisabled()) state.focus();
    }), useEventListener(current, "blur", () => {
      if (!isDisabled()) state.blur();
    }));
  });
  const rest = omit(props, "children", "ref", "disabled");
  const ownerAttribute = createOwnerAttribute(rootContext.navigator.getId());
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const ariaExpandedState = createARIAExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  return Button(mergeProps(rest, ACCORDION_BUTTON_TAG, new _P$4(itemContext, setInternalRef), ownerAttribute, disabledState, ariaDisabledState, new _P$5(isDisabled, isLocked), selectedState, expandedState, ariaExpandedState, activeState, new _P$7(props)));
}
function AccordionHeader(props) {
  useAccordionItemContext("AccordionHeader");
  const state = useSelectOptionState();
  const rest = omit(props, "as", "children");
  const disabledState = createDisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  return dynamic(() => props.as || "h3")(mergeProps(rest, ACCORDION_HEADER_TAG, disabledState, selectedState, expandedState, activeState, new _P$9(props)));
}
function AccordionItem(props) {
  useAccordionContext("AccordionItem");
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createSelectOptionState(props);
  const [panels, setPanels] = createSignal([]);
  const rest = omit(props, "as", "children", "value", "disabled");
  const disabledState = createDisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  return AccordionItemContext(new _P$12(dynamic(() => props.as || "div"), rest, disabledState, selectedState, expandedState, activeState, props, state, {
    buttonID,
    panelID,
    hasPanel() {
      return panels().some((present) => present());
    },
    registerPanel(present) {
      onSettled(() => {
        setPanels((list) => [...list, present]);
        return () => {
          setPanels((list) => list.filter((item) => item !== present));
        };
      });
    }
  }));
}
function AccordionPanel(props) {
  const context = useAccordionItemContext("AccordionPanel");
  const state = useSelectOptionState();
  context.registerPanel(() => props.unmount === false || state.isSelected());
  const rest = omit(props, "as", "children", "unmount");
  const disabledState = createDisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const Root = dynamic(() => props.as || "div");
  return Unmountable(new _P$16(props, state, Root, rest, context, disabledState, selectedState, expandedState, activeState));
}

export { Accordion as A, AccordionItem as a, AccordionHeader as b, AccordionPanel as c, AccordionButton as d };
//# sourceMappingURL=accordion-DOgbjwG-.mjs.map
