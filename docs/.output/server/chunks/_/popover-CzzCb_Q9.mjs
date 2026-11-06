import { aj as useFocusStartPoint, v as createDisclosureState, y as useDisclosureState, b as createForwardRef, m as mergeFunc, u as useEventListener, B as Button, w as createPanelNode, z as createDependencyList, a0 as afterTransition, au as onFocusLeave, A as lockFocus, U as Unmountable, e as createTag, f as assert, j as createDisabledState, r as createARIADisabledState, l as createExpandedState, s as createARIAExpandedState, G as DisclosureStateProvider, E as DisclosureStateChild, ak as focusFirst, al as getFocusableElements, P as PanelTreeContext } from '../routes/_..._.mjs';
import { f as focusMenuItem, i as isMenuItemActivation, h as hasMenu } from './menu-popup-C0F4Fm9V-DMMCHJS2.mjs';
import { dynamic, mergeProps, memo } from '@solidjs/web';
import { createUniqueId, createEffect, omit, createContext, useContext } from 'solid-js';

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
    return DisclosureStateProvider(new _P$(props, state));
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
    const expandedState = this[_m$3];
    const rest = this[_m$4];
    const props = this[_m$5];
    const state = this[_m$6];
    return Root(mergeProps(POPOVER_TAG, disabledState, expandedState, rest, new _P$2(props, state)));
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
    return this[_m$].buttonID;
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const state = this[_m$2];
    const context = this[_m$];
    return memo(() => {
      return !!state.isOpen();
    })() ? context.panelID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p10, _p11, _p12) {
  this[_m$] = _p10;
  this[_m$2] = _p11;
  Object.defineProperty(this, "id", _d$4);
  this.ref = _p12;
  Object.defineProperty(this, "aria-controls", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p13) {
  this[_m$] = _p13;
  Object.defineProperty(this, "children", _d$6);
}
_P$5.prototype = Object.prototype;
var _d$7 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$5(props));
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p14) {
  this[_m$] = _p14;
  Object.defineProperty(this, "children", _d$7);
}
_P$6.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p17, _p18) {
  this[_m$] = _p17;
  Object.defineProperty(this, "id", _d$10);
  this.ref = _p18;
}
_P$9.prototype = Object.prototype;
var _d$11 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p19) {
  this[_m$] = _p19;
  Object.defineProperty(this, "children", _d$11);
}
_P$10.prototype = Object.prototype;
var _d$12 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$10(props));
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p20, _p21) {
  this[_m$] = _p20;
  this.value = _p21;
  Object.defineProperty(this, "children", _d$12);
}
_P$11.prototype = Object.prototype;
var _d$13 = {
  get() {
    const props = this[_m$];
    const node = this[_m$2];
    return PanelTreeContext(new _P$11(props, node));
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p22, _p23) {
  this[_m$] = _p22;
  this[_m$2] = _p23;
  Object.defineProperty(this, "children", _d$13);
}
_P$12.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$15 = {
  get() {
    return this[_m$2].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$16 = {
  get() {
    const Root = this[_m$3];
    const context = this[_m$4];
    const panelRef = this[_m$5];
    const disabledState = this[_m$6];
    const expandedState = this[_m$7];
    const rest = this[_m$8];
    const props = this[_m$];
    const node = this[_m$9];
    return Root(mergeProps(POPOVER_PANEL_TAG, new _P$9(context, panelRef), disabledState, expandedState, rest, new _P$12(props, node)));
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p24, _p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32) {
  this[_m$] = _p24;
  this[_m$2] = _p25;
  this[_m$3] = _p26;
  this[_m$4] = _p27;
  this[_m$5] = _p28;
  this[_m$6] = _p29;
  this[_m$7] = _p30;
  this[_m$8] = _p31;
  this[_m$9] = _p32;
  Object.defineProperty(this, "unmount", _d$14);
  Object.defineProperty(this, "when", _d$15);
  Object.defineProperty(this, "children", _d$16);
}
_P$13.prototype = Object.prototype;
var PopoverContext = createContext(null);
function usePopoverContext(componentName) {
  const context = useContext(PopoverContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Popover>`));
  return context;
}
var POPOVER_TAG = createTag("popover");
var POPOVER_BUTTON_TAG = createTag("popover-button");
var POPOVER_PANEL_TAG = createTag("popover-panel");
function isPopoverUncontrolled(props) {
  return "defaultOpen" in props;
}
function Popover(props) {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const fsp = useFocusStartPoint();
  const state = createDisclosureState(props);
  createEffect(() => state.isOpen(), (flag) => {
    if (flag) fsp.save();
    else fsp.load();
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isPopoverUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen");
  return PopoverContext(new _P$3(dynamic(() => props.as || "div"), disabledState, expandedState, rest, props, state, {
    ownerID,
    buttonID,
    panelID,
    hovering: false,
    focusLast: false
  }));
}
function PopoverButton(props) {
  const context = usePopoverContext("PopoverButton");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isDisabled = () => state.disabled() || props.disabled;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      context.hovering = false;
      return mergeFunc(useEventListener(current, "click", () => {
        if (!isDisabled()) state.toggle();
      }), useEventListener(current, "keydown", (e) => {
        const popup = current.getAttribute("aria-haspopup");
        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && (popup === "menu" || popup === "true") && !isDisabled()) {
          e.preventDefault();
          const panel = state.isOpen() ? document.getElementById(context.panelID) : null;
          if (panel) focusMenuItem(panel, e.key === "ArrowUp");
          else {
            context.focusLast = e.key === "ArrowUp";
            state.open();
          }
        }
      }), useEventListener(current, "mouseenter", () => {
        context.hovering = true;
      }), useEventListener(current, "mouseleave", () => {
        context.hovering = false;
      }), () => {
        context.hovering = false;
      });
    }
  });
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const expandedState = createExpandedState(() => state.isOpen());
  const ariaExpandedState = createARIAExpandedState(() => state.isOpen());
  const rest = omit(props, "children", "ref");
  return Button(mergeProps(POPOVER_BUTTON_TAG, new _P$4(context, state, setInternalRef), disabledState, ariaDisabledState, expandedState, ariaExpandedState, rest, new _P$6(props)));
}
function PopoverPanel(props) {
  const context = usePopoverContext("PopoverPanel");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [node, panelRef] = createPanelNode(setInternalRef);
  createEffect(createDependencyList(() => [internalRef(), state.isOpen()]), ([current, isOpen]) => {
    if (current instanceof HTMLElement && isOpen) {
      const focusLast = context.focusLast;
      context.focusLast = false;
      afterTransition(current, () => {
        if (!focusMenuItem(current, focusLast)) focusFirst(getFocusableElements(current), false);
      });
      return mergeFunc(useEventListener(current, "keydown", (e) => {
        if (!state.disabled()) switch (e.key) {
          case "Tab":
            e.preventDefault();
            e.stopPropagation();
            if (hasMenu(current)) state.close();
            else lockFocus(current, e.shiftKey, false);
            break;
          case "Escape":
            e.stopPropagation();
            state.close();
        }
      }), useEventListener(current, "click", (e) => {
        if (isMenuItemActivation(current, e.target)) state.close();
      }), onFocusLeave(node, () => {
        if (!context.hovering) state.close();
      }));
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "unmount", "children", "ref");
  const Root = dynamic(() => props.as || "div");
  return Unmountable(new _P$13(props, state, Root, context, panelRef, disabledState, expandedState, rest, node));
}

export { Popover as P, PopoverButton as a, PopoverPanel as b };
//# sourceMappingURL=popover-CzzCb_Q9.mjs.map
