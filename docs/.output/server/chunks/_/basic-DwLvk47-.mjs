import { b as createForwardRef, m as mergeFunc, u as useEventListener, f as assert, e as createTag, j as createDisabledState, r as createARIADisabledState, ar as renderChildren } from '../routes/_..._.mjs';
import { c as createPartID } from './create-part-id-C9i7Veuh-CM2qScam.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps } from '@solidjs/web';
import { createSignal, untrack, createMemo, omit, createContext, createEffect, useContext } from 'solid-js';
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
var _d$$1 = {
  get() {
    return this[_m$$1].horizontal ? "" : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2) {
  this[_m$$1] = _p;
  Object.defineProperty(this, "tc-horizontal", _d$$1);
  this.ref = _p2;
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    const props = this[_m$$1];
    const state = this[_m$2];
    return renderChildren(props.children, state);
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this[_m$$1] = _p3;
  this[_m$2] = _p4;
  Object.defineProperty(this, "children", _d$2$1);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const Root = this[_m$$1];
    const props = this[_m$2];
    const setRef = this[_m$3];
    const disabledState = this[_m$4];
    const rest = this[_m$5];
    const state = this[_m$6];
    return Root(mergeProps(SPLITTER_TAG, new _P$$1(props, setRef), disabledState, rest, new _P$2(props, state)));
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
    var _a;
    const props = this[_m$$1];
    const context = this[_m$2];
    return (_a = props.id) != null ? _a : context.pane.id();
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    return this[_m$2].state.collapsed() ? "" : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p10, _p11) {
  this[_m$$1] = _p10;
  this[_m$2] = _p11;
  Object.defineProperty(this, "id", _d$4);
  Object.defineProperty(this, "tc-collapsed", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p12) {
  this[_m$$1] = _p12;
  Object.defineProperty(this, "children", _d$6);
}
_P$5.prototype = Object.prototype;
var _d$7 = {
  get() {
    const props = this[_m$$1];
    return SplitterStateChild(new _P$5(props));
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p13) {
  this[_m$$1] = _p13;
  Object.defineProperty(this, "children", _d$7);
}
_P$6.prototype = Object.prototype;
var _d$8 = {
  get() {
    return this[_m$$1].disabled() ? -1 : 0;
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    return this[_m$2].isHorizontal() ? "horizontal" : "vertical";
  },
  enumerable: true,
  configurable: true
};
var _d$10 = {
  get() {
    return this[_m$$1].value();
  },
  enumerable: true,
  configurable: true
};
var _d$11 = {
  get() {
    return this[_m$$1].min();
  },
  enumerable: true,
  configurable: true
};
var _d$12 = {
  get() {
    return this[_m$$1].max();
  },
  enumerable: true,
  configurable: true
};
var _d$13 = {
  get() {
    return this[_m$2].pane.id();
  },
  enumerable: true,
  configurable: true
};
var _d$14 = {
  get() {
    return this[_m$$1].collapsed() ? "" : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p14, _p15, _p16, _p17) {
  this[_m$$1] = _p14;
  this[_m$2] = _p15;
  this.role = _p16;
  Object.defineProperty(this, "tabindex", _d$8);
  Object.defineProperty(this, "aria-orientation", _d$9);
  Object.defineProperty(this, "aria-valuenow", _d$10);
  Object.defineProperty(this, "aria-valuemin", _d$11);
  Object.defineProperty(this, "aria-valuemax", _d$12);
  Object.defineProperty(this, "aria-controls", _d$13);
  Object.defineProperty(this, "tc-collapsed", _d$14);
  this.ref = _p17;
}
_P$7.prototype = Object.prototype;
var _d$15 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p18) {
  this[_m$$1] = _p18;
  Object.defineProperty(this, "children", _d$15);
}
_P$8.prototype = Object.prototype;
var _d$16 = {
  get() {
    const props = this[_m$$1];
    return SplitterStateChild(new _P$8(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p19) {
  this[_m$$1] = _p19;
  Object.defineProperty(this, "children", _d$16);
}
_P$9.prototype = Object.prototype;
var SplitterContext = createContext(null);
function useSplitterContext(componentName) {
  const context = useContext(SplitterContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Splitter>`));
  return context;
}
function useSplitterState() {
  return useSplitterContext("useSplitterState").state;
}
function SplitterStateChild(props) {
  const state = useSplitterState();
  return createMemo(() => renderChildren(props.children, state));
}
var SPLITTER_TAG = createTag("splitter");
var SPLITTER_PANE_TAG = createTag("splitter-pane");
var SPLITTER_SEPARATOR_TAG = createTag("splitter-separator");
function isSplitterUncontrolled(props) {
  return "defaultValue" in props;
}
var SPLITTER_OPTIONS = [
  "min",
  "max",
  "step",
  "horizontal",
  "disabled",
  "onChange"
];
function Splitter(props) {
  const pane = createPartID();
  const [ref, setRef] = createForwardRef(props);
  const min = () => {
    var _a;
    return (_a = props.min) != null ? _a : 0;
  };
  const max = () => {
    var _a;
    return Math.max(min(), (_a = props.max) != null ? _a : 100);
  };
  const step = () => props.step && props.step > 0 ? props.step : 5;
  const disabled = () => !!props.disabled;
  function clamp(value2) {
    return Math.min(max(), Math.max(min(), value2));
  }
  const [internal, setInternal] = createSignal(untrack(() => clamp(isSplitterUncontrolled(props) ? props.defaultValue : props.value)));
  const value = createMemo(() => isSplitterUncontrolled(props) ? internal() : clamp(props.value));
  let restoreTo;
  function setValue(next) {
    var _a;
    if (untrack(disabled) || !Number.isFinite(next)) return;
    const result = untrack(() => clamp(next));
    if (result === untrack(value)) return;
    if (isSplitterUncontrolled(props)) setInternal(result);
    (_a = props.onChange) == null ? void 0 : _a.call(props, result);
  }
  const state = {
    value,
    min,
    max,
    step,
    disabled,
    collapsed: () => value() <= min(),
    setValue,
    grow(steps = 1) {
      setValue(untrack(value) + untrack(step) * steps);
    },
    shrink(steps = 1) {
      setValue(untrack(value) - untrack(step) * steps);
    },
    toggle() {
      const current = untrack(value);
      if (current > untrack(min)) {
        restoreTo = current;
        setValue(untrack(min));
      } else setValue(restoreTo != null ? restoreTo : untrack(() => (min() + max()) / 2));
    }
  };
  const disabledState = createDisabledState(disabled);
  const rest = isSplitterUncontrolled(props) ? omit(props, "as", "children", "ref", "defaultValue", ...SPLITTER_OPTIONS) : omit(props, "as", "children", "ref", "value", ...SPLITTER_OPTIONS);
  return SplitterContext(new _P$3(dynamic(() => props.as || "div"), props, setRef, disabledState, rest, state, {
    state,
    pane,
    isHorizontal: () => !!props.horizontal,
    root: () => {
      const current = ref();
      return current instanceof HTMLElement ? current : void 0;
    }
  }));
}
function SplitterPane(props) {
  const context = useSplitterContext("SplitterPane");
  context.pane.register(() => props.id);
  const rest = omit(props, "as", "children");
  return dynamic(() => props.as || "div")(mergeProps(SPLITTER_PANE_TAG, new _P$4(props, context), rest, new _P$6(props)));
}
function SplitterSeparator(props) {
  const context = useSplitterContext("SplitterSeparator");
  const state = context.state;
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      let isReversed = function() {
        const root = context.root();
        return !context.isHorizontal() && !!root && getComputedStyle(root).direction === "rtl";
      }, setFromPointer = function(e) {
        const root = context.root();
        if (!root) return;
        const rect = root.getBoundingClientRect();
        let ratio;
        if (context.isHorizontal()) ratio = rect.height === 0 ? 0 : (e.clientY - rect.top) / rect.height;
        else {
          ratio = rect.width === 0 ? 0 : (e.clientX - rect.left) / rect.width;
          if (isReversed()) ratio = 1 - ratio;
        }
        const min = state.min();
        const max = state.max();
        const next = min + Math.min(1, Math.max(0, ratio)) * (max - min);
        state.setValue(Math.round(next * 100) / 100);
      };
      const separator = current;
      let pointer;
      return mergeFunc(useEventListener(separator, "keydown", (e) => {
        if (state.disabled()) return;
        const horizontal = context.isHorizontal();
        const towards = isReversed() ? "ArrowRight" : "ArrowLeft";
        const away = isReversed() ? "ArrowLeft" : "ArrowRight";
        switch (e.key) {
          case towards:
            if (horizontal) return;
            state.shrink();
            break;
          case away:
            if (horizontal) return;
            state.grow();
            break;
          case "ArrowUp":
            if (!horizontal) return;
            state.shrink();
            break;
          case "ArrowDown":
            if (!horizontal) return;
            state.grow();
            break;
          case "Enter":
            state.toggle();
            break;
          case "Home":
            state.setValue(state.min());
            break;
          case "End":
            state.setValue(state.max());
            break;
          default:
            return;
        }
        e.preventDefault();
      }), useEventListener(separator, "pointerdown", (e) => {
        if (state.disabled() || e.button !== 0) return;
        e.preventDefault();
        separator.focus();
        pointer = e.pointerId;
        if ("setPointerCapture" in separator) separator.setPointerCapture(e.pointerId);
      }), useEventListener(separator, "pointermove", (e) => {
        if (pointer === e.pointerId) setFromPointer(e);
      }), useEventListener(separator, "pointerup", (e) => {
        if (pointer === e.pointerId) {
          pointer = void 0;
          if ("releasePointerCapture" in separator) separator.releasePointerCapture(e.pointerId);
        }
      }), useEventListener(separator, "pointercancel", () => {
        pointer = void 0;
      }));
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "div")(mergeProps(SPLITTER_SEPARATOR_TAG, new _P$7(state, context, "separator", setInternalRef), disabledState, ariaDisabledState, rest, new _P$9(props)));
}
var _tmpl$ = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint"><kbd>Enter</kbd> collapses the contents to its smallest size, and restores it.</p></div>'
];
var _tmpl$2 = ["<p", ' id="splitter-contents" class="splitter-title">Contents</p>'];
var _tmpl$3 = ["<p", ' class="hint">Chapter 1, Chapter 2, Chapter 3</p>'];
var _tmpl$4 = ["<div", ' class="splitter-pane splitter-pane-rest"><p class="hint">Drag the bar, or focus it and use the arrow keys.</p></div>'];
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return { "flex-basis": `${this[_m$].value()}%` };
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    var _v$3, _v$4;
    return [(_v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3)), (_v$4 = ssrHydrationKey(), ssr(_tmpl$3, _v$4))];
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "style", _d$);
  Object.defineProperty(this, "children", _d$2);
}
_P$.prototype = Object.prototype;
function BasicSplitter() {
  var _v$ = ssrHydrationKey(), _v$2 = escape(Splitter({
    class: "splitter",
    defaultValue: 35,
    min: 15,
    max: 70,
    children: (state) => {
      var _v$5;
      return [
        SplitterPane(new _P$(state, "splitter-pane")),
        SplitterSeparator({
          class: "splitter-separator",
          "aria-labelledby": "splitter-contents"
        }),
        (_v$5 = ssrHydrationKey(), ssr(_tmpl$4, _v$5))
      ];
    }
  }));
  return ssr(_tmpl$, _v$, _v$2);
}
var $$moduleUrl = "src/demos/splitter/basic.tsx";

export { $$moduleUrl, BasicSplitter as default };
//# sourceMappingURL=basic-DwLvk47-.mjs.map
