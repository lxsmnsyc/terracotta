import { v as createDisclosureState, u as useEventListener, y as useDisclosureState, b as createForwardRef, m as mergeFunc, U as Unmountable, e as createTag, f as assert, l as createExpandedState, G as DisclosureStateProvider, E as DisclosureStateChild, j as createDisabledState } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps, memo } from '@solidjs/web';
import { createUniqueId, onCleanup, createEffect, omit, createContext, useContext, untrack } from 'solid-js';
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

var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _m$7 = /* @__PURE__ */ Symbol();
var _d$$1 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2) {
  this[_m$] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return DisclosureStateProvider(new _P$$1(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p3, _p4) {
  this[_m$] = _p3;
  this[_m$2] = _p4;
  Object.defineProperty(this, "children", _d$2$1);
}
_P$2$1.prototype = Object.prototype;
var _d$3 = {
  get() {
    const Root = this[_m$];
    const disabledState = this[_m$2];
    const expandedState = this[_m$3];
    const rest = this[_m$4];
    const props = this[_m$5];
    const state = this[_m$6];
    return Root(mergeProps(TOOLTIP_TAG, disabledState, expandedState, rest, new _P$2$1(props, state)));
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
    return this[_m$].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p10, _p11, _p12) {
  this[_m$] = _p10;
  Object.defineProperty(this, "id", _d$4);
  this.role = _p11;
  this.ref = _p12;
}
_P$4.prototype = Object.prototype;
var _d$5 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p13) {
  this[_m$] = _p13;
  Object.defineProperty(this, "children", _d$5);
}
_P$5.prototype = Object.prototype;
var _d$6 = {
  get() {
    const props = this[_m$];
    return DisclosureStateChild(new _P$5(props));
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p14) {
  this[_m$] = _p14;
  Object.defineProperty(this, "children", _d$6);
}
_P$6.prototype = Object.prototype;
var _d$7 = {
  get() {
    return this[_m$].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    return this[_m$2].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    const Root = this[_m$3];
    const context = this[_m$4];
    const setInternalRef = this[_m$5];
    const expandedState = this[_m$6];
    const rest = this[_m$7];
    const props = this[_m$];
    return Root(mergeProps(TOOLTIP_PANEL_TAG, new _P$4(context, "tooltip", setInternalRef), expandedState, rest, new _P$6(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p15, _p16, _p17, _p18, _p19, _p20, _p21) {
  this[_m$] = _p15;
  this[_m$2] = _p16;
  this[_m$3] = _p17;
  this[_m$4] = _p18;
  this[_m$5] = _p19;
  this[_m$6] = _p20;
  this[_m$7] = _p21;
  Object.defineProperty(this, "unmount", _d$7);
  Object.defineProperty(this, "when", _d$8);
  Object.defineProperty(this, "children", _d$9);
}
_P$7.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$].triggerID;
  },
  enumerable: true,
  configurable: true
};
var _d$11 = {
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
function _P$8(_p22, _p23, _p24) {
  this[_m$] = _p22;
  this[_m$2] = _p23;
  Object.defineProperty(this, "id", _d$10);
  Object.defineProperty(this, "aria-describedby", _d$11);
  this.ref = _p24;
}
_P$8.prototype = Object.prototype;
var _d$12 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p25) {
  this[_m$] = _p25;
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
function _P$10(_p26) {
  this[_m$] = _p26;
  Object.defineProperty(this, "children", _d$13);
}
_P$10.prototype = Object.prototype;
var TooltipContext = createContext(null);
function useTooltipContext(componentName) {
  const context = useContext(TooltipContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Tooltip>`));
  return context;
}
var TOOLTIP_TAG = createTag("tooltip");
var TOOLTIP_TRIGGER_TAG = createTag("tooltip-trigger");
var TOOLTIP_PANEL_TAG = createTag("tooltip-panel");
function isTooltipUncontrolled(props) {
  return "defaultOpen" in props;
}
var DEFAULT_OPEN_DELAY = 300;
var DEFAULT_CLOSE_DELAY = 100;
function Tooltip(props) {
  const triggerID = createUniqueId();
  const panelID = createUniqueId();
  const state = createDisclosureState(props);
  let timer;
  function cancel() {
    if (timer !== void 0) {
      clearTimeout(timer);
      timer = void 0;
    }
  }
  function schedule(open, delay) {
    cancel();
    if (delay <= 0) state.setState(open);
    else timer = setTimeout(() => {
      timer = void 0;
      state.setState(open);
    }, delay);
  }
  onCleanup(cancel);
  createEffect(() => state.isOpen(), (isOpen) => {
    if (isOpen) return useEventListener(document, "keydown", (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        cancel();
        state.close();
      }
    }, true);
  });
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isTooltipUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen", "openDelay", "closeDelay") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen", "openDelay", "closeDelay");
  return TooltipContext(new _P$3(dynamic(() => props.as || "div"), disabledState, expandedState, rest, props, state, {
    triggerID,
    panelID,
    scheduleOpen() {
      schedule(true, untrack(() => {
        var _a;
        return (_a = props.openDelay) != null ? _a : DEFAULT_OPEN_DELAY;
      }));
    },
    scheduleClose() {
      const trigger = document.getElementById(triggerID);
      if (trigger && trigger.contains(document.activeElement)) {
        cancel();
        return;
      }
      schedule(false, untrack(() => {
        var _a;
        return (_a = props.closeDelay) != null ? _a : DEFAULT_CLOSE_DELAY;
      }));
    },
    openNow() {
      schedule(true, 0);
    },
    closeNow() {
      schedule(false, 0);
    },
    cancel
  }));
}
function TooltipPanel(props) {
  const context = useTooltipContext("TooltipPanel");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "pointerenter", () => {
      context.cancel();
    }), useEventListener(current, "pointerleave", () => {
      context.scheduleClose();
    }));
  });
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "unmount", "children", "ref");
  const Root = dynamic(() => props.as || "div");
  return Unmountable(new _P$7(props, state, Root, context, setInternalRef, expandedState, rest));
}
function TooltipTrigger(props) {
  const context = useTooltipContext("TooltipTrigger");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "pointerenter", () => {
      if (!state.disabled()) context.scheduleOpen();
    }), useEventListener(current, "pointerleave", () => {
      context.scheduleClose();
    }), useEventListener(current, "focus", () => {
      if (!state.disabled()) context.openNow();
    }), useEventListener(current, "blur", () => {
      context.closeNow();
    }));
  });
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "button")(mergeProps(TOOLTIP_TRIGGER_TAG, new _P$8(context, state, setInternalRef), expandedState, rest, new _P$10(props)));
}
var _tmpl$ = [
  "<div",
  ' class="stack stage-tall"><div class="row"><!--$-->',
  "<!--/--><!--$-->",
  '<!--/--></div><p class="hint"><kbd>Escape</kbd> hides the tooltip and leaves focus where it is.</p></div>'
];
var _d$ = {
  get() {
    return [TooltipTrigger({
      class: "button",
      children: "Save"
    }), TooltipPanel({
      class: "tooltip-panel",
      children: "Saves the file to your drive"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this.defaultOpen = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return [TooltipTrigger({
      class: "button",
      children: "Share"
    }), TooltipPanel({
      class: "tooltip-panel",
      children: "Copies a link anyone can open"
    })];
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
function BasicTooltip() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Tooltip(new _P$("tooltip", false))), _v$3 = escape(Tooltip(new _P$2("tooltip", false)));
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/tooltip/basic.tsx";

export { $$moduleUrl, BasicTooltip as default };
//# sourceMappingURL=basic-lIGaXfA2.mjs.map
