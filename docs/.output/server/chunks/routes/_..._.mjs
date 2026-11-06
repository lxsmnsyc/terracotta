import { createSignal, createEffect, createMemo, untrack, useContext, createContext, onCleanup, Errored, DEV, getOwner, getObserver, isHydrating, OBSERVE, onSettled, For, Show, isHydratable, runWithOwner, createRenderEffect, lazy, createUniqueId, omit, NotReadyError, merge, children, createRoot, createComponent } from 'solid-js';
import { isServer, createRequestEvent, commitEventResponse, createSSRResponse, isResponseEnvelope, reportRequestFailure, renderToStream, getRequestEvent, isServerFunction, getServerFunctionMetadata, getServerFunctionRPC, httpStatus, ssrHydrationKey, ssr, takeHydrationValue, escape, Loading, useHead, scope, ssrGroup, ssrStyleProperty, ssrLinkClaim, getHydrationWriter, REVALIDATE_HEADER, delegateEvents, hasServerLinkState, registerElementClaim, setLinkClaim, ssrAttribute, dynamic, ssrClassName, HydrationScript, hasFlashCookie, clearFlashCookie, dispatchAsInteraction, mergeProps, memo } from '@solidjs/web';
import { provideRequestEvent } from '@solidjs/web/storage';
import { decodeRedirectHeaderValue, REDIRECT_HEADER, subscribeFlightData } from '@solidjs/web/server-functions';
import { f as fromWebHandler } from '../nitro/nitro.mjs';

function assert(cond, error) {
  if (!cond) throw error;
}

function isRefFunction(callback) {
  return typeof callback === "function";
}
function createForwardRef(props) {
  const [ref, setRef] = createSignal();
  createEffect(ref, (current) => {
    if (current && "ref" in props && isRefFunction(props.ref)) props.ref(current);
  });
  return [ref, setRef];
}

var DISABLED_NODE = `[tc-disabled]`;
var SELECTED_NODE = `[tc-selected]`;
var MATCHES_NODE = `[tc-matches]`;
function createTag(tag) {
  return { [`tc-${tag}`]: "" };
}

function toBooleanish(value) {
  return value ? "" : void 0;
}
function toARIABooleanish(value) {
  return value == null ? void 0 : value ? "true" : "false";
}
function createARIADisabledState(disabled) {
  return {
    get disabled() {
      return disabled();
    },
    get "aria-disabled"() {
      return toARIABooleanish(disabled());
    }
  };
}
function createARIAExpandedState(expanded) {
  return { get "aria-expanded"() {
    return toARIABooleanish(expanded());
  } };
}
function createARIACheckedState(checked) {
  return { get "aria-checked"() {
    var _a;
    return (_a = toARIABooleanish(checked())) != null ? _a : "mixed";
  } };
}
function createARIASelectedState(selected) {
  return { get "aria-selected"() {
    return toARIABooleanish(selected());
  } };
}
function createARIAPressedState(pressed) {
  return { get "aria-pressed"() {
    return toARIABooleanish(pressed());
  } };
}
function createDisabledState(disabled) {
  return { get "tc-disabled"() {
    return toBooleanish(disabled());
  } };
}
function createExpandedState(expanded) {
  return { get "tc-expanded"() {
    return toBooleanish(expanded());
  } };
}
function createCheckedState(isChecked) {
  return { get "tc-checked"() {
    const result = isChecked();
    return result == null ? "mixed" : toBooleanish(result);
  } };
}
function createSelectedState(isSelected) {
  return { get "tc-selected"() {
    return toBooleanish(isSelected());
  } };
}
function createActiveState(isActive) {
  return { get "tc-active"() {
    return toBooleanish(isActive());
  } };
}
function createMatchesState(matches) {
  return { get "tc-matches"() {
    return toBooleanish(matches());
  } };
}
function createHasSelectedState(hasSelected) {
  return { get "tc-has-selected"() {
    return toBooleanish(hasSelected());
  } };
}
function createHasActiveState(hasActive) {
  return { get "tc-has-active"() {
    return toBooleanish(hasActive());
  } };
}
function createHasQueryState(hasQuery) {
  return { get "tc-has-query"() {
    return toBooleanish(hasQuery());
  } };
}
function createPressedState(pressed) {
  return { get "tc-pressed"() {
    return toBooleanish(pressed());
  } };
}

function useEventListener(node, type, listener, options) {
  node.addEventListener(type, listener, options);
  return node.removeEventListener.bind(node, type, listener, options);
}
function mergeFunc(...args) {
  return () => {
    for (let i = 0, len = args.length, current; i < len; i++) {
      current = args[i];
      if (current) current();
    }
  };
}

function renderChildren(children, state) {
  if (typeof children === "function") return children(state);
  return children;
}

function isEqual(a, b) {
  return a === b || a !== a && b !== b;
}

var _m$$a = /* @__PURE__ */ Symbol();
var _d$$a = {
  get() {
    return this[_m$$a].state;
  },
  enumerable: true,
  configurable: true
};
var _d$2$a = {
  get() {
    const props = this[_m$$a];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$$a(_p) {
  this[_m$$a] = _p;
  Object.defineProperty(this, "value", _d$$a);
  Object.defineProperty(this, "children", _d$2$a);
}
_P$$a.prototype = Object.prototype;
function createSingleSelectState(options) {
  const [active, setActive] = createSignal();
  let selectedValue;
  let setSelectedValue;
  const equals = options.by || isEqual;
  if ("defaultValue" in options) {
    const [selected, setSelected] = createSignal(() => options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      setSelected(() => value);
      if (options.onChange) options.onChange(value);
    };
  } else {
    selectedValue = createMemo(() => options.value);
    setSelectedValue = (value) => {
      if (options.onChange) options.onChange(value);
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  return {
    isSelected(value) {
      return isEqual(value, selectedValue());
    },
    select(value) {
      if (!untrack(isDisabled)) if (options.toggleable && equals(untrack(selectedValue), value)) setSelectedValue(void 0);
      else setSelectedValue(value);
    },
    hasSelected() {
      return selectedValue() != null;
    },
    disabled: isDisabled,
    hasActive() {
      return !!active();
    },
    isActive(value) {
      const ref = active();
      return ref ? equals(value, ref.value) : false;
    },
    focus(value) {
      if (!untrack(isDisabled)) setActive({ value });
    },
    blur() {
      if (!untrack(isDisabled)) setActive(void 0);
    }
  };
}
function createMultipleSelectState(options) {
  const [active, setActive] = createSignal();
  let selectedValues;
  let setSelectedValues;
  const equals = options.by || isEqual;
  if ("defaultValue" in options) {
    const [selected, setSelected] = createSignal(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      setSelected(() => value);
      if (options.onChange) options.onChange(value);
    };
  } else {
    selectedValues = createMemo(() => options.value);
    setSelectedValues = (value) => {
      if (options.onChange) options.onChange(value);
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  return {
    isSelected(value) {
      const values = selectedValues();
      for (let i = 0, len = values.length; i < len; i += 1) if (equals(value, values[i])) return true;
      return false;
    },
    select(value) {
      if (!untrack(isDisabled)) {
        const newValues = [];
        const currentValues = untrack(selectedValues);
        let hasValue = false;
        for (let i = 0, len = currentValues.length; i < len; i += 1) {
          const item = currentValues[i];
          const isSame = equals(item, value);
          if (isSame) hasValue = true;
          if (!(options.toggleable && isSame)) newValues.push(item);
        }
        if (!hasValue) newValues.push(value);
        setSelectedValues(newValues);
      }
    },
    hasSelected: createMemo(() => selectedValues().length > 0),
    disabled: isDisabled,
    hasActive: createMemo(() => !!active()),
    isActive(value) {
      const ref = active();
      if (ref) return equals(value, ref.value);
      return false;
    },
    focus(value) {
      if (!untrack(isDisabled)) setActive({ value });
    },
    blur() {
      if (!untrack(isDisabled)) setActive(void 0);
    }
  };
}
var SelectStateContext = createContext(null);
function SelectStateProvider(props) {
  return SelectStateContext(new _P$$a(props));
}
function useSelectState() {
  const ctx = useContext(SelectStateContext);
  assert(ctx, /* @__PURE__ */ new Error("Missing <SelectStateProvider>"));
  return ctx;
}
function SelectStateChild(props) {
  const state = useSelectState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === "function" && current.length === 1) return createMemo(() => current(state));
    return current;
  });
}

var QUERY = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "summary",
  "iframe",
  "audio[controls]",
  "video[controls]",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable=""]',
  '[contenteditable="true"]'
].join(", ");
function blocksFocus(node) {
  return node.hasAttribute("inert") || node.hasAttribute("hidden");
}
function isBlocked(node, cache) {
  const chain = [];
  let current = node;
  let blocked = false;
  while (current) {
    const cached = cache.get(current);
    if (cached !== void 0) {
      blocked = cached;
      break;
    }
    chain.push(current);
    if (blocksFocus(current)) {
      blocked = true;
      break;
    }
    current = current.parentElement;
  }
  for (let i = 0, len = chain.length; i < len; i += 1) cache.set(chain[i], blocked);
  return blocked;
}
function isVisible(node) {
  return typeof node.checkVisibility === "function" ? node.checkVisibility({ visibilityProperty: true }) : true;
}
function getFocusableElements(node, filter) {
  const nodes = node.querySelectorAll(QUERY);
  const replicated = [];
  const cache = /* @__PURE__ */ new Map();
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    const current = nodes[i];
    if (!(filter == null ? void 0 : filter.contains(current)) && isVisible(current) && !isBlocked(current, cache)) replicated.push(current);
  }
  return replicated;
}

var LISTENERS = /* @__PURE__ */ new Set();
function useVirtualFocus(listener) {
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}
function focusVirtually(el) {
  for (const listener of LISTENERS.keys()) listener(el);
}
var Direction = /* @__PURE__ */ (function(Direction2) {
  Direction2[Direction2["Next"] = 1] = "Next";
  Direction2[Direction2["Prev"] = -1] = "Prev";
  return Direction2;
})(Direction || {});
function isFocusable(el) {
  return !el.matches(DISABLED_NODE);
}
function getNextFocusable(nodes, anchor, direction, loop) {
  let current = anchor + direction;
  if (loop) {
    if (direction === Direction.Next && current === nodes.length) current = 0;
    if (direction === Direction.Prev && current === -1) current = nodes.length - 1;
    while (anchor !== current) {
      if (isFocusable(nodes[current])) return nodes[current];
      current += direction;
      if (direction === Direction.Next && current >= nodes.length) current = 0;
      if (direction === Direction.Prev && current < 0) current = nodes.length - 1;
    }
    return;
  }
  while (current >= 0 && current < nodes.length) {
    if (isFocusable(nodes[current])) return nodes[current];
    current += direction;
  }
}
function focusNode(node, virtual) {
  if (node) if (virtual) focusVirtually(node);
  else node.focus();
  return node;
}
function focusNext(nodes, targetNode, loop, virtual) {
  for (let i = 0, len = nodes.length; i < len; i += 1) if (targetNode === nodes[i] || nodes[i].contains(targetNode)) return focusNode(getNextFocusable(nodes, i, Direction.Next, loop), virtual);
}
function focusPrev(nodes, targetNode, loop, virtual) {
  for (let i = 0, len = nodes.length; i < len; i += 1) if (nodes[i].contains(targetNode)) return focusNode(getNextFocusable(nodes, i, Direction.Prev, loop), virtual);
}
function focusFirst(nodes, virtual) {
  if (nodes.length) return focusNode(getNextFocusable(nodes, -1, Direction.Next, false), virtual);
}
function focusLast(nodes, virtual) {
  if (nodes.length) return focusNode(getNextFocusable(nodes, nodes.length, Direction.Prev, false), virtual);
}
function focusMatch(nodes, character, virtual) {
  const lower = character.toLowerCase();
  for (let i = 0, l = nodes.length; i < l; i += 1) if (nodes[i].textContent.toLowerCase().startsWith(lower)) return focusNode(nodes[i], virtual);
}
function lockFocus(ref, reverse, virtual) {
  const nodes = getFocusableElements(ref);
  if (reverse) {
    if (!(document.activeElement && ref.contains(document.activeElement))) return focusLast(nodes, virtual);
    return focusPrev(nodes, document.activeElement, true, virtual);
  }
  if (!(document.activeElement && ref.contains(document.activeElement))) return focusFirst(nodes, virtual);
  return focusNext(nodes, document.activeElement, true, virtual);
}

function isListEquals(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0, len = a.length; i < len; i++) if (!Object.is(a[i], b[i])) return false;
  return true;
}
function createDependencyList(source) {
  return createMemo(source, {
    equals: isListEquals,
    loadingValue: []
  });
}

function getFocusStartPoint() {
  const selection = window.getSelection();
  if (selection) {
    const node = selection.focusNode;
    if (node) return node.parentElement;
  }
}
function setFocusStartPoint(element) {
  if (element) {
    const tabindex = element.getAttribute("tabindex");
    element.setAttribute("tabindex", "-1");
    element.focus();
    element.blur();
    if (tabindex) element.setAttribute("tabindex", tabindex);
    else element.removeAttribute("tabindex");
  }
}
var FocusStartPoint = class {
  constructor() {
    this.saved = false;
  }
  load() {
    if (!this.saved) return;
    this.saved = false;
    if (this.returnElement instanceof HTMLElement) this.returnElement.focus();
    else setFocusStartPoint(this.fsp);
  }
  save() {
    this.returnElement = document.activeElement;
    this.fsp = getFocusStartPoint();
    this.saved = true;
  }
};
function useFocusStartPoint() {
  const fsp = new FocusStartPoint();
  if (!isServer) onCleanup(() => {
    fsp.load();
  });
  return fsp;
}

async function waitForTransition(el) {
  await Promise.resolve();
  try {
    const animations = el.getAnimations();
    if (animations.length > 0) {
      const finished = [];
      for (const animation of animations) finished.push(animation.finished);
      await Promise.all(finished);
    }
  } catch {
  }
}
function afterTransition(el, callback) {
  waitForTransition(el).then(callback, () => {
  });
}

var _a;
var manifest = {
  "virtual:solid-ssr-entry-client.tsx": {
    "file": "assets/virtual_solid-ssr-entry-client-CoGFyLwx.js",
    "name": "virtual_solid-ssr-entry-client",
    "src": "virtual:solid-ssr-entry-client.tsx",
    "isEntry": true,
    "imports": [
      "_web-WTO7VBOb.js",
      "_disclosure-Dzbld-mu.js",
      "_radio-group-Dug8Rkf1.js",
      "_command-Bit7paDy.js",
      "_command-bar-m0qAZk0G.js",
      "_icons-Bj2qzwfl.js",
      "_tabs-DMlmOSZm.js",
      "_switch-C03Ihrid.js",
      "_toggle-CWejk1PY.js",
      "_tree-BtDxE36q.js"
    ],
    "dynamicImports": [
      "virtual:search-index",
      "content/guides/getting-started.md",
      "content/guides/rendering.md",
      "content/guides/state.md",
      "content/guides/styling.md",
      "content/guides/keyboard-and-focus.md",
      "content/guides/ssr.md",
      "content/components/accordion.md",
      "content/components/alert.md",
      "content/components/alert-dialog.md",
      "content/components/breadcrumb.md",
      "content/components/button.md",
      "content/components/checkbox.md",
      "content/components/color-scheme.md",
      "content/components/combobox.md",
      "content/components/command.md",
      "content/components/command-bar.md",
      "content/components/context-menu.md",
      "content/components/dialog.md",
      "content/components/disclosure.md",
      "content/components/feed.md",
      "content/components/grid.md",
      "content/components/listbox.md",
      "content/components/menu.md",
      "content/components/meter.md",
      "content/components/popover.md",
      "content/components/radio-group.md",
      "content/components/select.md",
      "content/components/slider.md",
      "content/components/spinbutton.md",
      "content/components/splitter.md",
      "content/components/switch.md",
      "content/components/tabs.md",
      "content/components/toast.md",
      "content/components/toggle.md",
      "content/components/toolbar.md",
      "content/components/tooltip.md",
      "content/components/transition.md",
      "content/components/tree.md",
      "content/components/treegrid.md",
      "content/states.md",
      "src/demos/accordion/basic.tsx",
      "src/demos/accordion/disabled.tsx",
      "src/demos/accordion/multiple.tsx",
      "src/demos/alert-dialog/destructive.tsx",
      "src/demos/alert/form-error.tsx",
      "src/demos/alert/severity.tsx",
      "src/demos/breadcrumb/basic.tsx",
      "src/demos/button/as-other-elements.tsx",
      "src/demos/button/basic.tsx",
      "src/demos/button/disabled.tsx",
      "src/demos/checkbox/basic.tsx",
      "src/demos/checkbox/indeterminate.tsx",
      "src/demos/checkbox/switch.tsx",
      "src/demos/color-scheme/basic.tsx",
      "src/demos/color-scheme/controlled.tsx",
      "src/demos/combobox/basic.tsx",
      "src/demos/command-bar/basic.tsx",
      "src/demos/command/palette.tsx",
      "src/demos/context-menu/basic.tsx",
      "src/demos/dialog/basic.tsx",
      "src/demos/dialog/drawer.tsx",
      "src/demos/disclosure/basic.tsx",
      "src/demos/disclosure/close-from-panel.tsx",
      "src/demos/disclosure/controlled.tsx",
      "src/demos/disclosure/disabled.tsx",
      "src/demos/disclosure/render-prop.tsx",
      "src/demos/feed/timeline.tsx",
      "src/demos/grid/basic.tsx",
      "src/demos/landing/specimen.tsx",
      "src/demos/listbox/basic.tsx",
      "src/demos/listbox/multiple.tsx",
      "src/demos/menu/as-dropdown.tsx",
      "src/demos/menu/basic.tsx",
      "src/demos/meter/basic.tsx",
      "src/demos/popover/basic.tsx",
      "src/demos/popover/close-from-inside.tsx",
      "src/demos/radio-group/cards.tsx",
      "src/demos/radio-group/dots.tsx",
      "src/demos/select/basic.tsx",
      "src/demos/select/multiple.tsx",
      "src/demos/slider/basic.tsx",
      "src/demos/slider/range.tsx",
      "src/demos/spinbutton/basic.tsx",
      "src/demos/splitter/basic.tsx",
      "src/demos/switch/basic.tsx",
      "src/demos/switch/controlled.tsx",
      "src/demos/tabs/controlled.tsx",
      "src/demos/tabs/horizontal.tsx",
      "src/demos/tabs/vertical.tsx",
      "src/demos/toast/basic.tsx",
      "src/demos/toggle/basic.tsx",
      "src/demos/toggle/controlled.tsx",
      "src/demos/toggle/switch.tsx",
      "src/demos/toolbar/basic.tsx",
      "src/demos/toolbar/with-terracotta-controls.tsx",
      "src/demos/tooltip/basic.tsx",
      "src/demos/transition/coordinated.tsx",
      "src/demos/transition/fade.tsx",
      "src/demos/tree/basic.tsx",
      "src/demos/treegrid/basic.tsx"
    ],
    "css": ["assets/virtual_solid-ssr-entry-client-BiwYpQlx.css"]
  },
  "_GridParts-DtGbmNA2-BVXqr8Fq.js": {
    "file": "assets/GridParts-DtGbmNA2-BVXqr8Fq.js",
    "name": "GridParts-DtGbmNA2",
    "imports": ["_web-WTO7VBOb.js", "_namespace-ByGKxOfw-D78zQsd_.js"]
  },
  "_accordion-DicBqgQv.js": {
    "file": "assets/accordion-DicBqgQv.js",
    "name": "accordion",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-select-option-state-BZsGyinK-Q9nb2tY6.js"
    ]
  },
  "_alert-C11V16qx.js": {
    "file": "assets/alert-C11V16qx.js",
    "name": "alert",
    "imports": ["_web-WTO7VBOb.js", "_namespace-ByGKxOfw-D78zQsd_.js"]
  },
  "_assert-C1B22CFL-B5Uxld8G.js": {
    "file": "assets/assert-C1B22CFL-B5Uxld8G.js",
    "name": "assert-C1B22CFL"
  },
  "_button-6aUc-Tcr.js": {
    "file": "assets/button-6aUc-Tcr.js",
    "name": "button",
    "imports": [
      "_web-WTO7VBOb.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js"
    ]
  },
  "_checkbox-BSAt_3Zi.js": {
    "file": "assets/checkbox-BSAt_3Zi.js",
    "name": "checkbox",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-check-state-BgtObO8G-Bur2tLU7.js"
    ]
  },
  "_color-scheme-WdVV-_BI.js": {
    "file": "assets/color-scheme-WdVV-_BI.js",
    "name": "color-scheme",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js"
    ]
  },
  "_command-Bit7paDy.js": {
    "file": "assets/command-Bit7paDy.js",
    "name": "command",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-autocomplete-option-state-E6bpVtEC-D-qH_QYp.js"
    ]
  },
  "_command-bar-m0qAZk0G.js": {
    "file": "assets/command-bar-m0qAZk0G.js",
    "name": "command-bar",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_modal-DC-7wmtP-Ctmjj8Vv.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js"
    ]
  },
  "_create-autocomplete-option-state-E6bpVtEC-D-qH_QYp.js": {
    "file": "assets/create-autocomplete-option-state-E6bpVtEC-D-qH_QYp.js",
    "name": "create-autocomplete-option-state-E6bpVtEC",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_is-equal-alR503FG-Bfkm5lx3.js"
    ]
  },
  "_create-check-state-BgtObO8G-Bur2tLU7.js": {
    "file": "assets/create-check-state-BgtObO8G-Bur2tLU7.js",
    "name": "create-check-state-BgtObO8G",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_render-children-Boj7expS-D6hYE6Hs.js"
    ]
  },
  "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js": {
    "file": "assets/create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
    "name": "create-dependency-list-Lg_lpvpB",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js": {
    "file": "assets/create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
    "name": "create-disclosure-state-DVJTfDgk",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_render-children-Boj7expS-D6hYE6Hs.js"
    ]
  },
  "_create-part-id-C9i7Veuh-BwQNwvyo.js": {
    "file": "assets/create-part-id-C9i7Veuh-BwQNwvyo.js",
    "name": "create-part-id-C9i7Veuh",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_create-presence-DPlmnT12-U81_Jhtr.js": {
    "file": "assets/create-presence-DPlmnT12-U81_Jhtr.js",
    "name": "create-presence-DPlmnT12",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_create-select-option-state-BZsGyinK-Q9nb2tY6.js": {
    "file": "assets/create-select-option-state-BZsGyinK-Q9nb2tY6.js",
    "name": "create-select-option-state-BZsGyinK",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js"
    ]
  },
  "_create-select-state-QDPEMoNL-Cu3spZZI.js": {
    "file": "assets/create-select-state-QDPEMoNL-Cu3spZZI.js",
    "name": "create-select-state-QDPEMoNL",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_is-equal-alR503FG-Bfkm5lx3.js"
    ]
  },
  "_create-type-ahead-D7XuTmw8-BwAY1yW3.js": {
    "file": "assets/create-type-ahead-D7XuTmw8-BwAY1yW3.js",
    "name": "create-type-ahead-D7XuTmw8",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_dialog-DKInkXHs.js": {
    "file": "assets/dialog-DKInkXHs.js",
    "name": "dialog",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_modal-DC-7wmtP-Ctmjj8Vv.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js"
    ]
  },
  "_disclosure-Dzbld-mu.js": {
    "file": "assets/disclosure-Dzbld-mu.js",
    "name": "disclosure",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js"
    ]
  },
  "_dynamic-prop-D5vmE5VV-hx1fKxza.js": {
    "file": "assets/dynamic-prop-D5vmE5VV-hx1fKxza.js",
    "name": "dynamic-prop-D5vmE5VV",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_focus-navigation-Ci6kBRE_-DzJRausr.js": {
    "file": "assets/focus-navigation-Ci6kBRE_-DzJRausr.js",
    "name": "focus-navigation-Ci6kBRE_",
    "imports": ["_namespace-ByGKxOfw-D78zQsd_.js", "_focus-query-D9xn0IVo-BJwO1msc.js"]
  },
  "_focus-navigator-o-2cjfr5-W1RsMk9J.js": {
    "file": "assets/focus-navigator-o-2cjfr5-W1RsMk9J.js",
    "name": "focus-navigator-o-2cjfr5",
    "imports": ["_namespace-ByGKxOfw-D78zQsd_.js", "_focus-navigation-Ci6kBRE_-DzJRausr.js"]
  },
  "_focus-query-D9xn0IVo-BJwO1msc.js": {
    "file": "assets/focus-query-D9xn0IVo-BJwO1msc.js",
    "name": "focus-query-D9xn0IVo"
  },
  "_icons-Bj2qzwfl.js": {
    "file": "assets/icons-Bj2qzwfl.js",
    "name": "icons",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_is-equal-alR503FG-Bfkm5lx3.js": {
    "file": "assets/is-equal-alR503FG-Bfkm5lx3.js",
    "name": "is-equal-alR503FG"
  },
  "_listbox-BLzARioo.js": {
    "file": "assets/listbox-BLzARioo.js",
    "name": "listbox",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-select-option-state-BZsGyinK-Q9nb2tY6.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_use-focus-start-point-z3RF_bYZ-BagrMAqf.js",
      "_wait-for-transition-C4ndidCV-0ATVw2Cd.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js",
      "_create-type-ahead-D7XuTmw8-BwAY1yW3.js"
    ]
  },
  "_menu-BD_jxrj1.js": {
    "file": "assets/menu-BD_jxrj1.js",
    "name": "menu",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-type-ahead-D7XuTmw8-BwAY1yW3.js"
    ]
  },
  "_menu-popup-C0F4Fm9V-NjHgah1B.js": {
    "file": "assets/menu-popup-C0F4Fm9V-NjHgah1B.js",
    "name": "menu-popup-C0F4Fm9V",
    "imports": ["_namespace-ByGKxOfw-D78zQsd_.js"]
  },
  "_merge-func-BjM0Aqkw-zaLgfc-c.js": {
    "file": "assets/merge-func-BjM0Aqkw-zaLgfc-c.js",
    "name": "merge-func-BjM0Aqkw"
  },
  "_modal-DC-7wmtP-Ctmjj8Vv.js": {
    "file": "assets/modal-DC-7wmtP-Ctmjj8Vv.js",
    "name": "modal-DC-7wmtP",
    "imports": [
      "_web-WTO7VBOb.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_use-focus-start-point-z3RF_bYZ-BagrMAqf.js",
      "_wait-for-transition-C4ndidCV-0ATVw2Cd.js"
    ]
  },
  "_namespace-ByGKxOfw-D78zQsd_.js": {
    "file": "assets/namespace-ByGKxOfw-D78zQsd_.js",
    "name": "namespace-ByGKxOfw"
  },
  "_panel-tree-VwKgi9fn-CCSYGixs.js": {
    "file": "assets/panel-tree-VwKgi9fn-CCSYGixs.js",
    "name": "panel-tree-VwKgi9fn",
    "imports": ["_web-WTO7VBOb.js", "_merge-func-BjM0Aqkw-zaLgfc-c.js"]
  },
  "_popover-Ct0WXcHx.js": {
    "file": "assets/popover-Ct0WXcHx.js",
    "name": "popover",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_use-focus-start-point-z3RF_bYZ-BagrMAqf.js",
      "_wait-for-transition-C4ndidCV-0ATVw2Cd.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js",
      "_menu-popup-C0F4Fm9V-NjHgah1B.js"
    ]
  },
  "_radio-group-Dug8Rkf1.js": {
    "file": "assets/radio-group-Dug8Rkf1.js",
    "name": "radio-group",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-select-option-state-BZsGyinK-Q9nb2tY6.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js"
    ]
  },
  "_render-children-Boj7expS-D6hYE6Hs.js": {
    "file": "assets/render-children-Boj7expS-D6hYE6Hs.js",
    "name": "render-children-Boj7expS"
  },
  "_select-BG1VAcnr.js": {
    "file": "assets/select-BG1VAcnr.js",
    "name": "select",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-select-option-state-BZsGyinK-Q9nb2tY6.js",
      "_create-type-ahead-D7XuTmw8-BwAY1yW3.js"
    ]
  },
  "_slider-C1cXT1Ag.js": {
    "file": "assets/slider-C1cXT1Ag.js",
    "name": "slider",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js"
    ]
  },
  "_state-props-DfhLIMSe-D3khsT6q.js": {
    "file": "assets/state-props-DfhLIMSe-D3khsT6q.js",
    "name": "state-props-DfhLIMSe"
  },
  "_switch-C03Ihrid.js": {
    "file": "assets/switch-C03Ihrid.js",
    "name": "switch",
    "imports": [
      "_web-WTO7VBOb.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_create-check-state-BgtObO8G-Bur2tLU7.js"
    ]
  },
  "_tabs-DMlmOSZm.js": {
    "file": "assets/tabs-DMlmOSZm.js",
    "name": "tabs",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_is-equal-alR503FG-Bfkm5lx3.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-select-option-state-BZsGyinK-Q9nb2tY6.js"
    ]
  },
  "_toggle-CWejk1PY.js": {
    "file": "assets/toggle-CWejk1PY.js",
    "name": "toggle",
    "imports": [
      "_web-WTO7VBOb.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_render-children-Boj7expS-D6hYE6Hs.js"
    ]
  },
  "_toolbar-D8v7COD1.js": {
    "file": "assets/toolbar-D8v7COD1.js",
    "name": "toolbar",
    "imports": [
      "_web-WTO7VBOb.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js"
    ]
  },
  "_transition-BgE5s0Bh.js": {
    "file": "assets/transition-BgE5s0Bh.js",
    "name": "transition",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_wait-for-transition-C4ndidCV-0ATVw2Cd.js"
    ]
  },
  "_tree-BtDxE36q.js": {
    "file": "assets/tree-BtDxE36q.js",
    "name": "tree",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_is-equal-alR503FG-Bfkm5lx3.js",
      "_create-select-state-QDPEMoNL-Cu3spZZI.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-type-ahead-D7XuTmw8-BwAY1yW3.js"
    ]
  },
  "_unmountable-BmDRqyg7-C-w4UCle.js": {
    "file": "assets/unmountable-BmDRqyg7-C-w4UCle.js",
    "name": "unmountable-BmDRqyg7",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_use-focus-start-point-z3RF_bYZ-BagrMAqf.js": {
    "file": "assets/use-focus-start-point-z3RF_bYZ-BagrMAqf.js",
    "name": "use-focus-start-point-z3RF_bYZ",
    "imports": ["_web-WTO7VBOb.js"]
  },
  "_wait-for-transition-C4ndidCV-0ATVw2Cd.js": {
    "file": "assets/wait-for-transition-C4ndidCV-0ATVw2Cd.js",
    "name": "wait-for-transition-C4ndidCV"
  },
  "_web-WTO7VBOb.js": {
    "file": "assets/web-WTO7VBOb.js",
    "name": "web"
  },
  "content/components/accordion.md": {
    "file": "assets/accordion-CX_Qs4x3.js",
    "name": "accordion",
    "src": "content/components/accordion.md",
    "isDynamicEntry": true
  },
  "content/components/alert-dialog.md": {
    "file": "assets/alert-dialog-CqJC7Bn9.js",
    "name": "alert-dialog",
    "src": "content/components/alert-dialog.md",
    "isDynamicEntry": true
  },
  "content/components/alert.md": {
    "file": "assets/alert-CvNKzuQ-.js",
    "name": "alert",
    "src": "content/components/alert.md",
    "isDynamicEntry": true
  },
  "content/components/breadcrumb.md": {
    "file": "assets/breadcrumb-B7BnnQLW.js",
    "name": "breadcrumb",
    "src": "content/components/breadcrumb.md",
    "isDynamicEntry": true
  },
  "content/components/button.md": {
    "file": "assets/button-BBkUk3co.js",
    "name": "button",
    "src": "content/components/button.md",
    "isDynamicEntry": true
  },
  "content/components/checkbox.md": {
    "file": "assets/checkbox-B9rzozss.js",
    "name": "checkbox",
    "src": "content/components/checkbox.md",
    "isDynamicEntry": true
  },
  "content/components/color-scheme.md": {
    "file": "assets/color-scheme-BEln6t-P.js",
    "name": "color-scheme",
    "src": "content/components/color-scheme.md",
    "isDynamicEntry": true
  },
  "content/components/combobox.md": {
    "file": "assets/combobox-CqAOLdTQ.js",
    "name": "combobox",
    "src": "content/components/combobox.md",
    "isDynamicEntry": true
  },
  "content/components/command-bar.md": {
    "file": "assets/command-bar-DAWkyUkg.js",
    "name": "command-bar",
    "src": "content/components/command-bar.md",
    "isDynamicEntry": true
  },
  "content/components/command.md": {
    "file": "assets/command-CPIqgDsc.js",
    "name": "command",
    "src": "content/components/command.md",
    "isDynamicEntry": true
  },
  "content/components/context-menu.md": {
    "file": "assets/context-menu-C-1yvawi.js",
    "name": "context-menu",
    "src": "content/components/context-menu.md",
    "isDynamicEntry": true
  },
  "content/components/dialog.md": {
    "file": "assets/dialog-DTrbM5aG.js",
    "name": "dialog",
    "src": "content/components/dialog.md",
    "isDynamicEntry": true
  },
  "content/components/disclosure.md": {
    "file": "assets/disclosure-AOWHM1gd.js",
    "name": "disclosure",
    "src": "content/components/disclosure.md",
    "isDynamicEntry": true
  },
  "content/components/feed.md": {
    "file": "assets/feed-eC2w8ace.js",
    "name": "feed",
    "src": "content/components/feed.md",
    "isDynamicEntry": true
  },
  "content/components/grid.md": {
    "file": "assets/grid-C0gfq8EG.js",
    "name": "grid",
    "src": "content/components/grid.md",
    "isDynamicEntry": true
  },
  "content/components/listbox.md": {
    "file": "assets/listbox-CAxQf7iL.js",
    "name": "listbox",
    "src": "content/components/listbox.md",
    "isDynamicEntry": true
  },
  "content/components/menu.md": {
    "file": "assets/menu-BgGq_a7e.js",
    "name": "menu",
    "src": "content/components/menu.md",
    "isDynamicEntry": true
  },
  "content/components/meter.md": {
    "file": "assets/meter-C50p-oQo.js",
    "name": "meter",
    "src": "content/components/meter.md",
    "isDynamicEntry": true
  },
  "content/components/popover.md": {
    "file": "assets/popover-qx8rmq16.js",
    "name": "popover",
    "src": "content/components/popover.md",
    "isDynamicEntry": true
  },
  "content/components/radio-group.md": {
    "file": "assets/radio-group-CpyImu-0.js",
    "name": "radio-group",
    "src": "content/components/radio-group.md",
    "isDynamicEntry": true
  },
  "content/components/select.md": {
    "file": "assets/select--BcNB_Jy.js",
    "name": "select",
    "src": "content/components/select.md",
    "isDynamicEntry": true
  },
  "content/components/slider.md": {
    "file": "assets/slider-CWU_HLsr.js",
    "name": "slider",
    "src": "content/components/slider.md",
    "isDynamicEntry": true
  },
  "content/components/spinbutton.md": {
    "file": "assets/spinbutton-DXkGsY8p.js",
    "name": "spinbutton",
    "src": "content/components/spinbutton.md",
    "isDynamicEntry": true
  },
  "content/components/splitter.md": {
    "file": "assets/splitter-0_0ffiN9.js",
    "name": "splitter",
    "src": "content/components/splitter.md",
    "isDynamicEntry": true
  },
  "content/components/switch.md": {
    "file": "assets/switch-D1L3fLKv.js",
    "name": "switch",
    "src": "content/components/switch.md",
    "isDynamicEntry": true
  },
  "content/components/tabs.md": {
    "file": "assets/tabs-B2sqlhR4.js",
    "name": "tabs",
    "src": "content/components/tabs.md",
    "isDynamicEntry": true
  },
  "content/components/toast.md": {
    "file": "assets/toast-DBBKgxb3.js",
    "name": "toast",
    "src": "content/components/toast.md",
    "isDynamicEntry": true
  },
  "content/components/toggle.md": {
    "file": "assets/toggle-B8ND0HsD.js",
    "name": "toggle",
    "src": "content/components/toggle.md",
    "isDynamicEntry": true
  },
  "content/components/toolbar.md": {
    "file": "assets/toolbar-BgoK3JBz.js",
    "name": "toolbar",
    "src": "content/components/toolbar.md",
    "isDynamicEntry": true
  },
  "content/components/tooltip.md": {
    "file": "assets/tooltip-BHlFylcV.js",
    "name": "tooltip",
    "src": "content/components/tooltip.md",
    "isDynamicEntry": true
  },
  "content/components/transition.md": {
    "file": "assets/transition-BZJ66O7U.js",
    "name": "transition",
    "src": "content/components/transition.md",
    "isDynamicEntry": true
  },
  "content/components/tree.md": {
    "file": "assets/tree-DdXsLETJ.js",
    "name": "tree",
    "src": "content/components/tree.md",
    "isDynamicEntry": true
  },
  "content/components/treegrid.md": {
    "file": "assets/treegrid-D6hH6Pax.js",
    "name": "treegrid",
    "src": "content/components/treegrid.md",
    "isDynamicEntry": true
  },
  "content/guides/getting-started.md": {
    "file": "assets/getting-started--fE3nu9A.js",
    "name": "getting-started",
    "src": "content/guides/getting-started.md",
    "isDynamicEntry": true
  },
  "content/guides/keyboard-and-focus.md": {
    "file": "assets/keyboard-and-focus-eiSBwIh_.js",
    "name": "keyboard-and-focus",
    "src": "content/guides/keyboard-and-focus.md",
    "isDynamicEntry": true
  },
  "content/guides/rendering.md": {
    "file": "assets/rendering-CXNYlU1e.js",
    "name": "rendering",
    "src": "content/guides/rendering.md",
    "isDynamicEntry": true
  },
  "content/guides/ssr.md": {
    "file": "assets/ssr-CiE8Ihso.js",
    "name": "ssr",
    "src": "content/guides/ssr.md",
    "isDynamicEntry": true
  },
  "content/guides/state.md": {
    "file": "assets/state-DMf4zc_E.js",
    "name": "state",
    "src": "content/guides/state.md",
    "isDynamicEntry": true
  },
  "content/guides/styling.md": {
    "file": "assets/styling-DdA-vwoA.js",
    "name": "styling",
    "src": "content/guides/styling.md",
    "isDynamicEntry": true
  },
  "content/states.md": {
    "file": "assets/states-BgTzREG9.js",
    "name": "states",
    "src": "content/states.md",
    "isDynamicEntry": true
  },
  "src/demos/accordion/basic.tsx": {
    "file": "assets/basic-BmHB8aJy.js",
    "name": "basic",
    "src": "src/demos/accordion/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_accordion-DicBqgQv.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/accordion/disabled.tsx": {
    "file": "assets/disabled-BSwPuq7E.js",
    "name": "disabled",
    "src": "src/demos/accordion/disabled.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_accordion-DicBqgQv.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/accordion/multiple.tsx": {
    "file": "assets/multiple-BqkrH7vD.js",
    "name": "multiple",
    "src": "src/demos/accordion/multiple.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_accordion-DicBqgQv.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/alert-dialog/destructive.tsx": {
    "file": "assets/destructive-Cp7HfZfR.js",
    "name": "destructive",
    "src": "src/demos/alert-dialog/destructive.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_modal-DC-7wmtP-Ctmjj8Vv.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/alert/form-error.tsx": {
    "file": "assets/form-error-DUy46rig.js",
    "name": "form-error",
    "src": "src/demos/alert/form-error.tsx",
    "imports": ["_web-WTO7VBOb.js", "_alert-C11V16qx.js"],
    "isDynamicEntry": true
  },
  "src/demos/alert/severity.tsx": {
    "file": "assets/severity-BhDRYrKZ.js",
    "name": "severity",
    "src": "src/demos/alert/severity.tsx",
    "imports": ["_web-WTO7VBOb.js", "_alert-C11V16qx.js"],
    "isDynamicEntry": true
  },
  "src/demos/breadcrumb/basic.tsx": {
    "file": "assets/basic-Dk8VhfOx.js",
    "name": "basic",
    "src": "src/demos/breadcrumb/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_namespace-ByGKxOfw-D78zQsd_.js"],
    "isDynamicEntry": true
  },
  "src/demos/button/as-other-elements.tsx": {
    "file": "assets/as-other-elements-FlOm8fbl.js",
    "name": "as-other-elements",
    "src": "src/demos/button/as-other-elements.tsx",
    "imports": ["_web-WTO7VBOb.js", "_button-6aUc-Tcr.js"],
    "isDynamicEntry": true
  },
  "src/demos/button/basic.tsx": {
    "file": "assets/basic-BuOZBuRM.js",
    "name": "basic",
    "src": "src/demos/button/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_button-6aUc-Tcr.js"],
    "isDynamicEntry": true
  },
  "src/demos/button/disabled.tsx": {
    "file": "assets/disabled-B0K8BxZs.js",
    "name": "disabled",
    "src": "src/demos/button/disabled.tsx",
    "imports": ["_web-WTO7VBOb.js", "_button-6aUc-Tcr.js"],
    "isDynamicEntry": true
  },
  "src/demos/checkbox/basic.tsx": {
    "file": "assets/basic-CK-GyACn.js",
    "name": "basic",
    "src": "src/demos/checkbox/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_checkbox-BSAt_3Zi.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/checkbox/indeterminate.tsx": {
    "file": "assets/indeterminate-BDiDfYRv.js",
    "name": "indeterminate",
    "src": "src/demos/checkbox/indeterminate.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_checkbox-BSAt_3Zi.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/checkbox/switch.tsx": {
    "file": "assets/switch-RftTybFM.js",
    "name": "switch",
    "src": "src/demos/checkbox/switch.tsx",
    "imports": ["_web-WTO7VBOb.js", "_checkbox-BSAt_3Zi.js"],
    "isDynamicEntry": true
  },
  "src/demos/color-scheme/basic.tsx": {
    "file": "assets/basic-D0Hdas8_.js",
    "name": "basic",
    "src": "src/demos/color-scheme/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_radio-group-Dug8Rkf1.js",
      "_color-scheme-WdVV-_BI.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/color-scheme/controlled.tsx": {
    "file": "assets/controlled-7a4rxCbo.js",
    "name": "controlled",
    "src": "src/demos/color-scheme/controlled.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_radio-group-Dug8Rkf1.js",
      "_color-scheme-WdVV-_BI.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/combobox/basic.tsx": {
    "file": "assets/basic-giDtKADY.js",
    "name": "basic",
    "src": "src/demos/combobox/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_button-6aUc-Tcr.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-autocomplete-option-state-E6bpVtEC-D-qH_QYp.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_wait-for-transition-C4ndidCV-0ATVw2Cd.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/command-bar/basic.tsx": {
    "file": "assets/basic-TNs-gDOK.js",
    "name": "basic",
    "src": "src/demos/command-bar/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_command-Bit7paDy.js",
      "_command-bar-m0qAZk0G.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/command/palette.tsx": {
    "file": "assets/palette-6GCtOXcD.js",
    "name": "palette",
    "src": "src/demos/command/palette.tsx",
    "imports": ["_web-WTO7VBOb.js", "_command-Bit7paDy.js"],
    "isDynamicEntry": true
  },
  "src/demos/context-menu/basic.tsx": {
    "file": "assets/basic-CsX3xdXg.js",
    "name": "basic",
    "src": "src/demos/context-menu/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_create-dependency-list-Lg_lpvpB-DBtZnRI-.js",
      "_use-focus-start-point-z3RF_bYZ-BagrMAqf.js",
      "_wait-for-transition-C4ndidCV-0ATVw2Cd.js",
      "_panel-tree-VwKgi9fn-CCSYGixs.js",
      "_menu-popup-C0F4Fm9V-NjHgah1B.js",
      "_menu-BD_jxrj1.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/dialog/basic.tsx": {
    "file": "assets/basic-CfGLMIZg.js",
    "name": "basic",
    "src": "src/demos/dialog/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_dialog-DKInkXHs.js"],
    "isDynamicEntry": true
  },
  "src/demos/dialog/drawer.tsx": {
    "file": "assets/drawer-DDIUwZY_.js",
    "name": "drawer",
    "src": "src/demos/dialog/drawer.tsx",
    "imports": ["_web-WTO7VBOb.js", "_dialog-DKInkXHs.js"],
    "isDynamicEntry": true
  },
  "src/demos/disclosure/basic.tsx": {
    "file": "assets/basic-DM5YHJ-0.js",
    "name": "basic",
    "src": "src/demos/disclosure/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_disclosure-Dzbld-mu.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/disclosure/close-from-panel.tsx": {
    "file": "assets/close-from-panel-BQm1DjF_.js",
    "name": "close-from-panel",
    "src": "src/demos/disclosure/close-from-panel.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_disclosure-Dzbld-mu.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/disclosure/controlled.tsx": {
    "file": "assets/controlled-CDzC9dh0.js",
    "name": "controlled",
    "src": "src/demos/disclosure/controlled.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_disclosure-Dzbld-mu.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/disclosure/disabled.tsx": {
    "file": "assets/disabled-BBmz4BUy.js",
    "name": "disabled",
    "src": "src/demos/disclosure/disabled.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_disclosure-Dzbld-mu.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/disclosure/render-prop.tsx": {
    "file": "assets/render-prop-DTgiHxvK.js",
    "name": "render-prop",
    "src": "src/demos/disclosure/render-prop.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_disclosure-Dzbld-mu.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/feed/timeline.tsx": {
    "file": "assets/timeline-DnrCYOy_.js",
    "name": "timeline",
    "src": "src/demos/feed/timeline.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_focus-navigation-Ci6kBRE_-DzJRausr.js",
      "_focus-navigator-o-2cjfr5-W1RsMk9J.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/grid/basic.tsx": {
    "file": "assets/basic-F4OXbMWK.js",
    "name": "basic",
    "src": "src/demos/grid/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_GridParts-DtGbmNA2-BVXqr8Fq.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/landing/specimen.tsx": {
    "file": "assets/specimen-COlSxy6k.js",
    "name": "specimen",
    "src": "src/demos/landing/specimen.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_radio-group-Dug8Rkf1.js",
      "_icons-Bj2qzwfl.js",
      "_switch-C03Ihrid.js",
      "_checkbox-BSAt_3Zi.js",
      "_slider-C1cXT1Ag.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/listbox/basic.tsx": {
    "file": "assets/basic-CYkYy36Z.js",
    "name": "basic",
    "src": "src/demos/listbox/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_listbox-BLzARioo.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/listbox/multiple.tsx": {
    "file": "assets/multiple-CkIGHO1K.js",
    "name": "multiple",
    "src": "src/demos/listbox/multiple.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_listbox-BLzARioo.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/menu/as-dropdown.tsx": {
    "file": "assets/as-dropdown-CGpqmb9F.js",
    "name": "as-dropdown",
    "src": "src/demos/menu/as-dropdown.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_menu-BD_jxrj1.js",
      "_popover-Ct0WXcHx.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/menu/basic.tsx": {
    "file": "assets/basic-BSdMQKwu.js",
    "name": "basic",
    "src": "src/demos/menu/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_menu-BD_jxrj1.js"],
    "isDynamicEntry": true
  },
  "src/demos/meter/basic.tsx": {
    "file": "assets/basic-CP0ypy5i.js",
    "name": "basic",
    "src": "src/demos/meter/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_create-part-id-C9i7Veuh-BwQNwvyo.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/popover/basic.tsx": {
    "file": "assets/basic-DNXXUSYo.js",
    "name": "basic",
    "src": "src/demos/popover/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_popover-Ct0WXcHx.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/popover/close-from-inside.tsx": {
    "file": "assets/close-from-inside-CGEy0zUB.js",
    "name": "close-from-inside",
    "src": "src/demos/popover/close-from-inside.tsx",
    "imports": ["_web-WTO7VBOb.js", "_popover-Ct0WXcHx.js"],
    "isDynamicEntry": true
  },
  "src/demos/radio-group/cards.tsx": {
    "file": "assets/cards-Cg7yi5l9.js",
    "name": "cards",
    "src": "src/demos/radio-group/cards.tsx",
    "imports": ["_web-WTO7VBOb.js", "_radio-group-Dug8Rkf1.js"],
    "isDynamicEntry": true
  },
  "src/demos/radio-group/dots.tsx": {
    "file": "assets/dots-B_8CEWLD.js",
    "name": "dots",
    "src": "src/demos/radio-group/dots.tsx",
    "imports": ["_web-WTO7VBOb.js", "_radio-group-Dug8Rkf1.js"],
    "isDynamicEntry": true
  },
  "src/demos/select/basic.tsx": {
    "file": "assets/basic-Cqyw8ae1.js",
    "name": "basic",
    "src": "src/demos/select/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_select-BG1VAcnr.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/select/multiple.tsx": {
    "file": "assets/multiple-D7ko5Mp-.js",
    "name": "multiple",
    "src": "src/demos/select/multiple.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_select-BG1VAcnr.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/slider/basic.tsx": {
    "file": "assets/basic-qFmcLZWK.js",
    "name": "basic",
    "src": "src/demos/slider/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_slider-C1cXT1Ag.js"],
    "isDynamicEntry": true
  },
  "src/demos/slider/range.tsx": {
    "file": "assets/range-BZswrMrH.js",
    "name": "range",
    "src": "src/demos/slider/range.tsx",
    "imports": ["_web-WTO7VBOb.js", "_slider-C1cXT1Ag.js"],
    "isDynamicEntry": true
  },
  "src/demos/spinbutton/basic.tsx": {
    "file": "assets/basic-LE1pP3nN.js",
    "name": "basic",
    "src": "src/demos/spinbutton/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_create-presence-DPlmnT12-U81_Jhtr.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/splitter/basic.tsx": {
    "file": "assets/basic-BpoUb_P8.js",
    "name": "basic",
    "src": "src/demos/splitter/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_create-part-id-C9i7Veuh-BwQNwvyo.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/switch/basic.tsx": {
    "file": "assets/basic-D7L_CRqb.js",
    "name": "basic",
    "src": "src/demos/switch/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_switch-C03Ihrid.js"],
    "isDynamicEntry": true
  },
  "src/demos/switch/controlled.tsx": {
    "file": "assets/controlled-BmPLygOI.js",
    "name": "controlled",
    "src": "src/demos/switch/controlled.tsx",
    "imports": ["_web-WTO7VBOb.js", "_switch-C03Ihrid.js"],
    "isDynamicEntry": true
  },
  "src/demos/tabs/controlled.tsx": {
    "file": "assets/controlled-CDXaG_HS.js",
    "name": "controlled",
    "src": "src/demos/tabs/controlled.tsx",
    "imports": ["_web-WTO7VBOb.js", "_tabs-DMlmOSZm.js"],
    "isDynamicEntry": true
  },
  "src/demos/tabs/horizontal.tsx": {
    "file": "assets/horizontal-CpcLuNdB.js",
    "name": "horizontal",
    "src": "src/demos/tabs/horizontal.tsx",
    "imports": ["_web-WTO7VBOb.js", "_tabs-DMlmOSZm.js"],
    "isDynamicEntry": true
  },
  "src/demos/tabs/vertical.tsx": {
    "file": "assets/vertical-TRSUppqk.js",
    "name": "vertical",
    "src": "src/demos/tabs/vertical.tsx",
    "imports": ["_web-WTO7VBOb.js", "_tabs-DMlmOSZm.js"],
    "isDynamicEntry": true
  },
  "src/demos/toast/basic.tsx": {
    "file": "assets/basic-DGypm-8J.js",
    "name": "basic",
    "src": "src/demos/toast/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_icons-Bj2qzwfl.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/toggle/basic.tsx": {
    "file": "assets/basic-Bl0X5CyX.js",
    "name": "basic",
    "src": "src/demos/toggle/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_toggle-CWejk1PY.js"],
    "isDynamicEntry": true
  },
  "src/demos/toggle/controlled.tsx": {
    "file": "assets/controlled-BkoG2sOH.js",
    "name": "controlled",
    "src": "src/demos/toggle/controlled.tsx",
    "imports": ["_web-WTO7VBOb.js", "_toggle-CWejk1PY.js"],
    "isDynamicEntry": true
  },
  "src/demos/toggle/switch.tsx": {
    "file": "assets/switch-CNGxT3Mt.js",
    "name": "switch",
    "src": "src/demos/toggle/switch.tsx",
    "imports": ["_web-WTO7VBOb.js", "_toggle-CWejk1PY.js"],
    "isDynamicEntry": true
  },
  "src/demos/toolbar/basic.tsx": {
    "file": "assets/basic-DycUeTs2.js",
    "name": "basic",
    "src": "src/demos/toolbar/basic.tsx",
    "imports": ["_web-WTO7VBOb.js", "_toolbar-D8v7COD1.js"],
    "isDynamicEntry": true
  },
  "src/demos/toolbar/with-terracotta-controls.tsx": {
    "file": "assets/with-terracotta-controls-CdWPxgIB.js",
    "name": "with-terracotta-controls",
    "src": "src/demos/toolbar/with-terracotta-controls.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_toggle-CWejk1PY.js",
      "_toolbar-D8v7COD1.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/tooltip/basic.tsx": {
    "file": "assets/basic-By5U_SWH.js",
    "name": "basic",
    "src": "src/demos/tooltip/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_unmountable-BmDRqyg7-C-w4UCle.js",
      "_create-disclosure-state-DVJTfDgk-DNfs9Ewd.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/transition/coordinated.tsx": {
    "file": "assets/coordinated-a0k_zXFm.js",
    "name": "coordinated",
    "src": "src/demos/transition/coordinated.tsx",
    "imports": ["_web-WTO7VBOb.js", "_transition-BgE5s0Bh.js"],
    "isDynamicEntry": true
  },
  "src/demos/transition/fade.tsx": {
    "file": "assets/fade-CWlns7Ms.js",
    "name": "fade",
    "src": "src/demos/transition/fade.tsx",
    "imports": ["_web-WTO7VBOb.js", "_transition-BgE5s0Bh.js"],
    "isDynamicEntry": true
  },
  "src/demos/tree/basic.tsx": {
    "file": "assets/basic-Bm31wo0i.js",
    "name": "basic",
    "src": "src/demos/tree/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_icons-Bj2qzwfl.js",
      "_tree-BtDxE36q.js"
    ],
    "isDynamicEntry": true
  },
  "src/demos/treegrid/basic.tsx": {
    "file": "assets/basic-B1btjESm.js",
    "name": "basic",
    "src": "src/demos/treegrid/basic.tsx",
    "imports": [
      "_web-WTO7VBOb.js",
      "_assert-C1B22CFL-B5Uxld8G.js",
      "_dynamic-prop-D5vmE5VV-hx1fKxza.js",
      "_namespace-ByGKxOfw-D78zQsd_.js",
      "_state-props-DfhLIMSe-D3khsT6q.js",
      "_merge-func-BjM0Aqkw-zaLgfc-c.js",
      "_render-children-Boj7expS-D6hYE6Hs.js",
      "_is-equal-alR503FG-Bfkm5lx3.js",
      "_focus-query-D9xn0IVo-BJwO1msc.js",
      "_icons-Bj2qzwfl.js",
      "_GridParts-DtGbmNA2-BVXqr8Fq.js"
    ],
    "isDynamicEntry": true
  },
  "virtual:search-index": {
    "file": "assets/_virtual_search-index-B68noVVs.js",
    "name": "_virtual_search-index",
    "src": "virtual:search-index",
    "isDynamicEntry": true
  },
  "_base": "/",
  "_entry": "virtual:solid-ssr-entry-client.tsx"
};
for (const key of Object.keys(manifest)) if (key[0] !== "/" && typeof manifest[key] === "object") Object.defineProperty(manifest, "/" + key, { value: manifest[key] });
var THEMES = [
  {
    id: "terracotta",
    name: "Terracotta",
    blurb: "The house style. Warm neutrals, generous spacing."
  },
  {
    id: "brutalist",
    name: "Brutalist",
    blurb: "Hard borders, square corners, offset shadows, caps."
  },
  {
    id: "glass",
    name: "Glass",
    blurb: "Frosted, translucent panels floating over a coloured wash."
  },
  {
    id: "terminal",
    name: "Terminal",
    blurb: "Monospace phosphor, scanlines, and a blinking cursor."
  },
  {
    id: "blueprint",
    name: "Blueprint",
    blurb: "Grid paper, hairlines, stencil labels, numbered sheets."
  },
  {
    id: "x-ray",
    name: "X-ray",
    blurb: "Devtools grey, with every tc- state attribute drawn as you use it."
  },
  {
    id: "editorial",
    name: "Editorial",
    blurb: "Ivory stock, serif text, drop caps and numbered figures."
  },
  {
    id: "bloom",
    name: "Bloom",
    blurb: "No lines anywhere: pills, soft fills, and a lift on hover."
  },
  {
    id: "win95",
    name: "Win95",
    blurb: "Windows 95: silver bevels, navy title bars and a teal desktop."
  },
  {
    id: "bevel",
    name: "Bevel",
    blurb: "Moulded surfaces: raised faces, recessed wells, buttons that press."
  }
];
var DEFAULT_THEME = "terracotta";
function isTheme(value) {
  return !!value && THEMES.some((theme) => theme.id === value);
}
var _m$$31 = /* @__PURE__ */ Symbol();
var _d$$32 = {
  get() {
    return this[_m$$31].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$32(_p, _p2) {
  this[_m$$31] = _p;
  this.value = _p2;
  Object.defineProperty(this, "children", _d$$32);
}
_P$$32.prototype = Object.prototype;
var SCHEME_STORAGE_KEY = "tc-docs-scheme";
var ColorSchemeContext = createContext();
function isScheme(value) {
  return value === "light" || value === "dark" || value === "system";
}
function readStoredScheme() {
  if (isServer) return "system";
  try {
    const stored = localStorage.getItem(SCHEME_STORAGE_KEY);
    return isScheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
}
function schemeFromQuery() {
  if (isServer) return null;
  const requested = new URLSearchParams(location.search).get("scheme");
  return isScheme(requested) ? requested : null;
}
function ColorSchemeProvider(props) {
  const requested = schemeFromQuery();
  const [scheme, setScheme] = createSignal(requested != null ? requested : readStoredScheme());
  const [systemDark, setSystemDark] = createSignal(!isServer && matchMedia("(prefers-color-scheme: dark)").matches);
  const preferred = createMemo(() => scheme() === "dark" || scheme() === "system" && systemDark() ? "dark" : "light");
  if (!isServer) {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onMedia = () => {
      setSystemDark(media.matches);
    };
    media.addEventListener("change", onMedia);
    const onStorage = (event) => {
      if (event.key === "tc-docs-scheme") setScheme(readStoredScheme());
    };
    window.addEventListener("storage", onStorage);
    onCleanup(() => {
      media.removeEventListener("change", onMedia);
      window.removeEventListener("storage", onStorage);
    });
  }
  createEffect(() => scheme(), (value) => {
    if (requested !== null && value === requested) return;
    try {
      localStorage.setItem(SCHEME_STORAGE_KEY, value);
    } catch {
    }
  });
  createEffect(() => preferred(), (value) => {
    document.documentElement.classList.toggle("dark", value === "dark");
  });
  return ColorSchemeContext(new _P$$32(props, {
    scheme,
    setScheme: (next) => {
      setScheme(next);
    },
    preferred,
    native: () => systemDark() ? "dark" : "light"
  }));
}
function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  return [context.scheme, context.setScheme];
}
function usePreferredColorScheme() {
  return useContext(ColorSchemeContext).preferred;
}
function useNativeColorScheme() {
  return useContext(ColorSchemeContext).native;
}
var _m$$30 = /* @__PURE__ */ Symbol();
var _d$$31 = {
  get() {
    return this[_m$$30].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$31(_p, _p2) {
  this[_m$$30] = _p;
  this.value = _p2;
  Object.defineProperty(this, "children", _d$$31);
}
_P$$31.prototype = Object.prototype;
var THEME_STORAGE_KEY = "tc-docs-theme";
var ThemeContext = createContext();
function readStoredTheme() {
  if (isServer) return DEFAULT_THEME;
  const attribute = document.documentElement.dataset.theme;
  if (isTheme(attribute)) return attribute;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}
function ThemeProvider(props) {
  const [theme, setTheme] = createSignal(readStoredTheme());
  createEffect(() => theme(), (value) => {
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
    }
  });
  return ThemeContext(new _P$$31(props, {
    theme,
    setTheme: (id) => {
      setTheme(id);
    }
  }));
}
function useTheme() {
  return useContext(ThemeContext);
}
var THEME_BOOT_SCRIPT = `(function(){try{
var q=new URLSearchParams(location.search);
var t=q.get('theme')||localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t)document.documentElement.dataset.theme=t;
var s=q.get('scheme')||localStorage.getItem(${JSON.stringify(SCHEME_STORAGE_KEY)})||'system';
var dark=s==='dark'||(s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
document.documentElement.classList.toggle('dark',dark);
}catch(e){}})()`;
var _tmpl$$14 = [
  "<html",
  ' lang="en"',
  "",
  '><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light dark"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><script>',
  "<\/script><!--$-->",
  "<!--/--></head><body>",
  "</body></html>"
];
function appearanceFromRequest() {
  if (!isServer) return {
    theme: DEFAULT_THEME,
    dark: false
  };
  const event = getRequestEvent();
  if (!event) return {
    theme: DEFAULT_THEME,
    dark: false
  };
  const search = new URL(event.request.url).searchParams;
  const theme = search.get("theme");
  return {
    theme: isTheme(theme) ? theme : DEFAULT_THEME,
    dark: search.get("scheme") === "dark"
  };
}
function Document(props) {
  const appearance = appearanceFromRequest();
  var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => {
    return [ssrAttribute("data-theme", escape(appearance.theme, true)), ((_v$3) => _v$3 == null ? "" : ssrAttribute("class", ssrClassName(_v$3)))(appearance.dark ? "dark" : void 0)];
  }, 2), _v$5 = THEME_BOOT_SCRIPT, _v$6 = escape(HydrationScript({})), _v$7 = scope(() => {
    return escape(props.children);
  });
  return ssr(_tmpl$$14, _v$, _g$, _g$, _v$5, _v$6, _v$7);
}
var hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
var trimPathRegex = /^\/+|(\/)\/+$/g;
var mockBase = "http://sr";
function normalizePath(path, omitSlash = false) {
  const s = path.replace(trimPathRegex, "$1");
  return s ? omitSlash || /^[?#]/.test(s) ? s : "/" + s : "";
}
var comparablePath = (path) => {
  const p = normalizePath(path.split(/[?#]/, 1)[0]);
  return (isServer && isPlainPath(p) ? p : new URL(mockBase + p).pathname).toLowerCase().replace(/\/$/, "");
};
var plainPathRegex = /^[\w\-.~!$&'()*+,;=:@/]*$/;
var dotSegmentRegex = /(?:^|\/)\.\.?(?:\/|$)/;
var plainHrefRegex = /^(\/(?![/\\])[\w\-.~!$&'()*+,;=:@/]*)(?:\?([\w\-.~!$&()*+,;=:@/?]*))?(?:#|$)/;
var hasDotSegment = (path) => path.includes("/.") && dotSegmentRegex.test(path);
var isPlainPath = (path) => plainPathRegex.test(path) && !hasDotSegment(path);
function plainHref(href) {
  const m = plainHrefRegex.exec(href);
  if (!m || hasDotSegment(m[1])) return;
  const pathname = m[1];
  const comparable = (pathname.endsWith("/") ? pathname.replace(/\/+$/, "") : pathname).toLowerCase();
  return {
    pathname,
    search: m[2] ? "?" + m[2] : "",
    comparable
  };
}
function isUnderBase(pathname, base) {
  const b = base.toLowerCase().replace(/\/+$/, "");
  const p = pathname.split(/[?#]/, 1)[0].toLowerCase();
  return !b || !p || p === b || p.startsWith(b + "/");
}
var comparableQuery = (search) => {
  const params = new URLSearchParams(search);
  params.sort();
  return params.toString();
};
function linkMatcher({ pathname, search }, base, end) {
  const loc = comparablePath(pathname);
  const root = comparablePath(base);
  return (target, path = target === void 0 ? "" : comparablePath(target)) => {
    if (target === void 0) return {
      active: false,
      current: false
    };
    if (loc !== path) return {
      active: true && path !== "" && path !== root && loc.startsWith(path + "/"),
      current: false
    };
    const hashless = target.split("#", 1)[0];
    const q = hashless.indexOf("?");
    return {
      active: true,
      current: comparableQuery(search) === comparableQuery(q < 0 ? "" : hashless.slice(q))
    };
  };
}
function resolvePath(base, path, from) {
  if (hasSchemeRegex.test(path)) return;
  const basePath = normalizePath(base);
  const fromPath = from && normalizePath(from);
  const result = path.startsWith("/") ? "" : !fromPath ? basePath : fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0 ? basePath + fromPath : fromPath;
  return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
  if (value == null) throw new Error(message);
  return value;
}
function joinPaths(from, to) {
  return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function validateSearch(schema, raw) {
  const outcome = schema["~standard"].validate(raw);
  if (outcome instanceof Promise) throw new Error("Async Standard Schema validation is not supported for search params");
  return outcome;
}
function extractSearchParams(url) {
  const params = /* @__PURE__ */ Object.create(null);
  url.searchParams.forEach((value, key) => {
    if (key in params) {
      if (Array.isArray(params[key])) params[key].push(value);
      else params[key] = [params[key], value];
    } else params[key] = value;
  });
  return { ...params };
}
function createMatcher(path, partial, matchFilters) {
  const [pattern, splat] = path.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  const len = segments.length;
  return (location2) => {
    const locSegments = location2.split("/");
    if (locSegments[0] === "") locSegments.shift();
    if (locSegments.length && locSegments[locSegments.length - 1] === "") locSegments.pop();
    if (locSegments.includes("")) return null;
    const lenDiff = locSegments.length - len;
    if (lenDiff < 0 || lenDiff > 0 && splat === void 0 && !partial) return null;
    const match = {
      path: len ? "" : "/",
      params: {}
    };
    const filters = matchFilters;
    for (let i = 0; i < len; i++) {
      const segment = segments[i];
      const dynamic2 = segment[0] === ":";
      const locSegment = dynamic2 ? locSegments[i] : locSegments[i].toLowerCase();
      const key = dynamic2 ? segment.slice(1) : segment.toLowerCase();
      let value;
      if (dynamic2 && matchSegment(value = decodeParam(locSegment), filters == null ? void 0 : filters[key])) match.params[key] = value;
      else if (dynamic2 || !matchSegment(locSegment, key)) return null;
      match.path += `/${locSegment}`;
    }
    if (splat) {
      const remainder = lenDiff ? locSegments.slice(-lenDiff).map(decodeParam).join("/") : "";
      if (matchSegment(remainder, filters == null ? void 0 : filters[splat])) match.params[splat] = remainder;
      else return null;
    }
    return match;
  };
}
var decodeParam = (segment) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};
var matchSegment = (input, filter) => filter === void 0 || (typeof filter === "function" ? filter(input) : Array.isArray(filter) ? filter.includes(input) : filter instanceof RegExp ? filter.test(input) : filter === input);
function scoreRoute(route) {
  const [pattern, splat] = route.pattern.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === void 0 ? 0 : 1));
}
function createMemoObject(fn) {
  const map = /* @__PURE__ */ new Map();
  const owner = getOwner();
  return new Proxy({}, {
    get(_, property) {
      if (!map.has(property)) runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
      return map.get(property)();
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    ownKeys() {
      return Reflect.ownKeys(fn());
    },
    has(_, property) {
      return property in fn();
    }
  });
}
function mergeSearchString(search, params) {
  const merged = new URLSearchParams(search);
  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === "" || value instanceof Array && !value.length) merged.delete(key);
    else if (value instanceof Array) {
      merged.delete(key);
      value.forEach((v) => {
        merged.append(key, String(v));
      });
    } else merged.set(key, String(value));
  });
  const s = merged.toString();
  return s ? `?${s}` : "";
}
function expandOptionals(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match) return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map((p) => p + expansion)], []);
}
var formClaim;
function setupLinkClaims(router, explicitLinks, links) {
  const basePath = router.base.path();
  const plugin = links && links(router, basePath);
  const serverState = hasServerLinkState();
  const claimed = /* @__PURE__ */ new WeakMap();
  const registry = /* @__PURE__ */ new Set();
  function isSvg(el) {
    return el.namespaceURI === "http://www.w3.org/2000/svg";
  }
  function managedUrl(a) {
    if (explicitLinks && !a.hasAttribute("link")) return;
    const svg = isSvg(a);
    return managedLinkUrl({
      href: svg ? a.href.baseVal : a.getAttribute("href"),
      target: svg ? a.target.baseVal : a.target,
      rel: a.getAttribute("rel"),
      download: a.hasAttribute("download"),
      link: true
    }, false, document.baseURI, window.location.origin, basePath);
  }
  const match = locationMatcher(router, basePath);
  function linkState(a) {
    router.location;
    const routing = plugin && plugin.track();
    const url = managedUrl(a);
    const target = url && url.pathname + url.search;
    const { active, current } = match(target);
    return {
      active,
      pending: !!routing && plugin.pending(target),
      current
    };
  }
  function apply(a, rec, { active, pending, current }) {
    active ? a.setAttribute("data-active", "") : a.removeAttribute("data-active");
    if (plugin) pending ? a.setAttribute("data-pending", "") : a.removeAttribute("data-pending");
    const value = a.getAttribute("aria-current");
    if (rec.owned && value !== null && value !== "page") rec.owned = false;
    else if (current) {
      if (value === null) {
        a.setAttribute("aria-current", "page");
        rec.owned = true;
      }
    } else if (rec.owned) {
      if (value !== null) a.removeAttribute("aria-current");
      rec.owned = false;
    }
  }
  const refresh = (a, rec) => untrack(() => apply(a, rec, linkState(a)));
  createRenderEffect(() => (router.location.pathname, router.location.search, plugin && plugin.track()), () => registry.forEach((a) => refresh(a, claimed.get(a))), { transparent: true });
  onCleanup(registerElementClaim((node) => {
    const name = node.nodeName.toUpperCase();
    if (name === "FORM") return formClaim;
    if (name !== "A") return;
    const a = node;
    const existing = claimed.get(a);
    if (existing) return refresh(a, existing);
    const hydrating = serverState && isHydrating();
    const rec = { owned: (hydrating || serverState && a.isConnected) && a.getAttribute("aria-current") === "page" && a.hasAttribute("data-active") };
    claimed.set(a, rec);
    if (getOwner()) {
      registry.add(a);
      onCleanup(() => registry.delete(a));
    }
    if (!hydrating || !rec.owned && a.getAttribute("aria-current") !== null) refresh(a, rec);
  }));
}
function managedLinkUrl(a, explicitLinks, page, origin, basePath) {
  if (explicitLinks && !a.link || a.target || !a.href || a.download) return;
  if (a.rel && a.rel.split(/\s+/).includes("external")) return;
  let url = isServer ? plainHref(a.href) : void 0;
  if (!url) {
    let parsed;
    try {
      parsed = new URL(a.href, page);
    } catch {
      return;
    }
    if (parsed.origin !== origin) return;
    url = parsed;
  }
  if (!isUnderBase(url.pathname, basePath)) return;
  return url;
}
function locationMatcher(router, basePath) {
  let matched;
  let match;
  return (target, comparable) => {
    const location2 = router.location;
    const key = location2.pathname + location2.search;
    if (key !== matched) {
      matched = key;
      match = linkMatcher(location2, basePath);
    }
    return match(target, comparable);
  };
}
var attr = (v) => v == null || v === false ? null : v === true ? "" : String(v);
function setupServerLinkClaims(router, explicitLinks, page) {
  const basePath = router.base.path();
  const origin = page.origin;
  const match = locationMatcher(router, basePath);
  setLinkClaim((attrs) => {
    const url = managedLinkUrl({
      href: attr(attrs.href),
      target: attr(attrs.target) || "",
      rel: attr(attrs.rel),
      download: attr(attrs.download) !== null,
      link: attr(attrs.link) !== null
    }, explicitLinks, page, origin, basePath);
    if (!url) return "";
    const { active, current } = match(url.pathname + url.search, url.comparable);
    return current ? ' data-active aria-current="page"' : active ? " data-active" : "";
  });
}
var linkPreloader;
function setupNativeEvents({ preload, explicitLinks = false, actionBase = "/_server" } = {}) {
  return (router) => {
    const basePath = router.base.path();
    const navigateFromRoute = router.navigatorFactory(router.base);
    function isSvg(el) {
      return el.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function handleAnchor(evt) {
      if (evt.defaultPrevented || evt.button !== 0 || evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) return;
      return findAnchor(evt);
    }
    function findAnchor(evt) {
      const a = evt.composedPath().find((el) => el instanceof Node && el.nodeName.toUpperCase() === "A");
      const url = a && anchorUrl(a);
      return url && [a, url];
    }
    function anchorUrl(a) {
      if (explicitLinks && !a.hasAttribute("link")) return;
      const svg = isSvg(a);
      const href = svg ? a.href.baseVal : a.href;
      if ((svg ? a.target.baseVal : a.target) || !href && !a.hasAttribute("state")) return;
      const rel = (a.getAttribute("rel") || "").split(/\s+/);
      if (a.hasAttribute("download") || rel.includes("external")) return;
      const url = new URL(href, document.baseURI);
      if (url.protocol !== "https:" && url.protocol !== "http:") return;
      if (url.origin !== window.location.origin || !isUnderBase(url.pathname, basePath)) return;
      return url;
    }
    function handleAnchorClick(evt) {
      const res = handleAnchor(evt);
      if (!res) return;
      const [a, url] = res;
      const to = router.parsePath(url.pathname + url.search + url.hash);
      const state = a.getAttribute("state");
      evt.preventDefault();
      dispatchAsInteraction(evt, () => navigateFromRoute(to, {
        resolve: false,
        replace: a.hasAttribute("replace"),
        scroll: !a.hasAttribute("noscroll"),
        state: state ? JSON.parse(state) : void 0
      }));
    }
    function handleFormSubmit(evt) {
      if (evt.defaultPrevented) return;
      const form = evt.target;
      const ref = evt.submitter && evt.submitter.hasAttribute("formaction") ? evt.submitter.getAttribute("formaction") : form.getAttribute("action");
      if (!ref || ref.startsWith("https://action/")) return;
      const url = new URL(ref, document.baseURI);
      if (!router.parsePath(url.pathname + url.search).startsWith(actionBase) || form.method.toUpperCase() !== "POST") return;
    }
    const handleSubmit = (evt) => dispatchAsInteraction(evt, () => handleFormSubmit(evt));
    delegateEvents(["click", "submit"]);
    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("submit", handleSubmit);
    onCleanup(() => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("submit", handleSubmit);
    });
    if (preload && preload !== true) [].concat(preload).forEach((strategy) => strategy({
      anchor: findAnchor,
      url: anchorUrl,
      preload: (url, data) => linkPreloader(router, url, data)
    }));
  };
}
var encodeParam = (value) => String(value).split("/").map(encodeURIComponent).join("/");
var HREF = /* @__PURE__ */ Symbol.for("solid.Href");
function createPathsProxy(renderPath = (p) => p, base = "") {
  const toHref = (pathname, suffix = "") => renderPath(pathname || "/") + suffix;
  function node(pathname) {
    const build = (...args) => {
      let path = pathname;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (typeof arg === "object" && arg !== null) {
          const hash = typeof args[i + 1] === "string" ? `#${args[i + 1]}` : "";
          return toHref(path, mergeSearchString("", arg) + hash);
        }
        path += `/${encodeParam(arg)}`;
      }
      return args.length ? node(path) : toHref(path);
    };
    return new Proxy(build, { get(_, prop) {
      if (prop === "toString" || prop === Symbol.toPrimitive) return () => toHref(pathname);
      if (typeof prop === "symbol") return prop === HREF ? pathname || "/" : void 0;
      return node(`${pathname}/${prop}`);
    } });
  }
  return node(normalizePath(base));
}
var SERVER_ROUTE = /* @__PURE__ */ Symbol("solid-router.serverRoute");
function serverRouteOf(component) {
  return component == null ? void 0 : component[SERVER_ROUTE];
}
function serverRouteArgs(route, params, query2) {
  var _a2;
  const schema = (_a2 = route.key) == null ? void 0 : _a2.search;
  if (schema) {
    const raw = { ...query2 };
    const outcome = validateSearch(schema, raw);
    return {
      params: { ...params },
      search: outcome.issues ? raw : outcome.value
    };
  }
  return { params: { ...params } };
}
var shallowEqual = (a, b) => a === b || !!a && !!b && typeof a === "object" && typeof b === "object" && Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((k) => a[k] === b[k]);
function serverRouteArgsEqual(a, b) {
  return shallowEqual(a.params, b.params) && shallowEqual(a.search, b.search);
}
var MAX_REDIRECTS = 100;
function resolveLocationWrite(headed, next) {
  const value = typeof next.value === "function" ? next.value(headed) : next.value;
  if (value === void 0 || value === headed.value && next.state === headed.state) return;
  return {
    ...next,
    value
  };
}
var RouterContextObj = createContext();
var RouteContextObj = createContext();
function useOptionalContext(context) {
  try {
    return useContext(context);
  } catch {
    return;
  }
}
var useRouter = () => invariant(useContext(RouterContextObj), "<A> and 'use' router primitives can be only used inside a Route.");
var useRoute = () => useOptionalContext(RouteContextObj) || useRouter().base;
var useNavigate = () => useRouter().navigatorFactory();
var useLocation = () => useRouter().location;
function useParams(_path) {
  return useRoute().params;
}
var encodeSegment = (s) => encodeURIComponent(s).replace(/%(2B|40|3A|24|26|2C|3B|3D)/g, (m) => decodeURIComponent(m));
var lazyBoundaries = /* @__PURE__ */ new WeakMap();
var lazyTreeCounter = 0;
var [lazyTreeVersion, setLazyTreeVersion] = createSignal(0);
function trackLazySubtrees() {
  return isServer ? lazyTreeCounter : lazyTreeVersion();
}
function getLazyBoundary(thunk) {
  let record = lazyBoundaries.get(thunk);
  if (!record) lazyBoundaries.set(thunk, record = { thunk });
  return record;
}
function resolveLazySubtree(record) {
  if (record.resolved) return record.resolved;
  if (record.error !== void 0) {
    if (!record.sweep) {
      record.sweep = true;
      queueMicrotask(() => record.error = record.sweep = void 0);
    }
    throw record.error;
  }
  return record.promise || (record.promise = Promise.resolve(record.thunk()).then((m) => {
    record.resolved = Array.isArray(m) ? m : m.default || m.routes || [];
    lazyTreeCounter++;
    isServer || setLazyTreeVersion(lazyTreeCounter);
    return record.resolved;
  }, (e) => {
    if (!isServer) {
      record.error = e != null ? e : /* @__PURE__ */ new Error();
      record.sweep = true;
      queueMicrotask(() => record.error = record.sweep = void 0);
    }
    record.promise = void 0;
    throw e;
  }));
}
function unresolvedLazyMatches(matches) {
  const pending = [];
  for (const match of matches) if (match.route.lazy && !match.route.lazy.resolved) pending.push(match.route.lazy);
  return pending;
}
function createLazyPlaceholder(pattern, record) {
  const placeholderPattern = pattern + "/*";
  return {
    key: record,
    originalPath: "*",
    pattern: placeholderPattern,
    matcher: createMatcher(placeholderPattern),
    lazy: record
  };
}
function createRoutes(routeDef, base = "") {
  const { component, preload, children: children2, info } = routeDef;
  const isLeaf = !children2 || Array.isArray(children2) && !children2.length;
  const shared = {
    key: routeDef,
    component,
    preload,
    info
  };
  return asArray(routeDef.path).reduce((acc, originalPath) => {
    for (const expandedPath of expandOptionals(originalPath)) {
      const path = joinPaths(base, expandedPath);
      let pattern = isLeaf ? path : path.split("/*", 1)[0];
      pattern = pattern.split("/").map((s) => /^[:*]/.test(s) ? s : encodeSegment(s)).join("/");
      acc.push({
        ...shared,
        originalPath,
        pattern,
        matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
      });
    }
    return acc;
  }, []);
}
function createBranch(routes, index = 0) {
  return {
    routes,
    score: scoreRoute(routes[routes.length - 1]) * 1e4 - index,
    matcher(location2) {
      const matches = [];
      for (let i = routes.length - 1; i >= 0; i--) {
        const route = routes[i];
        const match = route.matcher(location2);
        if (!match) return null;
        matches.unshift({
          ...match,
          route
        });
      }
      return matches;
    }
  };
}
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", stack = [], branches = []) {
  const routeDefs = asArray(routeDef);
  for (let i = 0, len = routeDefs.length; i < len; i++) {
    const def = routeDefs[i];
    if (def && typeof def === "object") {
      if (def.path === void 0) def.path = "";
      const routes = createRoutes(def, base);
      for (const route of routes) {
        stack.push(route);
        let children2 = def.children;
        if (typeof children2 === "function") {
          const record = getLazyBoundary(children2);
          if (record.resolved) children2 = record.resolved;
          else {
            stack.push(createLazyPlaceholder(route.pattern, record));
            branches.push(createBranch([...stack], branches.length));
            stack.pop();
            stack.pop();
            continue;
          }
        }
        const isEmptyArray = Array.isArray(children2) && children2.length === 0;
        if (children2 && !isEmptyArray) createBranches(children2, route.pattern, stack, branches);
        else {
          const branch = createBranch([...stack], branches.length);
          branches.push(branch);
        }
        stack.pop();
      }
    }
  }
  return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location2) {
  for (let i = 0, len = branches.length; i < len; i++) {
    const match = branches[i].matcher(location2);
    if (match) return match;
  }
  return [];
}
function mergeParams(matches) {
  const params = {};
  for (let i = 0; i < matches.length; i++) Object.assign(params, matches[i].params);
  return params;
}
function createLocation(path, state, queryWrapper) {
  const url = createMemo((prev = new URL(mockBase)) => {
    const path_ = path();
    try {
      return new URL(path_[0] === "/" ? mockBase + path_ : path_, mockBase);
    } catch (err) {
      DEV && console.error(`Invalid path ${path_}`);
      return prev;
    }
  }, {
    equals: (a, b) => a.href === b.href,
    ...DEV && { name: "router.url" }
  });
  const pathname = createMemo(() => url().pathname);
  const search = createMemo(() => url().search);
  const hash = createMemo(() => url().hash);
  const queryFn = createMemo(() => extractSearchParams(new URL(search(), mockBase)));
  return {
    get pathname() {
      return pathname();
    },
    get search() {
      return search();
    },
    get hash() {
      return hash();
    },
    get state() {
      return state();
    },
    get key() {
      return "";
    },
    query: queryWrapper ? queryWrapper(queryFn) : createMemoObject(queryFn)
  };
}
var flashStates = /* @__PURE__ */ new WeakMap();
function getIntent() {
  var _a2, _b;
  return (_b = (_a2 = useOptionalContext(RouterContextObj)) == null ? void 0 : _a2.intent) == null ? void 0 : _b.call(_a2);
}
var inPreloadFn = false;
function getInPreloadFn() {
  return inPreloadFn;
}
function setInPreloadFn(value) {
  inPreloadFn = value;
}
function createRouterContext(integration, branches, getContext, options = {}) {
  const { signal: [source, setSource], utils = {} } = integration;
  const parsePath = utils.parsePath || ((p) => p);
  const renderPath = utils.renderPath || ((p) => p);
  const beforeLeave = utils.beforeLeave || {};
  const basePath = resolvePath("", options.base || "");
  const initialSource = untrack(source);
  if (basePath === void 0) throw new Error(`${basePath} is not a valid base path`);
  else if (basePath && !initialSource.value) setSource({
    value: basePath,
    replace: true,
    scroll: false,
    _navigation: isServer ? void 0 : 1
  });
  let flushed = initialSource;
  const location2 = createLocation(() => (flushed = source()).value, () => source().state, utils.queryWrapper);
  let flash;
  if (isServer) {
    const e = getRequestEvent();
    if (e && !(e.router && e.router.submission)) {
      flash = flashStates.get(e);
      if (!flash) {
        const cookieHeader = e.request.headers.get("cookie");
        if (hasFlashCookie(cookieHeader)) {
          flashStates.set(e, flash = { cookieHeader });
          if (e.response && e.response.headers) e.response.headers.append("Set-Cookie", clearFlashCookie());
        }
      }
    }
  }
  const flashSubmission = flash !== void 0 ? createMemo(() => {
  }, {
    lazy: true,
    transparent: true
  }) : void 0;
  let submissions;
  const routerOwner = getOwner();
  const lazyReaders = /* @__PURE__ */ new WeakMap();
  const readLazySubtree = (record) => {
    let read = lazyReaders.get(record);
    if (!read) {
      read = runWithOwner(routerOwner, () => createMemo(() => {
        const result = resolveLazySubtree(record);
        return result instanceof Promise ? result.then(() => void 0) : void 0;
      }, {
        transparent: true,
        ...DEV && { name: "lazyRoutes" }
      }));
      lazyReaders.set(record, read);
    }
    return read();
  };
  const matchPath = (pathname) => getRouteMatches(branches(), options.transformUrl ? options.transformUrl(pathname) : pathname);
  const matches = createMemo(() => {
    const m = matchPath(location2.pathname);
    const pending = unresolvedLazyMatches(m);
    if (pending.length) {
      if (isServer) {
        const all = Promise.all(pending.map(resolveLazySubtree));
        all.catch(() => {
        });
        throw new NotReadyError(all);
      } else for (const boundary of pending) readLazySubtree(boundary);
    }
    return m;
  }, DEV && { name: "matches" });
  const headedLocation = () => isServer ? untrack(source) : flushed;
  const unsettled = (change) => change._navigation !== void 0 && !!integration.settled && !integration.settled(change);
  const transitionIntent = () => {
    const head = headedLocation();
    if (!unsettled(head)) return;
    const navigation = head._navigation;
    return navigation === -1 ? "native" : navigation && navigation > 0 ? "navigate" : void 0;
  };
  const buildParams = () => mergeParams(matches());
  const wrapParams = utils.paramsWrapper ? (getParams) => utils.paramsWrapper(getParams, branches) : (getParams) => createMemoObject(getParams);
  const params = wrapParams(buildParams);
  const baseRoute = {
    pattern: basePath,
    params,
    path: () => basePath,
    outlet: () => null,
    resolvePath(to) {
      return resolvePath(basePath, to);
    }
  };
  return {
    base: baseRoute,
    location: location2,
    params,
    wrapParams,
    intent: transitionIntent,
    _source: source,
    _owner: routerOwner,
    _routeOwner: getContext,
    _match: matchPath,
    renderPath,
    parsePath,
    navigatorFactory,
    matches,
    beforeLeave,
    singleFlight: options.singleFlight === void 0 ? true : options.singleFlight,
    get submissions() {
      return submissions || (submissions = createSignal(isServer ? initSubmissions() : [], { ownedWrite: true }));
    }
  };
  function navigateFromRoute(route, to, options2) {
    untrack(() => {
      if (typeof to === "number") {
        if (!to) ; else if (utils.go) utils.go(to);
        else DEV && console.warn("Router integration does not support relative routing");
        return;
      }
      const { replace, resolve, scroll, state: nextState } = {
        replace: false,
        resolve: true,
        scroll: true,
        ...options2
      };
      const resolveTarget = (to2) => {
        if (to2[0] === "#") to2 = parsePath(to2);
        if (!resolve) return resolvePath((!to2 || to2[0] === "?") && location2.pathname || "", to2);
        if (to2[0] === "/") return route.resolvePath(to2);
        const url = new URL(to2, mockBase + location2.pathname + location2.search + location2.hash);
        return url.origin === "http://sr" ? url.pathname + url.search + url.hash : void 0;
      };
      const unroutable = (to2) => /* @__PURE__ */ new Error(`Path '${to2}' is not a routable path`);
      const headed = headedLocation();
      let compose;
      let resolvedTo;
      const href = typeof to !== "string" ? to[HREF] : void 0;
      if (href === void 0 && typeof to === "function") {
        const build = to;
        compose = (headed2) => {
          const raw = build(headed2);
          const resolved2 = resolveTarget(raw);
          if (resolved2 === void 0) throw unroutable(raw);
          return resolved2;
        };
        resolvedTo = compose(headed);
      } else {
        if (typeof to !== "string") to = href || to.toString();
        resolvedTo = resolveTarget(to);
        if (resolvedTo === void 0) throw unroutable(to);
      }
      const navigationDepth = !isServer && headed._navigation !== void 0 && headed._navigation > 0 && unsettled(headed) ? headed._navigation : 0;
      if (navigationDepth >= MAX_REDIRECTS) throw new Error("Too many redirects");
      if (isServer) {
        if (resolvedTo === headed.value && nextState === headed.state) return;
        const e = getRequestEvent();
        const head = e && (e.response || (e.response = { headers: new Headers() }));
        if (head && !head.committed) {
          head.status = 302;
          head.statusText = void 0;
          head.headers.set("Location", resolvedTo);
        }
        setSource({
          value: resolvedTo,
          replace,
          scroll,
          state: nextState
        });
      } else if (!isUnderBase(resolvedTo, basePath)) window.location.href = resolvedTo;
      else if (!beforeLeave.current || beforeLeave.current.confirm(resolvedTo, options2)) runWithOwner(null, () => setSource({
        value: compose || resolvedTo,
        state: nextState,
        replace: navigationDepth ? headed.replace : replace,
        scroll: navigationDepth ? headed.scroll : scroll,
        _navigation: navigationDepth + 1
      }));
    });
  }
  function navigatorFactory(route) {
    route = route || useOptionalContext(RouteContextObj) || baseRoute;
    return ((to, options2) => navigateFromRoute(route, to, options2));
  }
  function initSubmissions() {
    const e = getRequestEvent();
    const submission = e && e.router && e.router.submission || flashSubmission && flashSubmission();
    if (!submission) return [];
    return [{
      ...submission,
      clear() {
      },
      retry() {
      }
    }];
  }
}
function createRouteContext(router, parent, outlet, match, matches = () => [match()]) {
  var _a2, _b;
  const { base, location: location2, wrapParams } = router;
  const { pattern, component, preload } = match().route;
  const path = createMemo(() => match().path);
  const params = wrapParams(() => mergeParams(matches()));
  (_a2 = component == null ? void 0 : component.preload) == null ? void 0 : _a2.call(component);
  const prevInPreloadFn = inPreloadFn;
  inPreloadFn = true;
  let data;
  try {
    data = preload ? preload({
      params,
      location: location2,
      intent: ((_b = router.intent) == null ? void 0 : _b.call(router)) || "initial"
    }) : void 0;
  } finally {
    inPreloadFn = prevInPreloadFn;
  }
  return {
    parent,
    pattern,
    params,
    path,
    outlet: () => {
      if (!component) return outlet();
      const routeProps = {
        params,
        location: location2,
        data,
        get children() {
          return outlet();
        }
      };
      const server = serverRouteOf(component);
      if (server) {
        const args = createMemo(() => serverRouteArgs(match().route, match().params, location2.query), { equals: serverRouteArgsEqual });
        return server.render(args, routeProps);
      }
      return createComponent(component, routeProps);
    },
    resolvePath(to) {
      return resolvePath(base.path(), to, path());
    }
  };
}
function stampFlight(flight, from) {
  var _a2, _b;
  const slot = OBSERVE.attribution;
  (_b = slot.markFlight) == null ? void 0 : _b.call(slot, flight, from && ((_a2 = slot.flightOrigin) == null ? void 0 : _a2.call(slot, from)));
}
var LocationHeader = "Location";
var REDIRECT_STATUSES = /* @__PURE__ */ new Set([
  301,
  302,
  303,
  307,
  308
]);
var PRELOAD_TIMEOUT = 5e3;
var CACHE_TIMEOUT = 18e4;
var responseBodyHeaders = /* @__PURE__ */ new Set([
  "content-type",
  "content-length",
  "content-encoding",
  "transfer-encoding",
  "content-disposition",
  "content-language",
  "content-location",
  "content-range",
  "accept-ranges",
  "etag",
  "last-modified"
]);
var forwardedCookies = /* @__PURE__ */ new WeakMap();
var bootTime = Date.now();
var NativePromise = Promise;
function serializeForHydration(key, res) {
  const writer = getHydrationWriter();
  if (!writer || !writer.async || !isHydratable()) return;
  const e = getRequestEvent();
  (!e || !e.serverOnly) && writer.write(key, res);
}
var cacheMap = /* @__PURE__ */ new Map();
if (!isServer) setInterval(() => {
  const now = Date.now();
  for (let [k, v] of cacheMap.entries()) if (!v[4].count && now - v[0] > CACHE_TIMEOUT) cacheMap.delete(k);
}, 3e5);
function getCache() {
  if (!isServer) return cacheMap;
  const req = getRequestEvent();
  if (!req) throw new Error("Cannot find cache context");
  return (req.router || (req.router = {})).cache || (req.router.cache = /* @__PURE__ */ new Map());
}
var revalidateHooks = [];
var flightHooks = [];
function deliverFlightData(data) {
  for (const hook of flightHooks) hook(data);
}
function revalidate(key, force = true) {
  const now = Date.now();
  cacheKeyOp(key, (entry) => {
    force && (entry[0] = 0);
    entry[4][1]((v) => v === now ? now + 1 : now);
  });
  const keys = key === void 0 ? void 0 : Array.isArray(key) ? key : [key];
  for (const hook of revalidateHooks) hook(keys, force);
}
function cacheKeyOp(key, fn) {
  key && !Array.isArray(key) && (key = [key]);
  for (let k of cacheMap.keys()) if (key === void 0 || matchKey(k, key)) fn(cacheMap.get(k));
}
function query(fn, name) {
  var _a2;
  if (isServerFunction(fn) && !((_a2 = getServerFunctionMetadata(fn)) == null ? void 0 : _a2.method)) {
    const rpc = getServerFunctionRPC();
    if (rpc) fn = rpc.GET(fn);
  }
  const cachedFn = ((...args) => {
    const cache = getCache();
    const intent = untrack(getIntent);
    const inPreloadFn2 = getInPreloadFn();
    const router = getOwner() ? useRouter() : void 0;
    const navigate = router && router.navigatorFactory();
    const now = Date.now();
    const key = name + hashKey(args);
    let cached = cache.get(key);
    let tracking;
    if (isServer) {
      const e = getRequestEvent();
      if (e) {
        const dataOnly2 = (e.router || (e.router = {})).dataOnly;
        if (dataOnly2) {
          const data = e && (e.router.data || (e.router.data = {}));
          if (data && key in data) return data[key];
          if (Array.isArray(dataOnly2) && !matchKey(key, dataOnly2)) {
            data[key] = void 0;
            return Promise.resolve();
          }
        }
      }
    }
    if (getObserver() && !isServer) {
      tracking = true;
      onCleanup(() => cached[4].count--);
    }
    if (cached && cached[0] && (isServer || intent === "native" || cached[4].count || !intent && isHydrating() || Date.now() - cached[0] < PRELOAD_TIMEOUT)) {
      if (tracking) {
        cached[4].count++;
        cached[4][0]();
      }
      if (cached[3] === "preload" && intent !== "preload") cached[0] = now;
      let res2 = cached[1];
      if (intent !== "preload") {
        res2 = settle(res2);
        !isServer && intent === "navigate" && cached[4][1](cached[0]);
      }
      inPreloadFn2 && "then" in res2 && res2.catch(() => {
      });
      isServer && serializeForHydration(key, res2);
      return res2;
    }
    let res;
    let adopted = false;
    if (!isServer && (!intent || now - bootTime < (intent === "native" ? CACHE_TIMEOUT : PRELOAD_TIMEOUT))) {
      const entry = takeHydrationValue(key);
      if (entry) {
        adopted = true;
        res = entry.status === "pending" ? entry.promise : entry.status === "resolved" ? NativePromise.resolve(entry.value) : NativePromise.reject(entry.error);
      }
    }
    if (!adopted) res = fn(...args);
    OBSERVE && res && typeof res.then === "function" && stampFlight(res);
    const stamp = adopted ? bootTime : now;
    if (cached) {
      isServer && forwardedCookies.delete(cached);
      cached[0] = stamp;
      cached[1] = res;
      cached[3] = intent;
      !isServer && intent === "navigate" && cached[4][1](cached[0]);
    } else {
      cache.set(key, cached = [
        stamp,
        res,
        ,
        intent,
        createSignal(stamp, {
          ownedWrite: true,
          ...DEV && { name: `query:${key}` }
        })
      ]);
      cached[4].count = 0;
    }
    if (tracking) {
      cached[4].count++;
      cached[4][0]();
    }
    if (isServer) {
      const e = getRequestEvent();
      if (e && e.router.dataOnly) return e.router.data[key] = res;
    }
    if (intent !== "preload") res = settle(res);
    inPreloadFn2 && "then" in res && res.catch(() => {
    });
    isServer && serializeForHydration(key, res);
    return res;
    function settle(v) {
      let cookies = isServer ? forwardedCookies.get(cached) : void 0;
      if (isServer && !cookies) forwardedCookies.set(cached, cookies = /* @__PURE__ */ new WeakSet());
      if (!("then" in v)) return handleResponse(false, v, cookies)(v);
      const read = v.then(handleResponse(false, v, cookies), handleResponse(true, v, cookies));
      OBSERVE && stampFlight(read, v);
      return read;
    }
    function handleResponse(error, source, cookies) {
      return async (v) => {
        let enveloped;
        let hasEnveloped = false;
        if (isResponseEnvelope(v)) {
          enveloped = v.value;
          hasEnveloped = true;
          v = v.response;
        }
        if (v instanceof Response) {
          const e = getRequestEvent();
          if (e) {
            const headers = e.response.headers;
            const skipCookies = cookies == null ? void 0 : cookies.has(headers);
            for (const [key2, value] of v.headers) {
              if (responseBodyHeaders.has(key2)) continue;
              if (key2 === "set-cookie") {
                if (!skipCookies) headers.append(key2, value);
              } else if (headers.get(key2) !== value) headers.set(key2, value);
            }
            if (!skipCookies && v.headers.has("set-cookie")) cookies == null ? void 0 : cookies.add(headers);
          }
          if (applyServerResponse(v, router, navigate, false, e)) return isServer ? void 0 : new Promise(() => {
          });
          if (hasEnveloped) v = enveloped;
          else if (v.body) {
            const rpc = getServerFunctionRPC();
            if (rpc) {
              const decoded = await rpc.decodeResponse(v);
              if (decoded !== void 0) v = decoded;
            }
          }
        }
        if (error) throw v;
        if (cached[1] === source) cached[2] = v;
        return v;
      };
    }
  });
  cachedFn.keyFor = (...args) => name + hashKey(args);
  cachedFn.key = name;
  return cachedFn;
}
query.get = (key) => {
  return getCache().get(key)[2];
};
query.set = (key, value) => {
  const cache = getCache();
  const now = Date.now();
  let cached = cache.get(key);
  if (cached) {
    isServer && forwardedCookies.delete(cached);
    cached[0] = now;
    cached[1] = Promise.resolve(value);
    cached[2] = value;
    cached[3] = "preload";
  } else {
    cache.set(key, cached = [
      now,
      Promise.resolve(value),
      value,
      "preload",
      createSignal(now, {
        ownedWrite: true,
        ...DEV && { name: `query:${key}` }
      })
    ]);
    cached[4].count = 0;
  }
};
query.delete = (key) => getCache().delete(key);
query.clear = () => getCache().clear();
function applyServerResponse(v, router, navigate, mutation, e, flightData) {
  var _a2;
  let url = v ? v.headers.get(LocationHeader) : null;
  let carried;
  let declared = null;
  if (v && !isServer) {
    carried = decodeRedirectHeaderValue(v.headers.get(REDIRECT_HEADER));
    url = (_a2 = carried == null ? void 0 : carried.url) != null ? _a2 : REDIRECT_STATUSES.has(v.status) ? url : null;
    declared = v.headers.get(REVALIDATE_HEADER);
  }
  if (url === null && !mutation) return false;
  const sweep = mutation || declared !== null;
  const keys = declared !== null ? readRevalidateKeys(declared) : void 0;
  sweep && cacheKeyOp(keys, (entry) => entry[0] = 0);
  if (url !== null) {
    if (!isServer) {
      const target = new URL(url, window.location.href);
      if (navigate && target.origin === window.location.origin) {
        const local = !!carried || url[0] === "/" && url[1] !== "/";
        const resolved2 = target.pathname + target.search + target.hash;
        const path = local ? resolved2 : router.parsePath(resolved2);
        if (isUnderBase(path, router.base.path()) && (local || new URL(router.renderPath(path), window.location.href).href === target.href)) navigate(path, {
          replace: true,
          resolve: false
        });
        else window.location.href = target.href;
      } else window.location.href = target.href;
    } else if (navigate && url.startsWith("/")) navigate(url, { replace: true });
    else if (e) e.response.status = 302;
  }
  if (flightData) {
    Object.keys(flightData).forEach((k) => query.set(k, flightData[k]));
    deliverFlightData(flightData);
  }
  sweep && revalidate(keys, false);
  return url !== null;
}
function setupFlightDataConsumer(router) {
  return subscribeFlightData((data, { response }) => {
    applyServerResponse(response, router, router.navigatorFactory(), true, void 0, data);
  });
}
function readRevalidateKeys(value) {
  const keys = value.split(",");
  return keys.includes("*") ? void 0 : keys;
}
function matchKey(key, keys) {
  for (let k of keys) if (k && key.startsWith(k)) return true;
  return false;
}
function hashKey(args) {
  return JSON.stringify(args, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, /* @__PURE__ */ Object.create(null)) : val);
}
function isPlainObject(obj) {
  let proto;
  return obj != null && typeof obj === "object" && (!(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype);
}
var _m$$29 = /* @__PURE__ */ Symbol();
var _m$2$13 = /* @__PURE__ */ Symbol();
var _d$$30 = {
  get() {
    const data = this[_m$$29];
    return data();
  },
  enumerable: true,
  configurable: true
};
var _d$2$27 = {
  get() {
    return this[_m$2$13].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$30(_p, _p2, _p3, _p4) {
  this[_m$$29] = _p;
  this[_m$2$13] = _p2;
  this.params = _p3;
  this.location = _p4;
  Object.defineProperty(this, "data", _d$$30);
  Object.defineProperty(this, "children", _d$2$27);
}
_P$$30.prototype = Object.prototype;
var _d$3$22 = {
  get() {
    return this[_m$$29].outlet();
  },
  enumerable: true,
  configurable: true
};
function _P$2$23(_p5, _p6) {
  this[_m$$29] = _p5;
  this.value = _p6;
  Object.defineProperty(this, "children", _d$3$22);
}
_P$2$23.prototype = Object.prototype;
var _d$4$19 = {
  get() {
    const child = this[_m$$29];
    return child();
  },
  enumerable: true,
  configurable: true
};
function _P$3$18(_p7, _p8, _p9) {
  this[_m$$29] = _p7;
  Object.defineProperty(this, "when", _d$4$19);
  this.keyed = _p8;
  this.children = _p9;
}
_P$3$18.prototype = Object.prototype;
function Root(props) {
  const location2 = props.routerState.location;
  const params = props.routerState.params;
  const data = createMemo(() => props.preload && untrack(() => {
    setInPreloadFn(true);
    try {
      return props.preload({
        params,
        location: location2,
        intent: getIntent() || "initial"
      });
    } finally {
      setInPreloadFn(false);
    }
  }));
  const RootComp = props.root;
  if (RootComp) return RootComp(new _P$$30(data, props, params, location2));
  return props.children;
}
function Routes(props) {
  if (isServer) {
    const e = getRequestEvent();
    if (e && e.router && e.router.dataOnly) {
      dataOnly(e, props.routerState, props.branches());
      return;
    }
    if (e && !(e.router && e.router.matches)) Object.defineProperty(e.router || (e.router = {}), "matches", {
      configurable: true,
      enumerable: true,
      get: () => props.routerState.matches().map(({ route, path, params }) => ({
        path: route.originalPath,
        pattern: route.pattern,
        match: path,
        params,
        info: route.info
      }))
    });
  }
  const disposers = [];
  let root;
  let prevMatches;
  onCleanup(() => disposers.forEach((dispose) => dispose()));
  const owner = createRoot(() => getOwner());
  const routeStates = createMemo((prev) => {
    var _a2;
    const nextMatches = props.routerState.matches();
    const previousMatches = prevMatches;
    let equal = previousMatches && nextMatches.length === previousMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = previousMatches && previousMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) next[i] = prev[i];
      else {
        equal = false;
        (_a2 = disposers[i]) == null ? void 0 : _a2.call(disposers);
        runWithOwner(owner, () => createRoot((dispose) => {
          disposers[i] = dispose;
          const routeKey = nextMatch.route.key;
          const matchesAtLevel = createMemo((prev2) => {
            const routeMatches = props.routerState.matches();
            const m = routeMatches[i];
            return m && m.route.key === routeKey ? routeMatches : prev2 || nextMatches;
          });
          next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => {
            var _a3;
            return (_a3 = routeStates()) == null ? void 0 : _a3[i + 1];
          }), () => matchesAtLevel()[i], matchesAtLevel);
        }));
      }
    }
    disposers.splice(nextMatches.length).forEach((dispose) => dispose());
    if (prev && equal) {
      prevMatches = nextMatches;
      return prev;
    }
    root = next[0];
    prevMatches = nextMatches;
    return next;
  });
  const outlet = createOutlet(() => routeStates() && root);
  return memo(outlet);
}
var createOutlet = (child) => {
  return () => Show(new _P$3$18(child, true, (c) => RouteContextObj(new _P$2$23(c, c))));
};
function dataOnly(event, routerState, branches) {
  const url = new URL(event.request.url);
  const prevMatches = getRouteMatches(branches, new URL(event.router.previousUrl || event.request.url).pathname);
  const matches = getRouteMatches(branches, url.pathname);
  unresolvedLazyMatches([...prevMatches, ...matches]).forEach(resolveLazySubtree);
  for (let match = 0; match < matches.length; match++) {
    if (!prevMatches[match] || matches[match].route !== prevMatches[match].route) event.router.dataOnly = true;
    const { route, params } = matches[match];
    const server = serverRouteOf(route.component);
    server && server.call(serverRouteArgs(route, params, routerState.location.query));
    route.preload && route.preload({
      params,
      location: routerState.location,
      intent: "preload"
    });
  }
}
function bindEvent(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
var depth;
function saveCurrentDepth() {
  var _a2, _b, _c;
  const h = window.history;
  let d = (_a2 = h.state) == null ? void 0 : _a2._depth;
  if (d == null) {
    d = depth == null ? h.length - 1 : depth + 1;
    h.replaceState({
      ...h.state,
      _depth: d
    }, "");
  }
  depth = (_c = (_b = h.state) == null ? void 0 : _b._depth) != null ? _c : d;
}
function keepDepth(state) {
  return {
    ...state,
    _depth: window.history.state && window.history.state._depth
  };
}
function nextDepth(state) {
  return {
    ...state,
    _depth: (depth != null ? depth : window.history.length - 1) + 1
  };
}
function notifyIfNotBlocked(notify, block) {
  let ignore = false;
  return () => {
    const prevDepth = depth;
    saveCurrentDepth();
    const delta = prevDepth == null ? null : depth - prevDepth;
    if (ignore) {
      ignore = false;
      return;
    }
    if (delta && block(delta)) {
      ignore = true;
      window.history.go(-delta);
    } else notify();
  };
}
function scrollToHash(hash, fallbackTop) {
  const el = hash && document.getElementById(hash);
  if (el) el.scrollIntoView();
  else if (fallbackTop) window.scrollTo(0, 0);
}
function browserHistory() {
  const getSource = () => {
    const s = window.history.state;
    return {
      value: window.location.pathname + window.location.search + window.location.hash,
      state: s && s._depth && Object.keys(s).length === 1 ? void 0 : s
    };
  };
  const beforeLeave = {};
  if (!isServer) saveCurrentDepth();
  return {
    get: getSource,
    set({ value, replace, scroll, state }) {
      if (replace) window.history.replaceState(keepDepth(state), "", value);
      else window.history.pushState(nextDepth(state), "", value);
      scrollToHash(decodeURIComponent(window.location.hash.slice(1)), scroll);
      saveCurrentDepth();
    },
    init: (notify) => bindEvent(window, "popstate", notifyIfNotBlocked(notify, (delta) => {
      const guard = beforeLeave.current;
      if (!guard) return false;
      if (delta) return !guard.confirm(delta);
      else {
        const s = getSource();
        return !guard.confirm(s.value, { state: s.state });
      }
    })),
    utils: {
      go: (delta) => window.history.go(delta),
      beforeLeave
    }
  };
}
var STORAGE_KEY = "solid-router:scroll";
var AUTO_KEY = "solid-router:scroll-auto";
function createScrollRestoration(hydrating) {
  const h = window.history;
  saveCurrentDepth();
  const depth2 = () => window.history.state && window.history.state._depth;
  let positions = {};
  let handedBack = {};
  try {
    positions = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
    handedBack = JSON.parse(sessionStorage.getItem(AUTO_KEY)) || {};
  } catch {
  }
  const manual = () => {
    h.scrollRestoration = "manual";
    const d2 = depth2();
    if (d2 != null) delete handedBack[d2];
  };
  const d = depth2();
  let deferred = !!hydrating && (h.scrollRestoration === "auto" || d != null && !!handedBack[d]);
  if (!deferred) manual();
  const claim2 = () => {
    if (!deferred) return;
    deferred = false;
    manual();
  };
  let timer;
  let programmatic = false;
  let pending;
  const unbind = [
    bindEvent(window, "scroll", () => {
      const d2 = depth2();
      if (d2 != null) positions[d2] = window.scrollY;
      if (!programmatic) pending = void 0;
    }),
    bindEvent(window, "pagehide", () => {
      h.scrollRestoration = "auto";
      const d2 = depth2();
      if (d2 != null) handedBack[d2] = 1;
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
        sessionStorage.setItem(AUTO_KEY, JSON.stringify(handedBack));
      } catch {
      }
    }),
    bindEvent(window, "pageshow", (e) => {
      if (e.persisted) manual();
    }),
    bindEvent(window, "load", () => deferred && (timer = setTimeout(claim2))),
    () => clearTimeout(timer)
  ];
  const restore = () => {
    if (pending == null) return;
    const y = positions[pending];
    pending = void 0;
    if (y == null) return;
    programmatic = true;
    window.scrollTo(0, y);
    programmatic = false;
  };
  return {
    /**
    * When the adapter notifies a traversal: mark the target and restore once
    * the transition carrying it settles. The adapter notifies right before
    * the location write, in the same tick, so the settle is that write's —
    * a same-URL traversal included, which no location key would see.
    */
    onPop() {
      claim2();
      pending = depth2();
      runWithOwner(null, () => onSettled(restore));
    },
    /** The initial page settled: restore a reload/back_forward arrival. */
    settled: () => restore(),
    /** Before a client navigation writes history: the entry it creates copies the current mode. */
    beforeWrite: claim2,
    /** After a push: forward entries died, and this depth may be reused. */
    onPush() {
      const d2 = depth2();
      if (d2 != null) {
        for (const k in positions) +k >= d2 && delete positions[k];
        for (const k in handedBack) +k >= d2 && delete handedBack[k];
      }
    },
    create() {
      var _a2;
      onCleanup(() => unbind.forEach((u) => u()));
      if (deferred) {
        document.readyState === "complete" && claim2();
        return;
      }
      const [nav] = (_a2 = performance.getEntriesByType) == null ? void 0 : _a2.call(performance, "navigation");
      if (nav && nav.type !== "navigate") pending = depth2();
    }
  };
}
function withScrollRestoration(history, restoration) {
  return {
    ...history,
    set(next) {
      restoration.beforeWrite();
      history.set(next);
      next.replace || restoration.onPush();
    },
    init: history.init && ((notify) => history.init((value) => {
      restoration.onPop();
      notify(value);
    }))
  };
}
function describeNavigation(match, next, written, from) {
  const to = () => {
    const w = written();
    return w ? w.value : typeof next.value === "string" ? next.value : void 0;
  };
  const pathname = () => {
    const t = to();
    return t === void 0 ? void 0 : new URL(t, mockBase).pathname;
  };
  const ref = {
    kind: "navigation",
    get to() {
      return to();
    },
    from,
    get name() {
      return routeName(match, pathname());
    },
    get params() {
      return routeParams(match, pathname());
    }
  };
  if (next._navigation !== void 0 && next._navigation > 1) ref.redirect = next._navigation - 1;
  return ref;
}
function routeName(match, pathname) {
  if (pathname === void 0) return void 0;
  const m = untrack(() => match(pathname));
  return m.length ? m[m.length - 1].route.pattern || "/" : pathname;
}
function routeParams(match, pathname) {
  if (pathname === void 0) return void 0;
  const m = untrack(() => match(pathname));
  return m.length ? mergeParams(m) : void 0;
}
function describeInitial(match, location2) {
  const to = () => untrack(location2).value;
  const pathname = () => new URL(to(), mockBase).pathname;
  return {
    kind: "navigation",
    initial: true,
    get to() {
      return to();
    },
    get name() {
      return routeName(match, pathname());
    },
    get params() {
      return routeParams(match, pathname());
    }
  };
}
function createIntegration(history, match) {
  let committing = false;
  const settled = /* @__PURE__ */ new WeakSet();
  const wrap = (value) => typeof value === "string" ? { value } : value;
  const [read, write] = createSignal(wrap(history.get()), {
    equals: (a, b) => a.value === b.value && a.state === b.state && a._navigation === b._navigation,
    ownedWrite: true,
    ...DEV && { name: "router.location" }
  });
  const signal = [read, (next) => {
    let written;
    const commit = () => {
      write((headed) => (written = resolveLocationWrite(headed, next)) || headed);
      if (written && written._navigation) {
        const next2 = written;
        runWithOwner(null, () => onSettled(() => {
          settled.add(next2);
          if (next2._navigation < 0 || read() !== next2) return;
          committing = true;
          try {
            history.set(next2);
          } finally {
            committing = false;
          }
        }));
      }
    };
    const from = untrack(read).value;
    OBSERVE && from ? OBSERVE.attribution.withOrigin(describeNavigation(match, next, () => written, from), commit) : commit();
  }];
  history.init && onCleanup(history.init((value = history.get()) => {
    if (committing) return;
    signal[1]({
      ...wrap(value),
      _navigation: -1
    });
  }));
  return {
    signal,
    settled: (write2) => settled.has(write2),
    utils: history.utils
  };
}
function serverPage(url) {
  const e = getRequestEvent();
  const source = e ? e.request.url : url;
  return source ? new URL(source, mockBase) : void 0;
}
function staticIntegration(page, utils) {
  const obj = { value: page ? page.pathname + page.search : "" };
  return {
    signal: [() => obj, (next) => {
      const written = resolveLocationWrite(obj, next);
      written && Object.assign(obj, written);
    }],
    utils
  };
}
function createRouter(config) {
  if (DEV && typeof config.preloadLinks === "boolean") console.warn("`preloadLinks` takes preload strategies, not a boolean, and preloads nothing by default. Use `preloadLinks: intentPreload()` for hover/focus preloading.");
  const basePath = (config.base || "").replace(/\/+$/, "");
  let compiled;
  let compiledVersion = -1;
  const branches = () => {
    const version = trackLazySubtrees();
    if (!compiled || compiledVersion !== version) {
      compiled = createBranches(config.routes, basePath);
      compiledVersion = version;
    }
    return compiled;
  };
  const renderPath = config.history && config.history.utils && config.history.utils.renderPath || void 0;
  const matchPath = (pathname) => getRouteMatches(branches(), config.transformUrl ? config.transformUrl(pathname) : pathname);
  const pathnameOf = (url) => typeof url === "string" ? new URL(url, mockBase).pathname : url[HREF];
  function RouterComponent(props) {
    var _a2;
    if (DEV && useOptionalContext(RouterContextObj)) console.warn("Mounting a router inside another router is not supported. Compose route trees in one createRouter config instead.");
    const root = untrack(() => props.children);
    let restoration;
    let history = config.history;
    if (!isServer && ((_a2 = config.scrollRestoration) != null ? _a2 : !history)) {
      restoration = createScrollRestoration(isHydrating());
      history = withScrollRestoration(history || browserHistory(), restoration);
    }
    const page = isServer ? serverPage(props.url) : void 0;
    const integration = isServer ? staticIntegration(page, config.history && config.history.utils) : createIntegration(history || browserHistory(), matchPath);
    let context;
    const buildContext = () => createRouterContext(integration, branches, () => context, {
      base: basePath,
      singleFlight: config.singleFlight,
      transformUrl: config.transformUrl
    });
    const routerState = OBSERVE ? OBSERVE.attribution.withOrigin(describeInitial(matchPath, integration.signal[0]), buildContext) : buildContext();
    if (!isServer) {
      setupNativeEvents({
        preload: config.preloadLinks,
        explicitLinks: config.explicitLinks,
        actionBase: config.actionBase
      })(routerState);
      setupLinkClaims(routerState, config.explicitLinks, config.links);
      if (routerState.singleFlight) onCleanup(setupFlightDataConsumer(routerState));
      restoration && restoration.create();
    } else if (!renderPath) setupServerLinkClaims(routerState, config.explicitLinks, page || new URL("http://sr"));
    onSettled(() => restoration && restoration.settled());
    return RouterContextObj({
      value: routerState,
      get children() {
        return Root({
          routerState,
          root,
          get preload() {
            return config.preload;
          },
          get children() {
            return [memo(() => {
              return (context = getOwner()) && null;
            }), Routes({
              routerState,
              branches
            })];
          }
        });
      }
    });
  }
  const instance = Object.assign(RouterComponent, {
    routes: config.routes,
    config,
    match(url) {
      return matchPath(pathnameOf(url)).map(({ route, path, params }) => ({
        path: route.originalPath,
        pattern: route.pattern,
        match: path,
        params,
        info: route.info
      }));
    },
    keysFor(url) {
      var _a2, _b;
      const keys = [];
      for (const { route } of matchPath(pathnameOf(url))) {
        const key = (_b = (_a2 = serverRouteOf(route.component)) == null ? void 0 : _a2.call) == null ? void 0 : _b.key;
        typeof key === "string" && key && !keys.includes(key) && keys.push(key);
      }
      return keys;
    }
  });
  let paths2;
  Object.defineProperty(instance, "paths", { get: () => paths2 || (paths2 = createPathsProxy(renderPath, basePath)) });
  return instance;
}
var _m$$28 = /* @__PURE__ */ Symbol();
var _d$$29 = {
  get() {
    return this[_m$$28].disabled ? -1 : 0;
  },
  enumerable: true,
  configurable: true
};
function _P$$29(_p, _p2) {
  this[_m$$28] = _p;
  Object.defineProperty(this, "tabindex", _d$$29);
  this.role = _p2;
}
_P$$29.prototype = Object.prototype;
var BUTTON_TAG = createTag("button");
var NATIVE_INPUT_BUTTONS = /* @__PURE__ */ new Set([
  "button",
  "submit",
  "reset",
  "image"
]);
function isNativeButton(el) {
  if (el.tagName === "BUTTON") return true;
  return el.tagName === "INPUT" && NATIVE_INPUT_BUTTONS.has(el.type);
}
function activatesOnEnter(el) {
  return (el.tagName === "A" || el.tagName === "AREA") && el.hasAttribute("href");
}
function Button(props) {
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement && !isNativeButton(current)) {
      let spacePressed = false;
      return mergeFunc(useEventListener(current, "click", (e) => {
        if (props.disabled) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }, true), useEventListener(current, "keydown", (e) => {
        if (e.target !== current) return;
        switch (e.key) {
          case "Enter":
            if (!activatesOnEnter(current)) {
              e.preventDefault();
              if (!props.disabled) current.click();
            }
            break;
          case " ":
            e.preventDefault();
            spacePressed = true;
        }
      }), useEventListener(current, "keyup", (e) => {
        if (e.key === " " && spacePressed) {
          spacePressed = false;
          e.preventDefault();
          if (!props.disabled && e.target === current) current.click();
        }
      }), useEventListener(current, "blur", () => {
        spacePressed = false;
      }));
    }
  });
  const disabledState = createDisabledState(() => props.disabled);
  const ariaDisabledState = createARIADisabledState(() => props.disabled);
  const rest = omit(props, "as", "ref");
  return dynamic(() => props.as || "button")(mergeProps(BUTTON_TAG, new _P$$29(props, "button"), disabledState, ariaDisabledState, rest, { ref: setInternalRef }));
}
var _m$$27 = /* @__PURE__ */ Symbol();
var _d$$28 = {
  get() {
    return this[_m$$27].when;
  },
  enumerable: true,
  configurable: true
};
function _P$$28(_p, _p2, _p3) {
  this[_m$$27] = _p;
  Object.defineProperty(this, "when", _d$$28);
  this.keyed = _p2;
  this.children = _p3;
}
_P$$28.prototype = Object.prototype;
var _d$2$26 = {
  get() {
    var _a2;
    const props = this[_m$$27];
    return ((_a2 = props.unmount) != null ? _a2 : true) === false || props.when;
  },
  enumerable: true,
  configurable: true
};
var _d$3$21 = {
  get() {
    return this[_m$$27].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2$22(_p4) {
  this[_m$$27] = _p4;
  Object.defineProperty(this, "when", _d$2$26);
  Object.defineProperty(this, "children", _d$3$21);
}
_P$2$22.prototype = Object.prototype;
function Offscreen(props) {
  const result = children(() => props.children)();
  return Show(new _P$$28(props, true, result));
}
function Unmountable(props) {
  return dynamic(() => props.unmount === "offscreen" ? Offscreen : Show)(new _P$2$22(props));
}
var _m$$26 = /* @__PURE__ */ Symbol();
var _d$$27 = {
  get() {
    return this[_m$$26].state;
  },
  enumerable: true,
  configurable: true
};
var _d$2$25 = {
  get() {
    const props = this[_m$$26];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$$27(_p) {
  this[_m$$26] = _p;
  Object.defineProperty(this, "value", _d$$27);
  Object.defineProperty(this, "children", _d$2$25);
}
_P$$27.prototype = Object.prototype;
function createDisclosureState(options) {
  let signal;
  let setSignal;
  if ("defaultOpen" in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultOpen);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (value && options.onOpen) options.onOpen();
      if (options.onChange) options.onChange(value);
      if (!value && options.onClose) options.onClose();
    };
  } else {
    signal = createMemo(() => options.isOpen);
    setSignal = (value) => {
      if (value && options.onOpen) options.onOpen();
      if (options.onChange) options.onChange(value);
      if (!value && options.onClose) options.onClose();
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  return {
    isOpen() {
      return signal();
    },
    setState(value) {
      if (!untrack(isDisabled)) setSignal(value);
    },
    disabled: isDisabled,
    open() {
      if (!untrack(isDisabled)) setSignal(true);
    },
    close() {
      if (!untrack(isDisabled)) setSignal(false);
    },
    toggle() {
      if (!untrack(isDisabled)) setSignal(!untrack(signal));
    }
  };
}
var DisclosureStateContext = createContext(null);
function DisclosureStateProvider(props) {
  return DisclosureStateContext(new _P$$27(props));
}
function useDisclosureState() {
  const ctx = useContext(DisclosureStateContext);
  assert(ctx, /* @__PURE__ */ new Error("Missing <DisclosureStateProvider>"));
  return ctx;
}
function DisclosureStateChild(props) {
  const state = useDisclosureState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === "function" && current.length === 1) return createMemo(() => current(state));
    return current;
  });
}
var _m$$25 = /* @__PURE__ */ Symbol();
var _m$2$12 = /* @__PURE__ */ Symbol();
var _m$3$6 = /* @__PURE__ */ Symbol();
var _m$4$5 = /* @__PURE__ */ Symbol();
var _m$5$5 = /* @__PURE__ */ Symbol();
var _m$6$5 = /* @__PURE__ */ Symbol();
var _m$7$5 = /* @__PURE__ */ Symbol();
var _d$$26 = {
  get() {
    return this[_m$$25].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$26(_p, _p2) {
  this[_m$$25] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$$26);
}
_P$$26.prototype = Object.prototype;
var _d$2$24 = {
  get() {
    const props = this[_m$$25];
    const state = this[_m$2$12];
    return DisclosureStateProvider(new _P$$26(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$2$21(_p3, _p4) {
  this[_m$$25] = _p3;
  this[_m$2$12] = _p4;
  Object.defineProperty(this, "children", _d$2$24);
}
_P$2$21.prototype = Object.prototype;
var _d$3$20 = {
  get() {
    const Root2 = this[_m$$25];
    const disabledState = this[_m$2$12];
    const expandedState = this[_m$3$6];
    const rest = this[_m$4$5];
    const props = this[_m$5$5];
    const state = this[_m$6$5];
    return Root2(mergeProps(DISCLOSURE_TAG, disabledState, expandedState, rest, new _P$2$21(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$3$17(_p5, _p6, _p7, _p8, _p9, _p0, _p1) {
  this[_m$$25] = _p5;
  this[_m$2$12] = _p6;
  this[_m$3$6] = _p7;
  this[_m$4$5] = _p8;
  this[_m$5$5] = _p9;
  this[_m$6$5] = _p0;
  this.value = _p1;
  Object.defineProperty(this, "children", _d$3$20);
}
_P$3$17.prototype = Object.prototype;
var _d$4$18 = {
  get() {
    return this[_m$$25].buttonID;
  },
  enumerable: true,
  configurable: true
};
var _d$5$13 = {
  get() {
    const state = this[_m$2$12];
    const context = this[_m$$25];
    return memo(() => {
      return !!state.isOpen();
    })() ? context.panelID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$4$10(_p10, _p11, _p12) {
  this[_m$$25] = _p10;
  this[_m$2$12] = _p11;
  Object.defineProperty(this, "id", _d$4$18);
  this.ref = _p12;
  Object.defineProperty(this, "aria-controls", _d$5$13);
}
_P$4$10.prototype = Object.prototype;
var _d$6$12 = {
  get() {
    return this[_m$$25].children;
  },
  enumerable: true,
  configurable: true
};
function _P$5$9(_p13) {
  this[_m$$25] = _p13;
  Object.defineProperty(this, "children", _d$6$12);
}
_P$5$9.prototype = Object.prototype;
var _d$7$11 = {
  get() {
    const props = this[_m$$25];
    return DisclosureStateChild(new _P$5$9(props));
  },
  enumerable: true,
  configurable: true
};
function _P$6$9(_p14) {
  this[_m$$25] = _p14;
  Object.defineProperty(this, "children", _d$7$11);
}
_P$6$9.prototype = Object.prototype;
var _d$8$9 = {
  get() {
    return this[_m$$25].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$7$9(_p15) {
  this[_m$$25] = _p15;
  Object.defineProperty(this, "id", _d$8$9);
}
_P$7$9.prototype = Object.prototype;
var _d$9$9 = {
  get() {
    return this[_m$$25].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8$9(_p16) {
  this[_m$$25] = _p16;
  Object.defineProperty(this, "children", _d$9$9);
}
_P$8$9.prototype = Object.prototype;
var _d$10$9 = {
  get() {
    const props = this[_m$$25];
    return DisclosureStateChild(new _P$8$9(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9$8(_p17) {
  this[_m$$25] = _p17;
  Object.defineProperty(this, "children", _d$10$9);
}
_P$9$8.prototype = Object.prototype;
var _d$11$9 = {
  get() {
    return this[_m$$25].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$12$9 = {
  get() {
    return this[_m$2$12].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$13$9 = {
  get() {
    const Root2 = this[_m$3$6];
    const context = this[_m$4$5];
    const disabled = this[_m$5$5];
    const expanded = this[_m$6$5];
    const rest = this[_m$7$5];
    const props = this[_m$$25];
    return Root2(mergeProps(DISCLOSURE_PANEL_TAG, new _P$7$9(context), disabled, expanded, rest, new _P$9$8(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$10$6(_p18, _p19, _p20, _p21, _p22, _p23, _p24) {
  this[_m$$25] = _p18;
  this[_m$2$12] = _p19;
  this[_m$3$6] = _p20;
  this[_m$4$5] = _p21;
  this[_m$5$5] = _p22;
  this[_m$6$5] = _p23;
  this[_m$7$5] = _p24;
  Object.defineProperty(this, "unmount", _d$11$9);
  Object.defineProperty(this, "when", _d$12$9);
  Object.defineProperty(this, "children", _d$13$9);
}
_P$10$6.prototype = Object.prototype;
var DisclosureContext = createContext(null);
function useDisclosureContext(componentName) {
  const context = useContext(DisclosureContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Disclosure>`));
  return context;
}
var DISCLOSURE_TAG = createTag("disclosure");
var DISCLOSURE_BUTTON_TAG = createTag("disclosure-button");
var DISCLOSURE_PANEL_TAG = createTag("disclosure-panel");
function isDisclosureUncontrolled(props) {
  return "defaultOpen" in props;
}
function Disclosure(props) {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createDisclosureState(props);
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isDisclosureUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen");
  return DisclosureContext(new _P$3$17(dynamic(() => props.as || "div"), disabledState, expandedState, rest, props, state, {
    ownerID,
    buttonID,
    panelID
  }));
}
function DisclosureButton(props) {
  const context = useDisclosureContext("DisclosureButton");
  const state = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isDisabled = () => state.disabled() || props.disabled;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      if (!isDisabled()) state.toggle();
    });
  });
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const expandedState = createExpandedState(() => state.isOpen());
  const ariaExpandedState = createARIAExpandedState(() => state.isOpen());
  const rest = omit(props, "children", "ref");
  return Button(mergeProps(DISCLOSURE_BUTTON_TAG, new _P$4$10(context, state, setInternalRef), disabledState, ariaDisabledState, expandedState, ariaExpandedState, rest, new _P$6$9(props)));
}
function DisclosurePanel(props) {
  const context = useDisclosureContext("DisclosurePanel");
  const state = useDisclosureState();
  const disabled = createDisabledState(() => state.disabled());
  const expanded = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "unmount", "children");
  return Unmountable(new _P$10$6(props, state, dynamic(() => props.as || "div"), context, disabled, expanded, rest));
}
var OWNER = `tc-owner`;
function queryNodes(el, ownerID, condition = "") {
  const query2 = `[${OWNER}="${ownerID}"]:not(${DISABLED_NODE})${condition}`;
  return el.querySelectorAll(query2);
}
function createOwnerAttribute(ownerID) {
  return { [OWNER]: ownerID };
}
var FocusNavigator = class {
  constructor(ownerID, options = {}) {
    var _a2, _b;
    this.ownerID = ownerID;
    this.options = {
      virtual: (_a2 = options.virtual) != null ? _a2 : false,
      base: (_b = options.base) != null ? _b : ""
    };
  }
  setRef(ref) {
    this.internalRef = ref;
  }
  clearRef() {
    this.internalRef = void 0;
  }
  query(ref, condition = "") {
    return queryNodes(ref, this.ownerID, `${this.options.base}${condition}`);
  }
  setCurrent(node) {
    this.current = node;
  }
  setChecked(node) {
    this.current = focusNode(node, this.options.virtual);
  }
  setNextChecked(loop) {
    if (this.internalRef instanceof HTMLElement) {
      if (!this.current) {
        this.setFirstChecked();
        return;
      }
      const current = focusNext(this.query(this.internalRef), this.current, loop, this.options.virtual);
      if (current) this.current = current;
    }
  }
  setPrevChecked(loop) {
    if (this.internalRef instanceof HTMLElement) {
      if (!this.current) {
        this.setLastChecked();
        return;
      }
      const current = focusPrev(this.query(this.internalRef), this.current, loop, this.options.virtual);
      if (current) this.current = current;
    }
  }
  setFirstChecked(condition = "") {
    if (this.internalRef instanceof HTMLElement) {
      const current = focusFirst(this.query(this.internalRef, condition), this.options.virtual);
      if (current) this.current = current;
    }
  }
  setLastChecked(condition = "") {
    if (this.internalRef instanceof HTMLElement) {
      const current = focusLast(this.query(this.internalRef, condition), this.options.virtual);
      if (current) this.current = current;
    }
  }
  setFirstMatch(character) {
    if (this.internalRef instanceof HTMLElement) {
      const current = focusMatch(this.query(this.internalRef), character, this.options.virtual);
      if (current) this.current = current;
    }
  }
  getId() {
    return this.ownerID;
  }
};
var _m$$24 = /* @__PURE__ */ Symbol();
var _d$$25 = {
  get() {
    return this[_m$$24].state;
  },
  enumerable: true,
  configurable: true
};
var _d$2$23 = {
  get() {
    const props = this[_m$$24];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$$25(_p) {
  this[_m$$24] = _p;
  Object.defineProperty(this, "value", _d$$25);
  Object.defineProperty(this, "children", _d$2$23);
}
_P$$25.prototype = Object.prototype;
function createSelectOptionState(options) {
  const state = useSelectState();
  const isDisabled = createMemo(() => options.disabled || state.disabled());
  return {
    isSelected: createMemo(() => state.isSelected(options.value)),
    isActive: createMemo(() => state.isActive(options.value)),
    select() {
      if (!untrack(isDisabled)) state.select(options.value);
    },
    focus() {
      if (!untrack(isDisabled)) state.focus(options.value);
    },
    blur() {
      if (!untrack(isDisabled) && this.isActive()) state.blur();
    },
    disabled: isDisabled
  };
}
var SelectOptionStateContext = createContext(null);
function SelectOptionStateProvider(props) {
  return SelectOptionStateContext(new _P$$25(props));
}
function useSelectOptionState() {
  const ctx = useContext(SelectOptionStateContext);
  assert(ctx, /* @__PURE__ */ new Error("Missing <SelectOptionStateProvider>"));
  return ctx;
}
function SelectOptionStateChild(props) {
  const state = useSelectOptionState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === "function" && current.length === 1) return createMemo(() => current(state));
    return current;
  });
}
function createPresence(assumeOnServer = true) {
  if (isServer) return {
    isPresent: () => assumeOnServer,
    register() {
      onSettled(() => void 0);
    }
  };
  const [count, setCount] = createSignal(0);
  return {
    isPresent: () => count() > 0,
    register() {
      onSettled(() => {
        setCount((value) => value + 1);
        return () => {
          setCount((value) => value - 1);
        };
      });
    }
  };
}
var _m$$23 = /* @__PURE__ */ Symbol();
var _m$2$11 = /* @__PURE__ */ Symbol();
var _m$3$5 = /* @__PURE__ */ Symbol();
var _m$4$4 = /* @__PURE__ */ Symbol();
var _m$5$4 = /* @__PURE__ */ Symbol();
var _m$6$4 = /* @__PURE__ */ Symbol();
var _m$7$4 = /* @__PURE__ */ Symbol();
var _m$8$4 = /* @__PURE__ */ Symbol();
var _m$9$3 = /* @__PURE__ */ Symbol();
var _m$10$3 = /* @__PURE__ */ Symbol();
var _m$11$3 = /* @__PURE__ */ Symbol();
var _m$12$3 = /* @__PURE__ */ Symbol();
var _m$13$3 = /* @__PURE__ */ Symbol();
var _m$14$3 = /* @__PURE__ */ Symbol();
var _m$15$2 = /* @__PURE__ */ Symbol();
var _m$16$2 = /* @__PURE__ */ Symbol();
var _d$$24 = {
  get() {
    const label = this[_m$$23];
    const labelID = this[_m$2$11];
    return label.isPresent() ? labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$2$22 = {
  get() {
    const description = this[_m$3$5];
    const descriptionID = this[_m$4$4];
    return description.isPresent() ? descriptionID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$$24(_p, _p2, _p3, _p4, _p5, _p6) {
  this[_m$$23] = _p;
  this[_m$2$11] = _p2;
  this[_m$3$5] = _p3;
  this[_m$4$4] = _p4;
  this.role = _p5;
  Object.defineProperty(this, "aria-labelledby", _d$$24);
  Object.defineProperty(this, "aria-describedby", _d$2$22);
  this.ref = _p6;
}
_P$$24.prototype = Object.prototype;
var _d$3$19 = {
  get() {
    return this[_m$$23].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2$20(_p7, _p8) {
  this[_m$$23] = _p7;
  this.state = _p8;
  Object.defineProperty(this, "children", _d$3$19);
}
_P$2$20.prototype = Object.prototype;
var _d$4$17 = {
  get() {
    const props = this[_m$$23];
    const state = this[_m$2$11];
    return SelectStateProvider(new _P$2$20(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3$16(_p9, _p0) {
  this[_m$$23] = _p9;
  this[_m$2$11] = _p0;
  Object.defineProperty(this, "children", _d$4$17);
}
_P$3$16.prototype = Object.prototype;
var _d$5$12 = {
  get() {
    const Root2 = this[_m$$23];
    const label = this[_m$2$11];
    const labelID = this[_m$3$5];
    const description = this[_m$4$4];
    const descriptionID = this[_m$5$4];
    const setRef = this[_m$6$4];
    const disabledState = this[_m$7$4];
    const ariaDisabledState = this[_m$8$4];
    const hasActiveState = this[_m$9$3];
    const hasSelectedState = this[_m$10$3];
    const rest = this[_m$11$3];
    const props = this[_m$12$3];
    const state = this[_m$13$3];
    return Root2(mergeProps(RADIO_GROUP_TAG, new _P$$24(label, labelID, description, descriptionID, "radiogroup", setRef), disabledState, ariaDisabledState, hasActiveState, hasSelectedState, rest, new _P$3$16(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$4$9(_p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17, _p18, _p19, _p20, _p21, _p22) {
  this[_m$$23] = _p1;
  this[_m$2$11] = _p10;
  this[_m$3$5] = _p11;
  this[_m$4$4] = _p12;
  this[_m$5$4] = _p13;
  this[_m$6$4] = _p14;
  this[_m$7$4] = _p15;
  this[_m$8$4] = _p16;
  this[_m$9$3] = _p17;
  this[_m$10$3] = _p18;
  this[_m$11$3] = _p19;
  this[_m$12$3] = _p20;
  this[_m$13$3] = _p21;
  this.value = _p22;
  Object.defineProperty(this, "children", _d$5$12);
}
_P$4$9.prototype = Object.prototype;
var _d$6$11 = {
  get() {
    const Root2 = this[_m$$23];
    const label = this[_m$2$11];
    const labelID = this[_m$3$5];
    const description = this[_m$4$4];
    const descriptionID = this[_m$5$4];
    const setRef = this[_m$6$4];
    const disabledState = this[_m$7$4];
    const ariaDisabledState = this[_m$8$4];
    const hasActiveState = this[_m$9$3];
    const hasSelectedState = this[_m$10$3];
    const rest = this[_m$11$3];
    const props = this[_m$12$3];
    const state = this[_m$13$3];
    return RadioGroupContext(new _P$4$9(Root2, label, labelID, description, descriptionID, setRef, disabledState, ariaDisabledState, hasActiveState, hasSelectedState, rest, props, state, {
      descriptionID,
      labelID,
      label,
      description
    }));
  },
  enumerable: true,
  configurable: true
};
function _P$5$8(_p23, _p24, _p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32, _p33, _p34, _p35, _p36) {
  this[_m$$23] = _p23;
  this[_m$2$11] = _p24;
  this[_m$3$5] = _p25;
  this[_m$4$4] = _p26;
  this[_m$5$4] = _p27;
  this[_m$6$4] = _p28;
  this[_m$7$4] = _p29;
  this[_m$8$4] = _p30;
  this[_m$9$3] = _p31;
  this[_m$10$3] = _p32;
  this[_m$11$3] = _p33;
  this[_m$12$3] = _p34;
  this[_m$13$3] = _p35;
  this.value = _p36;
  Object.defineProperty(this, "children", _d$6$11);
}
_P$5$8.prototype = Object.prototype;
var _d$7$10 = {
  get() {
    return this[_m$$23].descriptionID;
  },
  enumerable: true,
  configurable: true
};
function _P$6$8(_p37) {
  this[_m$$23] = _p37;
  Object.defineProperty(this, "id", _d$7$10);
}
_P$6$8.prototype = Object.prototype;
var _d$8$8 = {
  get() {
    return this[_m$$23].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$7$8(_p38) {
  this[_m$$23] = _p38;
  Object.defineProperty(this, "id", _d$8$8);
}
_P$7$8.prototype = Object.prototype;
var _d$9$8 = {
  get() {
    const label = this[_m$$23];
    const labelID = this[_m$2$11];
    return label.isPresent() ? labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$10$8 = {
  get() {
    const description = this[_m$3$5];
    const descriptionID = this[_m$4$4];
    return description.isPresent() ? descriptionID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$8$8(_p39, _p40, _p41, _p42) {
  this[_m$$23] = _p39;
  this[_m$2$11] = _p40;
  this[_m$3$5] = _p41;
  this[_m$4$4] = _p42;
  Object.defineProperty(this, "aria-labelledby", _d$9$8);
  Object.defineProperty(this, "aria-describedby", _d$10$8);
}
_P$8$8.prototype = Object.prototype;
var _d$11$8 = {
  get() {
    return this[_m$$23].as || "div";
  },
  enumerable: true,
  configurable: true
};
var _d$12$8 = {
  get() {
    const context = this[_m$2$11];
    const internalRef = this[_m$3$5];
    return context.tabStop() !== void 0 && context.tabStop() === internalRef() ? 0 : -1;
  },
  enumerable: true,
  configurable: true
};
function _P$9$7(_p43, _p44, _p45, _p46, _p47) {
  this[_m$$23] = _p43;
  this[_m$2$11] = _p44;
  this[_m$3$5] = _p45;
  Object.defineProperty(this, "as", _d$11$8);
  this.role = _p46;
  this.ref = _p47;
  Object.defineProperty(this, "tabindex", _d$12$8);
}
_P$9$7.prototype = Object.prototype;
var _d$13$8 = {
  get() {
    return this[_m$$23].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10$5(_p48, _p49) {
  this[_m$$23] = _p48;
  this.state = _p49;
  Object.defineProperty(this, "children", _d$13$8);
}
_P$10$5.prototype = Object.prototype;
var _d$14$7 = {
  get() {
    const props = this[_m$$23];
    const state = this[_m$2$11];
    return SelectOptionStateProvider(new _P$10$5(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$11$5(_p50, _p51) {
  this[_m$$23] = _p50;
  this[_m$2$11] = _p51;
  Object.defineProperty(this, "children", _d$14$7);
}
_P$11$5.prototype = Object.prototype;
var _d$15$6 = {
  get() {
    const label = this[_m$$23];
    const labelID = this[_m$2$11];
    const description = this[_m$3$5];
    const descriptionID = this[_m$4$4];
    const ownerAttribute = this[_m$5$4];
    const props = this[_m$6$4];
    const context = this[_m$7$4];
    const internalRef = this[_m$8$4];
    const setInternalRef = this[_m$9$3];
    const disabledState = this[_m$10$3];
    const ariaDisabledState = this[_m$11$3];
    const checkedState = this[_m$12$3];
    const ariaCheckedState = this[_m$13$3];
    const activeState = this[_m$14$3];
    const rest = this[_m$15$2];
    const state = this[_m$16$2];
    return Button(mergeProps(new _P$8$8(label, labelID, description, descriptionID), RADIO_GROUP_OPTION_TAG, ownerAttribute, new _P$9$7(props, context, internalRef, "radio", setInternalRef), disabledState, ariaDisabledState, checkedState, ariaCheckedState, activeState, rest, new _P$11$5(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$12$3(_p52, _p53, _p54, _p55, _p56, _p57, _p58, _p59, _p60, _p61, _p62, _p63, _p64, _p65, _p66, _p67, _p68) {
  this[_m$$23] = _p52;
  this[_m$2$11] = _p53;
  this[_m$3$5] = _p54;
  this[_m$4$4] = _p55;
  this[_m$5$4] = _p56;
  this[_m$6$4] = _p57;
  this[_m$7$4] = _p58;
  this[_m$8$4] = _p59;
  this[_m$9$3] = _p60;
  this[_m$10$3] = _p61;
  this[_m$11$3] = _p62;
  this[_m$12$3] = _p63;
  this[_m$13$3] = _p64;
  this[_m$14$3] = _p65;
  this[_m$15$2] = _p66;
  this[_m$16$2] = _p67;
  this.value = _p68;
  Object.defineProperty(this, "children", _d$15$6);
}
_P$12$3.prototype = Object.prototype;
var RadioGroupContext = createContext(null);
function useRadioGroupContext(componentName) {
  const context = useContext(RadioGroupContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`));
  return context;
}
var RadioGroupRootContext = createContext(null);
function useRadioGroupRootContext(componentName) {
  const context = useContext(RadioGroupRootContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <RadioGroup>`));
  return context;
}
function createRadioGroupOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}
function createRadioGroupRoot(controller) {
  const [entries, setEntries] = createSignal([]);
  return {
    controller,
    tabStop: createMemo(() => {
      let first;
      for (const entry of entries()) if (!entry.disabled()) {
        if (entry.checked()) return entry.element;
        if (!first || first.compareDocumentPosition(entry.element) & Node.DOCUMENT_POSITION_PRECEDING) first = entry.element;
      }
      return first;
    }),
    register(entry) {
      setEntries((current) => [...current, entry]);
      return () => {
        setEntries((current) => current.filter((item) => item !== entry));
      };
    }
  };
}
var RADIO_GROUP_TAG = createTag("radio-group");
var RADIO_GROUP_DESCRIPTION_TAG = createTag("radio-group-description");
var RADIO_GROUP_LABEL_TAG = createTag("radio-group-label");
var RADIO_GROUP_OPTION_TAG = createTag("radio-group-option");
function isRadioGroupUncontrolled(props) {
  return "defaultValue" in props;
}
function RadioGroup(props) {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();
  const label = createPresence();
  const description = createPresence();
  const root = createRadioGroupRoot(controller);
  const state = createSingleSelectState(props);
  const [ref, setRef] = createForwardRef(props);
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      const checkFocused = () => {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && focused !== current && current.contains(focused)) focused.click();
      };
      return mergeFunc(() => {
        controller.clearRef();
      }, useEventListener(current, "keydown", (e) => {
        if (!state.disabled()) switch (e.key) {
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault();
            controller.setPrevChecked(true);
            checkFocused();
            break;
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault();
            controller.setNextChecked(true);
            checkFocused();
        }
      }), useEventListener(current, "focusin", (e) => {
        if (e.target && e.target !== current) controller.setCurrent(e.target);
      }));
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const rest = isRadioGroupUncontrolled(props) ? omit(props, "as", "by", "children", "defaultValue", "disabled", "multiple", "onChange", "ref", "toggleable") : omit(props, "as", "by", "children", "value", "disabled", "multiple", "onChange", "ref", "toggleable");
  return RadioGroupRootContext(new _P$5$8(dynamic(() => props.as || "div"), label, labelID, description, descriptionID, setRef, disabledState, ariaDisabledState, hasActiveState, hasSelectedState, rest, props, state, root));
}
function RadioGroupDescription(props) {
  const context = useRadioGroupContext("RadioGroupDescription");
  context.description.register();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "div")(mergeProps(RADIO_GROUP_DESCRIPTION_TAG, new _P$6$8(context), rest));
}
function RadioGroupLabel(props) {
  const context = useRadioGroupContext("RadioGroupLabel");
  context.label.register();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "label")(mergeProps(RADIO_GROUP_LABEL_TAG, new _P$7$8(context), rest));
}
function RadioGroupOption(props) {
  const context = useRadioGroupRootContext("RadioGroupOption");
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();
  const label = createPresence();
  const description = createPresence();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(context.register({
      element: current,
      disabled: state.disabled,
      checked: state.isSelected
    }), useEventListener(current, "click", () => {
      state.select();
    }), useEventListener(current, "focus", () => {
      state.focus();
    }), useEventListener(current, "blur", () => {
      state.blur();
    }));
  });
  return RadioGroupContext(new _P$12$3(label, labelID, description, descriptionID, createOwnerAttribute(context.controller.getId()), props, context, internalRef, setInternalRef, createDisabledState(() => state.disabled()), createARIADisabledState(() => state.disabled()), createCheckedState(() => state.isSelected()), createARIACheckedState(() => state.isSelected()), createActiveState(() => state.isActive()), omit(props, "as", "children", "value", "disabled", "ref"), state, {
    descriptionID,
    labelID,
    label,
    description
  }));
}
var _tmpl$$13 = [
  "<span",
  ' aria-hidden="true">',
  "</span>"
];
var _m$$22 = /* @__PURE__ */ Symbol();
var _d$$23 = {
  get() {
    return this[_m$$22].label;
  },
  enumerable: true,
  configurable: true
};
function _P$$23(_p, _p2) {
  this[_m$$22] = _p;
  this.class = _p2;
  Object.defineProperty(this, "children", _d$$23);
}
_P$$23.prototype = Object.prototype;
var _d$2$21 = {
  get() {
    return this[_m$$22].value;
  },
  enumerable: true,
  configurable: true
};
var _d$3$18 = {
  get() {
    const option = this[_m$$22];
    var _v$, _v$2;
    return [RadioGroupLabel(new _P$$23(option, "visually-hidden")), (_v$ = ssrHydrationKey(), _v$2 = scope(() => {
      return escape(option.glyph);
    }), ssr(_tmpl$$13, _v$, _v$2))];
  },
  enumerable: true,
  configurable: true
};
function _P$2$19(_p3, _p4) {
  this[_m$$22] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "value", _d$2$21);
  Object.defineProperty(this, "children", _d$3$18);
}
_P$2$19.prototype = Object.prototype;
var _d$4$16 = {
  get() {
    const scheme = this[_m$$22];
    return scheme();
  },
  enumerable: true,
  configurable: true
};
var _d$5$11 = {
  get() {
    return [RadioGroupLabel({
      class: "visually-hidden",
      children: "Appearance"
    }), For({
      each: OPTIONS,
      children: (option) => {
        return RadioGroupOption(new _P$2$19(option, "scheme-picker-option"));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3$15(_p5, _p6, _p7) {
  this[_m$$22] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "value", _d$4$16);
  this.onChange = _p7;
  Object.defineProperty(this, "children", _d$5$11);
}
_P$3$15.prototype = Object.prototype;
var OPTIONS = [
  {
    value: "system",
    label: "System",
    glyph: "\u25D0"
  },
  {
    value: "light",
    label: "Light",
    glyph: "\u2600"
  },
  {
    value: "dark",
    label: "Dark",
    glyph: "\u263E"
  }
];
function SchemePicker() {
  const [scheme, setScheme] = useColorScheme();
  return RadioGroup(new _P$3$15(scheme, "scheme-picker", (value) => {
    if (value) setScheme(value);
  }));
}
var _m$$21 = /* @__PURE__ */ Symbol();
var _d$$22 = {
  get() {
    return this[_m$$21].state;
  },
  enumerable: true,
  configurable: true
};
var _d$2$20 = {
  get() {
    const props = this[_m$$21];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$$22(_p) {
  this[_m$$21] = _p;
  Object.defineProperty(this, "value", _d$$22);
  Object.defineProperty(this, "children", _d$2$20);
}
_P$$22.prototype = Object.prototype;
var _d$3$17 = {
  get() {
    return this[_m$$21].state;
  },
  enumerable: true,
  configurable: true
};
var _d$4$15 = {
  get() {
    const props = this[_m$$21];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$2$18(_p2) {
  this[_m$$21] = _p2;
  Object.defineProperty(this, "value", _d$3$17);
  Object.defineProperty(this, "children", _d$4$15);
}
_P$2$18.prototype = Object.prototype;
var INPUT_READER_DEBOUNCE_TIMEOUT = 250;
function createInputReader(time = INPUT_READER_DEBOUNCE_TIMEOUT) {
  let timeout;
  onCleanup(() => {
    if (timeout) clearTimeout(timeout);
  });
  const [signal, setSignal] = createSignal("");
  return [signal, (value) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSignal(value);
    }, time);
  }];
}
function createSingleAutocompleteState(options) {
  const [active, setActive] = createSignal();
  let selectedValue;
  let setSelectedValue;
  const equals = options.by || isEqual;
  if ("defaultValue" in options) {
    const [selected, setSelected] = createSignal(() => options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      setSelected(() => value);
      if (options.onChange) options.onChange(value);
    };
  } else {
    selectedValue = createMemo(() => options.value);
    setSelectedValue = (value) => {
      if (options.onChange) options.onChange(value);
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  const [input, setInput] = createInputReader();
  return {
    isSelected(value) {
      return isEqual(value, selectedValue());
    },
    select(value) {
      if (!untrack(isDisabled)) if (options.toggleable && equals(untrack(selectedValue), value)) setSelectedValue(void 0);
      else setSelectedValue(value);
    },
    hasSelected() {
      return selectedValue() != null;
    },
    disabled: isDisabled,
    hasActive() {
      return !!active();
    },
    isActive(value) {
      const ref = active();
      return ref ? equals(value, ref.value) : false;
    },
    focus(value) {
      if (!untrack(isDisabled)) setActive({ value });
    },
    blur() {
      if (!untrack(isDisabled)) setActive(void 0);
    },
    query() {
      return input();
    },
    setQuery(value) {
      if (!untrack(isDisabled)) setInput(value);
    },
    matches(value) {
      return options.matchBy(value, input());
    },
    hasQuery: createMemo(() => !!input())
  };
}
function createMultipleAutocompleteState(options) {
  const [active, setActive] = createSignal();
  let selectedValues;
  let setSelectedValues;
  const equals = options.by || isEqual;
  if ("defaultValue" in options) {
    const [selected, setSelected] = createSignal(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      setSelected(() => value);
      if (options.onChange) options.onChange(value);
    };
  } else {
    selectedValues = createMemo(() => options.value);
    setSelectedValues = (value) => {
      if (options.onChange) options.onChange(value);
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  const [input, setInput] = createInputReader();
  return {
    isSelected(value) {
      const values = selectedValues();
      for (let i = 0, len = values.length; i < len; i += 1) if (equals(value, values[i])) return true;
      return false;
    },
    select(value) {
      if (!untrack(isDisabled)) {
        const newValues = [];
        const currentValues = untrack(selectedValues);
        let hasValue = false;
        for (let i = 0, len = currentValues.length; i < len; i += 1) {
          const item = currentValues[i];
          const isSame = equals(item, value);
          if (isSame) hasValue = true;
          if (!(options.toggleable && isSame)) newValues.push(item);
        }
        if (!hasValue) newValues.push(value);
        setSelectedValues(newValues);
      }
    },
    hasSelected: createMemo(() => selectedValues().length > 0),
    disabled: isDisabled,
    hasActive: createMemo(() => !!active()),
    isActive(value) {
      const ref = active();
      if (ref) return equals(value, ref.value);
      return false;
    },
    focus(value) {
      if (!untrack(isDisabled)) setActive({ value });
    },
    blur() {
      if (!untrack(isDisabled)) setActive(void 0);
    },
    query() {
      return input();
    },
    setQuery(value) {
      setInput(value);
    },
    matches(value) {
      return options.matchBy(value, input());
    },
    hasQuery: createMemo(() => !!input())
  };
}
var AutocompleteStateContext = createContext(null);
function AutocompleteStateProvider(props) {
  return AutocompleteStateContext(new _P$$22(props));
}
function useAutocompleteState() {
  const ctx = useContext(AutocompleteStateContext);
  assert(ctx, /* @__PURE__ */ new Error("Missing <AutocompleteStateProvider>"));
  return ctx;
}
function AutocompleteStateChild(props) {
  const state = useAutocompleteState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === "function" && current.length === 1) return createMemo(() => current(state));
    return current;
  });
}
function createAutocompleteOptionState(options) {
  const state = useAutocompleteState();
  const isDisabled = createMemo(() => options.disabled || state.disabled());
  return {
    isSelected: createMemo(() => state.isSelected(options.value)),
    isActive: createMemo(() => state.isActive(options.value)),
    select() {
      if (!untrack(isDisabled)) state.select(options.value);
    },
    focus() {
      if (!untrack(isDisabled)) state.focus(options.value);
    },
    blur() {
      if (!untrack(isDisabled) && this.isActive()) state.blur();
    },
    matches: createMemo(() => state.matches(options.value)),
    disabled: isDisabled
  };
}
var AutocompleteOptionStateContext = createContext(null);
function AutocompleteOptionStateProvider(props) {
  return AutocompleteOptionStateContext(new _P$2$18(props));
}
var _m$$20 = /* @__PURE__ */ Symbol();
var _m$2$10 = /* @__PURE__ */ Symbol();
var _m$3$4 = /* @__PURE__ */ Symbol();
var _m$4$3 = /* @__PURE__ */ Symbol();
var _m$5$3 = /* @__PURE__ */ Symbol();
var _m$6$3 = /* @__PURE__ */ Symbol();
var _m$7$3 = /* @__PURE__ */ Symbol();
var _m$8$3 = /* @__PURE__ */ Symbol();
var _m$9$2 = /* @__PURE__ */ Symbol();
var _m$10$2 = /* @__PURE__ */ Symbol();
var _m$11$2 = /* @__PURE__ */ Symbol();
var _m$12$2 = /* @__PURE__ */ Symbol();
var _m$13$2 = /* @__PURE__ */ Symbol();
var _m$14$2 = /* @__PURE__ */ Symbol();
var _m$15$1 = /* @__PURE__ */ Symbol();
var _m$16$1 = /* @__PURE__ */ Symbol();
var _m$17$1 = /* @__PURE__ */ Symbol();
var _m$18$1 = /* @__PURE__ */ Symbol();
var _d$$21 = {
  get() {
    return this[_m$$20].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$21(_p, _p2) {
  this[_m$$20] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$$21);
}
_P$$21.prototype = Object.prototype;
var _d$2$19 = {
  get() {
    const props = this[_m$$20];
    const state = this[_m$2$10];
    return AutocompleteStateProvider(new _P$$21(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$2$17(_p3, _p4) {
  this[_m$$20] = _p3;
  this[_m$2$10] = _p4;
  Object.defineProperty(this, "children", _d$2$19);
}
_P$2$17.prototype = Object.prototype;
var _d$3$16 = {
  get() {
    const props = this[_m$$20];
    const controller = this[_m$2$10];
    const inputID = this[_m$3$4];
    const optionsID = this[_m$4$3];
    const labelID = this[_m$5$3];
    const activeDescendant = this[_m$6$3];
    const setActiveDescendant = this[_m$7$3];
    const selectedDescendant = this[_m$8$3];
    const setSelectedDescendant = this[_m$9$2];
    const label = this[_m$10$2];
    return {
      multiple: !!props.multiple,
      controller,
      inputID,
      optionsID,
      labelID,
      optionsHovering: false,
      getActiveDescendant: activeDescendant,
      setActiveDescendant,
      getSelectedDescendant: selectedDescendant,
      setSelectedDescendant,
      hasLabel: label.isPresent,
      registerLabel: label.register
    };
  },
  enumerable: true,
  configurable: true
};
var _d$4$14 = {
  get() {
    const Root2 = this[_m$11$2];
    const controllerId = this[_m$12$2];
    const disabledState = this[_m$13$2];
    const hasSelectedState = this[_m$14$2];
    const hasActiveState = this[_m$15$1];
    const hasQueryState = this[_m$16$1];
    const rest = this[_m$17$1];
    const props = this[_m$$20];
    const state = this[_m$18$1];
    return Root2(mergeProps(COMMAND_TAG, { id: controllerId }, disabledState, hasSelectedState, hasActiveState, hasQueryState, rest, new _P$2$17(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$3$14(_p5, _p6, _p7, _p8, _p9, _p0, _p1, _p10, _p11, _p12, _p13, _p14, _p15, _p16, _p17, _p18, _p19, _p20) {
  this[_m$$20] = _p5;
  this[_m$2$10] = _p6;
  this[_m$3$4] = _p7;
  this[_m$4$3] = _p8;
  this[_m$5$3] = _p9;
  this[_m$6$3] = _p0;
  this[_m$7$3] = _p1;
  this[_m$8$3] = _p10;
  this[_m$9$2] = _p11;
  this[_m$10$2] = _p12;
  this[_m$11$2] = _p13;
  this[_m$12$2] = _p14;
  this[_m$13$2] = _p15;
  this[_m$14$2] = _p16;
  this[_m$15$1] = _p17;
  this[_m$16$1] = _p18;
  this[_m$17$1] = _p19;
  this[_m$18$1] = _p20;
  Object.defineProperty(this, "value", _d$3$16);
  Object.defineProperty(this, "children", _d$4$14);
}
_P$3$14.prototype = Object.prototype;
var _d$5$10 = {
  get() {
    return this[_m$$20].inputID;
  },
  enumerable: true,
  configurable: true
};
var _d$6$10 = {
  get() {
    return this[_m$$20].optionsID;
  },
  enumerable: true,
  configurable: true
};
var _d$7$9 = {
  get() {
    const context = this[_m$$20];
    return memo(() => {
      return !!context.hasLabel();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$8$7 = {
  get() {
    return this[_m$$20].getActiveDescendant();
  },
  enumerable: true,
  configurable: true
};
function _P$4$8(_p21, _p22, _p23, _p24, _p25, _p26, _p27) {
  this[_m$$20] = _p21;
  Object.defineProperty(this, "id", _d$5$10);
  this.ref = _p22;
  this.type = _p23;
  this.tabindex = _p24;
  this.role = _p25;
  Object.defineProperty(this, "aria-controls", _d$6$10);
  this["aria-expanded"] = _p26;
  this["aria-autocomplete"] = _p27;
  Object.defineProperty(this, "aria-labelledby", _d$7$9);
  Object.defineProperty(this, "aria-activedescendant", _d$8$7);
}
_P$4$8.prototype = Object.prototype;
var _d$9$7 = {
  get() {
    return this[_m$$20].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$5$7(_p28) {
  this[_m$$20] = _p28;
  Object.defineProperty(this, "id", _d$9$7);
}
_P$5$7.prototype = Object.prototype;
var _d$10$7 = {
  get() {
    return this[_m$$20].as || "li";
  },
  enumerable: true,
  configurable: true
};
function _P$6$7(_p29, _p30, _p31, _p32, _p33) {
  this[_m$$20] = _p29;
  this.id = _p30;
  Object.defineProperty(this, "as", _d$10$7);
  this.role = _p31;
  this.tabindex = _p32;
  this.ref = _p33;
}
_P$6$7.prototype = Object.prototype;
var _d$11$7 = {
  get() {
    return this[_m$$20].children;
  },
  enumerable: true,
  configurable: true
};
function _P$7$7(_p34, _p35) {
  this[_m$$20] = _p34;
  this.state = _p35;
  Object.defineProperty(this, "children", _d$11$7);
}
_P$7$7.prototype = Object.prototype;
var _d$12$7 = {
  get() {
    const props = this[_m$$20];
    const state = this[_m$2$10];
    return AutocompleteOptionStateProvider(new _P$7$7(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$8$7(_p36, _p37) {
  this[_m$$20] = _p36;
  this[_m$2$10] = _p37;
  Object.defineProperty(this, "children", _d$12$7);
}
_P$8$7.prototype = Object.prototype;
var _d$13$7 = {
  get() {
    return this[_m$$20].optionsID;
  },
  enumerable: true,
  configurable: true
};
var _d$14$6 = {
  get() {
    const context = this[_m$$20];
    return memo(() => {
      return !!context.hasLabel();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$15$5 = {
  get() {
    return this[_m$$20].multiple ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
function _P$9$6(_p38, _p39, _p40, _p41, _p42) {
  this[_m$$20] = _p38;
  Object.defineProperty(this, "id", _d$13$7);
  this.role = _p39;
  Object.defineProperty(this, "aria-labelledby", _d$14$6);
  Object.defineProperty(this, "aria-multiselectable", _d$15$5);
  this.ref = _p40;
  this["aria-orientation"] = _p41;
  this.tabindex = _p42;
}
_P$9$6.prototype = Object.prototype;
var _d$16$4 = {
  get() {
    return this[_m$$20].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10$4(_p43) {
  this[_m$$20] = _p43;
  Object.defineProperty(this, "children", _d$16$4);
}
_P$10$4.prototype = Object.prototype;
var _d$17$4 = {
  get() {
    const props = this[_m$$20];
    return AutocompleteStateChild(new _P$10$4(props));
  },
  enumerable: true,
  configurable: true
};
function _P$11$4(_p44) {
  this[_m$$20] = _p44;
  Object.defineProperty(this, "children", _d$17$4);
}
_P$11$4.prototype = Object.prototype;
var CommandContext = createContext(null);
function useCommandContext(componentName) {
  const context = useContext(CommandContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Command>`));
  return context;
}
function createCommandOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId(), {
    virtual: true,
    base: MATCHES_NODE
  });
}
var COMMAND_TAG = createTag("command");
var COMMAND_INPUT_TAG = createTag("command-input");
var COMMAND_OPTIONS_TAG = createTag("command-options");
var COMMAND_OPTION_TAG = createTag("command-option");
var COMMAND_LABEL_TAG = createTag("command-label");
function isCommandMultiple(props) {
  return !!props.multiple;
}
function isCommandUncontrolled(props) {
  return "defaultValue" in props;
}
function Command(props) {
  return createMemo(() => {
    const controller = createCommandOptionFocusNavigator();
    const state = isCommandMultiple(props) ? createMultipleAutocompleteState(props) : createSingleAutocompleteState(props);
    const [activeDescendant, setActiveDescendant] = createSignal(void 0, { ownedWrite: true });
    const [selectedDescendant, setSelectedDescendant] = createSignal(void 0, { equals: false });
    const inputID = createUniqueId();
    const optionsID = createUniqueId();
    const labelID = createUniqueId();
    createEffect(() => !state.hasActive(), (flag) => {
      if (flag) setActiveDescendant(void 0);
    });
    const label = createPresence();
    const controllerId = controller.getId();
    const disabledState = createDisabledState(() => state.disabled());
    const hasSelectedState = createHasSelectedState(() => state.hasSelected());
    const hasActiveState = createHasActiveState(() => state.hasActive());
    const hasQueryState = createHasQueryState(() => state.hasQuery());
    const rest = isCommandUncontrolled(props) ? omit(props, "as", "by", "children", "defaultValue", "disabled", "horizontal", "multiple", "onChange", "toggleable") : omit(props, "as", "by", "children", "value", "disabled", "horizontal", "multiple", "onChange", "toggleable");
    return CommandContext(new _P$3$14(props, controller, inputID, optionsID, labelID, activeDescendant, setActiveDescendant, selectedDescendant, setSelectedDescendant, label, dynamic(() => props.as || "div"), controllerId, disabledState, hasSelectedState, hasActiveState, hasQueryState, rest, state));
  });
}
function CommandInput(props) {
  const context = useCommandContext("CommandInput");
  const state = useAutocompleteState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isDisabled = () => state.disabled() || props.disabled;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      return mergeFunc(current instanceof HTMLInputElement && useEventListener(current, "input", () => {
        if (!isDisabled()) state.setQuery(current.value);
      }), useEventListener(current, "keydown", (e) => {
        if (!isDisabled()) switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            context.controller.setPrevChecked(true);
            break;
          case "ArrowDown":
            e.preventDefault();
            context.controller.setNextChecked(true);
            break;
          case "Enter":
            e.preventDefault();
            context.setSelectedDescendant(context.getActiveDescendant());
        }
      }), useEventListener(current, "focus", () => {
        const activeDescendant = context.getActiveDescendant();
        if (activeDescendant) {
          const ref = document.getElementById(activeDescendant);
          if (ref) context.controller.setCurrent(ref);
        } else if (state.hasSelected()) context.controller.setFirstChecked(SELECTED_NODE);
        else context.controller.setFirstChecked();
      }), useEventListener(current, "blur", () => {
        if (!context.optionsHovering) state.blur();
      }));
    }
  });
  createEffect(() => state.query() !== "", (flag) => {
    if (flag) context.controller.setFirstChecked();
  });
  createEffect(() => context.getActiveDescendant(), (activeDescendant) => {
    if (activeDescendant) {
      const ref = document.getElementById(activeDescendant);
      if (ref) context.controller.setCurrent(ref);
    }
  });
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasQueryState = createHasQueryState(() => state.hasQuery());
  const rest = omit(props, "as", "ref");
  return dynamic(() => props.as || "input")(mergeProps(COMMAND_INPUT_TAG, new _P$4$8(context, setInternalRef, "text", 0, "combobox", "true", "list"), disabledState, ariaDisabledState, hasSelectedState, hasActiveState, hasQueryState, rest));
}
function CommandLabel(props) {
  const context = useCommandContext("CommandLabel");
  const state = useAutocompleteState();
  context.registerLabel();
  const rest = omit(props, "as");
  const disabledState = createDisabledState(() => state.disabled());
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasQueryState = createHasQueryState(() => state.hasQuery());
  return dynamic(() => props.as || "label")(mergeProps(rest, COMMAND_LABEL_TAG, new _P$5$7(context), disabledState, hasSelectedState, hasActiveState, hasQueryState));
}
function CommandOption(props) {
  const context = useCommandContext("CommandOption");
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createAutocompleteOptionState(props);
  const id = createUniqueId();
  createEffect(() => !state.disabled() && context.getSelectedDescendant() === id, (flag) => {
    if (flag) state.select();
  });
  function focusOption() {
    context.setActiveDescendant(id);
    state.focus();
  }
  createEffect(() => state.isActive(), (active) => {
    if (active) context.setActiveDescendant(id);
    return () => {
      if (context.getActiveDescendant() === id) context.setActiveDescendant(void 0);
    };
  });
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "click", () => {
      if (!state.disabled()) {
        state.select();
        focusOption();
      }
    }), useEventListener(current, "mouseenter", () => {
      if (!state.disabled()) focusOption();
    }), useEventListener(current, "mouseleave", () => {
      state.blur();
    }), useVirtualFocus((el) => {
      if (el === current) focusOption();
    }));
  });
  const ownerAttribute = createOwnerAttribute(context.controller.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const matchesState = createMatchesState(() => state.matches());
  const rest = omit(props, "as", "children", "value", "ref");
  return Button(mergeProps(COMMAND_OPTION_TAG, ownerAttribute, new _P$6$7(props, id, "option", -1, setInternalRef), disabledState, ariaDisabledState, selectedState, ariaSelectedState, activeState, matchesState, rest, new _P$8$7(props, state)));
}
function CommandOptions(props) {
  const context = useCommandContext("CommandOptions");
  const state = useAutocompleteState();
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.controller.setRef(current);
      context.optionsHovering = false;
      return mergeFunc(() => {
        context.controller.clearRef();
      }, useEventListener(current, "focusin", () => {
        if (context.anchor) context.anchor.focus();
      }), useEventListener(current, "mouseenter", () => {
        context.optionsHovering = true;
      }), useEventListener(current, "mouseleave", () => {
        context.optionsHovering = false;
      }), () => {
        context.optionsHovering = false;
      });
    }
  });
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasQueryState = createHasQueryState(() => state.hasQuery());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "ul")(mergeProps(COMMAND_OPTIONS_TAG, new _P$9$6(context, "listbox", setInternalRef, "vertical", -1), disabledState, ariaDisabledState, hasSelectedState, hasActiveState, hasQueryState, rest, new _P$11$4(props)));
}
var INERT_COUNT = /* @__PURE__ */ Symbol.for("terracotta.inert-count");
var CLOSED_MODAL = [
  "[tc-dialog]:not([tc-expanded])",
  "[tc-alert-dialog]:not([tc-expanded])",
  "[tc-command-bar]:not([tc-expanded])"
].join(", ");
var LIVE_REGION = '[aria-live], [role="status"], [role="alert"], [role="log"]';
function claim(el, claimed, kept) {
  var _a2;
  if (kept.some((panel) => panel === el || panel.contains(el))) return;
  const tracked = el;
  const count = (_a2 = tracked[INERT_COUNT]) != null ? _a2 : 0;
  if (count === 0) {
    if (el.hasAttribute("inert") || el.matches(LIVE_REGION)) return;
    if (el.querySelector(LIVE_REGION) || kept.some((panel) => el.contains(panel))) {
      for (const child of Array.from(el.children)) if (child instanceof HTMLElement) claim(child, claimed, kept);
      return;
    }
    el.setAttribute("inert", "");
  }
  tracked[INERT_COUNT] = count + 1;
  claimed.push(el);
}
function release(el) {
  var _a2;
  const tracked = el;
  const count = ((_a2 = tracked[INERT_COUNT]) != null ? _a2 : 1) - 1;
  if (count > 0) {
    tracked[INERT_COUNT] = count;
    return;
  }
  tracked[INERT_COUNT] = 0;
  if (!el.matches(CLOSED_MODAL)) el.removeAttribute("inert");
}
function inertOutside(modal, kept = []) {
  const claimed = [];
  let current = modal;
  while (current !== document.body && current.parentElement) {
    const parent = current.parentElement;
    for (const sibling of Array.from(parent.children)) if (sibling !== current && sibling instanceof HTMLElement) claim(sibling, claimed, kept);
    current = parent;
  }
  return () => {
    for (const el of claimed) release(el);
  };
}
function focusPanel(panel) {
  if (focusFirst(getFocusableElements(panel), false)) return () => {
  };
  const added = !panel.hasAttribute("tabindex");
  if (added) panel.setAttribute("tabindex", "-1");
  panel.focus();
  return () => {
    if (added) panel.removeAttribute("tabindex");
  };
}
function focusPanelAfterTransition(panel) {
  let active = true;
  let undo;
  afterTransition(panel, () => {
    if (active) undo = focusPanel(panel);
  });
  return () => {
    active = false;
    if (undo) undo();
  };
}
function createMountedID(fallback) {
  if (isServer) return {
    id: () => fallback,
    register: () => void 0
  };
  const [id, setID] = createSignal();
  return {
    id,
    register(source) {
      createEffect(source, (current) => {
        setID(current);
        return () => {
          setID((previous) => previous === current ? void 0 : previous);
        };
      });
    }
  };
}
function createModalFocus(state, root, node) {
  let inertRoot;
  let releaseInert;
  function restore() {
    if (releaseInert) releaseInert();
    releaseInert = void 0;
    inertRoot = void 0;
  }
  const fsp = useFocusStartPoint();
  onCleanup(restore);
  let saved = false;
  createEffect(createDependencyList(() => [state.isOpen(), root()]), ([isOpen, current]) => {
    if (isOpen) {
      if (!saved) {
        fsp.save();
        saved = true;
      }
      if (current instanceof HTMLElement && current !== inertRoot) {
        restore();
        inertRoot = current;
        if (current.isConnected) releaseInert = inertOutside(current, node.descendants());
        else queueMicrotask(() => {
          if (inertRoot === current && !releaseInert && current.isConnected) releaseInert = inertOutside(current, node.descendants());
        });
      }
    } else {
      restore();
      saved = false;
      fsp.load();
    }
  });
}
var PanelTreeContext = createContext(null);
function createPanelNode(setRef) {
  const parent = useContext(PanelTreeContext);
  const children2 = /* @__PURE__ */ new Set();
  let current;
  const node = {
    element: () => current,
    contains(target) {
      if (!target) return false;
      if (current == null ? void 0 : current.contains(target)) return true;
      for (const child of children2) if (child.contains(target)) return true;
      return false;
    },
    descendants() {
      const result = [];
      for (const child of children2) {
        const element = child.element();
        if (element instanceof HTMLElement) result.push(element);
        result.push(...child.descendants());
      }
      return result;
    },
    register(child) {
      children2.add(child);
      return () => {
        children2.delete(child);
      };
    }
  };
  if (parent) onCleanup(parent.register(node));
  const ref = ((element) => {
    current = element instanceof Element ? element : void 0;
    return setRef(() => element);
  });
  return [node, ref];
}
function onFocusLeave(node, onLeave) {
  return useEventListener(document, "focusout", (e) => {
    if (node.contains(e.target) && e.relatedTarget && !node.contains(e.relatedTarget)) onLeave();
  });
}
var _m$$19 = /* @__PURE__ */ Symbol();
var _m$2$9 = /* @__PURE__ */ Symbol();
var _m$3$3 = /* @__PURE__ */ Symbol();
var _m$4$2 = /* @__PURE__ */ Symbol();
var _m$5$2 = /* @__PURE__ */ Symbol();
var _m$6$2 = /* @__PURE__ */ Symbol();
var _m$7$2 = /* @__PURE__ */ Symbol();
var _m$8$2 = /* @__PURE__ */ Symbol();
var _m$9$1 = /* @__PURE__ */ Symbol();
var _m$10$1 = /* @__PURE__ */ Symbol();
var _m$11$1 = /* @__PURE__ */ Symbol();
var _m$12$1 = /* @__PURE__ */ Symbol();
var _m$13$1 = /* @__PURE__ */ Symbol();
var _m$14$1 = /* @__PURE__ */ Symbol();
var _d$$20 = {
  get() {
    return this[_m$$19].isOpen() ? "true" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$2$18 = {
  get() {
    return this[_m$2$9].id();
  },
  enumerable: true,
  configurable: true
};
var _d$3$15 = {
  get() {
    return this[_m$3$3].id();
  },
  enumerable: true,
  configurable: true
};
var _d$4$13 = {
  get() {
    return this[_m$$19].isOpen() ? void 0 : "true";
  },
  enumerable: true,
  configurable: true
};
var _d$5$9 = {
  get() {
    return !this[_m$$19].isOpen();
  },
  enumerable: true,
  configurable: true
};
function _P$$20(_p, _p2, _p3, _p4, _p5) {
  this[_m$$19] = _p;
  this[_m$2$9] = _p2;
  this[_m$3$3] = _p3;
  this.id = _p4;
  this.role = _p5;
  Object.defineProperty(this, "aria-modal", _d$$20);
  Object.defineProperty(this, "aria-labelledby", _d$2$18);
  Object.defineProperty(this, "aria-describedby", _d$3$15);
  Object.defineProperty(this, "aria-hidden", _d$4$13);
  Object.defineProperty(this, "inert", _d$5$9);
}
_P$$20.prototype = Object.prototype;
var _d$6$9 = {
  get() {
    return this[_m$$19].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2$16(_p6, _p7) {
  this[_m$$19] = _p6;
  this.state = _p7;
  Object.defineProperty(this, "children", _d$6$9);
}
_P$2$16.prototype = Object.prototype;
var _d$7$8 = {
  get() {
    const props = this[_m$$19];
    const state = this[_m$2$9];
    return DisclosureStateProvider(new _P$2$16(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3$13(_p8, _p9, _p0) {
  this[_m$$19] = _p8;
  this[_m$2$9] = _p9;
  this.value = _p0;
  Object.defineProperty(this, "children", _d$7$8);
}
_P$3$13.prototype = Object.prototype;
var _d$8$6 = {
  get() {
    const props = this[_m$$19];
    const state = this[_m$2$9];
    const node = this[_m$3$3];
    return PanelTreeContext(new _P$3$13(props, state, node));
  },
  enumerable: true,
  configurable: true
};
function _P$4$7(_p1, _p10, _p11, _p12) {
  this[_m$$19] = _p1;
  this[_m$2$9] = _p10;
  this[_m$3$3] = _p11;
  this.ref = _p12;
  Object.defineProperty(this, "children", _d$8$6);
}
_P$4$7.prototype = Object.prototype;
var _d$9$6 = {
  get() {
    return this[_m$$19].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$10$6 = {
  get() {
    return this[_m$2$9].isOpen();
  },
  enumerable: true,
  configurable: true
};
var _d$11$6 = {
  get() {
    const Root2 = this[_m$3$3];
    const state = this[_m$2$9];
    const title = this[_m$4$2];
    const description = this[_m$5$2];
    const ownerID = this[_m$6$2];
    const disabledState = this[_m$7$2];
    const expandedState = this[_m$8$2];
    const rest = this[_m$9$1];
    const props = this[_m$$19];
    const node = this[_m$10$1];
    const panelRef = this[_m$11$1];
    return Root2(mergeProps(COMMAND_BAR_TAG, new _P$$20(state, title, description, ownerID, "dialog"), disabledState, expandedState, rest, new _P$4$7(props, state, node, panelRef)));
  },
  enumerable: true,
  configurable: true
};
function _P$5$6(_p13, _p14, _p15, _p16, _p17, _p18, _p19, _p20, _p21, _p22, _p23) {
  this[_m$$19] = _p13;
  this[_m$2$9] = _p14;
  this[_m$3$3] = _p15;
  this[_m$4$2] = _p16;
  this[_m$5$2] = _p17;
  this[_m$6$2] = _p18;
  this[_m$7$2] = _p19;
  this[_m$8$2] = _p20;
  this[_m$9$1] = _p21;
  this[_m$10$1] = _p22;
  this[_m$11$1] = _p23;
  Object.defineProperty(this, "unmount", _d$9$6);
  Object.defineProperty(this, "when", _d$10$6);
  Object.defineProperty(this, "children", _d$11$6);
}
_P$5$6.prototype = Object.prototype;
var _d$12$6 = {
  get() {
    const ownerID = this[_m$$19];
    const panelID = this[_m$2$9];
    const titleID = this[_m$3$3];
    const descriptionID = this[_m$4$2];
    const title = this[_m$5$2];
    const description = this[_m$6$2];
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
var _d$13$6 = {
  get() {
    const props = this[_m$7$2];
    const state = this[_m$8$2];
    const Root2 = this[_m$9$1];
    const title = this[_m$5$2];
    const description = this[_m$6$2];
    const ownerID = this[_m$$19];
    const disabledState = this[_m$10$1];
    const expandedState = this[_m$11$1];
    const rest = this[_m$12$1];
    const node = this[_m$13$1];
    const panelRef = this[_m$14$1];
    return Unmountable(new _P$5$6(props, state, Root2, title, description, ownerID, disabledState, expandedState, rest, node, panelRef));
  },
  enumerable: true,
  configurable: true
};
function _P$6$6(_p24, _p25, _p26, _p27, _p28, _p29, _p30, _p31, _p32, _p33, _p34, _p35, _p36, _p37) {
  this[_m$$19] = _p24;
  this[_m$2$9] = _p25;
  this[_m$3$3] = _p26;
  this[_m$4$2] = _p27;
  this[_m$5$2] = _p28;
  this[_m$6$2] = _p29;
  this[_m$7$2] = _p30;
  this[_m$8$2] = _p31;
  this[_m$9$1] = _p32;
  this[_m$10$1] = _p33;
  this[_m$11$1] = _p34;
  this[_m$12$1] = _p35;
  this[_m$13$1] = _p36;
  this[_m$14$1] = _p37;
  Object.defineProperty(this, "value", _d$12$6);
  Object.defineProperty(this, "children", _d$13$6);
}
_P$6$6.prototype = Object.prototype;
var _d$14$5 = {
  get() {
    const id = this[_m$$19];
    return id();
  },
  enumerable: true,
  configurable: true
};
function _P$7$6(_p38) {
  this[_m$$19] = _p38;
  Object.defineProperty(this, "id", _d$14$5);
}
_P$7$6.prototype = Object.prototype;
var _d$15$4 = {
  get() {
    return this[_m$$19].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8$6(_p39) {
  this[_m$$19] = _p39;
  Object.defineProperty(this, "children", _d$15$4);
}
_P$8$6.prototype = Object.prototype;
var _d$16$3 = {
  get() {
    const props = this[_m$$19];
    return DisclosureStateChild(new _P$8$6(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9$5(_p40) {
  this[_m$$19] = _p40;
  Object.defineProperty(this, "children", _d$16$3);
}
_P$9$5.prototype = Object.prototype;
var _d$17$3 = {
  get() {
    return this[_m$$19].children;
  },
  enumerable: true,
  configurable: true
};
function _P$10$3(_p41) {
  this[_m$$19] = _p41;
  Object.defineProperty(this, "children", _d$17$3);
}
_P$10$3.prototype = Object.prototype;
var _d$18$3 = {
  get() {
    const props = this[_m$$19];
    return DisclosureStateChild(new _P$10$3(props));
  },
  enumerable: true,
  configurable: true
};
function _P$11$3(_p42) {
  this[_m$$19] = _p42;
  Object.defineProperty(this, "children", _d$18$3);
}
_P$11$3.prototype = Object.prototype;
var _d$19$3 = {
  get() {
    return this[_m$$19].panelID;
  },
  enumerable: true,
  configurable: true
};
function _P$12$2(_p43, _p44) {
  this[_m$$19] = _p43;
  Object.defineProperty(this, "id", _d$19$3);
  this.ref = _p44;
}
_P$12$2.prototype = Object.prototype;
var _d$20$3 = {
  get() {
    return this[_m$$19].children;
  },
  enumerable: true,
  configurable: true
};
function _P$13$2(_p45) {
  this[_m$$19] = _p45;
  Object.defineProperty(this, "children", _d$20$3);
}
_P$13$2.prototype = Object.prototype;
var _d$21$2 = {
  get() {
    const props = this[_m$$19];
    return DisclosureStateChild(new _P$13$2(props));
  },
  enumerable: true,
  configurable: true
};
function _P$14$1(_p46) {
  this[_m$$19] = _p46;
  Object.defineProperty(this, "children", _d$21$2);
}
_P$14$1.prototype = Object.prototype;
var _d$22$1 = {
  get() {
    const id = this[_m$$19];
    return id();
  },
  enumerable: true,
  configurable: true
};
function _P$15$1(_p47) {
  this[_m$$19] = _p47;
  Object.defineProperty(this, "id", _d$22$1);
}
_P$15$1.prototype = Object.prototype;
var _d$23 = {
  get() {
    return this[_m$$19].children;
  },
  enumerable: true,
  configurable: true
};
function _P$16(_p48) {
  this[_m$$19] = _p48;
  Object.defineProperty(this, "children", _d$23);
}
_P$16.prototype = Object.prototype;
var _d$24 = {
  get() {
    const props = this[_m$$19];
    return DisclosureStateChild(new _P$16(props));
  },
  enumerable: true,
  configurable: true
};
function _P$17(_p49) {
  this[_m$$19] = _p49;
  Object.defineProperty(this, "children", _d$24);
}
_P$17.prototype = Object.prototype;
var CommandBarContext = createContext(null);
function useCommandBarContext(componentName) {
  const context = useContext(CommandBarContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <CommandBar>`));
  return context;
}
var COMMAND_BAR_TAG = createTag("command-bar");
var COMMAND_BAR_DESCRIPTION_TAG = createTag("command-bar-description");
var COMMAND_BAR_OVERLAY_TAG = createTag("command-bar-overlay");
var COMMAND_BAR_PANEL_TAG = createTag("command-bar-panel");
var COMMAND_BAR_TITLE_TAG = createTag("command-bar-title");
function isCommandBarUncontrolled(props) {
  return "defaultOpen" in props;
}
function CommandBar(props) {
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
  onSettled(() => useEventListener(window, "keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k" && !e.defaultPrevented) {
      e.preventDefault();
      state.open();
    }
  }));
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isCommandBarUncontrolled(props) ? omit(props, "as", "children", "defaultOpen", "disabled", "onChange", "onClose", "onOpen", "unmount") : omit(props, "as", "children", "isOpen", "disabled", "onChange", "onClose", "onOpen", "unmount");
  return CommandBarContext(new _P$6$6(ownerID, panelID, titleID, descriptionID, title, description, props, state, dynamic(() => props.as || "div"), disabledState, expandedState, rest, node, panelRef));
}
function CommandBarDescription(props) {
  const context = useCommandBarContext("CommandBarDescription");
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const id = () => {
    var _a2;
    return (_a2 = props.id) != null ? _a2 : context.descriptionID;
  };
  context.registerDescription(id);
  const rest = omit(props, "as", "children");
  const expandedState = createExpandedState(() => state.isOpen());
  return dynamic(() => props.as || "p")(mergeProps(COMMAND_BAR_DESCRIPTION_TAG, new _P$7$6(id), disabledState, rest, expandedState, new _P$9$5(props)));
}
function CommandBarOverlay(props) {
  useCommandBarContext("CommandBarOverlay");
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
  return dynamic(() => props.as || "div")(mergeProps(COMMAND_BAR_OVERLAY_TAG, { ref: setInternalRef }, disabledState, expandedState, rest, new _P$11$3(props)));
}
function CommandBarPanel(props) {
  const context = useCommandBarContext("CommandBarPanel");
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
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, "as", "children", "ref");
  return dynamic(() => props.as || "div")(mergeProps(COMMAND_BAR_PANEL_TAG, new _P$12$2(context, setInternalRef), disabledState, expandedState, rest, new _P$14$1(props)));
}
function CommandBarTitle(props) {
  const context = useCommandBarContext("CommandBarTitle");
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const id = () => {
    var _a2;
    return (_a2 = props.id) != null ? _a2 : context.titleID;
  };
  context.registerTitle(id);
  const rest = omit(props, "as", "children");
  return dynamic(() => props.as || "h2")(mergeProps(COMMAND_BAR_TITLE_TAG, new _P$15$1(id), disabledState, expandedState, rest, new _P$17(props)));
}
var _tmpl$$12 = [
  "<svg",
  "",
  ' viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
  "</svg>"
];
var _tmpl$2$9 = ["<path", ' d="M3 8.5l3.25 3.25L13 4.75"></path>'];
var _tmpl$3$7 = ["<path", ' d="M3.5 8h9"></path>'];
var _tmpl$4$5 = ["<path", ' d="M8 3.5v9M3.5 8h9"></path>'];
var _tmpl$5$3 = ["<path", ' d="M6 3.5L10.5 8 6 12.5"></path>'];
var _tmpl$6$2 = ["<path", ' d="M3.5 6L8 10.5 12.5 6"></path>'];
var _tmpl$7$2 = ["<path", ' d="M4 4l8 8M12 4l-8 8"></path>'];
var _tmpl$8$2 = ["<circle", ' cx="7" cy="7" r="4.5"></circle>'];
var _tmpl$9$2 = ["<path", ' d="M10.5 10.5L14 14"></path>'];
var _tmpl$10$1 = ["<path", ' d="M4 1.75h5.25L12.5 5v9.25H4z"></path>'];
var _tmpl$11$1 = ["<path", ' d="M9 2v3.25h3.25M6.25 8.5h4M6.25 11h4"></path>'];
var _tmpl$12$1 = ["<rect", ' x="2.25" y="2.25" width="4.5" height="4.5" rx="1"></rect>'];
var _tmpl$13$1 = ["<rect", ' x="9.25" y="2.25" width="4.5" height="4.5" rx="1"></rect>'];
var _tmpl$14$1 = ["<rect", ' x="2.25" y="9.25" width="4.5" height="4.5" rx="1"></rect>'];
var _tmpl$15$1 = ["<rect", ' x="9.25" y="9.25" width="4.5" height="4.5" rx="1"></rect>'];
var _tmpl$16$1 = ["<path", ' d="M6.5 2.5L5 13.5M11 2.5L9.5 13.5M2.75 6h11M2.25 10h11"></path>'];
var _tmpl$17$1 = ["<path", ' d="M9 1.75L3.5 9h4.25L7 14.25 12.5 7H8.25z"></path>'];
var _m$$18 = /* @__PURE__ */ Symbol();
var _d$$19 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$2$17 = {
  get() {
    var _v$5;
    return _v$5 = ssrHydrationKey(), ssr(_tmpl$2$9, _v$5);
  },
  enumerable: true,
  configurable: true
};
function _P$$19(_p) {
  this[_m$$18] = _p;
  Object.defineProperty(this, "class", _d$$19);
  Object.defineProperty(this, "children", _d$2$17);
}
_P$$19.prototype = Object.prototype;
var _d$3$14 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$4$12 = {
  get() {
    var _v$6;
    return _v$6 = ssrHydrationKey(), ssr(_tmpl$3$7, _v$6);
  },
  enumerable: true,
  configurable: true
};
function _P$2$15(_p2) {
  this[_m$$18] = _p2;
  Object.defineProperty(this, "class", _d$3$14);
  Object.defineProperty(this, "children", _d$4$12);
}
_P$2$15.prototype = Object.prototype;
var _d$5$8 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$6$8 = {
  get() {
    var _v$7;
    return _v$7 = ssrHydrationKey(), ssr(_tmpl$4$5, _v$7);
  },
  enumerable: true,
  configurable: true
};
function _P$3$12(_p3) {
  this[_m$$18] = _p3;
  Object.defineProperty(this, "class", _d$5$8);
  Object.defineProperty(this, "children", _d$6$8);
}
_P$3$12.prototype = Object.prototype;
var _d$7$7 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$8$5 = {
  get() {
    var _v$8;
    return _v$8 = ssrHydrationKey(), ssr(_tmpl$5$3, _v$8);
  },
  enumerable: true,
  configurable: true
};
function _P$4$6(_p4) {
  this[_m$$18] = _p4;
  Object.defineProperty(this, "class", _d$7$7);
  Object.defineProperty(this, "children", _d$8$5);
}
_P$4$6.prototype = Object.prototype;
var _d$9$5 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$10$5 = {
  get() {
    var _v$9;
    return _v$9 = ssrHydrationKey(), ssr(_tmpl$6$2, _v$9);
  },
  enumerable: true,
  configurable: true
};
function _P$5$5(_p5) {
  this[_m$$18] = _p5;
  Object.defineProperty(this, "class", _d$9$5);
  Object.defineProperty(this, "children", _d$10$5);
}
_P$5$5.prototype = Object.prototype;
var _d$11$5 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$12$5 = {
  get() {
    var _v$10;
    return _v$10 = ssrHydrationKey(), ssr(_tmpl$7$2, _v$10);
  },
  enumerable: true,
  configurable: true
};
function _P$6$5(_p6) {
  this[_m$$18] = _p6;
  Object.defineProperty(this, "class", _d$11$5);
  Object.defineProperty(this, "children", _d$12$5);
}
_P$6$5.prototype = Object.prototype;
var _d$13$5 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$14$4 = {
  get() {
    var _v$11, _v$12;
    return [(_v$11 = ssrHydrationKey(), ssr(_tmpl$8$2, _v$11)), (_v$12 = ssrHydrationKey(), ssr(_tmpl$9$2, _v$12))];
  },
  enumerable: true,
  configurable: true
};
function _P$7$5(_p7) {
  this[_m$$18] = _p7;
  Object.defineProperty(this, "class", _d$13$5);
  Object.defineProperty(this, "children", _d$14$4);
}
_P$7$5.prototype = Object.prototype;
var _d$15$3 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$16$2 = {
  get() {
    var _v$13, _v$14;
    return [(_v$13 = ssrHydrationKey(), ssr(_tmpl$10$1, _v$13)), (_v$14 = ssrHydrationKey(), ssr(_tmpl$11$1, _v$14))];
  },
  enumerable: true,
  configurable: true
};
function _P$8$5(_p8) {
  this[_m$$18] = _p8;
  Object.defineProperty(this, "class", _d$15$3);
  Object.defineProperty(this, "children", _d$16$2);
}
_P$8$5.prototype = Object.prototype;
var _d$17$2 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$18$2 = {
  get() {
    var _v$15, _v$16, _v$17, _v$18;
    return [
      (_v$15 = ssrHydrationKey(), ssr(_tmpl$12$1, _v$15)),
      (_v$16 = ssrHydrationKey(), ssr(_tmpl$13$1, _v$16)),
      (_v$17 = ssrHydrationKey(), ssr(_tmpl$14$1, _v$17)),
      (_v$18 = ssrHydrationKey(), ssr(_tmpl$15$1, _v$18))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$9$4(_p9) {
  this[_m$$18] = _p9;
  Object.defineProperty(this, "class", _d$17$2);
  Object.defineProperty(this, "children", _d$18$2);
}
_P$9$4.prototype = Object.prototype;
var _d$19$2 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$20$2 = {
  get() {
    var _v$19;
    return _v$19 = ssrHydrationKey(), ssr(_tmpl$16$1, _v$19);
  },
  enumerable: true,
  configurable: true
};
function _P$10$2(_p0) {
  this[_m$$18] = _p0;
  Object.defineProperty(this, "class", _d$19$2);
  Object.defineProperty(this, "children", _d$20$2);
}
_P$10$2.prototype = Object.prototype;
var _d$21$1 = {
  get() {
    return this[_m$$18].class;
  },
  enumerable: true,
  configurable: true
};
var _d$22 = {
  get() {
    var _v$20;
    return _v$20 = ssrHydrationKey(), ssr(_tmpl$17$1, _v$20);
  },
  enumerable: true,
  configurable: true
};
function _P$11$2(_p1) {
  this[_m$$18] = _p1;
  Object.defineProperty(this, "class", _d$21$1);
  Object.defineProperty(this, "children", _d$22);
}
_P$11$2.prototype = Object.prototype;
function Icon(props) {
  var _v$ = ssrHydrationKey(), _v$3 = () => {
    return ((_v$2) => _v$2 == null ? "" : ssrAttribute("class", ssrClassName(_v$2)))(props.class ? `icon ${props.class}` : "icon");
  }, _v$4 = scope(() => {
    return escape(props.children);
  });
  return ssr(_tmpl$$12, _v$, _v$3, _v$4);
}
function CheckIcon(props) {
  return Icon(new _P$$19(props));
}
function MinusIcon(props) {
  return Icon(new _P$2$15(props));
}
function PlusIcon(props) {
  return Icon(new _P$3$12(props));
}
function ChevronRightIcon(props) {
  return Icon(new _P$4$6(props));
}
function ChevronDownIcon(props) {
  return Icon(new _P$5$5(props));
}
function CloseIcon(props) {
  return Icon(new _P$6$5(props));
}
function SearchIcon(props) {
  return Icon(new _P$7$5(props));
}
function PageIcon(props) {
  return Icon(new _P$8$5(props));
}
function ComponentIcon(props) {
  return Icon(new _P$9$4(props));
}
function HashIcon(props) {
  return Icon(new _P$10$2(props));
}
function BoltIcon(props) {
  return Icon(new _P$11$2(props));
}
var _tmpl$$11 = [
  "<button",
  ' type="button" class="control search-trigger"><!--$-->',
  '<!--/--><span class="search-trigger-label">Search</span><kbd class="search-trigger-key">',
  "</kbd></button>"
];
var _tmpl$2$8 = [
  "<div",
  ' class="search-field"><!--$-->',
  "<!--/--><!--$-->",
  '<!--/--><kbd class="search-key">esc</kbd></div>'
];
var _tmpl$3$6 = [
  "<p",
  ' class="search-empty">Nothing matches &#8220;<!--$-->',
  "<!--/-->&#8221;. Try a component such as &#8220;combo&#8221;, or an attribute such as &#8220;tc-expanded&#8221;.</p>"
];
var _tmpl$4$4 = ["<p", ' class="search-foot" aria-hidden="true"><span><kbd>&#8593;</kbd><kbd>&#8595;</kbd> move</span><span><kbd>&#8629;</kbd> open</span><span><kbd>esc</kbd> close</span></p>'];
var _tmpl$5$2 = [
  "<div",
  ' class="search-group" role="group"',
  '><div class="search-group-title" aria-hidden="true">',
  "</div><!--$-->",
  "<!--/--></div>"
];
var _tmpl$6$1 = [
  "<span",
  ' class="search-option-icon"',
  ">",
  "</span>"
];
var _tmpl$7$1 = [
  "<span",
  ' class="search-option-detail">',
  "</span>"
];
var _tmpl$8$1 = [
  "<span",
  ' class="search-option-text"><span class="search-option-title">',
  "</span><!--$-->",
  "<!--/--></span>"
];
var _tmpl$9$1 = ["<span", ' class="search-option-enter" aria-hidden="true">&#8629;</span>'];
var _m$$17 = /* @__PURE__ */ Symbol();
var _m$2$8 = /* @__PURE__ */ Symbol();
var _m$3$2 = /* @__PURE__ */ Symbol();
var _d$$18 = {
  get() {
    return this[_m$$17].kind;
  },
  enumerable: true,
  configurable: true
};
function _P$$18(_p) {
  this[_m$$17] = _p;
  Object.defineProperty(this, "kind", _d$$18);
}
_P$$18.prototype = Object.prototype;
var _d$2$16 = {
  get() {
    return this[_m$$17].detail;
  },
  enumerable: true,
  configurable: true
};
var _d$3$13 = {
  get() {
    const result = this[_m$$17];
    var _v$19, _v$20;
    return _v$19 = ssrHydrationKey(), _v$20 = scope(() => {
      return escape(result.detail);
    }), ssr(_tmpl$7$1, _v$19, _v$20);
  },
  enumerable: true,
  configurable: true
};
function _P$2$14(_p2) {
  this[_m$$17] = _p2;
  Object.defineProperty(this, "when", _d$2$16);
  Object.defineProperty(this, "children", _d$3$13);
}
_P$2$14.prototype = Object.prototype;
var _d$4$11 = {
  get() {
    const result = this[_m$$17];
    var _v$14, _v$15, _v$16, _v$17, _v$18, _v$21, _v$22;
    return [
      (_v$14 = ssrHydrationKey(), _v$15 = () => {
        return ssrAttribute("data-kind", escape(result.kind, true));
      }, _v$16 = escape(KindIcon(new _P$$18(result))), ssr(_tmpl$6$1, _v$14, _v$15, _v$16)),
      (_v$17 = ssrHydrationKey(), _v$18 = scope(() => {
        return escape(result.title);
      }), _v$21 = escape(Show(new _P$2$14(result))), ssr(_tmpl$8$1, _v$17, _v$18, _v$21)),
      (_v$22 = ssrHydrationKey(), ssr(_tmpl$9$1, _v$22))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$3$11(_p3, _p4, _p5, _p6) {
  this[_m$$17] = _p3;
  this.as = _p4;
  this.class = _p5;
  this.value = _p6;
  Object.defineProperty(this, "children", _d$4$11);
}
_P$3$11.prototype = Object.prototype;
var _d$5$7 = {
  get() {
    return this[_m$$17].items;
  },
  enumerable: true,
  configurable: true
};
function _P$4$5(_p7, _p8) {
  this[_m$$17] = _p7;
  Object.defineProperty(this, "each", _d$5$7);
  this.children = _p8;
}
_P$4$5.prototype = Object.prototype;
var _d$6$7 = {
  get() {
    const groups = this[_m$$17];
    return groups();
  },
  enumerable: true,
  configurable: true
};
function _P$5$4(_p9, _p0) {
  this[_m$$17] = _p9;
  Object.defineProperty(this, "each", _d$6$7);
  this.children = _p0;
}
_P$5$4.prototype = Object.prototype;
var _d$7$6 = {
  get() {
    const groups = this[_m$$17];
    return For(new _P$5$4(groups, (entry) => {
      var _v$10, _v$11, _v$12, _v$13;
      return _v$10 = ssrHydrationKey(), _v$11 = () => {
        return ssrAttribute("aria-label", escape(entry.title, true));
      }, _v$12 = scope(() => {
        return escape(entry.title);
      }), _v$13 = escape(For(new _P$4$5(entry, (result) => {
        return CommandOption(new _P$3$11(result, "div", "search-option", result));
      }))), ssr(_tmpl$5$2, _v$10, _v$11, _v$12, _v$13);
    }));
  },
  enumerable: true,
  configurable: true
};
function _P$6$4(_p1, _p10, _p11) {
  this[_m$$17] = _p1;
  this.as = _p10;
  this.class = _p11;
  Object.defineProperty(this, "children", _d$7$6);
}
_P$6$4.prototype = Object.prototype;
var _d$8$4 = {
  get() {
    const props = this[_m$$17];
    const groups = this[_m$2$8];
    return memo(() => {
      return props.search.results().length > 0;
    })() && groups().length === 0;
  },
  enumerable: true,
  configurable: true
};
var _d$9$4 = {
  get() {
    const state = this[_m$3$2];
    var _v$7, _v$8;
    return _v$7 = ssrHydrationKey(), _v$8 = scope(() => {
      return escape(state.query());
    }), ssr(_tmpl$3$6, _v$7, _v$8);
  },
  enumerable: true,
  configurable: true
};
function _P$7$4(_p12, _p13, _p14) {
  this[_m$$17] = _p12;
  this[_m$2$8] = _p13;
  this[_m$3$2] = _p14;
  Object.defineProperty(this, "when", _d$8$4);
  Object.defineProperty(this, "children", _d$9$4);
}
_P$7$4.prototype = Object.prototype;
var _d$10$4 = {
  get() {
    const run = this[_m$$17];
    const props = this[_m$2$8];
    return [
      CommandBarTitle({
        class: "visually-hidden",
        children: "Search the documentation"
      }),
      CommandBarDescription({
        class: "visually-hidden",
        children: "Type to find components, guides and sections, or run an action. Press Enter to go."
      }),
      Command({
        class: "command search",
        defaultValue: void 0,
        by: (a, b) => a.key === b.key,
        matchBy: () => true,
        onChange: (result) => {
          if (result) run(result);
        },
        children: (state) => {
          var _v$4, _v$5, _v$6, _v$9;
          const groups = () => groupResults(props.search.results(), state.query());
          createEffect(() => {
            var _a2;
            return (_a2 = groups()[0]) == null ? void 0 : _a2.items[0];
          }, (first) => {
            if (first) state.focus(first);
            else state.blur();
          });
          return [
            CommandLabel({
              class: "visually-hidden",
              children: "Search"
            }),
            (_v$4 = ssrHydrationKey(), _v$5 = escape(SearchIcon({ class: "search-field-icon" })), _v$6 = escape(CommandInput({
              class: "search-input",
              placeholder: "Search components, guides and sections\u2026"
            })), ssr(_tmpl$2$8, _v$4, _v$5, _v$6)),
            CommandOptions(new _P$6$4(groups, "div", "search-options")),
            Show(new _P$7$4(props, groups, state)),
            (_v$9 = ssrHydrationKey(), ssr(_tmpl$4$4, _v$9))
          ];
        }
      })
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$8$4(_p15, _p16, _p17) {
  this[_m$$17] = _p15;
  this[_m$2$8] = _p16;
  this.class = _p17;
  Object.defineProperty(this, "children", _d$10$4);
}
_P$8$4.prototype = Object.prototype;
var _d$11$4 = {
  get() {
    return this[_m$$17].search.open();
  },
  enumerable: true,
  configurable: true
};
var _d$12$4 = {
  get() {
    return this[_m$$17].search.toggle;
  },
  enumerable: true,
  configurable: true
};
var _d$13$4 = {
  get() {
    const run = this[_m$2$8];
    const props = this[_m$$17];
    return [CommandBarOverlay({ class: "commandbar-overlay search-overlay" }), CommandBarPanel(new _P$8$4(run, props, "commandbar-panel search-panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$9$3(_p18, _p19, _p20) {
  this[_m$$17] = _p18;
  this[_m$2$8] = _p19;
  this.class = _p20;
  Object.defineProperty(this, "isOpen", _d$11$4);
  Object.defineProperty(this, "onChange", _d$12$4);
  Object.defineProperty(this, "children", _d$13$4);
}
_P$9$3.prototype = Object.prototype;
var REPO = "https://github.com/lxsmnsyc/terracotta";
var INSTALL = "pnpm add terracotta@next";
var ACTIONS = [
  {
    key: "action:theme",
    title: "Next theme",
    detail: "Restyle the whole site, demos included",
    kind: "action",
    page: "",
    body: "theme style skin switch change"
  },
  {
    key: "action:scheme",
    title: "Toggle light and dark",
    detail: "Switch the colour scheme",
    kind: "action",
    page: "",
    body: "dark light mode colour color scheme"
  },
  {
    key: "action:install",
    title: "Copy the install command",
    detail: INSTALL,
    kind: "action",
    page: "",
    body: "install npm pnpm yarn add copy"
  },
  {
    key: "action:github",
    title: "Open Terracotta on GitHub",
    detail: "lxsmnsyc/terracotta",
    kind: "action",
    page: "",
    body: "github source repository code"
  }
];
var START_SLUGS = [
  "guides/getting-started",
  "guides/styling",
  "components/dialog",
  "states"
];
function buildResults(pages2) {
  const results = [];
  for (const page of pages2) {
    const href = `/${page.slug}`;
    results.push({
      key: href,
      title: page.title,
      detail: page.description.replace(/<[^>]+>/g, ""),
      kind: page.slug.startsWith("components/") ? "component" : "guide",
      page: href,
      body: `${page.section} ${page.description}`
    });
    for (const heading of page.headings) results.push({
      key: `${href}#${heading.id}`,
      title: heading.text,
      detail: heading.snippet ? `${page.title} \xB7 ${heading.snippet}` : page.title,
      kind: "section",
      page: href,
      body: `${page.title} ${heading.snippet}`
    });
  }
  return results;
}
function termsOf(query2) {
  const terms = [];
  for (const term of query2.toLowerCase().split(/\s+/)) if (term) terms.push(term);
  return terms;
}
function scoreText(text, terms) {
  var _a2;
  const lower = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    const at = lower.indexOf(term);
    if (at === -1) return 0;
    if (at === 0) score += 6;
    else if (/[\s<#(/-]/.test((_a2 = lower[at - 1]) != null ? _a2 : "")) score += 4;
    else score += 2;
  }
  return score;
}
function scoreResult(result, terms) {
  const score = scoreText(result.title, terms) * 3 || scoreText(`${result.title} ${result.body}`, terms);
  if (score === 0) return 0;
  return score + (result.title.toLowerCase() === terms.join(" ") ? 20 : 0) + (result.kind === "section" ? 0 : 1);
}
var PER_GROUP = 6;
var PER_PAGE = 2;
function bestOf(results, terms) {
  var _a2, _b, _c;
  const scored = [];
  for (const result of results) {
    const score = scoreResult(result, terms);
    if (score > 0) scored.push({
      result,
      score
    });
  }
  scored.sort((a, b) => b.score - a.score);
  const items = [];
  const perPage = /* @__PURE__ */ new Map();
  for (const { result } of scored) {
    const count = (_a2 = perPage.get(result.page)) != null ? _a2 : 0;
    if (result.page && count === PER_PAGE) continue;
    perPage.set(result.page, count + 1);
    items.push(result);
    if (items.length === PER_GROUP) break;
  }
  return {
    items,
    top: (_c = (_b = scored[0]) == null ? void 0 : _b.score) != null ? _c : 0
  };
}
var GROUPS = [
  {
    title: "Components",
    kind: "component"
  },
  {
    title: "Guides",
    kind: "guide"
  },
  {
    title: "Sections",
    kind: "section"
  }
];
function groupResults(results, query2) {
  const terms = termsOf(query2);
  if (terms.length === 0) {
    const start = [];
    for (const slug of START_SLUGS) {
      const found = results.find((result) => result.key === `/${slug}`);
      if (found) start.push(found);
    }
    return start.length > 0 ? [{
      title: "Start here",
      items: start
    }, {
      title: "Actions",
      items: ACTIONS
    }] : [{
      title: "Actions",
      items: ACTIONS
    }];
  }
  const ranked = [];
  for (const entry of GROUPS) {
    const ofKind = [];
    for (const result of results) if (result.kind === entry.kind) ofKind.push(result);
    const { items, top } = bestOf(ofKind, terms);
    if (items.length > 0) ranked.push({
      group: {
        title: entry.title,
        items
      },
      top
    });
  }
  ranked.sort((a, b) => b.top - a.top);
  const groups = [];
  for (const entry of ranked) groups.push(entry.group);
  const actions = bestOf(ACTIONS, terms).items;
  if (actions.length > 0) groups.push({
    title: "Actions",
    items: actions
  });
  return groups;
}
var KIND_ICONS = {
  component: ComponentIcon,
  section: HashIcon,
  action: BoltIcon,
  guide: PageIcon
};
function KindIcon(props) {
  return KIND_ICONS[props.kind]({});
}
function createSearch() {
  const [open, setOpen] = createSignal(false);
  const [results, setResults] = createSignal([]);
  let loading;
  function load() {
    loading != null ? loading : loading = import('../_/_virtual_search-index-ZCecVtes.mjs').then((module) => {
      setResults(buildResults(module.pages));
    }, () => {
      loading = void 0;
    });
  }
  return {
    open,
    results,
    load,
    toggle(next) {
      if (next) load();
      setOpen(next);
    }
  };
}
function SearchTrigger(props) {
  const [shortcut, setShortcut] = createSignal("Ctrl K");
  createEffect(() => true, () => {
    if (!isServer && /Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("\u2318K");
  });
  var _v$ = ssrHydrationKey(), _v$2 = escape(SearchIcon({})), _v$3 = scope(() => {
    return escape(shortcut());
  });
  return ssr(_tmpl$$11, _v$, _v$2, _v$3);
}
function SearchPalette(props) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [, setScheme] = useColorScheme();
  const native = useNativeColorScheme();
  function run(result) {
    props.search.toggle(false);
    switch (result.key) {
      case "action:theme": {
        const index = THEMES.findIndex((entry) => entry.id === theme());
        setTheme(THEMES[(index + 1) % THEMES.length].id);
        return;
      }
      case "action:scheme":
        setScheme(native() === "dark" ? "light" : "dark");
        return;
      case "action:install":
        navigator.clipboard.writeText(INSTALL).catch(() => {
        });
        return;
      case "action:github":
        window.open(REPO, "_blank", "noreferrer");
        return;
      default:
        navigate(result.key);
    }
  }
  return CommandBar(new _P$9$3(props, run, "commandbar"));
}
var sections = [
  {
    title: "Guides",
    entries: [
      {
        slug: "guides/getting-started",
        title: "Getting started",
        description: "Terracotta is a headless UI library for SolidJS. Each component gives you behaviour, keyboard handling and ARIA wiring. None of them give you styles. You choose what the markup renders as, and what it looks like."
      },
      {
        slug: "guides/rendering",
        title: "Rendering",
        description: "How Terracotta turns its parts into DOM: which element it renders, which props reach that element, how you get a handle on it, and what happens to hidden content."
      },
      {
        slug: "guides/state",
        title: "State",
        description: "Who owns a component's state, and how you read it back out."
      },
      {
        slug: "guides/styling",
        title: "Styling",
        description: "Terracotta reports state through tc- attributes instead of class names. It never touches your class. The attributes are the whole styling API: CSS attribute selectors are all you need, and your class names stay yours."
      },
      {
        slug: "guides/keyboard-and-focus",
        title: "Keyboard and focus",
        description: "Terracotta ships the keyboard behaviour each WAI-ARIA pattern calls for. Every component page lists its own key bindings. This page covers the parts that work the same way across the library."
      },
      {
        slug: "guides/ssr",
        title: "Server-side rendering",
        description: "Rendering is SSR-safe. The DOM work happens in effects, and effects do not run on the server."
      }
    ]
  },
  {
    title: "Components",
    entries: [
      {
        slug: "components/accordion",
        title: "Accordion",
        description: 'An accordion is a set of stacked headers, each revealing a panel. The Accordion root owns a select state, so "which section is open" is only a selected value. That is why one component covers both the one-open-at-a-time case and the many-open case, through multiple.'
      },
      {
        slug: "components/alert",
        title: "Alert",
        description: "An ARIA alert is a live region for an important, usually time-sensitive message. Assistive technology reads its contents as soon as they appear. Focus does not move."
      },
      {
        slug: "components/alert-dialog",
        title: "AlertDialog",
        description: "An alert dialog is a modal that interrupts. Use it to confirm a consequential action, or to report an error that needs a response."
      },
      {
        slug: "components/breadcrumb",
        title: "Breadcrumb",
        description: "A trail of links to the parent pages of the current page, following the ARIA breadcrumb pattern."
      },
      {
        slug: "components/button",
        title: "Button",
        description: "Gives any element the behaviour of a button: the button role, a sensible tabindex and disabled wiring. When it renders as something other than a real <button>, it also adds <kbd>Enter</kbd> and <kbd>Space</kbd> activation."
      },
      {
        slug: "components/checkbox",
        title: "Checkbox",
        description: "A tri-state checkbox: checked, unchecked, or indeterminate (undefined). The pieces come apart, so you can lay out the indicator, label and description however you like. Terracotta wires them together with the right ids and aria- relationships."
      },
      {
        slug: "components/color-scheme",
        title: "ColorScheme",
        description: "Light / dark / system colour-scheme management. ColorSchemeProvider holds the preference, resolves 'system' against the operating system, and reflects the result as a dark class on the document element."
      },
      {
        slug: "components/combobox",
        title: "Combobox",
        description: "A combobox is a text input that filters a popup listbox as you type. Reach for it when a Listbox has too many options to scroll through."
      },
      {
        slug: "components/command",
        title: "Command",
        description: "A command palette body: a text input above an always-visible, filtered listbox. It is Combobox without the popup. The list is always there, so there is no open/closed state to manage."
      },
      {
        slug: "components/command-bar",
        title: "CommandBar",
        description: "A modal command palette. CommandBar is a dialog that also installs a global <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> shortcut on window to open itself. Mount it once near the root of your app and forget about it."
      },
      {
        slug: "components/context-menu",
        title: "ContextMenu",
        description: "A right-click menu. ContextMenuBoundary marks the region that responds to the contextmenu event. Opening it suppresses the browser's own menu and shows ContextMenuPanel instead. The panel closes on <kbd>Escape</kbd> and on any click outside itself. With a Menu inside, it also closes on <kbd>Tab</kbd> and when an item is activated."
      },
      {
        slug: "components/dialog",
        title: "Dialog",
        description: "A modal dialog. While open, DialogPanel focuses its first focusable element, traps <kbd>Tab</kbd> inside itself, and closes on <kbd>Escape</kbd>. The dialog also remembers which element had focus before it opened, and restores it on close."
      },
      {
        slug: "components/disclosure",
        title: "Disclosure",
        description: 'A disclosure is a button that shows and hides a section of content. It is the simplest of the disclosure-state components: no focus trap, no overlay, no portal. That makes it the right base for FAQs, "show more" sections and collapsible sidebars.'
      },
      {
        slug: "components/feed",
        title: "Feed",
        description: "An ARIA feed is a stream of articles: a timeline, a comment thread, an infinite-scrolling list. Each article is a focus stop, and the user can page between them with the keyboard."
      },
      {
        slug: "components/grid",
        title: "Grid",
        description: "A two-dimensional set of cells, such as a data table the user moves through cell by cell, following the ARIA grid pattern. It is one stop in the tab sequence, and the arrow keys move between cells."
      },
      {
        slug: "components/listbox",
        title: "Listbox",
        description: "A collapsible listbox is the custom equivalent of a <select>: a button that shows the current value, plus a popup list of options."
      },
      {
        slug: "components/menu",
        title: "Menu",
        description: "An ARIA menu is a list of actions. Arrow keys move through it, and typing jumps to an item."
      },
      {
        slug: "components/meter",
        title: "Meter",
        description: "Shows a value within a known range, such as a battery level or the storage in use, following the ARIA meter pattern."
      },
      {
        slug: "components/popover",
        title: "Popover",
        description: "A disclosure-style popover is a button that opens a floating panel. It is not modal, unlike Dialog, so the page behind it stays usable. The panel still traps <kbd>Tab</kbd> while open, closes on <kbd>Escape</kbd>, and closes when focus leaves it."
      },
      {
        slug: "components/radio-group",
        title: "RadioGroup",
        description: "A radio group picks exactly one option from a set. The group is a single tab stop. The arrow keys move between options and select as they go, which is how native radios behave and what the ARIA pattern expects."
      },
      {
        slug: "components/select",
        title: "Select",
        description: "An always-visible listbox: a list of options the user picks from, with arrow-key navigation and type-ahead."
      },
      {
        slug: "components/slider",
        title: "Slider",
        description: 'Picks a number from a range, following the ARIA slider pattern. The thumb carries role="slider" and the value, and takes the keyboard. The track takes the pointer. An array value gives one thumb per value, following the multi-thumb slider pattern.'
      },
      {
        slug: "components/spinbutton",
        title: "Spinbutton",
        description: 'A number field that steps through a range, following the ARIA spinbutton pattern. The field carries role="spinbutton" and the value. It takes typing and the arrow keys, and it is the only part that takes focus.'
      },
      {
        slug: "components/splitter",
        title: "Splitter",
        description: 'Two panes with a movable separator between them, following the ARIA window splitter pattern. The separator carries role="separator" and a value: the size of the primary pane.'
      },
      {
        slug: "components/switch",
        title: "Switch",
        description: 'An on/off control, following the ARIA switch pattern. It is a Button with role="switch", wired to a check state, so it takes every Button prop too.'
      },
      {
        slug: "components/tabs",
        title: "Tabs",
        description: "A tabbed interface is a row of tabs, each revealing a panel. Tabs follow the automatic activation model: the arrow keys move focus and select at the same time, so the visible panel always matches the focused tab."
      },
      {
        slug: "components/toast",
        title: "Toast",
        description: "Toast notifications are short, non-blocking messages. They appear in a corner of the screen and go away again. Terracotta splits this into three pieces:"
      },
      {
        slug: "components/toggle",
        title: "Toggle",
        description: "A button with two states, pressed or not, following the ARIA button (toggle) pattern. It is a Button wired to a toggle state, so it takes every Button prop too."
      },
      {
        slug: "components/toolbar",
        title: "Toolbar",
        description: "A toolbar is a container of related controls that acts as a single tab stop. <kbd>Tab</kbd> enters the toolbar once, and the arrow keys move between the controls inside it."
      },
      {
        slug: "components/tooltip",
        title: "Tooltip",
        description: "A short description of a control, shown while the control is hovered or focused, following the ARIA tooltip pattern."
      },
      {
        slug: "components/transition",
        title: "Transition",
        description: "Class-driven enter and leave transitions. Transition adds and removes CSS classes around a visibility change, waiting for the element's own animations to finish between steps, and keeps it mounted until the leave transition is over. An element can therefore animate out instead of vanishing."
      },
      {
        slug: "components/tree",
        title: "Tree",
        description: "A hierarchical list, such as a file browser, following the ARIA tree view pattern. It is one stop in the tab sequence. The arrow keys move through the nodes on screen, and open and close them."
      },
      {
        slug: "components/treegrid",
        title: "TreeGrid",
        description: "A grid whose rows open and close like a tree, such as an inbox with threaded replies, following the ARIA treegrid pattern. It is one stop in the tab sequence. Both rows and cells take focus."
      }
    ]
  },
  {
    title: "Reference",
    entries: [{
      slug: "states",
      title: "State primitives",
      description: "Every stateful Terracotta component is a thin shell around one of these reactive stores. The stores are exported, so you can read a component's state from anywhere in its subtree, or build your own component on the same behaviour."
    }]
  }
];
var pages = {
  "guides/getting-started": () => import('../_/getting-started-BCNteApQ.mjs'),
  "guides/rendering": () => import('../_/rendering-wrjXihqR.mjs'),
  "guides/state": () => import('../_/state-BfSr76r4.mjs'),
  "guides/styling": () => import('../_/styling-Dl0XDS0r.mjs'),
  "guides/keyboard-and-focus": () => import('../_/keyboard-and-focus-CU3WWZB5.mjs'),
  "guides/ssr": () => import('../_/ssr-BJmVXGtZ.mjs'),
  "components/accordion": () => import('../_/accordion-D5AWVjBu.mjs'),
  "components/alert": () => import('../_/alert-CLq1_9tV.mjs'),
  "components/alert-dialog": () => import('../_/alert-dialog-D6-AxGan.mjs'),
  "components/breadcrumb": () => import('../_/breadcrumb-CJwn3eo4.mjs'),
  "components/button": () => import('../_/button-WU99ouvP.mjs'),
  "components/checkbox": () => import('../_/checkbox-SjcAF9mn.mjs'),
  "components/color-scheme": () => import('../_/color-scheme-Bmalhbto.mjs'),
  "components/combobox": () => import('../_/combobox-BmNpG58j.mjs'),
  "components/command": () => import('../_/command-rf2rXcUp.mjs'),
  "components/command-bar": () => import('../_/command-bar-BzOFXKVU.mjs'),
  "components/context-menu": () => import('../_/context-menu-Q9Po9V-Z.mjs'),
  "components/dialog": () => import('../_/dialog-BH2zAExy.mjs'),
  "components/disclosure": () => import('../_/disclosure-SyGLUBOl.mjs'),
  "components/feed": () => import('../_/feed-BabwXx7V.mjs'),
  "components/grid": () => import('../_/grid-DOTylY_e.mjs'),
  "components/listbox": () => import('../_/listbox-BKmCl6eI.mjs'),
  "components/menu": () => import('../_/menu-BrAEtzCo.mjs'),
  "components/meter": () => import('../_/meter-vrjutBmx.mjs'),
  "components/popover": () => import('../_/popover-CwMpm1of.mjs'),
  "components/radio-group": () => import('../_/radio-group-BxwPq5rC.mjs'),
  "components/select": () => import('../_/select-iJRHGSNq.mjs'),
  "components/slider": () => import('../_/slider-BTnHPcsh.mjs'),
  "components/spinbutton": () => import('../_/spinbutton-1DY1zkat.mjs'),
  "components/splitter": () => import('../_/splitter-DF4wQJyQ.mjs'),
  "components/switch": () => import('../_/switch-DGWa-r_w.mjs'),
  "components/tabs": () => import('../_/tabs-x198GIIj.mjs'),
  "components/toast": () => import('../_/toast-DQyiS3V-.mjs'),
  "components/toggle": () => import('../_/toggle-CSxSK_dz.mjs'),
  "components/toolbar": () => import('../_/toolbar-DoGG4_RN.mjs'),
  "components/tooltip": () => import('../_/tooltip-BUYZoVWB.mjs'),
  "components/transition": () => import('../_/transition-DN7USLzk.mjs'),
  "components/tree": () => import('../_/tree-Bh6ADzM9.mjs'),
  "components/treegrid": () => import('../_/treegrid-CcxsIaah.mjs'),
  "states": () => import('../_/states-Cm56_EwQ.mjs')
};
var _tmpl$$10 = [
  "<nav",
  ' class="sidebar-nav" aria-label="Documentation">',
  "</nav>"
];
var _tmpl$2$7 = [
  "<section",
  ' class="sidebar-section"><h2 class="sidebar-section-title">',
  '</h2><ul class="sidebar-list">',
  "</ul></section>"
];
var _tmpl$3$5 = [
  "<li",
  '><a class="sidebar-link"',
  "",
  "",
  ">",
  "</a></li>"
];
var _m$$16 = /* @__PURE__ */ Symbol();
var _d$$17 = {
  get() {
    return this[_m$$16].entries;
  },
  enumerable: true,
  configurable: true
};
function _P$$17(_p, _p2) {
  this[_m$$16] = _p;
  Object.defineProperty(this, "each", _d$$17);
  this.children = _p2;
}
_P$$17.prototype = Object.prototype;
function Sidebar() {
  const location2 = useLocation();
  var _v$ = ssrHydrationKey(), _v$2 = escape(For({
    each: sections,
    children: (section) => {
      var _v$3, _v$4, _v$5;
      return _v$3 = ssrHydrationKey(), _v$4 = scope(() => {
        return escape(section.title);
      }), _v$5 = escape(For(new _P$$17(section, (entry) => {
        var _lv$, _lv$2;
        const href = `/${entry.slug}`;
        var _v$6 = ssrHydrationKey(), _g$ = ssrGroup(() => {
          return [ssrAttribute("aria-current", escape(_lv$2 = location2.pathname === href ? "page" : void 0, true)), ssrLinkClaim({
            href: _lv$,
            "aria-current": _lv$2
          })];
        }, 2), _v$9 = scope(() => {
          return escape(entry.title);
        });
        return ssr(_tmpl$3$5, _v$6, ssrAttribute("href", escape(_lv$ = href, true)), _g$, _g$, _v$9);
      }))), ssr(_tmpl$2$7, _v$3, _v$4, _v$5);
    }
  }));
  return ssr(_tmpl$$10, _v$, _v$2);
}
var _tmpl$$9 = [
  "<span",
  "",
  ' aria-hidden="true"></span>'
];
var _m$$15 = /* @__PURE__ */ Symbol();
var _d$$16 = {
  get() {
    return this[_m$$15].name;
  },
  enumerable: true,
  configurable: true
};
function _P$$16(_p, _p2) {
  this[_m$$15] = _p;
  this.class = _p2;
  Object.defineProperty(this, "children", _d$$16);
}
_P$$16.prototype = Object.prototype;
var _d$2$15 = {
  get() {
    return this[_m$$15].id;
  },
  enumerable: true,
  configurable: true
};
var _d$3$12 = {
  get() {
    return this[_m$$15].id;
  },
  enumerable: true,
  configurable: true
};
var _d$4$10 = {
  get() {
    const entry = this[_m$$15];
    return `${entry.name}: ${entry.blurb}`;
  },
  enumerable: true,
  configurable: true
};
var _d$5$6 = {
  get() {
    const entry = this[_m$$15];
    var _v$, _v$3;
    return [RadioGroupLabel(new _P$$16(entry, "visually-hidden")), (_v$ = ssrHydrationKey(), _v$3 = () => {
      return ((_v$2) => _v$2 == null ? "" : ssrAttribute("class", ssrClassName(_v$2)))(`theme-swatch-chip theme-swatch-${entry.id}`);
    }, ssr(_tmpl$$9, _v$, _v$3))];
  },
  enumerable: true,
  configurable: true
};
function _P$2$13(_p3, _p4) {
  this[_m$$15] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "value", _d$2$15);
  Object.defineProperty(this, "data-theme-id", _d$3$12);
  Object.defineProperty(this, "title", _d$4$10);
  Object.defineProperty(this, "children", _d$5$6);
}
_P$2$13.prototype = Object.prototype;
var _d$6$6 = {
  get() {
    const checked = this[_m$$15];
    return checked();
  },
  enumerable: true,
  configurable: true
};
var _d$7$5 = {
  get() {
    return [RadioGroupLabel({
      class: "visually-hidden",
      children: "Theme"
    }), For({
      each: THEMES,
      children: (entry) => {
        return RadioGroupOption(new _P$2$13(entry, "theme-swatch"));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$3$10(_p5, _p6, _p7) {
  this[_m$$15] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "value", _d$6$6);
  this.onChange = _p7;
  Object.defineProperty(this, "children", _d$7$5);
}
_P$3$10.prototype = Object.prototype;
function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = createSignal(DEFAULT_THEME);
  createEffect(() => theme(), (value) => {
    setChecked(value);
  });
  return RadioGroup(new _P$3$10(checked, "theme-picker", (value) => {
    if (value) setTheme(value);
  }));
}
var _tmpl$$8 = [
  "<span",
  ' class="mobile-nav-chevron" aria-hidden="true">',
  "</span>"
];
var _tmpl$2$6 = [
  "<div",
  ' class="layout"><aside class="sidebar">',
  '</aside><main class="content">',
  "</main></div>"
];
var _tmpl$3$4 = [
  "<div",
  ' class="shell"><header class="masthead"><a class="brand" href="/"',
  '><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">Terracotta</span></a><nav class="masthead-nav" aria-label="Site"><a class="masthead-nav-link" href="/guides/getting-started"',
  '>Docs</a><a class="masthead-nav-link" href="/components/accordion"',
  '>Components</a></nav><div class="masthead-actions"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--><!--$-->",
  '<!--/--><a class="control masthead-link" href="https://github.com/lxsmnsyc/terracotta" rel="noreferrer"',
  ">GitHub</a></div></header><!--$-->",
  "<!--/--><!--$-->",
  "<!--/--></div>"
];
var _tmpl$4$3 = [
  "<main",
  ' class="landing-main">',
  "</main>"
];
var _lk$$2 = { href: "/" };
var _lk$2$1 = { href: "/guides/getting-started" };
var _lk$3$1 = { href: "/components/accordion" };
var _lk$4$1 = {
  href: "https://github.com/lxsmnsyc/terracotta",
  rel: "noreferrer"
};
var _m$$14 = /* @__PURE__ */ Symbol();
var _m$2$7 = /* @__PURE__ */ Symbol();
var _d$$15 = {
  get() {
    var _v$5, _v$6;
    return ["Menu", (_v$5 = ssrHydrationKey(), _v$6 = escape(ChevronRightIcon({})), ssr(_tmpl$$8, _v$5, _v$6))];
  },
  enumerable: true,
  configurable: true
};
function _P$$15(_p) {
  this.class = _p;
  Object.defineProperty(this, "children", _d$$15);
}
_P$$15.prototype = Object.prototype;
var _d$2$14 = {
  get() {
    return Sidebar();
  },
  enumerable: true,
  configurable: true
};
function _P$2$12(_p2) {
  this.class = _p2;
  Object.defineProperty(this, "children", _d$2$14);
}
_P$2$12.prototype = Object.prototype;
var _d$3$11 = {
  get() {
    return [DisclosureButton(new _P$$15("control mobile-nav-button")), DisclosurePanel(new _P$2$12("mobile-nav-panel panel"))];
  },
  enumerable: true,
  configurable: true
};
function _P$3$9(_p3, _p4) {
  this.class = _p3;
  this.defaultOpen = _p4;
  Object.defineProperty(this, "children", _d$3$11);
}
_P$3$9.prototype = Object.prototype;
var _d$4$9 = {
  get() {
    const docs = this[_m$$14];
    return docs();
  },
  enumerable: true,
  configurable: true
};
var _d$5$5 = {
  get() {
    const props = this[_m$2$7];
    var _v$12 = ssrHydrationKey(), _v$13 = scope(() => {
      return escape(props.children);
    });
    return ssr(_tmpl$4$3, _v$12, _v$13);
  },
  enumerable: true,
  configurable: true
};
var _d$6$5 = {
  get() {
    const props = this[_m$2$7];
    var _v$7, _v$8, _v$9;
    return [Disclosure(new _P$3$9("mobile-nav", false)), (_v$7 = ssrHydrationKey(), _v$8 = escape(Sidebar()), _v$9 = scope(() => {
      return escape(props.children);
    }), ssr(_tmpl$2$6, _v$7, _v$8, _v$9))];
  },
  enumerable: true,
  configurable: true
};
function _P$4$4(_p5, _p6) {
  this[_m$$14] = _p5;
  this[_m$2$7] = _p6;
  Object.defineProperty(this, "when", _d$4$9);
  Object.defineProperty(this, "fallback", _d$5$5);
  Object.defineProperty(this, "children", _d$6$5);
}
_P$4$4.prototype = Object.prototype;
function DocsLayout(props) {
  const location2 = useLocation();
  const docs = () => location2.pathname !== "/";
  const search = createSearch();
  var _v$ = ssrHydrationKey(), _v$2 = escape(SearchTrigger()), _v$3 = escape(ThemePicker()), _v$4 = escape(SchemePicker()), _v$10 = escape(Show(new _P$4$4(docs, props))), _v$11 = escape(SearchPalette({ search }));
  return ssr(_tmpl$3$4, _v$, ssrLinkClaim(_lk$$2), ssrLinkClaim(_lk$2$1), ssrLinkClaim(_lk$3$1), _v$2, _v$3, _v$4, ssrLinkClaim(_lk$4$1), _v$10, _v$11);
}
var demos = {
  "accordion/basic": () => import('../_/basic-DaUptIAk.mjs'),
  "accordion/disabled": () => import('../_/disabled-CzrAPT5E.mjs'),
  "accordion/multiple": () => import('../_/multiple-BT03f_tV.mjs'),
  "alert-dialog/destructive": () => import('../_/destructive-BtNekrHe.mjs'),
  "alert/form-error": () => import('../_/form-error-XhuiFGxh.mjs'),
  "alert/severity": () => import('../_/severity-DIkowaIj.mjs'),
  "breadcrumb/basic": () => import('../_/basic-B1XKY8KG.mjs'),
  "button/as-other-elements": () => import('../_/as-other-elements-Buor-k0K.mjs'),
  "button/basic": () => import('../_/basic-e5RYYEud.mjs'),
  "button/disabled": () => import('../_/disabled-DuD34J7C.mjs'),
  "checkbox/basic": () => import('../_/basic-DJYKbqrK.mjs'),
  "checkbox/indeterminate": () => import('../_/indeterminate-BGVxoBEn.mjs'),
  "checkbox/switch": () => import('../_/switch-01m0paA4.mjs'),
  "color-scheme/basic": () => import('../_/basic-B5Anp9qw.mjs'),
  "color-scheme/controlled": () => import('../_/controlled-DsQVG8ag.mjs'),
  "combobox/basic": () => import('../_/basic-DHuGtoLz.mjs'),
  "command-bar/basic": () => import('../_/basic-CVFbOF2F.mjs'),
  "command/palette": () => import('../_/palette-M1SKOKbY.mjs'),
  "context-menu/basic": () => import('../_/basic-Bll7fML7.mjs'),
  "dialog/basic": () => import('../_/basic-Ch04BY98.mjs'),
  "dialog/drawer": () => import('../_/drawer-DAurDJJo.mjs'),
  "disclosure/basic": () => import('../_/basic-BF3PUaQR.mjs'),
  "disclosure/close-from-panel": () => import('../_/close-from-panel-D8r-9skw.mjs'),
  "disclosure/controlled": () => import('../_/controlled-C4M0tpCT.mjs'),
  "disclosure/disabled": () => import('../_/disabled-VlyrFzac.mjs'),
  "disclosure/render-prop": () => import('../_/render-prop-BAdXcFMr.mjs'),
  "feed/timeline": () => import('../_/timeline-CYrwzMuB.mjs'),
  "grid/basic": () => import('../_/basic-DCNY-YUE.mjs'),
  "landing/specimen": () => import('../_/specimen-BeBCiogN.mjs'),
  "listbox/basic": () => import('../_/basic-CquRQvwp.mjs'),
  "listbox/multiple": () => import('../_/multiple-BMaSxqRk.mjs'),
  "menu/as-dropdown": () => import('../_/as-dropdown-eXQtZ4yT.mjs'),
  "menu/basic": () => import('../_/basic-BFpBMcMK.mjs'),
  "meter/basic": () => import('../_/basic-Bwy6gf_-.mjs'),
  "popover/basic": () => import('../_/basic-BL9AWBZU.mjs'),
  "popover/close-from-inside": () => import('../_/close-from-inside-C_nMBXim.mjs'),
  "radio-group/cards": () => import('../_/cards-BqpDH--l.mjs'),
  "radio-group/dots": () => import('../_/dots-CK2qvMRb.mjs'),
  "select/basic": () => import('../_/basic-up3glCX4.mjs'),
  "select/multiple": () => import('../_/multiple-MhOu__lm.mjs'),
  "slider/basic": () => import('../_/basic-Bt_j7_rs.mjs'),
  "slider/range": () => import('../_/range-B6FMMQJz.mjs'),
  "spinbutton/basic": () => import('../_/basic-lAM7h9Bp.mjs'),
  "splitter/basic": () => import('../_/basic-DwLvk47-.mjs'),
  "switch/basic": () => import('../_/basic-lE2Dncuk.mjs'),
  "switch/controlled": () => import('../_/controlled-pSMYuk5V.mjs'),
  "tabs/controlled": () => import('../_/controlled-BRGaIOFY.mjs'),
  "tabs/horizontal": () => import('../_/horizontal-BBCsCXJa.mjs'),
  "tabs/vertical": () => import('../_/vertical-C_AZXh-b.mjs'),
  "toast/basic": () => import('../_/basic-B_KTZbmV.mjs'),
  "toggle/basic": () => import('../_/basic-Dp92K9_I.mjs'),
  "toggle/controlled": () => import('../_/controlled-CPyrMGPH.mjs'),
  "toggle/switch": () => import('../_/switch-osV7tN8_.mjs'),
  "toolbar/basic": () => import('../_/basic-B-ySdH-8.mjs'),
  "toolbar/with-terracotta-controls": () => import('../_/with-terracotta-controls-DcxN21eh.mjs'),
  "tooltip/basic": () => import('../_/basic-lIGaXfA2.mjs'),
  "transition/coordinated": () => import('../_/coordinated-Bx1AZSP5.mjs'),
  "transition/fade": () => import('../_/fade-B1Nyue6V.mjs'),
  "tree/basic": () => import('../_/basic-D6V5QgVF.mjs'),
  "treegrid/basic": () => import('../_/basic-CryP-7cV.mjs')
};
var DEMO_CHANNEL = "terracotta-docs";
function isDemoMessage(data) {
  return typeof data === "object" && data !== null && data.channel === "terracotta-docs";
}
function demoUrl(id, theme, scheme) {
  return `/demo/${id}?theme=${encodeURIComponent(theme)}&scheme=${scheme}`;
}
var _tmpl$$7 = [
  "<div",
  ' class="demo-stage">',
  "</div>"
];
var _tmpl$2$5 = ["<div", ' class="demo-stage-loading">Loading demo&#8230;</div>'];
var _tmpl$3$3 = [
  "<p",
  ' class="demo-stage-missing">No demo registered as &#8220;<!--$-->',
  "<!--/-->&#8221;.</p>"
];
var _m$$13 = /* @__PURE__ */ Symbol();
var _m$2$6 = /* @__PURE__ */ Symbol();
var _d$$14 = {
  get() {
    const demo = this[_m$$13];
    return demo();
  },
  enumerable: true,
  configurable: true
};
var _d$2$13 = {
  get() {
    const params = this[_m$2$6];
    var _v$4 = ssrHydrationKey(), _v$5 = scope(() => {
      return escape(params.id);
    });
    return ssr(_tmpl$3$3, _v$4, _v$5);
  },
  enumerable: true,
  configurable: true
};
function _P$$14(_p, _p2, _p3) {
  this[_m$$13] = _p;
  this[_m$2$6] = _p2;
  Object.defineProperty(this, "when", _d$$14);
  Object.defineProperty(this, "fallback", _d$2$13);
  this.children = _p3;
}
_P$$14.prototype = Object.prototype;
var _d$3$10 = {
  get() {
    var _v$3 = ssrHydrationKey();
    return ssr(_tmpl$2$5, _v$3);
  },
  enumerable: true,
  configurable: true
};
var _d$4$8 = {
  get() {
    const demo = this[_m$$13];
    const params = this[_m$2$6];
    return Show(new _P$$14(demo, params, (component) => {
      return dynamic(component)({});
    }));
  },
  enumerable: true,
  configurable: true
};
function _P$2$11(_p4, _p5) {
  this[_m$$13] = _p4;
  this[_m$2$6] = _p5;
  Object.defineProperty(this, "fallback", _d$3$10);
  Object.defineProperty(this, "children", _d$4$8);
}
_P$2$11.prototype = Object.prototype;
var resolved = /* @__PURE__ */ new Map();
function componentFor(id) {
  const cached = resolved.get(id);
  if (cached) return cached;
  const loader = demos[id];
  if (!loader) return;
  const component = lazy(loader);
  resolved.set(id, component);
  return component;
}
function DemoHost() {
  const params = useParams();
  const demo = createMemo(() => componentFor(params.id));
  const [stage, setStage] = createSignal();
  if (!isServer) {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (!isDemoMessage(event.data) || event.data.kind !== "appearance") return;
      const { theme, scheme, animate } = event.data;
      const root = document.documentElement;
      const apply = () => {
        if (isTheme(theme)) root.dataset.theme = theme;
        root.classList.toggle("dark", scheme === "dark");
      };
      const unchanged = root.dataset.theme === theme && root.classList.contains("dark") === (scheme === "dark");
      if (!animate || unchanged || !("startViewTransition" in document) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        apply();
        return;
      }
      root.classList.add("demo-wipe");
      const done = () => {
        root.classList.remove("demo-wipe");
      };
      const transition = document.startViewTransition(apply);
      transition.ready.catch(() => void 0);
      transition.finished.then(done, done);
    };
    window.addEventListener("message", onMessage);
    onCleanup(() => {
      window.removeEventListener("message", onMessage);
    });
  }
  createEffect(() => stage(), (element) => {
    if (isServer || !element || window.parent === window) return;
    const report = () => {
      window.parent.postMessage({
        channel: DEMO_CHANNEL,
        kind: "height",
        height: Math.max(element.scrollHeight, document.body.scrollHeight)
      }, window.location.origin);
    };
    const observer = new ResizeObserver(report);
    observer.observe(element);
    observer.observe(document.documentElement);
    report();
    onCleanup(() => {
      observer.disconnect();
    });
  });
  var _v$ = ssrHydrationKey(), _v$2 = escape(Loading(new _P$2$11(demo, params)));
  return ssr(_tmpl$$7, _v$, _v$2);
}
var _m$$12 = /* @__PURE__ */ Symbol();
var _m$2$5 = /* @__PURE__ */ Symbol();
var _m$3$1 = /* @__PURE__ */ Symbol();
var _m$4$1 = /* @__PURE__ */ Symbol();
var _m$5$1 = /* @__PURE__ */ Symbol();
var _m$6$1 = /* @__PURE__ */ Symbol();
var _m$7$1 = /* @__PURE__ */ Symbol();
var _m$8$1 = /* @__PURE__ */ Symbol();
var _d$$13 = {
  get() {
    return this[_m$$12].as || "div";
  },
  enumerable: true,
  configurable: true
};
var _d$2$12 = {
  get() {
    const rootContext = this[_m$2$5];
    const props = this[_m$$12];
    return rootContext.getId("tab", props.value);
  },
  enumerable: true,
  configurable: true
};
var _d$3$9 = {
  get() {
    const rootContext = this[_m$2$5];
    const props = this[_m$$12];
    return memo(() => {
      return !!rootContext.hasPanel(props.value);
    })() ? rootContext.getId("tab-panel", props.value) : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$4$7 = {
  get() {
    const state = this[_m$3$1];
    const listContext = this[_m$4$1];
    const internalRef = this[_m$5$1];
    return !state.disabled() && (state.isSelected() || listContext.getFallbackTab() === internalRef()) ? 0 : -1;
  },
  enumerable: true,
  configurable: true
};
function _P$$13(_p, _p2, _p3, _p4, _p5, _p6, _p7) {
  this[_m$$12] = _p;
  this[_m$2$5] = _p2;
  this[_m$3$1] = _p3;
  this[_m$4$1] = _p4;
  this[_m$5$1] = _p5;
  Object.defineProperty(this, "as", _d$$13);
  this.role = _p6;
  this.ref = _p7;
  Object.defineProperty(this, "id", _d$2$12);
  Object.defineProperty(this, "aria-controls", _d$3$9);
  Object.defineProperty(this, "tabindex", _d$4$7);
}
_P$$13.prototype = Object.prototype;
var _d$5$4 = {
  get() {
    return this[_m$$12].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2$10(_p8, _p9) {
  this[_m$$12] = _p8;
  this.state = _p9;
  Object.defineProperty(this, "children", _d$5$4);
}
_P$2$10.prototype = Object.prototype;
var _d$6$4 = {
  get() {
    const props = this[_m$$12];
    const state = this[_m$2$5];
    return SelectOptionStateProvider(new _P$2$10(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3$8(_p0, _p1) {
  this[_m$$12] = _p0;
  this[_m$2$5] = _p1;
  Object.defineProperty(this, "children", _d$6$4);
}
_P$3$8.prototype = Object.prototype;
var _d$7$4 = {
  get() {
    return this[_m$$12].children;
  },
  enumerable: true,
  configurable: true
};
function _P$4$3(_p10, _p11) {
  this[_m$$12] = _p10;
  this.state = _p11;
  Object.defineProperty(this, "children", _d$7$4);
}
_P$4$3.prototype = Object.prototype;
var _d$8$3 = {
  get() {
    const props = this[_m$$12];
    const state = this[_m$2$5];
    return SelectStateProvider(new _P$4$3(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$5$3(_p12, _p13) {
  this[_m$$12] = _p12;
  this[_m$2$5] = _p13;
  Object.defineProperty(this, "children", _d$8$3);
}
_P$5$3.prototype = Object.prototype;
var _d$9$3 = {
  get() {
    const Root2 = this[_m$$12];
    const disabledState = this[_m$2$5];
    const hasSelectedState = this[_m$3$1];
    const hasActiveState = this[_m$4$1];
    const setInternalRef = this[_m$5$1];
    const rest = this[_m$6$1];
    const props = this[_m$7$1];
    const state = this[_m$8$1];
    return Root2(mergeProps(TAB_GROUP_TAG, disabledState, hasSelectedState, hasActiveState, { ref: setInternalRef }, rest, new _P$5$3(props, state)));
  },
  enumerable: true,
  configurable: true
};
function _P$6$3(_p14, _p15, _p16, _p17, _p18, _p19, _p20, _p21, _p22) {
  this[_m$$12] = _p14;
  this[_m$2$5] = _p15;
  this[_m$3$1] = _p16;
  this[_m$4$1] = _p17;
  this[_m$5$1] = _p18;
  this[_m$6$1] = _p19;
  this[_m$7$1] = _p20;
  this[_m$8$1] = _p21;
  this.value = _p22;
  Object.defineProperty(this, "children", _d$9$3);
}
_P$6$3.prototype = Object.prototype;
var _d$10$3 = {
  get() {
    return this[_m$$12].isHorizontal() ? "horizontal" : "vertical";
  },
  enumerable: true,
  configurable: true
};
function _P$7$3(_p23, _p24, _p25) {
  this[_m$$12] = _p23;
  this.role = _p24;
  Object.defineProperty(this, "aria-orientation", _d$10$3);
  this.ref = _p25;
}
_P$7$3.prototype = Object.prototype;
var _d$11$3 = {
  get() {
    return this[_m$$12].children;
  },
  enumerable: true,
  configurable: true
};
function _P$8$3(_p26) {
  this[_m$$12] = _p26;
  Object.defineProperty(this, "children", _d$11$3);
}
_P$8$3.prototype = Object.prototype;
var _d$12$3 = {
  get() {
    const props = this[_m$$12];
    return SelectStateChild(new _P$8$3(props));
  },
  enumerable: true,
  configurable: true
};
function _P$9$2(_p27) {
  this[_m$$12] = _p27;
  Object.defineProperty(this, "children", _d$12$3);
}
_P$9$2.prototype = Object.prototype;
var _d$13$3 = {
  get() {
    const Root2 = this[_m$$12];
    const rootContext = this[_m$2$5];
    const setRef = this[_m$3$1];
    const hasSelectedState = this[_m$4$1];
    const hasActiveState = this[_m$5$1];
    const rest = this[_m$6$1];
    const props = this[_m$7$1];
    return Root2(mergeProps(TAB_LIST_TAG, new _P$7$3(rootContext, "tablist", setRef), hasSelectedState, hasActiveState, rest, new _P$9$2(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$10$1(_p28, _p29, _p30, _p31, _p32, _p33, _p34, _p35) {
  this[_m$$12] = _p28;
  this[_m$2$5] = _p29;
  this[_m$3$1] = _p30;
  this[_m$4$1] = _p31;
  this[_m$5$1] = _p32;
  this[_m$6$1] = _p33;
  this[_m$7$1] = _p34;
  this.value = _p35;
  Object.defineProperty(this, "children", _d$13$3);
}
_P$10$1.prototype = Object.prototype;
var _d$14$3 = {
  get() {
    return this[_m$$12].children;
  },
  enumerable: true,
  configurable: true
};
function _P$11$1(_p36, _p37) {
  this[_m$$12] = _p36;
  this.state = _p37;
  Object.defineProperty(this, "children", _d$14$3);
}
_P$11$1.prototype = Object.prototype;
var _d$15$2 = {
  get() {
    return this[_m$$12].isSelected() ? 0 : -1;
  },
  enumerable: true,
  configurable: true
};
var _d$16$1 = {
  get() {
    const rootContext = this[_m$2$5];
    const props = this[_m$3$1];
    return rootContext.getId("tab-panel", props.value);
  },
  enumerable: true,
  configurable: true
};
var _d$17$1 = {
  get() {
    const rootContext = this[_m$2$5];
    const props = this[_m$3$1];
    return rootContext.getId("tab", props.value);
  },
  enumerable: true,
  configurable: true
};
var _d$18$1 = {
  get() {
    const props = this[_m$3$1];
    const state = this[_m$$12];
    return SelectOptionStateProvider(new _P$11$1(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$12$1(_p38, _p39, _p40, _p41) {
  this[_m$$12] = _p38;
  this[_m$2$5] = _p39;
  this[_m$3$1] = _p40;
  this.role = _p41;
  Object.defineProperty(this, "tabindex", _d$15$2);
  Object.defineProperty(this, "id", _d$16$1);
  Object.defineProperty(this, "aria-labelledby", _d$17$1);
  Object.defineProperty(this, "children", _d$18$1);
}
_P$12$1.prototype = Object.prototype;
var _d$19$1 = {
  get() {
    return this[_m$$12].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$20$1 = {
  get() {
    return this[_m$2$5].isSelected();
  },
  enumerable: true,
  configurable: true
};
var _d$21 = {
  get() {
    const Root2 = this[_m$3$1];
    const state = this[_m$2$5];
    const rootContext = this[_m$4$1];
    const props = this[_m$$12];
    const selectedState = this[_m$5$1];
    const activeState = this[_m$6$1];
    const rest = this[_m$7$1];
    return Root2(mergeProps(TAB_PANEL_TAG, new _P$12$1(state, rootContext, props, "tabpanel"), selectedState, activeState, rest));
  },
  enumerable: true,
  configurable: true
};
function _P$13$1(_p42, _p43, _p44, _p45, _p46, _p47, _p48) {
  this[_m$$12] = _p42;
  this[_m$2$5] = _p43;
  this[_m$3$1] = _p44;
  this[_m$4$1] = _p45;
  this[_m$5$1] = _p46;
  this[_m$6$1] = _p47;
  this[_m$7$1] = _p48;
  Object.defineProperty(this, "unmount", _d$19$1);
  Object.defineProperty(this, "when", _d$20$1);
  Object.defineProperty(this, "children", _d$21);
}
_P$13$1.prototype = Object.prototype;
var TabGroupContext = createContext(null);
function useTabGroupContext(componentName) {
  const context = useContext(TabGroupContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <TabGroup>`));
  return context;
}
var TabListContext = createContext(null);
function useTabListContext(componentName) {
  const context = useContext(TabListContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <TabList>`));
  return context;
}
function createTabFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}
var TAB_GROUP_TAG = createTag("tab-group");
var TAB_LIST_TAG = createTag("tab-list");
var TAB_TAG = createTag("tab");
var TAB_PANEL_TAG = createTag("tab-panel");
function Tab(props) {
  const rootContext = useTabGroupContext("Tab");
  const listContext = useTabListContext("Tab");
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);
  let selectedBeforePointer;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(useEventListener(current, "pointerdown", () => {
      selectedBeforePointer = state.isSelected();
    }), useEventListener(current, "click", () => {
      const selectedByFocus = selectedBeforePointer === false && state.isSelected();
      selectedBeforePointer = void 0;
      if (!selectedByFocus) state.select();
    }), useEventListener(current, "focus", () => {
      state.focus();
      if (!state.isSelected()) state.select();
    }), useEventListener(current, "blur", () => {
      state.blur();
    }));
  });
  listContext.registerTab({
    ref: internalRef,
    isSelected: () => state.isSelected(),
    disabled: () => state.disabled()
  });
  const ownerAttribute = createOwnerAttribute(listContext.navigator.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(props, "as", "children", "value", "disabled", "ref");
  return Button(mergeProps(TAB_TAG, ownerAttribute, new _P$$13(props, rootContext, state, listContext, internalRef, "tab", setInternalRef), disabledState, ariaDisabledState, selectedState, ariaSelectedState, activeState, rest, new _P$3$8(props, state)));
}
function isTabGroupUncontrolled(props) {
  return "defaultValue" in props;
}
function TabGroup(props) {
  return createMemo(() => {
    const ownerID = createUniqueId();
    const state = createSingleSelectState(props);
    const [, setInternalRef] = createForwardRef(props);
    const ids = /* @__PURE__ */ new Map();
    const [panels, setPanels] = createSignal([]);
    const disabledState = createDisabledState(() => state.disabled());
    const hasSelectedState = createHasSelectedState(() => state.hasSelected());
    const hasActiveState = createHasActiveState(() => state.hasActive());
    const rest = isTabGroupUncontrolled(props) ? omit(props, "as", "children", "defaultValue", "disabled", "onChange", "by", "ref", "toggleable", "horizontal") : omit(props, "as", "children", "value", "disabled", "onChange", "by", "ref", "toggleable", "horizontal");
    return TabGroupContext(new _P$6$3(dynamic(() => props.as || "div"), disabledState, hasSelectedState, hasActiveState, setInternalRef, rest, props, state, {
      isHorizontal() {
        return props.horizontal;
      },
      getId(kind, value) {
        let currentID = ids.get(value);
        if (currentID == null) {
          currentID = ids.size;
          ids.set(value, currentID);
        }
        return `${ownerID}__${kind}-${currentID}`;
      },
      hasPanel(value) {
        return panels().some((panel) => isEqual(panel.value, value) && panel.present());
      },
      registerPanel(value, present) {
        const panel = {
          value,
          present
        };
        onSettled(() => {
          setPanels((list) => [...list, panel]);
          return () => {
            setPanels((list) => list.filter((item) => item !== panel));
          };
        });
      }
    }));
  });
}
function TabList(props) {
  const rootContext = useTabGroupContext("TabList");
  const controller = createTabFocusNavigator();
  const state = useSelectState();
  const [ref, setRef] = createForwardRef(props);
  const [tabs, setTabs] = createSignal([]);
  const fallbackTab = createMemo(() => {
    const list = tabs();
    if (list.some((tab) => tab.isSelected() && !tab.disabled())) return;
    let first;
    for (const tab of list) {
      const element = tab.ref();
      if (!tab.disabled() && element instanceof Element && (!first || first.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING)) first = element;
    }
    return first;
  });
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      return mergeFunc(() => {
        controller.clearRef();
      }, useEventListener(current, "keydown", (e) => {
        if (!state.disabled()) switch (e.key) {
          case "ArrowUp":
            if (!rootContext.isHorizontal()) {
              e.preventDefault();
              controller.setPrevChecked(true);
            }
            break;
          case "ArrowLeft":
            if (rootContext.isHorizontal()) {
              e.preventDefault();
              controller.setPrevChecked(true);
            }
            break;
          case "ArrowDown":
            if (!rootContext.isHorizontal()) {
              e.preventDefault();
              controller.setNextChecked(true);
            }
            break;
          case "ArrowRight":
            if (rootContext.isHorizontal()) {
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
        }
      }), useEventListener(current, "focusin", (e) => {
        if (e.target && e.target !== current) controller.setCurrent(e.target);
      }));
    }
  });
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const rest = omit(props, "as", "ref", "children");
  return TabListContext(new _P$10$1(dynamic(() => props.as || "div"), rootContext, setRef, hasSelectedState, hasActiveState, rest, props, {
    navigator: controller,
    registerTab(tab) {
      onSettled(() => {
        setTabs((list) => [...list, tab]);
        return () => {
          setTabs((list) => list.filter((item) => item !== tab));
        };
      });
    },
    getFallbackTab: fallbackTab
  }));
}
function TabPanel(props) {
  const rootContext = useTabGroupContext("TabPanel");
  const state = createSelectOptionState(props);
  rootContext.registerPanel(props.value, () => props.unmount === false || state.isSelected());
  const selectedState = createSelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(props, "as", "disabled", "unmount", "value");
  return Unmountable(new _P$13$1(props, state, dynamic(() => props.as || "div"), rootContext, selectedState, activeState, rest));
}
var _tmpl$$6 = [
  "<div",
  ' class="demo-toolbar"><!--$-->',
  '<!--/--><div class="demo-tools"><button type="button" class="demo-tool" title="Reset the demo to its initial state">Reset</button><a class="demo-tool"',
  ' target="_blank" rel="noreferrer" title="Open this demo in its own tab">Open &#8599;</a></div></div>'
];
var _tmpl$2$4 = [
  "<iframe",
  ' class="demo-frame"',
  ' title="',
  '" loading="lazy" style="',
  '"></iframe>'
];
var _tmpl$3$2 = [
  "<div",
  ' class="demo-code">',
  "</div>"
];
var _tmpl$4$2 = [
  "<figcaption",
  ' class="demo-caption">',
  "</figcaption>"
];
var _tmpl$5$1 = [
  "<figure",
  ' class="demo"><!--$-->',
  "<!--/--><!--$-->",
  "<!--/--></figure>"
];
var _m$$11 = /* @__PURE__ */ Symbol();
var _d$$12 = {
  get() {
    return [Tab({
      class: "demo-tab",
      value: "preview",
      children: "Preview"
    }), Tab({
      class: "demo-tab",
      value: "code",
      children: "Code"
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$$12(_p) {
  this.class = _p;
  Object.defineProperty(this, "children", _d$$12);
}
_P$$12.prototype = Object.prototype;
var _d$2$11 = {
  get() {
    const props = this[_m$$11];
    var _v$9, _v$10;
    return _v$9 = ssrHydrationKey(), _v$10 = () => {
      return props.code;
    }, ssr(_tmpl$3$2, _v$9, _v$10);
  },
  enumerable: true,
  configurable: true
};
function _P$2$9(_p2, _p3, _p4) {
  this[_m$$11] = _p2;
  this.class = _p3;
  this.value = _p4;
  Object.defineProperty(this, "children", _d$2$11);
}
_P$2$9.prototype = Object.prototype;
var _d$3$8 = {
  get() {
    return this[_m$$11].caption;
  },
  enumerable: true,
  configurable: true
};
var _d$4$6 = {
  get() {
    const props = this[_m$$11];
    var _v$12, _v$13;
    return _v$12 = ssrHydrationKey(), _v$13 = () => {
      return props.caption;
    }, ssr(_tmpl$4$2, _v$12, _v$13);
  },
  enumerable: true,
  configurable: true
};
function _P$3$7(_p5) {
  this[_m$$11] = _p5;
  Object.defineProperty(this, "when", _d$3$8);
  Object.defineProperty(this, "children", _d$4$6);
}
_P$3$7.prototype = Object.prototype;
var MIN_HEIGHT = 72;
function Demo(props) {
  var _v$2, _v$3, _v$4, _v$5, _g$;
  const { theme } = useTheme();
  const scheme = usePreferredColorScheme();
  const [height, setHeight] = createSignal(MIN_HEIGHT);
  const [nonce, setNonce] = createSignal(0);
  const src = () => `${demoUrl(props.id, theme(), scheme())}&r=${nonce()}`;
  createEffect(() => [theme(), scheme()], () => {
  });
  if (!isServer) {
    const onMessage = (event) => {
      if (event.source !== void 0 || event.origin !== window.location.origin) return;
      if (!isDemoMessage(event.data) || event.data.kind !== "height") return;
      setHeight(Math.max(MIN_HEIGHT, Math.ceil(event.data.height)));
    };
    window.addEventListener("message", onMessage);
    onCleanup(() => {
      window.removeEventListener("message", onMessage);
    });
  }
  var _v$ = ssrHydrationKey(), _v$11 = escape(TabGroup({
    class: "demo-tabs",
    horizontal: true,
    defaultValue: "preview",
    get children() {
      return [
        (_v$2 = ssrHydrationKey(), _v$3 = escape(TabList(new _P$$12("demo-tablist"))), _v$4 = () => {
          return ssrAttribute("href", escape(src(), true));
        }, ssr(_tmpl$$6, _v$2, _v$3, _v$4)),
        TabPanel({
          class: "demo-panel",
          value: "preview",
          get children() {
            return _v$5 = ssrHydrationKey(), _g$ = ssrGroup(() => {
              return [
                ssrAttribute("src", escape(src(), true)),
                `${escape(props.title, true)} demo`,
                ssrStyleProperty("height:", `${escape(height(), true)}px`)
              ];
            }, 3), ssr(_tmpl$2$4, _v$5, _g$, _g$, _g$);
          }
        }),
        TabPanel(new _P$2$9(props, "demo-panel demo-panel-code", "code"))
      ];
    }
  })), _v$14 = escape(Show(new _P$3$7(props)));
  return ssr(_tmpl$5$1, _v$, _v$11, _v$14);
}
var _tmpl$$5 = [
  "<div",
  ' class="prose">',
  "</div>"
];
var _tmpl$2$3 = [
  "<div",
  ">",
  "</div>"
];
var _m$$10 = /* @__PURE__ */ Symbol();
var _d$$11 = {
  get() {
    const demo = this[_m$$10];
    return demo().id;
  },
  enumerable: true,
  configurable: true
};
var _d$2$10 = {
  get() {
    const demo = this[_m$$10];
    return demo().title;
  },
  enumerable: true,
  configurable: true
};
var _d$3$7 = {
  get() {
    const demo = this[_m$$10];
    return demo().code;
  },
  enumerable: true,
  configurable: true
};
var _d$4$5 = {
  get() {
    const demo = this[_m$$10];
    return demo().caption;
  },
  enumerable: true,
  configurable: true
};
function _P$$11(_p) {
  this[_m$$10] = _p;
  Object.defineProperty(this, "id", _d$$11);
  Object.defineProperty(this, "title", _d$2$10);
  Object.defineProperty(this, "code", _d$3$7);
  Object.defineProperty(this, "caption", _d$4$5);
}
_P$$11.prototype = Object.prototype;
var _d$5$3 = {
  get() {
    const block = this[_m$$10];
    return block.type === "demo" ? block : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$6$3 = {
  get() {
    const block = this[_m$$10];
    var _v$3 = ssrHydrationKey(), _v$4 = (() => {
      var _c$ = memo(() => {
        return block.type === "html";
      });
      return () => {
        return _c$() ? block.html : "";
      };
    })();
    return ssr(_tmpl$2$3, _v$3, _v$4);
  },
  enumerable: true,
  configurable: true
};
function _P$2$8(_p2, _p3) {
  this[_m$$10] = _p2;
  Object.defineProperty(this, "when", _d$5$3);
  Object.defineProperty(this, "fallback", _d$6$3);
  this.children = _p3;
}
_P$2$8.prototype = Object.prototype;
var _d$7$3 = {
  get() {
    return this[_m$$10].blocks;
  },
  enumerable: true,
  configurable: true
};
function _P$3$6(_p4, _p5) {
  this[_m$$10] = _p4;
  Object.defineProperty(this, "each", _d$7$3);
  this.children = _p5;
}
_P$3$6.prototype = Object.prototype;
function Prose(props) {
  var _v$ = ssrHydrationKey(), _v$2 = escape(For(new _P$3$6(props, (block) => Show(new _P$2$8(block, (demo) => Demo(new _P$$11(demo)))))));
  return ssr(_tmpl$$5, _v$, _v$2);
}
var _tmpl$$4 = [
  "<nav",
  ' class="toc" aria-label="On this page"><h2 class="toc-title">On this page</h2><ul class="toc-list">',
  "</ul></nav>"
];
var _tmpl$2$2 = [
  "<li",
  ' class="toc-item"',
  '><a class="toc-link" href="',
  '"',
  ">",
  "</a></li>"
];
var _m$$9 = /* @__PURE__ */ Symbol();
var _d$$10 = {
  get() {
    return this[_m$$9].headings;
  },
  enumerable: true,
  configurable: true
};
function _P$$10(_p, _p2) {
  this[_m$$9] = _p;
  Object.defineProperty(this, "each", _d$$10);
  this.children = _p2;
}
_P$$10.prototype = Object.prototype;
var _d$2$9 = {
  get() {
    return this[_m$$9].headings.length > 1;
  },
  enumerable: true,
  configurable: true
};
var _d$3$6 = {
  get() {
    const props = this[_m$$9];
    var _v$, _v$2;
    return _v$ = ssrHydrationKey(), _v$2 = escape(For(new _P$$10(props, (heading) => {
      var _lv$, _v$3, _g$, _v$7;
      return _v$3 = ssrHydrationKey(), _g$ = ssrGroup(() => {
        return [
          ssrAttribute("data-level", escape(heading.level, true)),
          escape(_lv$ = `#${heading.id}`, true),
          ssrLinkClaim({ href: _lv$ })
        ];
      }, 3), _v$7 = scope(() => {
        return escape(heading.text);
      }), ssr(_tmpl$2$2, _v$3, _g$, _g$, _g$, _v$7);
    }))), ssr(_tmpl$$4, _v$, _v$2);
  },
  enumerable: true,
  configurable: true
};
function _P$2$7(_p3) {
  this[_m$$9] = _p3;
  Object.defineProperty(this, "when", _d$2$9);
  Object.defineProperty(this, "children", _d$3$6);
}
_P$2$7.prototype = Object.prototype;
function TableOfContents(props) {
  return Show(new _P$2$7(props));
}
var _tmpl$$3 = [
  "<article",
  ' class="page page-missing"><h1>Page not found</h1><p>There is no document at <code>/<!--$-->',
  '<!--/--></code>.</p><p><a href="/"',
  ">Back to the introduction</a></p></article>"
];
var _tmpl$2$1 = ["<div", ' class="page-loading">Loading&#8230;</div>'];
var _tmpl$3$1 = [
  "<p",
  ' class="page-lede">',
  "</p>"
];
var _tmpl$4$1 = [
  "<div",
  ' class="page-grid"><article class="page"><header class="page-header"><h1 class="page-title">',
  "</h1><!--$-->",
  "<!--/--></header><!--$-->",
  "<!--/--><!--$-->",
  "<!--/--></article><!--$-->",
  "<!--/--></div>"
];
var _lk$$1 = { href: "/" };
var _m$$8 = /* @__PURE__ */ Symbol();
var _m$2$4 = /* @__PURE__ */ Symbol();
var _d$$9 = {
  get() {
    return this[_m$$8].slug;
  },
  enumerable: true,
  configurable: true
};
function _P$$9(_p) {
  this[_m$$8] = _p;
  Object.defineProperty(this, "slug", _d$$9);
}
_P$$9.prototype = Object.prototype;
var _d$2$8 = {
  get() {
    const page = this[_m$$8];
    return page().description;
  },
  enumerable: true,
  configurable: true
};
var _d$3$5 = {
  get() {
    const page = this[_m$$8];
    var _v$6, _v$7;
    return _v$6 = ssrHydrationKey(), _v$7 = () => {
      return page().description;
    }, ssr(_tmpl$3$1, _v$6, _v$7);
  },
  enumerable: true,
  configurable: true
};
function _P$2$6(_p2) {
  this[_m$$8] = _p2;
  Object.defineProperty(this, "when", _d$2$8);
  Object.defineProperty(this, "children", _d$3$5);
}
_P$2$6.prototype = Object.prototype;
var _d$4$4 = {
  get() {
    const hero = this[_m$$8];
    return hero().id;
  },
  enumerable: true,
  configurable: true
};
var _d$5$2 = {
  get() {
    const hero = this[_m$$8];
    return hero().title;
  },
  enumerable: true,
  configurable: true
};
var _d$6$2 = {
  get() {
    const hero = this[_m$$8];
    return hero().code;
  },
  enumerable: true,
  configurable: true
};
var _d$7$2 = {
  get() {
    const hero = this[_m$$8];
    return hero().caption;
  },
  enumerable: true,
  configurable: true
};
function _P$3$5(_p3) {
  this[_m$$8] = _p3;
  Object.defineProperty(this, "id", _d$4$4);
  Object.defineProperty(this, "title", _d$5$2);
  Object.defineProperty(this, "code", _d$6$2);
  Object.defineProperty(this, "caption", _d$7$2);
}
_P$3$5.prototype = Object.prototype;
var _d$8$2 = {
  get() {
    const page = this[_m$$8];
    return page().hero;
  },
  enumerable: true,
  configurable: true
};
function _P$4$2(_p4, _p5) {
  this[_m$$8] = _p4;
  Object.defineProperty(this, "when", _d$8$2);
  this.children = _p5;
}
_P$4$2.prototype = Object.prototype;
var _d$9$2 = {
  get() {
    const page = this[_m$$8];
    return page().blocks;
  },
  enumerable: true,
  configurable: true
};
function _P$5$2(_p6) {
  this[_m$$8] = _p6;
  Object.defineProperty(this, "blocks", _d$9$2);
}
_P$5$2.prototype = Object.prototype;
var _d$10$2 = {
  get() {
    const page = this[_m$$8];
    return page().headings;
  },
  enumerable: true,
  configurable: true
};
function _P$6$2(_p7) {
  this[_m$$8] = _p7;
  Object.defineProperty(this, "headings", _d$10$2);
}
_P$6$2.prototype = Object.prototype;
var _d$11$2 = {
  get() {
    const doc = this[_m$$8];
    return doc();
  },
  enumerable: true,
  configurable: true
};
var _d$12$2 = {
  get() {
    const params = this[_m$2$4];
    return NotFound(new _P$$9(params));
  },
  enumerable: true,
  configurable: true
};
function _P$7$2(_p8, _p9, _p0) {
  this[_m$$8] = _p8;
  this[_m$2$4] = _p9;
  Object.defineProperty(this, "when", _d$11$2);
  Object.defineProperty(this, "fallback", _d$12$2);
  this.children = _p0;
}
_P$7$2.prototype = Object.prototype;
var _d$13$2 = {
  get() {
    var _v$3 = ssrHydrationKey();
    return ssr(_tmpl$2$1, _v$3);
  },
  enumerable: true,
  configurable: true
};
var _d$14$2 = {
  get() {
    const doc = this[_m$$8];
    const params = this[_m$2$4];
    return Show(new _P$7$2(doc, params, (page) => {
      var _v$4, _v$5, _v$8, _v$9, _v$10, _v$11;
      return _v$4 = ssrHydrationKey(), _v$5 = scope(() => {
        return escape(page().title);
      }), _v$8 = escape(Show(new _P$2$6(page))), _v$9 = escape(Show(new _P$4$2(page, (hero) => Demo(new _P$3$5(hero))))), _v$10 = escape(Prose(new _P$5$2(page))), _v$11 = escape(TableOfContents(new _P$6$2(page))), ssr(_tmpl$4$1, _v$4, _v$5, _v$8, _v$9, _v$10, _v$11);
    }));
  },
  enumerable: true,
  configurable: true
};
function _P$8$2(_p1, _p10) {
  this[_m$$8] = _p1;
  this[_m$2$4] = _p10;
  Object.defineProperty(this, "fallback", _d$13$2);
  Object.defineProperty(this, "children", _d$14$2);
}
_P$8$2.prototype = Object.prototype;
var loadDoc = query(async (slug) => {
  const loader = pages[slug];
  return loader ? (await loader()).default : null;
}, "doc");
function metaFor(slug) {
  for (const section of sections) {
    const entry = section.entries.find((candidate) => candidate.slug === slug);
    if (entry) return entry;
  }
}
function NotFound(props) {
  var _v$ = ssrHydrationKey(), _v$2 = scope(() => {
    return escape(props.slug);
  });
  return ssr(_tmpl$$3, _v$, _v$2, ssrLinkClaim(_lk$$1));
}
function DocPage() {
  const params = useParams();
  const doc = createMemo(() => loadDoc(params.slug));
  const meta = createMemo(() => metaFor(params.slug));
  useHead(() => {
    const entry = meta();
    return entry ? [{
      tag: "title",
      props: { children: `${entry.title} \xB7 Terracotta` }
    }, {
      tag: "meta",
      props: {
        name: "description",
        content: entry.description
      }
    }] : [{
      tag: "title",
      props: { children: "Not found \xB7 Terracotta" }
    }];
  });
  return Loading(new _P$8$2(doc, params));
}
var _m$$7 = /* @__PURE__ */ Symbol();
var _d$$8 = {
  get() {
    return this[_m$$7].state;
  },
  enumerable: true,
  configurable: true
};
var _d$2$7 = {
  get() {
    const props = this[_m$$7];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$$8(_p) {
  this[_m$$7] = _p;
  Object.defineProperty(this, "value", _d$$8);
  Object.defineProperty(this, "children", _d$2$7);
}
_P$$8.prototype = Object.prototype;
function createCheckState(options) {
  let signal;
  let setSignal;
  if ("defaultChecked" in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultChecked);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (options.onChange) options.onChange(value);
    };
  } else {
    signal = createMemo(() => options.checked);
    setSignal = (value) => {
      if (options.onChange) options.onChange(value);
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  return {
    checked() {
      return signal();
    },
    setState(value) {
      if (!untrack(isDisabled)) setSignal(value);
    },
    disabled: isDisabled,
    check() {
      if (!untrack(isDisabled)) setSignal(true);
    },
    uncheck() {
      if (!untrack(isDisabled)) setSignal(false);
    },
    reset() {
      if (!untrack(isDisabled)) setSignal(void 0);
    },
    toggle() {
      if (!untrack(isDisabled)) setSignal(!untrack(signal));
    }
  };
}
var CheckStateContext = createContext(null);
function CheckStateProvider(props) {
  return CheckStateContext(new _P$$8(props));
}
function useCheckState() {
  const ctx = useContext(CheckStateContext);
  assert(ctx, /* @__PURE__ */ new Error("Missing <CheckStateProvider>"));
  return ctx;
}
function CheckStateChild(props) {
  const state = useCheckState();
  return createMemo(() => {
    const current = props.children;
    if (typeof current === "function" && current.length === 1) return createMemo(() => current(state));
    return current;
  });
}
var _m$$6 = /* @__PURE__ */ Symbol();
var _m$2$3 = /* @__PURE__ */ Symbol();
var _d$$7 = {
  get() {
    var _a2;
    return ((_a2 = this[_m$$6].as) != null ? _a2 : "button") === "button" ? "button" : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$2$6 = {
  get() {
    const isChecked = this[_m$2$3];
    return isChecked() ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
function _P$$7(_p, _p2, _p3, _p4) {
  this[_m$$6] = _p;
  this[_m$2$3] = _p2;
  this.ref = _p3;
  Object.defineProperty(this, "type", _d$$7);
  this.role = _p4;
  Object.defineProperty(this, "aria-checked", _d$2$6);
}
_P$$7.prototype = Object.prototype;
var _d$3$4 = {
  get() {
    return this[_m$$6].children;
  },
  enumerable: true,
  configurable: true
};
function _P$2$5(_p5, _p6) {
  this[_m$$6] = _p5;
  this.state = _p6;
  Object.defineProperty(this, "children", _d$3$4);
}
_P$2$5.prototype = Object.prototype;
var _d$4$3 = {
  get() {
    const props = this[_m$$6];
    const state = this[_m$2$3];
    return CheckStateProvider(new _P$2$5(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$3$4(_p7, _p8) {
  this[_m$$6] = _p7;
  this[_m$2$3] = _p8;
  Object.defineProperty(this, "children", _d$4$3);
}
_P$3$4.prototype = Object.prototype;
var SWITCH_TAG = createTag("switch");
function isSwitchUncontrolled(props) {
  return "defaultChecked" in props;
}
function Switch(props) {
  const [ref, setRef] = createForwardRef(props);
  const state = createCheckState({
    get checked() {
      return isSwitchUncontrolled(props) ? void 0 : props.checked;
    },
    get disabled() {
      return props.disabled;
    },
    onChange(value) {
      var _a2;
      (_a2 = props.onChange) == null ? void 0 : _a2.call(props, !!value);
    },
    ...isSwitchUncontrolled(props) ? { defaultChecked: props.defaultChecked } : {}
  });
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      state.toggle();
    });
  });
  const isChecked = () => !!state.checked();
  const checkedState = createCheckedState(isChecked);
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = isSwitchUncontrolled(props) ? omit(props, "onChange", "defaultChecked", "ref", "disabled", "children") : omit(props, "onChange", "checked", "ref", "disabled", "children");
  return Button(mergeProps(SWITCH_TAG, new _P$$7(props, isChecked, setRef, "switch"), checkedState, disabledState, ariaDisabledState, rest, new _P$3$4(props, state)));
}
var _m$$5 = /* @__PURE__ */ Symbol();
var _d$$6 = {
  get() {
    return this[_m$$5].state;
  },
  enumerable: true,
  configurable: true
};
var _d$2$5 = {
  get() {
    const props = this[_m$$5];
    return renderChildren(props.children, props.state);
  },
  enumerable: true,
  configurable: true
};
function _P$$6(_p) {
  this[_m$$5] = _p;
  Object.defineProperty(this, "value", _d$$6);
  Object.defineProperty(this, "children", _d$2$5);
}
_P$$6.prototype = Object.prototype;
function createToggleState(options) {
  let signal;
  let setSignal;
  if ("defaultPressed" in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultPressed);
    signal = isOpen;
    setSignal = (value) => {
      setIsOpen(value);
      if (options.onChange) options.onChange(value);
    };
  } else {
    signal = createMemo(() => options.pressed);
    setSignal = (value) => {
      if (options.onChange) options.onChange(value);
    };
  }
  const isDisabled = createMemo(() => !!options.disabled);
  return {
    pressed() {
      return signal();
    },
    setState(value) {
      if (!untrack(isDisabled)) setSignal(value);
    },
    disabled: isDisabled,
    check() {
      if (!untrack(isDisabled)) setSignal(true);
    },
    uncheck() {
      if (!untrack(isDisabled)) setSignal(false);
    },
    toggle() {
      if (!untrack(isDisabled)) setSignal(!untrack(signal));
    }
  };
}
var ToggleStateContext = createContext(null);
function ToggleStateProvider(props) {
  return ToggleStateContext(new _P$$6(props));
}
var _m$$4 = /* @__PURE__ */ Symbol();
var _m$2$2 = /* @__PURE__ */ Symbol();
var _d$$5 = {
  get() {
    return this[_m$$4].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$5(_p, _p2) {
  this[_m$$4] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$$5);
}
_P$$5.prototype = Object.prototype;
var _d$2$4 = {
  get() {
    const props = this[_m$$4];
    const state = this[_m$2$2];
    return ToggleStateProvider(new _P$$5(props, state));
  },
  enumerable: true,
  configurable: true
};
function _P$2$4(_p3, _p4) {
  this[_m$$4] = _p3;
  this[_m$2$2] = _p4;
  Object.defineProperty(this, "children", _d$2$4);
}
_P$2$4.prototype = Object.prototype;
var TOGGLE_TAG = createTag("toggle");
function isToggleUncontrolled(props) {
  return "defaultPressed" in props;
}
function Toggle(props) {
  const [ref, setRef] = createForwardRef(props);
  const state = createToggleState(props);
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) return useEventListener(current, "click", () => {
      state.toggle();
    });
  });
  const pressedState = createPressedState(() => state.pressed());
  const ariaPressedState = createARIAPressedState(() => state.pressed());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = isToggleUncontrolled(props) ? omit(props, "onChange", "defaultPressed", "ref", "disabled", "children") : omit(props, "onChange", "pressed", "ref", "disabled", "children");
  return Button(mergeProps(TOGGLE_TAG, { ref: setRef }, pressedState, ariaPressedState, disabledState, ariaDisabledState, rest, new _P$2$4(props, state)));
}
var TYPE_AHEAD_DEBOUNCE_TIMEOUT = 250;
function createTypeAhead(callback, time = TYPE_AHEAD_DEBOUNCE_TIMEOUT) {
  let characters = "";
  let timeout;
  onCleanup(() => {
    if (timeout) clearTimeout(timeout);
  });
  return (value) => {
    characters += value;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(characters);
      characters = "";
    }, time);
  };
}
var _m$$3 = /* @__PURE__ */ Symbol();
var _m$2$1 = /* @__PURE__ */ Symbol();
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
var _m$15 = /* @__PURE__ */ Symbol();
var _m$16 = /* @__PURE__ */ Symbol();
var _m$17 = /* @__PURE__ */ Symbol();
var _m$18 = /* @__PURE__ */ Symbol();
var _m$19 = /* @__PURE__ */ Symbol();
var _d$$4 = {
  get() {
    return this[_m$$3].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$4(_p, _p2) {
  this[_m$$3] = _p;
  this.state = _p2;
  Object.defineProperty(this, "children", _d$$4);
}
_P$$4.prototype = Object.prototype;
var _d$2$3 = {
  get() {
    const props = this[_m$$3];
    const selection = this[_m$2$1];
    return SelectStateProvider(new _P$$4(props, selection));
  },
  enumerable: true,
  configurable: true
};
function _P$2$3(_p3, _p4) {
  this[_m$$3] = _p3;
  this[_m$2$1] = _p4;
  Object.defineProperty(this, "children", _d$2$3);
}
_P$2$3.prototype = Object.prototype;
var _d$3$3 = {
  get() {
    const Root2 = this[_m$$3];
    const multiple = this[_m$2$1];
    const setRef = this[_m$3];
    const disabledState = this[_m$4];
    const rest = this[_m$5];
    const props = this[_m$6];
    const selection = this[_m$7];
    return Root2(mergeProps(TREE_TAG, {
      role: "tree",
      "aria-multiselectable": multiple ? "true" : void 0,
      ref: setRef
    }, disabledState, rest, new _P$2$3(props, selection)));
  },
  enumerable: true,
  configurable: true
};
function _P$3$3(_p5, _p6, _p7, _p8, _p9, _p0, _p1, _p10) {
  this[_m$$3] = _p5;
  this[_m$2$1] = _p6;
  this[_m$3] = _p7;
  this[_m$4] = _p8;
  this[_m$5] = _p9;
  this[_m$6] = _p0;
  this[_m$7] = _p1;
  this.value = _p10;
  Object.defineProperty(this, "children", _d$3$3);
}
_P$3$3.prototype = Object.prototype;
var _d$4$2 = {
  get() {
    return this[_m$$3].children;
  },
  enumerable: true,
  configurable: true
};
function _P$4$1(_p11) {
  this[_m$$3] = _p11;
  Object.defineProperty(this, "children", _d$4$2);
}
_P$4$1.prototype = Object.prototype;
var _d$5$1 = {
  get() {
    return this[_m$$3].unmount;
  },
  enumerable: true,
  configurable: true
};
var _d$6$1 = {
  get() {
    return this[_m$2$1].isExpanded();
  },
  enumerable: true,
  configurable: true
};
var _d$7$1 = {
  get() {
    const Root2 = this[_m$3];
    const expandedState = this[_m$4];
    const rest = this[_m$5];
    const props = this[_m$$3];
    return Root2(mergeProps(TREE_GROUP_TAG, { role: "group" }, expandedState, rest, new _P$4$1(props)));
  },
  enumerable: true,
  configurable: true
};
function _P$5$1(_p12, _p13, _p14, _p15, _p16) {
  this[_m$$3] = _p12;
  this[_m$2$1] = _p13;
  this[_m$3] = _p14;
  this[_m$4] = _p15;
  this[_m$5] = _p16;
  Object.defineProperty(this, "unmount", _d$5$1);
  Object.defineProperty(this, "when", _d$6$1);
  Object.defineProperty(this, "children", _d$7$1);
}
_P$5$1.prototype = Object.prototype;
var _d$8$1 = {
  get() {
    const isTabStop = this[_m$$3];
    return isTabStop() ? 0 : -1;
  },
  enumerable: true,
  configurable: true
};
var _d$9$1 = {
  get() {
    const isSelected = this[_m$2$1];
    return isSelected() ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
var _d$10$1 = {
  get() {
    const ariaExpanded = this[_m$3];
    return ariaExpanded();
  },
  enumerable: true,
  configurable: true
};
var _d$11$1 = {
  get() {
    const label = this[_m$4];
    const labelID = this[_m$5];
    return label.isPresent() ? labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
function _P$6$1(_p17, _p18, _p19, _p20, _p21, _p22, _p23, _p24, _p25) {
  this[_m$$3] = _p17;
  this[_m$2$1] = _p18;
  this[_m$3] = _p19;
  this[_m$4] = _p20;
  this[_m$5] = _p21;
  this.role = _p22;
  Object.defineProperty(this, "tabindex", _d$8$1);
  this["aria-level"] = _p23;
  Object.defineProperty(this, "aria-selected", _d$9$1);
  Object.defineProperty(this, "aria-expanded", _d$10$1);
  Object.defineProperty(this, "aria-labelledby", _d$11$1);
  this["tc-level"] = _p24;
  this.ref = _p25;
}
_P$6$1.prototype = Object.prototype;
var _d$12$1 = {
  get() {
    const props = this[_m$$3];
    const properties = this[_m$2$1];
    return renderChildren(props.children, properties);
  },
  enumerable: true,
  configurable: true
};
function _P$7$1(_p26, _p27) {
  this[_m$$3] = _p26;
  this[_m$2$1] = _p27;
  Object.defineProperty(this, "children", _d$12$1);
}
_P$7$1.prototype = Object.prototype;
var _d$13$1 = {
  get() {
    const props = this[_m$$3];
    const level = this[_m$2$1];
    const labelID = this[_m$3];
    const label = this[_m$4];
    const group = this[_m$5];
    const isExpanded = this[_m$6];
    const isVisible = this[_m$7];
    return {
      value: props.value,
      level,
      labelID,
      label,
      group,
      isExpanded,
      isVisible
    };
  },
  enumerable: true,
  configurable: true
};
var _d$14$1 = {
  get() {
    const Root2 = this[_m$8];
    const ownerAttribute = this[_m$9];
    const isTabStop = this[_m$10];
    const isSelected = this[_m$11];
    const ariaExpanded = this[_m$12];
    const label = this[_m$4];
    const labelID = this[_m$3];
    const level = this[_m$2$1];
    const setInternalRef = this[_m$13];
    const selectedState = this[_m$14];
    const expandedState = this[_m$15];
    const disabledState = this[_m$16];
    const ariaDisabledState = this[_m$17];
    const rest = this[_m$18];
    const props = this[_m$$3];
    const properties = this[_m$19];
    return Root2(mergeProps(TREE_ITEM_TAG, ownerAttribute, new _P$6$1(isTabStop, isSelected, ariaExpanded, label, labelID, "treeitem", level, level, setInternalRef), selectedState, expandedState, disabledState, ariaDisabledState, rest, new _P$7$1(props, properties)));
  },
  enumerable: true,
  configurable: true
};
function _P$8$1(_p28, _p29, _p30, _p31, _p32, _p33, _p34, _p35, _p36, _p37, _p38, _p39, _p40, _p41, _p42, _p43, _p44, _p45, _p46) {
  this[_m$$3] = _p28;
  this[_m$2$1] = _p29;
  this[_m$3] = _p30;
  this[_m$4] = _p31;
  this[_m$5] = _p32;
  this[_m$6] = _p33;
  this[_m$7] = _p34;
  this[_m$8] = _p35;
  this[_m$9] = _p36;
  this[_m$10] = _p37;
  this[_m$11] = _p38;
  this[_m$12] = _p39;
  this[_m$13] = _p40;
  this[_m$14] = _p41;
  this[_m$15] = _p42;
  this[_m$16] = _p43;
  this[_m$17] = _p44;
  this[_m$18] = _p45;
  this[_m$19] = _p46;
  Object.defineProperty(this, "value", _d$13$1);
  Object.defineProperty(this, "children", _d$14$1);
}
_P$8$1.prototype = Object.prototype;
var _d$15$1 = {
  get() {
    return this[_m$$3].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$9$1(_p47) {
  this[_m$$3] = _p47;
  Object.defineProperty(this, "id", _d$15$1);
}
_P$9$1.prototype = Object.prototype;
var TreeContext = createContext(null);
var TreeItemContext = createContext(null);
function useTreeContext(componentName) {
  const context = useContext(TreeContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Tree>`));
  return context;
}
function useTreeItemContext(componentName) {
  const context = useContext(TreeItemContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <TreeItem>`));
  return context;
}
function useParentTreeItem() {
  return useContext(TreeItemContext);
}
var TREE_TAG = createTag("tree");
var TREE_ITEM_TAG = createTag("tree-item");
var TREE_ITEM_LABEL_TAG = createTag("tree-item-label");
var TREE_GROUP_TAG = createTag("tree-group");
var OWNER_ATTRIBUTE = `tc-owner`;
function isTreeMultiple(props) {
  return !!props.multiple;
}
function byDocumentOrder(a, b) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function Tree(props) {
  const ownerID = createUniqueId();
  const multiple = untrack(() => isTreeMultiple(props));
  const [ref, setRef] = createForwardRef(props);
  const selection = isTreeMultiple(props) ? createMultipleSelectState(merge(props, { get toggleable() {
    var _a2;
    return (_a2 = props.toggleable) != null ? _a2 : true;
  } })) : createSingleSelectState(props);
  const equals = (a, b) => {
    var _a2;
    return ((_a2 = props.by) != null ? _a2 : isEqual)(a, b);
  };
  const [internalExpanded, setInternalExpanded] = createSignal(untrack(() => {
    var _a2;
    return (_a2 = props.defaultExpanded) != null ? _a2 : [];
  }));
  const expanded = createMemo(() => "expanded" in props && props.expanded ? props.expanded : internalExpanded());
  function isExpanded(value) {
    return expanded().some((item) => equals(item, value));
  }
  function setExpanded(value, open) {
    var _a2;
    const current = untrack(expanded);
    if (untrack(() => isExpanded(value)) === open) return;
    const next = open ? [...current, value] : current.filter((item) => !equals(item, value));
    if (!("expanded" in props && props.expanded)) setInternalExpanded(next);
    (_a2 = props.onExpandedChange) == null ? void 0 : _a2.call(props, next);
  }
  const [entries, setEntries] = createSignal([]);
  let serverTabStopClaimed = false;
  const [focused, setFocused] = createSignal();
  const tabStop = createMemo(() => {
    var _a2;
    const visible = entries().filter((entry) => entry.isVisible());
    const current = focused();
    if (current && visible.some((entry) => entry.element === current)) return current;
    const sorted = visible.map((entry) => entry.element).sort(byDocumentOrder);
    return (_a2 = visible.filter((entry) => entry.isSelected()).map((entry) => entry.element).sort(byDocumentOrder).at(0)) != null ? _a2 : sorted.at(0);
  });
  createEffect(ref, (current) => {
    if (!(current instanceof HTMLElement)) return;
    const root = current;
    function visibleEntries() {
      return untrack(entries).filter((entry) => entry.isVisible() && root.contains(entry.element)).sort((a, b) => byDocumentOrder(a.element, b.element));
    }
    function visibleItems() {
      return visibleEntries().map((entry) => entry.element);
    }
    function ownItem(target) {
      if (!(target instanceof Element)) return;
      const item = target.closest(`[role="treeitem"][${OWNER_ATTRIBUTE}="${ownerID}"]`);
      return item && root.contains(item) ? item : void 0;
    }
    function parentItem(item) {
      const parent = item.parentElement;
      return parent ? ownItem(parent) : void 0;
    }
    function nameOf(item) {
      var _a2;
      const labelledBy = item.getAttribute("aria-labelledby");
      return ((_a2 = labelledBy ? document.getElementById(labelledBy) : null) != null ? _a2 : item).textContent.trim().toLowerCase();
    }
    const pushCharacter = createTypeAhead((value) => {
      const items = visibleItems();
      const query2 = value.toLowerCase();
      const index = items.findIndex((item) => item === document.activeElement);
      let start = 0;
      if (index !== -1) start = value.length === 1 ? index + 1 : index;
      for (let i = 0; i < items.length; i += 1) {
        const item = items[(start + i) % items.length];
        if (nameOf(item).startsWith(query2)) {
          item.focus();
          return;
        }
      }
    });
    return mergeFunc(useEventListener(root, "keydown", (e) => {
      var _a2, _b, _c, _d;
      const item = ownItem(e.target);
      const entry = untrack(entries).find((candidate) => candidate.element === item);
      if (!item || !entry) return;
      const items = visibleItems();
      const index = items.indexOf(item);
      const isParent = entry.isParent();
      const isOpen = isParent && entry.isExpanded();
      switch (e.key) {
        case "ArrowDown":
          (_a2 = items.at(index + 1)) == null ? void 0 : _a2.focus();
          break;
        case "ArrowUp":
          if (index > 0) items[index - 1].focus();
          break;
        case "Home":
          (_b = items.at(0)) == null ? void 0 : _b.focus();
          break;
        case "End":
          (_c = items.at(-1)) == null ? void 0 : _c.focus();
          break;
        case "ArrowRight":
          if (isParent && !isOpen) entry.setExpanded(true);
          else if (isOpen) {
            const next = items.at(index + 1);
            if (next && parentItem(next) === item) next.focus();
          }
          break;
        case "ArrowLeft":
          if (isOpen) entry.setExpanded(false);
          else (_d = parentItem(item)) == null ? void 0 : _d.focus();
          break;
        case "Enter":
        case " ":
          if (!entry.disabled()) entry.select();
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            pushCharacter(e.key);
            break;
          }
          return;
      }
      e.preventDefault();
    }));
  });
  const disabledState = createDisabledState(() => selection.disabled());
  const rest = omit(props, "as", "children", "ref", "multiple", "toggleable", "value", "defaultValue", "onChange", "disabled", "by", "expanded", "defaultExpanded", "onExpandedChange");
  return TreeContext(new _P$3$3(dynamic(() => props.as || "ul"), multiple, setRef, disabledState, rest, props, selection, {
    ownerID,
    selection,
    multiple,
    isExpanded,
    setExpanded,
    register(entry) {
      setEntries((list) => [...list, entry]);
      return () => {
        setEntries((list) => list.filter((item) => item !== entry));
      };
    },
    tabStop,
    claimServerTabStop() {
      if (serverTabStopClaimed) return false;
      serverTabStopClaimed = true;
      return true;
    },
    setFocused
  }));
}
function TreeGroup(props) {
  const item = useTreeItemContext("TreeGroup");
  item.group.register();
  const expandedState = createExpandedState(() => item.isExpanded());
  const rest = omit(props, "as", "unmount", "children");
  return Unmountable(new _P$5$1(props, item, dynamic(() => props.as || "ul"), expandedState, rest));
}
function TreeItem(props) {
  var _a2;
  const tree = useTreeContext("TreeItem");
  const parent = useParentTreeItem();
  const labelID = createUniqueId();
  const label = createPresence();
  const group = createPresence(false);
  const [internalRef, setInternalRef] = createForwardRef(props);
  const level = ((_a2 = parent == null ? void 0 : parent.level) != null ? _a2 : 0) + 1;
  const disabled = () => !!props.disabled || tree.selection.disabled();
  const isSelected = () => tree.selection.isSelected(props.value);
  const isExpanded = () => tree.isExpanded(props.value);
  const isVisible = () => parent ? parent.isExpanded() && parent.isVisible() : true;
  const isServerTabStop = isServer && level === 1 && tree.claimServerTabStop();
  const isTabStop = () => {
    if (isServer) return isServerTabStop;
    const stop = tree.tabStop();
    return stop !== void 0 && stop === internalRef();
  };
  const properties = {
    level: () => level,
    isSelected,
    isExpanded,
    isParent: group.isPresent,
    disabled,
    toggle() {
      tree.setExpanded(props.value, !isExpanded());
    },
    select() {
      if (!disabled()) tree.selection.select(props.value);
    }
  };
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) return mergeFunc(tree.register({
      element: current,
      isVisible,
      isSelected,
      disabled,
      isParent: group.isPresent,
      isExpanded,
      setExpanded(open) {
        tree.setExpanded(props.value, open);
      },
      select: properties.select
    }), useEventListener(current, "focus", () => {
      tree.setFocused(current);
    }), useEventListener(current, "click", (e) => {
      if (e.target instanceof Element && e.target.closest('[role="treeitem"]') === current) {
        properties.select();
        current.focus();
      }
    }));
  });
  function ariaExpanded() {
    if (!group.isPresent()) return;
    return isExpanded() ? "true" : "false";
  }
  const ownerAttribute = createOwnerAttribute(tree.ownerID);
  const selectedState = createSelectedState(isSelected);
  const expandedState = createExpandedState(() => group.isPresent() && isExpanded());
  const disabledState = createDisabledState(disabled);
  const ariaDisabledState = createARIADisabledState(disabled);
  const rest = omit(props, "as", "children", "ref", "value", "disabled");
  return TreeItemContext(new _P$8$1(props, level, labelID, label, group, isExpanded, isVisible, dynamic(() => props.as || "li"), ownerAttribute, isTabStop, isSelected, ariaExpanded, setInternalRef, selectedState, expandedState, disabledState, ariaDisabledState, rest, properties));
}
function TreeItemLabel(props) {
  const item = useTreeItemContext("TreeItemLabel");
  item.label.register();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "span")(mergeProps(TREE_ITEM_LABEL_TAG, new _P$9$1(item), rest));
}
var _tmpl$$2 = [
  "<div",
  ' class="',
  '"><span class="lp-install-prompt" aria-hidden="true">$</span><code class="lp-install-command">pnpm add terracotta@next</code><button type="button" class="lp-install-copy"',
  '><span class="lp-install-copy-label">',
  "</span></button></div>"
];
var _tmpl$2 = [
  "<div",
  ' class="lp-specimen"',
  '><div class="lp-specimen-bar"><span class="lp-specimen-dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="lp-specimen-path">specimen.tsx</span><span class="lp-specimen-status">',
  '</span></div><iframe class="lp-specimen-frame"',
  ' title="Live specimen: a switch, a radio group, a slider and a checkbox" style="',
  '"></iframe><div class="lp-specimen-foot"><p class="lp-specimen-caption" aria-live="polite"><span class="lp-specimen-caption-label">Same markup. Theme:</span> <!--$-->',
  "<!--/--></p><!--$-->",
  '<!--/--><button type="button" class="lp-specimen-apply">Wear it<span aria-hidden="true">&#8594;</span></button></div></div>'
];
var _tmpl$3 = [
  "<strong",
  ' class="lp-specimen-name">',
  "</strong>"
];
var _tmpl$4 = [
  "<span",
  "",
  ' aria-hidden="true"></span>'
];
var _tmpl$5 = [
  "<code",
  ' class="lp-tag"><span class="lp-tok-punct">&lt;</span><span class="lp-tok-tag">',
  "</span><!--$-->",
  '<!--/--><span class="lp-tok-punct">&gt;</span></code>'
];
var _tmpl$6 = [
  "<span",
  ' class="lp-tok-pair"',
  "",
  '> <span class="lp-tok-attr">',
  '</span><span class="lp-tok-punct">=</span><span class="lp-tok-value">"<!--$-->',
  '<!--/-->"</span></span>'
];
var _tmpl$7 = ["<span", ' class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>'];
var _tmpl$8 = ["<span", ">Dark launch</span>"];
var _tmpl$9 = [
  "<span",
  ' class="disclosure-chevron" aria-hidden="true">',
  "</span>"
];
var _tmpl$10 = [
  "<div",
  ' class="lp-inspector"><div class="lp-inspector-head" aria-hidden="true"><span>Rendered</span><span>Elements</span></div><div class="lp-inspector-row"><div class="lp-inspector-live">',
  "</div><!--$-->",
  '<!--/--></div><div class="lp-inspector-row"><div class="lp-inspector-live">',
  "</div><!--$-->",
  '<!--/--></div><div class="lp-inspector-row"><div class="lp-inspector-live">',
  "</div><!--$-->",
  "<!--/--></div></div>"
];
var _tmpl$11 = [
  "<span",
  ' class="tree-row" style="',
  '"><span class="tree-caret" aria-hidden="true">',
  "</span><!--$-->",
  "<!--/--></span>"
];
var _tmpl$12 = [
  "<div",
  ' class="lp-keys"><div class="lp-keys-tree">',
  '</div><div class="lp-keys-board"><div class="lp-keycaps" aria-hidden="true">',
  '</div><p class="lp-keys-readout"><span class="lp-keys-readout-label">Focus</span><span class="lp-keys-readout-value">',
  "</span></p></div></div>"
];
var _tmpl$13 = [
  "<kbd",
  ' class="',
  '"',
  ">",
  "</kbd>"
];
var _tmpl$14 = [
  "<div",
  ' class="lp"',
  '><section class="lp-hero"><div class="lp-hero-glow" aria-hidden="true"></div><div class="lp-hero-copy"><p class="lp-eyebrow"><span class="lp-eyebrow-dot" aria-hidden="true"></span>Terracotta 2 for Solid 2 \xB7 release candidate</p><h1 class="lp-title"><span class="lp-title-line"><span>Behaviour,</span></span><span class="lp-title-line"><span>not <em class="lp-title-em">decoration.</em></span></span></h1><p class="lp-lede">Accessible components for SolidJS that ship state, keyboard handling and ARIA wiring, and not a single pixel of style. What they are doing lands on the DOM as <code>tc-</code> attributes. What they look like is up to you.</p><div class="lp-actions"><a class="lp-button lp-button-primary" href="/guides/getting-started"',
  '>Get started<span class="lp-button-arrow" aria-hidden="true">&#8594;</span></a><a class="lp-button" href="#components"',
  "><!--$-->",
  "<!--/--> components</a></div><!--$-->",
  '<!--/--></div><div class="lp-hero-stage">',
  '</div></section><div class="lp-ribbon" aria-hidden="true"><div class="lp-ribbon-track">',
  '</div></div><section class="lp-section"><header class="lp-section-head"><p class="lp-kicker">01 \xB7 State</p><h2 class="lp-heading">State lands in the DOM, where CSS can read it.</h2><p class="lp-body">Terracotta never adds a class. It writes ARIA for assistive technology and a <code>tc-</code> attribute for your stylesheet, then gets out of the way. Use the controls on the left and watch the elements panel.</p></header><!--$-->',
  '<!--/--><pre class="lp-css" aria-label="The CSS that styles the switch"><code><span class="lp-tok-sel">.switch</span><span class="lp-tok-attrsel">[tc-checked]</span> <span class="lp-tok-sel">.switch-knob</span> {\n  <span class="lp-tok-prop">translate</span>: 0.95rem 0;\n}</code></pre></section><section class="lp-section lp-section-split"><header class="lp-section-head"><p class="lp-kicker">02 \xB7 Keyboard</p><h2 class="lp-heading">Every key the pattern calls for, already wired.</h2><p class="lp-body">Each component follows its <a href="https://www.w3.org/WAI/ARIA/apg/patterns/"',
  ">WAI-ARIA Authoring Practices</a> pattern: roving focus, type-ahead, Home and End, focus traps and focus return. Tab into the tree and drive it without a mouse.</p></header><!--$-->",
  '<!--/--></section><section class="lp-section"><header class="lp-section-head"><p class="lp-kicker">03 \xB7 Style</p><h2 class="lp-heading"><!--$-->',
  '<!--/--> design systems. Not one line of markup changed.</h2><p class="lp-body">This site is built from Terracotta, and every theme below is only a stylesheet. Pick one and the whole page, the demos included, changes with it.</p></header><!--$-->',
  '<!--/--></section><section class="lp-section" id="components"><header class="lp-section-head"><p class="lp-kicker">04 \xB7 Catalogue</p><h2 class="lp-heading"><!--$-->',
  '<!--/--> components, from a button to a tree grid.</h2></header><ul class="lp-catalogue">',
  '</ul></section><section class="lp-close"><h2 class="lp-close-title">Bring your own pixels.</h2><!--$-->',
  '<!--/--><div class="lp-close-links"><a href="/guides/getting-started"',
  '>Read the guides</a><a href="https://github.com/lxsmnsyc/terracotta" rel="noreferrer"',
  '>GitHub</a><a href="/guides/getting-started#the-claude-code-plugin"',
  '>Claude Code plugin</a><a href="https://github.com/lxsmnsyc/terracotta/tree/1.x" rel="noreferrer"',
  '>Terracotta 1.x for Solid 1</a></div><p class="lp-close-note">MIT licensed. Built with Terracotta, styled by you.</p></section></div>'
];
var _tmpl$15 = [
  "<span",
  ' class="lp-ribbon-run">',
  "</span>"
];
var _tmpl$16 = [
  "<span",
  ' class="lp-ribbon-token">',
  "</span>"
];
var _tmpl$17 = [
  "<span",
  ' class="lp-theme-index" aria-hidden="true">',
  "</span>"
];
var _tmpl$18 = [
  "<span",
  ' class="lp-theme-blurb">',
  "</span>"
];
var _tmpl$19 = [
  "<li",
  ' class="lp-catalogue-item" style="',
  '"><a class="lp-catalogue-link" href="',
  '"',
  '><span class="lp-catalogue-index" aria-hidden="true">',
  '</span><span class="lp-catalogue-name">',
  '</span><span class="lp-catalogue-arrow" aria-hidden="true">&#8599;</span></a></li>'
];
var _lk$ = { href: "/guides/getting-started" };
var _lk$2 = { href: "#components" };
var _lk$3 = { href: "https://www.w3.org/WAI/ARIA/apg/patterns/" };
var _lk$4 = {
  href: "https://github.com/lxsmnsyc/terracotta",
  rel: "noreferrer"
};
var _lk$5 = { href: "/guides/getting-started#the-claude-code-plugin" };
var _lk$6 = {
  href: "https://github.com/lxsmnsyc/terracotta/tree/1.x",
  rel: "noreferrer"
};
var _m$$2 = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _d$$3 = {
  get() {
    const meta = this[_m$$2];
    return [meta()];
  },
  enumerable: true,
  configurable: true
};
function _P$$3(_p, _p2) {
  this[_m$$2] = _p;
  Object.defineProperty(this, "each", _d$$3);
  this.children = _p2;
}
_P$$3.prototype = Object.prototype;
var _d$2$2 = {
  get() {
    return this[_m$$2].name;
  },
  enumerable: true,
  configurable: true
};
function _P$2$2(_p3, _p4) {
  this[_m$$2] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "children", _d$2$2);
}
_P$2$2.prototype = Object.prototype;
var _d$3$2 = {
  get() {
    return this[_m$$2].id;
  },
  enumerable: true,
  configurable: true
};
var _d$4$1 = {
  get() {
    return this[_m$$2].name;
  },
  enumerable: true,
  configurable: true
};
var _d$5 = {
  get() {
    const entry = this[_m$$2];
    var _v$14, _v$16;
    return [RadioGroupLabel(new _P$2$2(entry, "visually-hidden")), (_v$14 = ssrHydrationKey(), _v$16 = () => {
      return ((_v$15) => _v$15 == null ? "" : ssrAttribute("class", ssrClassName(_v$15)))(`lp-chip-swatch theme-swatch-${entry.id}`);
    }, ssr(_tmpl$4, _v$14, _v$16))];
  },
  enumerable: true,
  configurable: true
};
function _P$3$2(_p5, _p6, _p7) {
  this[_m$$2] = _p5;
  this.class = _p6;
  Object.defineProperty(this, "value", _d$3$2);
  Object.defineProperty(this, "title", _d$4$1);
  this.onAnimationEnd = _p7;
  Object.defineProperty(this, "children", _d$5);
}
_P$3$2.prototype = Object.prototype;
var _d$6 = {
  get() {
    const current = this[_m$$2];
    return current();
  },
  enumerable: true,
  configurable: true
};
var _d$7 = {
  get() {
    const advance = this[_m$2];
    return [RadioGroupLabel({
      class: "visually-hidden",
      children: "Specimen theme"
    }), For({
      each: THEMES,
      children: (entry) => {
        return RadioGroupOption(new _P$3$2(entry, "lp-chip", (event) => {
          if (event.animationName === "lp-chip-fill") advance();
        }));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p8, _p9, _p0, _p1) {
  this[_m$$2] = _p8;
  this[_m$2] = _p9;
  this.class = _p0;
  Object.defineProperty(this, "value", _d$6);
  this.onChange = _p1;
  Object.defineProperty(this, "children", _d$7);
}
_P$4.prototype = Object.prototype;
var _d$8 = {
  get() {
    const attributes = this[_m$$2];
    return attributes();
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p10, _p11) {
  this[_m$$2] = _p10;
  Object.defineProperty(this, "each", _d$8);
  this.children = _p11;
}
_P$5.prototype = Object.prototype;
var _d$9 = {
  get() {
    var _v$26, _v$27;
    return [(_v$26 = ssrHydrationKey(), ssr(_tmpl$7, _v$26)), (_v$27 = ssrHydrationKey(), ssr(_tmpl$8, _v$27))];
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p12, _p13, _p14) {
  this.class = _p12;
  this.defaultChecked = _p13;
  this.ref = _p14;
  Object.defineProperty(this, "children", _d$9);
}
_P$6.prototype = Object.prototype;
var _d$10 = {
  get() {
    var _v$30, _v$31;
    return ["Release notes", (_v$30 = ssrHydrationKey(), _v$31 = escape(ChevronRightIcon({})), ssr(_tmpl$9, _v$30, _v$31))];
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p15, _p16) {
  this.class = _p15;
  this.ref = _p16;
  Object.defineProperty(this, "children", _d$10);
}
_P$7.prototype = Object.prototype;
var _d$11 = {
  get() {
    const setDisclosureElement = this[_m$$2];
    return [DisclosureButton(new _P$7("disclosure-button", (element) => {
      setDisclosureElement(element);
    })), DisclosurePanel({
      class: "disclosure-panel",
      children: "The panel leaves the DOM when closed."
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p17, _p18, _p19) {
  this[_m$$2] = _p17;
  this.class = _p18;
  this.defaultOpen = _p19;
  Object.defineProperty(this, "children", _d$11);
}
_P$8.prototype = Object.prototype;
var _d$12 = {
  get() {
    return this[_m$$2].node.name;
  },
  enumerable: true,
  configurable: true
};
function _P$9(_p20) {
  this[_m$$2] = _p20;
  Object.defineProperty(this, "children", _d$12);
}
_P$9.prototype = Object.prototype;
var _d$13 = {
  get() {
    return this[_m$$2].node.children.map((child) => FileItem({ node: child }));
  },
  enumerable: true,
  configurable: true
};
function _P$10(_p21, _p22) {
  this[_m$$2] = _p21;
  this.class = _p22;
  Object.defineProperty(this, "children", _d$13);
}
_P$10.prototype = Object.prototype;
var _d$14 = {
  get() {
    return this[_m$$2].node.name;
  },
  enumerable: true,
  configurable: true
};
function _P$11(_p23, _p24, _p25) {
  this[_m$$2] = _p23;
  this.class = _p24;
  Object.defineProperty(this, "value", _d$14);
  this.children = _p25;
}
_P$11.prototype = Object.prototype;
var _d$15 = {
  get() {
    return FILES.map((node) => FileItem({ node }));
  },
  enumerable: true,
  configurable: true
};
function _P$12(_p26, _p27, _p28, _p29) {
  this.class = _p26;
  this["aria-label"] = _p27;
  this.defaultValue = _p28;
  this.defaultExpanded = _p29;
  Object.defineProperty(this, "children", _d$15);
}
_P$12.prototype = Object.prototype;
var _d$16 = {
  get() {
    return this[_m$$2].name;
  },
  enumerable: true,
  configurable: true
};
function _P$13(_p30, _p31) {
  this[_m$$2] = _p30;
  this.class = _p31;
  Object.defineProperty(this, "children", _d$16);
}
_P$13.prototype = Object.prototype;
var _d$17 = {
  get() {
    return this[_m$$2].id;
  },
  enumerable: true,
  configurable: true
};
var _d$18 = {
  get() {
    const entry = this[_m$$2];
    const index = this[_m$2];
    var _v$65, _v$67, _v$68, _v$69, _v$70, _v$71;
    return [
      (_v$65 = ssrHydrationKey(), _v$67 = () => {
        return ((_v$66) => _v$66 == null ? "" : ssrAttribute("class", ssrClassName(_v$66)))(`lp-theme-swatch theme-swatch-${entry.id}`);
      }, ssr(_tmpl$4, _v$65, _v$67)),
      (_v$68 = ssrHydrationKey(), _v$69 = scope(() => {
        return escape(String(index() + 1).padStart(2, "0"));
      }), ssr(_tmpl$17, _v$68, _v$69)),
      RadioGroupLabel(new _P$13(entry, "lp-theme-name")),
      (_v$70 = ssrHydrationKey(), _v$71 = scope(() => {
        return escape(entry.blurb);
      }), ssr(_tmpl$18, _v$70, _v$71))
    ];
  },
  enumerable: true,
  configurable: true
};
function _P$14(_p32, _p33, _p34) {
  this[_m$$2] = _p32;
  this[_m$2] = _p33;
  this.class = _p34;
  Object.defineProperty(this, "value", _d$17);
  Object.defineProperty(this, "children", _d$18);
}
_P$14.prototype = Object.prototype;
var _d$19 = {
  get() {
    const theme = this[_m$$2];
    return theme();
  },
  enumerable: true,
  configurable: true
};
var _d$20 = {
  get() {
    return [RadioGroupLabel({
      class: "visually-hidden",
      children: "Site theme"
    }), For({
      each: THEMES,
      children: (entry, index) => {
        return RadioGroupOption(new _P$14(entry, index, "lp-theme"));
      }
    })];
  },
  enumerable: true,
  configurable: true
};
function _P$15(_p35, _p36, _p37) {
  this[_m$$2] = _p35;
  this.class = _p36;
  Object.defineProperty(this, "value", _d$19);
  this.onChange = _p37;
  Object.defineProperty(this, "children", _d$20);
}
_P$15.prototype = Object.prototype;
var SPECIMEN = "landing/specimen";
var THEME_COUNT = (_a = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve"
][THEMES.length]) != null ? _a : String(THEMES.length);
var RIBBON = [
  "tc-expanded",
  "aria-controls",
  'tc-checked="mixed"',
  'role="listbox"',
  "tc-selected",
  "aria-activedescendant",
  "tc-active",
  "tc-pressed",
  "aria-orientation",
  "tc-disabled",
  'role="treegrid"',
  "aria-valuenow"
];
function useReveal() {
  const [targets, setTargets] = createSignal([]);
  createEffect(() => targets(), (elements) => {
    if (isServer || elements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.setAttribute("data-in", "");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -12% 0px" });
    for (const element of elements) observer.observe(element);
    onCleanup(() => {
      observer.disconnect();
    });
  });
  return (element) => {
    setTargets((list) => [...list, element]);
  };
}
function InstallChip(props) {
  const [copied, setCopied] = createSignal(false);
  let timer;
  onCleanup(() => {
    clearTimeout(timer);
  });
  var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => {
    return [`lp-install ${!!props.large ? "lp-install-large" : ""}`, ssrAttribute("data-copied", copied() ? "" : escape(void 0, true))];
  }, 2), _v$4 = () => {
    return copied() ? "Copied" : "Copy";
  };
  return ssr(_tmpl$$2, _v$, _g$, _g$, _v$4);
}
function Specimen() {
  const { setTheme } = useTheme();
  const scheme = usePreferredColorScheme();
  const [current, setCurrent] = createSignal(THEMES[0].id);
  const [height, setHeight] = createSignal(320);
  const [paused, setPaused] = createSignal(false);
  const meta = () => {
    var _a2;
    return (_a2 = THEMES.find((entry) => entry.id === current())) != null ? _a2 : THEMES[0];
  };
  const src = () => demoUrl(SPECIMEN, THEMES[0].id, scheme());
  createEffect(() => current(), () => {
  });
  if (!isServer) {
    const onMessage = (event) => {
      if (event.source !== void 0 || event.origin !== window.location.origin) return;
      if (isDemoMessage(event.data) && event.data.kind === "height") setHeight(Math.ceil(event.data.height));
    };
    window.addEventListener("message", onMessage);
    onCleanup(() => {
      window.removeEventListener("message", onMessage);
    });
  }
  function advance() {
    const index = THEMES.findIndex((entry) => entry.id === current());
    setCurrent(THEMES[(index + 1) % THEMES.length].id);
  }
  var _v$5 = ssrHydrationKey(), _v$6 = () => {
    return ssrAttribute("data-paused", paused() ? "" : escape(void 0, true));
  }, _v$7 = () => {
    return paused() ? "Paused" : "Live";
  }, _g$2 = ssrGroup(() => {
    return [ssrAttribute("src", escape(src(), true)), ssrStyleProperty("height:", `${escape(height(), true)}px`)];
  }, 2), _v$10 = escape(For(new _P$$3(meta, (entry) => {
    var _v$12, _v$13;
    return _v$12 = ssrHydrationKey(), _v$13 = scope(() => {
      return escape(entry.name);
    }), ssr(_tmpl$3, _v$12, _v$13);
  }))), _v$11 = escape(RadioGroup(new _P$4(current, advance, "lp-chips", (value) => {
    if (value) setCurrent(value);
  })));
  return ssr(_tmpl$2, _v$5, _v$6, _v$7, _g$2, _g$2, _v$10, _v$11);
}
var SHOWN = /^(role|aria-|tc-)/;
var REFERENCES = /^aria-(controls|labelledby|describedby|activedescendant)$/;
function readAttributes(element) {
  const list = [];
  for (const attribute of element.attributes) if (SHOWN.test(attribute.name)) list.push({
    name: attribute.name,
    value: REFERENCES.test(attribute.name) ? "\u2026" : attribute.value
  });
  return list;
}
function TagLine(props) {
  const [attributes, setAttributes] = createSignal([]);
  const [tag, setTag] = createSignal("button");
  const [fresh, setFresh] = createSignal(/* @__PURE__ */ new Set());
  createEffect(() => props.target(), (element) => {
    if (isServer || !element) return;
    setTag(element.tagName.toLowerCase());
    setAttributes(readAttributes(element));
    let timer;
    const observer = new MutationObserver((records) => {
      const changed = /* @__PURE__ */ new Set();
      for (const record of records) if (record.attributeName && SHOWN.test(record.attributeName)) changed.add(record.attributeName);
      setAttributes(readAttributes(element));
      if (changed.size > 0) {
        setFresh(changed);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setFresh(/* @__PURE__ */ new Set());
        }, 1200);
      }
    });
    observer.observe(element, { attributes: true });
    onCleanup(() => {
      observer.disconnect();
      clearTimeout(timer);
    });
  });
  var _v$17 = ssrHydrationKey(), _v$18 = scope(() => {
    return escape(tag());
  }), _v$19 = escape(For(new _P$5(attributes, (attribute) => {
    var _v$20, _g$3, _v$23, _v$24;
    return _v$20 = ssrHydrationKey(), _g$3 = ssrGroup(() => {
      return [ssrAttribute("data-tc", attribute.name.startsWith("tc-") ? "" : escape(void 0, true)), ssrAttribute("data-fresh", fresh().has(attribute.name) ? "" : escape(void 0, true))];
    }, 2), _v$23 = scope(() => {
      return escape(attribute.name);
    }), _v$24 = scope(() => {
      return escape(attribute.value);
    }), ssr(_tmpl$6, _v$20, _g$3, _g$3, _v$23, _v$24);
  })));
  return ssr(_tmpl$5, _v$17, _v$18, _v$19);
}
function Inspector() {
  const [switchElement, setSwitchElement] = createSignal();
  const [disclosureElement, setDisclosureElement] = createSignal();
  const [toggleElement, setToggleElement] = createSignal();
  var _v$25 = ssrHydrationKey(), _v$28 = escape(Switch(new _P$6("switch", false, (element) => {
    setSwitchElement(element);
  }))), _v$29 = escape(TagLine({ target: switchElement })), _v$32 = escape(Disclosure(new _P$8(setDisclosureElement, "disclosure lp-inspector-disclosure", false))), _v$33 = escape(TagLine({ target: disclosureElement })), _v$34 = escape(Toggle({
    class: "toggle",
    defaultPressed: false,
    ref: (element) => {
      setToggleElement(element);
    },
    children: "Pin"
  })), _v$35 = escape(TagLine({ target: toggleElement }));
  return ssr(_tmpl$10, _v$25, _v$28, _v$29, _v$32, _v$33, _v$34, _v$35);
}
var FILES = [
  {
    name: "src",
    children: [
      {
        name: "components",
        children: [
          { name: "dialog.tsx" },
          { name: "listbox.tsx" },
          { name: "tree.tsx" }
        ]
      },
      {
        name: "states",
        children: [{ name: "disclosure.ts" }, { name: "select.ts" }]
      },
      { name: "index.ts" }
    ]
  },
  { name: "theme.css" },
  { name: "package.json" }
];
function caretFor(item) {
  if (!item.isParent()) return null;
  return item.isExpanded() ? ChevronDownIcon({}) : ChevronRightIcon({});
}
function FileItem(props) {
  return TreeItem(new _P$11(props, "tree-item", (item) => {
    var _v$36, _v$37, _v$38, _v$39;
    return [(_v$36 = ssrHydrationKey(), _v$37 = () => {
      return ssrStyleProperty("padding-inline-start:", `${escape(item.level(), true) - 1}rem`);
    }, _v$38 = scope(() => {
      return escape(caretFor(item));
    }), _v$39 = escape(TreeItemLabel(new _P$9(props))), ssr(_tmpl$11, _v$36, _v$37, _v$38, _v$39)), memo(() => {
      return memo(() => {
        return !!props.node.children;
      })() ? TreeGroup(new _P$10(props, "tree-group")) : props.node.children;
    })];
  }));
}
var KEYS = [
  {
    key: "ArrowUp",
    label: "\u2191"
  },
  {
    key: "ArrowDown",
    label: "\u2193"
  },
  {
    key: "ArrowLeft",
    label: "\u2190"
  },
  {
    key: "ArrowRight",
    label: "\u2192"
  },
  {
    key: "Home",
    label: "Home",
    wide: true
  },
  {
    key: "End",
    label: "End",
    wide: true
  },
  {
    key: "Enter",
    label: "Enter",
    wide: true
  },
  {
    key: "*",
    label: "*"
  },
  {
    key: "type",
    label: "a\u2013z",
    wide: true
  }
];
function Keyboard() {
  const [lit, setLit] = createSignal();
  const [focused, setFocused] = createSignal("Tab into the tree");
  let timer;
  onCleanup(() => {
    clearTimeout(timer);
  });
  var _v$40 = ssrHydrationKey(), _v$41 = escape(Tree(new _P$12("tree", "Project files", void 0, ["src"]))), _v$42 = escape(For({
    each: KEYS,
    children: (entry) => {
      var _v$44, _g$4, _v$47;
      return _v$44 = ssrHydrationKey(), _g$4 = ssrGroup(() => {
        return [`lp-keycap ${!!entry.wide ? "lp-keycap-wide" : ""}`, ssrAttribute("data-lit", lit() === entry.key ? "" : escape(void 0, true))];
      }, 2), _v$47 = scope(() => {
        return escape(entry.label);
      }), ssr(_tmpl$13, _v$44, _g$4, _g$4, _v$47);
    }
  })), _v$43 = scope(() => {
    return escape(focused());
  });
  return ssr(_tmpl$12, _v$40, _v$41, _v$42, _v$43);
}
function Home() {
  var _a2, _b;
  useHead(() => [{
    tag: "title",
    props: { children: "Terracotta \xB7 Headless UI for SolidJS" }
  }, {
    tag: "meta",
    props: {
      name: "description",
      content: "Terracotta is a headless UI library for SolidJS: behaviour, keyboard handling and ARIA wiring, with no styles of its own."
    }
  }]);
  const { setTheme, theme } = useTheme();
  useReveal();
  const [armed, setArmed] = createSignal(false);
  createEffect(() => true, () => {
    if (!isServer) setArmed(true);
  });
  const components = (_b = (_a2 = sections.find((section) => section.title === "Components")) == null ? void 0 : _a2.entries) != null ? _b : [];
  var _v$48 = ssrHydrationKey(), _v$49 = () => {
    return ssrAttribute("data-armed", armed() ? "" : escape(void 0, true));
  }, _v$50 = scope(() => {
    return escape(components.length);
  }), _v$51 = escape(InstallChip({})), _v$52 = escape(Specimen()), _v$53 = escape(For({
    each: [0, 1],
    children: () => {
      var _v$61, _v$62;
      return _v$61 = ssrHydrationKey(), _v$62 = escape(For({
        each: RIBBON,
        children: (token) => {
          var _v$63, _v$64;
          return _v$63 = ssrHydrationKey(), _v$64 = escape(token), ssr(_tmpl$16, _v$63, _v$64);
        }
      })), ssr(_tmpl$15, _v$61, _v$62);
    }
  })), _v$54 = escape(Inspector()), _v$55 = escape(Keyboard()), _v$56 = escape(THEME_COUNT), _v$57 = escape(RadioGroup(new _P$15(theme, "lp-themes", (value) => {
    if (value) setTheme(value);
  }))), _v$58 = scope(() => {
    return escape(components.length);
  }), _v$59 = escape(For({
    each: components,
    children: (entry, index) => {
      var _lv$, _v$72, _g$5, _v$76, _v$77;
      return _v$72 = ssrHydrationKey(), _g$5 = ssrGroup(() => {
        return [
          ssrStyleProperty("--i:", escape(index(), true)),
          escape(_lv$ = `/${entry.slug}`, true),
          ssrLinkClaim({ href: _lv$ })
        ];
      }, 3), _v$76 = scope(() => {
        return escape(String(index() + 1).padStart(2, "0"));
      }), _v$77 = scope(() => {
        return escape(entry.title);
      }), ssr(_tmpl$19, _v$72, _g$5, _g$5, _g$5, _v$76, _v$77);
    }
  })), _v$60 = escape(InstallChip({ large: true }));
  return ssr(_tmpl$14, _v$48, _v$49, ssrLinkClaim(_lk$), ssrLinkClaim(_lk$2), _v$50, _v$51, _v$52, _v$53, _v$54, ssrLinkClaim(_lk$3), _v$55, _v$56, _v$57, _v$58, _v$59, _v$60, ssrLinkClaim(_lk$), ssrLinkClaim(_lk$4), ssrLinkClaim(_lk$5), ssrLinkClaim(_lk$6));
}
var Router = createRouter({ routes: [{
  path: "/demo/*id",
  component: DemoHost
}, {
  path: "/",
  component: DocsLayout,
  children: [{
    path: "/",
    component: Home
  }, {
    path: "/*slug",
    component: DocPage,
    preload: ({ params }) => {
      var _a2;
      loadDoc((_a2 = params.slug) != null ? _a2 : "").catch(() => {
      });
    }
  }]
}] });
var { paths } = Router;
var _tmpl$$1 = ["<div", ' class="page-loading">Loading&#8230;</div>'];
var _m$$1 = /* @__PURE__ */ Symbol();
var _d$$2 = {
  get() {
    var _v$ = ssrHydrationKey();
    return ssr(_tmpl$$1, _v$);
  },
  enumerable: true,
  configurable: true
};
var _d$2$1 = {
  get() {
    return this[_m$$1].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$2(_p) {
  this[_m$$1] = _p;
  Object.defineProperty(this, "fallback", _d$$2);
  Object.defineProperty(this, "children", _d$2$1);
}
_P$$2.prototype = Object.prototype;
var _d$3$1 = {
  get() {
    return Router({ children: (props) => Loading(new _P$$2(props)) });
  },
  enumerable: true,
  configurable: true
};
function _P$2$1() {
  Object.defineProperty(this, "children", _d$3$1);
}
_P$2$1.prototype = Object.prototype;
var _d$4 = {
  get() {
    return ColorSchemeProvider(new _P$2$1());
  },
  enumerable: true,
  configurable: true
};
function _P$3$1() {
  Object.defineProperty(this, "children", _d$4);
}
_P$3$1.prototype = Object.prototype;
function App() {
  return ThemeProvider(new _P$3$1());
}
var _tmpl$ = [
  "<span",
  ' style="font-size:1.5em;text-align:center;position:fixed;left:0;bottom:55%;width:100%">',
  "</span>"
];
var _m$ = /* @__PURE__ */ Symbol();
var _d$$1 = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2) {
  this[_m$] = _p;
  this.fallback = _p2;
  Object.defineProperty(this, "children", _d$$1);
}
_P$$1.prototype = Object.prototype;
function ErrorFallback(props) {
  console.error(props.error());
  httpStatus(500);
  var _v$ = ssrHydrationKey();
  return ssr(_tmpl$, _v$, isServer ? "500 | Internal Server Error" : "Error | Uncaught Client Exception");
}
function DefaultErrorBoundary(props) {
  return Errored(new _P$$1(props, (error) => ErrorFallback({ error })));
}
var _d$ = {
  get() {
    return App();
  },
  enumerable: true,
  configurable: true
};
function _P$() {
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return DefaultErrorBoundary(new _P$());
  },
  enumerable: true,
  configurable: true
};
function _P$2() {
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    return Document(new _P$2());
  },
  enumerable: true,
  configurable: true
};
function _P$3() {
  Object.defineProperty(this, "children", _d$3);
}
_P$3.prototype = Object.prototype;
function render(request, context) {
  var _a2, _b;
  return renderToStream(() => DefaultErrorBoundary(new _P$3()), {
    manifest,
    nonce: (_a2 = getRequestEvent()) == null ? void 0 : _a2.nonce,
    signal: (_b = getRequestEvent()) == null ? void 0 : _b.request.signal
  });
}
function joinAssetPath(base, file) {
  if (typeof base !== "string" || !base) base = "/";
  if (base[base.length - 1] !== "/") base += "/";
  return base + (file[0] === "/" ? file.slice(1) : file);
}
var clientEntryUrl;
function resolveClientEntry() {
  if (clientEntryUrl !== void 0) return clientEntryUrl;
  clientEntryUrl = null;
  const stamped = manifest._entry && manifest[manifest._entry];
  if (stamped && stamped.file) return clientEntryUrl = joinAssetPath(manifest._base, stamped.file);
  for (const key in manifest) {
    const chunk = manifest[key];
    if (chunk && chunk.isEntry && chunk.file) {
      clientEntryUrl = joinAssetPath(manifest._base, chunk.file);
      break;
    }
  }
  return clientEntryUrl;
}
var runMiddleware = (event, next) => next();
function assertRenderMode(mode, source) {
  if (mode !== "stream" && mode !== "async") throw new Error("[@solidjs/vite-plugin] " + source + " must be 'stream' or 'async', got " + JSON.stringify(mode));
  return mode;
}
function assertNonce(nonce, source) {
  if (nonce == null || typeof nonce === "string") return nonce || void 0;
  const prototype = typeof nonce === "object" ? Object.getPrototypeOf(nonce) : void 0;
  const destination = (value) => value === false || typeof value === "string" && value !== "";
  if ((prototype === Object.prototype || prototype === null) && Object.keys(nonce).every((key) => key === "script" || key === "style") && destination(nonce.script) && destination(nonce.style)) return nonce;
  const got = Array.isArray(nonce) ? "an array" : prototype ? "an object with keys " + JSON.stringify(Object.keys(nonce)) : typeof nonce;
  throw new Error("[@solidjs/vite-plugin] " + source + " must be a string, a { script, style } object (each a non-empty string or false), or undefined; got " + got);
}
function assertHostOptions(options) {
  if (options.renderMode !== void 0) assertRenderMode(options.renderMode, "handleRequest options.renderMode");
  assertNonce(options.nonce, "handleRequest options.nonce");
}
function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function nonceAttribute(value) {
  return value ? ' nonce="' + escapeAttribute(value) + '"' : "";
}
function destinationNonce(nonce, destination) {
  const value = typeof nonce === "string" ? nonce : nonce && nonce[destination];
  return typeof value === "string" && value ? value : void 0;
}
function createHtmlChunkTransform(clientEntry, extraHead, nonce) {
  const nonceAttr = nonceAttribute(destinationNonce(nonce, "script"));
  const styleAttr = nonceAttribute(destinationNonce(nonce, "style"));
  let first = true;
  let injected = false;
  return (chunk) => {
    if (!injected && chunk.includes("</head>")) {
      injected = true;
      chunk = chunk.replace("</head>", (styleAttr ? '<meta property="csp-nonce"' + styleAttr + ">" : "") + (clientEntry ? '<script type="module"' + nonceAttr + ' src="' + clientEntry + '" async><\/script>' : "") + "</head>");
    }
    if (first) {
      first = false;
      chunk = "<!DOCTYPE html>" + chunk;
    }
    return chunk;
  };
}
async function dispatchRequest(event, options, consumed) {
  event.request;
  const clientEntry = options.clientEntry || resolveClientEntry();
  if (options.renderMode !== void 0) event.renderMode = options.renderMode;
  if (options.nonce !== void 0) event.nonce = options.nonce;
  const renderMode = event.renderMode === void 0 || event.renderMode === null ? "stream" : assertRenderMode(event.renderMode, "event.renderMode");
  const nonce = assertNonce(event.nonce, "event.nonce");
  consumed.rendered = true;
  consumed.nonce = event.nonce;
  consumed.renderMode = event.renderMode;
  ({
    ...options.context
  });
  let result = render();
  if (result && typeof result.pipe !== "function" && typeof result.then === "function") result = await result;
  if (renderMode === "async" && result && typeof result.then === "function") result = await result;
  if (result instanceof Response) return result;
  return createSSRResponse(result, event, {
    responseInit: options.responseInit,
    nonce: destinationNonce(nonce, "script") || null,
    transformChunk: createHtmlChunkTransform(clientEntry, options.devHead, nonce)
  });
}
function containFailure(error, event) {
  try {
    const thrown = isResponseEnvelope(error) ? error.response : error;
    if (thrown instanceof Response && thrown.status !== 0) return thrown;
  } catch {
  }
  reportRequestFailure(error, event);
  return new Response(null, { status: 500 });
}
async function handleRequest(request, options = {}) {
  assertHostOptions(options);
  const event = createRequestEvent(request, options.event);
  if (options.nonce !== void 0) event.nonce = options.nonce;
  if (options.renderMode !== void 0) event.renderMode = options.renderMode;
  const consumed = { rendered: false };
  const response = await provideRequestEvent(event, async () => {
    try {
      return await runMiddleware(event, () => dispatchRequest(event, options, consumed));
    } catch (error) {
      return containFailure(error, event);
    }
  });
  return commitEventResponse(response, event);
}

const _____ = fromWebHandler((request) => handleRequest(request));

const _____$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: _____
});

export { DISABLED_NODE as $, lockFocus as A, Button as B, ChevronRightIcon as C, focusPanelAfterTransition as D, DisclosureStateChild as E, FocusNavigator as F, DisclosureStateProvider as G, CheckIcon as H, createPresence as I, createCheckState as J, useCheckState as K, createCheckedState as L, createARIACheckedState as M, CheckStateProvider as N, CheckStateChild as O, PanelTreeContext as P, MinusIcon as Q, RadioGroup as R, SelectStateProvider as S, RadioGroupLabel as T, Unmountable as U, RadioGroupOption as V, createMultipleAutocompleteState as W, createSingleAutocompleteState as X, MATCHES_NODE as Y, AutocompleteStateProvider as Z, useAutocompleteState as _, createSingleSelectState as a, afterTransition as a0, createHasQueryState as a1, AutocompleteStateChild as a2, SELECTED_NODE as a3, createAutocompleteOptionState as a4, useVirtualFocus as a5, createARIASelectedState as a6, createMatchesState as a7, AutocompleteOptionStateProvider as a8, CommandBar as a9, Tab as aA, CloseIcon as aB, Toggle as aC, focusLast as aD, focusNext as aE, focusPrev as aF, waitForTransition as aG, Tree as aH, TreeItem as aI, TreeItemLabel as aJ, TreeGroup as aK, isEqual as aL, _____$1 as aM, CommandBarOverlay as aa, CommandBarPanel as ab, CommandBarTitle as ac, CommandBarDescription as ad, Command as ae, CommandLabel as af, CommandInput as ag, CommandOptions as ah, CommandOption as ai, useFocusStartPoint as aj, focusFirst as ak, getFocusableElements as al, createTypeAhead as am, Disclosure as an, DisclosureButton as ao, DisclosurePanel as ap, Switch as aq, renderChildren as ar, ChevronDownIcon as as, useSelectState as at, onFocusLeave as au, RadioGroupDescription as av, PlusIcon as aw, TabGroup as ax, TabList as ay, TabPanel as az, createForwardRef as b, createMultipleSelectState as c, createSelectOptionState as d, createTag as e, assert as f, SelectOptionStateProvider as g, createHasActiveState as h, createHasSelectedState as i, createDisabledState as j, createActiveState as k, createExpandedState as l, mergeFunc as m, createSelectedState as n, useSelectOptionState as o, SelectOptionStateChild as p, createOwnerAttribute as q, createARIADisabledState as r, createARIAExpandedState as s, createMountedID as t, useEventListener as u, createDisclosureState as v, createPanelNode as w, createModalFocus as x, useDisclosureState as y, createDependencyList as z };
//# sourceMappingURL=_..._.mjs.map
