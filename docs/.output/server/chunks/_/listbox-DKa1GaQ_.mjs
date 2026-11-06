import { v as createDisclosureState, c as createMultipleSelectState, a as createSingleSelectState, aj as useFocusStartPoint, I as createPresence, S as SelectStateProvider, y as useDisclosureState, at as useSelectState, b as createForwardRef, m as mergeFunc, u as useEventListener, B as Button, w as createPanelNode, am as createTypeAhead, z as createDependencyList, a0 as afterTransition, au as onFocusLeave, U as Unmountable, f as assert, e as createTag, j as createDisabledState, l as createExpandedState, i as createHasSelectedState, h as createHasActiveState, r as createARIADisabledState, s as createARIAExpandedState, F as FocusNavigator, E as DisclosureStateChild, a3 as SELECTED_NODE, G as DisclosureStateProvider, P as PanelTreeContext, d as createSelectOptionState, q as createOwnerAttribute, n as createSelectedState, a6 as createARIASelectedState, k as createActiveState, g as SelectOptionStateProvider } from '../routes/_..._.mjs';
import { dynamic, mergeProps, memo } from '@solidjs/web';
import { createMemo, createUniqueId, merge, createEffect, omit, createContext, useContext } from 'solid-js';

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
var _m$11 = /* @__PURE__ */ Symbol();
var _m$12 = /* @__PURE__ */ Symbol();
var _m$13 = /* @__PURE__ */ Symbol();
var _m$14 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p) {
  this[_m$] = _p;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const Root = this[_m$];
    const ownerID = this[_m$2];
    const disabledState = this[_m$3];
    const hasSelectedState = this[_m$4];
    const hasActiveState = this[_m$5];
    const expandedState = this[_m$6];
    const rest = this[_m$7];
    const props = this[_m$8];
    return Root(mergeProps(LISTBOX_TAG, { id: ownerID }, disabledState, hasSelectedState, hasActiveState, expandedState, rest, new _P$(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3, _p4, _p5, _p6, _p7, _p8, _p9, _p0) {
  this[_m$] = _p2;
  this[_m$2] = _p3;
  this[_m$3] = _p4;
  this[_m$4] = _p5;
  this[_m$5] = _p6;
  this[_m$6] = _p7;
  this[_m$7] = _p8;
  this[_m$8] = _p9;
  this.state = _p0;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const Root = this[_m$];
    const ownerID = this[_m$2];
    const disabledState = this[_m$3];
    const hasSelectedState = this[_m$4];
    const hasActiveState = this[_m$5];
    const expandedState = this[_m$6];
    const rest = this[_m$7];
    const props = this[_m$8];
    const disclosureState = this[_m$9];
    return DisclosureStateProvider(new _P$2(Root, ownerID, disabledState, hasSelectedState, hasActiveState, expandedState, rest, props, disclosureState));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17, _p18) {
  this[_m$] = _p1;
  this[_m$2] = _p10;
  this[_m$3] = _p11;
  this[_m$4] = _p12;
  this[_m$5] = _p13;
  this[_m$6] = _p14;
  this[_m$7] = _p15;
  this[_m$8] = _p16;
  this[_m$9] = _p17;
  this.state = _p18;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    const ownerID = this[_m$];
    const labelID = this[_m$2];
    const buttonID = this[_m$3];
    const optionsID = this[_m$4];
    const props = this[_m$5];
    const label = this[_m$6];
    return {
      ownerID,
      labelID,
      buttonID,
      optionsID,
      buttonHovering: false,
      optionsHovering: false,
      multiple: props.multiple,
      isHorizontal() {
        return props.horizontal;
      },
      hasLabel: label.isPresent,
      registerLabel: label.register
    };
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const Root = this[_m$7];
    const ownerID = this[_m$];
    const disabledState = this[_m$8];
    const hasSelectedState = this[_m$9];
    const hasActiveState = this[_m$10];
    const expandedState = this[_m$11];
    const rest = this[_m$12];
    const props = this[_m$5];
    const disclosureState = this[_m$13];
    const selectState = this[_m$14];
    return SelectStateProvider(new _P$3(Root, ownerID, disabledState, hasSelectedState, hasActiveState, expandedState, rest, props, disclosureState, selectState));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p19, _p20, _p21, _p22, _p23, _p24, _p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32) {
  this[_m$] = _p19;
  this[_m$2] = _p20;
  this[_m$3] = _p21;
  this[_m$4] = _p22;
  this[_m$5] = _p23;
  this[_m$6] = _p24;
  this[_m$7] = _p25;
  this[_m$8] = _p26;
  this[_m$9] = _p27;
  this[_m$10] = _p28;
  this[_m$11] = _p29;
  this[_m$12] = _p30;
  this[_m$13] = _p31;
  this[_m$14] = _p32;
  Object.defineProperty(this, "value", _d$4);
  Object.defineProperty(this, "children", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$].buttonID;
  },
  enumerable: true,
  configurable: true
};
var _d$7 = {
  get() {
    return this[_m$].optionsID;
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    const labelledBy = this[_m$2];
    return labelledBy();
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p33, _p34, _p35, _p36) {
  this[_m$] = _p33;
  this[_m$2] = _p34;
  Object.defineProperty(this, "id", _d$6);
  this["aria-haspopup"] = _p35;
  Object.defineProperty(this, "aria-controls", _d$7);
  Object.defineProperty(this, "aria-labelledby", _d$8);
  this.ref = _p36;
}
_P$5.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p37) {
  this[_m$] = _p37;
  Object.defineProperty(this, "children", _d$9);
}
_P$6.prototype = Object.prototype;
var _d$10 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$6(props));
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p38) {
  this[_m$] = _p38;
  Object.defineProperty(this, "children", _d$10);
}
_P$7.prototype = Object.prototype;
var _d$11 = {
  get() {
    return this[_m$].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p39) {
  this[_m$] = _p39;
  Object.defineProperty(this, "id", _d$11);
}
_P$8.prototype = Object.prototype;
var _d$12 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p40) {
  this[_m$] = _p40;
  Object.defineProperty(this, "children", _d$12);
}
_P$9.prototype = Object.prototype;
var _d$13 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$9(props));
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p41) {
  this[_m$] = _p41;
  Object.defineProperty(this, "children", _d$13);
}
_P$10.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$].as || "li";
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p42, _p43, _p44, _p45) {
  this[_m$] = _p42;
  Object.defineProperty(this, "as", _d$14);
  this.role = _p43;
  this.tabindex = _p44;
  this.ref = _p45;
}
_P$11.prototype = Object.prototype;
var _d$15 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p46, _p47) {
  this[_m$] = _p46;
  this.state = _p47;
  Object.defineProperty(this, "children", _d$15);
}
_P$12.prototype = Object.prototype;
var _d$16 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return SelectOptionStateProvider(new _P$12(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p48, _p49) {
  this[_m$] = _p48;
  this[_m$2] = _p49;
  Object.defineProperty(this, "children", _d$16);
}
_P$13.prototype = Object.prototype;
var _d$17 = {
  get() {
    return this[_m$].optionsID;
  },
  enumerable: true,
  configurable: true
};
var _d$18 = {
  get() {
    return this[_m$].multiple ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
var _d$19 = {
  get() {
    const context = this[_m$];
    return memo(() => {
      return !!context.hasLabel();
    })() ? context.labelID : context.buttonID;
  },
  enumerable: true,
  configurable: true
};
var _d$20 = {
  get() {
    return this[_m$].isHorizontal() ? "horizontal" : "vertical";
  },
  enumerable: true,
  configurable: true
};
var _d$21 = {
  get() {
    return this[_m$2].disabled() ? -1 : 0;
  },
  enumerable: true,
  configurable: true
};
function _P$14(_p50, _p51, _p52, _p53) {
  this[_m$] = _p50;
  this[_m$2] = _p51;
  Object.defineProperty(this, "id", _d$17);
  this.role = _p52;
  Object.defineProperty(this, "aria-multiselectable", _d$18);
  Object.defineProperty(this, "aria-labelledby", _d$19);
  this.ref = _p53;
  Object.defineProperty(this, "aria-orientation", _d$20);
  Object.defineProperty(this, "tabindex", _d$21);
}
_P$14.prototype = Object.prototype;
var _d$22 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$15(_p54, _p55) {
  this[_m$] = _p54;
  this.state = _p55;
  Object.defineProperty(this, "children", _d$22);
}
_P$15.prototype = Object.prototype;
var _d$23 = {
  get() {
    const props = this[_m$];
    const selectState = this[_m$2];
    return SelectStateProvider(new _P$15(props, selectState));
  },
  enumerable: true,
  configurable: true
};
function _P$16(_p56, _p57, _p58) {
  this[_m$] = _p56;
  this[_m$2] = _p57;
  this.value = _p58;
  Object.defineProperty(this, "children", _d$23);
}
_P$16.prototype = Object.prototype;
var _d$24 = {
  get() {
    const props = this[_m$];
    const selectState = this[_m$2];
    const node = this[_m$3];
    return PanelTreeContext(new _P$16(props, selectState, node));
  },
  enumerable: true,
  configurable: true
};
function _P$17(_p59, _p60, _p61) {
  this[_m$] = _p59;
  this[_m$2] = _p60;
  this[_m$3] = _p61;
  Object.defineProperty(this, "children", _d$24);
}
_P$17.prototype = Object.prototype;
var _d$25 = {
  get() {
    const Root = this[_m$];
    const context = this[_m$2];
    const selectState = this[_m$3];
    const panelRef = this[_m$4];
    const disabledState = this[_m$5];
    const ariaDisabledState = this[_m$6];
    const expandedState = this[_m$7];
    const hasSelectedState = this[_m$8];
    const hasActiveState = this[_m$9];
    const rest = this[_m$10];
    const props = this[_m$11];
    const node = this[_m$12];
    return Root(mergeProps(LISTBOX_OPTIONS_TAG, new _P$14(context, selectState, "listbox", panelRef), disabledState, ariaDisabledState, expandedState, hasSelectedState, hasActiveState, rest, new _P$17(props, selectState, node)));
  },
  enumerable: true,
  configurable: true
};
function _P$18(_p62, _p63, _p64, _p65, _p66, _p67, _p68, _p69, _p70, _p71, _p72, _p73, _p74) {
  this[_m$] = _p62;
  this[_m$2] = _p63;
  this[_m$3] = _p64;
  this[_m$4] = _p65;
  this[_m$5] = _p66;
  this[_m$6] = _p67;
  this[_m$7] = _p68;
  this[_m$8] = _p69;
  this[_m$9] = _p70;
  this[_m$10] = _p71;
  this[_m$11] = _p72;
  this[_m$12] = _p73;
  this.value = _p74;
  Object.defineProperty(this, "children", _d$25);
}
_P$18.prototype = Object.prototype;
var _d$26 = {
  get() {
    return this[_m$].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$27 = {
  get() {
    return this[_m$2].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$28 = {
  get() {
    const Root = this[_m$3];
    const context = this[_m$4];
    const selectState = this[_m$5];
    const panelRef = this[_m$6];
    const disabledState = this[_m$7];
    const ariaDisabledState = this[_m$8];
    const expandedState = this[_m$9];
    const hasSelectedState = this[_m$10];
    const hasActiveState = this[_m$11];
    const rest = this[_m$12];
    const props = this[_m$];
    const node = this[_m$13];
    const controller = this[_m$14];
    return ListboxOptionsContext(new _P$18(Root, context, selectState, panelRef, disabledState, ariaDisabledState, expandedState, hasSelectedState, hasActiveState, rest, props, node, controller));
  },
  enumerable: true,
  configurable: true
};
function _P$19(_p75, _p76, _p77, _p78, _p79, _p80, _p81, _p82, _p83, _p84, _p85, _p86, _p87, _p88) {
  this[_m$] = _p75;
  this[_m$2] = _p76;
  this[_m$3] = _p77;
  this[_m$4] = _p78;
  this[_m$5] = _p79;
  this[_m$6] = _p80;
  this[_m$7] = _p81;
  this[_m$8] = _p82;
  this[_m$9] = _p83;
  this[_m$10] = _p84;
  this[_m$11] = _p85;
  this[_m$12] = _p86;
  this[_m$13] = _p87;
  this[_m$14] = _p88;
  Object.defineProperty(this, "unmount", _d$26);
  Object.defineProperty(this, "when", _d$27);
  Object.defineProperty(this, "children", _d$28);
}
_P$19.prototype = Object.prototype;
var ListboxContext = createContext(null);
function useListboxContext(componentName) {
  const context = useContext(ListboxContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Listbox>`));
  return context;
}
var LISTBOX_TAG = createTag("listbox");
var LISTBOX_BUTTON_TAG = createTag("listbox-button");
var LISTBOX_LABEL_TAG = createTag("listbox-label");
var LISTBOX_OPTIONS_TAG = createTag("listbox-options");
var LISTBOX_OPTION_TAG = createTag("listbox-option");
function isListboxMultiple(props) {
  return !!props.multiple;
}
function isListboxSelectUncontrolled(props) {
  return "defaultValue" in props;
}
function isListboxDisclosureUncontrolled(props) {
  return "defaultOpen" in props;
}
function getProps(props) {
  if (isListboxSelectUncontrolled(props)) {
    if (isListboxDisclosureUncontrolled(props)) return omit(props, "as", "by", "children", "defaultOpen", "defaultValue", "disabled", "horizontal", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable");
    return omit(props, "as", "by", "children", "isOpen", "defaultValue", "disabled", "horizontal", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable");
  }
  if (isListboxDisclosureUncontrolled(props)) return omit(props, "as", "by", "children", "defaultOpen", "value", "disabled", "horizontal", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable");
  return omit(props, "as", "by", "children", "isOpen", "value", "disabled", "horizontal", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable");
}
function Listbox(props) {
  return createMemo(() => {
    const ownerID = createUniqueId();
    const labelID = createUniqueId();
    const buttonID = createUniqueId();
    const optionsID = createUniqueId();
    const disclosureState = createDisclosureState(merge(props, { onChange(value) {
      if (props.onDisclosureChange) props.onDisclosureChange(value);
    } }));
    const selectState = isListboxMultiple(props) ? createMultipleSelectState(merge(props, { onChange(value) {
      if (props.onSelectChange) props.onSelectChange(value);
    } })) : createSingleSelectState(merge(props, { onChange(value) {
      if (props.onSelectChange) props.onSelectChange(value);
    } }));
    const fsp = useFocusStartPoint();
    createEffect(() => disclosureState.isOpen(), (flag) => {
      if (flag) fsp.save();
      else fsp.load();
    });
    const label = createPresence();
    const disabledState = createDisabledState(() => selectState.disabled());
    const hasSelectedState = createHasSelectedState(() => selectState.hasSelected());
    const hasActiveState = createHasActiveState(() => selectState.hasActive());
    const expandedState = createExpandedState(() => disclosureState.isOpen());
    const rest = getProps(props);
    return ListboxContext(new _P$4(ownerID, labelID, buttonID, optionsID, props, label, dynamic(() => props.as || "div"), disabledState, hasSelectedState, hasActiveState, expandedState, rest, disclosureState, selectState));
  });
}
function ListboxButton(props) {
  const context = useListboxContext("ListboxButton");
  const disclosureState = useDisclosureState();
  const selectState = useSelectState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isDisabled = () => disclosureState.disabled() || props.disabled;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      context.buttonHovering = false;
      return mergeFunc(useEventListener(current, "click", () => {
        if (!isDisabled()) disclosureState.toggle();
      }), useEventListener(current, "keydown", (e) => {
        if (!isDisabled()) switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
            e.preventDefault();
            disclosureState.toggle();
        }
      }), useEventListener(current, "mouseenter", () => {
        context.buttonHovering = true;
      }), useEventListener(current, "mouseleave", () => {
        context.buttonHovering = false;
      }), () => {
        context.buttonHovering = false;
      });
    }
  });
  const labelledBy = () => context.hasLabel() ? `${context.labelID} ${context.buttonID}` : void 0;
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const ariaExpandedState = createARIAExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => selectState.hasSelected());
  const hasActiveState = createHasActiveState(() => selectState.hasActive());
  const rest = omit(props, "children", "ref");
  return Button(mergeProps(LISTBOX_BUTTON_TAG, new _P$5(context, labelledBy, "listbox", setInternalRef), disabledState, ariaDisabledState, expandedState, ariaExpandedState, hasSelectedState, hasActiveState, rest, new _P$7(props)));
}
function ListboxLabel(props) {
  const context = useListboxContext("ListboxLabel");
  const disclosureState = useDisclosureState();
  const selectState = useSelectState();
  context.registerLabel();
  const disabledState = createDisabledState(() => disclosureState.disabled());
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => selectState.hasSelected());
  const hasActiveState = createHasActiveState(() => selectState.hasActive());
  const rest = omit(props, "as", "children");
  return dynamic(() => props.as || "label")(mergeProps(LISTBOX_LABEL_TAG, new _P$8(context), disabledState, expandedState, hasSelectedState, hasActiveState, rest, new _P$10(props)));
}
var ListboxOptionsContext = createContext(null);
function useListboxOptionsContext(componentName) {
  const context = useContext(ListboxOptionsContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <ListboxOptions>`));
  return context;
}
function createListboxOptionsFocusNavigator(owner) {
  return new FocusNavigator(owner);
}
function ListboxOption(props) {
  const rootContext = useListboxContext("ListboxOptions");
  const context = useListboxOptionsContext("ListboxOptions");
  const disclosure = useDisclosureState();
  const state = createSelectOptionState(props);
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "click", () => {
      if (!state.disabled()) {
        state.select();
        if (!rootContext.multiple) disclosure.close();
      }
    }), useEventListener(current, "focus", () => {
      state.focus();
    }), useEventListener(current, "blur", () => {
      state.blur();
    }), useEventListener(current, "mouseenter", () => {
      if (!state.disabled()) current.focus({ preventScroll: true });
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
  const rest = omit(props, "as", "children", "disabled", "value", "ref");
  return Button(mergeProps(LISTBOX_OPTION_TAG, ownerAttribute, new _P$11(props, "option", -1, setInternalRef), disabledState, ariaDisabledState, selectedState, ariaSelectedState, activeState, rest, new _P$13(props, state)));
}
function ListboxOptions(props) {
  const context = useListboxContext("ListboxOptions");
  const selectState = useSelectState();
  const disclosureState = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [node, panelRef] = createPanelNode(setInternalRef);
  const controller = createListboxOptionsFocusNavigator(context.optionsID);
  const pushCharacter = createTypeAhead((value) => {
    controller.setFirstMatch(value);
  });
  createEffect(createDependencyList(() => [internalRef(), disclosureState.isOpen()]), ([current, isOpen]) => {
    if (current instanceof HTMLElement && isOpen) {
      controller.setRef(current);
      afterTransition(current, () => {
        if (selectState.hasSelected()) controller.setFirstChecked(SELECTED_NODE);
        else controller.setFirstChecked();
      });
      return mergeFunc(() => {
        controller.clearRef();
      }, useEventListener(current, "keydown", (e) => {
        if (!selectState.disabled()) switch (e.key) {
          case "Escape":
            e.stopPropagation();
            disclosureState.close();
            break;
          case "ArrowLeft":
            if (context.isHorizontal()) {
              e.preventDefault();
              controller.setPrevChecked(true);
            }
            break;
          case "ArrowUp":
            if (!context.isHorizontal()) {
              e.preventDefault();
              controller.setPrevChecked(true);
            }
            break;
          case "ArrowRight":
            if (context.isHorizontal()) {
              e.preventDefault();
              controller.setNextChecked(true);
            }
            break;
          case "ArrowDown":
            if (!context.isHorizontal()) {
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
      }), onFocusLeave(node, () => {
        if (!context.buttonHovering && !context.optionsHovering) disclosureState.close();
      }), useEventListener(current, "focusin", (e) => {
        if (e.target && e.target !== current) controller.setCurrent(e.target);
      }), useEventListener(current, "mouseenter", () => {
        context.optionsHovering = true;
      }), useEventListener(current, "mouseleave", () => {
        context.optionsHovering = false;
      }));
    }
  });
  const disabledState = createDisabledState(() => selectState.disabled());
  const ariaDisabledState = createARIADisabledState(() => selectState.disabled());
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => selectState.hasSelected());
  const hasActiveState = createHasActiveState(() => selectState.hasActive());
  const rest = omit(props, "as", "children", "ref");
  const Root = dynamic(() => props.as || "ul");
  return Unmountable(new _P$19(props, disclosureState, Root, context, selectState, panelRef, disabledState, ariaDisabledState, expandedState, hasSelectedState, hasActiveState, rest, node, controller));
}

export { Listbox as L, ListboxLabel as a, ListboxButton as b, ListboxOptions as c, ListboxOption as d };
//# sourceMappingURL=listbox-DKa1GaQ_.mjs.map
