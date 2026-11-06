import { t as createMountedID, v as createDisclosureState, b as createForwardRef, w as createPanelNode, x as createModalFocus, U as Unmountable, y as useDisclosureState, u as useEventListener, z as createDependencyList, m as mergeFunc, A as lockFocus, D as focusPanelAfterTransition, f as assert, e as createTag, j as createDisabledState, l as createExpandedState, E as DisclosureStateChild, P as PanelTreeContext, G as DisclosureStateProvider } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps } from '@solidjs/web';
import { createSignal, createUniqueId, omit, createContext, createEffect, useContext } from 'solid-js';
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
var _d$$1 = {
  get() {
    return this[_m$$1].isOpen() ? "true" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$2$1 = {
  get() {
    return this[_m$2].id();
  },
  enumerable: true,
  configurable: true
};
var _d$3$1 = {
  get() {
    return this[_m$3].id();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    return this[_m$$1].isOpen() ? void 0 : "true";
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    return !this[_m$$1].isOpen();
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2, _p3, _p4, _p5) {
  this[_m$$1] = _p;
  this[_m$2] = _p2;
  this[_m$3] = _p3;
  this.id = _p4;
  this.role = _p5;
  Object.defineProperty(this, "aria-modal", _d$$1);
  Object.defineProperty(this, "aria-labelledby", _d$2$1);
  Object.defineProperty(this, "aria-describedby", _d$3$1);
  Object.defineProperty(this, "aria-hidden", _d$4);
  Object.defineProperty(this, "inert", _d$5);
}
_P$$1.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p6, _p7) {
  this[_m$$1] = _p6;
  this.state = _p7;
  Object.defineProperty(this, "children", _d$6);
}
_P$2$1.prototype = Object.prototype;
var _d$7 = {
  get() {
    const props = this[_m$$1];
    const state = this[_m$2];
    return DisclosureStateProvider(new _P$2$1(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p8, _p9, _p0) {
  this[_m$$1] = _p8;
  this[_m$2] = _p9;
  this.value = _p0;
  Object.defineProperty(this, "children", _d$7);
}
_P$3.prototype = Object.prototype;
var _d$8 = {
  get() {
    const props = this[_m$$1];
    const state = this[_m$2];
    const node = this[_m$3];
    return PanelTreeContext(new _P$3(props, state, node));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p1, _p10, _p11, _p12) {
  this[_m$$1] = _p1;
  this[_m$2] = _p10;
  this[_m$3] = _p11;
  this.ref = _p12;
  Object.defineProperty(this, "children", _d$8);
}
_P$4.prototype = Object.prototype;
var _d$9 = {
  get() {
    return this[_m$$1].unmount;
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
    const props = this[_m$$1];
    const node = this[_m$10];
    const panelRef = this[_m$11];
    return Root(mergeProps(ALERT_DIALOG_TAG, new _P$$1(state, title, description, ownerID, "alertdialog"), disabledState, expandedState, rest, new _P$4(props, state, node, panelRef)));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p13, _p14, _p15, _p16, _p17, _p18, _p19, _p20, _p21, _p22, _p23) {
  this[_m$$1] = _p13;
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
    const ownerID = this[_m$$1];
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
    const ownerID = this[_m$$1];
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
  this[_m$$1] = _p24;
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
    const id = this[_m$$1];
    return id();
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p38) {
  this[_m$$1] = _p38;
  Object.defineProperty(this, "id", _d$14);
}
_P$7.prototype = Object.prototype;
var _d$15 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p39) {
  this[_m$$1] = _p39;
  Object.defineProperty(this, "children", _d$15);
}
_P$8.prototype = Object.prototype;
var _d$16 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$8(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p40) {
  this[_m$$1] = _p40;
  Object.defineProperty(this, "children", _d$16);
}
_P$9.prototype = Object.prototype;
var _d$17 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p41) {
  this[_m$$1] = _p41;
  Object.defineProperty(this, "children", _d$17);
}
_P$10.prototype = Object.prototype;
var _d$18 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$10(props));
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p42) {
  this[_m$$1] = _p42;
  Object.defineProperty(this, "children", _d$18);
}
_P$11.prototype = Object.prototype;
var _d$19 = {
  get() {
    return this[_m$$1].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p43, _p44) {
  this[_m$$1] = _p43;
  Object.defineProperty(this, "id", _d$19);
  this.ref = _p44;
}
_P$12.prototype = Object.prototype;
var _d$20 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p45) {
  this[_m$$1] = _p45;
  Object.defineProperty(this, "children", _d$20);
}
_P$13.prototype = Object.prototype;
var _d$21 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$13(props));
  },
  enumerable: true,
  configurable: true
};
function _P$14(_p46) {
  this[_m$$1] = _p46;
  Object.defineProperty(this, "children", _d$21);
}
_P$14.prototype = Object.prototype;
var _d$22 = {
  get() {
    const id = this[_m$$1];
    return id();
  },
  enumerable: true,
  configurable: true
};
function _P$15(_p47) {
  this[_m$$1] = _p47;
  Object.defineProperty(this, "id", _d$22);
}
_P$15.prototype = Object.prototype;
var _d$23 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$16(_p48) {
  this[_m$$1] = _p48;
  Object.defineProperty(this, "children", _d$23);
}
_P$16.prototype = Object.prototype;
var _d$24 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$16(props));
  },
  enumerable: true,
  configurable: true
};
function _P$17(_p49) {
  this[_m$$1] = _p49;
  Object.defineProperty(this, "children", _d$24);
}
_P$17.prototype = Object.prototype;
var AlertDialogContext = createContext(null);
function useAlertDialogContext(componentName) {
  const context = useContext(AlertDialogContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <AlertDialog>`));
  return context;
}
var ALERT_DIALOG_TAG = createTag("alert-dialog");
var ALERT_DIALOG_DESCRIPTION_TAG = createTag("alert-dialog-description");
var ALERT_DIALOG_OVERLAY_TAG = createTag("alert-dialog-overlay");
var ALERT_DIALOG_PANEL_TAG = createTag("alert-dialog-panel");
var ALERT_DIALOG_TITLE_TAG = createTag("alert-dialog-title");
function isAlertDialogUncontrolled(props) {
  return "defaultOpen" in props;
}
function AlertDialog(props) {
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
  const rest = isAlertDialogUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen", "unmount") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen", "unmount");
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  return AlertDialogContext(new _P$6(ownerID, panelID, titleID, descriptionID, title, description, props, state, dynamic(() => props.as || "div"), disabledState, expandedState, rest, node, panelRef));
}
function AlertDialogDescription(props) {
  const context = useAlertDialogContext("AlertDialogDescription");
  const state = useDisclosureState();
  const id = () => {
    var _a;
    return (_a = props.id) != null ? _a : context.descriptionID;
  };
  context.registerDescription(id);
  const rest = omit(props, "as", "children");
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  return dynamic(() => props.as || "p")(mergeProps(rest, ALERT_DIALOG_DESCRIPTION_TAG, new _P$7(id), disabledState, expandedState, new _P$9(props)));
}
function AlertDialogOverlay(props) {
  useAlertDialogContext("AlertDialogOverlay");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      state.close();
    });
  });
  const rest = omit(props, "as", "children", "ref");
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  return dynamic(() => props.as || "div")(mergeProps(rest, ALERT_DIALOG_OVERLAY_TAG, { ref: setInternalRef }, disabledState, expandedState, new _P$11(props)));
}
function AlertDialogPanel(props) {
  const context = useAlertDialogContext("AlertDialogPanel");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(createDependencyList(() => [internalRef(), state.isOpen()]), ([current, isOpen]) => {
    if (current instanceof HTMLElement) {
      if (isOpen) return mergeFunc(focusPanelAfterTransition(current), useEventListener(current, "keydown", (e) => {
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
    }
  });
  const rest = omit(props, "as", "children", "ref");
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  return dynamic(() => props.as || "div")(mergeProps(rest, ALERT_DIALOG_PANEL_TAG, new _P$12(context, setInternalRef), disabledState, expandedState, new _P$14(props)));
}
function AlertDialogTitle(props) {
  const context = useAlertDialogContext("AlertDialogTitle");
  const state = useDisclosureState();
  const id = () => {
    var _a;
    return (_a = props.id) != null ? _a : context.titleID;
  };
  context.registerTitle(id);
  const rest = omit(props, "as", "children");
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  return dynamic(() => props.as || "h2")(mergeProps(rest, ALERT_DIALOG_TITLE_TAG, new _P$15(id), disabledState, expandedState, new _P$17(props)));
}
var _tmpl$ = ["<div", ' class="dialog-actions"><button type="button" class="button">Keep it</button><button type="button" class="button button-danger">Delete</button></div>'];
var _tmpl$2 = [
  "<div",
  ' class="stack stage-tall"><button type="button" class="button button-danger">Delete the project</button><p class="hint">',
  "</p><!--$-->",
  "<!--/--></div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    var _v$3;
    return [
      AlertDialogTitle({
        class: "dialog-title",
        children: "Delete this project?"
      }),
      AlertDialogDescription({
        class: "dialog-description",
        children: "Every document in it goes too. This cannot be undone."
      }),
      (_v$3 = ssrHydrationKey(), ssr(_tmpl$, _v$3))
    ];
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
    const open = this[_m$];
    return open();
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return [AlertDialogOverlay({ class: "dialog-overlay" }), AlertDialogPanel(new _P$("dialog-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p2, _p3, _p4) {
  this[_m$] = _p2;
  this.class = _p3;
  Object.defineProperty(this, "isOpen", _d$2);
  this.onChange = _p4;
  Object.defineProperty(this, "children", _d$3);
}
_P$2.prototype = Object.prototype;
function DestructiveAlertDialog() {
  const [open, setOpen] = createSignal(false);
  const [deleted, setDeleted] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$2 = () => {
    return deleted() ? "Deleted." : "Nothing has been deleted.";
  }, _v$4 = escape(AlertDialog(new _P$2(open, "dialog", setOpen)));
  return ssr(_tmpl$2, _v$, _v$2, _v$4);
}
var $$moduleUrl = "src/demos/alert-dialog/destructive.tsx";

export { $$moduleUrl, DestructiveAlertDialog as default };
//# sourceMappingURL=destructive-BtNekrHe.mjs.map
