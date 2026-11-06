import { b as createForwardRef, z as createDependencyList, f as assert, aG as waitForTransition, U as Unmountable } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { omit, createContext, useContext, createSignal, createMemo, createEffect, onCleanup, createUniqueId } from 'solid-js';

function addClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) ref.classList.add(...filtered);
}
function removeClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) ref.classList.remove(...filtered);
}
function commitStyle(ref) {
  return getComputedStyle(ref).transitionProperty;
}
var TransitionState = class {
  /**
  * @param visible Whether this state has finished entering. Children read it to
  * decide when they may mount.
  * @param hooks Called as the transition progresses.
  */
  constructor(visible, hooks) {
    this.visible = visible;
    this.hooks = hooks;
    this.children = /* @__PURE__ */ new Set();
    this.token = 0;
  }
  register(child) {
    this.children.add(child);
  }
  unregister(child) {
    this.children.delete(child);
  }
  /**
  * The element to transition. It arrives after construction, because the
  * caller only has a ref once its element has rendered, and it changes again
  * whenever an `unmount`ing element is rebuilt.
  */
  setElement(element) {
    this.element = element;
  }
  /**
  * Classes are re-read on every transition rather than captured once, so
  * changing a class prop applies to the next transition instead of restarting
  * the current one.
  */
  setClasses(classes) {
    this.classes = classes;
  }
  /**
  * Enters, then lets the children enter behind it.
  *
  * Every wait is followed by a token check: if a leave has started in the
  * meantime, this run abandons its remaining steps rather than putting classes
  * back on an element that is now going the other way.
  */
  async _show(token, element, classes) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    (_b = (_a = this.hooks).beforeEnter) == null ? void 0 : _b.call(_a);
    if (classes) {
      removeClassList(element, classes.leave);
      removeClassList(element, classes.leaveFrom);
      removeClassList(element, classes.leaveTo);
    }
    (_d = (_c = this.hooks).onTransition) == null ? void 0 : _d.call(_c, "enter-from");
    if (classes) {
      addClassList(element, classes.enterFrom);
      commitStyle(element);
      addClassList(element, classes.enter);
    }
    await waitForTransition(element);
    if (this.token !== token) return;
    if (classes) removeClassList(element, classes.enterFrom);
    (_f = (_e = this.hooks).onTransition) == null ? void 0 : _f.call(_e, "enter-to");
    if (classes) addClassList(element, classes.enterTo);
    await waitForTransition(element);
    if (this.token !== token) return;
    if (classes) {
      removeClassList(element, classes.enter);
      removeClassList(element, classes.enterTo);
    }
    (_h = (_g = this.hooks).onTransition) == null ? void 0 : _h.call(_g, "entered");
    if (classes) addClassList(element, classes.entered);
    await waitForTransition(element);
    if (this.token !== token) return;
    (_j = (_i = this.hooks).afterEnter) == null ? void 0 : _j.call(_i);
    await Promise.all([...this.children].map(async (state) => state.show()));
    if (this.token !== token) return;
    this.showing = void 0;
  }
  /**
  * Enters, interrupting a leave if one is running.
  *
  * Resolves once this element and everything nested inside it has entered, or
  * as soon as the run is superseded by a {@link hide}.
  */
  async show() {
    const element = this.element;
    if (!element) return;
    if (this.showing) return this.showing;
    this.token += 1;
    this.hiding = void 0;
    this.showing = this._show(this.token, element, this.classes);
    return this.showing;
  }
  /**
  * Lets the children leave first, then leaves.
  *
  * Waiting for the children is what keeps a group together: the parent is
  * still on screen, and still animating, until the last thing inside it has
  * gone.
  */
  async _hide(token, element, classes) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    (_b = (_a = this.hooks).beforeLeave) == null ? void 0 : _b.call(_a);
    await Promise.all([...this.children].map(async (state) => state.hide()));
    if (this.token !== token) return;
    if (classes) {
      removeClassList(element, classes.enter);
      removeClassList(element, classes.enterFrom);
      removeClassList(element, classes.enterTo);
      removeClassList(element, classes.entered);
    }
    (_d = (_c = this.hooks).onTransition) == null ? void 0 : _d.call(_c, "leave-from");
    if (classes) {
      addClassList(element, classes.leaveFrom);
      commitStyle(element);
      addClassList(element, classes.leave);
    }
    await waitForTransition(element);
    if (this.token !== token) return;
    if (classes) removeClassList(element, classes.leaveFrom);
    (_f = (_e = this.hooks).onTransition) == null ? void 0 : _f.call(_e, "leave-to");
    if (classes) addClassList(element, classes.leaveTo);
    await waitForTransition(element);
    if (this.token !== token) return;
    if (classes) {
      removeClassList(element, classes.leave);
      removeClassList(element, classes.leaveTo);
    }
    (_h = (_g = this.hooks).afterLeave) == null ? void 0 : _h.call(_g);
    this.hiding = void 0;
  }
  /**
  * Leaves, interrupting an enter if one is running.
  *
  * Resolves once everything nested inside has left and this element has
  * finished its own leave, or as soon as the run is superseded by a
  * {@link show}.
  */
  async hide() {
    const element = this.element;
    if (!element) return;
    if (this.hiding) return this.hiding;
    this.token += 1;
    this.showing = void 0;
    this.hiding = this._hide(this.token, element, this.classes);
    return this.hiding;
  }
};
var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _m$7 = /* @__PURE__ */ Symbol();
var _m$8 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const current = this[_m$];
    return current();
  },
  enumerable: true,
  configurable: true
};
var _d$2 = {
  get() {
    const isInert = this[_m$2];
    return isInert();
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this[_m$2] = _p2;
  this.ref = _p3;
  Object.defineProperty(this, "tc-transition", _d$);
  Object.defineProperty(this, "inert", _d$2);
}
_P$.prototype = Object.prototype;
var _d$3 = {
  get() {
    return this[_m$].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    const visible = this[_m$2];
    return visible();
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const Root = this[_m$3];
    const id = this[_m$4];
    const rest = this[_m$5];
    const current = this[_m$6];
    const isInert = this[_m$7];
    const setInternalRef = this[_m$8];
    return Root(mergeProps({ id }, rest, new _P$(current, isInert, setInternalRef)));
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p4, _p5, _p6, _p7, _p8, _p9, _p0, _p1) {
  this[_m$] = _p4;
  this[_m$2] = _p5;
  this[_m$3] = _p6;
  this[_m$4] = _p7;
  this[_m$5] = _p8;
  this[_m$6] = _p9;
  this[_m$7] = _p0;
  this[_m$8] = _p1;
  Object.defineProperty(this, "unmount", _d$3);
  Object.defineProperty(this, "when", _d$4);
  Object.defineProperty(this, "children", _d$5);
}
_P$2.prototype = Object.prototype;
var _d$6 = {
  get() {
    const props = this[_m$];
    const visible = this[_m$2];
    const Root = this[_m$3];
    const id = this[_m$4];
    const rest = this[_m$5];
    const current = this[_m$6];
    const isInert = this[_m$7];
    const setInternalRef = this[_m$8];
    return Unmountable(new _P$2(props, visible, Root, id, rest, current, isInert, setInternalRef));
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17, _p18) {
  this[_m$] = _p10;
  this[_m$2] = _p11;
  this[_m$3] = _p12;
  this[_m$4] = _p13;
  this[_m$5] = _p14;
  this[_m$6] = _p15;
  this[_m$7] = _p16;
  this[_m$8] = _p17;
  this.value = _p18;
  Object.defineProperty(this, "children", _d$6);
}
_P$3.prototype = Object.prototype;
var _d$7 = {
  get() {
    const childProps = this[_m$];
    return TransitionChild(childProps);
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p19, _p20) {
  this[_m$] = _p19;
  this.value = _p20;
  Object.defineProperty(this, "children", _d$7);
}
_P$4.prototype = Object.prototype;
var _d$8 = {
  get() {
    const childProps = this[_m$];
    return TransitionStateContext(new _P$4(childProps, { value: void 0 }));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p21, _p22) {
  this[_m$] = _p21;
  this.value = _p22;
  Object.defineProperty(this, "children", _d$8);
}
_P$5.prototype = Object.prototype;
var TransitionRootContext = createContext(null);
var TransitionStateContext = createContext({});
function useTransitionRootContext(componentName) {
  const context = useContext(TransitionRootContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Transition>`));
  return context;
}
function getClassList(classes) {
  return classes ? classes.split(" ") : [];
}
function ignoreTransitionError() {
}
function TransitionChild(props) {
  const root = useTransitionRootContext("TransitionChild");
  const parent = useContext(TransitionStateContext).value;
  const [current, setCurrent] = createSignal();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [left, setLeft] = createSignal(false);
  function shown() {
    if (props.appear) return root.show;
    if (parent) return root.show && parent.visible();
    return root.show;
  }
  const visible = createMemo((wasVisible = false) => {
    if (shown()) return true;
    if (!wasVisible) return false;
    return !left();
  });
  const [ready, setReady] = createSignal(false);
  const state = new TransitionState(ready, {
    onTransition(state2) {
      var _a;
      (_a = props.onTransition) == null ? void 0 : _a.call(props, state2);
      setCurrent(state2);
    },
    beforeEnter() {
      var _a;
      (_a = props.beforeEnter) == null ? void 0 : _a.call(props);
      setReady(false);
      setLeft(false);
    },
    beforeLeave() {
      var _a;
      (_a = props.beforeLeave) == null ? void 0 : _a.call(props);
    },
    afterEnter() {
      var _a;
      (_a = props.afterEnter) == null ? void 0 : _a.call(props);
      setReady(true);
    },
    afterLeave() {
      var _a;
      (_a = props.afterLeave) == null ? void 0 : _a.call(props);
      setLeft(true);
    }
  });
  function isInert() {
    const value = current();
    if (value === void 0) return root.show ? void 0 : true;
    return value === "leave-from" || value === "leave-to" ? true : void 0;
  }
  createEffect(createDependencyList(() => [
    props.enter,
    props.enterFrom,
    props.enterTo,
    props.entered,
    props.leave,
    props.leaveFrom,
    props.leaveTo
  ]), ([enter, enterFrom, enterTo, entered, leave, leaveFrom, leaveTo]) => {
    state.setClasses({
      enter: getClassList(enter),
      enterFrom: getClassList(enterFrom),
      enterTo: getClassList(enterTo),
      entered: getClassList(entered),
      leave: getClassList(leave),
      leaveFrom: getClassList(leaveFrom),
      leaveTo: getClassList(leaveTo)
    });
  });
  if (parent) {
    parent.register(state);
    onCleanup(() => {
      parent.unregister(state);
    });
    createEffect(internalRef, (element) => {
      if (element instanceof HTMLElement && element.isConnected) state.setElement(element);
    });
  }
  createEffect(createDependencyList(() => [internalRef(), root.show]), ([element, flag]) => {
    if (element instanceof HTMLElement && element.isConnected) {
      state.setElement(element);
      if (flag) state.show().catch(ignoreTransitionError);
      else state.hide().catch(ignoreTransitionError);
    }
  });
  const id = createUniqueId();
  const rest = omit(props, "as", "enter", "enterFrom", "enterTo", "leave", "leaveFrom", "leaveTo", "unmount", "afterEnter", "afterLeave", "appear", "beforeEnter", "beforeLeave", "entered", "onTransition", "ref");
  return TransitionStateContext(new _P$3(props, visible, dynamic(() => props.as || "div"), id, rest, current, isInert, setInternalRef, { value: state }));
}
function Transition(props) {
  return TransitionRootContext(new _P$5(omit(props, "show"), props));
}

export { Transition as T, TransitionChild as a };
//# sourceMappingURL=transition-ndn6Mawg.mjs.map
