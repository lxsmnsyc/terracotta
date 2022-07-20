// src/headless/disclosure/HeadlessDisclosureChild.ts
import {
  createComponent,
  createMemo
} from "solid-js";

// src/headless/disclosure/HeadlessDisclosureContext.ts
import {
  createContext,
  useContext
} from "solid-js";
var HeadlessDisclosureContext = createContext();
function useHeadlessDisclosureProperties() {
  const properties = useContext(HeadlessDisclosureContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessDisclosureProperties` must be used within `<HeadlessDisclosureRoot>`.");
}

// src/headless/disclosure/HeadlessDisclosureChild.ts
function isHeadlessDisclosureChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessDisclosureChild(props) {
  const properties = useHeadlessDisclosureProperties();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessDisclosureChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
function createHeadlessDisclosureChildProps(props) {
  return {
    get children() {
      return createComponent(HeadlessDisclosureChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/disclosure/HeadlessDisclosureRoot.ts
import {
  createComponent as createComponent2,
  createMemo as createMemo2
} from "solid-js";

// src/headless/disclosure/useHeadlessDisclosure.ts
import {
  batch,
  createSignal
} from "solid-js";
function useHeadlessDisclosure(options) {
  let signal;
  let setSignal;
  if ("defaultOpen" in options) {
    const [isOpen, setIsOpen] = createSignal(options.defaultOpen);
    signal = isOpen;
    setSignal = (value) => {
      batch(() => {
        var _a;
        setIsOpen(value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      });
    };
  } else {
    signal = () => options.isOpen;
    setSignal = (value) => {
      var _a;
      return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
    };
  }
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

// src/headless/disclosure/HeadlessDisclosureRoot.ts
function isHeadlessDisclosureRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessDisclosureRoot(props) {
  const properties = useHeadlessDisclosure(props);
  return createComponent2(HeadlessDisclosureContext.Provider, {
    value: properties,
    get children() {
      return createMemo2(() => {
        const body = props.children;
        if (isHeadlessDisclosureRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}

// src/headless/select/HeadlessSelectChild.ts
import {
  createComponent as createComponent3,
  createMemo as createMemo3
} from "solid-js";

// src/headless/select/useHeadlessSelectProperties.ts
import {
  createContext as createContext2,
  useContext as useContext2
} from "solid-js";
var HeadlessSelectContext = createContext2();
function useHeadlessSelectProperties() {
  const properties = useContext2(HeadlessSelectContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessSelectProperties` must be used within HeadlessSelectRoot.");
}

// src/headless/select/HeadlessSelectChild.ts
function isHeadlessSelectChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessSelectChild(props) {
  const properties = useHeadlessSelectProperties();
  return createMemo3(() => {
    const body = props.children;
    if (isHeadlessSelectChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
function createHeadlessSelectChild(props) {
  return {
    get children() {
      return createComponent3(HeadlessSelectChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/select/HeadlessSelectOption.ts
import {
  createComponent as createComponent4,
  createMemo as createMemo4
} from "solid-js";

// src/headless/select/useHeadlessSelectOption.ts
import {
  createContext as createContext3,
  useContext as useContext3
} from "solid-js";
var HeadlessSelectOptionContext = createContext3();
function useHeadlessSelectOptionProperties() {
  const properties = useContext3(HeadlessSelectOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessSelectOptionProperties` must be used within HeadlessSelectOption");
}
function useHeadlessSelectOption(value, disabled) {
  const properties = useHeadlessSelectProperties();
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

// src/headless/select/HeadlessSelectOption.ts
function isHeadlessSelectOptionRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessSelectOption(props) {
  const properties = useHeadlessSelectOption(() => props.value, () => !!props.disabled);
  return createComponent4(HeadlessSelectOptionContext.Provider, {
    value: properties,
    get children() {
      return createMemo4(() => {
        const body = props.children;
        if (isHeadlessSelectOptionRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}
function createHeadlessSelectOptionProps(props) {
  return {
    get children() {
      return createComponent4(HeadlessSelectOption, {
        get value() {
          return props.value;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}
function HeadlessSelectOptionChild(props) {
  const properties = useHeadlessSelectOptionProperties();
  return createMemo4(() => {
    const body = props.children;
    if (isHeadlessSelectOptionRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
function createHeadlessSelectOptionChildProps(props) {
  return {
    get children() {
      return createComponent4(HeadlessSelectOptionChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/select/HeadlessSelectRoot.ts
import {
  createComponent as createComponent5,
  createMemo as createMemo5
} from "solid-js";

// src/headless/select/useHeadlessSelectMultiple.ts
import {
  batch as batch2,
  createSignal as createSignal2,
  untrack
} from "solid-js";
function useHeadlessSelectMultiple(options) {
  const [active, setActive] = createSignal2();
  let selectedValues;
  let setSelectedValues;
  if ("defaultValue" in options) {
    const [selected, setSelected] = createSignal2(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      batch2(() => {
        var _a;
        setSelected(() => value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      });
    };
  } else {
    selectedValues = () => options.value;
    setSelectedValues = (value) => {
      var _a;
      return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
    };
  }
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

// src/headless/select/useHeadlessSelectSingle.ts
import {
  createSignal as createSignal3,
  untrack as untrack2,
  batch as batch3
} from "solid-js";
function useHeadlessSelectSingle(options) {
  const [active, setActive] = createSignal3();
  let selectedValue;
  let setSelectedValue;
  if ("defaultValue" in options) {
    const [selected, setSelected] = createSignal3(options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      batch3(() => {
        var _a;
        setSelected(() => value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      });
    };
  } else {
    selectedValue = () => options.value;
    setSelectedValue = (value) => {
      var _a;
      return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
    };
  }
  return {
    isSelected(value) {
      return Object.is(value, selectedValue());
    },
    select(value) {
      if (options.toggleable && Object.is(untrack2(selectedValue), value)) {
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

// src/headless/select/useHeadlessSelect.ts
function isHeadlessSelectMultiple(options) {
  return "multiple" in options && options.multiple;
}
function useHeadlessSelect(options) {
  if (isHeadlessSelectMultiple(options)) {
    return useHeadlessSelectMultiple(options);
  }
  return useHeadlessSelectSingle(options);
}

// src/headless/select/HeadlessSelectRoot.ts
function isHeadlessSelectRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessSelectRoot(props) {
  const properties = useHeadlessSelect(props);
  return createComponent5(HeadlessSelectContext.Provider, {
    value: properties,
    get children() {
      return createMemo5(() => {
        const body = props.children;
        if (isHeadlessSelectRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}
function createHeadlessSelectRootMultipleControlledProps(props) {
  return {
    get children() {
      return createComponent5(HeadlessSelectRoot, {
        multiple: true,
        onChange: props.onChange,
        get value() {
          return props.value;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}
function createHeadlessSelectRootMultipleUncontrolledProps(props) {
  return {
    get children() {
      return createComponent5(HeadlessSelectRoot, {
        multiple: true,
        onChange: props.onChange,
        get defaultValue() {
          return props.defaultValue;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}
function createHeadlessSelectRootSingleControlledProps(props) {
  return {
    get children() {
      return createComponent5(HeadlessSelectRoot, {
        onChange: props.onChange,
        get value() {
          return props.value;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}
function createHeadlessSelectRootSingleUncontrolledProps(props) {
  return {
    get children() {
      return createComponent5(HeadlessSelectRoot, {
        onChange: props.onChange,
        get defaultValue() {
          return props.defaultValue;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/toggle/HeadlessToggleChild.ts
import {
  createMemo as createMemo6
} from "solid-js";

// src/headless/toggle/HeadlessToggleContext.ts
import {
  createContext as createContext4,
  useContext as useContext4
} from "solid-js";
var HeadlessToggleContext = createContext4();
function useHeadlessToggleProperties() {
  const properties = useContext4(HeadlessToggleContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessToggleProperties` must be used within `<HeadlessToggleRoot>`.");
}

// src/headless/toggle/HeadlessToggleChild.ts
function isHeadlessToggleChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessToggleChild(props) {
  const properties = useHeadlessToggleProperties();
  return createMemo6(() => {
    const body = props.children;
    if (isHeadlessToggleChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

// src/headless/toggle/HeadlessToggleRoot.ts
import {
  createComponent as createComponent6,
  createMemo as createMemo7
} from "solid-js";

// src/headless/toggle/useHeadlessToggle.ts
import {
  batch as batch4,
  createSignal as createSignal4
} from "solid-js";
function useHeadlessToggle(options) {
  let signal;
  let setSignal;
  if ("defaultChecked" in options) {
    const [isOpen, setIsOpen] = createSignal4(options.defaultChecked);
    signal = isOpen;
    setSignal = (value) => {
      batch4(() => {
        var _a;
        setIsOpen(value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      });
    };
  } else {
    signal = () => options.checked;
    setSignal = (value) => {
      var _a;
      return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
    };
  }
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

// src/headless/toggle/HeadlessToggleRoot.ts
function isHeadlessToggleRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessToggleRoot(props) {
  const properties = useHeadlessToggle(props);
  return createComponent6(HeadlessToggleContext.Provider, {
    value: properties,
    get children() {
      return createMemo7(() => {
        const body = props.children;
        if (isHeadlessToggleRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}

// src/components/accordion/Accordion.ts
import {
  createComponent as createComponent12
} from "solid-js";

// src/components/accordion/AccordionMultipleControlled.ts
import {
  createComponent as createComponent8,
  mergeProps as mergeProps2
} from "solid-js";
import {
  omitProps
} from "solid-use";

// src/utils/create-dynamic.ts
import {
  createComponent as createComponent7,
  mergeProps
} from "solid-js";
import { Dynamic } from "solid-js/web";
function createDynamic(source, props) {
  return createComponent7(Dynamic, mergeProps({
    get component() {
      return source();
    }
  }, props));
}

// src/utils/dynamic-prop.ts
function isRefFunction(callback) {
  return typeof callback === "function";
}
function createRef(props, callback) {
  return (e) => {
    if ("ref" in props && isRefFunction(props.ref)) {
      props.ref(e);
    }
    callback(e);
  };
}

// src/utils/state-props.ts
function createDisabled(disabled) {
  return {
    get disabled() {
      return disabled();
    },
    get "aria-disabled"() {
      return disabled();
    },
    get "data-sh-disabled"() {
      return disabled();
    }
  };
}
function createExpanded(expanded) {
  return {
    get "aria-expanded"() {
      return expanded();
    },
    get "data-sh-expanded"() {
      return expanded();
    }
  };
}
function createChecked(checked) {
  return {
    get "aria-checked"() {
      var _a;
      return (_a = checked()) != null ? _a : "mixed";
    },
    get "data-sh-checked"() {
      var _a;
      return (_a = checked()) != null ? _a : "mixed";
    }
  };
}
function createSelected(checked) {
  return {
    get "aria-selected"() {
      return checked();
    },
    get "data-sh-selected"() {
      return checked();
    }
  };
}

// src/components/accordion/AccordionContext.ts
import {
  createContext as createContext5,
  createUniqueId,
  useContext as useContext5
} from "solid-js";

// src/utils/focus-query.ts
var QUERY = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
function getFocusableElements(node, filter) {
  const nodes = node.querySelectorAll(QUERY);
  const replicated = [];
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (!filter || !filter.contains(nodes[i])) {
      replicated.push(nodes[i]);
    }
  }
  return replicated;
}

// src/utils/focus-navigation.ts
function isFocusable(el) {
  return !el.matches('[data-sh-disabled="true"]');
}
function getNextFocusable(nodes, anchor, direction) {
  let current = anchor + direction;
  while (current >= 0 && current < nodes.length) {
    if (isFocusable(nodes[anchor])) {
      return nodes[anchor];
    }
    current += direction;
  }
  return void 0;
}
function getNextLockedFocusable(nodes, anchor, direction) {
  let current = anchor + direction;
  if (direction === 1 && current === nodes.length) {
    current = 0;
  }
  if (direction === -1 && current === -1) {
    current = nodes.length - 1;
  }
  while (anchor !== current) {
    if (isFocusable(nodes[current])) {
      return nodes[current];
    }
    current += direction;
    if (direction === 1 && current >= nodes.length) {
      current = 0;
    }
    if (direction === -1 && current < 0) {
      current = nodes.length - 1;
    }
  }
  return void 0;
}
function focusNextContinuous(nodes, targetNode) {
  var _a;
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i] && i + 1 < len) {
      (_a = getNextFocusable(nodes, i, 1)) == null ? void 0 : _a.focus();
      break;
    }
  }
}
function focusPrevContinuous(nodes, targetNode) {
  var _a;
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i] && i - 1 >= 0) {
      (_a = getNextFocusable(nodes, i, -1)) == null ? void 0 : _a.focus();
      break;
    }
  }
}
function focusNext(nodes, targetNode) {
  var _a;
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i]) {
      (_a = getNextLockedFocusable(nodes, i, 1)) == null ? void 0 : _a.focus();
      break;
    }
  }
}
function focusPrev(nodes, targetNode) {
  var _a;
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i]) {
      (_a = getNextLockedFocusable(nodes, i, -1)) == null ? void 0 : _a.focus();
      break;
    }
  }
}
function focusFirst(nodes) {
  var _a;
  if (nodes.length) {
    (_a = getNextFocusable(nodes, -1, 1)) == null ? void 0 : _a.focus();
    return true;
  }
  return false;
}
function focusLast(nodes) {
  var _a;
  if (nodes.length) {
    (_a = getNextFocusable(nodes, nodes.length, -1)) == null ? void 0 : _a.focus();
    return true;
  }
  return false;
}
function focusMatch(nodes, character) {
  var _a;
  const lower = character.toLowerCase();
  for (let i = 0, l = nodes.length; i < l; i += 1) {
    if ((_a = nodes[i].textContent) == null ? void 0 : _a.toLowerCase().startsWith(lower)) {
      nodes[i].focus();
      return;
    }
  }
}
function lockFocus(ref, reverse) {
  const nodes = getFocusableElements(ref);
  if (reverse) {
    if (!document.activeElement || !ref.contains(document.activeElement)) {
      focusLast(nodes);
    } else {
      focusPrev(nodes, document.activeElement);
    }
  } else if (!document.activeElement || !ref.contains(document.activeElement)) {
    focusFirst(nodes);
  } else {
    focusNext(nodes, document.activeElement);
  }
}

// src/utils/namespace.ts
var DATA_SET_NAMESPACE = "data-sh";
function createTag(tag) {
  return {
    [DATA_SET_NAMESPACE]: tag
  };
}

// src/utils/focus-navigator.ts
var OWNER = `${DATA_SET_NAMESPACE}-owner`;
function queryNodes(el, ownerID) {
  return el.querySelectorAll(`[${OWNER}="${ownerID}"]`);
}
function createOwnerAttribute(ownerID) {
  return {
    [OWNER]: ownerID
  };
}
var FocusNavigator = class {
  constructor(ownerID) {
    this.ownerID = ownerID;
  }
  setRef(ref) {
    this.internalRef = ref;
  }
  query(ref) {
    return queryNodes(ref, this.ownerID);
  }
  setChecked(node) {
    node.focus();
  }
  setNextChecked(node, continuous) {
    if (this.internalRef instanceof HTMLElement) {
      if (continuous) {
        focusNextContinuous(this.query(this.internalRef), node);
      } else {
        focusNext(this.query(this.internalRef), node);
      }
    }
  }
  setPrevChecked(node, continuous) {
    if (this.internalRef instanceof HTMLElement) {
      if (continuous) {
        focusPrevContinuous(this.query(this.internalRef), node);
      } else {
        focusPrev(this.query(this.internalRef), node);
      }
    }
  }
  setFirstChecked() {
    if (this.internalRef instanceof HTMLElement) {
      focusFirst(this.query(this.internalRef));
    }
  }
  setLastChecked() {
    if (this.internalRef instanceof HTMLElement) {
      focusLast(this.query(this.internalRef));
    }
  }
  setFirstMatch(character) {
    if (this.internalRef instanceof HTMLElement) {
      focusMatch(this.query(this.internalRef), character);
    }
  }
  getId() {
    return this.ownerID;
  }
};

// src/components/accordion/AccordionContext.ts
var AccordionContext = createContext5();
function useAccordionContext(componentName) {
  const context = useContext5(AccordionContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}
function createAccordionFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}

// src/components/accordion/tags.ts
var ACCORDION_TAG = createTag("accordion");
var ACCORDION_BUTTON_TAG = createTag("accordion-button");
var ACCORDION_HEADER_TAG = createTag("accordion-header");
var ACCORDION_ITEM_TAG = createTag("accordion-item");
var ACCORDION_PANEL_TAG = createTag("accordion-panel");

// src/components/accordion/AccordionMultipleControlled.ts
function AccordionMultipleControlled(props) {
  const controller = createAccordionFocusNavigator();
  return createComponent8(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps2(omitProps(props, [
        "as",
        "children",
        "disabled",
        "onChange",
        "toggleable",
        "value",
        "multiple",
        "ref"
      ]), ACCORDION_TAG, {
        ref: createRef(props, (e) => {
          controller.setRef(e);
        })
      }, createDisabled(() => props.disabled), createHeadlessSelectRootMultipleControlledProps(props)));
    }
  });
}

// src/components/accordion/AccordionMultipleUncontrolled.ts
import {
  createComponent as createComponent9,
  mergeProps as mergeProps3
} from "solid-js";
import {
  omitProps as omitProps2
} from "solid-use";
function AccordionMultipleUncontrolled(props) {
  const controller = createAccordionFocusNavigator();
  return createComponent9(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps3(omitProps2(props, [
        "as",
        "children",
        "disabled",
        "onChange",
        "toggleable",
        "defaultValue",
        "multiple",
        "ref"
      ]), ACCORDION_TAG, {
        ref: createRef(props, (e) => {
          controller.setRef(e);
        })
      }, createDisabled(() => props.disabled), createHeadlessSelectRootMultipleUncontrolledProps(props)));
    }
  });
}

// src/components/accordion/AccordionSingleControlled.ts
import {
  createComponent as createComponent10,
  mergeProps as mergeProps4
} from "solid-js";
import {
  omitProps as omitProps3
} from "solid-use";
function AccordionSingleControlled(props) {
  const controller = createAccordionFocusNavigator();
  return createComponent10(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps4(omitProps3(props, [
        "as",
        "children",
        "disabled",
        "onChange",
        "toggleable",
        "value",
        "ref"
      ]), ACCORDION_TAG, {
        ref: createRef(props, (e) => {
          controller.setRef(e);
        })
      }, createDisabled(() => props.disabled), createHeadlessSelectRootSingleControlledProps(props)));
    }
  });
}

