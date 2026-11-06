import { I as createPresence, b as createForwardRef, u as useEventListener, m as mergeFunc, f as assert, e as createTag, j as createDisabledState, z as createDependencyList, ar as renderChildren, r as createARIADisabledState } from '../routes/_..._.mjs';
import { dynamic, mergeProps, memo, ssrHydrationKey, ssr, ssrAttribute, escape } from '@solidjs/web';
import { createUniqueId, untrack, createSignal, createMemo, omit, createContext, createEffect, useContext, For } from 'solid-js';

var _tmpl$ = [
  "<input",
  ' type="hidden"',
  "",
  ">"
];
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
    const isGroup = this[_m$];
    return isGroup() ? "group" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    const isGroup = this[_m$];
    const label = this[_m$2];
    const labelID = this[_m$3];
    return isGroup() && label.isPresent() ? labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$3 = {
  get() {
    return this[_m$4].vertical ? "" : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3, _p4) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this[_m$3] = _p3;
  this[_m$4] = _p4;
  Object.defineProperty(this, "role", _d$);
  Object.defineProperty(this, "aria-labelledby", _d$2);
  Object.defineProperty(this, "tc-vertical", _d$3);
}
_P$.prototype = Object.prototype;
var _d$4 = {
  get() {
    const values = this[_m$];
    return values();
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p5, _p6) {
  this[_m$] = _p5;
  Object.defineProperty(this, "each", _d$4);
  this.children = _p6;
}
_P$2.prototype = Object.prototype;
var _d$5 = {
  get() {
    const props = this[_m$];
    const state = this[_m$2];
    const values = this[_m$3];
    return [memo(() => {
      return renderChildren(props.children, state);
    }), memo(() => {
      return memo(() => {
        return props.name != null;
      })() && For(new _P$2(values, (value) => {
        var _v$, _v$2;
        return _v$ = ssrHydrationKey(), _v$2 = () => {
          return ssrAttribute("name", escape(props.name, true));
        }, ssr(_tmpl$, _v$, _v$2, ssrAttribute("value", escape(value, true)));
      }));
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p7, _p8, _p9) {
  this[_m$] = _p7;
  this[_m$2] = _p8;
  this[_m$3] = _p9;
  Object.defineProperty(this, "children", _d$5);
}
_P$3.prototype = Object.prototype;
var _d$6 = {
  get() {
    const Root = this[_m$];
    const isGroup = this[_m$2];
    const label = this[_m$3];
    const labelID = this[_m$4];
    const props = this[_m$5];
    const disabledState = this[_m$6];
    const rest = this[_m$7];
    const state = this[_m$8];
    const values = this[_m$9];
    return Root(mergeProps(SLIDER_TAG, new _P$(isGroup, label, labelID, props), disabledState, rest, new _P$3(props, state, values)));
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p0, _p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17) {
  this[_m$] = _p0;
  this[_m$2] = _p1;
  this[_m$3] = _p10;
  this[_m$4] = _p11;
  this[_m$5] = _p12;
  this[_m$6] = _p13;
  this[_m$7] = _p14;
  this[_m$8] = _p15;
  this[_m$9] = _p16;
  this.value = _p17;
  Object.defineProperty(this, "children", _d$6);
}
_P$4.prototype = Object.prototype;
var _d$7 = {
  get() {
    return this[_m$].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p18, _p19) {
  this[_m$] = _p18;
  Object.defineProperty(this, "id", _d$7);
  this.ref = _p19;
}
_P$5.prototype = Object.prototype;
var _d$8 = {
  get() {
    const context = this[_m$];
    const index = this[_m$2];
    return context.thumbID(index());
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    return this[_m$3].disabled() ? -1 : 0;
  },
  enumerable: true,
  configurable: true
};
var _d$10 = {
  get() {
    const state = this[_m$3];
    const index = this[_m$2];
    return state.values()[index()];
  },
  enumerable: true,
  configurable: true
};
var _d$11 = {
  get() {
    const state = this[_m$3];
    const index = this[_m$2];
    return state.thumbMin(index());
  },
  enumerable: true,
  configurable: true
};
var _d$12 = {
  get() {
    const state = this[_m$3];
    const index = this[_m$2];
    return state.thumbMax(index());
  },
  enumerable: true,
  configurable: true
};
var _d$13 = {
  get() {
    const context = this[_m$];
    const index = this[_m$2];
    return context.valueText(index());
  },
  enumerable: true,
  configurable: true
};
var _d$14 = {
  get() {
    return this[_m$].isVertical() ? "vertical" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$15 = {
  get() {
    const context = this[_m$];
    return memo(() => {
      return !!(!context.isGroup() && context.label.isPresent());
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p20, _p21, _p22, _p23, _p24) {
  this[_m$] = _p20;
  this[_m$2] = _p21;
  this[_m$3] = _p22;
  Object.defineProperty(this, "id", _d$8);
  this.role = _p23;
  Object.defineProperty(this, "tabindex", _d$9);
  Object.defineProperty(this, "aria-valuenow", _d$10);
  Object.defineProperty(this, "aria-valuemin", _d$11);
  Object.defineProperty(this, "aria-valuemax", _d$12);
  Object.defineProperty(this, "aria-valuetext", _d$13);
  Object.defineProperty(this, "aria-orientation", _d$14);
  Object.defineProperty(this, "aria-labelledby", _d$15);
  this.ref = _p24;
}
_P$6.prototype = Object.prototype;
var _d$16 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p25) {
  this[_m$] = _p25;
  Object.defineProperty(this, "children", _d$16);
}
_P$7.prototype = Object.prototype;
var _d$17 = {
  get() {
    const props = this[_m$];
    return SliderStateChild(new _P$7(props));
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p26) {
  this[_m$] = _p26;
  Object.defineProperty(this, "children", _d$17);
}
_P$8.prototype = Object.prototype;
var _d$18 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p27) {
  this[_m$] = _p27;
  Object.defineProperty(this, "children", _d$18);
}
_P$9.prototype = Object.prototype;
var _d$19 = {
  get() {
    const props = this[_m$];
    return SliderStateChild(new _P$9(props));
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p28) {
  this[_m$] = _p28;
  Object.defineProperty(this, "children", _d$19);
}
_P$10.prototype = Object.prototype;
var SliderContext = createContext(null);
function useSliderContext(componentName) {
  const context = useContext(SliderContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Slider>`));
  return context;
}
function useSliderState() {
  return useSliderContext("useSliderState").state;
}
function SliderStateChild(props) {
  const state = useSliderState();
  return createMemo(() => renderChildren(props.children, state));
}
var SLIDER_TAG = createTag("slider");
var SLIDER_LABEL_TAG = createTag("slider-label");
var SLIDER_TRACK_TAG = createTag("slider-track");
var SLIDER_THUMB_TAG = createTag("slider-thumb");
function isSliderUncontrolled(props) {
  return "defaultValue" in props;
}
function toArray(value) {
  return typeof value === "number" ? [value] : [...value];
}
var SLIDER_OPTIONS = [
  "min",
  "max",
  "step",
  "largeStep",
  "vertical",
  "disabled",
  "getValueText",
  "name",
  "onChange"
];
function decimalsOf(value) {
  const [mantissa, exponent] = String(value).split("e");
  const index = mantissa.indexOf(".");
  const digits = index === -1 ? 0 : mantissa.length - index - 1;
  return Math.max(0, digits - Number(exponent != null ? exponent : 0));
}
function Slider(props) {
  const labelID = createUniqueId();
  const thumbBaseID = createUniqueId();
  const label = createPresence();
  const min = () => {
    var _a;
    return (_a = props.min) != null ? _a : 0;
  };
  const max = () => {
    var _a;
    return Math.max(min(), (_a = props.max) != null ? _a : 100);
  };
  const step = () => props.step && props.step > 0 ? props.step : 1;
  const disabled = () => !!props.disabled;
  function snap(value) {
    const lo = min();
    const hi = max();
    const size = step();
    if (value >= hi) return hi;
    const snapped = Math.round((value - lo) / size) * size + lo;
    return Number(Math.min(hi, Math.max(lo, snapped)).toFixed(Math.max(decimalsOf(lo), decimalsOf(size))));
  }
  function normalize(value) {
    return toArray(value).map(snap).sort((a, b) => a - b);
  }
  const initial = untrack(() => isSliderUncontrolled(props) ? props.defaultValue : props.value);
  const isArray = typeof initial !== "number";
  const [internal, setInternal] = createSignal(untrack(() => normalize(initial)));
  const values = createMemo(() => isSliderUncontrolled(props) ? internal() : normalize(props.value));
  function thumbMin(index) {
    var _a;
    return index > 0 ? (_a = values()[index - 1]) != null ? _a : min() : min();
  }
  function thumbMax(index) {
    var _a;
    return (_a = values()[index + 1]) != null ? _a : max();
  }
  function setThumbValue(index, next) {
    var _a;
    if (untrack(disabled)) return;
    const current = untrack(values);
    if (index < 0 || index >= current.length) return;
    const value = untrack(() => Math.min(thumbMax(index), Math.max(thumbMin(index), snap(next))));
    if (value === current[index]) return;
    const updated = [...current];
    updated[index] = value;
    if (isSliderUncontrolled(props)) setInternal(updated);
    (_a = props.onChange) == null ? void 0 : _a.call(props, isArray ? updated : updated[0]);
  }
  function valueAt(index) {
    var _a;
    return (_a = values()[index]) != null ? _a : min();
  }
  const state = {
    value: () => valueAt(0),
    values,
    min,
    max,
    step,
    percent(index = 0) {
      const range = max() - min();
      return range === 0 ? 0 : (valueAt(index) - min()) / range * 100;
    },
    disabled,
    setValue(value) {
      setThumbValue(0, value);
    },
    setThumbValue,
    thumbMin,
    thumbMax,
    increment(steps = 1, index = 0) {
      setThumbValue(index, untrack(() => valueAt(index)) + untrack(step) * steps);
    },
    decrement(steps = 1, index = 0) {
      setThumbValue(index, untrack(() => valueAt(index)) - untrack(step) * steps);
    }
  };
  const thumbs = /* @__PURE__ */ new Map();
  const isGroup = () => values().length > 1;
  const disabledState = createDisabledState(disabled);
  const rest = isSliderUncontrolled(props) ? omit(props, "as", "children", "defaultValue", ...SLIDER_OPTIONS) : omit(props, "as", "children", "value", ...SLIDER_OPTIONS);
  return SliderContext(new _P$4(dynamic(() => props.as || "div"), isGroup, label, labelID, props, disabledState, rest, state, values, {
    state,
    labelID,
    thumbID: (index) => `${thumbBaseID}-${index}`,
    label,
    isGroup,
    isVertical: () => !!props.vertical,
    largeStep: () => {
      var _a;
      return (_a = props.largeStep) != null ? _a : 10;
    },
    valueText: (index) => {
      var _a;
      return (_a = props.getValueText) == null ? void 0 : _a.call(props, valueAt(index), index);
    },
    focusThumb(index) {
      var _a;
      (_a = thumbs.get(index)) == null ? void 0 : _a.focus();
    },
    addThumb(index, element) {
      thumbs.set(index, element);
    },
    removeThumb(index, element) {
      if (thumbs.get(index) === element) thumbs.delete(index);
    }
  }));
}
function SliderLabel(props) {
  const context = useSliderContext("SliderLabel");
  context.label.register();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      context.focusThumb(0);
    });
  });
  const rest = omit(props, "as", "ref");
  return dynamic(() => props.as || "label")(mergeProps(SLIDER_LABEL_TAG, new _P$5(context, setInternalRef), rest));
}
function SliderThumb(props) {
  const context = useSliderContext("SliderThumb");
  const state = context.state;
  const index = () => {
    var _a;
    return (_a = props.index) != null ? _a : 0;
  };
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(createDependencyList(() => [internalRef(), index()]), ([current, position]) => {
    if (current instanceof HTMLElement) {
      context.addThumb(position, current);
      return mergeFunc(() => {
        context.removeThumb(position, current);
      }, useEventListener(current, "keydown", (e) => {
        if (state.disabled()) return;
        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            state.increment(1, index());
            break;
          case "ArrowLeft":
          case "ArrowDown":
            state.decrement(1, index());
            break;
          case "PageUp":
            state.increment(context.largeStep(), index());
            break;
          case "PageDown":
            state.decrement(context.largeStep(), index());
            break;
          case "Home":
            state.setThumbValue(index(), state.thumbMin(index()));
            break;
          case "End":
            state.setThumbValue(index(), state.thumbMax(index()));
            break;
          default:
            return;
        }
        e.preventDefault();
      }));
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = omit(props, "as", "children", "ref", "index");
  return dynamic(() => props.as || "div")(mergeProps(SLIDER_THUMB_TAG, new _P$6(context, index, state, "slider", setInternalRef), disabledState, ariaDisabledState, rest, new _P$8(props)));
}
function SliderTrack(props) {
  const context = useSliderContext("SliderTrack");
  const state = context.state;
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      let valueFromPointer = function(e) {
        const rect = track.getBoundingClientRect();
        let ratio;
        if (context.isVertical()) ratio = rect.height === 0 ? 0 : (rect.bottom - e.clientY) / rect.height;
        else {
          ratio = rect.width === 0 ? 0 : (e.clientX - rect.left) / rect.width;
          if (getComputedStyle(track).direction === "rtl") ratio = 1 - ratio;
        }
        ratio = Math.min(1, Math.max(0, ratio));
        return state.min() + ratio * (state.max() - state.min());
      }, nearest = function(value) {
        const values = state.values();
        let best = 0;
        for (let i = 1; i < values.length; i += 1) {
          const distance = Math.abs(values[i] - value);
          const bestDistance = Math.abs(values[best] - value);
          if (distance < bestDistance || distance === bestDistance && value > values[i]) best = i;
        }
        return best;
      }, towards = function(value) {
        const values = state.values();
        const current2 = values[active];
        let next = active;
        if (value > current2) while (next + 1 < values.length && values[next + 1] === current2) next += 1;
        else if (value < current2) while (next > 0 && values[next - 1] === current2) next -= 1;
        if (next !== active) {
          active = next;
          context.focusThumb(active);
        }
      };
      const track = current;
      let pointer;
      let active = 0;
      return mergeFunc(useEventListener(current, "pointerdown", (e) => {
        if (state.disabled() || e.button !== 0) return;
        e.preventDefault();
        pointer = e.pointerId;
        const value = valueFromPointer(e);
        active = nearest(value);
        towards(value);
        if ("setPointerCapture" in current) current.setPointerCapture(e.pointerId);
        state.setThumbValue(active, value);
        context.focusThumb(active);
      }), useEventListener(current, "pointermove", (e) => {
        if (pointer === e.pointerId) {
          const value = valueFromPointer(e);
          towards(value);
          state.setThumbValue(active, value);
        }
      }), useEventListener(current, "pointerup", (e) => {
        if (pointer === e.pointerId) {
          pointer = void 0;
          if ("releasePointerCapture" in current) current.releasePointerCapture(e.pointerId);
        }
      }), useEventListener(current, "pointercancel", () => {
        pointer = void 0;
      }));
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "div")(mergeProps(SLIDER_TRACK_TAG, { ref: setInternalRef }, disabledState, rest, new _P$10(props)));
}

export { Slider as S, SliderLabel as a, SliderTrack as b, SliderThumb as c };
//# sourceMappingURL=slider-CmSZV4KY.mjs.map
