"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Accordion: () => Accordion,
  AccordionButton: () => AccordionButton,
  AccordionHeader: () => AccordionHeader,
  AccordionItem: () => AccordionItem,
  AccordionPanel: () => AccordionPanel,
  Alert: () => Alert,
  AlertDialog: () => AlertDialog,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogPanel: () => AlertDialogPanel,
  AlertDialogTitle: () => AlertDialogTitle,
  Button: () => Button,
  Checkbox: () => Checkbox,
  CheckboxDescription: () => CheckboxDescription,
  CheckboxIndicator: () => CheckboxIndicator,
  CheckboxLabel: () => CheckboxLabel,
  ColorSchemeProvider: () => ColorSchemeProvider,
  CommandBar: () => CommandBar,
  CommandBarDescription: () => CommandBarDescription,
  CommandBarOverlay: () => CommandBarOverlay,
  CommandBarPanel: () => CommandBarPanel,
  CommandBarTitle: () => CommandBarTitle,
  ContextMenu: () => ContextMenu,
  ContextMenuBoundary: () => ContextMenuBoundary,
  ContextMenuOverlay: () => ContextMenuOverlay,
  ContextMenuPanel: () => ContextMenuPanel,
  Dialog: () => Dialog,
  DialogDescription: () => DialogDescription,
  DialogOverlay: () => DialogOverlay,
  DialogPanel: () => DialogPanel,
  DialogTitle: () => DialogTitle,
  Disclosure: () => Disclosure,
  DisclosureButton: () => DisclosureButton,
  DisclosurePanel: () => DisclosurePanel,
  Feed: () => Feed,
  FeedArticle: () => FeedArticle,
  FeedArticleDescription: () => FeedArticleDescription,
  FeedArticleLabel: () => FeedArticleLabel,
  FeedContent: () => FeedContent,
  FeedLabel: () => FeedLabel,
  Fragment: () => Fragment,
  HeadlessDisclosureChild: () => HeadlessDisclosureChild,
  HeadlessDisclosureRoot: () => HeadlessDisclosureRoot,
  HeadlessSelectChild: () => HeadlessSelectChild,
  HeadlessSelectOption: () => HeadlessSelectOption,
  HeadlessSelectOptionChild: () => HeadlessSelectOptionChild,
  HeadlessSelectRoot: () => HeadlessSelectRoot,
  HeadlessToggleChild: () => HeadlessToggleChild,
  HeadlessToggleRoot: () => HeadlessToggleRoot,
  Listbox: () => Listbox,
  ListboxButton: () => ListboxButton,
  ListboxLabel: () => ListboxLabel,
  ListboxOption: () => ListboxOption,
  ListboxOptions: () => ListboxOptions,
  Menu: () => Menu,
  MenuItem: () => MenuItem,
  Popover: () => Popover,
  PopoverButton: () => PopoverButton,
  PopoverOverlay: () => PopoverOverlay,
  PopoverPanel: () => PopoverPanel,
  RadioGroup: () => RadioGroup,
  RadioGroupDescription: () => RadioGroupDescription,
  RadioGroupLabel: () => RadioGroupLabel,
  RadioGroupOption: () => RadioGroupOption,
  Select: () => Select,
  SelectOption: () => SelectOption,
  Toast: () => Toast,
  Toaster: () => Toaster,
  ToasterStore: () => ToasterStore,
  Toggle: () => Toggle,
  Toolbar: () => Toolbar,
  Transition: () => Transition,
  TransitionChild: () => TransitionChild,
  useColorScheme: () => useColorScheme,
  useHeadlessDisclosure: () => useHeadlessDisclosure,
  useHeadlessDisclosureChild: () => useHeadlessDisclosureChild,
  useHeadlessSelect: () => useHeadlessSelect,
  useHeadlessSelectChild: () => useHeadlessSelectChild,
  useHeadlessSelectOption: () => useHeadlessSelectOption,
  useHeadlessSelectOptionChild: () => useHeadlessSelectOptionChild,
  useHeadlessToggle: () => useHeadlessToggle,
  useHeadlessToggleChild: () => useHeadlessToggleChild,
  useNativeColorScheme: () => useNativeColorScheme,
  usePreferredColorScheme: () => usePreferredColorScheme,
  useToaster: () => useToaster
});
module.exports = __toCommonJS(src_exports);

// src/headless/Disclosure.tsx
var import_solid_js2 = require("solid-js");

// src/utils/use-controlled-signal.ts
var import_solid_js = require("solid-js");
function useControlledSignal(initialValue, read, write) {
  if (read) {
    return [read, write];
  }
  const [signal, setSignal] = (0, import_solid_js.createSignal)(initialValue);
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
var HeadlessDisclosureContext = (0, import_solid_js2.createContext)();
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
  const properties = (0, import_solid_js2.useContext)(HeadlessDisclosureContext);
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
var import_solid_js3 = require("solid-js");
function useHeadlessSelect(options) {
  var _a, _b;
  const [active, setActive] = (0, import_solid_js3.createSignal)();
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
        const set = new Set((0, import_solid_js3.untrack)(selectedValues));
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
      if (options.toggleable && Object.is((0, import_solid_js3.untrack)(selectedValue), value)) {
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
var HeadlessSelectContext = (0, import_solid_js3.createContext)();
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
  const properties = (0, import_solid_js3.useContext)(HeadlessSelectContext);
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
var HeadlessSelectOptionContext = (0, import_solid_js3.createContext)();
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
  const properties = (0, import_solid_js3.useContext)(HeadlessSelectOptionContext);
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
var import_solid_js4 = require("solid-js");
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
var HeadlessToggleContext = (0, import_solid_js4.createContext)();
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
  const properties = (0, import_solid_js4.useContext)(HeadlessToggleContext);
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
var import_solid_js5 = require("solid-js");
var import_web = require("solid-js/web");
var import_solid_use = require("solid-use");

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
var TransitionRootContext = (0, import_solid_js5.createContext)();
function useTransitionRootContext(componentName) {
  const context = (0, import_solid_js5.useContext)(TransitionRootContext);
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
  const [visible, setVisible] = (0, import_solid_js5.createSignal)(values.show);
  const [ref, setRef] = (0, import_solid_js5.createSignal)();
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
  (0, import_solid_js5.createEffect)(() => {
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
  return <import_solid_js5.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use.omitProps)(props, [
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
  })}>{props.children}</import_web.Dynamic>}><import_solid_js5.Show when={visible()}><import_web.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use.omitProps)(props, [
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
  })}>{props.children}</import_web.Dynamic></import_solid_js5.Show></import_solid_js5.Show>;
}
function Transition(props) {
  const excludedProps = (0, import_solid_use.omitProps)(props, [
    "show"
  ]);
  return <TransitionRootContext.Provider value={{
    get show() {
      return props.show;
    }
  }}><TransitionChild {...excludedProps} /></TransitionRootContext.Provider>;
}

