// src/headless/Disclosure.tsx
import {
  createContext,
  useContext
} from "solid-js";

// src/utils/use-controlled-signal.ts
import { createSignal } from "solid-js";
function useControlledSignal(initialValue, read, write) {
  if (read) {
    return [read, write];
  }
  const [signal, setSignal] = createSignal(initialValue);
  return [
    signal,
    (value) => {
      setSignal(() => value);
      write(value);
    }
  ];
}

// src/headless/Disclosure.tsx
function useHeadlessDisclosure(options = {}) {
  const isControlled = "CONTROLLED" in options ? options.CONTROLLED : "isOpen" in options;
  const [signal, setSignal] = useControlledSignal(!!options.defaultOpen, isControlled ? () => !!options.isOpen : void 0, (value) => {
    var _a;
    return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
  });
  return {
    isOpen() {
      return signal();
    },
    setState(value) {
      if (!options.disabled) {
        setSignal(value);
      }
    },
    disabled() {
      return !!options.disabled;
    }
  };
}
var HeadlessDisclosureContext = createContext();
function isHeadlessDisclosureRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessDisclosureRoot(props) {
  const properties = useHeadlessDisclosure(props);
  return <HeadlessDisclosureContext.Provider value={properties}>{(() => {
    const body = props.children;
    if (isHeadlessDisclosureRootRenderProp(body)) {
      return body(properties);
    }
    return body;
  })()}</HeadlessDisclosureContext.Provider>;
}
function useHeadlessDisclosureChild() {
  const properties = useContext(HeadlessDisclosureContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useDisclosureChild` must be used within DisclosureRoot.");
}
function isHeadlessDisclosureChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessDisclosureChild(props) {
  const properties = useHeadlessDisclosureChild();
  const body = props.children;
  if (isHeadlessDisclosureChildRenderProp(body)) {
    return body(properties);
  }
  return body;
}

// src/headless/Select.tsx
import {
  createContext as createContext2,
  createSignal as createSignal2,
  untrack,
  useContext as useContext2
} from "solid-js";
function useHeadlessSelect(options) {
  var _a, _b;
  const [active, setActive] = createSignal2();
  if (options.multiple) {
    const isControlled2 = "CONTROLLED" in options ? options.CONTROLLED : "value" in options;
    const [selectedValues, setSelectedValues] = useControlledSignal((_a = options.defaultValue) != null ? _a : [], isControlled2 ? () => {
      var _a2;
      return (_a2 = options.value) != null ? _a2 : [];
    } : void 0, (value) => {
      var _a2;
      return (_a2 = options.onChange) == null ? void 0 : _a2.call(options, value != null ? value : []);
    });
    return {
      isSelected(value) {
        return new Set(selectedValues()).has(value);
      },
      select(value) {
        const set = new Set(untrack(selectedValues));
        if (options.toggleable && set.has(value)) {
          set.delete(value);
        } else {
          set.add(value);
        }
        setSelectedValues([
          ...set
        ]);
      },
      hasSelected() {
        return selectedValues().length > 0;
      },
      disabled() {
        return !!options.disabled;
      },
      hasActive() {
        return !!active();
      },
      isActive(value) {
        const ref = active();
        if (ref) {
          return Object.is(value, ref.value);
        }
        return false;
      },
      focus(value) {
        return setActive({
          value
        });
      },
      blur() {
        return setActive(void 0);
      }
    };
  }
  const isControlled = "CONTROLLED" in options ? options.CONTROLLED : "value" in options;
  const [selectedValue, setSelectedValue] = useControlledSignal((_b = options.defaultValue) != null ? _b : void 0, isControlled ? () => options.value : void 0, (value) => {
    var _a2;
    return (_a2 = options.onChange) == null ? void 0 : _a2.call(options, value);
  });
  return {
    isSelected(value) {
      return Object.is(value, selectedValue());
    },
    select(value) {
      if (options.toggleable && Object.is(untrack(selectedValue), value)) {
        setSelectedValue(void 0);
      } else {
        setSelectedValue(value);
      }
    },
    hasSelected() {
      return selectedValue() != null;
    },
    disabled() {
      return !!options.disabled;
    },
    hasActive() {
      return !!active();
    },
    isActive(value) {
      const ref = active();
      if (ref) {
        return Object.is(value, ref.value);
      }
      return false;
    },
    focus(value) {
      return setActive({
        value
      });
    },
    blur() {
      return setActive(void 0);
    }
  };
}
var HeadlessSelectContext = createContext2();
function isHeadlessSelectRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessSelectRoot(props) {
  const properties = useHeadlessSelect(props);
  return <HeadlessSelectContext.Provider value={properties}>{(() => {
    const body = props.children;
    if (isHeadlessSelectRootRenderProp(body)) {
      return body(properties);
    }
    return body;
  })()}</HeadlessSelectContext.Provider>;
}
function useHeadlessSelectChild() {
  const properties = useContext2(HeadlessSelectContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessSelectChild` must be used within HeadlessSelectRoot.");
}
function isHeadlessSelectChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessSelectChild(props) {
  const properties = useHeadlessSelectChild();
  const body = props.children;
  if (isHeadlessSelectChildRenderProp(body)) {
    return body(properties);
  }
  return body;
}
function useHeadlessSelectOption(value, disabled) {
  const properties = useHeadlessSelectChild();
  const isDisabled = () => (disabled == null ? void 0 : disabled()) || properties.disabled();
  return {
    isSelected() {
      return properties.isSelected(value());
    },
    isActive() {
      return properties.isActive(value());
    },
    select() {
      if (!isDisabled()) {
        properties.select(value());
      }
    },
    focus() {
      if (!isDisabled()) {
        properties.focus(value());
      }
    },
    blur() {
      if (!isDisabled() && this.isActive()) {
        properties.blur();
      }
    },
    disabled: isDisabled
  };
}
function isHeadlessSelectOptionRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
var HeadlessSelectOptionContext = createContext2();
function HeadlessSelectOption(props) {
  const properties = useHeadlessSelectOption(() => props.value, () => !!props.disabled);
  return <HeadlessSelectOptionContext.Provider value={properties}>{(() => {
    const body = props.children;
    if (isHeadlessSelectOptionRenderProp(body)) {
      return body(properties);
    }
    return body;
  })()}</HeadlessSelectOptionContext.Provider>;
}
function useHeadlessSelectOptionChild() {
  const properties = useContext2(HeadlessSelectOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessSelectChild` must be used within HeadlessSelectOption");
}
function HeadlessSelectOptionChild(props) {
  const properties = useHeadlessSelectOptionChild();
  const body = props.children;
  if (isHeadlessSelectOptionRenderProp(body)) {
    return body(properties);
  }
  return body;
}

// src/headless/Toggle.tsx
import {
  createContext as createContext3,
  useContext as useContext3
} from "solid-js";
function useHeadlessToggle(options = {}) {
  const isControlled = "CONTROLLED" in options ? options.CONTROLLED : "checked" in options;
  const [signal, setSignal] = useControlledSignal(options.defaultChecked, isControlled ? () => options.checked : void 0, (value) => {
    var _a;
    return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
  });
  return {
    checked() {
      return signal();
    },
    setState(value) {
      var _a;
      if (!options.disabled) {
        setSignal(value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      }
    },
    disabled() {
      return !!options.disabled;
    }
  };
}
var HeadlessToggleContext = createContext3();
function isHeadlessToggleRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessToggleRoot(props) {
  const properties = useHeadlessToggle(props);
  return <HeadlessToggleContext.Provider value={properties}>{(() => {
    const body = props.children;
    if (isHeadlessToggleRootRenderProp(body)) {
      return body(properties);
    }
    return body;
  })()}</HeadlessToggleContext.Provider>;
}
function useHeadlessToggleChild() {
  const properties = useContext3(HeadlessToggleContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useToggleChild` must be used within ToggleRoot.");
}
function isHeadlessToggleChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessToggleChild(props) {
  const properties = useHeadlessToggleChild();
  const body = props.children;
  if (isHeadlessToggleChildRenderProp(body)) {
    return body(properties);
  }
  return body;
}

// src/components/Transition.tsx
import {
  createContext as createContext4,
  createEffect,
  createSignal as createSignal3,
  Show,
  useContext as useContext4
} from "solid-js";
import {
  Dynamic
} from "solid-js/web";
import {
  omitProps
} from "solid-use";

// src/utils/dynamic-prop.ts
function isRefFunction(callback) {
  return typeof callback === "function";
}
function createRef(props, callback) {
  return (e) => {
    if ("ref" in props) {
      if (isRefFunction(props.ref)) {
        props.ref(e);
      } else {
        props.ref = e;
      }
    }
    callback(e);
  };
}

// src/components/Transition.tsx
var TransitionRootContext = createContext4();
function useTransitionRootContext(componentName) {
  const context = useContext4(TransitionRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Transition>`);
}
function addClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}
function TransitionChild(props) {
  var _a, _b, _c;
  const values = useTransitionRootContext("TransitionChild");
  const [visible, setVisible] = createSignal3(values.show);
  const [ref, setRef] = createSignal3();
  let initial = true;
  function transition(element, shouldEnter) {
    var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    if (shouldEnter) {
      if (initial) {
        const enter = (_b2 = (_a2 = props.enter) == null ? void 0 : _a2.split(" ")) != null ? _b2 : [];
        const enterFrom = (_d = (_c2 = props.enterFrom) == null ? void 0 : _c2.split(" ")) != null ? _d : [];
        const enterTo = (_f = (_e = props.enterTo) == null ? void 0 : _e.split(" ")) != null ? _f : [];
        const entered = (_h = (_g = props.entered) == null ? void 0 : _g.split(" ")) != null ? _h : [];
        const endTransition = () => {
          var _a3;
          removeClassList(element, enter);
          removeClassList(element, enterTo);
          addClassList(element, entered);
          (_a3 = props.afterEnter) == null ? void 0 : _a3.call(props);
        };
        (_i = props.beforeEnter) == null ? void 0 : _i.call(props);
        addClassList(element, enter);
        addClassList(element, enterFrom);
        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          addClassList(element, enterTo);
          element.addEventListener("transitionend", endTransition, { once: true });
          element.addEventListener("animationend", endTransition, { once: true });
        });
      }
    } else {
      const leave = (_k = (_j = props.leave) == null ? void 0 : _j.split(" ")) != null ? _k : [];
      const leaveFrom = (_m = (_l = props.leaveFrom) == null ? void 0 : _l.split(" ")) != null ? _m : [];
      const leaveTo = (_o = (_n = props.leaveTo) == null ? void 0 : _n.split(" ")) != null ? _o : [];
      const entered = (_q = (_p = props.entered) == null ? void 0 : _p.split(" ")) != null ? _q : [];
      (_r = props.beforeLeave) == null ? void 0 : _r.call(props);
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        addClassList(element, leaveTo);
      });
      const endTransition = () => {
        var _a3;
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        (_a3 = props.afterLeave) == null ? void 0 : _a3.call(props);
      };
      element.addEventListener("transitionend", endTransition, { once: true });
      element.addEventListener("animationend", endTransition, { once: true });
    }
  }
  createEffect(() => {
    const shouldShow = values.show;
    if (shouldShow) {
      setVisible(true);
    }
    const internalRef = ref();
    if (internalRef instanceof HTMLElement) {
      transition(internalRef, shouldShow);
    } else {
      initial = true;
    }
  });
  return <Show when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic component={(_b = props.as) != null ? _b : "div"} {...omitProps(props, [
    "as",
    "enter",
    "enterFrom",
    "enterTo",
    "leave",
    "leaveFrom",
    "leaveTo",
    "unmount",
    "afterEnter",
    "afterLeave",
    "appear",
    "beforeEnter",
    "beforeLeave",
    "entered",
    "ref"
  ])} ref={createRef(props, (e) => {
    setRef(() => e);
  })}>{props.children}</Dynamic>}><Show when={visible()}><Dynamic component={(_c = props.as) != null ? _c : "div"} {...omitProps(props, [
    "as",
    "enter",
    "enterFrom",
    "enterTo",
    "leave",
    "leaveFrom",
    "leaveTo",
    "unmount",
    "afterEnter",
    "afterLeave",
    "appear",
    "beforeEnter",
    "beforeLeave",
    "entered",
    "ref"
  ])} ref={createRef(props, (e) => {
    setRef(() => e);
  })}>{props.children}</Dynamic></Show></Show>;
}
function Transition(props) {
  const excludedProps = omitProps(props, [
    "show"
  ]);
  return <TransitionRootContext.Provider value={{
    get show() {
      return props.show;
    }
  }}><TransitionChild {...excludedProps} /></TransitionRootContext.Provider>;
}

// src/components/Disclosure.tsx
import {
  createContext as createContext5,
  createEffect as createEffect3,
  createSignal as createSignal5,
  createUniqueId as createUniqueId2,
  onCleanup as onCleanup2,
  Show as Show2,
  useContext as useContext5
} from "solid-js";
import {
  Dynamic as Dynamic3
} from "solid-js/web";
import {
  omitProps as omitProps3
} from "solid-use";

// src/utils/Fragment.tsx
function Fragment(props) {
  return props.children;
}

// src/components/Button.tsx
import {
  createEffect as createEffect2,
  createSignal as createSignal4,
  createUniqueId,
  onCleanup
} from "solid-js";
import {
  Dynamic as Dynamic2
} from "solid-js/web";
import {
  omitProps as omitProps2
} from "solid-use";
function Button(props) {
  var _a;
  const buttonID = createUniqueId();
  const [internalRef, setInternalRef] = createSignal4();
  createEffect2(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (ref.tagName !== "BUTTON") {
        const onKeyDown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            ref.click();
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <Dynamic2 component={(_a = props.as) != null ? _a : "button"} id={buttonID} tabindex={0} role="button" disabled={props.disabled} {...omitProps2(props, [
    "as",
    "disabled",
    "ref"
  ])} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-button={buttonID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} />;
}

// src/components/Disclosure.tsx
var DisclosureContext = createContext5();
function useDisclosureContext(componentName) {
  const context = useContext5(DisclosureContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Disclosure>`);
}
function Disclosure(props) {
  var _a;
  const ownerID = createUniqueId2();
  const buttonID = createUniqueId2();
  const panelID = createUniqueId2();
  return <DisclosureContext.Provider value={{
    ownerID,
    buttonID,
    panelID
  }}><Dynamic3 component={(_a = props.as) != null ? _a : Fragment} {...omitProps3(props, [
    "isOpen",
    "as",
    "children",
    "disabled",
    "defaultOpen",
    "onChange"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-disclosure={ownerID}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={props.onChange} disabled={props.disabled} defaultOpen={props.defaultOpen}>{props.children}</HeadlessDisclosureRoot></Dynamic3></DisclosureContext.Provider>;
}
function DisclosureButton(props) {
  const context = useDisclosureContext("DisclosureButton");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal5();
  createEffect3(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      onCleanup2(() => {
        ref.removeEventListener("click", toggle);
      });
    }
  });
  return <Dynamic3 component={Button} {...omitProps3(props, [
    "children",
    "ref"
  ])} id={context.buttonID} aria-disabled={properties.disabled() || props.disabled} aria-expanded={properties.isOpen()} aria-controls={properties.isOpen() && context.panelID} data-sh-expanded={properties.isOpen()} data-sh-disabled={properties.disabled() || props.disabled} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} data-sh-disclosure-button={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic3>;
}
function DisclosurePanel(props) {
  var _a, _b, _c;
  const context = useDisclosureContext("DisclosurePanel");
  const properties = useHeadlessDisclosureChild();
  return <Show2 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic3 component={(_b = props.as) != null ? _b : "div"} {...omitProps3(props, [
    "as",
    "unmount",
    "children"
  ])} id={context.panelID} data-sh-disclosure-panel={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic3>}><Show2 when={properties.isOpen()}><Dynamic3 component={(_c = props.as) != null ? _c : "div"} {...omitProps3(props, [
    "as",
    "unmount",
    "children"
  ])} id={context.panelID} data-sh-disclosure-panel={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic3></Show2></Show2>;
}

// src/components/Accordion.tsx
import {
  createContext as createContext6,
  createUniqueId as createUniqueId3,
  useContext as useContext6,
  Show as Show3,
  createEffect as createEffect4,
  onCleanup as onCleanup3,
  createSignal as createSignal6
} from "solid-js";
import {
  Dynamic as Dynamic4
} from "solid-js/web";
import {
  omitProps as omitProps4
} from "solid-use";

// src/utils/query-nodes.ts
function queryNodes(el, tag, ownerID) {
  return el.querySelectorAll(`[data-sh-${tag}="${ownerID}"]`);
}
var ACCORDION_BUTTON = "accordion-button";
function queryAccordionButtons(el, ownerID) {
  return queryNodes(el, ACCORDION_BUTTON, ownerID);
}
var LISTBOX_OPTION = "listbox-option";
function queryListboxOptions(el, ownerID) {
  return queryNodes(el, LISTBOX_OPTION, ownerID);
}
var MENU_ITEM = "menu-item";
function queryMenuItems(el, ownerID) {
  return queryNodes(el, MENU_ITEM, ownerID);
}
var RADIO = "radio";
function queryRadios(el, ownerID) {
  return queryNodes(el, RADIO, ownerID);
}
var SELECT_OPTION = "select-option";
function querySelectOptions(el, ownerID) {
  return queryNodes(el, SELECT_OPTION, ownerID);
}
var FEED_ARTICLE = "feed-article";
function queryFeedArticles(el, ownerID) {
  return queryNodes(el, FEED_ARTICLE, ownerID);
}

// src/components/Accordion.tsx
var AccordionContext = createContext6();
function useAccordionContext(componentName) {
  const context = useContext6(AccordionContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}
var AccordionItemContext = createContext6();
function useAccordionItemContext(componentName) {
  const context = useContext6(AccordionItemContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AccordionItem>`);
}
function Accordion(props) {
  var _a;
  const ownerID = createUniqueId3();
  let internalRef;
  function setChecked(node) {
    node.focus();
  }
  function setNextChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === len - 1) {
            setChecked(radios[0]);
          } else {
            setChecked(radios[i + 1]);
          }
          break;
        }
      }
    }
  }
  function setPrevChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === 0) {
            setChecked(radios[len - 1]);
          } else {
            setChecked(radios[i - 1]);
          }
          break;
        }
      }
    }
  }
  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
      setChecked(radios[0]);
    }
  }
  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
      setChecked(radios[radios.length - 1]);
    }
  }
  return <AccordionContext.Provider value={{
    ownerID,
    setChecked,
    setNextChecked,
    setPrevChecked,
    setFirstChecked,
    setLastChecked
  }}><Dynamic4 component={(_a = props.as) != null ? _a : "div"} {...omitProps4(props, [
    "as",
    "children",
    "disabled",
    "defaultValue",
    "onChange",
    "multiple",
    "toggleable",
    "value",
    "ref"
  ])} ref={createRef(props, (e) => {
    internalRef = e;
  })} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-accordion={ownerID}><HeadlessSelectRoot CONTROLLED={"value" in props} multiple={props.multiple} value={props.value} defaultValue={props.defaultValue} toggleable={props.toggleable} disabled={props.disabled} onChange={props.onChange}>{props.children}</HeadlessSelectRoot></Dynamic4></AccordionContext.Provider>;
}
function AccordionItem(props) {
  var _a;
  const buttonID = createUniqueId3();
  const panelID = createUniqueId3();
  return <AccordionItemContext.Provider value={{
    buttonID,
    panelID
  }}><Dynamic4 component={(_a = props.as) != null ? _a : "div"} {...omitProps4(props, [
    "as",
    "children",
    "value",
    "disabled"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></Dynamic4></AccordionItemContext.Provider>;
}
function AccordionHeader(props) {
  var _a;
  return <Dynamic4 component={(_a = props.as) != null ? _a : "h3"} {...omitProps4(props, [
    "as",
    "children"
  ])}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></Dynamic4>;
}
function AccordionButton(props) {
  const rootContext = useAccordionContext("AccordionButton");
  const itemContext = useAccordionItemContext("AccordionButton");
  const properties = useHeadlessSelectOptionChild();
  const [internalRef, setInternalRef] = createSignal6();
  createEffect4(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case "ArrowUp":
              e.preventDefault();
              rootContext.setPrevChecked(ref);
              break;
            case "ArrowDown":
              e.preventDefault();
              rootContext.setNextChecked(ref);
              break;
            case "Home":
              e.preventDefault();
              rootContext.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              rootContext.setLastChecked();
              break;
            default:
              break;
          }
        }
      };
      const onClick = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.select();
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus();
        }
      };
      const onBlur = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      onCleanup3(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return <Dynamic4 component={Button} {...omitProps4(props, [
    "children",
    "ref",
    "disabled",
    "as"
  ])} id={itemContext.buttonID} aria-expanded={properties.isSelected()} aria-controls={properties.isSelected() && itemContext.panelID} aria-disabled={properties.disabled() || props.disabled} data-sh-disabled={properties.disabled() || props.disabled} data-sh-expanded={properties.isSelected()} data-sh-active={properties.isActive()} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} data-sh-accordion-button={rootContext.ownerID}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></Dynamic4>;
}
function AccordionPanel(props) {
  var _a, _b, _c;
  const context = useAccordionItemContext("AccordionPanel");
  const properties = useHeadlessSelectOptionChild();
  return <Show3 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic4 component={(_b = props.as) != null ? _b : "div"} {...omitProps4(props, [
    "as",
    "children",
    "unmount"
  ])} id={context.panelID} aria-labelledby={context.buttonID}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></Dynamic4>}><Show3 when={properties.isSelected()}><Dynamic4 component={(_c = props.as) != null ? _c : "div"} {...omitProps4(props, [
    "as",
    "children",
    "unmount"
  ])} id={context.panelID} aria-labelledby={context.buttonID}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></Dynamic4></Show3></Show3>;
}

// src/components/RadioGroup.tsx
import {
  createContext as createContext7,
  createEffect as createEffect5,
  createSignal as createSignal7,
  createUniqueId as createUniqueId4,
  onCleanup as onCleanup4,
  useContext as useContext7
} from "solid-js";
import {
  Dynamic as Dynamic5
} from "solid-js/web";
import {
  omitProps as omitProps5
} from "solid-use";
var RadioGroupContext = createContext7();
function useRadioGroupContext(componentName) {
  const context = useContext7(RadioGroupContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`);
}
var RadioGroupRootContext = createContext7();
function useRadioGroupRootContext(componentName) {
  const context = useContext7(RadioGroupRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}
function RadioGroup(props) {
  var _a;
  const ownerID = createUniqueId4();
  const descriptionID = createUniqueId4();
  const labelID = createUniqueId4();
  let internalRef;
  function setChecked(node) {
    node.focus();
  }
  function setNextChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryRadios(internalRef, ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === len - 1) {
            setChecked(radios[0]);
          } else {
            setChecked(radios[i + 1]);
          }
          break;
        }
      }
    }
  }
  function setPrevChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryRadios(internalRef, ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === 0) {
            setChecked(radios[len - 1]);
          } else {
            setChecked(radios[i - 1]);
          }
          break;
        }
      }
    }
  }
  return <RadioGroupRootContext.Provider value={{
    ownerID,
    setChecked,
    setNextChecked,
    setPrevChecked
  }}><RadioGroupContext.Provider value={{
    descriptionID,
    labelID
  }}><Dynamic5 component={(_a = props.as) != null ? _a : "div"} {...omitProps5(props, [
    "as",
    "children",
    "value",
    "disabled",
    "onChange",
    "ref",
    "defaultValue"
  ])} role="radiogroup" aria-labelledby={labelID} aria-describedby={descriptionID} aria-disabled={props.disabled} data-sh-disabled={props.disabled} disabled={props.disabled} ref={createRef(props, (e) => {
    internalRef = e;
  })} data-sh-radiogroup={ownerID}><HeadlessSelectRoot CONTROLLED={"value" in props} defaultValue={props.defaultValue} value={props.value} disabled={props.disabled} onChange={props.onChange}>{props.children}</HeadlessSelectRoot></Dynamic5></RadioGroupContext.Provider></RadioGroupRootContext.Provider>;
}
function RadioGroupOption(props) {
  var _a;
  const context = useRadioGroupRootContext("RadioGroupOption");
  const properties = useHeadlessSelectChild();
  const descriptionID = createUniqueId4();
  const labelID = createUniqueId4();
  const [internalRef, setInternalRef] = createSignal7();
  createEffect5(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case "ArrowLeft":
            case "ArrowUp":
              e.preventDefault();
              context.setPrevChecked(ref);
              break;
            case "ArrowRight":
            case "ArrowDown":
              e.preventDefault();
              context.setNextChecked(ref);
              break;
            case " ":
            case "Enter":
              if (ref.tagName === "BUTTON") {
                e.preventDefault();
              }
              context.setChecked(ref);
              break;
            default:
              break;
          }
        }
      };
      const onClick = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus(props.value);
          properties.select(props.value);
        }
      };
      const onBlur = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      onCleanup4(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return <RadioGroupContext.Provider value={{
    descriptionID,
    labelID
  }}><Dynamic5 component={(_a = props.as) != null ? _a : "div"} {...omitProps5(props, [
    "as",
    "children",
    "value",
    "disabled",
    "ref"
  ])} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} role="radio" disabled={props.disabled} tabindex={properties.isSelected(props.value) ? 0 : -1} aria-disabled={props.disabled} aria-checked={properties.isSelected(props.value)} aria-labelledby={labelID} aria-describedby={descriptionID} data-sh-radio={context.ownerID} data-sh-checked={properties.isSelected(props.value)} data-sh-disabled={props.disabled}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></Dynamic5></RadioGroupContext.Provider>;
}
function RadioGroupLabel(props) {
  var _a;
  const context = useRadioGroupContext("RadioGroupLabel");
  return <Dynamic5 component={(_a = props.as) != null ? _a : "label"} {...omitProps5(props, [
    "as"
  ])} id={context.labelID}>{props.children}</Dynamic5>;
}
function RadioGroupDescription(props) {
  var _a;
  const context = useRadioGroupContext("RadioGroupLabel");
  return <Dynamic5 component={(_a = props.as) != null ? _a : "div"} {...omitProps5(props, [
    "as"
  ])} id={context.descriptionID}>{props.children}</Dynamic5>;
}

