import { aj as useFocusStartPoint, v as createDisclosureState, y as useDisclosureState, b as createForwardRef, u as useEventListener, w as createPanelNode, z as createDependencyList, a0 as afterTransition, m as mergeFunc, A as lockFocus, U as Unmountable, e as createTag, f as assert, j as createDisabledState, l as createExpandedState, G as DisclosureStateProvider, E as DisclosureStateChild, P as PanelTreeContext, ak as focusFirst, al as getFocusableElements } from '../routes/_..._.mjs';
import { i as isMenuItemActivation, h as hasMenu, f as focusMenuItem } from './menu-popup-C0F4Fm9V-DMMCHJS2.mjs';
import { M as Menu, a as MenuItem } from './menu-Bxrz9siR.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps, memo } from '@solidjs/web';
import { createUniqueId, createEffect, omit, createContext, useContext } from 'solid-js';
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
var _d$$1 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2) {
  this[_m$$1] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    const props = this[_m$$1];
    const state = this[_m$2];
    return DisclosureStateProvider(new _P$$1(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p3, _p4) {
  this[_m$$1] = _p3;
  this[_m$2] = _p4;
  Object.defineProperty(this, "children", _d$2$1);
}
_P$2$1.prototype = Object.prototype;
var _d$3 = {
  get() {
    const Root = this[_m$$1];
    const disabledState = this[_m$2];
    const expandedState = this[_m$3];
    const rest = this[_m$4];
    const props = this[_m$5];
    const state = this[_m$6];
    return Root(mergeProps(CONTEXT_MENU_TAG, disabledState, expandedState, rest, new _P$2$1(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7, _p8, _p9, _p0, _p1) {
  this[_m$$1] = _p5;
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
    return this[_m$$1].boundaryID;
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const state = this[_m$2];
    const context = this[_m$$1];
    return memo(() => {
      return !!state.isOpen();
    })() ? context.panelID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p10, _p11, _p12) {
  this[_m$$1] = _p10;
  this[_m$2] = _p11;
  Object.defineProperty(this, "id", _d$4);
  this.ref = _p12;
  Object.defineProperty(this, "aria-controls", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p13) {
  this[_m$$1] = _p13;
  Object.defineProperty(this, "children", _d$6);
}
_P$5.prototype = Object.prototype;
var _d$7 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$5(props));
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p14) {
  this[_m$$1] = _p14;
  Object.defineProperty(this, "children", _d$7);
}
_P$6.prototype = Object.prototype;
var _d$8 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p15) {
  this[_m$$1] = _p15;
  Object.defineProperty(this, "children", _d$8);
}
_P$7.prototype = Object.prototype;
var _d$9 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$7(props));
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p16) {
  this[_m$$1] = _p16;
  Object.defineProperty(this, "children", _d$9);
}
_P$8.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$$1].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p17, _p18, _p19) {
  this[_m$$1] = _p17;
  Object.defineProperty(this, "id", _d$10);
  this.tabindex = _p18;
  this.ref = _p19;
}
_P$9.prototype = Object.prototype;
var _d$11 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p20) {
  this[_m$$1] = _p20;
  Object.defineProperty(this, "children", _d$11);
}
_P$10.prototype = Object.prototype;
var _d$12 = {
  get() {
    const props = this[_m$$1];
    return DisclosureStateChild(new _P$10(props));
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p21, _p22) {
  this[_m$$1] = _p21;
  this.value = _p22;
  Object.defineProperty(this, "children", _d$12);
}
_P$11.prototype = Object.prototype;
var _d$13 = {
  get() {
    const props = this[_m$$1];
    const node = this[_m$2];
    return PanelTreeContext(new _P$11(props, node));
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p23, _p24) {
  this[_m$$1] = _p23;
  this[_m$2] = _p24;
  Object.defineProperty(this, "children", _d$13);
}
_P$12.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$$1].unmount;
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
    const props = this[_m$$1];
    const node = this[_m$9];
    return Root(mergeProps(CONTEXT_MENU_PANEL_TAG, new _P$9(context, -1, panelRef), disabledState, expandedState, rest, new _P$12(props, node)));
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32, _p33) {
  this[_m$$1] = _p25;
  this[_m$2] = _p26;
  this[_m$3] = _p27;
  this[_m$4] = _p28;
  this[_m$5] = _p29;
  this[_m$6] = _p30;
  this[_m$7] = _p31;
  this[_m$8] = _p32;
  this[_m$9] = _p33;
  Object.defineProperty(this, "unmount", _d$14);
  Object.defineProperty(this, "when", _d$15);
  Object.defineProperty(this, "children", _d$16);
}
_P$13.prototype = Object.prototype;
var ContextMenuContext = createContext(null);
function useContextMenuContext(componentName) {
  const context = useContext(ContextMenuContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <ContextMenu>`));
  return context;
}
var CONTEXT_MENU_TAG = createTag("context-menu");
var CONTEXT_MENU_BOUNDARY_TAG = createTag("context-menu-boundary");
var CONTEXT_MENU_OVERLAY_TAG = createTag("context-menu-overlay");
var CONTEXT_MENU_PANEL_TAG = createTag("context-menu-panel");
function isContextMenuUncontrolled(props) {
  return "defaultOpen" in props;
}
function ContextMenu(props) {
  const ownerID = createUniqueId();
  const boundaryID = createUniqueId();
  const panelID = createUniqueId();
  const fsp = useFocusStartPoint();
  const state = createDisclosureState(props);
  createEffect(() => state.isOpen(), (flag) => {
    if (flag) fsp.save();
    else fsp.load();
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isContextMenuUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen");
  return ContextMenuContext(new _P$3(dynamic(() => props.as || "div"), disabledState, expandedState, rest, props, state, {
    ownerID,
    boundaryID,
    panelID
  }));
}
function ContextMenuBoundary(props) {
  const context = useContextMenuContext("ContextMenuBoundary");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      return useEventListener(current, "contextmenu", (e) => {
        if (!state.disabled()) {
          e.preventDefault();
          state.open();
        }
      });
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "div")(mergeProps(CONTEXT_MENU_BOUNDARY_TAG, new _P$4(context, state, setInternalRef), disabledState, expandedState, rest, new _P$6(props)));
}
function ContextMenuOverlay(props) {
  useContextMenuContext("ContextMenuOverlay");
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
  return dynamic(() => props.as || "div")(mergeProps(CONTEXT_MENU_OVERLAY_TAG, { ref: setInternalRef }, disabledState, expandedState, rest, new _P$8(props)));
}
function ContextMenuPanel(props) {
  const context = useContextMenuContext("ContextMenuPanel");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [node, panelRef] = createPanelNode(setInternalRef);
  createEffect(createDependencyList(() => [internalRef(), state.isOpen()]), ([current, isOpen]) => {
    if (current instanceof HTMLElement) {
      if (isOpen) {
        afterTransition(current, () => {
          if (!focusMenuItem(current) && !focusFirst(getFocusableElements(current), false)) current.focus();
        });
        return mergeFunc(useEventListener(current, "keydown", (e) => {
          if (!props.disabled) switch (e.key) {
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
        }), useEventListener(document, "click", (e) => {
          if (!node.contains(e.target)) state.close();
        }));
      }
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "unmount", "children", "ref");
  const Root = dynamic(() => props.as || "div");
  return Unmountable(new _P$13(props, state, Root, context, panelRef, disabledState, expandedState, rest, node));
}
var _tmpl$ = [
  "<div",
  ' class="stack stage-tall">',
  "</div>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const close = this[_m$];
    return [
      MenuItem({
        class: "menu-item",
        onClick: close,
        children: "Cut"
      }),
      MenuItem({
        class: "menu-item",
        onClick: close,
        children: "Copy"
      }),
      MenuItem({
        class: "menu-item",
        onClick: close,
        children: "Paste"
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return [
      ContextMenuBoundary({
        class: "contextmenu-boundary",
        children: "Right-click anywhere in this box"
      }),
      ContextMenuOverlay({ class: "contextmenu-overlay" }),
      ContextMenuPanel({
        class: "contextmenu-panel",
        children: ({ close }) => Menu(new _P$(close, "menu"))
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this.class = _p3;
  this.defaultOpen = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
function BasicContextMenu() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(ContextMenu(new _P$2("contextmenu", false)));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/context-menu/basic.tsx";

export { $$moduleUrl, BasicContextMenu as default };
//# sourceMappingURL=basic-Bll7fML7.mjs.map
