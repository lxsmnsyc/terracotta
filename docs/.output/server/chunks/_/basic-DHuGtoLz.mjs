import { v as createDisclosureState, W as createMultipleAutocompleteState, X as createSingleAutocompleteState, I as createPresence, F as FocusNavigator, Y as MATCHES_NODE, Z as AutocompleteStateProvider, _ as useAutocompleteState, y as useDisclosureState, b as createForwardRef, m as mergeFunc, u as useEventListener, $ as DISABLED_NODE, w as createPanelNode, z as createDependencyList, a0 as afterTransition, U as Unmountable, f as assert, e as createTag, j as createDisabledState, l as createExpandedState, i as createHasSelectedState, h as createHasActiveState, a1 as createHasQueryState, r as createARIADisabledState, s as createARIAExpandedState, P as PanelTreeContext, a2 as AutocompleteStateChild, a3 as SELECTED_NODE, G as DisclosureStateProvider, a4 as createAutocompleteOptionState, a5 as useVirtualFocus, q as createOwnerAttribute, B as Button, n as createSelectedState, a6 as createARIASelectedState, k as createActiveState, a7 as createMatchesState, a8 as AutocompleteOptionStateProvider } from '../routes/_..._.mjs';
import { dynamic, mergeProps, memo } from '@solidjs/web';
import { createSignal, createMemo, createUniqueId, merge, createEffect, omit, createContext, useContext, For } from 'solid-js';
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