// src/components/Listbox.tsx
import {
  createContext as createContext8,
  createEffect as createEffect6,
  createSignal as createSignal8,
  createUniqueId as createUniqueId5,
  onCleanup as onCleanup5,
  untrack as untrack2,
  useContext as useContext8
} from "solid-js";
import { Dynamic as Dynamic6 } from "solid-js/web";
import {
  omitProps as omitProps6
} from "solid-use";
var ListboxContext = createContext8();
function useListboxContext(componentName) {
  const context = useContext8(ListboxContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Listbox>`);
}
var ListboxOptionsContext = createContext8();
function useListboxOptionsContext(componentName) {
  const context = useContext8(ListboxOptionsContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ListboxOptions>`);
}
function Listbox(props) {
  var _a;
  const [hovering, setHovering] = createSignal8(false);
  const ownerID = createUniqueId5();
  const labelID = createUniqueId5();
  const buttonID = createUniqueId5();
  const optionsID = createUniqueId5();
  return <ListboxContext.Provider value={{
    horizontal: props.horizontal,
    multiple: props.multiple,
    ownerID,
    labelID,
    buttonID,
    optionsID,
    get hovering() {
      return hovering();
    },
    set hovering(value) {
      setHovering(value);
    }
  }}><Dynamic6 component={(_a = props.as) != null ? _a : Fragment} {...omitProps6(props, [
    "as",
    "children",
    "defaultOpen",
    "disabled",
    "horizontal",
    "isOpen",
    "multiple",
    "onDisclosureChange",
    "onSelectChange",
    "toggleable",
    "value",
    "defaultValue"
  ])} aria-labelledby={labelID} data-sh-listbox={ownerID} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled}><HeadlessSelectRoot CONTROLLED={"value" in props} multiple={props.multiple} toggleable={props.toggleable} defaultValue={props.defaultValue} value={props.value} disabled={props.disabled} onChange={props.onSelectChange}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} defaultOpen={props.defaultOpen} disabled={props.disabled} onChange={props.onDisclosureChange}>{props.children}</HeadlessDisclosureRoot></HeadlessSelectRoot></Dynamic6></ListboxContext.Provider>;
}
function ListboxLabel(props) {
  var _a;
  const context = useListboxContext("ListboxLabel");
  return <Dynamic6 component={(_a = props.as) != null ? _a : "label"} {...omitProps6(props, [
    "as",
    "children"
  ])} id={context.labelID} data-sh-listbox-label={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic6>;
}
function ListboxButton(props) {
  const context = useListboxContext("ListboxButton");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal8();
  createEffect6(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      const onKeyDown = (e) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case "ArrowUp":
            case "ArrowDown":
              e.preventDefault();
              toggle();
              break;
            default:
              break;
          }
        }
      };
      ref.addEventListener("click", toggle);
      ref.addEventListener("keydown", onKeyDown);
      onCleanup5(() => {
        ref.removeEventListener("click", toggle);
        ref.removeEventListener("keydown", onKeyDown);
      });
      const onMouseEnter = () => {
        context.hovering = true;
      };
      const onMouseLeave = () => {
        context.hovering = false;
      };
      ref.addEventListener("mouseenter", onMouseEnter);
      ref.addEventListener("mouseleave", onMouseLeave);
      onCleanup5(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return <Dynamic6 component={Button} {...omitProps6(props, [
    "children",
    "ref"
  ])} id={context.buttonID} aria-haspopup="listbox" aria-expanded={properties.isOpen()} aria-controls={context.optionsID} aria-disabled={properties.disabled() || props.disabled} data-sh-expanded={properties.isOpen()} data-sh-disabled={properties.disabled() || props.disabled} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
    if (e instanceof HTMLElement) {
      context.anchor = e;
    }
  })} data-sh-listbox-button={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic6>;
}
function ListboxOptions(props) {
  var _a;
  const context = useListboxContext("ListboxOptions");
  const selectProperties = useHeadlessSelectChild();
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal8();
  function setChecked(node) {
    node.focus();
  }
  function setNextChecked(node) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const options = queryListboxOptions(ref, context.ownerID);
      for (let i = 0, len = options.length; i < len; i += 1) {
        if (node === options[i]) {
          if (i === len - 1) {
            setChecked(options[0]);
          } else {
            setChecked(options[i + 1]);
          }
          break;
        }
      }
    }
  }
  function setPrevChecked(node) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const options = queryListboxOptions(ref, context.ownerID);
      for (let i = 0, len = options.length; i < len; i += 1) {
        if (node === options[i]) {
          if (i === 0) {
            setChecked(options[len - 1]);
          } else {
            setChecked(options[i - 1]);
          }
          break;
        }
      }
    }
  }
  function setFirstChecked() {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const options = queryListboxOptions(ref, context.ownerID);
      setChecked(options[0]);
    }
  }
  function setLastChecked() {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const options = queryListboxOptions(ref, context.ownerID);
      setChecked(options[options.length - 1]);
    }
  }
  function setFirstMatch(character) {
    var _a2;
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const options = queryListboxOptions(ref, context.ownerID);
      const lower = character.toLowerCase();
      for (let i = 0, l = options.length; i < l; i += 1) {
        if ((_a2 = options[i].textContent) == null ? void 0 : _a2.toLowerCase().startsWith(lower)) {
          setChecked(options[i]);
          return;
        }
      }
    }
  }
  createEffect6(() => {
    if (!selectProperties.hasSelected()) {
      setFirstChecked();
    }
  });
  createEffect6(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onBlur = (e) => {
        if (context.hovering) {
          return;
        }
        if (!e.relatedTarget || !ref.contains(e.relatedTarget)) {
          properties.setState(false);
        }
      };
      ref.addEventListener("focusout", onBlur);
      onCleanup5(() => {
        ref.removeEventListener("focusout", onBlur);
      });
    }
  });
  return <ListboxOptionsContext.Provider value={{
    setChecked,
    setFirstChecked,
    setLastChecked,
    setNextChecked,
    setPrevChecked,
    setFirstMatch
  }}><Dynamic6 component={(_a = props.as) != null ? _a : "ul"} {...omitProps6(props, [
    "as",
    "children",
    "ref"
  ])} id={context.optionsID} role="listbox" disabled={properties.disabled() || props.disabled} aria-disabled={properties.disabled() || props.disabled} aria-multiselectable={context.multiple} aria-labelledby={context.buttonID} aria-orientation={context.horizontal ? "horizontal" : "vertical"} data-sh-listbox-options={context.ownerID} data-sh-disabled={properties.disabled() || props.disabled} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessSelectChild>{props.children}</HeadlessSelectChild></Dynamic6></ListboxOptionsContext.Provider>;
}
function ListboxOption(props) {
  var _a;
  const rootContext = useListboxContext("ListboxOptions");
  const context = useListboxOptionsContext("ListboxOptions");
  const disclosure = useHeadlessDisclosureChild();
  const properties = useHeadlessSelectChild();
  const [internalRef, setInternalRef] = createSignal8();
  let characters = "";
  let timeout;
  onCleanup5(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  createEffect6(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case "ArrowLeft":
              if (rootContext.horizontal) {
                e.preventDefault();
                context.setPrevChecked(ref);
              }
              break;
            case "ArrowUp":
              if (!rootContext.horizontal) {
                e.preventDefault();
                context.setPrevChecked(ref);
              }
              break;
            case "ArrowRight":
              if (rootContext.horizontal) {
                e.preventDefault();
                context.setNextChecked(ref);
              }
              break;
            case "ArrowDown":
              if (!rootContext.horizontal) {
                e.preventDefault();
                context.setNextChecked(ref);
              }
              break;
            case " ":
            case "Enter":
              if (ref.tagName === "BUTTON") {
                e.preventDefault();
              }
              properties.select(props.value);
              if (!rootContext.multiple) {
                disclosure.setState(false);
              }
              break;
            case "Home":
              e.preventDefault();
              context.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              context.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.setFirstMatch(characters);
                  characters = "";
                }, 100);
              }
              break;
          }
        }
      };
      const onClick = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.select(props.value);
          if (!rootContext.multiple) {
            disclosure.setState(false);
          }
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus(props.value);
        }
      };
      const onBlur = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      onCleanup5(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  createEffect6(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (disclosure.isOpen() && untrack2(() => properties.isSelected(props.value)) && !(properties.disabled() || props.disabled)) {
        ref.focus();
      }
    }
  });
  return <Dynamic6 component={Button} as={(_a = props.as) != null ? _a : "li"} {...omitProps6(props, [
    "as",
    "children",
    "value",
    "ref"
  ])} disabled={props.disabled} role="option" aria-disabled={props.disabled} aria-selected={properties.isSelected(props.value)} tabindex={-1} data-sh-listbox-option={rootContext.ownerID} data-sh-disabled={props.disabled} data-sh-selected={properties.isSelected(props.value)} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></Dynamic6>;
}

