import { t as createMountedID, v as createDisclosureState, b as createForwardRef, w as createPanelNode, x as createModalFocus, U as Unmountable, y as useDisclosureState, u as useEventListener, z as createDependencyList, m as mergeFunc, A as lockFocus, D as focusPanelAfterTransition, f as assert, e as createTag, j as createDisabledState, l as createExpandedState, E as DisclosureStateChild, P as PanelTreeContext, G as DisclosureStateProvider } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { createUniqueId, omit, createContext, createEffect, useContext } from 'solid-js';

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
    return this[_m$].isOpen() ? "true" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    return this[_m$2].id();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return this[_m$3].id();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    return this[_m$].isOpen() ? void 0 : "true";
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    return !this[_m$].isOpen();
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this[_m$3] = _p3;
  this.id = _p4;
  this.role = _p5;
  Object.defineProperty(this, "aria-modal", _d$);
  Object.defineProperty(this, "aria-labelledby", _d$2);
  Object.defineProperty(this, "aria-describedby", _d$3);
  Object.defineProperty(this, "aria-hidden", _d$4);
  Object.defineProperty(this, "inert", _d$5);
}
_P$.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p6, _p7) {
  this[_m$] = _p6;
  this.state = _p7;
  Object.defineProperty(this, "children", _d$6);
}
_P$2.prototype = Object.prototype;
var _d$7 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return DisclosureStateProvider(new _P$2(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p8, _p9, _p0) {
  this[_m$] = _p8;
  this[_m$2] = _p9;
  this.value = _p0;
  Object.defineProperty(this, "children", _d$7);
}
_P$3.prototype = Object.prototype;
var _d$8 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    const node = this[_m$3];
    return PanelTreeContext(new _P$3(props, state, node));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p1, _p10, _p11, _p12) {
  this[_m$] = _p1;
  this[_m$2] = _p10;
  this[_m$3] = _p11;
  this.ref = _p12;
  Object.defineProperty(this, "children", _d$8);
}
_P$4.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$10 = {
  get() {
    return this[_m$2].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$11 = {
  get() {
    const Root = this[_m$3];
    const state = this[_m$2];
    const title = this[_m$4];
    const description = this[_m$5];
    const ownerID = this[_m$6];
    const disabledState = this[_m$7];
    const expandedState = this[_m$8];
    const rest = this[_m$9];
    const props = this[_m$];
    const node = this[_m$10];
    const panelRef = this[_m$11];
    return Root(mergeProps(DIALOG_TAG, new _P$(state, title, description, ownerID, "dialog"), disabledState, expandedState, rest, new _P$4(props, state, node, panelRef)));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p13, _p14, _p15, _p16, _p17, _p18, _p19, _p20, _p21, _p22, _p23) {
  this[_m$] = _p13;
  this[_m$2] = _p14;
  this[_m$3] = _p15;
  this[_m$4] = _p16;
  this[_m$5] = _p17;
  this[_m$6] = _p18;
  this[_m$7] = _p19;
  this[_m$8] = _p20;
  this[_m$9] = _p21;
  this[_m$10] = _p22;
  this[_m$11] = _p23;
  Object.defineProperty(this, "unmount", _d$9);
  Object.defineProperty(this, "when", _d$10);
  Object.defineProperty(this, "children", _d$11);
}
_P$5.prototype = Object.prototype;
var _d$12 = {
  get() {
    const ownerID = this[_m$];
    const panelID = this[_m$2];
    const titleID = this[_m$3];
    const descriptionID = this[_m$4];
    const title = this[_m$5];
    const description = this[_m$6];
    return {
      ownerID,
      panelID,
      titleID,
      descriptionID,
      registerTitle: title.register,
      registerDescription: description.register
    };
  },
  enumerable: true,
  configurable: true
};
var _d$13 = {
  get() {
    const props = this[_m$7];
    const state = this[_m$8];
    const Root = this[_m$9];
    const title = this[_m$5];
    const description = this[_m$6];
    const ownerID = this[_m$];
    const disabledState = this[_m$10];
    const expandedState = this[_m$11];
    const rest = this[_m$12];
    const node = this[_m$13];
    const panelRef = this[_m$14];
    return Unmountable(new _P$5(props, state, Root, title, description, ownerID, disabledState, expandedState, rest, node, panelRef));
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p24, _p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32, _p33, _p34, _p35, _p36, _p37) {
  this[_m$] = _p24;
  this[_m$2] = _p25;
  this[_m$3] = _p26;
  this[_m$4] = _p27;
  this[_m$5] = _p28;
  this[_m$6] = _p29;
  this[_m$7] = _p30;
  this[_m$8] = _p31;
  this[_m$9] = _p32;
  this[_m$10] = _p33;
  this[_m$11] = _p34;
  this[_m$12] = _p35;
  this[_m$13] = _p36;
  this[_m$14] = _p37;
  Object.defineProperty(this, "value", _d$12);
  Object.defineProperty(this, "children", _d$13);
}
_P$6.prototype = Object.prototype;
var _d$14 = {
  get() {
    const id = this[_m$];
    return id();
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p38) {
  this[_m$] = _p38;
  Object.defineProperty(this, "id", _d$14);
}
_P$7.prototype = Object.prototype;
var _d$15 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p39) {
  this[_m$] = _p39;
  Object.defineProperty(this, "children", _d$15);
}
_P$8.prototype = Object.prototype;
var _d$16 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$8(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p40) {
  this[_m$] = _p40;
  Object.defineProperty(this, "children", _d$16);
}
_P$9.prototype = Object.prototype;
var _d$17 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p41) {
  this[_m$] = _p41;
  Object.defineProperty(this, "children", _d$17);
}
_P$10.prototype = Object.prototype;
var _d$18 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$10(props));
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p42) {
  this[_m$] = _p42;
  Object.defineProperty(this, "children", _d$18);
}
_P$11.prototype = Object.prototype;
var _d$19 = {
  get() {
    return this[_m$].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p43, _p44) {
  this[_m$] = _p43;
  Object.defineProperty(this, "id", _d$19);
  this.ref = _p44;
}
_P$12.prototype = Object.prototype;
var _d$20 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p45) {
  this[_m$] = _p45;
  Object.defineProperty(this, "children", _d$20);
}
_P$13.prototype = Object.prototype;
var _d$21 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$13(props));
  },
  enumerable: true,
  configurable: true
};
function _P$14(_p46) {
  this[_m$] = _p46;
  Object.defineProperty(this, "children", _d$21);
}
_P$14.prototype = Object.prototype;
var _d$22 = {
  get() {
    const id = this[_m$];
    return id();
  },
  enumerable: true,
  configurable: true
};
function _P$15(_p47) {
  this[_m$] = _p47;
  Object.defineProperty(this, "id", _d$22);
}
_P$15.prototype = Object.prototype;
var _d$23 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$16(_p48) {
  this[_m$] = _p48;
  Object.defineProperty(this, "children", _d$23);
}
_P$16.prototype = Object.prototype;
var _d$24 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$16(props));
  },
  enumerable: true,
  configurable: true
};
function _P$17(_p49) {
  this[_m$] = _p49;
  Object.defineProperty(this, "children", _d$24);
}
_P$17.prototype = Object.prototype;
var DialogContext = createContext(null);
function useDialogContext(componentName) {
  const context = useContext(DialogContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Dialog>`));
  return context;
}
var DIALOG_TAG = createTag("dialog");
var DIALOG_DESCRIPTION_TAG = createTag("dialog-description");
var DIALOG_OVERLAY_TAG = createTag("dialog-overlay");
var DIALOG_PANEL_TAG = createTag("dialog-panel");
var DIALOG_TITLE_TAG = createTag("dialog-title");
function isDialogUncontrolled(props) {
  return "defaultOpen" in props;
}
function Dialog(props) {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();
  const title = createMountedID(titleID);
  const description = createMountedID(descriptionID);
  const state = createDisclosureState(props);
  const [root, setRoot] = createForwardRef(props);
  const [node, panelRef] = createPanelNode(setRoot);
  createModalFocus(state, root, node);
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isDialogUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen", "unmount") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen", "unmount");
  return DialogContext(new _P$6(ownerID, panelID, titleID, descriptionID, title, description, props, state, dynamic(() => props.as || "div"), disabledState, expandedState, rest, node, panelRef));
}
function DialogDescription(props) {
  const context = useDialogContext("DialogDescription");
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const id = () => {
    var _a;
    return (_a = props.id) != null ? _a : context.descriptionID;
  };
  context.registerDescription(id);
  const rest = omit(props, "as", "children");
  return dynamic(() => props.as || "p")(mergeProps(DIALOG_DESCRIPTION_TAG, new _P$7(id), disabledState, expandedState, rest, new _P$9(props)));
}
function DialogOverlay(props) {
  useDialogContext("DialogOverlay");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      state.close();
    });
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "div")(mergeProps(DIALOG_OVERLAY_TAG, { ref: setInternalRef }, disabledState, expandedState, rest, new _P$11(props)));
}
function DialogPanel(props) {
  const context = useDialogContext("DialogPanel");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(createDependencyList(() => [internalRef(), state.isOpen()]), ([current, isOpen]) => {
    if (current instanceof HTMLElement && isOpen) return mergeFunc(focusPanelAfterTransition(current), useEventListener(current, "keydown", (e) => {
      if (!props.disabled) switch (e.key) {
        case "Tab":
          e.preventDefault();
          e.stopPropagation();
          lockFocus(current, e.shiftKey, false);
          break;
        case "Escape":
          e.stopPropagation();
          state.close();
      }
    }));
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "div")(mergeProps(DIALOG_PANEL_TAG, new _P$12(context, setInternalRef), disabledState, expandedState, rest, new _P$14(props)));
}
function DialogTitle(props) {
  const context = useDialogContext("DialogTitle");
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const id = () => {
    var _a;
    return (_a = props.id) != null ? _a : context.titleID;
  };
  context.registerTitle(id);
  const rest = omit(props, "as", "children");
  return dynamic(() => props.as || "h2")(mergeProps(DIALOG_TITLE_TAG, new _P$15(id), disabledState, expandedState, rest, new _P$17(props)));
}

export { Dialog as D, DialogOverlay as a, DialogPanel as b, DialogTitle as c, DialogDescription as d };
//# sourceMappingURL=dialog-CMTXcP46.mjs.map