var _m$$1 = /* @__PURE__ */ Symbol();
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
var _m$15 = /* @__PURE__ */ Symbol();
var _m$16 = /* @__PURE__ */ Symbol();
var _m$17 = /* @__PURE__ */ Symbol();
var _m$18 = /* @__PURE__ */ Symbol();
var _d$$1 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p) {
  this[_m$$1] = _p;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    const Root = this[_m$$1];
    const disabledState = this[_m$2];
    const hasSelectedState = this[_m$3];
    const hasActiveState = this[_m$4];
    const expandedState = this[_m$5];
    const rest = this[_m$6];
    const props = this[_m$7];
    return Root(mergeProps(COMBOBOX_TAG, disabledState, hasSelectedState, hasActiveState, expandedState, rest, new _P$$1(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p2, _p3, _p4, _p5, _p6, _p7, _p8, _p9) {
  this[_m$$1] = _p2;
  this[_m$2] = _p3;
  this[_m$3] = _p4;
  this[_m$4] = _p5;
  this[_m$5] = _p6;
  this[_m$6] = _p7;
  this[_m$7] = _p8;
  this.state = _p9;
  Object.defineProperty(this, "children", _d$2$1);
}
_P$2$1.prototype = Object.prototype;
var _d$3$1 = {
  get() {
    const Root = this[_m$$1];
    const disabledState = this[_m$2];
    const hasSelectedState = this[_m$3];
    const hasActiveState = this[_m$4];
    const expandedState = this[_m$5];
    const rest = this[_m$6];
    const props = this[_m$7];
    const disclosureState = this[_m$8];
    return DisclosureStateProvider(new _P$2$1(Root, disabledState, hasSelectedState, hasActiveState, expandedState, rest, props, disclosureState));
  },
  enumerable: true,
  configurable: true
};
function _P$3$1(_p0, _p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16) {
  this[_m$$1] = _p0;
  this[_m$2] = _p1;
  this[_m$3] = _p10;
  this[_m$4] = _p11;
  this[_m$5] = _p12;
  this[_m$6] = _p13;
  this[_m$7] = _p14;
  this[_m$8] = _p15;
  this.state = _p16;
  Object.defineProperty(this, "children", _d$3$1);
}
_P$3$1.prototype = Object.prototype;
var _d$4$1 = {
  get() {
    const props = this[_m$$1];
    const labelID = this[_m$2];
    const inputID = this[_m$3];
    const optionsID = this[_m$4];
    const controller = this[_m$5];
    const activeDescendant = this[_m$6];
    const setActiveDescendant = this[_m$7];
    const selectedDescendant = this[_m$8];
    const setSelectedDescendant = this[_m$9];
    const label = this[_m$10];
    return {
      get multiple() {
        return props.multiple;
      },
      labelID,
      inputID,
      optionsID,
      controller,
      inputHovering: false,
      optionsHovering: false,
      getActiveDescendant: activeDescendant,
      setActiveDescendant,
      getSelectedDescendant: selectedDescendant,
      setSelectedDescendant,
      hasLabel: label.isPresent,
      registerLabel: label.register
    };
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const Root = this[_m$11];
    const disabledState = this[_m$12];
    const hasSelectedState = this[_m$13];
    const hasActiveState = this[_m$14];
    const expandedState = this[_m$15];
    const rest = this[_m$16];
    const props = this[_m$$1];
    const disclosureState = this[_m$17];
    const autocompleteState = this[_m$18];
    return AutocompleteStateProvider(new _P$3$1(Root, disabledState, hasSelectedState, hasActiveState, expandedState, rest, props, disclosureState, autocompleteState));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p17, _p18, _p19, _p20, _p21, _p22, _p23, _p24, _p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32, _p33, _p34) {
  this[_m$$1] = _p17;
  this[_m$2] = _p18;
  this[_m$3] = _p19;
  this[_m$4] = _p20;
  this[_m$5] = _p21;
  this[_m$6] = _p22;
  this[_m$7] = _p23;
  this[_m$8] = _p24;
  this[_m$9] = _p25;
  this[_m$10] = _p26;
  this[_m$11] = _p27;
  this[_m$12] = _p28;
  this[_m$13] = _p29;
  this[_m$14] = _p30;
  this[_m$15] = _p31;
  this[_m$16] = _p32;
  this[_m$17] = _p33;
  this[_m$18] = _p34;
  Object.defineProperty(this, "value", _d$4$1);
  Object.defineProperty(this, "children", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$$1].inputID;
  },
  enumerable: true,
  configurable: true
};
var _d$7 = {
  get() {
    return this[_m$$1].optionsID;
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    const context = this[_m$$1];
    return memo(() => {
      return !!context.hasLabel();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    const disclosureState = this[_m$2];
    const context = this[_m$$1];
    return memo(() => {
      return !!disclosureState.isOpen();
    })() ? context.getActiveDescendant() : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p35, _p36, _p37, _p38, _p39, _p40, _p41, _p42) {
  this[_m$$1] = _p35;
  this[_m$2] = _p36;
  Object.defineProperty(this, "id", _d$6);
  this.ref = _p37;
  this.type = _p38;
  this.tabindex = _p39;
  this.role = _p40;
  this["aria-haspopup"] = _p41;
  Object.defineProperty(this, "aria-controls", _d$7);
  this["aria-autocomplete"] = _p42;
  Object.defineProperty(this, "aria-labelledby", _d$8);
  Object.defineProperty(this, "aria-activedescendant", _d$9);
}
_P$5.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$$1].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p43) {
  this[_m$$1] = _p43;
  Object.defineProperty(this, "id", _d$10);
}
_P$6.prototype = Object.prototype;
var _d$11 = {
  get() {
    return this[_m$$1].as || "li";
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p44, _p45, _p46, _p47, _p48) {
  this[_m$$1] = _p44;
  this.id = _p45;
  Object.defineProperty(this, "as", _d$11);
  this.role = _p46;
  this.tabindex = _p47;
  this.ref = _p48;
}
_P$7.prototype = Object.prototype;
var _d$12 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p49, _p50) {
  this[_m$$1] = _p49;
  this.state = _p50;
  Object.defineProperty(this, "children", _d$12);
}
_P$8.prototype = Object.prototype;
var _d$13 = {
  get() {
    const props = this[_m$$1];
    const state = this[_m$2];
    return AutocompleteOptionStateProvider(new _P$8(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p51, _p52) {
  this[_m$$1] = _p51;
  this[_m$2] = _p52;
  Object.defineProperty(this, "children", _d$13);
}
_P$9.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$$1].optionsID;
  },
  enumerable: true,
  configurable: true
};
var _d$15 = {
  get() {
    const context = this[_m$$1];
    return memo(() => {
      return !!context.hasLabel();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$16 = {
  get() {
    return this[_m$$1].multiple ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p53, _p54, _p55, _p56, _p57) {
  this[_m$$1] = _p53;
  Object.defineProperty(this, "id", _d$14);
  this.role = _p54;
  Object.defineProperty(this, "aria-labelledby", _d$15);
  Object.defineProperty(this, "aria-multiselectable", _d$16);
  this.ref = _p55;
  this["aria-orientation"] = _p56;
  this.tabindex = _p57;
}
_P$10.prototype = Object.prototype;
var _d$17 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p58) {
  this[_m$$1] = _p58;
  Object.defineProperty(this, "children", _d$17);
}
_P$11.prototype = Object.prototype;
var _d$18 = {
  get() {
    const props = this[_m$$1];
    return AutocompleteStateChild(new _P$11(props));
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p59, _p60) {
  this[_m$$1] = _p59;
  this.value = _p60;
  Object.defineProperty(this, "children", _d$18);
}
_P$12.prototype = Object.prototype;
var _d$19 = {
  get() {
    const props = this[_m$$1];
    const node = this[_m$2];
    return PanelTreeContext(new _P$12(props, node));
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p61, _p62) {
  this[_m$$1] = _p61;
  this[_m$2] = _p62;
  Object.defineProperty(this, "children", _d$19);
}
_P$13.prototype = Object.prototype;
var _d$20 = {
  get() {
    return this[_m$$1].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$21 = {
  get() {
    return this[_m$2].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$22 = {
  get() {
    const Root = this[_m$3];
    const context = this[_m$4];
    const panelRef = this[_m$5];
    const disabledState = this[_m$6];
    const ariaDisabledState = this[_m$7];
    const expandedState = this[_m$8];
    const hasSelectedState = this[_m$9];
    const hasActiveState = this[_m$10];
    const hasQueryState = this[_m$11];
    const rest = this[_m$12];
    const props = this[_m$$1];
    const node = this[_m$13];
    return Root(mergeProps(COMBOBOX_OPTIONS_TAG, new _P$10(context, "listbox", panelRef, "vertical", -1), disabledState, ariaDisabledState, expandedState, hasSelectedState, hasActiveState, hasQueryState, rest, new _P$13(props, node)));
  },
  enumerable: true,
  configurable: true
};
function _P$14(_p63, _p64, _p65, _p66, _p67, _p68, _p69, _p70, _p71, _p72, _p73, _p74, _p75) {
  this[_m$$1] = _p63;
  this[_m$2] = _p64;
  this[_m$3] = _p65;
  this[_m$4] = _p66;
  this[_m$5] = _p67;
  this[_m$6] = _p68;
  this[_m$7] = _p69;
  this[_m$8] = _p70;
  this[_m$9] = _p71;
  this[_m$10] = _p72;
  this[_m$11] = _p73;
  this[_m$12] = _p74;
  this[_m$13] = _p75;
  Object.defineProperty(this, "unmount", _d$20);
  Object.defineProperty(this, "when", _d$21);
  Object.defineProperty(this, "children", _d$22);
}
_P$14.prototype = Object.prototype;
var ComboboxContext = createContext(null);
function useComboboxContext(componentName) {
  const context = useContext(ComboboxContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Combobox>`));
  return context;
}
function createComboboxOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId(), {
    virtual: true,
    base: MATCHES_NODE
  });
}
var COMBOBOX_TAG = createTag("combobox");
var COMBOBOX_INPUT_TAG = createTag("combobox-input");
var COMBOBOX_OPTIONS_TAG = createTag("combobox-options");
var COMBOBOX_OPTION_TAG = createTag("combobox-option");
var COMBOBOX_LABEL_TAG = createTag("combobox-label");
function isComboboxMultiple(props) {
  return !!props.multiple;
}
function isComboboxSelectUncontrolled(props) {
  return "defaultValue" in props;
}
function isComboboxDisclosureUncontrolled(props) {
  return "defaultOpen" in props;
}
function getProps(props) {
  if (isComboboxSelectUncontrolled(props)) {
    if (isComboboxDisclosureUncontrolled(props)) return omit(props, "as", "by", "children", "defaultOpen", "defaultValue", "disabled", "matchBy", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable");
    return omit(props, "as", "by", "children", "defaultValue", "disabled", "isOpen", "matchBy", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable");
  }
  if (isComboboxDisclosureUncontrolled(props)) return omit(props, "as", "by", "children", "defaultOpen", "disabled", "matchBy", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable", "value");
  return omit(props, "as", "by", "children", "disabled", "isOpen", "matchBy", "multiple", "onClose", "onDisclosureChange", "onOpen", "onSelectChange", "toggleable", "value");
}
function Combobox(props) {
  return createMemo(() => {
    const labelID = createUniqueId();
    const inputID = createUniqueId();
    const optionsID = createUniqueId();
    const disclosureState = createDisclosureState(merge(props, { onChange(value) {
      if (props.onDisclosureChange) props.onDisclosureChange(value);
    } }));
    const autocompleteState = isComboboxMultiple(props) ? createMultipleAutocompleteState(merge(props, { onChange(value) {
      if (props.onSelectChange) props.onSelectChange(value);
    } })) : createSingleAutocompleteState(merge(props, { onChange(value) {
      if (props.onSelectChange) props.onSelectChange(value);
    } }));
    const controller = createComboboxOptionFocusNavigator();
    const [activeDescendant, setActiveDescendant] = createSignal(void 0, { ownedWrite: true });
    const [selectedDescendant, setSelectedDescendant] = createSignal(void 0, { equals: false });
    createEffect(() => !autocompleteState.hasActive(), (value) => {
      if (value) setActiveDescendant(void 0);
    });
    createEffect(() => !disclosureState.isOpen(), (closed) => {
      if (closed) {
        autocompleteState.blur();
        setActiveDescendant(void 0);
      }
    });
    const label = createPresence();
    const disabledState = createDisabledState(() => autocompleteState.disabled());
    const hasSelectedState = createHasSelectedState(() => autocompleteState.hasSelected());
    const hasActiveState = createHasActiveState(() => autocompleteState.hasActive());
    const expandedState = createExpandedState(() => disclosureState.isOpen());
    const rest = getProps(props);
    return ComboboxContext(new _P$4(props, labelID, inputID, optionsID, controller, activeDescendant, setActiveDescendant, selectedDescendant, setSelectedDescendant, label, dynamic(() => props.as || "div"), disabledState, hasSelectedState, hasActiveState, expandedState, rest, disclosureState, autocompleteState));
  });
}
function ComboboxInput(props) {
  const context = useComboboxContext("ComboboxInput");
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isDisabled = () => autocompleteState.disabled() || props.disabled;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      context.inputHovering = false;
      return mergeFunc(current instanceof HTMLInputElement && useEventListener(current, "input", () => {
        if (!isDisabled()) autocompleteState.setQuery(current.value);
      }), useEventListener(current, "keydown", (e) => {
        if (!isDisabled()) switch (e.key) {
          case "Escape":
            if (disclosureState.isOpen()) {
              e.stopPropagation();
              disclosureState.close();
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            if (disclosureState.isOpen()) context.controller.setPrevChecked(true);
            else disclosureState.open();
            break;
          case "ArrowDown":
            e.preventDefault();
            if (disclosureState.isOpen()) context.controller.setNextChecked(true);
            else disclosureState.open();
            break;
          case "Enter":
            if (disclosureState.isOpen()) {
              e.preventDefault();
              context.setSelectedDescendant(context.getActiveDescendant());
            }
        }
      }), useEventListener(current, "click", () => {
        if (!isDisabled()) disclosureState.toggle();
      }), useEventListener(current, "blur", (e) => {
        if (context.inputHovering || context.optionsHovering) return;
        autocompleteState.blur();
        if (e.relatedTarget && !current.contains(e.relatedTarget) || e.target && !current.contains(e.target)) disclosureState.close();
      }), useEventListener(current, "mouseenter", () => {
        context.inputHovering = true;
      }), useEventListener(current, "mouseleave", () => {
        context.inputHovering = false;
      }), () => {
        context.inputHovering = false;
      });
    }
  });
  createEffect(() => autocompleteState.query(), (query) => {
    var _a;
    if (query !== "") if (disclosureState.isOpen()) {
      context.controller.setFirstChecked();
      if (!((_a = document.getElementById(context.optionsID)) == null ? void 0 : _a.querySelector(`${MATCHES_NODE}:not(${DISABLED_NODE})`))) {
        autocompleteState.blur();
        context.setActiveDescendant(void 0);
      }
    } else disclosureState.open();
  });
  createEffect(() => context.getActiveDescendant(), (activeDescendant) => {
    if (activeDescendant) {
      const current = document.getElementById(activeDescendant);
      if (current) context.controller.setCurrent(current);
    }
  });
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const ariaExpandedState = createARIAExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => autocompleteState.hasSelected());
  const hasActiveState = createHasActiveState(() => autocompleteState.hasActive());
  const hasQueryState = createHasQueryState(() => autocompleteState.hasQuery());
  const rest = omit(props, "as", "ref");
  return dynamic(() => props.as || "input")(mergeProps(COMBOBOX_INPUT_TAG, new _P$5(context, disclosureState, setInternalRef, "text", 0, "combobox", "listbox", "list"), disabledState, ariaDisabledState, expandedState, ariaExpandedState, hasSelectedState, hasActiveState, hasQueryState, rest));
}
function ComboboxLabel(props) {
  const context = useComboboxContext("ComboboxLabel");
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();
  context.registerLabel();
  const disabledState = createDisabledState(() => autocompleteState.disabled());
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => autocompleteState.hasSelected());
  const hasActiveState = createHasActiveState(() => autocompleteState.hasActive());
  const hasQueryState = createHasQueryState(() => autocompleteState.hasQuery());
  const rest = omit(props, "as");
  return dynamic(() => props.as || "label")(mergeProps(COMBOBOX_LABEL_TAG, new _P$6(context), disabledState, expandedState, hasSelectedState, hasActiveState, hasQueryState, rest));
}
function ComboboxOption(props) {
  const context = useComboboxContext("ComboboxOptions");
  const disclosure = useDisclosureState();
  const state = createAutocompleteOptionState(props);
  const [internalRef, setInternalRef] = createForwardRef(props);
  const id = createUniqueId();
  createEffect(() => !state.disabled() && context.getSelectedDescendant() === id, (value) => {
    if (value) {
      state.select();
      if (!context.multiple) disclosure.close();
    }
  });
  function focusOption() {
    context.setActiveDescendant(id);
    state.focus();
  }
  createEffect(() => state.isActive(), (active) => {
    if (active) context.setActiveDescendant(id);
    return () => {
      if (context.getActiveDescendant() === id) context.setActiveDescendant(void 0);
    };
  });
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "click", () => {
      if (!state.disabled()) {
        state.select();
        focusOption();
        if (!context.multiple) disclosure.close();
      }
    }), useEventListener(current, "mouseenter", () => {
      if (!state.disabled()) focusOption();
    }), useEventListener(current, "mouseleave", () => {
      state.blur();
    }), useVirtualFocus((el) => {
      if (el === current) focusOption();
    }));
  });
  const ownerAttribute = createOwnerAttribute(context.controller.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const matchesState = createMatchesState(() => state.matches());
  const rest = omit(props, "as", "children", "disabled", "value", "ref");
  return Button(mergeProps(COMBOBOX_OPTION_TAG, ownerAttribute, new _P$7(props, id, "option", -1, setInternalRef), disabledState, ariaDisabledState, selectedState, ariaSelectedState, activeState, matchesState, rest, new _P$9(props, state)));
}
function ComboboxOptions(props) {
  const context = useComboboxContext("ComboboxOptions");
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [node, panelRef] = createPanelNode(setInternalRef);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.controller.setRef(current);
      context.optionsHovering = false;
      return mergeFunc(() => {
        context.controller.clearRef();
      }, useEventListener(current, "focusin", () => {
        if (context.anchor) context.anchor.focus();
      }), useEventListener(current, "mouseenter", () => {
        context.optionsHovering = true;
      }), useEventListener(current, "mouseleave", () => {
        context.optionsHovering = false;
      }), () => {
        context.optionsHovering = false;
      });
    }
  });
  createEffect(() => !disclosureState.isOpen(), (value) => {
    if (value) setInternalRef(void 0);
  });
  createEffect(createDependencyList(() => [internalRef(), disclosureState.isOpen()]), ([current, flag]) => {
    if (current instanceof HTMLElement && flag) afterTransition(current, () => {
      if (autocompleteState.hasSelected()) context.controller.setFirstChecked(SELECTED_NODE);
      else context.controller.setFirstChecked();
    });
  });
  const disabledState = createDisabledState(() => autocompleteState.disabled());
  const ariaDisabledState = createARIADisabledState(() => autocompleteState.disabled());
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => autocompleteState.hasSelected());
  const hasActiveState = createHasActiveState(() => autocompleteState.hasActive());
  const hasQueryState = createHasQueryState(() => autocompleteState.hasQuery());
  const rest = omit(props, "as", "children", "ref");
  const Root = dynamic(() => props.as || "ul");
  return Unmountable(new _P$14(props, disclosureState, Root, context, panelRef, disabledState, ariaDisabledState, expandedState, hasSelectedState, hasActiveState, hasQueryState, rest, node));
}
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].name;
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
      each: PEOPLE,
      children: (person) => ComboboxOption(new _P$(person, "combobox-option", person))
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
    const selected = this[_m$];
    return selected();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    return [
      ComboboxLabel({
        class: "combobox-label",
        children: "Assignee"
      }),
      ComboboxInput({
        class: "combobox-input",
        placeholder: "Search people\u2026"
      }),
      ComboboxOptions(new _P$2("combobox-options"))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7, _p8, _p9, _p0) {
  this[_m$] = _p5;
  this.class = _p6;
  this.defaultOpen = _p7;
  Object.defineProperty(this, "value", _d$3);
  this.onSelectChange = _p8;
  this.by = _p9;
  this.matchBy = _p0;
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
var PEOPLE = [
  {
    id: 1,
    name: "Wade Cooper"
  },
  {
    id: 2,
    name: "Arlene Mccoy"
  },
  {
    id: 3,
    name: "Devon Webb"
  },
  {
    id: 4,
    name: "Tom Cook"
  },
  {
    id: 5,
    name: "Tanya Fox"
  }
];
function BasicCombobox() {
  const [selected, setSelected] = createSignal(PEOPLE[0]);
  return Combobox(new _P$3(selected, "combobox", false, (value) => value && setSelected(value), (a, b) => a.id === b.id, (person, query) => person.name.toLowerCase().includes(query.toLowerCase())));
}
var $$moduleUrl = "src/demos/combobox/basic.tsx";

export { $$moduleUrl, BasicCombobox as default };
//# sourceMappingURL=basic-DHuGtoLz.mjs.map