// src/components/Dialog.tsx
import {
  createContext as createContext9,
  createEffect as createEffect7,
  createUniqueId as createUniqueId6,
  useContext as useContext9,
  Show as Show4,
  onCleanup as onCleanup6,
  createSignal as createSignal9
} from "solid-js";
import {
  Dynamic as Dynamic7
} from "solid-js/web";
import {
  omitProps as omitProps7
} from "solid-use";

// src/utils/get-focusable-elements.ts
function getFocusableElements(node, filter) {
  const nodes = node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const replicated = [];
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (!filter || !filter.contains(nodes[i])) {
      replicated.push(nodes[i]);
    }
  }
  return replicated;
}

// src/components/Dialog.tsx
var DialogContext = createContext9();
function useDialogContext(componentName) {
  const context = useContext9(DialogContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Dialog>`);
}
function Dialog(props) {
  const ownerID = createUniqueId6();
  const panelID = createUniqueId6();
  const titleID = createUniqueId6();
  const descriptionID = createUniqueId6();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  onCleanup6(() => {
    returnElement == null ? void 0 : returnElement.focus();
  });
  return <DialogContext.Provider value={{
    ownerID,
    panelID,
    titleID,
    descriptionID
  }}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={(value) => {
    var _a, _b, _c;
    (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    if (!value) {
      (_b = props.onClose) == null ? void 0 : _b.call(props);
      returnElement == null ? void 0 : returnElement.focus();
    } else {
      returnElement = document.activeElement;
      (_c = props.onOpen) == null ? void 0 : _c.call(props);
    }
  }} defaultOpen={props.defaultOpen} disabled={props.disabled}>{({ isOpen }) => {
    var _a, _b, _c;
    return <Show4 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic7 component={(_b = props.as) != null ? _b : "div"} {...omitProps7(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic7>}><Show4 when={isOpen()}><Dynamic7 component={(_c = props.as) != null ? _c : "div"} {...omitProps7(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic7></Show4></Show4>;
  }}</HeadlessDisclosureRoot></DialogContext.Provider>;
}
function DialogTitle(props) {
  var _a;
  const context = useDialogContext("DialogTitle");
  return <Dynamic7 component={(_a = props.as) != null ? _a : "h2"} {...omitProps7(props, [
    "as",
    "children"
  ])} id={context.titleID} data-sh-dialog-title={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic7>;
}
function DialogPanel(props) {
  var _a;
  const context = useDialogContext("DialogPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal9();
  createEffect7(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const initialNodes = getFocusableElements(ref);
        if (initialNodes.length) {
          initialNodes[0].focus();
        }
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  for (let i = 0, len = nodes.length; i < len; i += 1) {
                    if (document.activeElement === nodes[i]) {
                      if (i === 0) {
                        nodes[len - 1].focus();
                      } else {
                        nodes[i - 1].focus();
                      }
                      break;
                    }
                  }
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                for (let i = 0, len = nodes.length; i < len; i += 1) {
                  if (document.activeElement === nodes[i]) {
                    if (i === len - 1) {
                      nodes[0].focus();
                    } else {
                      nodes[i + 1].focus();
                    }
                    break;
                  }
                }
              }
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup6(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <Dynamic7 component={(_a = props.as) != null ? _a : "div"} {...omitProps7(props, [
    "as",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-dialog-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic7>;
}
function DialogOverlay(props) {
  var _a;
  const context = useDialogContext("DialogOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal9();
  createEffect7(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup6(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <Dynamic7 component={(_a = props.as) != null ? _a : "div"} {...omitProps7(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-dialog-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic7>;
}
function DialogDescription(props) {
  var _a;
  const context = useDialogContext("DialogDescription");
  return <Dynamic7 component={(_a = props.as) != null ? _a : "p"} {...omitProps7(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-dialog-description={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic7>;
}

// src/components/Toolbar.tsx
import {
  createEffect as createEffect8,
  createSignal as createSignal10,
  createUniqueId as createUniqueId7,
  onCleanup as onCleanup7
} from "solid-js";
import {
  Dynamic as Dynamic8
} from "solid-js/web";
import {
  omitProps as omitProps8
} from "solid-use";
function Toolbar(props) {
  var _a, _b;
  const toolbarID = createUniqueId7();
  const [internalRef, setInternalRef] = createSignal10();
  let focusedElement;
  function getNextFocusable() {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const nodes = getFocusableElements(ref);
      if (document.activeElement && ref.contains(document.activeElement)) {
        for (let i = 0, len = nodes.length; i < len; i += 1) {
          if (document.activeElement === nodes[i]) {
            if (i === len - 1) {
              nodes[0].focus();
            } else {
              nodes[i + 1].focus();
            }
            break;
          }
        }
      }
    }
  }
  function getPrevFocusable() {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const nodes = getFocusableElements(ref);
      if (document.activeElement && ref.contains(document.activeElement)) {
        for (let i = 0, len = nodes.length; i < len; i += 1) {
          if (document.activeElement === nodes[i]) {
            if (i === 0) {
              nodes[len - 1].focus();
            } else {
              nodes[i - 1].focus();
            }
            break;
          }
        }
      }
    }
  }
  createEffect8(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        switch (e.key) {
          case "ArrowLeft":
            if (props.horizontal) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case "ArrowUp":
            if (!props.horizontal) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case "ArrowRight":
            if (props.horizontal) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          case "ArrowDown":
            if (!props.horizontal) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          case "Home":
            {
              const nodes = getFocusableElements(ref);
              if (nodes.length) {
                e.preventDefault();
                nodes[0].focus();
              }
            }
            break;
          case "End":
            {
              const nodes = getFocusableElements(ref);
              if (nodes.length) {
                e.preventDefault();
                nodes[nodes.length - 1].focus();
              }
            }
            break;
          default:
            break;
        }
      };
      const onFocus = () => {
        if (focusedElement) {
          focusedElement.focus();
        } else {
          const nodes = getFocusableElements(ref);
          if (nodes.length) {
            nodes[0].focus();
          }
        }
      };
      const onFocusIn = (e) => {
        if (e.target && e.target !== ref) {
          focusedElement = e.target;
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("focusin", onFocusIn);
      onCleanup7(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("focusin", onFocusIn);
      });
    }
  });
  return <Dynamic8 component={(_a = props.as) != null ? _a : "div"} {...omitProps8(props, [
    "as",
    "horizontal",
    "ref"
  ])} role="toolbar" id={toolbarID} aria-orientation={((_b = props.horizontal) != null ? _b : true) ? "horizontal" : "vertical"} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} data-sh-toolbar={toolbarID} />;
}

// src/components/Select.tsx
import {
  createContext as createContext10,
  createEffect as createEffect9,
  createSignal as createSignal11,
  createUniqueId as createUniqueId8,
  onCleanup as onCleanup8,
  useContext as useContext10
} from "solid-js";
import { Dynamic as Dynamic9 } from "solid-js/web";
import {
  omitProps as omitProps9
} from "solid-use";
var SelectContext = createContext10();
function useSelectContext(componentName) {
  const context = useContext10(SelectContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}
function Select(props) {
  var _a;
  const ownerID = createUniqueId8();
  let internalRef;
  function setChecked(node) {
    node.focus();
  }
  function setNextChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      for (let i = 0, len = options.length; i < len; i += 1) {
        if (node === options[i]) {
          if (i === len - 1) {
            setChecked(options[0]);
          } else {
            setChecked(options[i + 1]);
          }
          break;
        }
      }
    }
  }
  function setPrevChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      for (let i = 0, len = options.length; i < len; i += 1) {
        if (node === options[i]) {
          if (i === 0) {
            setChecked(options[len - 1]);
          } else {
            setChecked(options[i - 1]);
          }
          break;
        }
      }
    }
  }
  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      setChecked(options[0]);
    }
  }
  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      setChecked(options[options.length - 1]);
    }
  }
  function setFirstMatch(character) {
    var _a2;
    if (internalRef instanceof HTMLElement) {
      const lower = character.toLowerCase();
      const options = querySelectOptions(internalRef, ownerID);
      for (let i = 0, l = options.length; i < l; i += 1) {
        if ((_a2 = options[i].textContent) == null ? void 0 : _a2.toLowerCase().startsWith(lower)) {
          setChecked(options[i]);
          return;
        }
      }
    }
  }
  return <SelectContext.Provider value={{
    horizontal: !!props.horizontal,
    ownerID,
    setChecked,
    setFirstChecked,
    setLastChecked,
    setNextChecked,
    setPrevChecked,
    setFirstMatch
  }}><Dynamic9 component={(_a = props.as) != null ? _a : "ul"} {...omitProps9(props, [
    "as",
    "children",
    "toggleable",
    "value",
    "onChange",
    "multiple",
    "horizontal",
    "disabled",
    "ref",
    "defaultValue"
  ])} id={ownerID} role="listbox" disabled={props.disabled} aria-multiselectable={props.multiple} aria-orientation={props.horizontal ? "horizontal" : "vertical"} aria-disabled={props.disabled} data-sh-select={ownerID} data-sh-disabled={props.disabled} ref={createRef(props, (e) => {
    internalRef = e;
  })}><HeadlessSelectRoot CONTROLLED={"value" in props} multiple={props.multiple} toggleable={props.toggleable} defaultValue={props.defaultValue} value={props.value} onChange={props.onChange} disabled={props.disabled}>{props.children}</HeadlessSelectRoot></Dynamic9></SelectContext.Provider>;
}
function SelectOption(props) {
  var _a;
  const context = useSelectContext("Select");
  const properties = useHeadlessSelectChild();
  const [internalRef, setInternalRef] = createSignal11();
  let characters = "";
  let timeout;
  onCleanup8(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  createEffect9(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case "ArrowUp":
              if (!context.horizontal) {
                e.preventDefault();
                context.setPrevChecked(ref);
              }
              break;
            case "ArrowLeft":
              if (context.horizontal) {
                e.preventDefault();
                context.setPrevChecked(ref);
              }
              break;
            case "ArrowDown":
              if (!context.horizontal) {
                e.preventDefault();
                context.setNextChecked(ref);
              }
              break;
            case "ArrowRight":
              if (context.horizontal) {
                e.preventDefault();
                context.setNextChecked(ref);
              }
              break;
            case " ":
            case "Enter":
              if (ref.tagName === "BUTTON") {
                e.preventDefault();
              }
              properties.select(props.value);
              break;
            case "Home":
              e.preventDefault();
              context.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              context.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.setFirstMatch(characters);
                  characters = "";
                }, 100);
              }
              break;
          }
        }
      };
      const onClick = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus(props.value);
        }
      };
      const onBlur = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.blur();
        }
      };
      const onMouseEnter = () => {
        if (!(properties.disabled() || props.disabled)) {
          ref.focus();
        }
      };
      const onMouseLeave = () => {
        if (!(properties.disabled() || props.disabled)) {
          ref.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      ref.addEventListener("mouseenter", onMouseEnter);
      ref.addEventListener("mouseleave", onMouseLeave);
      onCleanup8(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return <Dynamic9 component={Button} as={(_a = props.as) != null ? _a : "li"} {...omitProps9(props, [
    "as",
    "children",
    "value",
    "ref"
  ])} disabled={props.disabled} role="option" tabindex={-1} aria-selected={properties.isSelected(props.value)} aria-disabled={props.disabled} data-sh-select-option={context.ownerID} data-sh-selected={properties.isSelected(props.value)} data-sh-disabled={props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></Dynamic9>;
}

// src/components/Toggle.tsx
import {
  createEffect as createEffect10,
  createSignal as createSignal12,
  createUniqueId as createUniqueId9,
  onCleanup as onCleanup9,
  untrack as untrack3
} from "solid-js";
import {
  Dynamic as Dynamic10
} from "solid-js/web";
import {
  omitProps as omitProps10
} from "solid-use";
function Toggle(props) {
  const [state, setState] = createSignal12(untrack3(() => !!props.defaultPressed));
  const toggleID = createUniqueId9();
  const [internalRef, setInternalRef] = createSignal12();
  createEffect10(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        var _a;
        setState(!state());
        (_a = props.onChange) == null ? void 0 : _a.call(props, state());
      };
      ref.addEventListener("click", onClick);
      onCleanup9(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <Dynamic10 component={Button} as={props.as} {...omitProps10(props, [
    "defaultPressed",
    "onChange",
    "pressed",
    "ref"
  ])} data-sh-toggle={toggleID} aria-pressed={state()} data-sh-pressed={state()} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} />;
}

// src/components/Popover.tsx
import {
  createContext as createContext11,
  createEffect as createEffect11,
  createSignal as createSignal13,
  createUniqueId as createUniqueId10,
  onCleanup as onCleanup10,
  Show as Show5,
  useContext as useContext11
} from "solid-js";
import {
  Dynamic as Dynamic11
} from "solid-js/web";
import {
  omitProps as omitProps11
} from "solid-use";
var PopoverContext = createContext11();
function usePopoverContext(componentName) {
  const context = useContext11(PopoverContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Popover>`);
}
function Popover(props) {
  var _a;
  const [hovering, setHovering] = createSignal13(false);
  const ownerID = createUniqueId10();
  const buttonID = createUniqueId10();
  const panelID = createUniqueId10();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  onCleanup10(() => {
    returnElement == null ? void 0 : returnElement.focus();
  });
  return <PopoverContext.Provider value={{
    ownerID,
    buttonID,
    panelID,
    get hovering() {
      return hovering();
    },
    set hovering(value) {
      setHovering(value);
    }
  }}><Dynamic11 component={(_a = props.as) != null ? _a : "div"} {...omitProps11(props, [
    "isOpen",
    "as",
    "children",
    "disabled",
    "defaultOpen",
    "onChange"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-popover={ownerID}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={(value) => {
    var _a2, _b, _c;
    (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
    if (!value) {
      returnElement == null ? void 0 : returnElement.focus();
      (_b = props.onClose) == null ? void 0 : _b.call(props);
    } else {
      returnElement = document.activeElement;
      (_c = props.onOpen) == null ? void 0 : _c.call(props);
    }
  }} disabled={props.disabled} defaultOpen={props.defaultOpen}>{props.children}</HeadlessDisclosureRoot></Dynamic11></PopoverContext.Provider>;
}
function PopoverButton(props) {
  const context = usePopoverContext("PopoverButton");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal13();
  createEffect11(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      onCleanup10(() => {
        ref.removeEventListener("click", toggle);
      });
      const onMouseEnter = () => {
        context.hovering = true;
      };
      const onMouseLeave = () => {
        context.hovering = false;
      };
      ref.addEventListener("mouseenter", onMouseEnter);
      ref.addEventListener("mouseleave", onMouseLeave);
      onCleanup10(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return <Dynamic11 component={Button} {...omitProps11(props, [
    "children",
    "ref"
  ])} id={context.buttonID} aria-disabled={properties.disabled() || props.disabled} aria-expanded={properties.isOpen()} aria-controls={properties.isOpen() && context.panelID} data-sh-disabled={properties.disabled() || props.disabled} data-sh-expanded={properties.isOpen()} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
    if (e instanceof HTMLElement) {
      context.anchor = e;
    }
  })} data-sh-popover-button={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic11>;
}
function PopoverPanel(props) {
  var _a, _b, _c;
  const context = usePopoverContext("PopoverPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal13();
  createEffect11(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const initialNodes = getFocusableElements(ref);
        if (initialNodes.length) {
          initialNodes[0].focus();
        }
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  for (let i = 0, len = nodes.length; i < len; i += 1) {
                    if (document.activeElement === nodes[i]) {
                      if (i === 0) {
                        nodes[len - 1].focus();
                      } else {
                        nodes[i - 1].focus();
                      }
                      break;
                    }
                  }
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                for (let i = 0, len = nodes.length; i < len; i += 1) {
                  if (document.activeElement === nodes[i]) {
                    if (i === len - 1) {
                      nodes[0].focus();
                    } else {
                      nodes[i + 1].focus();
                    }
                    break;
                  }
                }
              }
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        const onBlur = (e) => {
          if (context.hovering) {
            return;
          }
          if (!e.relatedTarget || !ref.contains(e.relatedTarget)) {
            properties.setState(false);
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        ref.addEventListener("focusout", onBlur);
        onCleanup10(() => {
          ref.removeEventListener("keydown", onKeyDown);
          ref.removeEventListener("focusout", onBlur);
        });
      }
    }
  });
  return <Show5 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic11 component={(_b = props.as) != null ? _b : "div"} {...omitProps11(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-popover-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic11>}><Show5 when={properties.isOpen()}><Dynamic11 component={(_c = props.as) != null ? _c : "div"} {...omitProps11(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-popover-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic11></Show5></Show5>;
}
function PopoverOverlay(props) {
  var _a;
  const context = usePopoverContext("PopoverOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal13();
  createEffect11(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup10(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <Dynamic11 component={(_a = props.as) != null ? _a : "div"} {...omitProps11(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-popover-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic11>;
}

// src/components/Alert.tsx
import {
  createUniqueId as createUniqueId11
} from "solid-js";
import {
  Dynamic as Dynamic12
} from "solid-js/web";
import {
  omitProps as omitProps12
} from "solid-use";
function Alert(props) {
  var _a;
  const alertID = createUniqueId11();
  return <Dynamic12 component={(_a = props.as) != null ? _a : "div"} id={alertID} {...omitProps12(props, [
    "as"
  ])} role="alert" data-sh-alert={alertID} />;
}

// src/components/AlertDialog.tsx
import {
  createContext as createContext12,
  createEffect as createEffect12,
  createUniqueId as createUniqueId12,
  useContext as useContext12,
  Show as Show6,
  onCleanup as onCleanup11,
  createSignal as createSignal14
} from "solid-js";
import {
  Dynamic as Dynamic13
} from "solid-js/web";
import {
  omitProps as omitProps13
} from "solid-use";
var AlertDialogContext = createContext12();
function useAlertDialogContext(componentName) {
  const context = useContext12(AlertDialogContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AlertDialog>`);
}
function AlertDialog(props) {
  const ownerID = createUniqueId12();
  const panelID = createUniqueId12();
  const titleID = createUniqueId12();
  const descriptionID = createUniqueId12();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  onCleanup11(() => {
    returnElement == null ? void 0 : returnElement.focus();
  });
  return <AlertDialogContext.Provider value={{
    ownerID,
    panelID,
    titleID,
    descriptionID
  }}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={(value) => {
    var _a, _b, _c;
    (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    if (!value) {
      (_b = props.onClose) == null ? void 0 : _b.call(props);
      returnElement == null ? void 0 : returnElement.focus();
    } else {
      returnElement = document.activeElement;
      (_c = props.onOpen) == null ? void 0 : _c.call(props);
    }
  }} defaultOpen={props.defaultOpen} disabled={props.disabled}>{({ isOpen }) => {
    var _a, _b, _c;
    return <Show6 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic13 component={(_b = props.as) != null ? _b : "div"} {...omitProps13(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="alertdialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-alert-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic13>}><Show6 when={isOpen()}><Dynamic13 component={(_c = props.as) != null ? _c : "div"} {...omitProps13(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="alertdialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-alert-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic13></Show6></Show6>;
  }}</HeadlessDisclosureRoot></AlertDialogContext.Provider>;
}
function AlertDialogTitle(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogTitle");
  return <Dynamic13 component={(_a = props.as) != null ? _a : "h2"} {...omitProps13(props, [
    "as",
    "children"
  ])} id={context.titleID} data-sh-alert-dialog-title={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic13>;
}
function AlertDialogPanel(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal14();
  createEffect12(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const initialNodes = getFocusableElements(ref);
        if (initialNodes.length) {
          initialNodes[0].focus();
        }
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  for (let i = 0, len = nodes.length; i < len; i += 1) {
                    if (document.activeElement === nodes[i]) {
                      if (i === 0) {
                        nodes[len - 1].focus();
                      } else {
                        nodes[i - 1].focus();
                      }
                      break;
                    }
                  }
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                for (let i = 0, len = nodes.length; i < len; i += 1) {
                  if (document.activeElement === nodes[i]) {
                    if (i === len - 1) {
                      nodes[0].focus();
                    } else {
                      nodes[i + 1].focus();
                    }
                    break;
                  }
                }
              }
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup11(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <Dynamic13 component={(_a = props.as) != null ? _a : "div"} {...omitProps13(props, [
    "as",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-alert-dialog-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic13>;
}
function AlertDialogOverlay(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal14();
  createEffect12(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup11(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <Dynamic13 component={(_a = props.as) != null ? _a : "div"} {...omitProps13(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-alert-dialog-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic13>;
}
function AlertDialogDescription(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogDescription");
  return <Dynamic13 component={(_a = props.as) != null ? _a : "p"} {...omitProps13(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-alert-dialog-description={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic13>;
}

// src/components/Toast.tsx
import {
  createEffect as createEffect13,
  createSignal as createSignal15,
  createUniqueId as createUniqueId13,
  onCleanup as onCleanup12
} from "solid-js";
import {
  Dynamic as Dynamic14
} from "solid-js/web";
import {
  omitProps as omitProps14
} from "solid-use";
function Toast(props) {
  var _a;
  const toastID = createUniqueId13();
  return <Dynamic14 component={(_a = props.as) != null ? _a : "div"} id={toastID} {...omitProps14(props, [
    "as"
  ])} role="status" aria-live="polite" data-sh-toast={toastID} />;
}
function Toaster(props) {
  var _a;
  const toasterID = createUniqueId13();
  return <Dynamic14 component={(_a = props.as) != null ? _a : "div"} id={toasterID} {...omitProps14(props, [
    "as"
  ])} data-sh-toast={toasterID} />;
}
var _ToasterStore = class {
  constructor() {
    this.queue = [];
    this.listeners = /* @__PURE__ */ new Set();
    this.toastID = 0;
    this.id = _ToasterStore.toasterID;
    _ToasterStore.toasterID += 1;
  }
  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }
  notify() {
    const clone = [...this.queue];
    for (const listener of this.listeners.keys()) {
      listener(clone);
    }
  }
  create(data) {
    const id = `toast-${this.id}-[${this.toastID}`;
    this.toastID += 1;
    this.queue.push({
      id,
      data
    });
    this.notify();
    return id;
  }
  remove(id) {
    this.queue = this.queue.filter((item) => item.id !== id);
    this.notify();
  }
  clear() {
    this.queue = [];
    this.notify();
  }
  getQueue() {
    return this.queue;
  }
};
var ToasterStore = _ToasterStore;
ToasterStore.toasterID = 0;
function useToaster(toaster) {
  const [signal, setSignal] = createSignal15(toaster.getQueue());
  createEffect13(() => {
    onCleanup12(toaster.subscribe(setSignal));
  });
  return signal;
}

// src/components/Checkbox.tsx
import {
  createContext as createContext13,
  createEffect as createEffect14,
  createSignal as createSignal16,
  createUniqueId as createUniqueId14,
  onCleanup as onCleanup13,
  useContext as useContext13
} from "solid-js";
import {
  Dynamic as Dynamic15
} from "solid-js/web";
import {
  omitProps as omitProps15
} from "solid-use";
var CheckboxContext = createContext13();
function useCheckboxContext(componentName) {
  const context = useContext13(CheckboxContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Checkbox>`);
}
function Checkbox(props) {
  var _a;
  const ownerID = createUniqueId14();
  const labelID = createUniqueId14();
  const indicatorID = createUniqueId14();
  const descriptionID = createUniqueId14();
  return <CheckboxContext.Provider value={{
    ownerID,
    labelID,
    indicatorID,
    descriptionID
  }}><Dynamic15 component={(_a = props.as) != null ? _a : Fragment} {...omitProps15(props, [
    "checked",
    "as",
    "children",
    "disabled",
    "defaultChecked",
    "onChange"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-checkbox={ownerID}><HeadlessToggleRoot CONTROLLED={"checked" in props} checked={props.checked} onChange={props.onChange} disabled={props.disabled} defaultChecked={props.defaultChecked}>{props.children}</HeadlessToggleRoot></Dynamic15></CheckboxContext.Provider>;
}
function CheckboxIndicator(props) {
  var _a;
  const context = useCheckboxContext("CheckboxIndicator");
  const state = useHeadlessToggleChild();
  const [internalRef, setInternalRef] = createSignal16();
  createEffect14(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        state.setState(!state.checked());
      };
      const onKeyDown = (e) => {
        if (e.key === " ") {
          toggle();
        }
      };
      ref.addEventListener("click", toggle);
      ref.addEventListener("keydown", onKeyDown);
      onCleanup13(() => {
        ref.removeEventListener("click", toggle);
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return <Dynamic15 component={(_a = props.as) != null ? _a : "button"} {...omitProps15(props, [
    "as",
    "children",
    "ref"
  ])} id={context.indicatorID} role="checkbox" data-sh-checkbox-indicator={context.ownerID} aria-labelledby={context.labelID} aria-describedby={context.descriptionID} aria-disabled={state.disabled()} aria-checked={state.checked() == null ? "mixed" : state.checked()} data-sh-disabled={state.disabled()} data-sh-checked={state.checked()} disabled={state.disabled()} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessToggleChild>{props.children}</HeadlessToggleChild></Dynamic15>;
}
function CheckboxLabel(props) {
  var _a;
  const context = useCheckboxContext("CheckboxLabel");
  return <Dynamic15 component={(_a = props.as) != null ? _a : "label"} {...omitProps15(props, [
    "as"
  ])} id={context.labelID} for={context.indicatorID} data-sh-checkbox-label={context.ownerID}>{props.children}</Dynamic15>;
}
function CheckboxDescription(props) {
  var _a;
  const context = useCheckboxContext("CheckboxDescription");
  return <Dynamic15 component={(_a = props.as) != null ? _a : "p"} {...omitProps15(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-checkbox-description={context.ownerID}><HeadlessToggleChild>{props.children}</HeadlessToggleChild></Dynamic15>;
}

// src/components/Menu.tsx
import {
  createContext as createContext14,
  createEffect as createEffect15,
  createSignal as createSignal17,
  createUniqueId as createUniqueId15,
  onCleanup as onCleanup14,
  useContext as useContext14
} from "solid-js";
import {
  Dynamic as Dynamic16
} from "solid-js/web";
import {
  omitProps as omitProps16
} from "solid-use";
var MenuContext = createContext14();
function useMenuContext(componentName) {
  const context = useContext14(MenuContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Menu>`);
}
function isMenuChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function MenuChild(props) {
  const body = props.children;
  if (isMenuChildRenderProp(body)) {
    return body({
      disabled: () => !!props.disabled
    });
  }
  return body;
}
function Menu(props) {
  var _a;
  const ownerID = createUniqueId15();
  let internalRef;
  function setChecked(node) {
    node.focus();
  }
  function setNextChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      for (let i = 0, len = items.length; i < len; i += 1) {
        if (node === items[i]) {
          if (i === len - 1) {
            setChecked(items[0]);
          } else {
            setChecked(items[i + 1]);
          }
          break;
        }
      }
    }
  }
  function setPrevChecked(node) {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      for (let i = 0, len = items.length; i < len; i += 1) {
        if (node === items[i]) {
          if (i === 0) {
            setChecked(items[len - 1]);
          } else {
            setChecked(items[i - 1]);
          }
          break;
        }
      }
    }
  }
  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      setChecked(items[0]);
    }
  }
  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      setChecked(items[items.length - 1]);
    }
  }
  function setFirstMatch(character) {
    var _a2;
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      const lower = character.toLowerCase();
      for (let i = 0, l = items.length; i < l; i += 1) {
        if ((_a2 = items[i].textContent) == null ? void 0 : _a2.toLowerCase().startsWith(lower)) {
          setChecked(items[i]);
          return;
        }
      }
    }
  }
  return <MenuContext.Provider value={{
    ownerID,
    setChecked,
    setFirstChecked,
    setLastChecked,
    setNextChecked,
    setPrevChecked,
    setFirstMatch
  }}><Dynamic16 component={(_a = props.as) != null ? _a : "div"} {...omitProps16(props, [
    "as",
    "ref"
  ])} id={ownerID} role="menu" data-sh-menu={ownerID} ref={createRef(props, (e) => {
    internalRef = e;
  })} /></MenuContext.Provider>;
}
function MenuItem(props) {
  var _a;
  const context = useMenuContext("Menu");
  const [internalRef, setInternalRef] = createSignal17();
  let characters = "";
  let timeout;
  onCleanup14(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  createEffect15(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!props.disabled) {
          switch (e.key) {
            case "ArrowUp":
            case "ArrowLeft":
              e.preventDefault();
              context.setPrevChecked(ref);
              break;
            case "ArrowDown":
            case "ArrowRight":
              e.preventDefault();
              context.setNextChecked(ref);
              break;
            case " ":
            case "Enter":
              if (ref.tagName === "BUTTON") {
                e.preventDefault();
              }
              ref.click();
              break;
            case "Home":
              e.preventDefault();
              context.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              context.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.setFirstMatch(characters);
                  characters = "";
                }, 100);
              }
              break;
          }
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      onCleanup14(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return <Dynamic16 component={(_a = props.as) != null ? _a : "div"} {...omitProps16(props, [
    "as",
    "disabled",
    "ref"
  ])} disabled={props.disabled} role="menuitem" tabindex={-1} aria-disabled={props.disabled} data-sh-menu-item={context.ownerID} data-sh-disabled={props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><MenuChild disabled={!!props.disabled}>{props.children}</MenuChild></Dynamic16>;
}

// src/components/ContextMenu.tsx
import {
  createContext as createContext15,
  createEffect as createEffect16,
  createSignal as createSignal18,
  createUniqueId as createUniqueId16,
  onCleanup as onCleanup15,
  Show as Show7,
  useContext as useContext15
} from "solid-js";
import {
  Dynamic as Dynamic17
} from "solid-js/web";
import {
  omitProps as omitProps17
} from "solid-use";
var ContextMenuContext = createContext15();
function useContextMenuContext(componentName) {
  const context = useContext15(ContextMenuContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ContextMenu>`);
}
function ContextMenu(props) {
  var _a;
  const ownerID = createUniqueId16();
  const boundaryID = createUniqueId16();
  const panelID = createUniqueId16();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  onCleanup15(() => {
    returnElement == null ? void 0 : returnElement.focus();
  });
  return <ContextMenuContext.Provider value={{
    ownerID,
    boundaryID,
    panelID
  }}><Dynamic17 component={(_a = props.as) != null ? _a : "div"} {...omitProps17(props, [
    "isOpen",
    "as",
    "children",
    "disabled",
    "defaultOpen",
    "onChange"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-context-menu={ownerID}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={(value) => {
    var _a2, _b, _c;
    (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
    if (!value) {
      returnElement == null ? void 0 : returnElement.focus();
      (_b = props.onClose) == null ? void 0 : _b.call(props);
    } else {
      returnElement = document.activeElement;
      (_c = props.onOpen) == null ? void 0 : _c.call(props);
    }
  }} disabled={props.disabled} defaultOpen={props.defaultOpen}>{props.children}</HeadlessDisclosureRoot></Dynamic17></ContextMenuContext.Provider>;
}
function ContextMenuBoundary(props) {
  var _a;
  const context = useContextMenuContext("ContextMenuBoundary");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal18();
  createEffect16(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = (e) => {
        if (!properties.disabled()) {
          e.preventDefault();
          properties.setState(true);
        }
      };
      ref.addEventListener("contextmenu", toggle);
      onCleanup15(() => {
        ref.removeEventListener("contextmenu", toggle);
      });
    }
  });
  return <Dynamic17 component={(_a = props.as) != null ? _a : "div"} {...omitProps17(props, [
    "as",
    "children",
    "ref"
  ])} id={context.boundaryID} aria-disabled={properties.disabled()} aria-expanded={properties.isOpen()} aria-controls={properties.isOpen() && context.panelID} data-sh-disabled={properties.disabled()} data-sh-expanded={properties.isOpen()} disabled={properties.disabled()} ref={createRef(props, (e) => {
    setInternalRef(() => e);
    if (e instanceof HTMLElement) {
      context.anchor = e;
    }
  })} data-sh-context-menu-boundary={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic17>;
}
function ContextMenuPanel(props) {
  var _a, _b, _c;
  const context = useContextMenuContext("ContextMenuPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal18();
  createEffect16(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  for (let i = 0, len = nodes.length; i < len; i += 1) {
                    if (document.activeElement === nodes[i]) {
                      if (i === 0) {
                        nodes[len - 1].focus();
                      } else {
                        nodes[i - 1].focus();
                      }
                      break;
                    }
                  }
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                for (let i = 0, len = nodes.length; i < len; i += 1) {
                  if (document.activeElement === nodes[i]) {
                    if (i === len - 1) {
                      nodes[0].focus();
                    } else {
                      nodes[i + 1].focus();
                    }
                    break;
                  }
                }
              }
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        const onClickOutside = (e) => {
          if (!ref.contains(e.target)) {
            properties.setState(false);
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        document.addEventListener("click", onClickOutside);
        onCleanup15(() => {
          ref.removeEventListener("keydown", onKeyDown);
          document.removeEventListener("click", onClickOutside);
        });
      }
    }
  });
  return <Show7 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic17 component={(_b = props.as) != null ? _b : "div"} {...omitProps17(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-context-menu-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic17>}><Show7 when={properties.isOpen()}><Dynamic17 component={(_c = props.as) != null ? _c : "div"} {...omitProps17(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-context-menu-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic17></Show7></Show7>;
}
function ContextMenuOverlay(props) {
  var _a;
  const context = useContextMenuContext("ContextMenuOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal18();
  createEffect16(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup15(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <Dynamic17 component={(_a = props.as) != null ? _a : "div"} {...omitProps17(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-context-menu-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic17>;
}

// src/components/Feed.tsx
import {
  createContext as createContext16,
  createEffect as createEffect17,
  createUniqueId as createUniqueId17,
  useContext as useContext16,
  onCleanup as onCleanup16,
  createSignal as createSignal19
} from "solid-js";
import {
  Dynamic as Dynamic18
} from "solid-js/web";
import {
  omitProps as omitProps18
} from "solid-use";
var FeedContext = createContext16();
function useFeedContext(componentName) {
  const context = useContext16(FeedContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Feed>`);
}
var FeedContentContext = createContext16();
function useFeedContentContext(componentName) {
  const context = useContext16(FeedContentContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedContent>`);
}
var FeedArticleContext = createContext16();
function useFeedArticleContext(componentName) {
  const context = useContext16(FeedArticleContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedArticle>`);
}
function Feed(props) {
  var _a;
  const ownerID = createUniqueId17();
  const labelID = createUniqueId17();
  const contentID = createUniqueId17();
  let internalRef;
  return <FeedContext.Provider value={{
    ownerID,
    labelID,
    contentID,
    get size() {
      return props.size;
    },
    get busy() {
      return !!props.busy;
    },
    focusNext() {
      const nodes = getFocusableElements(document.documentElement);
      for (let i = 0, len = nodes.length; i < len; i += 1) {
        if (internalRef === nodes[i]) {
          if (i === len - 1) {
            nodes[0].focus();
          } else {
            nodes[i + 1].focus();
          }
          break;
        }
      }
    },
    focusPrev() {
      const nodes = getFocusableElements(document.documentElement);
      for (let i = 0, len = nodes.length; i < len; i += 1) {
        if (internalRef === nodes[i]) {
          if (i === 0) {
            nodes[len - 1].focus();
          } else {
            nodes[i - 1].focus();
          }
          break;
        }
      }
    }
  }}><Dynamic18 component={(_a = props.as) != null ? _a : "div"} {...omitProps18(props, [
    "as",
    "busy",
    "size"
  ])} id={ownerID} data-sh-feed={ownerID} ref={createRef(props, (e) => {
    internalRef = e;
  })} /></FeedContext.Provider>;
}
function FeedLabel(props) {
  var _a;
  const context = useFeedContext("FeedLabel");
  return <Dynamic18 component={(_a = props.as) != null ? _a : "span"} {...omitProps18(props, [
    "as"
  ])} id={context.labelID} data-sh-feed-label={context.ownerID} />;
}
function FeedContent(props) {
  var _a;
  const context = useFeedContext("FeedContent");
  const [internalRef, setInternalRef] = createSignal19();
  function setChecked(node) {
    node.focus();
  }
  function focusNext(node) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const articles = queryFeedArticles(ref, context.ownerID);
      for (let i = 0, len = articles.length; i < len; i += 1) {
        if (node === articles[i] && i + 1 < len) {
          setChecked(articles[i + 1]);
          break;
        }
      }
    }
  }
  function focusPrev(node) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const articles = queryFeedArticles(ref, context.ownerID);
      for (let i = 0, len = articles.length; i < len; i += 1) {
        if (node === articles[i] && i - 1 >= 0) {
          setChecked(articles[i - 1]);
          break;
        }
      }
    }
  }
  createEffect17(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (e.ctrlKey) {
          switch (e.key) {
            case "Home":
              context.focusPrev();
              break;
            case "End":
              context.focusNext();
              break;
            default:
              break;
          }
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      onCleanup16(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return <FeedContentContext.Provider value={{
    focusNext,
    focusPrev
  }}><Dynamic18 component={(_a = props.as) != null ? _a : "div"} {...omitProps18(props, [
    "as"
  ])} id={context.contentID} role="feed" aria-labelledby={context.labelID} aria-busy={context.busy} data-sh-feed-content={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} /></FeedContentContext.Provider>;
}
function FeedArticle(props) {
  var _a;
  const rootContext = useFeedContext("FeedArticle");
  const contentContext = useFeedContentContext("FeedArticle");
  const [internalRef, setInternalRef] = createSignal19();
  createEffect17(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        switch (e.key) {
          case "PageUp":
            contentContext.focusPrev(ref);
            break;
          case "PageDown":
            contentContext.focusNext(ref);
            break;
          default:
            break;
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      onCleanup16(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  const ownerID = createUniqueId17();
  const labelID = createUniqueId17();
  const descriptionID = createUniqueId17();
  return <FeedArticleContext.Provider value={{
    ownerID,
    labelID,
    descriptionID
  }}><Dynamic18 component={(_a = props.as) != null ? _a : "article"} {...omitProps18(props, [
    "as"
  ])} id={ownerID} aria-posinset={props.index + 1} aria-setsize={rootContext.size} aria-labelledby={labelID} aria-describedby={descriptionID} data-sh-feed-article={rootContext.ownerID} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} /></FeedArticleContext.Provider>;
}
function FeedArticleLabel(props) {
  var _a;
  const context = useFeedArticleContext("FeedArticleLabel");
  return <Dynamic18 component={(_a = props.as) != null ? _a : "span"} {...omitProps18(props, [
    "as"
  ])} id={context.labelID} data-sh-feed-article-label={context.ownerID} />;
}
function FeedArticleDescription(props) {
  var _a;
  const context = useFeedArticleContext("FeedArticleDescription");
  return <Dynamic18 component={(_a = props.as) != null ? _a : "p"} {...omitProps18(props, [
    "as"
  ])} id={context.descriptionID} role="feed" data-sh-feed-article-description={context.ownerID} />;
}

// src/components/CommandBar.tsx
import {
  createContext as createContext17,
  createEffect as createEffect18,
  createUniqueId as createUniqueId18,
  useContext as useContext17,
  Show as Show8,
  onCleanup as onCleanup17,
  createSignal as createSignal20
} from "solid-js";
import {
  Dynamic as Dynamic19
} from "solid-js/web";
import {
  omitProps as omitProps19
} from "solid-use";
var CommandBarContext = createContext17();
function useCommandBarContext(componentName) {
  const context = useContext17(CommandBarContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <CommandBar>`);
}
function CommandBarEvents(props) {
  const properties = useHeadlessDisclosureChild();
  createEffect18(() => {
    const onKeyDown = (ev) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === "k" && ev.defaultPrevented === false) {
        ev.preventDefault();
        properties.setState(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    onCleanup17(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });
  return () => props.children;
}
function CommandBar(props) {
  const ownerID = createUniqueId18();
  const panelID = createUniqueId18();
  const titleID = createUniqueId18();
  const descriptionID = createUniqueId18();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  onCleanup17(() => {
    returnElement == null ? void 0 : returnElement.focus();
  });
  return <CommandBarContext.Provider value={{
    ownerID,
    panelID,
    titleID,
    descriptionID
  }}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={(value) => {
    var _a, _b, _c;
    (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    if (!value) {
      (_b = props.onClose) == null ? void 0 : _b.call(props);
      returnElement == null ? void 0 : returnElement.focus();
    } else {
      returnElement = document.activeElement;
      (_c = props.onOpen) == null ? void 0 : _c.call(props);
    }
  }} defaultOpen={props.defaultOpen} disabled={props.disabled}>{({ isOpen }) => {
    var _a, _b, _c;
    return <CommandBarEvents><Show8 when={(_a = props.unmount) != null ? _a : true} fallback={<Dynamic19 component={(_b = props.as) != null ? _b : "div"} {...omitProps19(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-command-bar={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic19>}><Show8 when={isOpen()}><Dynamic19 component={(_c = props.as) != null ? _c : "div"} {...omitProps19(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-command-bar={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic19></Show8></Show8></CommandBarEvents>;
  }}</HeadlessDisclosureRoot></CommandBarContext.Provider>;
}
function CommandBarTitle(props) {
  var _a;
  const context = useCommandBarContext("CommandBarTitle");
  return <Dynamic19 component={(_a = props.as) != null ? _a : "h2"} {...omitProps19(props, [
    "as",
    "children"
  ])} id={context.titleID} data-sh-command-bar-title={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic19>;
}
function CommandBarPanel(props) {
  var _a;
  const context = useCommandBarContext("CommandBarPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal20();
  createEffect18(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const initialNodes = getFocusableElements(ref);
        if (initialNodes.length) {
          initialNodes[0].focus();
        }
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  for (let i = 0, len = nodes.length; i < len; i += 1) {
                    if (document.activeElement === nodes[i]) {
                      if (i === 0) {
                        nodes[len - 1].focus();
                      } else {
                        nodes[i - 1].focus();
                      }
                      break;
                    }
                  }
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                for (let i = 0, len = nodes.length; i < len; i += 1) {
                  if (document.activeElement === nodes[i]) {
                    if (i === len - 1) {
                      nodes[0].focus();
                    } else {
                      nodes[i + 1].focus();
                    }
                    break;
                  }
                }
              }
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup17(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <Dynamic19 component={(_a = props.as) != null ? _a : "div"} {...omitProps19(props, [
    "as",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-command-bar-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic19>;
}
function CommandBarOverlay(props) {
  var _a;
  const context = useCommandBarContext("CommandBarOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = createSignal20();
  createEffect18(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup17(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <Dynamic19 component={(_a = props.as) != null ? _a : "div"} {...omitProps19(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-command-bar-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic19>;
}
function CommandBarDescription(props) {
  var _a;
  const context = useCommandBarContext("CommandBarDescription");
  return <Dynamic19 component={(_a = props.as) != null ? _a : "p"} {...omitProps19(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-command-bar-description={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></Dynamic19>;
}

// src/components/ColorScheme.tsx
import {
  createContext as createContext18,
  createEffect as createEffect19,
  createMemo,
  onCleanup as onCleanup18,
  useContext as useContext18
} from "solid-js";
import {
  usePageVisibility,
  usePrefersDark
} from "solid-use";
var ColorSchemeContext = createContext18();
var STORAGE_KEY = "theme-preference";
function ColorSchemeProvider(props) {
  var _a;
  const [get, set] = useControlledSignal((_a = props.initialValue) != null ? _a : "system", "value" in props ? () => {
    var _a2;
    return (_a2 = props.value) != null ? _a2 : "system";
  } : void 0, (value) => {
    var _a2;
    return (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
  });
  const prefersDark = usePrefersDark();
  const isVisible = usePageVisibility();
  const shouldToggle = createMemo(() => get() === "system" && prefersDark() || get() === "dark");
  createEffect19(() => {
    isVisible();
    const onChange = () => {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value) {
        set(value);
      } else {
        set("system");
      }
    };
    window.addEventListener("storage", onChange, false);
    onChange();
    onCleanup18(() => {
      window.removeEventListener("storage", onChange, false);
    });
  });
  createEffect19(() => {
    localStorage.setItem(STORAGE_KEY, get());
  });
  createEffect19(() => {
    document.documentElement.classList.toggle("dark", shouldToggle());
  });
  return <ColorSchemeContext.Provider value={{
    get value() {
      return get();
    },
    setValue(val) {
      set(val);
    },
    get preferred() {
      return shouldToggle() ? "dark" : "light";
    },
    get native() {
      return prefersDark() ? "dark" : "light";
    }
  }}>{props.children}</ColorSchemeContext.Provider>;
}
function useColorSchemeContext() {
  const ctx = useContext18(ColorSchemeContext);
  if (ctx) {
    return ctx;
  }
  throw new Error("Missing <ColorSchemeProvider>");
}
function useColorScheme() {
  const ctx = useColorSchemeContext();
  return [
    () => ctx.value,
    ctx.setValue
  ];
}
function useNativeColorScheme() {
  const ctx = useColorSchemeContext();
  return () => ctx.native;
}
function usePreferredColorScheme() {
  const ctx = useColorSchemeContext();
  return () => ctx.preferred;
}
export {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDialog,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPanel,
  AlertDialogTitle,
  Button,
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
  ColorSchemeProvider,
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
  ContextMenu,
  ContextMenuBoundary,
  ContextMenuOverlay,
  ContextMenuPanel,
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Feed,
  FeedArticle,
  FeedArticleDescription,
  FeedArticleLabel,
  FeedContent,
  FeedLabel,
  Fragment,
  HeadlessDisclosureChild,
  HeadlessDisclosureRoot,
  HeadlessSelectChild,
  HeadlessSelectOption,
  HeadlessSelectOptionChild,
  HeadlessSelectRoot,
  HeadlessToggleChild,
  HeadlessToggleRoot,
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuItem,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Select,
  SelectOption,
  Toast,
  Toaster,
  ToasterStore,
  Toggle,
  Toolbar,
  Transition,
  TransitionChild,
  useColorScheme,
  useHeadlessDisclosure,
  useHeadlessDisclosureChild,
  useHeadlessSelect,
  useHeadlessSelectChild,
  useHeadlessSelectOption,
  useHeadlessSelectOptionChild,
  useHeadlessToggle,
  useHeadlessToggleChild,
  useNativeColorScheme,
  usePreferredColorScheme,
  useToaster
};
//# sourceMappingURL=index.jsx.map
