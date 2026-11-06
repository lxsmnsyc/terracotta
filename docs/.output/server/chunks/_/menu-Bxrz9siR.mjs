import { b as createForwardRef, u as useEventListener, F as FocusNavigator, am as createTypeAhead, m as mergeFunc, $ as DISABLED_NODE, q as createOwnerAttribute, B as Button, f as assert, e as createTag, j as createDisabledState, r as createARIADisabledState } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { createSignal, createMemo, createEffect, omit, createUniqueId, createContext, useContext } from 'solid-js';

var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _m$7 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const Root = this[_m$];
    const controllerId = this[_m$2];
    const setRef = this[_m$3];
    const rest = this[_m$4];
    return Root(mergeProps(MENU_TAG, {
      id: controllerId,
      role: "menu",
      ref: setRef
    }, rest));
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4, _p5) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this[_m$3] = _p3;
  this[_m$4] = _p4;
  this.value = _p5;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    const Root = this[_m$];
    const controllerId = this[_m$2];
    const setRef = this[_m$3];
    const rest = this[_m$4];
    return MenubarContext(new _P$(Root, controllerId, setRef, rest, null));
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p6, _p7, _p8, _p9, _p0) {
  this[_m$] = _p6;
  this[_m$2] = _p7;
  this[_m$3] = _p8;
  this[_m$4] = _p9;
  this.value = _p0;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const isHorizontal = this[_m$];
    return isHorizontal() ? "horizontal" : "vertical";
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p1, _p10, _p11, _p12) {
  this[_m$] = _p1;
  this.id = _p10;
  this.role = _p11;
  Object.defineProperty(this, "aria-orientation", _d$3);
  this.ref = _p12;
}
_P$3.prototype = Object.prototype;
var _d$4 = {
  get() {
    const Root = this[_m$];
    const isHorizontal = this[_m$2];
    const controllerId = this[_m$3];
    const setRef = this[_m$4];
    const rest = this[_m$5];
    return Root(mergeProps(MENUBAR_TAG, new _P$3(isHorizontal, controllerId, "menubar", setRef), rest));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p13, _p14, _p15, _p16, _p17, _p18) {
  this[_m$] = _p13;
  this[_m$2] = _p14;
  this[_m$3] = _p15;
  this[_m$4] = _p16;
  this[_m$5] = _p17;
  this.value = _p18;
  Object.defineProperty(this, "children", _d$4);
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    const Root = this[_m$];
    const isHorizontal = this[_m$2];
    const controllerId = this[_m$3];
    const setRef = this[_m$4];
    const rest = this[_m$5];
    const stop = this[_m$6];
    const setItems = this[_m$7];
    return MenubarContext(new _P$4(Root, isHorizontal, controllerId, setRef, rest, {
      stop,
      register(element, disabled) {
        const item = {
          element,
          disabled
        };
        setItems((list) => [...list, item]);
        return () => {
          setItems((list) => list.filter((entry) => entry !== item));
        };
      }
    }));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p19, _p20, _p21, _p22, _p23, _p24, _p25, _p26) {
  this[_m$] = _p19;
  this[_m$2] = _p20;
  this[_m$3] = _p21;
  this[_m$4] = _p22;
  this[_m$5] = _p23;
  this[_m$6] = _p24;
  this[_m$7] = _p25;
  this.value = _p26;
  Object.defineProperty(this, "children", _d$5);
}
_P$5.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$].as || "li";
  },
  enumerable: true,
  configurable: true
};
var _d$7 = {
  get() {
    const tabStop = this[_m$2];
    const internalRef = this[_m$3];
    return tabStop && tabStop.stop() === internalRef() ? 0 : -1;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p27, _p28, _p29, _p30, _p31) {
  this[_m$] = _p27;
  this[_m$2] = _p28;
  this[_m$3] = _p29;
  Object.defineProperty(this, "as", _d$6);
  this.role = _p30;
  Object.defineProperty(this, "tabindex", _d$7);
  this.ref = _p31;
}
_P$6.prototype = Object.prototype;
var _d$8 = {
  get() {
    return this[_m$].disabled;
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p32) {
  this[_m$] = _p32;
  Object.defineProperty(this, "disabled", _d$8);
  Object.defineProperty(this, "children", _d$9);
}
_P$7.prototype = Object.prototype;
var _d$10 = {
  get() {
    const props = this[_m$];
    return MenuChild(new _P$7(props));
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p33) {
  this[_m$] = _p33;
  Object.defineProperty(this, "children", _d$10);
}
_P$8.prototype = Object.prototype;
var MenuContext = createContext(null);
function useMenuContext(componentName) {
  const context = useContext(MenuContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Menu>`));
  return context;
}
function createMenuItemFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}
var MenubarContext = createContext(null);
var MENU_TAG = createTag("menu");
var MENU_ITEM_TAG = createTag("menu-item");
var MENUBAR_TAG = createTag("menubar");
var OWNER_ATTRIBUTE$1 = `tc-owner`;
function findMatch(root, ownerID, value) {
  const items = Array.from(root.querySelectorAll(`[${OWNER_ATTRIBUTE$1}="${ownerID}"]:not(${DISABLED_NODE})`));
  const focused = document.activeElement;
  const index = items.findIndex((item) => item === focused || item.contains(focused));
  let start = 0;
  if (index !== -1) start = value.length === 1 ? index + 1 : index;
  const query = value.toLowerCase();
  for (let i = 0, len = items.length; i < len; i += 1) {
    const item = items[(start + i) % len];
    if (item.textContent.trim().toLowerCase().startsWith(query)) return item;
  }
}
function createMenuKeyboard(ref, controller, options) {
  const pushCharacter = createTypeAhead((value) => {
    const current = ref();
    if (current instanceof HTMLElement) {
      const match = findMatch(current, controller.getId(), value);
      if (match) controller.setChecked(match);
    }
  });
  function accepts(axis) {
    const orientation = options.orientation();
    return orientation === "both" || orientation === axis;
  }
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      return mergeFunc(() => {
        controller.clearRef();
      }, useEventListener(current, "keydown", (e) => {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowLeft":
            if (accepts(e.key === "ArrowUp" ? "vertical" : "horizontal")) {
              e.preventDefault();
              controller.setPrevChecked(true);
            }
            break;
          case "ArrowDown":
          case "ArrowRight":
            if (accepts(e.key === "ArrowDown" ? "vertical" : "horizontal")) {
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
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) pushCharacter(e.key);
        }
      }), useEventListener(current, "focusin", (e) => {
        if (e.target && e.target !== current) controller.setCurrent(e.target);
      }));
    }
  });
}
function Menu(props) {
  const controller = createMenuItemFocusNavigator();
  const [ref, setRef] = createForwardRef(props);
  createMenuKeyboard(ref, controller, { orientation: () => "both" });
  const controllerId = controller.getId();
  const rest = omit(props, "as", "ref");
  return MenuContext(new _P$2(dynamic(() => props.as || "div"), controllerId, setRef, rest, controller));
}
var OWNER_ATTRIBUTE = `tc-owner`;
function Menubar(props) {
  const controller = createMenuItemFocusNavigator();
  const controllerId = controller.getId();
  const [ref, setRef] = createForwardRef(props);
  const [items, setItems] = createSignal([]);
  const [focused, setFocused] = createSignal();
  const stop = createMemo(() => {
    var _a, _b;
    const list = items();
    const current = focused();
    if (current && list.some((item) => item.element === current)) return current;
    const sorted = [...list].sort((a, b) => a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
    return (_b = (_a = sorted.find((item) => !item.disabled())) != null ? _a : sorted.at(0)) == null ? void 0 : _b.element;
  });
  const isHorizontal = () => {
    var _a;
    return (_a = props.horizontal) != null ? _a : true;
  };
  createMenuKeyboard(ref, controller, { orientation: () => isHorizontal() ? "horizontal" : "vertical" });
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "focusin", (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.getAttribute(OWNER_ATTRIBUTE) === controllerId) setFocused(target);
    });
  });
  const rest = omit(props, "as", "horizontal", "ref");
  return MenuContext(new _P$5(dynamic(() => props.as || "div"), isHorizontal, controllerId, setRef, rest, stop, setItems, controller));
}
function MenuChild(props) {
  return createMemo(() => {
    const body = props.children;
    if (typeof body === "function") return body({ disabled: () => !!props.disabled });
    return body;
  });
}
function MenuItem(props) {
  const context = useMenuContext("MenuItem");
  const tabStop = useContext(MenubarContext);
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (tabStop && current instanceof HTMLElement) return tabStop.register(current, () => !!props.disabled);
  });
  const ownerAttribute = createOwnerAttribute(context.getId());
  const disabledState = createDisabledState(() => props.disabled);
  const ariaDisabledState = createARIADisabledState(() => props.disabled);
  const rest = omit(props, "as", "disabled", "ref", "children");
  return Button(mergeProps(MENU_ITEM_TAG, ownerAttribute, new _P$6(props, tabStop, internalRef, "menuitem", setInternalRef), disabledState, ariaDisabledState, rest, new _P$8(props)));
}

export { Menu as M, MenuItem as a, Menubar as b };
//# sourceMappingURL=menu-Bxrz9siR.mjs.map