// src/components/Disclosure.tsx
var import_solid_js7 = require("solid-js");
var import_web3 = require("solid-js/web");
var import_solid_use3 = require("solid-use");

// src/utils/Fragment.tsx
function Fragment(props) {
  return props.children;
}

// src/components/Button.tsx
var import_solid_js6 = require("solid-js");
var import_web2 = require("solid-js/web");
var import_solid_use2 = require("solid-use");
function Button(props) {
  var _a;
  const buttonID = (0, import_solid_js6.createUniqueId)();
  const [internalRef, setInternalRef] = (0, import_solid_js6.createSignal)();
  (0, import_solid_js6.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (ref.tagName !== "BUTTON") {
        const onKeyDown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            ref.click();
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        (0, import_solid_js6.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <import_web2.Dynamic component={(_a = props.as) != null ? _a : "button"} id={buttonID} tabindex={0} role="button" disabled={props.disabled} {...(0, import_solid_use2.omitProps)(props, [
    "as",
    "disabled",
    "ref"
  ])} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-button={buttonID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} />;
}

// src/components/Disclosure.tsx
var DisclosureContext = (0, import_solid_js7.createContext)();
function useDisclosureContext(componentName) {
  const context = (0, import_solid_js7.useContext)(DisclosureContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Disclosure>`);
}
function Disclosure(props) {
  var _a;
  const ownerID = (0, import_solid_js7.createUniqueId)();
  const buttonID = (0, import_solid_js7.createUniqueId)();
  const panelID = (0, import_solid_js7.createUniqueId)();
  return <DisclosureContext.Provider value={{
    ownerID,
    buttonID,
    panelID
  }}><import_web3.Dynamic component={(_a = props.as) != null ? _a : Fragment} {...(0, import_solid_use3.omitProps)(props, [
    "isOpen",
    "as",
    "children",
    "disabled",
    "defaultOpen",
    "onChange"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-disclosure={ownerID}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} onChange={props.onChange} disabled={props.disabled} defaultOpen={props.defaultOpen}>{props.children}</HeadlessDisclosureRoot></import_web3.Dynamic></DisclosureContext.Provider>;
}
function DisclosureButton(props) {
  const context = useDisclosureContext("DisclosureButton");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js7.createSignal)();
  (0, import_solid_js7.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      (0, import_solid_js7.onCleanup)(() => {
        ref.removeEventListener("click", toggle);
      });
    }
  });
  return <import_web3.Dynamic component={Button} {...(0, import_solid_use3.omitProps)(props, [
    "children",
    "ref"
  ])} id={context.buttonID} aria-disabled={properties.disabled() || props.disabled} aria-expanded={properties.isOpen()} aria-controls={properties.isOpen() && context.panelID} data-sh-expanded={properties.isOpen()} data-sh-disabled={properties.disabled() || props.disabled} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} data-sh-disclosure-button={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web3.Dynamic>;
}
function DisclosurePanel(props) {
  var _a, _b, _c;
  const context = useDisclosureContext("DisclosurePanel");
  const properties = useHeadlessDisclosureChild();
  return <import_solid_js7.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web3.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use3.omitProps)(props, [
    "as",
    "unmount",
    "children"
  ])} id={context.panelID} data-sh-disclosure-panel={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web3.Dynamic>}><import_solid_js7.Show when={properties.isOpen()}><import_web3.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use3.omitProps)(props, [
    "as",
    "unmount",
    "children"
  ])} id={context.panelID} data-sh-disclosure-panel={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web3.Dynamic></import_solid_js7.Show></import_solid_js7.Show>;
}

// src/components/Accordion.tsx
var import_solid_js8 = require("solid-js");
var import_web4 = require("solid-js/web");
var import_solid_use4 = require("solid-use");

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
var AccordionContext = (0, import_solid_js8.createContext)();
function useAccordionContext(componentName) {
  const context = (0, import_solid_js8.useContext)(AccordionContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}
var AccordionItemContext = (0, import_solid_js8.createContext)();
function useAccordionItemContext(componentName) {
  const context = (0, import_solid_js8.useContext)(AccordionItemContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AccordionItem>`);
}
function Accordion(props) {
  var _a;
  const ownerID = (0, import_solid_js8.createUniqueId)();
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
  }}><import_web4.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use4.omitProps)(props, [
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
  })} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-accordion={ownerID}><HeadlessSelectRoot CONTROLLED={"value" in props} multiple={props.multiple} value={props.value} defaultValue={props.defaultValue} toggleable={props.toggleable} disabled={props.disabled} onChange={props.onChange}>{props.children}</HeadlessSelectRoot></import_web4.Dynamic></AccordionContext.Provider>;
}
function AccordionItem(props) {
  var _a;
  const buttonID = (0, import_solid_js8.createUniqueId)();
  const panelID = (0, import_solid_js8.createUniqueId)();
  return <AccordionItemContext.Provider value={{
    buttonID,
    panelID
  }}><import_web4.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use4.omitProps)(props, [
    "as",
    "children",
    "value",
    "disabled"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></import_web4.Dynamic></AccordionItemContext.Provider>;
}
function AccordionHeader(props) {
  var _a;
  return <import_web4.Dynamic component={(_a = props.as) != null ? _a : "h3"} {...(0, import_solid_use4.omitProps)(props, [
    "as",
    "children"
  ])}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></import_web4.Dynamic>;
}
function AccordionButton(props) {
  const rootContext = useAccordionContext("AccordionButton");
  const itemContext = useAccordionItemContext("AccordionButton");
  const properties = useHeadlessSelectOptionChild();
  const [internalRef, setInternalRef] = (0, import_solid_js8.createSignal)();
  (0, import_solid_js8.createEffect)(() => {
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
      (0, import_solid_js8.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return <import_web4.Dynamic component={Button} {...(0, import_solid_use4.omitProps)(props, [
    "children",
    "ref",
    "disabled",
    "as"
  ])} id={itemContext.buttonID} aria-expanded={properties.isSelected()} aria-controls={properties.isSelected() && itemContext.panelID} aria-disabled={properties.disabled() || props.disabled} data-sh-disabled={properties.disabled() || props.disabled} data-sh-expanded={properties.isSelected()} data-sh-active={properties.isActive()} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} data-sh-accordion-button={rootContext.ownerID}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></import_web4.Dynamic>;
}
function AccordionPanel(props) {
  var _a, _b, _c;
  const context = useAccordionItemContext("AccordionPanel");
  const properties = useHeadlessSelectOptionChild();
  return <import_solid_js8.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web4.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use4.omitProps)(props, [
    "as",
    "children",
    "unmount"
  ])} id={context.panelID} aria-labelledby={context.buttonID}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></import_web4.Dynamic>}><import_solid_js8.Show when={properties.isSelected()}><import_web4.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use4.omitProps)(props, [
    "as",
    "children",
    "unmount"
  ])} id={context.panelID} aria-labelledby={context.buttonID}><HeadlessSelectOptionChild>{props.children}</HeadlessSelectOptionChild></import_web4.Dynamic></import_solid_js8.Show></import_solid_js8.Show>;
}

