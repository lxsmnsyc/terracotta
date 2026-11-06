import { I as createPresence, b as createForwardRef, m as mergeFunc, u as useEventListener, e as createTag, f as assert, Q as MinusIcon, j as createDisabledState, aw as PlusIcon, ar as renderChildren } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, mergeProps, memo } from '@solidjs/web';
import { createUniqueId, createSignal, untrack, createMemo, omit, createContext, createEffect, useContext } from 'solid-js';
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
var _d$$1 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    return renderChildren(props.children, state);
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
var _d$2$1 = {
  get() {
    const Root = this[_m$];
    const disabledState = this[_m$2];
    const rest = this[_m$3];
    const props = this[_m$4];
    const state = this[_m$5];
    return Root(mergeProps(SPINBUTTON_TAG, disabledState, rest, new _P$$1(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p3, _p4, _p5, _p6, _p7, _p8) {
  this[_m$] = _p3;
  this[_m$2] = _p4;
  this[_m$3] = _p5;
  this[_m$4] = _p6;
  this[_m$5] = _p7;
  this.value = _p8;
  Object.defineProperty(this, "children", _d$2$1);
}
_P$2$1.prototype = Object.prototype;
var _d$3$1 = {
  get() {
    return this[_m$].inputID;
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    const canStep = this[_m$2];
    return !canStep();
  },
  enumerable: true,
  configurable: true
};
function _P$3$1(_p9, _p0, _p1, _p10, _p11) {
  this[_m$] = _p9;
  this[_m$2] = _p0;
  this.type = _p1;
  this.tabindex = _p10;
  Object.defineProperty(this, "aria-controls", _d$3$1);
  Object.defineProperty(this, "disabled", _d$4);
  this.ref = _p11;
}
_P$3$1.prototype = Object.prototype;
var _d$5 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p12) {
  this[_m$] = _p12;
  Object.defineProperty(this, "children", _d$5);
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    const props = this[_m$];
    return SpinbuttonStateChild(new _P$4(props));
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
    return this[_m$].inputID;
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    var _a;
    const context = this[_m$];
    const state = this[_m$2];
    return (_a = context.draft()) != null ? _a : context.format(state.value());
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    return this[_m$2].value();
  },
  enumerable: true,
  configurable: true
};
var _d$10 = {
  get() {
    return this[_m$2].min();
  },
  enumerable: true,
  configurable: true
};
var _d$11 = {
  get() {
    return this[_m$2].max();
  },
  enumerable: true,
  configurable: true
};
var _d$12 = {
  get() {
    return this[_m$].valueText();
  },
  enumerable: true,
  configurable: true
};
var _d$13 = {
  get() {
    const isInvalid = this[_m$3];
    return isInvalid() ? "true" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$14 = {
  get() {
    const context = this[_m$];
    return memo(() => {
      return !!context.label.isPresent();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$15 = {
  get() {
    return this[_m$2].disabled();
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p14, _p15, _p16, _p17, _p18, _p19, _p20, _p21) {
  this[_m$] = _p14;
  this[_m$2] = _p15;
  this[_m$3] = _p16;
  Object.defineProperty(this, "id", _d$7);
  this.type = _p17;
  this.inputmode = _p18;
  this.autocomplete = _p19;
  this.role = _p20;
  Object.defineProperty(this, "value", _d$8);
  Object.defineProperty(this, "aria-valuenow", _d$9);
  Object.defineProperty(this, "aria-valuemin", _d$10);
  Object.defineProperty(this, "aria-valuemax", _d$11);
  Object.defineProperty(this, "aria-valuetext", _d$12);
  Object.defineProperty(this, "aria-invalid", _d$13);
  Object.defineProperty(this, "aria-labelledby", _d$14);
  Object.defineProperty(this, "disabled", _d$15);
  this.ref = _p21;
}
_P$6.prototype = Object.prototype;
var _d$16 = {
  get() {
    return this[_m$].labelID;
  },
  enumerable: true,
  configurable: true
};
var _d$17 = {
  get() {
    return this[_m$].inputID;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p22) {
  this[_m$] = _p22;
  Object.defineProperty(this, "id", _d$16);
  Object.defineProperty(this, "for", _d$17);
}
_P$7.prototype = Object.prototype;
var SpinbuttonContext = createContext(null);
function useSpinbuttonContext(componentName) {
  const context = useContext(SpinbuttonContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Spinbutton>`));
  return context;
}
function useSpinbuttonState() {
  return useSpinbuttonContext("useSpinbuttonState").state;
}
function SpinbuttonStateChild(props) {
  const state = useSpinbuttonState();
  return createMemo(() => renderChildren(props.children, state));
}
var SPINBUTTON_TAG = createTag("spinbutton");
var SPINBUTTON_LABEL_TAG = createTag("spinbutton-label");
var SPINBUTTON_INPUT_TAG = createTag("spinbutton-input");
var SPINBUTTON_INCREMENT_TAG = createTag("spinbutton-increment");
var SPINBUTTON_DECREMENT_TAG = createTag("spinbutton-decrement");
function isSpinbuttonUncontrolled(props) {
  return "defaultValue" in props;
}
var SPINBUTTON_OPTIONS = [
  "min",
  "max",
  "step",
  "largeStep",
  "disabled",
  "formatValue",
  "parseValue",
  "getValueText",
  "onChange"
];
function decimalsOf(value) {
  const [mantissa, exponent] = String(value).split("e");
  const index = mantissa.indexOf(".");
  const digits = index === -1 ? 0 : mantissa.length - index - 1;
  return Math.max(0, digits - Number(exponent != null ? exponent : 0));
}
function defaultParse(text) {
  return text.trim() === "" ? NaN : Number(text);
}
function Spinbutton(props) {
  const labelID = createUniqueId();
  const inputID = createUniqueId();
  const label = createPresence();
  const min = () => props.min;
  const max = () => {
    const lo = props.min;
    const hi = props.max;
    return hi != null && lo != null ? Math.max(lo, hi) : hi;
  };
  const step = () => props.step && props.step > 0 ? props.step : 1;
  const disabled = () => !!props.disabled;
  function clamp(value2) {
    const lo = min();
    const hi = max();
    let result = value2;
    if (lo != null && result < lo) result = lo;
    if (hi != null && result > hi) result = hi;
    return result;
  }
  function snap(value2) {
    var _a;
    const hi = max();
    if (hi != null && value2 >= hi) return hi;
    const base = (_a = min()) != null ? _a : 0;
    const size = step();
    const snapped = Math.round((value2 - base) / size) * size + base;
    return Number(clamp(snapped).toFixed(Math.max(decimalsOf(base), decimalsOf(size))));
  }
  const [internal, setInternal] = createSignal(untrack(() => snap(isSpinbuttonUncontrolled(props) ? props.defaultValue : props.value)));
  const value = createMemo(() => isSpinbuttonUncontrolled(props) ? internal() : snap(props.value));
  function setValue(next) {
    var _a;
    const current = untrack(value);
    if (untrack(disabled) || !Number.isFinite(next)) return current;
    const result = untrack(() => snap(next));
    if (result === current) return current;
    if (isSpinbuttonUncontrolled(props)) setInternal(result);
    (_a = props.onChange) == null ? void 0 : _a.call(props, result);
    return result;
  }
  const state = {
    value,
    min,
    max,
    step,
    disabled,
    canIncrement() {
      const hi = max();
      return !disabled() && (hi == null || value() < hi);
    },
    canDecrement() {
      const lo = min();
      return !disabled() && (lo == null || value() > lo);
    },
    setValue(next) {
      setValue(next);
    },
    increment(steps = 1) {
      setValue(commit() + untrack(step) * steps);
    },
    decrement(steps = 1) {
      setValue(commit() - untrack(step) * steps);
    }
  };
  let input;
  const [draft, setDraft] = createSignal();
  function parseText(text) {
    var _a;
    return ((_a = props.parseValue) != null ? _a : defaultParse)(text);
  }
  function commit() {
    const text = untrack(draft);
    if (text === void 0) return untrack(value);
    setDraft(void 0);
    return setValue(parseText(text));
  }
  const disabledState = createDisabledState(disabled);
  const rest = isSpinbuttonUncontrolled(props) ? omit(props, "as", "children", "defaultValue", ...SPINBUTTON_OPTIONS) : omit(props, "as", "children", "value", ...SPINBUTTON_OPTIONS);
  return SpinbuttonContext(new _P$2$1(dynamic(() => props.as || "div"), disabledState, rest, props, state, {
    state,
    labelID,
    inputID,
    label,
    largeStep: () => {
      var _a;
      return (_a = props.largeStep) != null ? _a : 10;
    },
    valueText: () => {
      var _a;
      return (_a = props.getValueText) == null ? void 0 : _a.call(props, value());
    },
    format: (current) => {
      var _a;
      return ((_a = props.formatValue) != null ? _a : String)(current);
    },
    parse: parseText,
    snap: (current) => untrack(() => snap(current)),
    draft,
    setDraft,
    commit,
    focusInput() {
      input == null ? void 0 : input.focus();
    },
    setInput(element) {
      input = element;
    }
  }));
}
function createStepButton(direction) {
  const name = direction === 1 ? "SpinbuttonIncrement" : "SpinbuttonDecrement";
  const tag = direction === 1 ? SPINBUTTON_INCREMENT_TAG : SPINBUTTON_DECREMENT_TAG;
  return function StepButton(props) {
    const context = useSpinbuttonContext(name);
    const state = context.state;
    const [internalRef, setInternalRef] = createForwardRef(props);
    const canStep = () => direction === 1 ? state.canIncrement() : state.canDecrement();
    createEffect(internalRef, (current) => {
      if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "pointerdown", (e) => {
        e.preventDefault();
      }), useEventListener(current, "click", () => {
        if (!canStep()) return;
        if (direction === 1) state.increment();
        else state.decrement();
        context.focusInput();
      }));
    });
    const disabledState = createDisabledState(() => !canStep());
    const rest = omit(props, "as", "children", "ref");
    return dynamic(() => props.as || "button")(mergeProps(tag, new _P$3$1(context, canStep, "button", -1, setInternalRef), disabledState, rest, new _P$5(props)));
  };
}
var SpinbuttonIncrement = createStepButton(1);
var SpinbuttonDecrement = createStepButton(-1);
function SpinbuttonInput(props) {
  const context = useSpinbuttonContext("SpinbuttonInput");
  const state = context.state;
  const [internalRef, setInternalRef] = createForwardRef(props);
  function inRange(value) {
    const lo = state.min();
    const hi = state.max();
    return (lo == null || value >= lo) && (hi == null || value <= hi);
  }
  const isInvalid = () => {
    const text = context.draft();
    if (text === void 0) return false;
    const parsed = context.parse(text);
    return !Number.isFinite(parsed) || !inRange(parsed);
  };
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.setInput(current);
      return mergeFunc(() => {
        context.setInput(void 0);
      }, useEventListener(current, "input", () => {
        if (!(current instanceof HTMLInputElement)) return;
        const text = current.value;
        context.setDraft(text);
        const parsed = context.parse(text);
        if (Number.isFinite(parsed) && inRange(parsed) && context.snap(parsed) === parsed) state.setValue(parsed);
      }), useEventListener(current, "blur", () => {
        context.commit();
      }), useEventListener(current, "keydown", (e) => {
        if (state.disabled()) return;
        switch (e.key) {
          case "Enter":
            context.commit();
            return;
          case "ArrowUp":
            state.increment();
            break;
          case "ArrowDown":
            state.decrement();
            break;
          case "PageUp":
            state.increment(context.largeStep());
            break;
          case "PageDown":
            state.decrement(context.largeStep());
            break;
          case "Home": {
            const lo = state.min();
            if (lo == null) return;
            context.commit();
            state.setValue(lo);
            break;
          }
          case "End": {
            const hi = state.max();
            if (hi == null) return;
            context.commit();
            state.setValue(hi);
            break;
          }
          default:
            return;
        }
        e.preventDefault();
      }));
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const rest = omit(props, "as", "ref");
  return dynamic(() => props.as || "input")(mergeProps(SPINBUTTON_INPUT_TAG, new _P$6(context, state, isInvalid, "text", "decimal", "off", "spinbutton", setInternalRef), disabledState, rest));
}
function SpinbuttonLabel(props) {
  const context = useSpinbuttonContext("SpinbuttonLabel");
  context.label.register();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "label")(mergeProps(SPINBUTTON_LABEL_TAG, new _P$7(context), rest));
}
var _tmpl$ = [
  "<div",
  ' class="spinbutton-group"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$2 = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><p class="hint"><kbd>&#8593;</kbd> and <kbd>&#8595;</kbd> step, <kbd>Home</kbd> and <kbd>End</kbd> jump to the limits.</p></div>'
];
var _d$ = {
  get() {
    return MinusIcon({});
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this.class = _p;
  this["aria-label"] = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return PlusIcon({});
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this.class = _p3;
  this["aria-label"] = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    var _v$2, _v$3, _v$4, _v$5;
    return [SpinbuttonLabel({
      class: "spinbutton-label",
      children: "Adults"
    }), (_v$2 = ssrHydrationKey(), _v$3 = escape(SpinbuttonDecrement(new _P$("spinbutton-button", "Fewer adults"))), _v$4 = escape(SpinbuttonInput({ class: "spinbutton-input" })), _v$5 = escape(SpinbuttonIncrement(new _P$2("spinbutton-button", "More adults"))), ssr(_tmpl$, _v$2, _v$3, _v$4, _v$5))];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7, _p8) {
  this.class = _p5;
  this.defaultValue = _p6;
  this.min = _p7;
  this.max = _p8;
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
function BasicSpinbutton() {
  var _v$ = ssrHydrationKey(), _v$6 = escape(Spinbutton(new _P$3("spinbutton", 2, 1, 8)));
  return ssr(_tmpl$2, _v$, _v$6);
}
var $$moduleUrl = "src/demos/spinbutton/basic.tsx";

export { $$moduleUrl, BasicSpinbutton as default };
//# sourceMappingURL=basic-lAM7h9Bp.mjs.map