// src/components/accordion/AccordionSingleUncontrolled.ts
import {
  createComponent as createComponent11,
  mergeProps as mergeProps5
} from "solid-js";
import {
  omitProps as omitProps4
} from "solid-use";
function AccordionSingleUncontrolled(props) {
  const controller = createAccordionFocusNavigator();
  return createComponent11(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps5(omitProps4(props, [
        "as",
        "children",
        "disabled",
        "onChange",
        "toggleable",
        "defaultValue",
        "ref"
      ]), ACCORDION_TAG, {
        ref: createRef(props, (e) => {
          controller.setRef(e);
        })
      }, createDisabled(() => props.disabled), createHeadlessSelectRootSingleUncontrolledProps(props)));
    }
  });
}

// src/components/accordion/Accordion.ts
function isAccordionUncontrolled(props) {
  return "defaultValue" in props;
}
function isAccordionMultiple(props) {
  return "multiple" in props && props.multiple;
}
function Accordion(props) {
  if (isAccordionUncontrolled(props)) {
    if (isAccordionMultiple(props)) {
      return createComponent12(AccordionMultipleUncontrolled, props);
    }
    return createComponent12(AccordionSingleUncontrolled, props);
  }
  if (isAccordionMultiple(props)) {
    return createComponent12(AccordionMultipleControlled, props);
  }
  return createComponent12(AccordionSingleControlled, props);
}

// src/components/accordion/AccordionItem.ts
import {
  createComponent as createComponent13,
  createUniqueId as createUniqueId2,
  mergeProps as mergeProps6
} from "solid-js";
import {
  omitProps as omitProps5
} from "solid-use";

// src/components/accordion/AccordionItemContext.ts
import {
  createContext as createContext6,
  useContext as useContext6
} from "solid-js";
var AccordionItemContext = createContext6();
function useAccordionItemContext(componentName) {
  const context = useContext6(AccordionItemContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AccordionItem>`);
}

// src/components/accordion/AccordionItem.ts
function AccordionItem(props) {
  useAccordionContext("AccordionItem");
  const buttonID = createUniqueId2();
  const panelID = createUniqueId2();
  return createComponent13(AccordionItemContext.Provider, {
    value: { buttonID, panelID },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps6(omitProps5(props, [
        "as",
        "children",
        "value",
        "disabled"
      ]), ACCORDION_ITEM_TAG, createDisabled(() => props.disabled), createHeadlessSelectOptionProps(props)));
    }
  });
}

// src/components/accordion/AccordionHeader.ts
import {
  mergeProps as mergeProps7
} from "solid-js";
import {
  omitProps as omitProps6
} from "solid-use";
function AccordionHeader(props) {
  useAccordionItemContext("AccordionHeader");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "h3";
  }, mergeProps7(omitProps6(props, [
    "as",
    "children"
  ]), ACCORDION_HEADER_TAG, createHeadlessSelectOptionChildProps(props)));
}

// src/components/accordion/AccordionButton.ts
import {
  createSignal as createSignal6,
  createEffect as createEffect2,
  onCleanup as onCleanup2,
  createComponent as createComponent14,
  mergeProps as mergeProps9
} from "solid-js";
import {
  omitProps as omitProps8
} from "solid-use";

// src/components/button/index.ts
import {
  createEffect,
  createSignal as createSignal5,
  onCleanup,
  mergeProps as mergeProps8
} from "solid-js";
import {
  omitProps as omitProps7
} from "solid-use";
var BUTTON_TAG = createTag("button");
function Button(props) {
  const [internalRef, setInternalRef] = createSignal5();
  createEffect(() => {
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
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "button";
  }, mergeProps8({
    get tabindex() {
      return props.disabled ? -1 : 0;
    },
    role: "button"
  }, createDisabled(() => props.disabled), omitProps7(props, [
    "as",
    "ref"
  ]), BUTTON_TAG, {
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }));
}

// src/components/accordion/AccordionButton.ts
function AccordionButton(props) {
  const rootContext = useAccordionContext("AccordionButton");
  const itemContext = useAccordionItemContext("AccordionButton");
  const properties = useHeadlessSelectOptionProperties();
  const [internalRef, setInternalRef] = createSignal6();
  createEffect2(() => {
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
      onCleanup2(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return createComponent14(Button, mergeProps9(omitProps8(props, ["children", "ref", "disabled"]), ACCORDION_BUTTON_TAG, {
    id: itemContext.buttonID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    }),
    get "aria-controls"() {
      return properties.isSelected() && itemContext.panelID;
    }
  }, createOwnerAttribute(rootContext.getId()), createDisabled(() => {
    const internalDisabled = properties.disabled();
    const granularDisabled = props.disabled;
    return internalDisabled || granularDisabled;
  }), createExpanded(() => properties.isSelected()), createHeadlessSelectOptionChildProps(props)));
}

// src/components/accordion/AccordionPanel.ts
import {
  mergeProps as mergeProps10
} from "solid-js";
import {
  omitProps as omitProps9
} from "solid-use";

// src/utils/Unmountable.ts
import {
  createComponent as createComponent15,
  Show
} from "solid-js";
function createUnmountable(props, shouldMount, render) {
  return createComponent15(Show, {
    get when() {
      var _a;
      return (_a = props.unmount) != null ? _a : true;
    },
    get fallback() {
      return render();
    },
    get children() {
      return createComponent15(Show, {
        get when() {
          return shouldMount();
        },
        get children() {
          return render();
        }
      });
    }
  });
}

// src/components/accordion/AccordionPanel.ts
function AccordionPanel(props) {
  const context = useAccordionItemContext("AccordionPanel");
  const properties = useHeadlessSelectOptionProperties();
  return createUnmountable(props, () => properties.isSelected(), () => createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps10(omitProps9(props, [
    "as",
    "children",
    "unmount"
  ]), {
    id: context.panelID,
    "aria-labelledby": context.buttonID
  }, ACCORDION_PANEL_TAG, createHeadlessSelectOptionChildProps(props))));
}

// src/components/alert/index.ts
import {
  createUniqueId as createUniqueId3,
  mergeProps as mergeProps11
} from "solid-js";
import {
  omitProps as omitProps10
} from "solid-use";
var ALERT_TAG = createTag("alert");
function Alert(props) {
  const alertID = createUniqueId3();
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps11({
    id: alertID
  }, omitProps10(props, ["as"]), ALERT_TAG, {
    role: "alert"
  }));
}

// src/components/alert-dialog/AlertDialog.ts
import {
  createComponent as createComponent18
} from "solid-js";

// src/components/alert-dialog/AlertDialogControlled.ts
import {
  createComponent as createComponent16,
  createUniqueId as createUniqueId4,
  mergeProps as mergeProps12
} from "solid-js";
import {
  omitProps as omitProps11
} from "solid-use";

// src/utils/use-focus-start-point.ts
import {
  onCleanup as onCleanup3
} from "solid-js";

// src/utils/focus-start-point.ts
function getFocusStartPoint() {
  var _a, _b;
  return (_b = (_a = window.getSelection()) == null ? void 0 : _a.focusNode) == null ? void 0 : _b.parentElement;
}
function setFocusStartPoint(element) {
  if (element) {
    const tabindex = element.getAttribute("tabindex");
    element.setAttribute("tabindex", "-1");
    element.focus();
    element.blur();
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  }
}

// src/utils/use-focus-start-point.ts
var FocusStartPoint = class {
  constructor() {
    if (typeof document !== "undefined") {
      this.returnElement = document.activeElement;
      this.fsp = getFocusStartPoint();
    }
    onCleanup3(() => {
      this.load();
    });
  }
  load() {
    if (this.returnElement instanceof HTMLElement) {
      this.returnElement.focus();
    } else {
      setFocusStartPoint(this.fsp);
    }
  }
  save() {
    this.returnElement = document.activeElement;
    this.fsp = getFocusStartPoint();
  }
};
function useFocusStartPoint() {
  return new FocusStartPoint();
}

// src/components/alert-dialog/AlertDialogContext.ts
import {
  createContext as createContext7,
  useContext as useContext7
} from "solid-js";
var AlertDialogContext = createContext7();
function useAlertDialogContext(componentName) {
  const context = useContext7(AlertDialogContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AlertDialog>`);
}

// src/components/alert-dialog/tags.ts
var ALERT_DIALOG_TAG = createTag("alert-dialog");
var ALERT_DIALOG_DESCRIPTION = createTag("alert-dialog-description");
var ALERT_DIALOG_OVERLAY = createTag("alert-dialog-overlay");
var ALERT_DIALOG_PANEL = createTag("alert-dialog-panel");
var ALERT_DIALOG_TITLE = createTag("alert-dialog-title");

// src/components/alert-dialog/AlertDialogControlled.ts
function AlertDialogControlled(props) {
  const ownerID = createUniqueId4();
  const panelID = createUniqueId4();
  const titleID = createUniqueId4();
  const descriptionID = createUniqueId4();
  const fsp = useFocusStartPoint();
  return createComponent16(AlertDialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return createComponent16(HeadlessDisclosureRoot, {
        get isOpen() {
          return props.isOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          var _a, _b, _c;
          if (value) {
            fsp.save();
            (_a = props.onOpen) == null ? void 0 : _a.call(props);
          }
          (_b = props.onChange) == null ? void 0 : _b.call(props, value);
          if (!value) {
            (_c = props.onClose) == null ? void 0 : _c.call(props);
            fsp.load();
          }
        },
        children: ({ isOpen }) => createUnmountable(props, isOpen, () => createDynamic(() => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        }, mergeProps12(omitProps11(props, [
          "as",
          "children",
          "unmount",
          "isOpen",
          "disabled",
          "onOpen",
          "onClose",
          "onChange"
        ]), ALERT_DIALOG_TAG, {
          id: ownerID,
          role: "alertdialog",
          "aria-modal": true,
          "aria-labelledby": titleID,
          "aria-describedby": descriptionID
        }, createHeadlessDisclosureChildProps(props))))
      });
    }
  });
}

// src/components/alert-dialog/AlertDialogUncontrolled.ts
import {
  createComponent as createComponent17,
  createUniqueId as createUniqueId5,
  mergeProps as mergeProps13
} from "solid-js";
import {
  omitProps as omitProps12
} from "solid-use";
function AlertDialogUncontrolled(props) {
  const ownerID = createUniqueId5();
  const panelID = createUniqueId5();
  const titleID = createUniqueId5();
  const descriptionID = createUniqueId5();
  const fsp = useFocusStartPoint();
  return createComponent17(AlertDialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return createComponent17(HeadlessDisclosureRoot, {
        get defaultOpen() {
          return props.defaultOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          var _a, _b, _c;
          if (value) {
            fsp.save();
            (_a = props.onOpen) == null ? void 0 : _a.call(props);
          }
          (_b = props.onChange) == null ? void 0 : _b.call(props, value);
          if (!value) {
            (_c = props.onClose) == null ? void 0 : _c.call(props);
            fsp.load();
          }
        },
        children: ({ isOpen }) => createUnmountable(props, isOpen, () => createDynamic(() => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        }, mergeProps13(omitProps12(props, [
          "as",
          "children",
          "unmount",
          "defaultOpen",
          "disabled",
          "onOpen",
          "onClose",
          "onChange"
        ]), ALERT_DIALOG_TAG, {
          id: ownerID,
          role: "alertdialog",
          "aria-modal": true,
          "aria-labelledby": titleID,
          "aria-describedby": descriptionID
        }, createHeadlessDisclosureChildProps(props))))
      });
    }
  });
}

// src/components/alert-dialog/AlertDialog.ts
function isAlertDialogUncontrolled(props) {
  return "defaultOpen" in props;
}
function AlertDialog(props) {
  if (isAlertDialogUncontrolled(props)) {
    return createComponent18(AlertDialogUncontrolled, props);
  }
  return createComponent18(AlertDialogControlled, props);
}