// src/components/RadioGroup.tsx
var import_solid_js9 = require("solid-js");
var import_web5 = require("solid-js/web");
var import_solid_use5 = require("solid-use");
var RadioGroupContext = (0, import_solid_js9.createContext)();
function useRadioGroupContext(componentName) {
  const context = (0, import_solid_js9.useContext)(RadioGroupContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`);
}
var RadioGroupRootContext = (0, import_solid_js9.createContext)();
function useRadioGroupRootContext(componentName) {
  const context = (0, import_solid_js9.useContext)(RadioGroupRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}
function RadioGroup(props) {
  var _a;
  const ownerID = (0, import_solid_js9.createUniqueId)();
  const descriptionID = (0, import_solid_js9.createUniqueId)();
  const labelID = (0, import_solid_js9.createUniqueId)();
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
  }}><import_web5.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use5.omitProps)(props, [
    "as",
    "children",
    "value",
    "disabled",
    "onChange",
    "ref",
    "defaultValue"
  ])} role="radiogroup" aria-labelledby={labelID} aria-describedby={descriptionID} aria-disabled={props.disabled} data-sh-disabled={props.disabled} disabled={props.disabled} ref={createRef(props, (e) => {
    internalRef = e;
  })} data-sh-radiogroup={ownerID}><HeadlessSelectRoot CONTROLLED={"value" in props} defaultValue={props.defaultValue} value={props.value} disabled={props.disabled} onChange={props.onChange}>{props.children}</HeadlessSelectRoot></import_web5.Dynamic></RadioGroupContext.Provider></RadioGroupRootContext.Provider>;
}
function RadioGroupOption(props) {
  var _a;
  const context = useRadioGroupRootContext("RadioGroupOption");
  const properties = useHeadlessSelectChild();
  const descriptionID = (0, import_solid_js9.createUniqueId)();
  const labelID = (0, import_solid_js9.createUniqueId)();
  const [internalRef, setInternalRef] = (0, import_solid_js9.createSignal)();
  (0, import_solid_js9.createEffect)(() => {
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
      (0, import_solid_js9.onCleanup)(() => {
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
  }}><import_web5.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use5.omitProps)(props, [
    "as",
    "children",
    "value",
    "disabled",
    "ref"
  ])} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} role="radio" disabled={props.disabled} tabindex={properties.isSelected(props.value) ? 0 : -1} aria-disabled={props.disabled} aria-checked={properties.isSelected(props.value)} aria-labelledby={labelID} aria-describedby={descriptionID} data-sh-radio={context.ownerID} data-sh-checked={properties.isSelected(props.value)} data-sh-disabled={props.disabled}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></import_web5.Dynamic></RadioGroupContext.Provider>;
}
function RadioGroupLabel(props) {
  var _a;
  const context = useRadioGroupContext("RadioGroupLabel");
  return <import_web5.Dynamic component={(_a = props.as) != null ? _a : "label"} {...(0, import_solid_use5.omitProps)(props, [
    "as"
  ])} id={context.labelID}>{props.children}</import_web5.Dynamic>;
}
function RadioGroupDescription(props) {
  var _a;
  const context = useRadioGroupContext("RadioGroupLabel");
  return <import_web5.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use5.omitProps)(props, [
    "as"
  ])} id={context.descriptionID}>{props.children}</import_web5.Dynamic>;
}

// src/components/Listbox.tsx
var import_solid_js10 = require("solid-js");
var import_web6 = require("solid-js/web");
var import_solid_use6 = require("solid-use");
var ListboxContext = (0, import_solid_js10.createContext)();
function useListboxContext(componentName) {
  const context = (0, import_solid_js10.useContext)(ListboxContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Listbox>`);
}
var ListboxOptionsContext = (0, import_solid_js10.createContext)();
function useListboxOptionsContext(componentName) {
  const context = (0, import_solid_js10.useContext)(ListboxOptionsContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ListboxOptions>`);
}
function Listbox(props) {
  var _a;
  const [hovering, setHovering] = (0, import_solid_js10.createSignal)(false);
  const ownerID = (0, import_solid_js10.createUniqueId)();
  const labelID = (0, import_solid_js10.createUniqueId)();
  const buttonID = (0, import_solid_js10.createUniqueId)();
  const optionsID = (0, import_solid_js10.createUniqueId)();
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
  }}><import_web6.Dynamic component={(_a = props.as) != null ? _a : Fragment} {...(0, import_solid_use6.omitProps)(props, [
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
  ])} aria-labelledby={labelID} data-sh-listbox={ownerID} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled}><HeadlessSelectRoot CONTROLLED={"value" in props} multiple={props.multiple} toggleable={props.toggleable} defaultValue={props.defaultValue} value={props.value} disabled={props.disabled} onChange={props.onSelectChange}><HeadlessDisclosureRoot CONTROLLED={"isOpen" in props} isOpen={props.isOpen} defaultOpen={props.defaultOpen} disabled={props.disabled} onChange={props.onDisclosureChange}>{props.children}</HeadlessDisclosureRoot></HeadlessSelectRoot></import_web6.Dynamic></ListboxContext.Provider>;
}
function ListboxLabel(props) {
  var _a;
  const context = useListboxContext("ListboxLabel");
  return <import_web6.Dynamic component={(_a = props.as) != null ? _a : "label"} {...(0, import_solid_use6.omitProps)(props, [
    "as",
    "children"
  ])} id={context.labelID} data-sh-listbox-label={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web6.Dynamic>;
}
function ListboxButton(props) {
  const context = useListboxContext("ListboxButton");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js10.createSignal)();
  (0, import_solid_js10.createEffect)(() => {
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
      (0, import_solid_js10.onCleanup)(() => {
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
      (0, import_solid_js10.onCleanup)(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return <import_web6.Dynamic component={Button} {...(0, import_solid_use6.omitProps)(props, [
    "children",
    "ref"
  ])} id={context.buttonID} aria-haspopup="listbox" aria-expanded={properties.isOpen()} aria-controls={context.optionsID} aria-disabled={properties.disabled() || props.disabled} data-sh-expanded={properties.isOpen()} data-sh-disabled={properties.disabled() || props.disabled} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
    if (e instanceof HTMLElement) {
      context.anchor = e;
    }
  })} data-sh-listbox-button={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web6.Dynamic>;
}
function ListboxOptions(props) {
  var _a;
  const context = useListboxContext("ListboxOptions");
  const selectProperties = useHeadlessSelectChild();
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js10.createSignal)();
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
  (0, import_solid_js10.createEffect)(() => {
    if (!selectProperties.hasSelected()) {
      setFirstChecked();
    }
  });
  (0, import_solid_js10.createEffect)(() => {
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
      (0, import_solid_js10.onCleanup)(() => {
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
  }}><import_web6.Dynamic component={(_a = props.as) != null ? _a : "ul"} {...(0, import_solid_use6.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} id={context.optionsID} role="listbox" disabled={properties.disabled() || props.disabled} aria-disabled={properties.disabled() || props.disabled} aria-multiselectable={context.multiple} aria-labelledby={context.buttonID} aria-orientation={context.horizontal ? "horizontal" : "vertical"} data-sh-listbox-options={context.ownerID} data-sh-disabled={properties.disabled() || props.disabled} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessSelectChild>{props.children}</HeadlessSelectChild></import_web6.Dynamic></ListboxOptionsContext.Provider>;
}
function ListboxOption(props) {
  var _a;
  const rootContext = useListboxContext("ListboxOptions");
  const context = useListboxOptionsContext("ListboxOptions");
  const disclosure = useHeadlessDisclosureChild();
  const properties = useHeadlessSelectChild();
  const [internalRef, setInternalRef] = (0, import_solid_js10.createSignal)();
  let characters = "";
  let timeout;
  (0, import_solid_js10.onCleanup)(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  (0, import_solid_js10.createEffect)(() => {
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
      (0, import_solid_js10.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  (0, import_solid_js10.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (disclosure.isOpen() && (0, import_solid_js10.untrack)(() => properties.isSelected(props.value)) && !(properties.disabled() || props.disabled)) {
        ref.focus();
      }
    }
  });
  return <import_web6.Dynamic component={Button} as={(_a = props.as) != null ? _a : "li"} {...(0, import_solid_use6.omitProps)(props, [
    "as",
    "children",
    "value",
    "ref"
  ])} disabled={props.disabled} role="option" aria-disabled={props.disabled} aria-selected={properties.isSelected(props.value)} tabindex={-1} data-sh-listbox-option={rootContext.ownerID} data-sh-disabled={props.disabled} data-sh-selected={properties.isSelected(props.value)} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></import_web6.Dynamic>;
}

// src/components/Dialog.tsx
var import_solid_js11 = require("solid-js");
var import_web7 = require("solid-js/web");
var import_solid_use7 = require("solid-use");

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
var DialogContext = (0, import_solid_js11.createContext)();
function useDialogContext(componentName) {
  const context = (0, import_solid_js11.useContext)(DialogContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Dialog>`);
}
function Dialog(props) {
  const ownerID = (0, import_solid_js11.createUniqueId)();
  const panelID = (0, import_solid_js11.createUniqueId)();
  const titleID = (0, import_solid_js11.createUniqueId)();
  const descriptionID = (0, import_solid_js11.createUniqueId)();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  (0, import_solid_js11.onCleanup)(() => {
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
    return <import_solid_js11.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web7.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use7.omitProps)(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web7.Dynamic>}><import_solid_js11.Show when={isOpen()}><import_web7.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use7.omitProps)(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web7.Dynamic></import_solid_js11.Show></import_solid_js11.Show>;
  }}</HeadlessDisclosureRoot></DialogContext.Provider>;
}
function DialogTitle(props) {
  var _a;
  const context = useDialogContext("DialogTitle");
  return <import_web7.Dynamic component={(_a = props.as) != null ? _a : "h2"} {...(0, import_solid_use7.omitProps)(props, [
    "as",
    "children"
  ])} id={context.titleID} data-sh-dialog-title={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web7.Dynamic>;
}
function DialogPanel(props) {
  var _a;
  const context = useDialogContext("DialogPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js11.createSignal)();
  (0, import_solid_js11.createEffect)(() => {
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
        (0, import_solid_js11.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <import_web7.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use7.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-dialog-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web7.Dynamic>;
}
function DialogOverlay(props) {
  var _a;
  const context = useDialogContext("DialogOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js11.createSignal)();
  (0, import_solid_js11.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js11.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <import_web7.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use7.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-dialog-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web7.Dynamic>;
}
function DialogDescription(props) {
  var _a;
  const context = useDialogContext("DialogDescription");
  return <import_web7.Dynamic component={(_a = props.as) != null ? _a : "p"} {...(0, import_solid_use7.omitProps)(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-dialog-description={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web7.Dynamic>;
}

// src/components/Toolbar.tsx
var import_solid_js12 = require("solid-js");
var import_web8 = require("solid-js/web");
var import_solid_use8 = require("solid-use");
function Toolbar(props) {
  var _a, _b;
  const toolbarID = (0, import_solid_js12.createUniqueId)();
  const [internalRef, setInternalRef] = (0, import_solid_js12.createSignal)();
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
  (0, import_solid_js12.createEffect)(() => {
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
      (0, import_solid_js12.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("focusin", onFocusIn);
      });
    }
  });
  return <import_web8.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use8.omitProps)(props, [
    "as",
    "horizontal",
    "ref"
  ])} role="toolbar" id={toolbarID} aria-orientation={((_b = props.horizontal) != null ? _b : true) ? "horizontal" : "vertical"} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} data-sh-toolbar={toolbarID} />;
}

// src/components/Select.tsx
var import_solid_js13 = require("solid-js");
var import_web9 = require("solid-js/web");
var import_solid_use9 = require("solid-use");
var SelectContext = (0, import_solid_js13.createContext)();
function useSelectContext(componentName) {
  const context = (0, import_solid_js13.useContext)(SelectContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}
function Select(props) {
  var _a;
  const ownerID = (0, import_solid_js13.createUniqueId)();
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
  }}><import_web9.Dynamic component={(_a = props.as) != null ? _a : "ul"} {...(0, import_solid_use9.omitProps)(props, [
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
  })}><HeadlessSelectRoot CONTROLLED={"value" in props} multiple={props.multiple} toggleable={props.toggleable} defaultValue={props.defaultValue} value={props.value} onChange={props.onChange} disabled={props.disabled}>{props.children}</HeadlessSelectRoot></import_web9.Dynamic></SelectContext.Provider>;
}
function SelectOption(props) {
  var _a;
  const context = useSelectContext("Select");
  const properties = useHeadlessSelectChild();
  const [internalRef, setInternalRef] = (0, import_solid_js13.createSignal)();
  let characters = "";
  let timeout;
  (0, import_solid_js13.onCleanup)(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  (0, import_solid_js13.createEffect)(() => {
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
      (0, import_solid_js13.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return <import_web9.Dynamic component={Button} as={(_a = props.as) != null ? _a : "li"} {...(0, import_solid_use9.omitProps)(props, [
    "as",
    "children",
    "value",
    "ref"
  ])} disabled={props.disabled} role="option" tabindex={-1} aria-selected={properties.isSelected(props.value)} aria-disabled={props.disabled} data-sh-select-option={context.ownerID} data-sh-selected={properties.isSelected(props.value)} data-sh-disabled={props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessSelectOption value={props.value} disabled={props.disabled}>{props.children}</HeadlessSelectOption></import_web9.Dynamic>;
}

// src/components/Toggle.tsx
var import_solid_js14 = require("solid-js");
var import_web10 = require("solid-js/web");
var import_solid_use10 = require("solid-use");
function Toggle(props) {
  const [state, setState] = (0, import_solid_js14.createSignal)((0, import_solid_js14.untrack)(() => !!props.defaultPressed));
  const toggleID = (0, import_solid_js14.createUniqueId)();
  const [internalRef, setInternalRef] = (0, import_solid_js14.createSignal)();
  (0, import_solid_js14.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        var _a;
        setState(!state());
        (_a = props.onChange) == null ? void 0 : _a.call(props, state());
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js14.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <import_web10.Dynamic component={Button} as={props.as} {...(0, import_solid_use10.omitProps)(props, [
    "defaultPressed",
    "onChange",
    "pressed",
    "ref"
  ])} data-sh-toggle={toggleID} aria-pressed={state()} data-sh-pressed={state()} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} />;
}

// src/components/Popover.tsx
var import_solid_js15 = require("solid-js");
var import_web11 = require("solid-js/web");
var import_solid_use11 = require("solid-use");
var PopoverContext = (0, import_solid_js15.createContext)();
function usePopoverContext(componentName) {
  const context = (0, import_solid_js15.useContext)(PopoverContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Popover>`);
}
function Popover(props) {
  var _a;
  const [hovering, setHovering] = (0, import_solid_js15.createSignal)(false);
  const ownerID = (0, import_solid_js15.createUniqueId)();
  const buttonID = (0, import_solid_js15.createUniqueId)();
  const panelID = (0, import_solid_js15.createUniqueId)();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  (0, import_solid_js15.onCleanup)(() => {
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
  }}><import_web11.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use11.omitProps)(props, [
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
  }} disabled={props.disabled} defaultOpen={props.defaultOpen}>{props.children}</HeadlessDisclosureRoot></import_web11.Dynamic></PopoverContext.Provider>;
}
function PopoverButton(props) {
  const context = usePopoverContext("PopoverButton");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js15.createSignal)();
  (0, import_solid_js15.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      (0, import_solid_js15.onCleanup)(() => {
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
      (0, import_solid_js15.onCleanup)(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return <import_web11.Dynamic component={Button} {...(0, import_solid_use11.omitProps)(props, [
    "children",
    "ref"
  ])} id={context.buttonID} aria-disabled={properties.disabled() || props.disabled} aria-expanded={properties.isOpen()} aria-controls={properties.isOpen() && context.panelID} data-sh-disabled={properties.disabled() || props.disabled} data-sh-expanded={properties.isOpen()} disabled={properties.disabled() || props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
    if (e instanceof HTMLElement) {
      context.anchor = e;
    }
  })} data-sh-popover-button={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web11.Dynamic>;
}
function PopoverPanel(props) {
  var _a, _b, _c;
  const context = usePopoverContext("PopoverPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js15.createSignal)();
  (0, import_solid_js15.createEffect)(() => {
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
        (0, import_solid_js15.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
          ref.removeEventListener("focusout", onBlur);
        });
      }
    }
  });
  return <import_solid_js15.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web11.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use11.omitProps)(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-popover-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web11.Dynamic>}><import_solid_js15.Show when={properties.isOpen()}><import_web11.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use11.omitProps)(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-popover-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web11.Dynamic></import_solid_js15.Show></import_solid_js15.Show>;
}
function PopoverOverlay(props) {
  var _a;
  const context = usePopoverContext("PopoverOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js15.createSignal)();
  (0, import_solid_js15.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js15.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <import_web11.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use11.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-popover-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web11.Dynamic>;
}

// src/components/Alert.tsx
var import_solid_js16 = require("solid-js");
var import_web12 = require("solid-js/web");
var import_solid_use12 = require("solid-use");
function Alert(props) {
  var _a;
  const alertID = (0, import_solid_js16.createUniqueId)();
  return <import_web12.Dynamic component={(_a = props.as) != null ? _a : "div"} id={alertID} {...(0, import_solid_use12.omitProps)(props, [
    "as"
  ])} role="alert" data-sh-alert={alertID} />;
}

// src/components/AlertDialog.tsx
var import_solid_js17 = require("solid-js");
var import_web13 = require("solid-js/web");
var import_solid_use13 = require("solid-use");
var AlertDialogContext = (0, import_solid_js17.createContext)();
function useAlertDialogContext(componentName) {
  const context = (0, import_solid_js17.useContext)(AlertDialogContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AlertDialog>`);
}
function AlertDialog(props) {
  const ownerID = (0, import_solid_js17.createUniqueId)();
  const panelID = (0, import_solid_js17.createUniqueId)();
  const titleID = (0, import_solid_js17.createUniqueId)();
  const descriptionID = (0, import_solid_js17.createUniqueId)();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  (0, import_solid_js17.onCleanup)(() => {
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
    return <import_solid_js17.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web13.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use13.omitProps)(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="alertdialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-alert-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web13.Dynamic>}><import_solid_js17.Show when={isOpen()}><import_web13.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use13.omitProps)(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="alertdialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-alert-dialog={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web13.Dynamic></import_solid_js17.Show></import_solid_js17.Show>;
  }}</HeadlessDisclosureRoot></AlertDialogContext.Provider>;
}
function AlertDialogTitle(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogTitle");
  return <import_web13.Dynamic component={(_a = props.as) != null ? _a : "h2"} {...(0, import_solid_use13.omitProps)(props, [
    "as",
    "children"
  ])} id={context.titleID} data-sh-alert-dialog-title={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web13.Dynamic>;
}
function AlertDialogPanel(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js17.createSignal)();
  (0, import_solid_js17.createEffect)(() => {
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
        (0, import_solid_js17.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <import_web13.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use13.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-alert-dialog-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web13.Dynamic>;
}
function AlertDialogOverlay(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js17.createSignal)();
  (0, import_solid_js17.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js17.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <import_web13.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use13.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-alert-dialog-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web13.Dynamic>;
}
function AlertDialogDescription(props) {
  var _a;
  const context = useAlertDialogContext("AlertDialogDescription");
  return <import_web13.Dynamic component={(_a = props.as) != null ? _a : "p"} {...(0, import_solid_use13.omitProps)(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-alert-dialog-description={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web13.Dynamic>;
}

// src/components/Toast.tsx
var import_solid_js18 = require("solid-js");
var import_web14 = require("solid-js/web");
var import_solid_use14 = require("solid-use");
function Toast(props) {
  var _a;
  const toastID = (0, import_solid_js18.createUniqueId)();
  return <import_web14.Dynamic component={(_a = props.as) != null ? _a : "div"} id={toastID} {...(0, import_solid_use14.omitProps)(props, [
    "as"
  ])} role="status" aria-live="polite" data-sh-toast={toastID} />;
}
function Toaster(props) {
  var _a;
  const toasterID = (0, import_solid_js18.createUniqueId)();
  return <import_web14.Dynamic component={(_a = props.as) != null ? _a : "div"} id={toasterID} {...(0, import_solid_use14.omitProps)(props, [
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
  const [signal, setSignal] = (0, import_solid_js18.createSignal)(toaster.getQueue());
  (0, import_solid_js18.createEffect)(() => {
    (0, import_solid_js18.onCleanup)(toaster.subscribe(setSignal));
  });
  return signal;
}

// src/components/Checkbox.tsx
var import_solid_js19 = require("solid-js");
var import_web15 = require("solid-js/web");
var import_solid_use15 = require("solid-use");
var CheckboxContext = (0, import_solid_js19.createContext)();
function useCheckboxContext(componentName) {
  const context = (0, import_solid_js19.useContext)(CheckboxContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Checkbox>`);
}
function Checkbox(props) {
  var _a;
  const ownerID = (0, import_solid_js19.createUniqueId)();
  const labelID = (0, import_solid_js19.createUniqueId)();
  const indicatorID = (0, import_solid_js19.createUniqueId)();
  const descriptionID = (0, import_solid_js19.createUniqueId)();
  return <CheckboxContext.Provider value={{
    ownerID,
    labelID,
    indicatorID,
    descriptionID
  }}><import_web15.Dynamic component={(_a = props.as) != null ? _a : Fragment} {...(0, import_solid_use15.omitProps)(props, [
    "checked",
    "as",
    "children",
    "disabled",
    "defaultChecked",
    "onChange"
  ])} disabled={props.disabled} aria-disabled={props.disabled} data-sh-disabled={props.disabled} data-sh-checkbox={ownerID}><HeadlessToggleRoot CONTROLLED={"checked" in props} checked={props.checked} onChange={props.onChange} disabled={props.disabled} defaultChecked={props.defaultChecked}>{props.children}</HeadlessToggleRoot></import_web15.Dynamic></CheckboxContext.Provider>;
}
function CheckboxIndicator(props) {
  var _a;
  const context = useCheckboxContext("CheckboxIndicator");
  const state = useHeadlessToggleChild();
  const [internalRef, setInternalRef] = (0, import_solid_js19.createSignal)();
  (0, import_solid_js19.createEffect)(() => {
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
      (0, import_solid_js19.onCleanup)(() => {
        ref.removeEventListener("click", toggle);
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return <import_web15.Dynamic component={(_a = props.as) != null ? _a : "button"} {...(0, import_solid_use15.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} id={context.indicatorID} role="checkbox" data-sh-checkbox-indicator={context.ownerID} aria-labelledby={context.labelID} aria-describedby={context.descriptionID} aria-disabled={state.disabled()} aria-checked={state.checked() == null ? "mixed" : state.checked()} data-sh-disabled={state.disabled()} data-sh-checked={state.checked()} disabled={state.disabled()} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessToggleChild>{props.children}</HeadlessToggleChild></import_web15.Dynamic>;
}
function CheckboxLabel(props) {
  var _a;
  const context = useCheckboxContext("CheckboxLabel");
  return <import_web15.Dynamic component={(_a = props.as) != null ? _a : "label"} {...(0, import_solid_use15.omitProps)(props, [
    "as"
  ])} id={context.labelID} for={context.indicatorID} data-sh-checkbox-label={context.ownerID}>{props.children}</import_web15.Dynamic>;
}
function CheckboxDescription(props) {
  var _a;
  const context = useCheckboxContext("CheckboxDescription");
  return <import_web15.Dynamic component={(_a = props.as) != null ? _a : "p"} {...(0, import_solid_use15.omitProps)(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-checkbox-description={context.ownerID}><HeadlessToggleChild>{props.children}</HeadlessToggleChild></import_web15.Dynamic>;
}

// src/components/Menu.tsx
var import_solid_js20 = require("solid-js");
var import_web16 = require("solid-js/web");
var import_solid_use16 = require("solid-use");
var MenuContext = (0, import_solid_js20.createContext)();
function useMenuContext(componentName) {
  const context = (0, import_solid_js20.useContext)(MenuContext);
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
  const ownerID = (0, import_solid_js20.createUniqueId)();
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
  }}><import_web16.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use16.omitProps)(props, [
    "as",
    "ref"
  ])} id={ownerID} role="menu" data-sh-menu={ownerID} ref={createRef(props, (e) => {
    internalRef = e;
  })} /></MenuContext.Provider>;
}
function MenuItem(props) {
  var _a;
  const context = useMenuContext("Menu");
  const [internalRef, setInternalRef] = (0, import_solid_js20.createSignal)();
  let characters = "";
  let timeout;
  (0, import_solid_js20.onCleanup)(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  (0, import_solid_js20.createEffect)(() => {
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
      (0, import_solid_js20.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return <import_web16.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use16.omitProps)(props, [
    "as",
    "disabled",
    "ref"
  ])} disabled={props.disabled} role="menuitem" tabindex={-1} aria-disabled={props.disabled} data-sh-menu-item={context.ownerID} data-sh-disabled={props.disabled} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><MenuChild disabled={!!props.disabled}>{props.children}</MenuChild></import_web16.Dynamic>;
}

// src/components/ContextMenu.tsx
var import_solid_js21 = require("solid-js");
var import_web17 = require("solid-js/web");
var import_solid_use17 = require("solid-use");
var ContextMenuContext = (0, import_solid_js21.createContext)();
function useContextMenuContext(componentName) {
  const context = (0, import_solid_js21.useContext)(ContextMenuContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ContextMenu>`);
}
function ContextMenu(props) {
  var _a;
  const ownerID = (0, import_solid_js21.createUniqueId)();
  const boundaryID = (0, import_solid_js21.createUniqueId)();
  const panelID = (0, import_solid_js21.createUniqueId)();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  (0, import_solid_js21.onCleanup)(() => {
    returnElement == null ? void 0 : returnElement.focus();
  });
  return <ContextMenuContext.Provider value={{
    ownerID,
    boundaryID,
    panelID
  }}><import_web17.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use17.omitProps)(props, [
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
  }} disabled={props.disabled} defaultOpen={props.defaultOpen}>{props.children}</HeadlessDisclosureRoot></import_web17.Dynamic></ContextMenuContext.Provider>;
}
function ContextMenuBoundary(props) {
  var _a;
  const context = useContextMenuContext("ContextMenuBoundary");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js21.createSignal)();
  (0, import_solid_js21.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = (e) => {
        if (!properties.disabled()) {
          e.preventDefault();
          properties.setState(true);
        }
      };
      ref.addEventListener("contextmenu", toggle);
      (0, import_solid_js21.onCleanup)(() => {
        ref.removeEventListener("contextmenu", toggle);
      });
    }
  });
  return <import_web17.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use17.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} id={context.boundaryID} aria-disabled={properties.disabled()} aria-expanded={properties.isOpen()} aria-controls={properties.isOpen() && context.panelID} data-sh-disabled={properties.disabled()} data-sh-expanded={properties.isOpen()} disabled={properties.disabled()} ref={createRef(props, (e) => {
    setInternalRef(() => e);
    if (e instanceof HTMLElement) {
      context.anchor = e;
    }
  })} data-sh-context-menu-boundary={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web17.Dynamic>;
}
function ContextMenuPanel(props) {
  var _a, _b, _c;
  const context = useContextMenuContext("ContextMenuPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js21.createSignal)();
  (0, import_solid_js21.createEffect)(() => {
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
        (0, import_solid_js21.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
          document.removeEventListener("click", onClickOutside);
        });
      }
    }
  });
  return <import_solid_js21.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web17.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use17.omitProps)(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-context-menu-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web17.Dynamic>}><import_solid_js21.Show when={properties.isOpen()}><import_web17.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use17.omitProps)(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-context-menu-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web17.Dynamic></import_solid_js21.Show></import_solid_js21.Show>;
}
function ContextMenuOverlay(props) {
  var _a;
  const context = useContextMenuContext("ContextMenuOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js21.createSignal)();
  (0, import_solid_js21.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js21.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <import_web17.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use17.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-context-menu-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web17.Dynamic>;
}

// src/components/Feed.tsx
var import_solid_js22 = require("solid-js");
var import_web18 = require("solid-js/web");
var import_solid_use18 = require("solid-use");
var FeedContext = (0, import_solid_js22.createContext)();
function useFeedContext(componentName) {
  const context = (0, import_solid_js22.useContext)(FeedContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Feed>`);
}
var FeedContentContext = (0, import_solid_js22.createContext)();
function useFeedContentContext(componentName) {
  const context = (0, import_solid_js22.useContext)(FeedContentContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedContent>`);
}
var FeedArticleContext = (0, import_solid_js22.createContext)();
function useFeedArticleContext(componentName) {
  const context = (0, import_solid_js22.useContext)(FeedArticleContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedArticle>`);
}
function Feed(props) {
  var _a;
  const ownerID = (0, import_solid_js22.createUniqueId)();
  const labelID = (0, import_solid_js22.createUniqueId)();
  const contentID = (0, import_solid_js22.createUniqueId)();
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
  }}><import_web18.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use18.omitProps)(props, [
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
  return <import_web18.Dynamic component={(_a = props.as) != null ? _a : "span"} {...(0, import_solid_use18.omitProps)(props, [
    "as"
  ])} id={context.labelID} data-sh-feed-label={context.ownerID} />;
}
function FeedContent(props) {
  var _a;
  const context = useFeedContext("FeedContent");
  const [internalRef, setInternalRef] = (0, import_solid_js22.createSignal)();
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
  (0, import_solid_js22.createEffect)(() => {
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
      (0, import_solid_js22.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return <FeedContentContext.Provider value={{
    focusNext,
    focusPrev
  }}><import_web18.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use18.omitProps)(props, [
    "as"
  ])} id={context.contentID} role="feed" aria-labelledby={context.labelID} aria-busy={context.busy} data-sh-feed-content={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} /></FeedContentContext.Provider>;
}
function FeedArticle(props) {
  var _a;
  const rootContext = useFeedContext("FeedArticle");
  const contentContext = useFeedContentContext("FeedArticle");
  const [internalRef, setInternalRef] = (0, import_solid_js22.createSignal)();
  (0, import_solid_js22.createEffect)(() => {
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
      (0, import_solid_js22.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  const ownerID = (0, import_solid_js22.createUniqueId)();
  const labelID = (0, import_solid_js22.createUniqueId)();
  const descriptionID = (0, import_solid_js22.createUniqueId)();
  return <FeedArticleContext.Provider value={{
    ownerID,
    labelID,
    descriptionID
  }}><import_web18.Dynamic component={(_a = props.as) != null ? _a : "article"} {...(0, import_solid_use18.omitProps)(props, [
    "as"
  ])} id={ownerID} aria-posinset={props.index + 1} aria-setsize={rootContext.size} aria-labelledby={labelID} aria-describedby={descriptionID} data-sh-feed-article={rootContext.ownerID} tabindex={0} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })} /></FeedArticleContext.Provider>;
}
function FeedArticleLabel(props) {
  var _a;
  const context = useFeedArticleContext("FeedArticleLabel");
  return <import_web18.Dynamic component={(_a = props.as) != null ? _a : "span"} {...(0, import_solid_use18.omitProps)(props, [
    "as"
  ])} id={context.labelID} data-sh-feed-article-label={context.ownerID} />;
}
function FeedArticleDescription(props) {
  var _a;
  const context = useFeedArticleContext("FeedArticleDescription");
  return <import_web18.Dynamic component={(_a = props.as) != null ? _a : "p"} {...(0, import_solid_use18.omitProps)(props, [
    "as"
  ])} id={context.descriptionID} role="feed" data-sh-feed-article-description={context.ownerID} />;
}

// src/components/CommandBar.tsx
var import_solid_js23 = require("solid-js");
var import_web19 = require("solid-js/web");
var import_solid_use19 = require("solid-use");
var CommandBarContext = (0, import_solid_js23.createContext)();
function useCommandBarContext(componentName) {
  const context = (0, import_solid_js23.useContext)(CommandBarContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <CommandBar>`);
}
function CommandBarEvents(props) {
  const properties = useHeadlessDisclosureChild();
  (0, import_solid_js23.createEffect)(() => {
    const onKeyDown = (ev) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === "k" && ev.defaultPrevented === false) {
        ev.preventDefault();
        properties.setState(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    (0, import_solid_js23.onCleanup)(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });
  return () => props.children;
}
function CommandBar(props) {
  const ownerID = (0, import_solid_js23.createUniqueId)();
  const panelID = (0, import_solid_js23.createUniqueId)();
  const titleID = (0, import_solid_js23.createUniqueId)();
  const descriptionID = (0, import_solid_js23.createUniqueId)();
  let returnElement = null;
  if (typeof document !== "undefined") {
    returnElement = document.activeElement;
  }
  (0, import_solid_js23.onCleanup)(() => {
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
    return <CommandBarEvents><import_solid_js23.Show when={(_a = props.unmount) != null ? _a : true} fallback={<import_web19.Dynamic component={(_b = props.as) != null ? _b : "div"} {...(0, import_solid_use19.omitProps)(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-command-bar={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web19.Dynamic>}><import_solid_js23.Show when={isOpen()}><import_web19.Dynamic component={(_c = props.as) != null ? _c : "div"} {...(0, import_solid_use19.omitProps)(props, [
      "as",
      "children",
      "defaultOpen",
      "unmount",
      "isOpen",
      "disabled",
      "onClose",
      "onChange"
    ])} id={ownerID} role="dialog" aria-modal aria-labelledby={titleID} aria-describedby={descriptionID} data-sh-command-bar={ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web19.Dynamic></import_solid_js23.Show></import_solid_js23.Show></CommandBarEvents>;
  }}</HeadlessDisclosureRoot></CommandBarContext.Provider>;
}
function CommandBarTitle(props) {
  var _a;
  const context = useCommandBarContext("CommandBarTitle");
  return <import_web19.Dynamic component={(_a = props.as) != null ? _a : "h2"} {...(0, import_solid_use19.omitProps)(props, [
    "as",
    "children"
  ])} id={context.titleID} data-sh-command-bar-title={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web19.Dynamic>;
}
function CommandBarPanel(props) {
  var _a;
  const context = useCommandBarContext("CommandBarPanel");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js23.createSignal)();
  (0, import_solid_js23.createEffect)(() => {
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
        (0, import_solid_js23.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return <import_web19.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use19.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} id={context.panelID} data-sh-command-bar-panel={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web19.Dynamic>;
}
function CommandBarOverlay(props) {
  var _a;
  const context = useCommandBarContext("CommandBarOverlay");
  const properties = useHeadlessDisclosureChild();
  const [internalRef, setInternalRef] = (0, import_solid_js23.createSignal)();
  (0, import_solid_js23.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js23.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return <import_web19.Dynamic component={(_a = props.as) != null ? _a : "div"} {...(0, import_solid_use19.omitProps)(props, [
    "as",
    "children",
    "ref"
  ])} data-sh-command-bar-overlay={context.ownerID} ref={createRef(props, (e) => {
    setInternalRef(() => e);
  })}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web19.Dynamic>;
}
function CommandBarDescription(props) {
  var _a;
  const context = useCommandBarContext("CommandBarDescription");
  return <import_web19.Dynamic component={(_a = props.as) != null ? _a : "p"} {...(0, import_solid_use19.omitProps)(props, [
    "as",
    "children"
  ])} id={context.descriptionID} data-sh-command-bar-description={context.ownerID}><HeadlessDisclosureChild>{props.children}</HeadlessDisclosureChild></import_web19.Dynamic>;
}

// src/components/ColorScheme.tsx
var import_solid_js24 = require("solid-js");
var import_solid_use20 = require("solid-use");
var ColorSchemeContext = (0, import_solid_js24.createContext)();
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
  const prefersDark = (0, import_solid_use20.usePrefersDark)();
  const isVisible = (0, import_solid_use20.usePageVisibility)();
  const shouldToggle = (0, import_solid_js24.createMemo)(() => get() === "system" && prefersDark() || get() === "dark");
  (0, import_solid_js24.createEffect)(() => {
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
    (0, import_solid_js24.onCleanup)(() => {
      window.removeEventListener("storage", onChange, false);
    });
  });
  (0, import_solid_js24.createEffect)(() => {
    localStorage.setItem(STORAGE_KEY, get());
  });
  (0, import_solid_js24.createEffect)(() => {
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
  const ctx = (0, import_solid_js24.useContext)(ColorSchemeContext);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.jsx.map
