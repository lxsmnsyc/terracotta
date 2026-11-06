import { b as createForwardRef, m as mergeFunc, u as useEventListener, al as getFocusableElements, e as createTag, $ as DISABLED_NODE, aD as focusLast, ak as focusFirst, aE as focusNext, aF as focusPrev } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';

var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    const isHorizontal = this[_m$];
    return isHorizontal() ? "horizontal" : "vertical";
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2, _p3) {
  this[_m$] = _p;
  this.role = _p2;
  this.ref = _p3;
  Object.defineProperty(this, "aria-orientation", _d$);
}
_P$.prototype = Object.prototype;
var TOOLBAR_TAG = createTag("toolbar");
function Toolbar(props) {
  const [internalRef, setInternalRef] = createForwardRef(props);
  const isHorizontal = () => props.horizontal == null ? true : props.horizontal;
  let focusedElement;
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      let restore = function() {
        for (const [element, value] of demoted) if (value == null) element.removeAttribute("tabindex");
        else element.setAttribute("tabindex", value);
        demoted.clear();
      }, getItems = function() {
        restore();
        return getFocusableElements(root);
      }, pickStop = function(items) {
        var _a;
        const active = document.activeElement;
        if (active instanceof HTMLElement && items.includes(active)) return active;
        if (focusedElement && items.includes(focusedElement)) return focusedElement;
        return (_a = items.find((item) => !item.matches(DISABLED_NODE))) != null ? _a : items[0];
      }, update = function(items = getItems()) {
        const stop = pickStop(items);
        for (const item of items) if (item !== stop) {
          demoted.set(item, item.getAttribute("tabindex"));
          item.setAttribute("tabindex", "-1");
        }
        observer.takeRecords();
      }, move = function(navigate) {
        const items = getItems();
        const target = document.activeElement;
        const result = target instanceof HTMLElement && root.contains(target) ? navigate(items, target) : void 0;
        update(items);
        return !!result;
      };
      const root = current;
      const demoted = /* @__PURE__ */ new Map();
      const observer = new MutationObserver((records) => {
        for (const record of records) {
          const target = record.target;
          if (record.attributeName === "tabindex" && demoted.has(target)) demoted.set(target, target.getAttribute("tabindex"));
        }
        update();
      });
      observer.observe(current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [
          "tabindex",
          "disabled",
          "hidden",
          "inert",
          "tc-disabled"
        ]
      });
      update();
      return mergeFunc(() => {
        observer.disconnect();
        restore();
      }, useEventListener(current, "keydown", (e) => {
        switch (e.key) {
          case "ArrowLeft":
            if (isHorizontal()) {
              e.preventDefault();
              move((items, target) => focusPrev(items, target, false, false));
            }
            break;
          case "ArrowUp":
            if (!isHorizontal()) {
              e.preventDefault();
              move((items, target) => focusPrev(items, target, false, false));
            }
            break;
          case "ArrowRight":
            if (isHorizontal()) {
              e.preventDefault();
              move((items, target) => focusNext(items, target, false, false));
            }
            break;
          case "ArrowDown":
            if (!isHorizontal()) {
              e.preventDefault();
              move((items, target) => focusNext(items, target, false, false));
            }
            break;
          case "Home":
            if (move((items) => focusFirst(items, false))) e.preventDefault();
            break;
          case "End":
            if (move((items) => focusLast(items, false))) e.preventDefault();
        }
      }), useEventListener(current, "focusin", (e) => {
        if (e.target instanceof HTMLElement && e.target !== current) {
          const items = getItems();
          if (items.includes(e.target)) focusedElement = e.target;
          update(items);
        }
      }));
    }
  });
  const rest = omit(props, "as", "horizontal", "ref");
  return dynamic(() => props.as || "div")(mergeProps(TOOLBAR_TAG, new _P$(isHorizontal, "toolbar", setInternalRef), rest));
}

export { Toolbar as T };
//# sourceMappingURL=toolbar-C_j5AYNQ.mjs.map