// src/components/alert-dialog/AlertDialogDescription.ts
import {
  mergeProps as mergeProps14
} from "solid-js";
import {
  omitProps as omitProps13
} from "solid-use";
function AlertDialogDescription(props) {
  const context = useAlertDialogContext("AlertDialogDescription");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "p";
  }, mergeProps14(omitProps13(props, [
    "as",
    "children"
  ]), ALERT_DIALOG_DESCRIPTION, {
    id: context.descriptionID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/alert-dialog/AlertDialogOverlay.ts
import {
  createSignal as createSignal7,
  createEffect as createEffect3,
  onCleanup as onCleanup4,
  mergeProps as mergeProps15
} from "solid-js";
import {
  omitProps as omitProps14
} from "solid-use";
function AlertDialogOverlay(props) {
  useAlertDialogContext("AlertDialogOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal7();
  createEffect3(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup4(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps15(omitProps14(props, [
    "as",
    "children",
    "ref"
  ]), ALERT_DIALOG_OVERLAY, {
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/alert-dialog/AlertDialogPanel.ts
import {
  createSignal as createSignal8,
  createEffect as createEffect4,
  onCleanup as onCleanup5,
  mergeProps as mergeProps16
} from "solid-js";
import {
  omitProps as omitProps15
} from "solid-use";
function AlertDialogPanel(props) {
  const context = useAlertDialogContext("AlertDialogPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal8();
  createEffect4(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        focusFirst(getFocusableElements(ref));
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              lockFocus(ref, e.shiftKey);
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup5(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps16(omitProps15(props, [
    "as",
    "children",
    "ref"
  ]), ALERT_DIALOG_PANEL, {
    id: context.panelID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/alert-dialog/AlertDialogTitle.ts
import {
  mergeProps as mergeProps17
} from "solid-js";
import {
  omitProps as omitProps16
} from "solid-use";
function AlertDialogTitle(props) {
  const context = useAlertDialogContext("AlertDialogTitle");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "h2";
  }, mergeProps17(omitProps16(props, [
    "as",
    "children"
  ]), ALERT_DIALOG_TITLE, {
    id: context.titleID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/checkbox/Checkbox.ts
import {
  createComponent as createComponent21
} from "solid-js";

// src/components/checkbox/CheckboxControlled.ts
import {
  createComponent as createComponent19,
  createUniqueId as createUniqueId6,
  mergeProps as mergeProps18
} from "solid-js";
import {
  omitProps as omitProps17
} from "solid-use";

// src/utils/Fragment.ts
import { createMemo as createMemo8 } from "solid-js";
function Fragment(props) {
  return createMemo8(() => props.children);
}

// src/components/checkbox/CheckboxContext.ts
import {
  createContext as createContext8,
  useContext as useContext8
} from "solid-js";
var CheckboxContext = createContext8();
function useCheckboxContext(componentName) {
  const context = useContext8(CheckboxContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Checkbox>`);
}

// src/components/checkbox/tags.ts
var CHECKBOX_TAG = createTag("checkbox");
var CHECKBOX_DESCRIPTION = createTag("checkbox-description");
var CHECKBOX_INDICATOR = createTag("checkbox-indicator");
var CHECKBOX_LABEL = createTag("checkbox-label");

// src/components/checkbox/CheckboxControlled.ts
function CheckboxControlled(props) {
  const ownerID = createUniqueId6();
  const labelID = createUniqueId6();
  const indicatorID = createUniqueId6();
  const descriptionID = createUniqueId6();
  return createComponent19(CheckboxContext.Provider, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps18(omitProps17(props, [
        "checked",
        "as",
        "children",
        "disabled",
        "onChange"
      ]), CHECKBOX_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent19(HeadlessToggleRoot, {
            onChange: props.onChange,
            get checked() {
              return props.checked;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/checkbox/CheckboxUncontrolled.ts
import {
  createComponent as createComponent20,
  createUniqueId as createUniqueId7,
  mergeProps as mergeProps19
} from "solid-js";
import {
  omitProps as omitProps18
} from "solid-use";
function CheckboxUncontrolled(props) {
  const ownerID = createUniqueId7();
  const labelID = createUniqueId7();
  const indicatorID = createUniqueId7();
  const descriptionID = createUniqueId7();
  return createComponent20(CheckboxContext.Provider, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps19(omitProps18(props, [
        "defaultChecked",
        "as",
        "children",
        "disabled",
        "onChange"
      ]), CHECKBOX_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent20(HeadlessToggleRoot, {
            onChange: props.onChange,
            get checked() {
              return props.checked;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/checkbox/Checkbox.ts
function isCheckboxUncontrolled(props) {
  return "defaultChecked" in props;
}
function Checkbox(props) {
  if (isCheckboxUncontrolled(props)) {
    return createComponent21(CheckboxUncontrolled, props);
  }
  return createComponent21(CheckboxControlled, props);
}

// src/components/checkbox/CheckboxDescription.ts
import {
  mergeProps as mergeProps20
} from "solid-js";
import {
  omitProps as omitProps19
} from "solid-use";
function CheckboxDescription(props) {
  const context = useCheckboxContext("CheckboxDescription");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "p";
  }, mergeProps20(omitProps19(props, [
    "as",
    "children"
  ]), CHECKBOX_DESCRIPTION, {
    id: context.descriptionID
  }));
}

// src/components/checkbox/CheckboxIndicator.ts
import {
  createSignal as createSignal9,
  createEffect as createEffect5,
  onCleanup as onCleanup6,
  createComponent as createComponent22,
  mergeProps as mergeProps21
} from "solid-js";
import {
  omitProps as omitProps20
} from "solid-use";
function CheckboxIndicator(props) {
  const context = useCheckboxContext("CheckboxIndicator");
  const state = useHeadlessToggleProperties();
  const [internalRef, setInternalRef] = createSignal9();
  createEffect5(() => {
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
      onCleanup6(() => {
        ref.removeEventListener("click", toggle);
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return createComponent22(Button, mergeProps21(omitProps20(props, [
    "children",
    "ref"
  ]), CHECKBOX_INDICATOR, {
    id: context.indicatorID,
    role: "checkbox",
    "aria-labelledby": context.labelID,
    "aria-describedby": context.descriptionID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createDisabled(() => state.disabled()), createChecked(() => state.checked()), {
    get children() {
      return createComponent22(HeadlessToggleChild, {
        get children() {
          return props.children;
        }
      });
    }
  }));
}

// src/components/checkbox/CheckboxLabel.ts
import {
  mergeProps as mergeProps22
} from "solid-js";
import {
  omitProps as omitProps21
} from "solid-use";
function CheckboxLabel(props) {
  const context = useCheckboxContext("CheckboxLabel");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "label";
  }, mergeProps22(omitProps21(props, [
    "as",
    "children"
  ]), CHECKBOX_LABEL, {
    id: context.labelID,
    for: context.indicatorID,
    get children() {
      return props.children;
    }
  }));
}

// src/components/color-scheme/index.ts
import {
  createContext as createContext9,
  createEffect as createEffect6,
  createMemo as createMemo9,
  onCleanup as onCleanup7,
  useContext as useContext9,
  createSignal as createSignal10,
  createComponent as createComponent23
} from "solid-js";
import {
  usePageVisibility,
  usePrefersDark
} from "solid-use";
var ColorSchemeContext = createContext9();
var STORAGE_KEY = "theme-preference";
function ColorSchemeProvider(props) {
  let get;
  let set;
  if ("initialValue" in props) {
    const [scheme, setScheme] = createSignal10(props.initialValue);
    get = scheme;
    set = (value) => {
      var _a;
      setScheme(value);
      (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    };
  } else {
    get = () => props.value;
    set = (value) => {
      var _a;
      return (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    };
  }
  const prefersDark = usePrefersDark();
  const isVisible = usePageVisibility();
  const shouldToggle = createMemo9(() => get() === "system" && prefersDark() || get() === "dark");
  createEffect6(() => {
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
    onCleanup7(() => {
      window.removeEventListener("storage", onChange, false);
    });
  });
  createEffect6(() => {
    localStorage.setItem(STORAGE_KEY, get());
  });
  createEffect6(() => {
    document.documentElement.classList.toggle("dark", shouldToggle());
  });
  return createComponent23(ColorSchemeContext.Provider, {
    value: {
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
    },
    get children() {
      return props.children;
    }
  });
}
function useColorSchemeContext() {
  const ctx = useContext9(ColorSchemeContext);
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

// src/components/command-bar/CommandBar.ts
import {
  createComponent as createComponent26
} from "solid-js";

// src/components/command-bar/CommandBarControlled.ts
import {
  createComponent as createComponent24,
  createUniqueId as createUniqueId8,
  mergeProps as mergeProps23
} from "solid-js";
import {
  omitProps as omitProps22
} from "solid-use";

// src/components/command-bar/CommandBarContext.ts
import {
  createContext as createContext10,
  useContext as useContext10
} from "solid-js";
var CommandBarContext = createContext10();
function useCommandBarContext(componentName) {
  const context = useContext10(CommandBarContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <CommandBar>`);
}

// src/components/command-bar/CommandBarEvents.ts
import {
  createEffect as createEffect7,
  onCleanup as onCleanup8,
  createMemo as createMemo10
} from "solid-js";
function CommandBarEvents(props) {
  const properties = useHeadlessDisclosureProperties();
  createEffect7(() => {
    const onKeyDown = (ev) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === "k" && ev.defaultPrevented === false) {
        ev.preventDefault();
        properties.setState(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    onCleanup8(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });
  return createMemo10(() => props.children);
}

// src/components/command-bar/tags.ts
var COMMAND_BAR_TAG = createTag("command-bar");
var COMMAND_BAR_DESCRIPTION_TAG = createTag("command-bar-description");
var COMMAND_BAR_OVERLAY_TAG = createTag("command-bar-overlay");
var COMMAND_BAR_PANEL_TAG = createTag("command-bar-panel");
var COMMAND_BAR_TITLE_TAG = createTag("command-bar-title");

// src/components/command-bar/CommandBarControlled.ts
function CommandBarControlled(props) {
  const ownerID = createUniqueId8();
  const panelID = createUniqueId8();
  const titleID = createUniqueId8();
  const descriptionID = createUniqueId8();
  const fsp = useFocusStartPoint();
  return createComponent24(CommandBarContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return createComponent24(HeadlessDisclosureRoot, {
        get isOpen() {
          return props.isOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          var _a, _b, _c;
          if (value) {
            fsp.save();
            (_a = props.onOpen) == null ? void 0 : _a.call(props);
          }
          (_b = props.onChange) == null ? void 0 : _b.call(props, value);
          if (!value) {
            (_c = props.onClose) == null ? void 0 : _c.call(props);
            fsp.load();
          }
        },
        children: ({ isOpen }) => createComponent24(CommandBarEvents, {
          get children() {
            return createUnmountable(props, isOpen, () => createDynamic(() => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            }, mergeProps23(omitProps22(props, [
              "as",
              "children",
              "unmount",
              "isOpen",
              "disabled",
              "onOpen",
              "onClose",
              "onChange"
            ]), {
              id: ownerID,
              role: "dialog",
              "aria-modal": true,
              "aria-labelledby": titleID,
              "aria-describedby": descriptionID
            }, COMMAND_BAR_TAG, createHeadlessDisclosureChildProps(props))));
          }
        })
      });
    }
  });
}

// src/components/command-bar/CommandBarUncontrolled.ts
import {
  createComponent as createComponent25,
  createUniqueId as createUniqueId9,
  mergeProps as mergeProps24
} from "solid-js";
import {
  omitProps as omitProps23
} from "solid-use";
function CommandBarUncontrolled(props) {
  const ownerID = createUniqueId9();
  const panelID = createUniqueId9();
  const titleID = createUniqueId9();
  const descriptionID = createUniqueId9();
  const fsp = useFocusStartPoint();
  return createComponent25(CommandBarContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return createComponent25(HeadlessDisclosureRoot, {
        get defaultOpen() {
          return props.defaultOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          var _a, _b, _c;
          if (value) {
            fsp.save();
            (_a = props.onOpen) == null ? void 0 : _a.call(props);
          }
          (_b = props.onChange) == null ? void 0 : _b.call(props, value);
          if (!value) {
            (_c = props.onClose) == null ? void 0 : _c.call(props);
            fsp.load();
          }
        },
        children: ({ isOpen }) => createComponent25(CommandBarEvents, {
          get children() {
            return createUnmountable(props, isOpen, () => createDynamic(() => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            }, mergeProps24(omitProps23(props, [
              "as",
              "children",
              "unmount",
              "defaultOpen",
              "disabled",
              "onOpen",
              "onClose",
              "onChange"
            ]), COMMAND_BAR_TAG, {
              id: ownerID,
              role: "dialog",
              "aria-modal": true,
              "aria-labelledby": titleID,
              "aria-describedby": descriptionID
            }, createHeadlessDisclosureChildProps(props))));
          }
        })
      });
    }
  });
}

// src/components/command-bar/CommandBar.ts
function isCommandBarUncontrolled(props) {
  return "defaultOpen" in props;
}
function CommandBar(props) {
  if (isCommandBarUncontrolled(props)) {
    return createComponent26(CommandBarUncontrolled, props);
  }
  return createComponent26(CommandBarControlled, props);
}

// src/components/command-bar/CommandBarDescription.ts
import {
  mergeProps as mergeProps25
} from "solid-js";
import {
  omitProps as omitProps24
} from "solid-use";
function CommandBarDescription(props) {
  const context = useCommandBarContext("CommandBarDescription");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "p";
  }, mergeProps25(omitProps24(props, [
    "as",
    "children"
  ]), COMMAND_BAR_DESCRIPTION_TAG, {
    id: context.descriptionID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/command-bar/CommandBarOverlay.ts
import {
  createSignal as createSignal11,
  createEffect as createEffect8,
  onCleanup as onCleanup9,
  mergeProps as mergeProps26
} from "solid-js";
import {
  omitProps as omitProps25
} from "solid-use";
function CommandBarOverlay(props) {
  useCommandBarContext("CommandBarOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal11();
  createEffect8(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup9(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps26(omitProps25(props, [
    "as",
    "children",
    "ref"
  ]), COMMAND_BAR_OVERLAY_TAG, {
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/command-bar/CommandBarPanel.ts
import {
  createSignal as createSignal12,
  createEffect as createEffect9,
  onCleanup as onCleanup10,
  mergeProps as mergeProps27
} from "solid-js";
import {
  omitProps as omitProps26
} from "solid-use";
function CommandBarPanel(props) {
  const context = useCommandBarContext("CommandBarPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal12();
  createEffect9(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        focusFirst(getFocusableElements(ref));
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              lockFocus(ref, e.shiftKey);
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup10(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps27(omitProps26(props, [
    "as",
    "children",
    "ref"
  ]), COMMAND_BAR_PANEL_TAG, {
    id: context.panelID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/command-bar/CommandBarTitle.ts
import {
  mergeProps as mergeProps28
} from "solid-js";
import {
  omitProps as omitProps27
} from "solid-use";
function CommandBarTitle(props) {
  const context = useCommandBarContext("CommandBarTitle");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "h2";
  }, mergeProps28(omitProps27(props, [
    "as",
    "children"
  ]), COMMAND_BAR_TITLE_TAG, {
    id: context.titleID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/context-menu/ContextMenu.ts
import {
  createComponent as createComponent29
} from "solid-js";

// src/components/context-menu/ContextMenuControlled.ts
import {
  createComponent as createComponent27,
  createUniqueId as createUniqueId10,
  mergeProps as mergeProps29
} from "solid-js";
import {
  omitProps as omitProps28
} from "solid-use";

// src/components/context-menu/ContextMenuContext.ts
import {
  createContext as createContext11,
  useContext as useContext11
} from "solid-js";
var ContextMenuContext = createContext11();
function useContextMenuContext(componentName) {
  const context = useContext11(ContextMenuContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ContextMenu>`);
}

// src/components/context-menu/tags.ts
var CONTEXT_MENU_TAG = createTag("context-menu");
var CONTEXT_MENU_BOUNDARY_TAG = createTag("context-menu-boundary");
var CONTEXT_MENU_OVERLAY_TAG = createTag("context-menu-overlay");
var CONTEXT_MENU_PANEL_TAG = createTag("context-menu-panel");

// src/components/context-menu/ContextMenuControlled.ts
function ContextMenuControlled(props) {
  const ownerID = createUniqueId10();
  const boundaryID = createUniqueId10();
  const panelID = createUniqueId10();
  const fsp = useFocusStartPoint();
  return createComponent27(ContextMenuContext.Provider, {
    value: {
      ownerID,
      boundaryID,
      panelID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps29(omitProps28(props, [
        "isOpen",
        "as",
        "children",
        "disabled",
        "onChange",
        "onOpen",
        "onClose"
      ]), CONTEXT_MENU_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent27(HeadlessDisclosureRoot, {
            get isOpen() {
              return props.isOpen;
            },
            get disabled() {
              return props.disabled;
            },
            onChange(value) {
              var _a, _b, _c;
              if (value) {
                fsp.save();
                (_a = props.onOpen) == null ? void 0 : _a.call(props);
              }
              (_b = props.onChange) == null ? void 0 : _b.call(props, value);
              if (!value) {
                (_c = props.onClose) == null ? void 0 : _c.call(props);
                fsp.load();
              }
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/context-menu/ContextMenuUncontrolled.ts
import {
  createComponent as createComponent28,
  createUniqueId as createUniqueId11,
  mergeProps as mergeProps30
} from "solid-js";
import {
  omitProps as omitProps29
} from "solid-use";
function ContextMenuUncontrolled(props) {
  const ownerID = createUniqueId11();
  const boundaryID = createUniqueId11();
  const panelID = createUniqueId11();
  const fsp = useFocusStartPoint();
  return createComponent28(ContextMenuContext.Provider, {
    value: {
      ownerID,
      boundaryID,
      panelID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps30(omitProps29(props, [
        "defaultOpen",
        "as",
        "children",
        "disabled",
        "onChange",
        "onOpen",
        "onClose"
      ]), CONTEXT_MENU_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent28(HeadlessDisclosureRoot, {
            get defaultOpen() {
              return props.defaultOpen;
            },
            get disabled() {
              return props.disabled;
            },
            onChange(value) {
              var _a, _b, _c;
              if (value) {
                fsp.save();
                (_a = props.onOpen) == null ? void 0 : _a.call(props);
              }
              (_b = props.onChange) == null ? void 0 : _b.call(props, value);
              if (!value) {
                (_c = props.onClose) == null ? void 0 : _c.call(props);
                fsp.load();
              }
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/context-menu/ContextMenu.ts
function isContextMenuUncontrolled(props) {
  return "defaultOpen" in props;
}
function ContextMenu(props) {
  if (isContextMenuUncontrolled(props)) {
    return createComponent29(ContextMenuUncontrolled, props);
  }
  return createComponent29(ContextMenuControlled, props);
}

// src/components/context-menu/ContextMenuBoundary.ts
import {
  createSignal as createSignal13,
  createEffect as createEffect10,
  onCleanup as onCleanup11,
  mergeProps as mergeProps31
} from "solid-js";
import {
  omitProps as omitProps30
} from "solid-use";
function ContextMenuBoundary(props) {
  const context = useContextMenuContext("ContextMenuBoundary");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal13();
  createEffect10(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = (e) => {
        if (!properties.disabled()) {
          e.preventDefault();
          properties.setState(true);
        }
      };
      ref.addEventListener("contextmenu", toggle);
      onCleanup11(() => {
        ref.removeEventListener("contextmenu", toggle);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps31(omitProps30(props, [
    "as",
    "children",
    "ref"
  ]), CONTEXT_MENU_BOUNDARY_TAG, {
    id: context.boundaryID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
      if (e instanceof HTMLElement) {
        context.anchor = e;
      }
    }),
    get "aria-controls"() {
      return properties.isOpen() && context.panelID;
    }
  }, createDisabled(() => properties.disabled()), createExpanded(() => properties.isOpen()), createHeadlessDisclosureChildProps(props)));
}

// src/components/context-menu/ContextMenuOverlay.ts
import {
  createSignal as createSignal14,
  createEffect as createEffect11,
  onCleanup as onCleanup12,
  mergeProps as mergeProps32
} from "solid-js";
import {
  omitProps as omitProps31
} from "solid-use";
function ContextMenuOverlay(props) {
  useContextMenuContext("ContextMenuOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal14();
  createEffect11(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup12(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps32(omitProps31(props, [
    "as",
    "children",
    "ref"
  ]), CONTEXT_MENU_OVERLAY_TAG, {
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/context-menu/ContextMenuPanel.ts
import {
  createSignal as createSignal15,
  createEffect as createEffect12,
  onCleanup as onCleanup13,
  mergeProps as mergeProps33
} from "solid-js";
import {
  omitProps as omitProps32
} from "solid-use";
function ContextMenuPanel(props) {
  const context = useContextMenuContext("ContextMenuPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal15();
  createEffect12(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        focusFirst(getFocusableElements(ref));
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              lockFocus(ref, e.shiftKey);
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
        onCleanup13(() => {
          ref.removeEventListener("keydown", onKeyDown);
          document.removeEventListener("click", onClickOutside);
        });
      }
    }
  });
  return createUnmountable(props, () => properties.isOpen(), () => createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps33(omitProps32(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ]), CONTEXT_MENU_PANEL_TAG, {
    id: context.panelID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props))));
}

// src/components/dialog/Dialog.ts
import {
  createComponent as createComponent32
} from "solid-js";

// src/components/dialog/DialogControlled.ts
import {
  createUniqueId as createUniqueId12,
  mergeProps as mergeProps34,
  createComponent as createComponent30
} from "solid-js";
import {
  omitProps as omitProps33
} from "solid-use";

// src/components/dialog/DialogContext.ts
import {
  createContext as createContext12,
  useContext as useContext12
} from "solid-js";
var DialogContext = createContext12();
function useDialogContext(componentName) {
  const context = useContext12(DialogContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Dialog>`);
}

// src/components/dialog/tags.ts
var DIALOG_TAG = createTag("dialog");
var DIALOG_DESCRIPTION_TAG = createTag("dialog-description");
var DIALOG_OVERLAY_TAG = createTag("dialog-overlay");
var DIALOG_PANEL_TAG = createTag("dialog-panel");
var DIALOG_TITLE_TAG = createTag("dialog-title");

// src/components/dialog/DialogControlled.ts
function DialogControlled(props) {
  const ownerID = createUniqueId12();
  const panelID = createUniqueId12();
  const titleID = createUniqueId12();
  const descriptionID = createUniqueId12();
  const fsp = useFocusStartPoint();
  return createComponent30(DialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return createComponent30(HeadlessDisclosureRoot, {
        get isOpen() {
          return props.isOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          var _a, _b, _c;
          if (value) {
            fsp.save();
            (_a = props.onOpen) == null ? void 0 : _a.call(props);
          }
          (_b = props.onChange) == null ? void 0 : _b.call(props, value);
          if (!value) {
            (_c = props.onClose) == null ? void 0 : _c.call(props);
            fsp.load();
          }
        },
        children: ({ isOpen }) => createUnmountable(props, isOpen, () => createDynamic(() => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        }, mergeProps34(omitProps33(props, [
          "as",
          "children",
          "unmount",
          "isOpen",
          "disabled",
          "onOpen",
          "onClose",
          "onChange"
        ]), DIALOG_TAG, {
          id: ownerID,
          role: "alertdialog",
          "aria-modal": true,
          "aria-labelledby": titleID,
          "aria-describedby": descriptionID
        }, createHeadlessDisclosureChildProps(props))))
      });
    }
  });
}

// src/components/dialog/DialogUncontrolled.ts
import {
  createUniqueId as createUniqueId13,
  mergeProps as mergeProps35,
  createComponent as createComponent31
} from "solid-js";
import {
  omitProps as omitProps34
} from "solid-use";
function DialogUncontrolled(props) {
  const ownerID = createUniqueId13();
  const panelID = createUniqueId13();
  const titleID = createUniqueId13();
  const descriptionID = createUniqueId13();
  const fsp = useFocusStartPoint();
  return createComponent31(DialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return createComponent31(HeadlessDisclosureRoot, {
        get defaultOpen() {
          return props.defaultOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          var _a, _b, _c;
          if (value) {
            fsp.save();
            (_a = props.onOpen) == null ? void 0 : _a.call(props);
          }
          (_b = props.onChange) == null ? void 0 : _b.call(props, value);
          if (!value) {
            (_c = props.onClose) == null ? void 0 : _c.call(props);
            fsp.load();
          }
        },
        children: ({ isOpen }) => createUnmountable(props, isOpen, () => createDynamic(() => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        }, mergeProps35(omitProps34(props, [
          "as",
          "children",
          "unmount",
          "defaultOpen",
          "disabled",
          "onOpen",
          "onClose",
          "onChange"
        ]), DIALOG_TAG, {
          id: ownerID,
          role: "alertdialog",
          "aria-modal": true,
          "aria-labelledby": titleID,
          "aria-describedby": descriptionID
        }, createHeadlessDisclosureChildProps(props))))
      });
    }
  });
}

// src/components/dialog/Dialog.ts
function isDialogUncontrolled(props) {
  return "defaultOpen" in props;
}
function Dialog(props) {
  if (isDialogUncontrolled(props)) {
    return createComponent32(DialogUncontrolled, props);
  }
  return createComponent32(DialogControlled, props);
}

// src/components/dialog/DialogDescription.ts
import {
  mergeProps as mergeProps36
} from "solid-js";
import {
  omitProps as omitProps35
} from "solid-use";
function DialogDescription(props) {
  const context = useDialogContext("DialogDescription");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "p";
  }, mergeProps36(omitProps35(props, [
    "as",
    "children"
  ]), DIALOG_DESCRIPTION_TAG, {
    id: context.descriptionID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/dialog/DialogOverlay.ts
import {
  createSignal as createSignal16,
  createEffect as createEffect13,
  onCleanup as onCleanup14,
  mergeProps as mergeProps37
} from "solid-js";
import {
  omitProps as omitProps36
} from "solid-use";
function DialogOverlay(props) {
  useDialogContext("DialogOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal16();
  createEffect13(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup14(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps37(omitProps36(props, [
    "as",
    "children",
    "ref"
  ]), DIALOG_OVERLAY_TAG, {
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/dialog/DialogPanel.ts
import {
  createSignal as createSignal17,
  createEffect as createEffect14,
  onCleanup as onCleanup15,
  mergeProps as mergeProps38
} from "solid-js";
import {
  omitProps as omitProps37
} from "solid-use";
function DialogPanel(props) {
  const context = useDialogContext("DialogPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal17();
  createEffect14(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        focusFirst(getFocusableElements(ref));
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              lockFocus(ref, e.shiftKey);
            } else if (e.key === "Escape") {
              properties.setState(false);
            }
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        onCleanup15(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps38(omitProps37(props, [
    "as",
    "children",
    "ref"
  ]), DIALOG_PANEL_TAG, {
    id: context.panelID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/dialog/DialogTitle.ts
import {
  mergeProps as mergeProps39
} from "solid-js";
import {
  omitProps as omitProps38
} from "solid-use";
function DialogTitle(props) {
  const context = useDialogContext("DialogTitle");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "h2";
  }, mergeProps39(omitProps38(props, [
    "as",
    "children"
  ]), DIALOG_TITLE_TAG, {
    id: context.titleID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/disclosure/Disclosure.ts
import {
  createComponent as createComponent35
} from "solid-js";

// src/components/disclosure/DisclosureControlled.ts
import {
  createComponent as createComponent33,
  createUniqueId as createUniqueId14,
  mergeProps as mergeProps40
} from "solid-js";
import {
  omitProps as omitProps39
} from "solid-use";

// src/components/disclosure/DisclosureContext.ts
import {
  createContext as createContext13,
  useContext as useContext13
} from "solid-js";
var DisclosureContext = createContext13();
function useDisclosureContext(componentName) {
  const context = useContext13(DisclosureContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Disclosure>`);
}

// src/components/disclosure/tags.ts
var DISCLOSURE_TAG = createTag("disclosure");
var DISCLOSURE_BUTTON_TAG = createTag("disclosure-button");
var DISCLOSURE_PANEL_TAG = createTag("disclosure-panel");

// src/components/disclosure/DisclosureControlled.ts
function DisclosureControlled(props) {
  const ownerID = createUniqueId14();
  const buttonID = createUniqueId14();
  const panelID = createUniqueId14();
  return createComponent33(DisclosureContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps40(omitProps39(props, [
        "isOpen",
        "as",
        "children",
        "disabled",
        "onChange"
      ]), DISCLOSURE_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent33(HeadlessDisclosureRoot, {
            get isOpen() {
              return props.isOpen;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            },
            onChange: props.onChange
          });
        }
      }));
    }
  });
}

// src/components/disclosure/DisclosureUncontrolled.ts
import {
  createComponent as createComponent34,
  createUniqueId as createUniqueId15,
  mergeProps as mergeProps41
} from "solid-js";
import {
  omitProps as omitProps40
} from "solid-use";
function DisclosureUncontrolled(props) {
  const ownerID = createUniqueId15();
  const buttonID = createUniqueId15();
  const panelID = createUniqueId15();
  return createComponent34(DisclosureContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps41(omitProps40(props, [
        "defaultOpen",
        "as",
        "children",
        "disabled",
        "onChange"
      ]), DISCLOSURE_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent34(HeadlessDisclosureRoot, {
            get defaultOpen() {
              return props.defaultOpen;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            },
            onChange: props.onChange
          });
        }
      }));
    }
  });
}

// src/components/disclosure/Disclosure.ts
function isDisclosureUncontrolled(props) {
  return "defaultOpen" in props;
}
function Disclosure(props) {
  if (isDisclosureUncontrolled(props)) {
    return createComponent35(DisclosureUncontrolled, props);
  }
  return createComponent35(DisclosureControlled, props);
}

// src/components/disclosure/DisclosureButton.ts
import {
  createSignal as createSignal18,
  createEffect as createEffect15,
  onCleanup as onCleanup16,
  mergeProps as mergeProps42
} from "solid-js";
import {
  createComponent as createComponent36
} from "solid-js/web";
import {
  omitProps as omitProps41
} from "solid-use";
function DisclosureButton(props) {
  const context = useDisclosureContext("DisclosureButton");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal18();
  createEffect15(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      onCleanup16(() => {
        ref.removeEventListener("click", toggle);
      });
    }
  });
  return createComponent36(Button, mergeProps42(omitProps41(props, [
    "children",
    "ref"
  ]), DISCLOSURE_BUTTON_TAG, {
    id: context.buttonID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    }),
    get "aria-controls"() {
      return properties.isOpen() && context.panelID;
    }
  }, createDisabled(() => {
    const internalDisabled = properties.disabled();
    const granularDisabled = props.disabled;
    return internalDisabled || granularDisabled;
  }), createExpanded(() => properties.isOpen()), createHeadlessDisclosureChildProps(props)));
}

// src/components/disclosure/DisclosurePanel.ts
import {
  mergeProps as mergeProps43
} from "solid-js";
import {
  omitProps as omitProps42
} from "solid-use";
function DisclosurePanel(props) {
  const context = useDisclosureContext("DisclosurePanel");
  const properties = useHeadlessDisclosureProperties();
  return createUnmountable(props, () => properties.isOpen(), () => createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps43(omitProps42(props, [
    "as",
    "unmount",
    "children"
  ]), DISCLOSURE_PANEL_TAG, {
    id: context.panelID
  }, createHeadlessDisclosureChildProps(props))));
}

// src/components/feed/Feed.ts
import {
  createComponent as createComponent37,
  createUniqueId as createUniqueId16,
  mergeProps as mergeProps44
} from "solid-js";
import {
  omitProps as omitProps43
} from "solid-use";

// src/components/feed/FeedContext.ts
import {
  createContext as createContext14,
  useContext as useContext14
} from "solid-js";
var FeedContext = createContext14();
function useFeedContext(componentName) {
  const context = useContext14(FeedContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Feed>`);
}

// src/components/feed/tags.ts
var FEED_TAG = createTag("feed");
var FEED_ARTICLE_TAG = createTag("feed-article");
var FEED_ARTICLE_DESCRIPTION_TAG = createTag("feed-article-description");
var FEED_ARTICLE_LABEL_TAG = createTag("feed-article-label");
var FEED_CONTENT_TAG = createTag("feed-content");
var FEED_LABEL_TAG = createTag("feed-label");

// src/components/feed/Feed.ts
function Feed(props) {
  const ownerID = createUniqueId16();
  const labelID = createUniqueId16();
  const contentID = createUniqueId16();
  let internalRef;
  return createComponent37(FeedContext.Provider, {
    value: {
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
        focusNext(getFocusableElements(document.documentElement), internalRef);
      },
      focusPrev() {
        focusPrev(getFocusableElements(document.documentElement), internalRef);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps44(omitProps43(props, [
        "as",
        "busy",
        "size"
      ]), FEED_TAG, {
        id: ownerID,
        ref: createRef(props, (e) => {
          internalRef = e;
        })
      }));
    }
  });
}

// src/components/feed/FeedArticle.ts
import {
  createComponent as createComponent38,
  createEffect as createEffect16,
  createSignal as createSignal19,
  createUniqueId as createUniqueId17,
  mergeProps as mergeProps45,
  onCleanup as onCleanup17
} from "solid-js";
import {
  omitProps as omitProps44
} from "solid-use";

// src/components/feed/FeedArticleContext.ts
import {
  createContext as createContext15,
  useContext as useContext15
} from "solid-js";
var FeedArticleContext = createContext15();
function useFeedArticleContext(componentName) {
  const context = useContext15(FeedArticleContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedArticle>`);
}

// src/components/feed/FeedContentContext.ts
import {
  createContext as createContext16,
  useContext as useContext16
} from "solid-js";
var FeedContentContext = createContext16();
function useFeedContentContext(componentName) {
  const context = useContext16(FeedContentContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedContent>`);
}
function createFeedArticleFocusNavigator(owner) {
  return new FocusNavigator(owner);
}

// src/components/feed/FeedArticle.ts
function FeedArticle(props) {
  const rootContext = useFeedContext("FeedArticle");
  const contentContext = useFeedContentContext("FeedArticle");
  const [internalRef, setInternalRef] = createSignal19();
  createEffect16(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        switch (e.key) {
          case "PageUp":
            contentContext.setPrevChecked(ref);
            break;
          case "PageDown":
            contentContext.setNextChecked(ref);
            break;
          default:
            break;
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      onCleanup17(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  const ownerID = createUniqueId17();
  const labelID = createUniqueId17();
  const descriptionID = createUniqueId17();
  return createComponent38(FeedArticleContext.Provider, {
    value: {
      ownerID,
      labelID,
      descriptionID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "article";
      }, mergeProps45(omitProps44(props, ["as"]), FEED_ARTICLE_TAG, createOwnerAttribute(rootContext.ownerID), {
        id: ownerID,
        "aria-labelledby": labelID,
        "aria-describedby": descriptionID,
        tabindex: 0,
        get "aria-posinset"() {
          return props.index + 1;
        },
        get "aria-setsize"() {
          return rootContext.size;
        },
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      }));
    }
  });
}

// src/components/feed/FeedArticleDescription.ts
import {
  mergeProps as mergeProps46
} from "solid-js";
import {
  omitProps as omitProps45
} from "solid-use";
function FeedArticleDescription(props) {
  const context = useFeedArticleContext("FeedArticleDescription");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "p";
  }, mergeProps46(omitProps45(props, ["as"]), FEED_ARTICLE_DESCRIPTION_TAG, {
    id: context.descriptionID
  }));
}

// src/components/feed/FeedArticleLabel.ts
import {
  mergeProps as mergeProps47
} from "solid-js";
import {
  omitProps as omitProps46
} from "solid-use";
function FeedArticleLabel(props) {
  const context = useFeedArticleContext("FeedArticleLabel");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "span";
  }, mergeProps47(omitProps46(props, ["as"]), FEED_ARTICLE_LABEL_TAG, {
    id: context.labelID
  }));
}

// src/components/feed/FeedContent.ts
import {
  createSignal as createSignal20,
  createEffect as createEffect17,
  onCleanup as onCleanup18,
  createComponent as createComponent39,
  mergeProps as mergeProps48
} from "solid-js";
import {
  omitProps as omitProps47
} from "solid-use";
function FeedContent(props) {
  const context = useFeedContext("FeedContent");
  const controller = createFeedArticleFocusNavigator(context.ownerID);
  const [internalRef, setInternalRef] = createSignal20();
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
      onCleanup18(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return createComponent39(FeedContentContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps48(omitProps47(props, ["as"]), FEED_CONTENT_TAG, {
        id: context.contentID,
        role: "feed",
        "aria-labelledby": context.labelID,
        get "aria-busy"() {
          return context.busy;
        },
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
          controller.setRef(e);
        })
      }));
    }
  });
}

// src/components/feed/FeedLabel.ts
import {
  mergeProps as mergeProps49
} from "solid-js";
import {
  omitProps as omitProps48
} from "solid-use";
function FeedLabel(props) {
  const context = useFeedContext("FeedLabel");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "span";
  }, mergeProps49(omitProps48(props, ["as"]), FEED_LABEL_TAG, {
    id: context.labelID
  }));
}

// src/components/listbox/Listbox.ts
import {
  createComponent as createComponent48
} from "solid-js";

// src/components/listbox/ListboxMCSCD.ts
import {
  createComponent as createComponent40,
  createSignal as createSignal21,
  createUniqueId as createUniqueId18,
  mergeProps as mergeProps50
} from "solid-js";
import {
  omitProps as omitProps49
} from "solid-use";

// src/components/listbox/ListboxContext.ts
import {
  createContext as createContext17,
  useContext as useContext17
} from "solid-js";
var ListboxContext = createContext17();
function useListboxContext(componentName) {
  const context = useContext17(ListboxContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Listbox>`);
}

// src/components/listbox/tags.ts
var LISTBOX_TAG = createTag("listbox");
var LISTBOX_BUTTON_TAG = createTag("listbox-button");
var LISTBOX_LABEL_TAG = createTag("listbox-label");
var LISTBOX_OPTIONS_TAG = createTag("listbox-options");
var LISTBOX_OPTION_TAG = createTag("listbox-option");

// src/components/listbox/ListboxMCSCD.ts
function ListboxMCSCD(props) {
  const [hovering, setHovering] = createSignal21(false);
  const ownerID = createUniqueId18();
  const labelID = createUniqueId18();
  const buttonID = createUniqueId18();
  const optionsID = createUniqueId18();
  const fsp = useFocusStartPoint();
  return createComponent40(ListboxContext.Provider, {
    value: {
      multiple: true,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps50(omitProps49(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "isOpen",
        "multiple",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "value"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent40(HeadlessSelectRoot, {
            multiple: true,
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get value() {
              return props.value;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent40(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get isOpen() {
                  return props.isOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxMCSUD.ts
import {
  createComponent as createComponent41,
  createSignal as createSignal22,
  createUniqueId as createUniqueId19,
  mergeProps as mergeProps51
} from "solid-js";
import {
  omitProps as omitProps50
} from "solid-use";
function ListboxMCSUD(props) {
  const [hovering, setHovering] = createSignal22(false);
  const ownerID = createUniqueId19();
  const labelID = createUniqueId19();
  const buttonID = createUniqueId19();
  const optionsID = createUniqueId19();
  const fsp = useFocusStartPoint();
  return createComponent41(ListboxContext.Provider, {
    value: {
      multiple: true,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps51(omitProps50(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "defaultOpen",
        "multiple",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "value"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent41(HeadlessSelectRoot, {
            multiple: true,
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get value() {
              return props.value;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent41(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get defaultOpen() {
                  return props.defaultOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxMUSCD.ts
import {
  createComponent as createComponent42,
  createSignal as createSignal23,
  createUniqueId as createUniqueId20,
  mergeProps as mergeProps52
} from "solid-js";
import {
  omitProps as omitProps51
} from "solid-use";
function ListboxMUSCD(props) {
  const [hovering, setHovering] = createSignal23(false);
  const ownerID = createUniqueId20();
  const labelID = createUniqueId20();
  const buttonID = createUniqueId20();
  const optionsID = createUniqueId20();
  const fsp = useFocusStartPoint();
  return createComponent42(ListboxContext.Provider, {
    value: {
      multiple: true,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps52(omitProps51(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "isOpen",
        "multiple",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "defaultValue"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent42(HeadlessSelectRoot, {
            multiple: true,
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get defaultValue() {
              return props.defaultValue;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent42(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get isOpen() {
                  return props.isOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxMUSUD.ts
import {
  createComponent as createComponent43,
  createSignal as createSignal24,
  createUniqueId as createUniqueId21,
  mergeProps as mergeProps53
} from "solid-js";
import {
  omitProps as omitProps52
} from "solid-use";
function ListboxMUSUD(props) {
  const [hovering, setHovering] = createSignal24(false);
  const ownerID = createUniqueId21();
  const labelID = createUniqueId21();
  const buttonID = createUniqueId21();
  const optionsID = createUniqueId21();
  const fsp = useFocusStartPoint();
  return createComponent43(ListboxContext.Provider, {
    value: {
      multiple: true,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps53(omitProps52(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "defaultOpen",
        "multiple",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "defaultValue"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent43(HeadlessSelectRoot, {
            multiple: true,
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get defaultValue() {
              return props.defaultValue;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent43(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get defaultOpen() {
                  return props.defaultOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxSCSCD.ts
import {
  createComponent as createComponent44,
  createSignal as createSignal25,
  createUniqueId as createUniqueId22,
  mergeProps as mergeProps54
} from "solid-js";
import {
  omitProps as omitProps53
} from "solid-use";
function ListboxSCSCD(props) {
  const [hovering, setHovering] = createSignal25(false);
  const ownerID = createUniqueId22();
  const labelID = createUniqueId22();
  const buttonID = createUniqueId22();
  const optionsID = createUniqueId22();
  const fsp = useFocusStartPoint();
  return createComponent44(ListboxContext.Provider, {
    value: {
      multiple: false,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps54(omitProps53(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "isOpen",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "value"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent44(HeadlessSelectRoot, {
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get value() {
              return props.value;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent44(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get isOpen() {
                  return props.isOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxSCSUD.ts
import {
  createComponent as createComponent45,
  createSignal as createSignal26,
  createUniqueId as createUniqueId23,
  mergeProps as mergeProps55
} from "solid-js";
import {
  omitProps as omitProps54
} from "solid-use";
function ListboxSCSUD(props) {
  const [hovering, setHovering] = createSignal26(false);
  const ownerID = createUniqueId23();
  const labelID = createUniqueId23();
  const buttonID = createUniqueId23();
  const optionsID = createUniqueId23();
  const fsp = useFocusStartPoint();
  return createComponent45(ListboxContext.Provider, {
    value: {
      multiple: false,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps55(omitProps54(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "defaultOpen",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "value"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent45(HeadlessSelectRoot, {
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get value() {
              return props.value;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent45(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get defaultOpen() {
                  return props.defaultOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxSUSCD.ts
import {
  createComponent as createComponent46,
  createSignal as createSignal27,
  createUniqueId as createUniqueId24,
  mergeProps as mergeProps56
} from "solid-js";
import {
  omitProps as omitProps55
} from "solid-use";
function ListboxSUSCD(props) {
  const [hovering, setHovering] = createSignal27(false);
  const ownerID = createUniqueId24();
  const labelID = createUniqueId24();
  const buttonID = createUniqueId24();
  const optionsID = createUniqueId24();
  const fsp = useFocusStartPoint();
  return createComponent46(ListboxContext.Provider, {
    value: {
      multiple: false,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps56(omitProps55(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "isOpen",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "defaultValue"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent46(HeadlessSelectRoot, {
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get defaultValue() {
              return props.defaultValue;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent46(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get isOpen() {
                  return props.isOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/ListboxSUSUD.ts
import {
  createComponent as createComponent47,
  createSignal as createSignal28,
  createUniqueId as createUniqueId25,
  mergeProps as mergeProps57
} from "solid-js";
import {
  omitProps as omitProps56
} from "solid-use";
function ListboxSUSUD(props) {
  const [hovering, setHovering] = createSignal28(false);
  const ownerID = createUniqueId25();
  const labelID = createUniqueId25();
  const buttonID = createUniqueId25();
  const optionsID = createUniqueId25();
  const fsp = useFocusStartPoint();
  return createComponent47(ListboxContext.Provider, {
    value: {
      multiple: false,
      ownerID,
      labelID,
      buttonID,
      optionsID,
      get horizontal() {
        return props.horizontal;
      },
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : Fragment;
      }, mergeProps57(omitProps56(props, [
        "as",
        "children",
        "disabled",
        "horizontal",
        "defaultOpen",
        "onDisclosureChange",
        "onSelectChange",
        "toggleable",
        "defaultValue"
      ]), LISTBOX_TAG, {
        "aria-labelledby": labelID
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent47(HeadlessSelectRoot, {
            onChange: props.onSelectChange,
            get toggleable() {
              return props.toggleable;
            },
            get defaultValue() {
              return props.defaultValue;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return createComponent47(HeadlessDisclosureRoot, {
                onChange(value) {
                  var _a;
                  if (value) {
                    fsp.save();
                  }
                  (_a = props.onDisclosureChange) == null ? void 0 : _a.call(props, value);
                  if (!value) {
                    fsp.load();
                  }
                },
                get defaultOpen() {
                  return props.defaultOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                }
              });
            }
          });
        }
      }));
    }
  });
}

// src/components/listbox/Listbox.ts
function isListboxMultiple(props) {
  return "multiple" in props && props.multiple;
}
function isListboxSelectUncontrolled(props) {
  return "defaultValue" in props;
}
function isListboxDisclosureUncontrolled(props) {
  return "defaultOpen" in props;
}
function Listbox(props) {
  if (isListboxMultiple(props)) {
    if (isListboxSelectUncontrolled(props)) {
      if (isListboxDisclosureUncontrolled(props)) {
        return createComponent48(ListboxMUSUD, props);
      }
      return createComponent48(ListboxMUSCD, props);
    }
    if (isListboxDisclosureUncontrolled(props)) {
      return createComponent48(ListboxMCSUD, props);
    }
    return createComponent48(ListboxMCSCD, props);
  }
  if (isListboxSelectUncontrolled(props)) {
    if (isListboxDisclosureUncontrolled(props)) {
      return createComponent48(ListboxSUSUD, props);
    }
    return createComponent48(ListboxSUSCD, props);
  }
  if (isListboxDisclosureUncontrolled(props)) {
    return createComponent48(ListboxSCSUD, props);
  }
  return createComponent48(ListboxSCSCD, props);
}

// src/components/listbox/ListboxButton.ts
import {
  createSignal as createSignal29,
  createEffect as createEffect18,
  onCleanup as onCleanup19,
  createComponent as createComponent49,
  mergeProps as mergeProps58
} from "solid-js";
import {
  omitProps as omitProps57
} from "solid-use";
function ListboxButton(props) {
  const context = useListboxContext("ListboxButton");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal29();
  createEffect18(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = (e) => {
        console.log("Toggled", e.currentTarget);
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
              properties.setState(!properties.isOpen());
              break;
            default:
              break;
          }
        }
      };
      ref.addEventListener("click", toggle);
      ref.addEventListener("keydown", onKeyDown);
      onCleanup19(() => {
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
      onCleanup19(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return createComponent49(Button, mergeProps58(omitProps57(props, [
    "children",
    "ref"
  ]), LISTBOX_BUTTON_TAG, {
    id: context.buttonID,
    "aria-haspopup": "listbox",
    "aria-controls": context.optionsID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
      if (e instanceof HTMLElement) {
        context.anchor = e;
      }
    })
  }, createDisabled(() => {
    const internalDisabled = properties.disabled();
    const granularDisabled = props.disabled;
    return internalDisabled || granularDisabled;
  }), createExpanded(() => properties.isOpen()), createHeadlessDisclosureChildProps(props)));
}

// src/components/listbox/ListboxLabel.ts
import {
  mergeProps as mergeProps59
} from "solid-js";
import {
  omitProps as omitProps58
} from "solid-use";
function ListboxLabel(props) {
  const context = useListboxContext("ListboxLabel");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "label";
  }, mergeProps59(omitProps58(props, [
    "as",
    "children"
  ]), LISTBOX_LABEL_TAG, {
    id: context.labelID
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/listbox/ListboxOption.ts
import {
  createSignal as createSignal30,
  onCleanup as onCleanup20,
  createEffect as createEffect19,
  untrack as untrack3,
  createComponent as createComponent50,
  mergeProps as mergeProps60,
  batch as batch5
} from "solid-js";
import {
  omitProps as omitProps59
} from "solid-use";

// src/components/listbox/ListboxOptionsContext.ts
import {
  createContext as createContext18,
  useContext as useContext18
} from "solid-js";
var ListboxOptionsContext = createContext18();
function useListboxOptionsContext(componentName) {
  const context = useContext18(ListboxOptionsContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ListboxOptions>`);
}
function createListboxOptionsFocusNavigator(owner) {
  return new FocusNavigator(owner);
}

// src/components/listbox/ListboxOption.ts
function ListboxOption(props) {
  const rootContext = useListboxContext("ListboxOptions");
  const context = useListboxOptionsContext("ListboxOptions");
  const disclosure = useHeadlessDisclosureProperties();
  const properties = useHeadlessSelectProperties();
  const [internalRef, setInternalRef] = createSignal30();
  let characters = "";
  let timeout;
  onCleanup20(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };
  createEffect19(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!isDisabled()) {
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
              batch5(() => {
                properties.select(props.value);
                if (!rootContext.multiple) {
                  e.preventDefault();
                  disclosure.setState(false);
                }
              });
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
        if (!isDisabled()) {
          batch5(() => {
            properties.select(props.value);
            if (!rootContext.multiple) {
              disclosure.setState(false);
            }
          });
        }
      };
      const onFocus = () => {
        if (!isDisabled()) {
          properties.focus(props.value);
        }
      };
      const onBlur = () => {
        if (!isDisabled()) {
          properties.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      onCleanup20(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  createEffect19(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (disclosure.isOpen() && untrack3(() => properties.isSelected(props.value)) && !isDisabled()) {
        ref.focus();
      }
    }
  });
  return createComponent50(Button, mergeProps60(omitProps59(props, [
    "as",
    "children",
    "value",
    "ref"
  ]), LISTBOX_OPTION_TAG, createOwnerAttribute(context.getId()), {
    role: "option",
    tabindex: -1,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    }),
    get as() {
      var _a;
      return (_a = props.as) != null ? _a : "li";
    }
  }, createDisabled(isDisabled), createSelected(() => properties.isSelected(props.value)), createHeadlessSelectOptionProps(props)));
}

// src/components/listbox/ListboxOptions.ts
import {
  createSignal as createSignal31,
  createEffect as createEffect20,
  onCleanup as onCleanup21,
  createComponent as createComponent51,
  mergeProps as mergeProps61
} from "solid-js";
import {
  omitProps as omitProps60
} from "solid-use";
function ListboxOptions(props) {
  const context = useListboxContext("ListboxOptions");
  const selectProperties = useHeadlessSelectProperties();
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal31();
  const controller = createListboxOptionsFocusNavigator(context.optionsID);
  createEffect20(() => {
    if (!selectProperties.hasSelected()) {
      controller.setFirstChecked();
    }
  });
  createEffect20(() => {
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
      onCleanup21(() => {
        ref.removeEventListener("focusout", onBlur);
      });
    }
  });
  return createComponent51(ListboxOptionsContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "ul";
      }, mergeProps61(omitProps60(props, [
        "as",
        "children",
        "ref"
      ]), LISTBOX_OPTIONS_TAG, {
        id: context.optionsID,
        role: "listbox",
        "aria-multiselectable": context.multiple,
        "aria-labelledby": context.buttonID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
          controller.setRef(e);
        }),
        get "aria-orientation"() {
          return context.horizontal ? "horizontal" : "vertical";
        },
        get tabindex() {
          const internalDisabled = properties.disabled();
          const granularDisabled = props.disabled;
          return internalDisabled || granularDisabled ? -1 : 0;
        }
      }, createDisabled(() => {
        const internalDisabled = properties.disabled();
        const granularDisabled = props.disabled;
        return internalDisabled || granularDisabled;
      }), createHeadlessSelectChild(props)));
    }
  });
}

// src/components/menu/Menu.ts
import {
  createComponent as createComponent52,
  mergeProps as mergeProps62
} from "solid-js";
import {
  omitProps as omitProps61
} from "solid-use";

// src/components/menu/MenuContext.ts
import {
  createContext as createContext19,
  createUniqueId as createUniqueId26,
  useContext as useContext19
} from "solid-js";
var MenuContext = createContext19();
function useMenuContext(componentName) {
  const context = useContext19(MenuContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Menu>`);
}
function createMenuItemFocusNavigator() {
  return new FocusNavigator(createUniqueId26());
}

// src/components/menu/tags.ts
var MENU_TAG = createTag("menu");
var MENU_ITEM_TAG = createTag("menu-item");

// src/components/menu/Menu.ts
function Menu(props) {
  const controller = createMenuItemFocusNavigator();
  return createComponent52(MenuContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps62(omitProps61(props, ["as", "ref"]), MENU_TAG, {
        id: controller.getId(),
        role: "menu",
        ref: createRef(props, (e) => {
          controller.setRef(e);
        })
      }));
    }
  });
}

// src/components/menu/MenuItem.ts
import {
  createSignal as createSignal32,
  onCleanup as onCleanup22,
  createEffect as createEffect21,
  mergeProps as mergeProps63,
  createComponent as createComponent53
} from "solid-js";
import {
  omitProps as omitProps62
} from "solid-use";

// src/components/menu/MenuChild.ts
import {
  createMemo as createMemo11
} from "solid-js";
function isMenuChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function MenuChild(props) {
  return createMemo11(() => {
    const body = props.children;
    if (isMenuChildRenderProp(body)) {
      return body({
        disabled: () => !!props.disabled
      });
    }
    return body;
  });
}

// src/components/menu/MenuItem.ts
function MenuItem(props) {
  const context = useMenuContext("Menu");
  const [internalRef, setInternalRef] = createSignal32();
  let characters = "";
  let timeout;
  onCleanup22(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  createEffect21(() => {
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
      onCleanup22(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps63(omitProps62(props, [
    "as",
    "disabled",
    "ref",
    "children"
  ]), MENU_ITEM_TAG, createOwnerAttribute(context.getId()), {
    role: "menuitem",
    tabindex: -1,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createDisabled(() => props.disabled), {
    get children() {
      return createComponent53(MenuChild, {
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        }
      });
    }
  }));
}

// src/components/popover/Popover.ts
import {
  createComponent as createComponent56
} from "solid-js";

// src/components/popover/PopoverControlled.ts
import {
  createComponent as createComponent54,
  createSignal as createSignal33,
  createUniqueId as createUniqueId27,
  mergeProps as mergeProps64
} from "solid-js";
import {
  omitProps as omitProps63
} from "solid-use";

// src/components/popover/PopoverContext.ts
import {
  createContext as createContext20,
  useContext as useContext20
} from "solid-js";
var PopoverContext = createContext20();
function usePopoverContext(componentName) {
  const context = useContext20(PopoverContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Popover>`);
}

// src/components/popover/tags.ts
var POPOVER_TAG = createTag("popover");
var POPOVER_BUTTON_TAG = createTag("popover-button");
var POPOVER_OVERLAY_TAG = createTag("popover-overlay");
var POPOVER_PANEL_TAG = createTag("popover-panel");

// src/components/popover/PopoverControlled.ts
function PopoverControlled(props) {
  const [hovering, setHovering] = createSignal33(false);
  const ownerID = createUniqueId27();
  const buttonID = createUniqueId27();
  const panelID = createUniqueId27();
  const fsp = useFocusStartPoint();
  return createComponent54(PopoverContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID,
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps64(omitProps63(props, [
        "isOpen",
        "as",
        "children",
        "disabled",
        "onChange"
      ]), POPOVER_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent54(HeadlessDisclosureRoot, {
            get isOpen() {
              return props.isOpen;
            },
            get disabled() {
              return props.disabled;
            },
            onChange(value) {
              var _a, _b, _c;
              if (value) {
                fsp.save();
                (_a = props.onOpen) == null ? void 0 : _a.call(props);
              }
              (_b = props.onChange) == null ? void 0 : _b.call(props, value);
              if (!value) {
                (_c = props.onClose) == null ? void 0 : _c.call(props);
                fsp.load();
              }
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/popover/PopoverUncontrolled.ts
import {
  createComponent as createComponent55,
  createSignal as createSignal34,
  createUniqueId as createUniqueId28,
  mergeProps as mergeProps65
} from "solid-js";
import {
  omitProps as omitProps64
} from "solid-use";
function PopoverUncontrolled(props) {
  const [hovering, setHovering] = createSignal34(false);
  const ownerID = createUniqueId28();
  const buttonID = createUniqueId28();
  const panelID = createUniqueId28();
  const fsp = useFocusStartPoint();
  return createComponent55(PopoverContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID,
      get hovering() {
        return hovering();
      },
      set hovering(value) {
        setHovering(value);
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps65(omitProps64(props, [
        "defaultOpen",
        "as",
        "children",
        "disabled",
        "onChange"
      ]), POPOVER_TAG, createDisabled(() => props.disabled), {
        get children() {
          return createComponent55(HeadlessDisclosureRoot, {
            get defaultOpen() {
              return props.defaultOpen;
            },
            get disabled() {
              return props.disabled;
            },
            onChange(value) {
              var _a, _b, _c;
              if (value) {
                fsp.save();
                (_a = props.onOpen) == null ? void 0 : _a.call(props);
              }
              (_b = props.onChange) == null ? void 0 : _b.call(props, value);
              if (!value) {
                (_c = props.onClose) == null ? void 0 : _c.call(props);
                fsp.load();
              }
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/popover/Popover.ts
function isPopoverUncontrolled(props) {
  return "defaultOpen" in props;
}
function Popover(props) {
  if (isPopoverUncontrolled(props)) {
    return createComponent56(PopoverUncontrolled, props);
  }
  return createComponent56(PopoverControlled, props);
}

// src/components/popover/PopoverButton.ts
import {
  createSignal as createSignal35,
  createEffect as createEffect22,
  onCleanup as onCleanup23,
  createComponent as createComponent57,
  mergeProps as mergeProps66
} from "solid-js";
import {
  omitProps as omitProps65
} from "solid-use";
function PopoverButton(props) {
  const context = usePopoverContext("PopoverButton");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal35();
  createEffect22(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      onCleanup23(() => {
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
      onCleanup23(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return createComponent57(Button, mergeProps66(omitProps65(props, [
    "children",
    "ref"
  ]), POPOVER_BUTTON_TAG, {
    id: context.buttonID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
      if (e instanceof HTMLElement) {
        context.anchor = e;
      }
    }),
    get "aria-controls"() {
      return properties.isOpen() && context.panelID;
    }
  }, createDisabled(() => {
    const internalDisabled = properties.disabled();
    const granularDisabled = props.disabled;
    return internalDisabled || granularDisabled;
  }), createExpanded(() => properties.isOpen()), createHeadlessDisclosureChildProps(props)));
}

// src/components/popover/PopoverOverlay.tsx
import {
  createSignal as createSignal36,
  createEffect as createEffect23,
  onCleanup as onCleanup24,
  mergeProps as mergeProps67
} from "solid-js";
import {
  omitProps as omitProps66
} from "solid-use";
function PopoverOverlay(props) {
  usePopoverContext("PopoverOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal36();
  createEffect23(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      onCleanup24(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps67(omitProps66(props, [
    "as",
    "children",
    "ref"
  ]), POPOVER_OVERLAY_TAG, {
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props)));
}

// src/components/popover/PopoverPanel.ts
import {
  createSignal as createSignal37,
  createEffect as createEffect24,
  onCleanup as onCleanup25,
  mergeProps as mergeProps68
} from "solid-js";
import {
  omitProps as omitProps67
} from "solid-use";
function PopoverPanel(props) {
  const context = usePopoverContext("PopoverPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = createSignal37();
  createEffect24(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        focusFirst(getFocusableElements(ref));
        const onKeyDown = (e) => {
          if (!props.disabled) {
            if (e.key === "Tab") {
              e.preventDefault();
              lockFocus(ref, e.shiftKey);
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
        onCleanup25(() => {
          ref.removeEventListener("keydown", onKeyDown);
          ref.removeEventListener("focusout", onBlur);
        });
      }
    }
  });
  return createUnmountable(props, () => properties.isOpen(), () => createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps68(omitProps67(props, [
    "as",
    "unmount",
    "children",
    "ref"
  ]), POPOVER_PANEL_TAG, {
    id: context.panelID,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createHeadlessDisclosureChildProps(props))));
}

// src/components/radio-group/RadioGroup.ts
import {
  createComponent as createComponent60
} from "solid-js";

// src/components/radio-group/RadioGroupControlled.ts
import {
  createUniqueId as createUniqueId30,
  mergeProps as mergeProps69
} from "solid-js";
import {
  createComponent as createComponent58
} from "solid-js/web";
import {
  omitProps as omitProps68
} from "solid-use";

// src/components/radio-group/RadioGroupContext.ts
import {
  createContext as createContext21,
  useContext as useContext21
} from "solid-js";
var RadioGroupContext = createContext21();
function useRadioGroupContext(componentName) {
  const context = useContext21(RadioGroupContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`);
}

// src/components/radio-group/RadioGroupRootContext.ts
import {
  createContext as createContext22,
  createUniqueId as createUniqueId29,
  useContext as useContext22
} from "solid-js";
var RadioGroupRootContext = createContext22();
function useRadioGroupRootContext(componentName) {
  const context = useContext22(RadioGroupRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}
function createRadioGroupOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId29());
}

// src/components/radio-group/tags.ts
var RADIO_GROUP_TAG = createTag("radio-group");
var RADIO_GROUP_DESCRIPTION_TAG = createTag("radio-group-description");
var RADIO_GROUP_LABEL_TAG = createTag("radio-group-label");
var RADIO_GROUP_OPTION_TAG = createTag("radio-group-option");

// src/components/radio-group/RadioGroupControlled.ts
function RadioGroupControlled(props) {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId30();
  const labelID = createUniqueId30();
  return createComponent58(RadioGroupRootContext.Provider, {
    value: controller,
    get children() {
      return createComponent58(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID
        },
        get children() {
          return createDynamic(() => {
            var _a;
            return (_a = props.as) != null ? _a : "div";
          }, mergeProps69(omitProps68(props, [
            "as",
            "children",
            "value",
            "disabled",
            "onChange",
            "ref"
          ]), RADIO_GROUP_TAG, {
            role: "radiogroup",
            "aria-labelledby": labelID,
            "aria-describedby": descriptionID,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          }, createDisabled(() => props.disabled), createHeadlessSelectRootSingleControlledProps(props)));
        }
      });
    }
  });
}

// src/components/radio-group/RadioGroupUncontrolled.ts
import {
  createUniqueId as createUniqueId31,
  mergeProps as mergeProps70
} from "solid-js";
import {
  createComponent as createComponent59
} from "solid-js/web";
import {
  omitProps as omitProps69
} from "solid-use";
function RadioGroupUncontrolled(props) {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId31();
  const labelID = createUniqueId31();
  return createComponent59(RadioGroupRootContext.Provider, {
    value: controller,
    get children() {
      return createComponent59(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID
        },
        get children() {
          return createDynamic(() => {
            var _a;
            return (_a = props.as) != null ? _a : "div";
          }, mergeProps70(omitProps69(props, [
            "as",
            "children",
            "defaultValue",
            "disabled",
            "onChange",
            "ref"
          ]), RADIO_GROUP_TAG, {
            role: "radiogroup",
            "aria-labelledby": labelID,
            "aria-describedby": descriptionID,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          }, createDisabled(() => props.disabled), createHeadlessSelectRootSingleUncontrolledProps(props)));
        }
      });
    }
  });
}

// src/components/radio-group/RadioGroup.ts
function isRadioGroupUncontrolled(props) {
  return "defaultValue" in props;
}
function RadioGroup(props) {
  if (isRadioGroupUncontrolled(props)) {
    return createComponent60(RadioGroupUncontrolled, props);
  }
  return createComponent60(RadioGroupControlled, props);
}

// src/components/radio-group/RadioGroupDescription.ts
import {
  mergeProps as mergeProps71
} from "solid-js";
import {
  omitProps as omitProps70
} from "solid-use";
function RadioGroupDescription(props) {
  const context = useRadioGroupContext("RadioGroupDescription");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps71(omitProps70(props, ["as"]), RADIO_GROUP_DESCRIPTION_TAG, {
    id: context.descriptionID
  }));
}

// src/components/radio-group/RadioGroupLabel.ts
import {
  mergeProps as mergeProps72
} from "solid-js";
import {
  omitProps as omitProps71
} from "solid-use";
function RadioGroupLabel(props) {
  const context = useRadioGroupContext("RadioGroupLabel");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "label";
  }, mergeProps72(omitProps71(props, ["as"]), RADIO_GROUP_LABEL_TAG, {
    id: context.labelID
  }));
}

// src/components/radio-group/RadioGroupOption.ts
import {
  createComponent as createComponent61,
  createEffect as createEffect25,
  createSignal as createSignal38,
  createUniqueId as createUniqueId32,
  mergeProps as mergeProps73,
  onCleanup as onCleanup26
} from "solid-js";
import {
  omitProps as omitProps72
} from "solid-use";
function RadioGroupOption(props) {
  const context = useRadioGroupRootContext("RadioGroupOption");
  const properties = useHeadlessSelectProperties();
  const descriptionID = createUniqueId32();
  const labelID = createUniqueId32();
  const [internalRef, setInternalRef] = createSignal38();
  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };
  createEffect25(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!isDisabled()) {
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
        if (!isDisabled()) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!isDisabled()) {
          properties.focus(props.value);
          properties.select(props.value);
        }
      };
      const onBlur = () => {
        if (!isDisabled()) {
          properties.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      onCleanup26(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return createComponent61(RadioGroupContext.Provider, {
    value: { descriptionID, labelID },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps73(omitProps72(props, [
        "as",
        "children",
        "value",
        "disabled",
        "ref"
      ]), RADIO_GROUP_OPTION_TAG, createOwnerAttribute(context.getId()), {
        role: "radio",
        "aria-labelledby": labelID,
        "aria-describedby": descriptionID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
        get tabindex() {
          const selected = properties.isSelected(props.value);
          return !isDisabled() || selected ? 0 : -1;
        }
      }, createDisabled(isDisabled), createChecked(() => properties.isSelected(props.value)), createHeadlessSelectOptionProps(props)));
    }
  });
}

// src/components/select/Select.ts
import {
  createComponent as createComponent66
} from "solid-js";

// src/components/select/SelectMultipleControlled.ts
import {
  createComponent as createComponent62,
  mergeProps as mergeProps74
} from "solid-js";
import {
  omitProps as omitProps73
} from "solid-use";

// src/components/select/SelectContext.ts
import {
  createContext as createContext23,
  createUniqueId as createUniqueId33,
  useContext as useContext23
} from "solid-js";
var SelectContext = createContext23();
function useSelectContext(componentName) {
  const context = useContext23(SelectContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}
function createSelectOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId33());
}

// src/components/select/tags.ts
var SELECT_TAG = createTag("select");
var SELECT_OPTION_TAG = createTag("select-option");

// src/components/select/SelectMultipleControlled.ts
function SelectMultipleControlled(props) {
  const controller = createSelectOptionFocusNavigator();
  return createComponent62(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "ul";
      }, mergeProps74(omitProps73(props, [
        "as",
        "children",
        "toggleable",
        "value",
        "onChange",
        "multiple",
        "horizontal",
        "disabled",
        "ref"
      ]), SELECT_TAG, {
        id: controller.getId(),
        role: "listbox",
        "aria-multiselectable": true,
        ref: createRef(props, (e) => {
          controller.setRef(e);
        }),
        get "aria-orientation"() {
          return props.horizontal ? "horizontal" : "vertical";
        }
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent62(HeadlessSelectRoot, {
            multiple: true,
            onChange: props.onChange,
            get value() {
              return props.value;
            },
            get toggleable() {
              return props.toggleable;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/select/SelectMultipleUncontrolled.ts
import {
  createComponent as createComponent63,
  mergeProps as mergeProps75
} from "solid-js";
import {
  omitProps as omitProps74
} from "solid-use";
function SelectMultipleUncontrolled(props) {
  const controller = createSelectOptionFocusNavigator();
  return createComponent63(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "ul";
      }, mergeProps75(omitProps74(props, [
        "as",
        "children",
        "toggleable",
        "defaultValue",
        "onChange",
        "multiple",
        "horizontal",
        "disabled",
        "ref"
      ]), SELECT_TAG, {
        id: controller.getId(),
        role: "listbox",
        "aria-multiselectable": true,
        ref: createRef(props, (e) => {
          controller.setRef(e);
        }),
        get "aria-orientation"() {
          return props.horizontal ? "horizontal" : "vertical";
        }
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent63(HeadlessSelectRoot, {
            multiple: true,
            onChange: props.onChange,
            get defaultValue() {
              return props.defaultValue;
            },
            get toggleable() {
              return props.toggleable;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/select/SelectSingleControlled.ts
import {
  createComponent as createComponent64,
  mergeProps as mergeProps76
} from "solid-js";
import {
  omitProps as omitProps75
} from "solid-use";
function SelectSingleControlled(props) {
  const controller = createSelectOptionFocusNavigator();
  return createComponent64(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "ul";
      }, mergeProps76(omitProps75(props, [
        "as",
        "children",
        "toggleable",
        "value",
        "onChange",
        "horizontal",
        "disabled",
        "ref"
      ]), SELECT_TAG, {
        id: controller.getId(),
        role: "listbox",
        "aria-multiselectable": false,
        ref: createRef(props, (e) => {
          controller.setRef(e);
        }),
        get "aria-orientation"() {
          return props.horizontal ? "horizontal" : "vertical";
        }
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent64(HeadlessSelectRoot, {
            onChange: props.onChange,
            get value() {
              return props.value;
            },
            get toggleable() {
              return props.toggleable;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/select/SelectSingleUncontrolled.ts
import {
  createComponent as createComponent65,
  mergeProps as mergeProps77
} from "solid-js";
import {
  omitProps as omitProps76
} from "solid-use";
function SelectSingleUncontrolled(props) {
  const controller = createSelectOptionFocusNavigator();
  return createComponent65(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "ul";
      }, mergeProps77(omitProps76(props, [
        "as",
        "children",
        "toggleable",
        "defaultValue",
        "onChange",
        "horizontal",
        "disabled",
        "ref"
      ]), SELECT_TAG, {
        id: controller.getId(),
        role: "listbox",
        "aria-multiselectable": false,
        ref: createRef(props, (e) => {
          controller.setRef(e);
        }),
        get "aria-orientation"() {
          return props.horizontal ? "horizontal" : "vertical";
        }
      }, createDisabled(() => props.disabled), {
        get children() {
          return createComponent65(HeadlessSelectRoot, {
            onChange: props.onChange,
            get defaultValue() {
              return props.defaultValue;
            },
            get toggleable() {
              return props.toggleable;
            },
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}

// src/components/select/Select.ts
function isSelectUncontrolled(props) {
  return "defaultValue" in props;
}
function isSelectMultiple(props) {
  return "multiple" in props && props.multiple;
}
function Select(props) {
  if (isSelectUncontrolled(props)) {
    if (isSelectMultiple(props)) {
      return createComponent66(SelectMultipleUncontrolled, props);
    }
    return createComponent66(SelectSingleUncontrolled, props);
  }
  if (isSelectMultiple(props)) {
    return createComponent66(SelectMultipleControlled, props);
  }
  return createComponent66(SelectSingleControlled, props);
}

// src/components/select/SelectOption.ts
import {
  createComponent as createComponent67,
  createEffect as createEffect26,
  createSignal as createSignal39,
  mergeProps as mergeProps78,
  onCleanup as onCleanup27
} from "solid-js";
import {
  omitProps as omitProps77
} from "solid-use";
function SelectOption(props) {
  const context = useSelectContext("Select");
  const properties = useHeadlessSelectProperties();
  const [internalRef, setInternalRef] = createSignal39();
  let characters = "";
  let timeout;
  onCleanup27(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  createEffect26(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case "ArrowUp":
              if (!context.horizontal) {
                e.preventDefault();
                context.controller.setPrevChecked(ref);
              }
              break;
            case "ArrowLeft":
              if (context.horizontal) {
                e.preventDefault();
                context.controller.setPrevChecked(ref);
              }
              break;
            case "ArrowDown":
              if (!context.horizontal) {
                e.preventDefault();
                context.controller.setNextChecked(ref);
              }
              break;
            case "ArrowRight":
              if (context.horizontal) {
                e.preventDefault();
                context.controller.setNextChecked(ref);
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
              context.controller.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              context.controller.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.controller.setFirstMatch(characters);
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
      onCleanup27(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return createComponent67(Button, mergeProps78({
    get as() {
      var _a;
      return (_a = props.as) != null ? _a : "li";
    }
  }, omitProps77(props, [
    "as",
    "children",
    "value",
    "ref"
  ]), SELECT_OPTION_TAG, createOwnerAttribute(context.controller.getId()), {
    role: "option",
    tabindex: -1,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }, createDisabled(() => props.disabled), createSelected(() => properties.isSelected(props.value)), createHeadlessSelectOptionProps(props)));
}

// src/components/tabs/Tab.ts
import {
  createEffect as createEffect27,
  createSignal as createSignal40,
  mergeProps as mergeProps79,
  onCleanup as onCleanup28
} from "solid-js";
import {
  omitProps as omitProps78
} from "solid-use";

// src/components/tabs/TabGroupContext.ts
import {
  createContext as createContext24,
  useContext as useContext24
} from "solid-js";
var TabGroupContext = createContext24();
function useTabGroupContext(componentName) {
  const context = useContext24(TabGroupContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TabGroup>`);
}

// src/components/tabs/TabListContext.ts
import {
  createContext as createContext25,
  createUniqueId as createUniqueId34,
  useContext as useContext25
} from "solid-js";
var TabListContext = createContext25();
function useTabListContext(componentName) {
  const context = useContext25(TabListContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TabList>`);
}
function createTabFocusNavigator() {
  return new FocusNavigator(createUniqueId34());
}

// src/components/tabs/tags.ts
var TAB_GROUP_TAG = createTag("tab-group");
var TAB_LIST_TAG = createTag("tab-list");
var TAB_TAG = createTag("tab");
var TAB_PANEL_TAG = createTag("tab-panel");

// src/components/tabs/Tab.ts
function Tab(props) {
  const rootContext = useTabGroupContext("Tab");
  const listContext = useTabListContext("Tab");
  const properties = useHeadlessSelectProperties();
  const [internalRef, setInternalRef] = createSignal40();
  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };
  createEffect27(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        if (!isDisabled()) {
          switch (e.key) {
            case "ArrowUp":
              if (!rootContext.horizontal) {
                e.preventDefault();
                listContext.setPrevChecked(ref);
              }
              break;
            case "ArrowLeft":
              if (rootContext.horizontal) {
                e.preventDefault();
                listContext.setPrevChecked(ref);
              }
              break;
            case "ArrowDown":
              if (!rootContext.horizontal) {
                e.preventDefault();
                listContext.setNextChecked(ref);
              }
              break;
            case "ArrowRight":
              if (rootContext.horizontal) {
                e.preventDefault();
                listContext.setNextChecked(ref);
              }
              break;
            case " ":
            case "Enter":
              if (ref.tagName === "BUTTON") {
                e.preventDefault();
              }
              listContext.setChecked(ref);
              break;
            case "Home":
              e.preventDefault();
              listContext.setFirstChecked();
              break;
            case "End":
              e.preventDefault();
              listContext.setLastChecked();
              break;
            default:
              break;
          }
        }
      };
      const onClick = () => {
        if (!isDisabled()) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!isDisabled()) {
          properties.focus(props.value);
          properties.select(props.value);
        }
      };
      const onBlur = () => {
        if (!isDisabled()) {
          properties.blur();
        }
      };
      ref.addEventListener("keydown", onKeyDown);
      ref.addEventListener("click", onClick);
      ref.addEventListener("focus", onFocus);
      ref.addEventListener("blur", onBlur);
      onCleanup28(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps79(omitProps78(props, [
    "as",
    "children",
    "value",
    "disabled",
    "ref"
  ]), TAB_TAG, createOwnerAttribute(listContext.getId()), {
    role: "tab",
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    }),
    get id() {
      return rootContext.getId("tab", props.value);
    },
    get "aria-controls"() {
      return rootContext.getId("tab-panel", props.value);
    },
    get tabindex() {
      const selected = properties.isSelected(props.value);
      return !isDisabled() || selected ? 0 : -1;
    }
  }, createDisabled(isDisabled), createSelected(() => properties.isSelected(props.value)), createHeadlessSelectOptionProps(props)));
}

// src/components/tabs/TabGroup.ts
import {
  createComponent as createComponent70
} from "solid-js";

// src/components/tabs/TabGroupControlled.ts
import {
  mergeProps as mergeProps80,
  createComponent as createComponent68,
  createUniqueId as createUniqueId35
} from "solid-js";
import {
  omitProps as omitProps79
} from "solid-use";
function TabGroupControlled(props) {
  const ownerID = createUniqueId35();
  let id = 0;
  const ids = /* @__PURE__ */ new Map();
  return createComponent68(TabGroupContext.Provider, {
    value: {
      get horizontal() {
        var _a;
        return (_a = props.horizontal) != null ? _a : true;
      },
      getId(kind, value) {
        let currentID = ids.get(value);
        if (!currentID) {
          currentID = id;
          ids.set(value, currentID);
          id += 1;
        }
        return `${ownerID}__${kind}-${currentID}`;
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps80(omitProps79(props, [
        "as",
        "children",
        "value",
        "disabled",
        "onChange",
        "ref"
      ]), TAB_GROUP_TAG, createDisabled(() => props.disabled), createHeadlessSelectRootSingleControlledProps(props)));
    }
  });
}

// src/components/tabs/TabGroupUncontrolled.ts
import {
  mergeProps as mergeProps81,
  createComponent as createComponent69,
  createUniqueId as createUniqueId36
} from "solid-js";
import {
  omitProps as omitProps80
} from "solid-use";
function TabGroupUncontrolled(props) {
  const ownerID = createUniqueId36();
  let id = 0;
  const ids = /* @__PURE__ */ new Map();
  return createComponent69(TabGroupContext.Provider, {
    value: {
      get horizontal() {
        var _a;
        return (_a = props.horizontal) != null ? _a : true;
      },
      getId(kind, value) {
        let currentID = ids.get(value);
        if (!currentID) {
          currentID = id;
          ids.set(value, currentID);
          id += 1;
        }
        return `${ownerID}__${kind}-${currentID}`;
      }
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps81(omitProps80(props, [
        "as",
        "children",
        "defaultValue",
        "disabled",
        "onChange",
        "ref"
      ]), TAB_GROUP_TAG, createDisabled(() => props.disabled), createHeadlessSelectRootSingleUncontrolledProps(props)));
    }
  });
}

// src/components/tabs/TabGroup.ts
function isTabGroupUncontrolled(props) {
  return "defaultValue" in props;
}
function TabGroup(props) {
  if (isTabGroupUncontrolled(props)) {
    return createComponent70(TabGroupUncontrolled, props);
  }
  return createComponent70(TabGroupControlled, props);
}

// src/components/tabs/TabList.ts
import {
  createComponent as createComponent71,
  mergeProps as mergeProps82
} from "solid-js";
import {
  omitProps as omitProps81
} from "solid-use";
function TabList(props) {
  const rootContext = useTabGroupContext("TabList");
  const controller = createTabFocusNavigator();
  return createComponent71(TabListContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps82(omitProps81(props, ["as", "ref", "children"]), TAB_LIST_TAG, {
        role: "tablist",
        get "aria-orientation"() {
          return rootContext.horizontal ? "horizontal" : "vertical";
        },
        ref: createRef(props, (e) => {
          controller.setRef(e);
        })
      }, createHeadlessSelectChild(props)));
    }
  });
}

// src/components/tabs/TabPanel.ts
import {
  mergeProps as mergeProps83
} from "solid-js";
import { omitProps as omitProps82 } from "solid-use";
function TabPanel(props) {
  const rootContext = useTabGroupContext("TabPanel");
  const properties = useHeadlessSelectProperties();
  return createUnmountable(props, () => properties.isSelected(props.value), () => createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps83(omitProps82(props, ["as", "children", "disabled", "unmount", "value"]), TAB_PANEL_TAG, {
    role: "tabpanel",
    get tabindex() {
      return properties.isSelected(props.value) ? 0 : -1;
    },
    get id() {
      return rootContext.getId("tab-panel", props.value);
    },
    get "aria-labelledby"() {
      return rootContext.getId("tab", props.value);
    }
  }, createHeadlessSelectOptionProps(props))));
}

// src/components/toast/Toast.ts
import {
  mergeProps as mergeProps84
} from "solid-js";
import {
  omitProps as omitProps83
} from "solid-use";

// src/components/toast/tags.ts
var TOAST_TAG = createTag("toast");
var TOASTER_TAG = createTag("toaster");

// src/components/toast/ToastContext.ts
import {
  createContext as createContext26,
  useContext as useContext26
} from "solid-js";
var ToastContext = createContext26();
function useToastContext(componentName) {
  const context = useContext26(ToastContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Toaster>`);
}

// src/components/toast/Toast.ts
function Toast(props) {
  useToastContext("Toast");
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps84(omitProps83(props, [
    "as"
  ]), TOAST_TAG, {
    role: "status",
    "aria-live": "polite"
  }));
}

// src/components/toast/Toaster.ts
import {
  createComponent as createComponent72,
  createUniqueId as createUniqueId37,
  mergeProps as mergeProps85
} from "solid-js";
import {
  omitProps as omitProps84
} from "solid-use";
function Toaster(props) {
  const ownerID = createUniqueId37();
  return createComponent72(ToastContext.Provider, {
    value: {
      ownerID
    },
    get children() {
      return createDynamic(() => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      }, mergeProps85(omitProps84(props, [
        "as"
      ]), TOASTER_TAG));
    }
  });
}

// src/components/toast/ToasterStore.ts
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

// src/components/toast/useToaster.ts
import {
  createSignal as createSignal41,
  createEffect as createEffect28,
  onCleanup as onCleanup29
} from "solid-js";
function useToaster(toaster) {
  const [signal, setSignal] = createSignal41(toaster.getQueue());
  createEffect28(() => {
    onCleanup29(toaster.subscribe(setSignal));
  });
  return signal;
}

// src/components/toggle/index.ts
import {
  createComponent as createComponent75
} from "solid-js";

// src/components/toggle/ToggleControlled.ts
import {
  createSignal as createSignal42,
  createEffect as createEffect29,
  onCleanup as onCleanup30,
  createComponent as createComponent73,
  mergeProps as mergeProps86
} from "solid-js";
import {
  omitProps as omitProps85
} from "solid-use";

// src/components/toggle/tags.ts
var TOGGLE_TAG = createTag("toggle");

// src/components/toggle/ToggleControlled.ts
function ToggleControlled(props) {
  const [internalRef, setInternalRef] = createSignal42();
  createEffect29(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, !props.pressed);
      };
      ref.addEventListener("click", onClick);
      onCleanup30(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createComponent73(Button, mergeProps86(omitProps85(props, [
    "onChange",
    "pressed",
    "ref"
  ]), TOGGLE_TAG, {
    get "aria-pressed"() {
      return props.pressed;
    },
    get "data-sh-pressed"() {
      return props.pressed;
    },
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }));
}

// src/components/toggle/ToggleUncontrolled.ts
import {
  createSignal as createSignal43,
  createEffect as createEffect30,
  onCleanup as onCleanup31,
  createComponent as createComponent74,
  mergeProps as mergeProps87,
  untrack as untrack4,
  batch as batch6
} from "solid-js";
import {
  omitProps as omitProps86
} from "solid-use";
function ToggleUncontrolled(props) {
  const [state, setState] = createSignal43(!!props.defaultPressed);
  const [internalRef, setInternalRef] = createSignal43();
  createEffect30(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        const current = !untrack4(state);
        batch6(() => {
          var _a;
          setState(current);
          (_a = props.onChange) == null ? void 0 : _a.call(props, current);
        });
      };
      ref.addEventListener("click", onClick);
      onCleanup31(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createComponent74(Button, mergeProps87(omitProps86(props, [
    "onChange",
    "defaultPressed",
    "ref"
  ]), TOGGLE_TAG, {
    get "aria-pressed"() {
      return state();
    },
    get "data-sh-pressed"() {
      return state();
    },
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    })
  }));
}

// src/components/toggle/index.ts
function isToggleUncontrolled(props) {
  return "defaultPressed" in props;
}
function Toggle(props) {
  if (isToggleUncontrolled(props)) {
    return createComponent75(ToggleUncontrolled, props);
  }
  return createComponent75(ToggleControlled, props);
}

// src/components/toolbar/index.ts
import {
  createEffect as createEffect31,
  createSignal as createSignal44,
  mergeProps as mergeProps88,
  onCleanup as onCleanup32
} from "solid-js";
import { omitProps as omitProps87 } from "solid-use";
var TOOLBAR_TAG = createTag("toolbar");
function Toolbar(props) {
  const isHorizontal = () => {
    var _a;
    return (_a = props.horizontal) != null ? _a : true;
  };
  const [internalRef, setInternalRef] = createSignal44();
  let focusedElement;
  function getNextFocusable2() {
    const ref = internalRef();
    if (ref instanceof HTMLElement && document.activeElement && ref.contains(document.activeElement)) {
      focusNext(getFocusableElements(ref), document.activeElement);
    }
  }
  function getPrevFocusable() {
    const ref = internalRef();
    if (ref instanceof HTMLElement && document.activeElement && ref.contains(document.activeElement)) {
      focusPrev(getFocusableElements(ref), document.activeElement);
    }
  }
  createEffect31(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e) => {
        switch (e.key) {
          case "ArrowLeft":
            if (isHorizontal()) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case "ArrowUp":
            if (!isHorizontal()) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case "ArrowRight":
            if (isHorizontal()) {
              e.preventDefault();
              getNextFocusable2();
            }
            break;
          case "ArrowDown":
            if (!isHorizontal()) {
              e.preventDefault();
              getNextFocusable2();
            }
            break;
          case "Home":
            if (focusFirst(getFocusableElements(ref))) {
              e.preventDefault();
            }
            break;
          case "End":
            if (focusLast(getFocusableElements(ref))) {
              e.preventDefault();
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
          focusFirst(getFocusableElements(ref));
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
      onCleanup32(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("focusin", onFocusIn);
      });
    }
  });
  return createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps88(omitProps87(props, [
    "as",
    "horizontal",
    "ref"
  ]), TOOLBAR_TAG, {
    role: "toolbar",
    tabindex: 0,
    ref: createRef(props, (e) => {
      setInternalRef(() => e);
    }),
    get "aria-orientation"() {
      return isHorizontal() ? "horizontal" : "vertical";
    }
  }));
}

// src/components/transition/index.ts
import {
  createComponent as createComponent76,
  createContext as createContext27,
  createEffect as createEffect32,
  createSignal as createSignal45,
  mergeProps as mergeProps89,
  splitProps,
  useContext as useContext27
} from "solid-js";
import {
  omitProps as omitProps88
} from "solid-use";
var TransitionRootContext = createContext27();
function useTransitionRootContext(componentName) {
  const context = useContext27(TransitionRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Transition>`);
}
function getClassList(classes) {
  return classes ? classes.split(" ") : [];
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
  const values = useTransitionRootContext("TransitionChild");
  const [visible, setVisible] = createSignal45(values.show);
  const [ref, setRef] = createSignal45();
  let initial = true;
  function transition(element, shouldEnter) {
    var _a, _b;
    if (shouldEnter) {
      if (initial) {
        const enter = getClassList(props.enter);
        const enterFrom = getClassList(props.enterFrom);
        const enterTo = getClassList(props.enterTo);
        const entered = getClassList(props.entered);
        const endTransition = () => {
          var _a2;
          removeClassList(element, enter);
          removeClassList(element, enterTo);
          addClassList(element, entered);
          (_a2 = props.afterEnter) == null ? void 0 : _a2.call(props);
        };
        (_a = props.beforeEnter) == null ? void 0 : _a.call(props);
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
      const leave = getClassList(props.leave);
      const leaveFrom = getClassList(props.leaveFrom);
      const leaveTo = getClassList(props.leaveTo);
      const entered = getClassList(props.entered);
      (_b = props.beforeLeave) == null ? void 0 : _b.call(props);
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        addClassList(element, leaveTo);
      });
      const endTransition = () => {
        var _a2;
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        (_a2 = props.afterLeave) == null ? void 0 : _a2.call(props);
      };
      element.addEventListener("transitionend", endTransition, { once: true });
      element.addEventListener("animationend", endTransition, { once: true });
    }
  }
  createEffect32(() => {
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
  return createUnmountable(props, visible, () => createDynamic(() => {
    var _a;
    return (_a = props.as) != null ? _a : "div";
  }, mergeProps89(omitProps88(props, [
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
  ]), {
    ref: createRef(props, (e) => {
      setRef(() => e);
    })
  })));
}
function Transition(props) {
  const [local, others] = splitProps(props, [
    "show"
  ]);
  return createComponent76(TransitionRootContext.Provider, {
    value: local,
    get children() {
      return createComponent76(TransitionChild, others);
    }
  });
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
  HeadlessDisclosureChild,
  HeadlessDisclosureRoot,
  HeadlessSelectChild,
  HeadlessSelectOption,
  HeadlessSelectOptionChild,
  HeadlessSelectOptionContext,
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
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  Toast,
  Toaster,
  ToasterStore,
  Toggle,
  Toolbar,
  Transition,
  TransitionChild,
  createHeadlessDisclosureChildProps,
  createHeadlessSelectChild,
  createHeadlessSelectOptionChildProps,
  createHeadlessSelectOptionProps,
  createHeadlessSelectRootMultipleControlledProps,
  createHeadlessSelectRootMultipleUncontrolledProps,
  createHeadlessSelectRootSingleControlledProps,
  createHeadlessSelectRootSingleUncontrolledProps,
  useColorScheme,
  useHeadlessDisclosure,
  useHeadlessDisclosureProperties,
  useHeadlessSelect,
  useHeadlessSelectMultiple,
  useHeadlessSelectOption,
  useHeadlessSelectOptionProperties,
  useHeadlessSelectProperties,
  useHeadlessSelectSingle,
  useHeadlessToggle,
  useHeadlessToggleProperties,
  useNativeColorScheme,
  usePreferredColorScheme,
  useToaster,
  useToaster as useToasterStore
};
//# sourceMappingURL=index.js.map
