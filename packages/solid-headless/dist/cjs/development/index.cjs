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
  HeadlessAutocompleteChild: () => HeadlessAutocompleteChild,
  HeadlessAutocompleteContext: () => HeadlessAutocompleteContext,
  HeadlessAutocompleteOption: () => HeadlessAutocompleteOption,
  HeadlessAutocompleteOptionChild: () => HeadlessAutocompleteOptionChild,
  HeadlessAutocompleteOptionContext: () => HeadlessAutocompleteOptionContext,
  HeadlessAutocompleteRoot: () => HeadlessAutocompleteRoot,
  HeadlessDisclosureChild: () => HeadlessDisclosureChild,
  HeadlessDisclosureRoot: () => HeadlessDisclosureRoot,
  HeadlessInputChild: () => HeadlessInputChild,
  HeadlessInputRoot: () => HeadlessInputRoot,
  HeadlessSelectChild: () => HeadlessSelectChild,
  HeadlessSelectOption: () => HeadlessSelectOption,
  HeadlessSelectOptionChild: () => HeadlessSelectOptionChild,
  HeadlessSelectOptionContext: () => HeadlessSelectOptionContext,
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
  Tab: () => Tab,
  TabGroup: () => TabGroup,
  TabList: () => TabList,
  TabPanel: () => TabPanel,
  Toast: () => Toast,
  Toaster: () => Toaster,
  ToasterStore: () => ToasterStore,
  Toggle: () => Toggle,
  Toolbar: () => Toolbar,
  Transition: () => Transition,
  TransitionChild: () => TransitionChild,
  createHeadlessAutocompleteChild: () => createHeadlessAutocompleteChild,
  createHeadlessAutocompleteOptionChildProps: () => createHeadlessAutocompleteOptionChildProps,
  createHeadlessAutocompleteOptionProps: () => createHeadlessAutocompleteOptionProps,
  createHeadlessAutocompleteRootControlledProps: () => createHeadlessAutocompleteRootControlledProps,
  createHeadlessAutocompleteRootUncontrolledProps: () => createHeadlessAutocompleteRootUncontrolledProps,
  createHeadlessDisclosureChildProps: () => createHeadlessDisclosureChildProps,
  createHeadlessSelectChild: () => createHeadlessSelectChild,
  createHeadlessSelectOptionChildProps: () => createHeadlessSelectOptionChildProps,
  createHeadlessSelectOptionProps: () => createHeadlessSelectOptionProps,
  createHeadlessSelectRootMultipleControlledProps: () => createHeadlessSelectRootMultipleControlledProps,
  createHeadlessSelectRootMultipleUncontrolledProps: () => createHeadlessSelectRootMultipleUncontrolledProps,
  createHeadlessSelectRootSingleControlledProps: () => createHeadlessSelectRootSingleControlledProps,
  createHeadlessSelectRootSingleUncontrolledProps: () => createHeadlessSelectRootSingleUncontrolledProps,
  useColorScheme: () => useColorScheme,
  useHeadlessAutocomplete: () => useHeadlessAutocomplete,
  useHeadlessAutocompleteOption: () => useHeadlessAutocompleteOption,
  useHeadlessAutocompleteOptionProperties: () => useHeadlessAutocompleteOptionProperties,
  useHeadlessAutocompleteProperties: () => useHeadlessAutocompleteProperties,
  useHeadlessDisclosure: () => useHeadlessDisclosure,
  useHeadlessDisclosureProperties: () => useHeadlessDisclosureProperties,
  useHeadlessInput: () => useHeadlessInput,
  useHeadlessInputProperties: () => useHeadlessInputProperties,
  useHeadlessSelect: () => useHeadlessSelect,
  useHeadlessSelectMultiple: () => useHeadlessSelectMultiple,
  useHeadlessSelectOption: () => useHeadlessSelectOption,
  useHeadlessSelectOptionProperties: () => useHeadlessSelectOptionProperties,
  useHeadlessSelectProperties: () => useHeadlessSelectProperties,
  useHeadlessSelectSingle: () => useHeadlessSelectSingle,
  useHeadlessToggle: () => useHeadlessToggle,
  useHeadlessToggleProperties: () => useHeadlessToggleProperties,
  useNativeColorScheme: () => useNativeColorScheme,
  usePreferredColorScheme: () => usePreferredColorScheme,
  useToaster: () => useToaster,
  useToasterStore: () => useToaster
});
module.exports = __toCommonJS(src_exports);

// src/headless/disclosure/HeadlessDisclosureChild.ts
var import_solid_js2 = require("solid-js");

// src/headless/disclosure/HeadlessDisclosureContext.ts
var import_solid_js = require("solid-js");
var HeadlessDisclosureContext = (0, import_solid_js.createContext)();
function useHeadlessDisclosureProperties() {
  const properties = (0, import_solid_js.useContext)(HeadlessDisclosureContext);
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
  return (0, import_solid_js2.createMemo)(() => {
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
      return (0, import_solid_js2.createComponent)(HeadlessDisclosureChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/disclosure/HeadlessDisclosureRoot.ts
var import_solid_js4 = require("solid-js");

// src/headless/disclosure/useHeadlessDisclosure.ts
var import_solid_js3 = require("solid-js");
function useHeadlessDisclosure(options) {
  let signal;
  let setSignal;
  if ("defaultOpen" in options) {
    const [isOpen, setIsOpen] = (0, import_solid_js3.createSignal)(options.defaultOpen);
    signal = isOpen;
    setSignal = (value) => {
      (0, import_solid_js3.batch)(() => {
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
  return (0, import_solid_js4.createComponent)(HeadlessDisclosureContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js4.createMemo)(() => {
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
var import_solid_js6 = require("solid-js");

// src/headless/select/useHeadlessSelectProperties.ts
var import_solid_js5 = require("solid-js");
var HeadlessSelectContext = (0, import_solid_js5.createContext)();
function useHeadlessSelectProperties() {
  const properties = (0, import_solid_js5.useContext)(HeadlessSelectContext);
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
  return (0, import_solid_js6.createMemo)(() => {
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
      return (0, import_solid_js6.createComponent)(HeadlessSelectChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/select/HeadlessSelectOption.ts
var import_solid_js8 = require("solid-js");

// src/headless/select/useHeadlessSelectOption.ts
var import_solid_js7 = require("solid-js");
var HeadlessSelectOptionContext = (0, import_solid_js7.createContext)();
function useHeadlessSelectOptionProperties() {
  const properties = (0, import_solid_js7.useContext)(HeadlessSelectOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessSelectOptionProperties` must be used within HeadlessSelectOption");
}
function useHeadlessSelectOption(value, disabled) {
  const properties = useHeadlessSelectProperties();
  const isDisabled = () => {
    const local = disabled == null ? void 0 : disabled();
    const parent = properties.disabled();
    return local || parent;
  };
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
  const properties = useHeadlessSelectOption(
    () => props.value,
    () => !!props.disabled
  );
  return (0, import_solid_js8.createComponent)(HeadlessSelectOptionContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js8.createMemo)(() => {
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
      return (0, import_solid_js8.createComponent)(HeadlessSelectOption, {
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
  return (0, import_solid_js8.createMemo)(() => {
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
      return (0, import_solid_js8.createComponent)(HeadlessSelectOptionChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/select/HeadlessSelectRoot.ts
var import_solid_js11 = require("solid-js");

// src/headless/select/useHeadlessSelectMultiple.ts
var import_solid_js9 = require("solid-js");
function useHeadlessSelectMultiple(options) {
  const [active, setActive] = (0, import_solid_js9.createSignal)();
  let selectedValues;
  let setSelectedValues;
  if ("defaultValue" in options) {
    const [selected, setSelected] = (0, import_solid_js9.createSignal)(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      (0, import_solid_js9.batch)(() => {
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
      const set = new Set((0, import_solid_js9.untrack)(selectedValues));
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
var import_solid_js10 = require("solid-js");
function useHeadlessSelectSingle(options) {
  const [active, setActive] = (0, import_solid_js10.createSignal)();
  let selectedValue;
  let setSelectedValue;
  if ("defaultValue" in options) {
    const [selected, setSelected] = (0, import_solid_js10.createSignal)(options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      (0, import_solid_js10.batch)(() => {
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
      if (options.toggleable && Object.is((0, import_solid_js10.untrack)(selectedValue), value)) {
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
  return (0, import_solid_js11.createComponent)(HeadlessSelectContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js11.createMemo)(() => {
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
      return (0, import_solid_js11.createComponent)(HeadlessSelectRoot, {
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
      return (0, import_solid_js11.createComponent)(HeadlessSelectRoot, {
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
      return (0, import_solid_js11.createComponent)(HeadlessSelectRoot, {
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
      return (0, import_solid_js11.createComponent)(HeadlessSelectRoot, {
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
var import_solid_js13 = require("solid-js");

// src/headless/toggle/HeadlessToggleContext.ts
var import_solid_js12 = require("solid-js");
var HeadlessToggleContext = (0, import_solid_js12.createContext)();
function useHeadlessToggleProperties() {
  const properties = (0, import_solid_js12.useContext)(HeadlessToggleContext);
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
  return (0, import_solid_js13.createMemo)(() => {
    const body = props.children;
    if (isHeadlessToggleChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

// src/headless/toggle/HeadlessToggleRoot.ts
var import_solid_js15 = require("solid-js");

// src/headless/toggle/useHeadlessToggle.ts
var import_solid_js14 = require("solid-js");
function useHeadlessToggle(options) {
  let signal;
  let setSignal;
  if ("defaultChecked" in options) {
    const [isOpen, setIsOpen] = (0, import_solid_js14.createSignal)(options.defaultChecked);
    signal = isOpen;
    setSignal = (value) => {
      (0, import_solid_js14.batch)(() => {
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
  return (0, import_solid_js15.createComponent)(HeadlessToggleContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js15.createMemo)(() => {
        const body = props.children;
        if (isHeadlessToggleRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}

// src/headless/input/HeadlessInputChild.ts
var import_solid_js17 = require("solid-js");

// src/headless/input/HeadlessInputContext.ts
var import_solid_js16 = require("solid-js");
var HeadlessInputContext = (0, import_solid_js16.createContext)();
function useHeadlessInputProperties() {
  const properties = (0, import_solid_js16.useContext)(HeadlessInputContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessInputProperties` must be used within `<HeadlessInputRoot>`.");
}

// src/headless/input/HeadlessInputChild.ts
function isHeadlessInputChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessInputChild(props) {
  const properties = useHeadlessInputProperties();
  return (0, import_solid_js17.createMemo)(() => {
    const body = props.children;
    if (isHeadlessInputChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

// src/headless/input/HeadlessInputRoot.ts
var import_solid_js19 = require("solid-js");

// src/headless/input/useHeadlessInput.ts
var import_solid_js18 = require("solid-js");
function useHeadlessInput(options) {
  let signal;
  let setSignal;
  if ("defaultValue" in options) {
    const [input, setInput] = (0, import_solid_js18.createSignal)(options.defaultValue);
    signal = input;
    setSignal = (value) => {
      (0, import_solid_js18.batch)(() => {
        var _a;
        setInput(value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      });
    };
  } else {
    signal = () => options.value;
    setSignal = (value) => {
      var _a;
      return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
    };
  }
  return {
    value() {
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

// src/headless/input/HeadlessInputRoot.ts
function isHeadlessInputRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessInputRoot(props) {
  const properties = useHeadlessInput(props);
  return (0, import_solid_js19.createComponent)(HeadlessInputContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js19.createMemo)(() => {
        const body = props.children;
        if (isHeadlessInputRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}

// src/headless/autocomplete/HeadlessAutocompleteChild.ts
var import_solid_js21 = require("solid-js");

// src/headless/autocomplete/useHeadlessAutocompleteProperties.ts
var import_solid_js20 = require("solid-js");
var HeadlessAutocompleteContext = (0, import_solid_js20.createContext)();
function useHeadlessAutocompleteProperties() {
  const properties = (0, import_solid_js20.useContext)(HeadlessAutocompleteContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessAutocompleteProperties` must be used within HeadlessAutocompleteRoot.");
}

// src/headless/autocomplete/HeadlessAutocompleteChild.ts
function isHeadlessAutocompleteChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessAutocompleteChild(props) {
  const properties = useHeadlessAutocompleteProperties();
  return (0, import_solid_js21.createMemo)(() => {
    const body = props.children;
    if (isHeadlessAutocompleteChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
function createHeadlessAutocompleteChild(props) {
  return {
    get children() {
      return (0, import_solid_js21.createComponent)(HeadlessAutocompleteChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/autocomplete/HeadlessAutocompleteOption.ts
var import_solid_js23 = require("solid-js");

// src/headless/autocomplete/useHeadlessAutocompleteOption.ts
var import_solid_js22 = require("solid-js");
var HeadlessAutocompleteOptionContext = (0, import_solid_js22.createContext)();
function useHeadlessAutocompleteOptionProperties() {
  const properties = (0, import_solid_js22.useContext)(HeadlessAutocompleteOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error("`useHeadlessAutocompleteOptionProperties` must be used within HeadlessAutocompleteOption");
}
function useHeadlessAutocompleteOption(value, disabled) {
  const properties = useHeadlessAutocompleteProperties();
  const isDisabled = () => {
    const local = disabled == null ? void 0 : disabled();
    const parent = properties.disabled();
    return local || parent;
  };
  return {
    matches() {
      return properties.matches(value());
    },
    isActive() {
      return properties.isActive(value());
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

// src/headless/autocomplete/HeadlessAutocompleteOption.ts
function isHeadlessAutocompleteOptionRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessAutocompleteOption(props) {
  const properties = useHeadlessAutocompleteOption(
    () => props.value,
    () => !!props.disabled
  );
  return (0, import_solid_js23.createComponent)(HeadlessAutocompleteOptionContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js23.createMemo)(() => {
        const body = props.children;
        if (isHeadlessAutocompleteOptionRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}
function createHeadlessAutocompleteOptionProps(props) {
  return {
    get children() {
      return (0, import_solid_js23.createComponent)(HeadlessAutocompleteOption, {
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
function HeadlessAutocompleteOptionChild(props) {
  const properties = useHeadlessAutocompleteOptionProperties();
  return (0, import_solid_js23.createMemo)(() => {
    const body = props.children;
    if (isHeadlessAutocompleteOptionRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
function createHeadlessAutocompleteOptionChildProps(props) {
  return {
    get children() {
      return (0, import_solid_js23.createComponent)(HeadlessAutocompleteOptionChild, {
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/headless/autocomplete/HeadlessAutocompleteRoot.ts
var import_solid_js25 = require("solid-js");

// src/headless/autocomplete/useHeadlessAutocomplete.ts
var import_solid_js24 = require("solid-js");
function useHeadlessAutocomplete(options) {
  const [active, setActive] = (0, import_solid_js24.createSignal)();
  let signal;
  let setSignal;
  if ("defaultValue" in options) {
    const [input, setInput] = (0, import_solid_js24.createSignal)(options.defaultValue);
    signal = input;
    setSignal = (value) => {
      (0, import_solid_js24.batch)(() => {
        var _a;
        setInput(() => value);
        (_a = options.onChange) == null ? void 0 : _a.call(options, value);
      });
    };
  } else {
    signal = () => options.value;
    setSignal = (value) => {
      var _a;
      return (_a = options.onChange) == null ? void 0 : _a.call(options, value);
    };
  }
  return {
    value() {
      return signal();
    },
    setValue(value) {
      if (options.toggleable && Object.is((0, import_solid_js24.untrack)(signal), value)) {
        setSignal(void 0);
      } else {
        setSignal(value);
      }
    },
    matches(value) {
      const currentValue = signal();
      if (!currentValue) {
        return false;
      }
      if (options.matches) {
        return options.matches(currentValue, value);
      }
      return currentValue.includes(value);
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

// src/headless/autocomplete/HeadlessAutocompleteRoot.ts
function isHeadlessAutocompleteRootRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function HeadlessAutocompleteRoot(props) {
  const properties = useHeadlessAutocomplete(props);
  return (0, import_solid_js25.createComponent)(HeadlessAutocompleteContext.Provider, {
    value: properties,
    get children() {
      return (0, import_solid_js25.createMemo)(() => {
        const body = props.children;
        if (isHeadlessAutocompleteRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      });
    }
  });
}
function createHeadlessAutocompleteRootControlledProps(props) {
  return {
    get children() {
      return (0, import_solid_js25.createComponent)(HeadlessAutocompleteRoot, {
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
        get matches() {
          return props.matches;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}
function createHeadlessAutocompleteRootUncontrolledProps(props) {
  return {
    get children() {
      return (0, import_solid_js25.createComponent)(HeadlessAutocompleteRoot, {
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
        get matches() {
          return props.matches;
        },
        get children() {
          return props.children;
        }
      });
    }
  };
}

// src/components/accordion/Accordion.ts
var import_solid_js32 = require("solid-js");

// src/components/accordion/AccordionMultipleControlled.ts
var import_solid_js28 = require("solid-js");
var import_solid_use = require("solid-use");

// src/utils/create-dynamic.ts
var import_solid_js26 = require("solid-js");
var import_web = require("solid-js/web");
function createDynamic(source, props) {
  return (0, import_solid_js26.createComponent)(import_web.Dynamic, (0, import_solid_js26.mergeProps)({
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
function createActive(checked) {
  return {
    get "data-sh-active"() {
      return checked();
    }
  };
}

// src/components/accordion/AccordionContext.ts
var import_solid_js27 = require("solid-js");

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
    if (isFocusable(nodes[current])) {
      return nodes[current];
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
  // eslint-disable-next-line class-methods-use-this
  setChecked(node) {
    node.focus();
  }
  setNextChecked(node, continuous) {
    if (this.internalRef instanceof HTMLElement) {
      if (continuous) {
        focusNextContinuous(
          this.query(this.internalRef),
          node
        );
      } else {
        focusNext(
          this.query(this.internalRef),
          node
        );
      }
    }
  }
  setPrevChecked(node, continuous) {
    if (this.internalRef instanceof HTMLElement) {
      if (continuous) {
        focusPrevContinuous(
          this.query(this.internalRef),
          node
        );
      } else {
        focusPrev(
          this.query(this.internalRef),
          node
        );
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
      focusMatch(
        this.query(this.internalRef),
        character
      );
    }
  }
  getId() {
    return this.ownerID;
  }
};

// src/components/accordion/AccordionContext.ts
var AccordionContext = (0, import_solid_js27.createContext)();
function useAccordionContext(componentName) {
  const context = (0, import_solid_js27.useContext)(AccordionContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}
function createAccordionFocusNavigator() {
  return new FocusNavigator((0, import_solid_js27.createUniqueId)());
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
  return (0, import_solid_js28.createComponent)(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js28.mergeProps)(
          (0, import_solid_use.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "onChange",
            "toggleable",
            "value",
            "multiple",
            "ref"
          ]),
          ACCORDION_TAG,
          {
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          },
          createDisabled(() => props.disabled),
          createHeadlessSelectRootMultipleControlledProps(props)
        )
      );
    }
  });
}

// src/components/accordion/AccordionMultipleUncontrolled.ts
var import_solid_js29 = require("solid-js");
var import_solid_use2 = require("solid-use");
function AccordionMultipleUncontrolled(props) {
  const controller = createAccordionFocusNavigator();
  return (0, import_solid_js29.createComponent)(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js29.mergeProps)(
          (0, import_solid_use2.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "onChange",
            "toggleable",
            "defaultValue",
            "multiple",
            "ref"
          ]),
          ACCORDION_TAG,
          {
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          },
          createDisabled(() => props.disabled),
          createHeadlessSelectRootMultipleUncontrolledProps(props)
        )
      );
    }
  });
}

// src/components/accordion/AccordionSingleControlled.ts
var import_solid_js30 = require("solid-js");
var import_solid_use3 = require("solid-use");
function AccordionSingleControlled(props) {
  const controller = createAccordionFocusNavigator();
  return (0, import_solid_js30.createComponent)(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js30.mergeProps)(
          (0, import_solid_use3.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "onChange",
            "toggleable",
            "value",
            "ref"
          ]),
          ACCORDION_TAG,
          {
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          },
          createDisabled(() => props.disabled),
          createHeadlessSelectRootSingleControlledProps(props)
        )
      );
    }
  });
}

// src/components/accordion/AccordionSingleUncontrolled.ts
var import_solid_js31 = require("solid-js");
var import_solid_use4 = require("solid-use");
function AccordionSingleUncontrolled(props) {
  const controller = createAccordionFocusNavigator();
  return (0, import_solid_js31.createComponent)(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js31.mergeProps)(
          (0, import_solid_use4.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "onChange",
            "toggleable",
            "defaultValue",
            "ref"
          ]),
          ACCORDION_TAG,
          {
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          },
          createDisabled(() => props.disabled),
          createHeadlessSelectRootSingleUncontrolledProps(props)
        )
      );
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
      return (0, import_solid_js32.createComponent)(AccordionMultipleUncontrolled, props);
    }
    return (0, import_solid_js32.createComponent)(AccordionSingleUncontrolled, props);
  }
  if (isAccordionMultiple(props)) {
    return (0, import_solid_js32.createComponent)(AccordionMultipleControlled, props);
  }
  return (0, import_solid_js32.createComponent)(AccordionSingleControlled, props);
}

// src/components/accordion/AccordionItem.ts
var import_solid_js34 = require("solid-js");
var import_solid_use5 = require("solid-use");

// src/components/accordion/AccordionItemContext.ts
var import_solid_js33 = require("solid-js");
var AccordionItemContext = (0, import_solid_js33.createContext)();
function useAccordionItemContext(componentName) {
  const context = (0, import_solid_js33.useContext)(AccordionItemContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AccordionItem>`);
}

// src/components/accordion/AccordionItem.ts
function AccordionItem(props) {
  useAccordionContext("AccordionItem");
  const buttonID = (0, import_solid_js34.createUniqueId)();
  const panelID = (0, import_solid_js34.createUniqueId)();
  return (0, import_solid_js34.createComponent)(AccordionItemContext.Provider, {
    value: { buttonID, panelID },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js34.mergeProps)(
          (0, import_solid_use5.omitProps)(props, [
            "as",
            "children",
            "value",
            "disabled"
          ]),
          ACCORDION_ITEM_TAG,
          createDisabled(() => props.disabled),
          createHeadlessSelectOptionProps(props)
        )
      );
    }
  });
}

// src/components/accordion/AccordionHeader.ts
var import_solid_js35 = require("solid-js");
var import_solid_use6 = require("solid-use");
function AccordionHeader(props) {
  useAccordionItemContext("AccordionHeader");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "h3";
    },
    (0, import_solid_js35.mergeProps)(
      (0, import_solid_use6.omitProps)(props, [
        "as",
        "children"
      ]),
      ACCORDION_HEADER_TAG,
      createHeadlessSelectOptionChildProps(props)
    )
  );
}

// src/components/accordion/AccordionButton.ts
var import_solid_js37 = require("solid-js");
var import_solid_use8 = require("solid-use");

// src/components/button/index.ts
var import_solid_js36 = require("solid-js");
var import_solid_use7 = require("solid-use");
var BUTTON_TAG = createTag("button");
function Button(props) {
  const [internalRef, setInternalRef] = (0, import_solid_js36.createSignal)();
  (0, import_solid_js36.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (ref.tagName !== "BUTTON") {
        const onKeyDown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            ref.click();
          }
        };
        ref.addEventListener("keydown", onKeyDown);
        (0, import_solid_js36.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "button";
    },
    (0, import_solid_js36.mergeProps)(
      {
        get tabindex() {
          return props.disabled ? -1 : 0;
        },
        role: "button"
      },
      createDisabled(() => props.disabled),
      (0, import_solid_use7.omitProps)(props, [
        "as",
        "ref"
      ]),
      BUTTON_TAG,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      }
    )
  );
}

// src/components/accordion/AccordionButton.ts
function AccordionButton(props) {
  const rootContext = useAccordionContext("AccordionButton");
  const itemContext = useAccordionItemContext("AccordionButton");
  const properties = useHeadlessSelectOptionProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js37.createSignal)();
  (0, import_solid_js37.createEffect)(() => {
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
      (0, import_solid_js37.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return (0, import_solid_js37.createComponent)(Button, (0, import_solid_js37.mergeProps)(
    (0, import_solid_use8.omitProps)(props, ["children", "ref", "disabled"]),
    ACCORDION_BUTTON_TAG,
    {
      id: itemContext.buttonID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
      get "aria-controls"() {
        return properties.isSelected() && itemContext.panelID;
      }
    },
    createOwnerAttribute(rootContext.getId()),
    createDisabled(() => {
      const internalDisabled = properties.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => properties.isSelected()),
    createHeadlessSelectOptionChildProps(props)
  ));
}

// src/components/accordion/AccordionPanel.ts
var import_solid_js39 = require("solid-js");
var import_solid_use9 = require("solid-use");

// src/utils/Unmountable.ts
var import_solid_js38 = require("solid-js");
function createUnmountable(props, shouldMount, render) {
  return (0, import_solid_js38.createComponent)(import_solid_js38.Show, {
    get when() {
      var _a;
      return (_a = props.unmount) != null ? _a : true;
    },
    get fallback() {
      return render();
    },
    get children() {
      return (0, import_solid_js38.createComponent)(import_solid_js38.Show, {
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
  return createUnmountable(
    props,
    () => properties.isSelected(),
    () => createDynamic(
      () => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      },
      (0, import_solid_js39.mergeProps)(
        (0, import_solid_use9.omitProps)(props, [
          "as",
          "children",
          "unmount"
        ]),
        {
          id: context.panelID,
          "aria-labelledby": context.buttonID
        },
        ACCORDION_PANEL_TAG,
        createHeadlessSelectOptionChildProps(props)
      )
    )
  );
}

// src/components/alert/index.ts
var import_solid_js40 = require("solid-js");
var import_solid_use10 = require("solid-use");
var ALERT_TAG = createTag("alert");
function Alert(props) {
  const alertID = (0, import_solid_js40.createUniqueId)();
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js40.mergeProps)(
      {
        id: alertID
      },
      (0, import_solid_use10.omitProps)(props, ["as"]),
      ALERT_TAG,
      {
        role: "alert"
      }
    )
  );
}

// src/components/alert-dialog/AlertDialog.ts
var import_solid_js45 = require("solid-js");

// src/components/alert-dialog/AlertDialogControlled.ts
var import_solid_js43 = require("solid-js");
var import_solid_use11 = require("solid-use");

// src/utils/use-focus-start-point.ts
var import_solid_js41 = require("solid-js");

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
    (0, import_solid_js41.onCleanup)(() => {
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
var import_solid_js42 = require("solid-js");
var AlertDialogContext = (0, import_solid_js42.createContext)();
function useAlertDialogContext(componentName) {
  const context = (0, import_solid_js42.useContext)(AlertDialogContext);
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
  const ownerID = (0, import_solid_js43.createUniqueId)();
  const panelID = (0, import_solid_js43.createUniqueId)();
  const titleID = (0, import_solid_js43.createUniqueId)();
  const descriptionID = (0, import_solid_js43.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js43.createComponent)(AlertDialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return (0, import_solid_js43.createComponent)(HeadlessDisclosureRoot, {
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
        children: ({ isOpen }) => createUnmountable(
          props,
          isOpen,
          () => createDynamic(
            () => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            },
            (0, import_solid_js43.mergeProps)(
              (0, import_solid_use11.omitProps)(props, [
                "as",
                "children",
                "unmount",
                "isOpen",
                "disabled",
                "onOpen",
                "onClose",
                "onChange"
              ]),
              ALERT_DIALOG_TAG,
              {
                id: ownerID,
                role: "alertdialog",
                "aria-modal": true,
                "aria-labelledby": titleID,
                "aria-describedby": descriptionID
              },
              createHeadlessDisclosureChildProps(props)
            )
          )
        )
      });
    }
  });
}

// src/components/alert-dialog/AlertDialogUncontrolled.ts
var import_solid_js44 = require("solid-js");
var import_solid_use12 = require("solid-use");
function AlertDialogUncontrolled(props) {
  const ownerID = (0, import_solid_js44.createUniqueId)();
  const panelID = (0, import_solid_js44.createUniqueId)();
  const titleID = (0, import_solid_js44.createUniqueId)();
  const descriptionID = (0, import_solid_js44.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js44.createComponent)(AlertDialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return (0, import_solid_js44.createComponent)(HeadlessDisclosureRoot, {
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
        children: ({ isOpen }) => createUnmountable(
          props,
          isOpen,
          () => createDynamic(
            () => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            },
            (0, import_solid_js44.mergeProps)(
              (0, import_solid_use12.omitProps)(props, [
                "as",
                "children",
                "unmount",
                "defaultOpen",
                "disabled",
                "onOpen",
                "onClose",
                "onChange"
              ]),
              ALERT_DIALOG_TAG,
              {
                id: ownerID,
                role: "alertdialog",
                "aria-modal": true,
                "aria-labelledby": titleID,
                "aria-describedby": descriptionID
              },
              createHeadlessDisclosureChildProps(props)
            )
          )
        )
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
    return (0, import_solid_js45.createComponent)(AlertDialogUncontrolled, props);
  }
  return (0, import_solid_js45.createComponent)(AlertDialogControlled, props);
}

// src/components/alert-dialog/AlertDialogDescription.ts
var import_solid_js46 = require("solid-js");
var import_solid_use13 = require("solid-use");
function AlertDialogDescription(props) {
  const context = useAlertDialogContext("AlertDialogDescription");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "p";
    },
    (0, import_solid_js46.mergeProps)(
      (0, import_solid_use13.omitProps)(props, [
        "as",
        "children"
      ]),
      ALERT_DIALOG_DESCRIPTION,
      {
        id: context.descriptionID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/alert-dialog/AlertDialogOverlay.ts
var import_solid_js47 = require("solid-js");
var import_solid_use14 = require("solid-use");
function AlertDialogOverlay(props) {
  useAlertDialogContext("AlertDialogOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js47.createSignal)();
  (0, import_solid_js47.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js47.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js47.mergeProps)(
      (0, import_solid_use14.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      ALERT_DIALOG_OVERLAY,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/alert-dialog/AlertDialogPanel.ts
var import_solid_js48 = require("solid-js");
var import_solid_use15 = require("solid-use");
function AlertDialogPanel(props) {
  const context = useAlertDialogContext("AlertDialogPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js48.createSignal)();
  (0, import_solid_js48.createEffect)(() => {
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
        (0, import_solid_js48.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js48.mergeProps)(
      (0, import_solid_use15.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      ALERT_DIALOG_PANEL,
      {
        id: context.panelID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/alert-dialog/AlertDialogTitle.ts
var import_solid_js49 = require("solid-js");
var import_solid_use16 = require("solid-use");
function AlertDialogTitle(props) {
  const context = useAlertDialogContext("AlertDialogTitle");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "h2";
    },
    (0, import_solid_js49.mergeProps)(
      (0, import_solid_use16.omitProps)(props, [
        "as",
        "children"
      ]),
      ALERT_DIALOG_TITLE,
      {
        id: context.titleID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/checkbox/Checkbox.ts
var import_solid_js54 = require("solid-js");

// src/components/checkbox/CheckboxControlled.ts
var import_solid_js52 = require("solid-js");
var import_solid_use17 = require("solid-use");

// src/utils/Fragment.ts
var import_solid_js50 = require("solid-js");
function Fragment(props) {
  return (0, import_solid_js50.createMemo)(() => props.children);
}

// src/components/checkbox/CheckboxContext.ts
var import_solid_js51 = require("solid-js");
var CheckboxContext = (0, import_solid_js51.createContext)();
function useCheckboxContext(componentName) {
  const context = (0, import_solid_js51.useContext)(CheckboxContext);
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
  const ownerID = (0, import_solid_js52.createUniqueId)();
  const labelID = (0, import_solid_js52.createUniqueId)();
  const indicatorID = (0, import_solid_js52.createUniqueId)();
  const descriptionID = (0, import_solid_js52.createUniqueId)();
  return (0, import_solid_js52.createComponent)(CheckboxContext.Provider, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js52.mergeProps)(
          (0, import_solid_use17.omitProps)(props, [
            "checked",
            "as",
            "children",
            "disabled",
            "onChange"
          ]),
          CHECKBOX_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js52.createComponent)(HeadlessToggleRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/checkbox/CheckboxUncontrolled.ts
var import_solid_js53 = require("solid-js");
var import_solid_use18 = require("solid-use");
function CheckboxUncontrolled(props) {
  const ownerID = (0, import_solid_js53.createUniqueId)();
  const labelID = (0, import_solid_js53.createUniqueId)();
  const indicatorID = (0, import_solid_js53.createUniqueId)();
  const descriptionID = (0, import_solid_js53.createUniqueId)();
  return (0, import_solid_js53.createComponent)(CheckboxContext.Provider, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js53.mergeProps)(
          (0, import_solid_use18.omitProps)(props, [
            "defaultChecked",
            "as",
            "children",
            "disabled",
            "onChange"
          ]),
          CHECKBOX_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js53.createComponent)(HeadlessToggleRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/checkbox/Checkbox.ts
function isCheckboxUncontrolled(props) {
  return "defaultChecked" in props;
}
function Checkbox(props) {
  if (isCheckboxUncontrolled(props)) {
    return (0, import_solid_js54.createComponent)(CheckboxUncontrolled, props);
  }
  return (0, import_solid_js54.createComponent)(CheckboxControlled, props);
}

// src/components/checkbox/CheckboxDescription.ts
var import_solid_js55 = require("solid-js");
var import_solid_use19 = require("solid-use");
function CheckboxDescription(props) {
  const context = useCheckboxContext("CheckboxDescription");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "p";
    },
    (0, import_solid_js55.mergeProps)(
      (0, import_solid_use19.omitProps)(props, [
        "as",
        "children"
      ]),
      CHECKBOX_DESCRIPTION,
      {
        id: context.descriptionID
      }
    )
  );
}

// src/components/checkbox/CheckboxIndicator.ts
var import_solid_js56 = require("solid-js");
var import_solid_use20 = require("solid-use");
function CheckboxIndicator(props) {
  const context = useCheckboxContext("CheckboxIndicator");
  const state = useHeadlessToggleProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js56.createSignal)();
  (0, import_solid_js56.createEffect)(() => {
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
      (0, import_solid_js56.onCleanup)(() => {
        ref.removeEventListener("click", toggle);
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return (0, import_solid_js56.createComponent)(Button, (0, import_solid_js56.mergeProps)(
    (0, import_solid_use20.omitProps)(props, [
      "children",
      "ref"
    ]),
    CHECKBOX_INDICATOR,
    {
      id: context.indicatorID,
      role: "checkbox",
      "aria-labelledby": context.labelID,
      "aria-describedby": context.descriptionID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      })
    },
    createDisabled(() => state.disabled()),
    createChecked(() => state.checked()),
    {
      get children() {
        return (0, import_solid_js56.createComponent)(HeadlessToggleChild, {
          get children() {
            return props.children;
          }
        });
      }
    }
  ));
}

// src/components/checkbox/CheckboxLabel.ts
var import_solid_js57 = require("solid-js");
var import_solid_use21 = require("solid-use");
function CheckboxLabel(props) {
  const context = useCheckboxContext("CheckboxLabel");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "label";
    },
    (0, import_solid_js57.mergeProps)(
      (0, import_solid_use21.omitProps)(props, [
        "as",
        "children"
      ]),
      CHECKBOX_LABEL,
      {
        id: context.labelID,
        for: context.indicatorID,
        get children() {
          return props.children;
        }
      }
    )
  );
}

// src/components/color-scheme/index.ts
var import_solid_js58 = require("solid-js");
var import_solid_use22 = require("solid-use");
var ColorSchemeContext = (0, import_solid_js58.createContext)();
var STORAGE_KEY = "theme-preference";
function ColorSchemeProvider(props) {
  let get;
  let set;
  if ("initialValue" in props) {
    const [scheme, setScheme] = (0, import_solid_js58.createSignal)(props.initialValue);
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
  const prefersDark = (0, import_solid_use22.usePrefersDark)();
  const isVisible = (0, import_solid_use22.usePageVisibility)();
  const shouldToggle = (0, import_solid_js58.createMemo)(() => get() === "system" && prefersDark() || get() === "dark");
  (0, import_solid_js58.createEffect)(() => {
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
    (0, import_solid_js58.onCleanup)(() => {
      window.removeEventListener("storage", onChange, false);
    });
  });
  (0, import_solid_js58.createEffect)(() => {
    localStorage.setItem(STORAGE_KEY, get());
  });
  (0, import_solid_js58.createEffect)(() => {
    document.documentElement.classList.toggle(
      "dark",
      shouldToggle()
    );
  });
  return (0, import_solid_js58.createComponent)(ColorSchemeContext.Provider, {
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
  const ctx = (0, import_solid_js58.useContext)(ColorSchemeContext);
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
var import_solid_js63 = require("solid-js");

// src/components/command-bar/CommandBarControlled.ts
var import_solid_js61 = require("solid-js");
var import_solid_use23 = require("solid-use");

// src/components/command-bar/CommandBarContext.ts
var import_solid_js59 = require("solid-js");
var CommandBarContext = (0, import_solid_js59.createContext)();
function useCommandBarContext(componentName) {
  const context = (0, import_solid_js59.useContext)(CommandBarContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <CommandBar>`);
}

// src/components/command-bar/CommandBarEvents.ts
var import_solid_js60 = require("solid-js");
function CommandBarEvents(props) {
  const properties = useHeadlessDisclosureProperties();
  (0, import_solid_js60.createEffect)(() => {
    const onKeyDown = (ev) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === "k" && ev.defaultPrevented === false) {
        ev.preventDefault();
        properties.setState(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    (0, import_solid_js60.onCleanup)(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });
  return (0, import_solid_js60.createMemo)(() => props.children);
}

// src/components/command-bar/tags.ts
var COMMAND_BAR_TAG = createTag("command-bar");
var COMMAND_BAR_DESCRIPTION_TAG = createTag("command-bar-description");
var COMMAND_BAR_OVERLAY_TAG = createTag("command-bar-overlay");
var COMMAND_BAR_PANEL_TAG = createTag("command-bar-panel");
var COMMAND_BAR_TITLE_TAG = createTag("command-bar-title");

// src/components/command-bar/CommandBarControlled.ts
function CommandBarControlled(props) {
  const ownerID = (0, import_solid_js61.createUniqueId)();
  const panelID = (0, import_solid_js61.createUniqueId)();
  const titleID = (0, import_solid_js61.createUniqueId)();
  const descriptionID = (0, import_solid_js61.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js61.createComponent)(CommandBarContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return (0, import_solid_js61.createComponent)(HeadlessDisclosureRoot, {
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
        children: ({ isOpen }) => (0, import_solid_js61.createComponent)(CommandBarEvents, {
          get children() {
            return createUnmountable(
              props,
              isOpen,
              () => createDynamic(
                () => {
                  var _a;
                  return (_a = props.as) != null ? _a : "div";
                },
                (0, import_solid_js61.mergeProps)(
                  (0, import_solid_use23.omitProps)(props, [
                    "as",
                    "children",
                    "unmount",
                    "isOpen",
                    "disabled",
                    "onOpen",
                    "onClose",
                    "onChange"
                  ]),
                  {
                    id: ownerID,
                    role: "dialog",
                    "aria-modal": true,
                    "aria-labelledby": titleID,
                    "aria-describedby": descriptionID
                  },
                  COMMAND_BAR_TAG,
                  createHeadlessDisclosureChildProps(props)
                )
              )
            );
          }
        })
      });
    }
  });
}

// src/components/command-bar/CommandBarUncontrolled.ts
var import_solid_js62 = require("solid-js");
var import_solid_use24 = require("solid-use");
function CommandBarUncontrolled(props) {
  const ownerID = (0, import_solid_js62.createUniqueId)();
  const panelID = (0, import_solid_js62.createUniqueId)();
  const titleID = (0, import_solid_js62.createUniqueId)();
  const descriptionID = (0, import_solid_js62.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js62.createComponent)(CommandBarContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return (0, import_solid_js62.createComponent)(HeadlessDisclosureRoot, {
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
        children: ({ isOpen }) => (0, import_solid_js62.createComponent)(CommandBarEvents, {
          get children() {
            return createUnmountable(
              props,
              isOpen,
              () => createDynamic(
                () => {
                  var _a;
                  return (_a = props.as) != null ? _a : "div";
                },
                (0, import_solid_js62.mergeProps)(
                  (0, import_solid_use24.omitProps)(props, [
                    "as",
                    "children",
                    "unmount",
                    "defaultOpen",
                    "disabled",
                    "onOpen",
                    "onClose",
                    "onChange"
                  ]),
                  COMMAND_BAR_TAG,
                  {
                    id: ownerID,
                    role: "dialog",
                    "aria-modal": true,
                    "aria-labelledby": titleID,
                    "aria-describedby": descriptionID
                  },
                  createHeadlessDisclosureChildProps(props)
                )
              )
            );
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
    return (0, import_solid_js63.createComponent)(CommandBarUncontrolled, props);
  }
  return (0, import_solid_js63.createComponent)(CommandBarControlled, props);
}

// src/components/command-bar/CommandBarDescription.ts
var import_solid_js64 = require("solid-js");
var import_solid_use25 = require("solid-use");
function CommandBarDescription(props) {
  const context = useCommandBarContext("CommandBarDescription");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "p";
    },
    (0, import_solid_js64.mergeProps)(
      (0, import_solid_use25.omitProps)(props, [
        "as",
        "children"
      ]),
      COMMAND_BAR_DESCRIPTION_TAG,
      {
        id: context.descriptionID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/command-bar/CommandBarOverlay.ts
var import_solid_js65 = require("solid-js");
var import_solid_use26 = require("solid-use");
function CommandBarOverlay(props) {
  useCommandBarContext("CommandBarOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js65.createSignal)();
  (0, import_solid_js65.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js65.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js65.mergeProps)(
      (0, import_solid_use26.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      COMMAND_BAR_OVERLAY_TAG,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/command-bar/CommandBarPanel.ts
var import_solid_js66 = require("solid-js");
var import_solid_use27 = require("solid-use");
function CommandBarPanel(props) {
  const context = useCommandBarContext("CommandBarPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js66.createSignal)();
  (0, import_solid_js66.createEffect)(() => {
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
        (0, import_solid_js66.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js66.mergeProps)(
      (0, import_solid_use27.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      COMMAND_BAR_PANEL_TAG,
      {
        id: context.panelID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/command-bar/CommandBarTitle.ts
var import_solid_js67 = require("solid-js");
var import_solid_use28 = require("solid-use");
function CommandBarTitle(props) {
  const context = useCommandBarContext("CommandBarTitle");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "h2";
    },
    (0, import_solid_js67.mergeProps)(
      (0, import_solid_use28.omitProps)(props, [
        "as",
        "children"
      ]),
      COMMAND_BAR_TITLE_TAG,
      {
        id: context.titleID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/context-menu/ContextMenu.ts
var import_solid_js71 = require("solid-js");

// src/components/context-menu/ContextMenuControlled.ts
var import_solid_js69 = require("solid-js");
var import_solid_use29 = require("solid-use");

// src/components/context-menu/ContextMenuContext.ts
var import_solid_js68 = require("solid-js");
var ContextMenuContext = (0, import_solid_js68.createContext)();
function useContextMenuContext(componentName) {
  const context = (0, import_solid_js68.useContext)(ContextMenuContext);
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
  const ownerID = (0, import_solid_js69.createUniqueId)();
  const boundaryID = (0, import_solid_js69.createUniqueId)();
  const panelID = (0, import_solid_js69.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js69.createComponent)(ContextMenuContext.Provider, {
    value: {
      ownerID,
      boundaryID,
      panelID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js69.mergeProps)(
          (0, import_solid_use29.omitProps)(props, [
            "isOpen",
            "as",
            "children",
            "disabled",
            "onChange",
            "onOpen",
            "onClose"
          ]),
          CONTEXT_MENU_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js69.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/context-menu/ContextMenuUncontrolled.ts
var import_solid_js70 = require("solid-js");
var import_solid_use30 = require("solid-use");
function ContextMenuUncontrolled(props) {
  const ownerID = (0, import_solid_js70.createUniqueId)();
  const boundaryID = (0, import_solid_js70.createUniqueId)();
  const panelID = (0, import_solid_js70.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js70.createComponent)(ContextMenuContext.Provider, {
    value: {
      ownerID,
      boundaryID,
      panelID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js70.mergeProps)(
          (0, import_solid_use30.omitProps)(props, [
            "defaultOpen",
            "as",
            "children",
            "disabled",
            "onChange",
            "onOpen",
            "onClose"
          ]),
          CONTEXT_MENU_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js70.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/context-menu/ContextMenu.ts
function isContextMenuUncontrolled(props) {
  return "defaultOpen" in props;
}
function ContextMenu(props) {
  if (isContextMenuUncontrolled(props)) {
    return (0, import_solid_js71.createComponent)(ContextMenuUncontrolled, props);
  }
  return (0, import_solid_js71.createComponent)(ContextMenuControlled, props);
}

// src/components/context-menu/ContextMenuBoundary.ts
var import_solid_js72 = require("solid-js");
var import_solid_use31 = require("solid-use");
function ContextMenuBoundary(props) {
  const context = useContextMenuContext("ContextMenuBoundary");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js72.createSignal)();
  (0, import_solid_js72.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = (e) => {
        if (!properties.disabled()) {
          e.preventDefault();
          properties.setState(true);
        }
      };
      ref.addEventListener("contextmenu", toggle);
      (0, import_solid_js72.onCleanup)(() => {
        ref.removeEventListener("contextmenu", toggle);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js72.mergeProps)(
      (0, import_solid_use31.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      CONTEXT_MENU_BOUNDARY_TAG,
      {
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
      },
      createDisabled(() => properties.disabled()),
      createExpanded(() => properties.isOpen()),
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/context-menu/ContextMenuOverlay.ts
var import_solid_js73 = require("solid-js");
var import_solid_use32 = require("solid-use");
function ContextMenuOverlay(props) {
  useContextMenuContext("ContextMenuOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js73.createSignal)();
  (0, import_solid_js73.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js73.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js73.mergeProps)(
      (0, import_solid_use32.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      CONTEXT_MENU_OVERLAY_TAG,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/context-menu/ContextMenuPanel.ts
var import_solid_js74 = require("solid-js");
var import_solid_use33 = require("solid-use");
function ContextMenuPanel(props) {
  const context = useContextMenuContext("ContextMenuPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js74.createSignal)();
  (0, import_solid_js74.createEffect)(() => {
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
        (0, import_solid_js74.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
          document.removeEventListener("click", onClickOutside);
        });
      }
    }
  });
  return createUnmountable(
    props,
    () => properties.isOpen(),
    () => createDynamic(
      () => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      },
      (0, import_solid_js74.mergeProps)(
        (0, import_solid_use33.omitProps)(props, [
          "as",
          "unmount",
          "children",
          "ref"
        ]),
        CONTEXT_MENU_PANEL_TAG,
        {
          id: context.panelID,
          ref: createRef(props, (e) => {
            setInternalRef(() => e);
          })
        },
        createHeadlessDisclosureChildProps(props)
      )
    )
  );
}

// src/components/dialog/Dialog.ts
var import_solid_js78 = require("solid-js");

// src/components/dialog/DialogControlled.ts
var import_solid_js76 = require("solid-js");
var import_solid_use34 = require("solid-use");

// src/components/dialog/DialogContext.ts
var import_solid_js75 = require("solid-js");
var DialogContext = (0, import_solid_js75.createContext)();
function useDialogContext(componentName) {
  const context = (0, import_solid_js75.useContext)(DialogContext);
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
  const ownerID = (0, import_solid_js76.createUniqueId)();
  const panelID = (0, import_solid_js76.createUniqueId)();
  const titleID = (0, import_solid_js76.createUniqueId)();
  const descriptionID = (0, import_solid_js76.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js76.createComponent)(DialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return (0, import_solid_js76.createComponent)(HeadlessDisclosureRoot, {
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
        children: ({ isOpen }) => createUnmountable(
          props,
          isOpen,
          () => createDynamic(
            () => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            },
            (0, import_solid_js76.mergeProps)(
              (0, import_solid_use34.omitProps)(props, [
                "as",
                "children",
                "unmount",
                "isOpen",
                "disabled",
                "onOpen",
                "onClose",
                "onChange"
              ]),
              DIALOG_TAG,
              {
                id: ownerID,
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": titleID,
                "aria-describedby": descriptionID
              },
              createHeadlessDisclosureChildProps(props)
            )
          )
        )
      });
    }
  });
}

// src/components/dialog/DialogUncontrolled.ts
var import_solid_js77 = require("solid-js");
var import_solid_use35 = require("solid-use");
function DialogUncontrolled(props) {
  const ownerID = (0, import_solid_js77.createUniqueId)();
  const panelID = (0, import_solid_js77.createUniqueId)();
  const titleID = (0, import_solid_js77.createUniqueId)();
  const descriptionID = (0, import_solid_js77.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js77.createComponent)(DialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID
    },
    get children() {
      return (0, import_solid_js77.createComponent)(HeadlessDisclosureRoot, {
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
        children: ({ isOpen }) => createUnmountable(
          props,
          isOpen,
          () => createDynamic(
            () => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            },
            (0, import_solid_js77.mergeProps)(
              (0, import_solid_use35.omitProps)(props, [
                "as",
                "children",
                "unmount",
                "defaultOpen",
                "disabled",
                "onOpen",
                "onClose",
                "onChange"
              ]),
              DIALOG_TAG,
              {
                id: ownerID,
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": titleID,
                "aria-describedby": descriptionID
              },
              createHeadlessDisclosureChildProps(props)
            )
          )
        )
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
    return (0, import_solid_js78.createComponent)(DialogUncontrolled, props);
  }
  return (0, import_solid_js78.createComponent)(DialogControlled, props);
}

// src/components/dialog/DialogDescription.ts
var import_solid_js79 = require("solid-js");
var import_solid_use36 = require("solid-use");
function DialogDescription(props) {
  const context = useDialogContext("DialogDescription");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "p";
    },
    (0, import_solid_js79.mergeProps)(
      (0, import_solid_use36.omitProps)(props, [
        "as",
        "children"
      ]),
      DIALOG_DESCRIPTION_TAG,
      {
        id: context.descriptionID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/dialog/DialogOverlay.ts
var import_solid_js80 = require("solid-js");
var import_solid_use37 = require("solid-use");
function DialogOverlay(props) {
  useDialogContext("DialogOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js80.createSignal)();
  (0, import_solid_js80.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js80.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js80.mergeProps)(
      (0, import_solid_use37.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      DIALOG_OVERLAY_TAG,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/dialog/DialogPanel.ts
var import_solid_js81 = require("solid-js");
var import_solid_use38 = require("solid-use");
function DialogPanel(props) {
  const context = useDialogContext("DialogPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js81.createSignal)();
  (0, import_solid_js81.createEffect)(() => {
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
        (0, import_solid_js81.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
        });
      }
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js81.mergeProps)(
      (0, import_solid_use38.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      DIALOG_PANEL_TAG,
      {
        id: context.panelID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/dialog/DialogTitle.ts
var import_solid_js82 = require("solid-js");
var import_solid_use39 = require("solid-use");
function DialogTitle(props) {
  const context = useDialogContext("DialogTitle");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "h2";
    },
    (0, import_solid_js82.mergeProps)(
      (0, import_solid_use39.omitProps)(props, [
        "as",
        "children"
      ]),
      DIALOG_TITLE_TAG,
      {
        id: context.titleID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/disclosure/Disclosure.ts
var import_solid_js86 = require("solid-js");

// src/components/disclosure/DisclosureControlled.ts
var import_solid_js84 = require("solid-js");
var import_solid_use40 = require("solid-use");

// src/components/disclosure/DisclosureContext.ts
var import_solid_js83 = require("solid-js");
var DisclosureContext = (0, import_solid_js83.createContext)();
function useDisclosureContext(componentName) {
  const context = (0, import_solid_js83.useContext)(DisclosureContext);
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
  const ownerID = (0, import_solid_js84.createUniqueId)();
  const buttonID = (0, import_solid_js84.createUniqueId)();
  const panelID = (0, import_solid_js84.createUniqueId)();
  return (0, import_solid_js84.createComponent)(DisclosureContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js84.mergeProps)(
          (0, import_solid_use40.omitProps)(props, [
            "isOpen",
            "as",
            "children",
            "disabled",
            "onChange"
          ]),
          DISCLOSURE_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js84.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/disclosure/DisclosureUncontrolled.ts
var import_solid_js85 = require("solid-js");
var import_solid_use41 = require("solid-use");
function DisclosureUncontrolled(props) {
  const ownerID = (0, import_solid_js85.createUniqueId)();
  const buttonID = (0, import_solid_js85.createUniqueId)();
  const panelID = (0, import_solid_js85.createUniqueId)();
  return (0, import_solid_js85.createComponent)(DisclosureContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js85.mergeProps)(
          (0, import_solid_use41.omitProps)(props, [
            "defaultOpen",
            "as",
            "children",
            "disabled",
            "onChange"
          ]),
          DISCLOSURE_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js85.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/disclosure/Disclosure.ts
function isDisclosureUncontrolled(props) {
  return "defaultOpen" in props;
}
function Disclosure(props) {
  if (isDisclosureUncontrolled(props)) {
    return (0, import_solid_js86.createComponent)(DisclosureUncontrolled, props);
  }
  return (0, import_solid_js86.createComponent)(DisclosureControlled, props);
}

// src/components/disclosure/DisclosureButton.ts
var import_solid_js87 = require("solid-js");
var import_web2 = require("solid-js/web");
var import_solid_use42 = require("solid-use");
function DisclosureButton(props) {
  const context = useDisclosureContext("DisclosureButton");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js87.createSignal)();
  (0, import_solid_js87.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      (0, import_solid_js87.onCleanup)(() => {
        ref.removeEventListener("click", toggle);
      });
    }
  });
  return (0, import_web2.createComponent)(Button, (0, import_solid_js87.mergeProps)(
    (0, import_solid_use42.omitProps)(props, [
      "children",
      "ref"
    ]),
    DISCLOSURE_BUTTON_TAG,
    {
      id: context.buttonID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
      get "aria-controls"() {
        return properties.isOpen() && context.panelID;
      }
    },
    createDisabled(() => {
      const internalDisabled = properties.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => properties.isOpen()),
    createHeadlessDisclosureChildProps(props)
  ));
}

// src/components/disclosure/DisclosurePanel.ts
var import_solid_js88 = require("solid-js");
var import_solid_use43 = require("solid-use");
function DisclosurePanel(props) {
  const context = useDisclosureContext("DisclosurePanel");
  const properties = useHeadlessDisclosureProperties();
  return createUnmountable(
    props,
    () => properties.isOpen(),
    () => createDynamic(
      () => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      },
      (0, import_solid_js88.mergeProps)(
        (0, import_solid_use43.omitProps)(props, [
          "as",
          "unmount",
          "children"
        ]),
        DISCLOSURE_PANEL_TAG,
        {
          id: context.panelID
        },
        createHeadlessDisclosureChildProps(props)
      )
    )
  );
}

// src/components/feed/Feed.ts
var import_solid_js90 = require("solid-js");
var import_solid_use44 = require("solid-use");

// src/components/feed/FeedContext.ts
var import_solid_js89 = require("solid-js");
var FeedContext = (0, import_solid_js89.createContext)();
function useFeedContext(componentName) {
  const context = (0, import_solid_js89.useContext)(FeedContext);
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
  const ownerID = (0, import_solid_js90.createUniqueId)();
  const labelID = (0, import_solid_js90.createUniqueId)();
  const contentID = (0, import_solid_js90.createUniqueId)();
  let internalRef;
  return (0, import_solid_js90.createComponent)(FeedContext.Provider, {
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
        focusNext(
          getFocusableElements(document.documentElement),
          internalRef
        );
      },
      focusPrev() {
        focusPrev(
          getFocusableElements(document.documentElement),
          internalRef
        );
      }
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js90.mergeProps)(
          (0, import_solid_use44.omitProps)(props, [
            "as",
            "busy",
            "size"
          ]),
          FEED_TAG,
          {
            id: ownerID,
            ref: createRef(props, (e) => {
              internalRef = e;
            })
          }
        )
      );
    }
  });
}

// src/components/feed/FeedArticle.ts
var import_solid_js93 = require("solid-js");
var import_solid_use45 = require("solid-use");

// src/components/feed/FeedArticleContext.ts
var import_solid_js91 = require("solid-js");
var FeedArticleContext = (0, import_solid_js91.createContext)();
function useFeedArticleContext(componentName) {
  const context = (0, import_solid_js91.useContext)(FeedArticleContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedArticle>`);
}

// src/components/feed/FeedContentContext.ts
var import_solid_js92 = require("solid-js");
var FeedContentContext = (0, import_solid_js92.createContext)();
function useFeedContentContext(componentName) {
  const context = (0, import_solid_js92.useContext)(FeedContentContext);
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
  const [internalRef, setInternalRef] = (0, import_solid_js93.createSignal)();
  (0, import_solid_js93.createEffect)(() => {
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
      (0, import_solid_js93.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  const ownerID = (0, import_solid_js93.createUniqueId)();
  const labelID = (0, import_solid_js93.createUniqueId)();
  const descriptionID = (0, import_solid_js93.createUniqueId)();
  return (0, import_solid_js93.createComponent)(FeedArticleContext.Provider, {
    value: {
      ownerID,
      labelID,
      descriptionID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "article";
        },
        (0, import_solid_js93.mergeProps)(
          (0, import_solid_use45.omitProps)(props, ["as"]),
          FEED_ARTICLE_TAG,
          createOwnerAttribute(rootContext.ownerID),
          {
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
          }
        )
      );
    }
  });
}

// src/components/feed/FeedArticleDescription.ts
var import_solid_js94 = require("solid-js");
var import_solid_use46 = require("solid-use");
function FeedArticleDescription(props) {
  const context = useFeedArticleContext("FeedArticleDescription");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "p";
    },
    (0, import_solid_js94.mergeProps)(
      (0, import_solid_use46.omitProps)(props, ["as"]),
      FEED_ARTICLE_DESCRIPTION_TAG,
      {
        id: context.descriptionID
      }
    )
  );
}

// src/components/feed/FeedArticleLabel.ts
var import_solid_js95 = require("solid-js");
var import_solid_use47 = require("solid-use");
function FeedArticleLabel(props) {
  const context = useFeedArticleContext("FeedArticleLabel");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "span";
    },
    (0, import_solid_js95.mergeProps)(
      (0, import_solid_use47.omitProps)(props, ["as"]),
      FEED_ARTICLE_LABEL_TAG,
      {
        id: context.labelID
      }
    )
  );
}

// src/components/feed/FeedContent.ts
var import_solid_js96 = require("solid-js");
var import_solid_use48 = require("solid-use");
function FeedContent(props) {
  const context = useFeedContext("FeedContent");
  const controller = createFeedArticleFocusNavigator(context.ownerID);
  const [internalRef, setInternalRef] = (0, import_solid_js96.createSignal)();
  (0, import_solid_js96.createEffect)(() => {
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
      (0, import_solid_js96.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return (0, import_solid_js96.createComponent)(FeedContentContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js96.mergeProps)(
          (0, import_solid_use48.omitProps)(props, ["as"]),
          FEED_CONTENT_TAG,
          {
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
          }
        )
      );
    }
  });
}

// src/components/feed/FeedLabel.ts
var import_solid_js97 = require("solid-js");
var import_solid_use49 = require("solid-use");
function FeedLabel(props) {
  const context = useFeedContext("FeedLabel");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "span";
    },
    (0, import_solid_js97.mergeProps)(
      (0, import_solid_use49.omitProps)(props, ["as"]),
      FEED_LABEL_TAG,
      {
        id: context.labelID
      }
    )
  );
}

// src/components/listbox/Listbox.ts
var import_solid_js107 = require("solid-js");

// src/components/listbox/ListboxMCSCD.ts
var import_solid_js99 = require("solid-js");
var import_solid_use50 = require("solid-use");

// src/components/listbox/ListboxContext.ts
var import_solid_js98 = require("solid-js");
var ListboxContext = (0, import_solid_js98.createContext)();
function useListboxContext(componentName) {
  const context = (0, import_solid_js98.useContext)(ListboxContext);
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
  const [hovering, setHovering] = (0, import_solid_js99.createSignal)(false);
  const ownerID = (0, import_solid_js99.createUniqueId)();
  const labelID = (0, import_solid_js99.createUniqueId)();
  const buttonID = (0, import_solid_js99.createUniqueId)();
  const optionsID = (0, import_solid_js99.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js99.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js99.mergeProps)(
          (0, import_solid_use50.omitProps)(props, [
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
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js99.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js99.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxMCSUD.ts
var import_solid_js100 = require("solid-js");
var import_solid_use51 = require("solid-use");
function ListboxMCSUD(props) {
  const [hovering, setHovering] = (0, import_solid_js100.createSignal)(false);
  const ownerID = (0, import_solid_js100.createUniqueId)();
  const labelID = (0, import_solid_js100.createUniqueId)();
  const buttonID = (0, import_solid_js100.createUniqueId)();
  const optionsID = (0, import_solid_js100.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js100.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js100.mergeProps)(
          (0, import_solid_use51.omitProps)(props, [
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
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js100.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js100.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxMUSCD.ts
var import_solid_js101 = require("solid-js");
var import_solid_use52 = require("solid-use");
function ListboxMUSCD(props) {
  const [hovering, setHovering] = (0, import_solid_js101.createSignal)(false);
  const ownerID = (0, import_solid_js101.createUniqueId)();
  const labelID = (0, import_solid_js101.createUniqueId)();
  const buttonID = (0, import_solid_js101.createUniqueId)();
  const optionsID = (0, import_solid_js101.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js101.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js101.mergeProps)(
          (0, import_solid_use52.omitProps)(props, [
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
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js101.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js101.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxMUSUD.ts
var import_solid_js102 = require("solid-js");
var import_solid_use53 = require("solid-use");
function ListboxMUSUD(props) {
  const [hovering, setHovering] = (0, import_solid_js102.createSignal)(false);
  const ownerID = (0, import_solid_js102.createUniqueId)();
  const labelID = (0, import_solid_js102.createUniqueId)();
  const buttonID = (0, import_solid_js102.createUniqueId)();
  const optionsID = (0, import_solid_js102.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js102.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js102.mergeProps)(
          (0, import_solid_use53.omitProps)(props, [
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
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js102.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js102.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxSCSCD.ts
var import_solid_js103 = require("solid-js");
var import_solid_use54 = require("solid-use");
function ListboxSCSCD(props) {
  const [hovering, setHovering] = (0, import_solid_js103.createSignal)(false);
  const ownerID = (0, import_solid_js103.createUniqueId)();
  const labelID = (0, import_solid_js103.createUniqueId)();
  const buttonID = (0, import_solid_js103.createUniqueId)();
  const optionsID = (0, import_solid_js103.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js103.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js103.mergeProps)(
          (0, import_solid_use54.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "horizontal",
            "isOpen",
            "onDisclosureChange",
            "onSelectChange",
            "toggleable",
            "value"
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js103.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js103.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxSCSUD.ts
var import_solid_js104 = require("solid-js");
var import_solid_use55 = require("solid-use");
function ListboxSCSUD(props) {
  const [hovering, setHovering] = (0, import_solid_js104.createSignal)(false);
  const ownerID = (0, import_solid_js104.createUniqueId)();
  const labelID = (0, import_solid_js104.createUniqueId)();
  const buttonID = (0, import_solid_js104.createUniqueId)();
  const optionsID = (0, import_solid_js104.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js104.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js104.mergeProps)(
          (0, import_solid_use55.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "horizontal",
            "defaultOpen",
            "onDisclosureChange",
            "onSelectChange",
            "toggleable",
            "value"
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js104.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js104.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxSUSCD.ts
var import_solid_js105 = require("solid-js");
var import_solid_use56 = require("solid-use");
function ListboxSUSCD(props) {
  const [hovering, setHovering] = (0, import_solid_js105.createSignal)(false);
  const ownerID = (0, import_solid_js105.createUniqueId)();
  const labelID = (0, import_solid_js105.createUniqueId)();
  const buttonID = (0, import_solid_js105.createUniqueId)();
  const optionsID = (0, import_solid_js105.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js105.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js105.mergeProps)(
          (0, import_solid_use56.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "horizontal",
            "isOpen",
            "onDisclosureChange",
            "onSelectChange",
            "toggleable",
            "defaultValue"
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js105.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js105.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/listbox/ListboxSUSUD.ts
var import_solid_js106 = require("solid-js");
var import_solid_use57 = require("solid-use");
function ListboxSUSUD(props) {
  const [hovering, setHovering] = (0, import_solid_js106.createSignal)(false);
  const ownerID = (0, import_solid_js106.createUniqueId)();
  const labelID = (0, import_solid_js106.createUniqueId)();
  const buttonID = (0, import_solid_js106.createUniqueId)();
  const optionsID = (0, import_solid_js106.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js106.createComponent)(ListboxContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : Fragment;
        },
        (0, import_solid_js106.mergeProps)(
          (0, import_solid_use57.omitProps)(props, [
            "as",
            "children",
            "disabled",
            "horizontal",
            "defaultOpen",
            "onDisclosureChange",
            "onSelectChange",
            "toggleable",
            "defaultValue"
          ]),
          LISTBOX_TAG,
          {
            "aria-labelledby": labelID
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js106.createComponent)(HeadlessSelectRoot, {
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
                  return (0, import_solid_js106.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
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
        return (0, import_solid_js107.createComponent)(ListboxMUSUD, props);
      }
      return (0, import_solid_js107.createComponent)(ListboxMUSCD, props);
    }
    if (isListboxDisclosureUncontrolled(props)) {
      return (0, import_solid_js107.createComponent)(ListboxMCSUD, props);
    }
    return (0, import_solid_js107.createComponent)(ListboxMCSCD, props);
  }
  if (isListboxSelectUncontrolled(props)) {
    if (isListboxDisclosureUncontrolled(props)) {
      return (0, import_solid_js107.createComponent)(ListboxSUSUD, props);
    }
    return (0, import_solid_js107.createComponent)(ListboxSUSCD, props);
  }
  if (isListboxDisclosureUncontrolled(props)) {
    return (0, import_solid_js107.createComponent)(ListboxSCSUD, props);
  }
  return (0, import_solid_js107.createComponent)(ListboxSCSCD, props);
}

// src/components/listbox/ListboxButton.ts
var import_solid_js108 = require("solid-js");
var import_solid_use58 = require("solid-use");
function ListboxButton(props) {
  const context = useListboxContext("ListboxButton");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js108.createSignal)();
  (0, import_solid_js108.createEffect)(() => {
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
              properties.setState(!properties.isOpen());
              break;
            default:
              break;
          }
        }
      };
      ref.addEventListener("click", toggle);
      ref.addEventListener("keydown", onKeyDown);
      (0, import_solid_js108.onCleanup)(() => {
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
      (0, import_solid_js108.onCleanup)(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return (0, import_solid_js108.createComponent)(Button, (0, import_solid_js108.mergeProps)(
    (0, import_solid_use58.omitProps)(props, [
      "children",
      "ref"
    ]),
    LISTBOX_BUTTON_TAG,
    {
      id: context.buttonID,
      "aria-haspopup": "listbox",
      "aria-controls": context.optionsID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
        if (e instanceof HTMLElement) {
          context.anchor = e;
        }
      })
    },
    createDisabled(() => {
      const internalDisabled = properties.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => properties.isOpen()),
    createHeadlessDisclosureChildProps(props)
  ));
}

// src/components/listbox/ListboxLabel.ts
var import_solid_js109 = require("solid-js");
var import_solid_use59 = require("solid-use");
function ListboxLabel(props) {
  const context = useListboxContext("ListboxLabel");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "label";
    },
    (0, import_solid_js109.mergeProps)(
      (0, import_solid_use59.omitProps)(props, [
        "as",
        "children"
      ]),
      LISTBOX_LABEL_TAG,
      {
        id: context.labelID
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/listbox/ListboxOption.ts
var import_solid_js111 = require("solid-js");
var import_solid_use60 = require("solid-use");

// src/components/listbox/ListboxOptionsContext.ts
var import_solid_js110 = require("solid-js");
var ListboxOptionsContext = (0, import_solid_js110.createContext)();
function useListboxOptionsContext(componentName) {
  const context = (0, import_solid_js110.useContext)(ListboxOptionsContext);
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
  const [internalRef, setInternalRef] = (0, import_solid_js111.createSignal)();
  let characters = "";
  let timeout;
  (0, import_solid_js111.onCleanup)(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };
  (0, import_solid_js111.createEffect)(() => {
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
              (0, import_solid_js111.batch)(() => {
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
          (0, import_solid_js111.batch)(() => {
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
      (0, import_solid_js111.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  (0, import_solid_js111.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (disclosure.isOpen() && (0, import_solid_js111.untrack)(() => properties.isSelected(props.value)) && !isDisabled()) {
        ref.focus();
      }
    }
  });
  return (0, import_solid_js111.createComponent)(Button, (0, import_solid_js111.mergeProps)(
    (0, import_solid_use60.omitProps)(props, [
      "as",
      "children",
      "value",
      "ref"
    ]),
    LISTBOX_OPTION_TAG,
    createOwnerAttribute(context.getId()),
    {
      role: "option",
      tabindex: -1,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
      get as() {
        var _a;
        return (_a = props.as) != null ? _a : "li";
      }
    },
    createDisabled(isDisabled),
    createSelected(() => properties.isSelected(props.value)),
    createActive(() => properties.isActive(props.value)),
    createHeadlessSelectOptionProps(props)
  ));
}

// src/components/listbox/ListboxOptions.ts
var import_solid_js112 = require("solid-js");
var import_solid_use61 = require("solid-use");
function ListboxOptions(props) {
  const context = useListboxContext("ListboxOptions");
  const selectProperties = useHeadlessSelectProperties();
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js112.createSignal)();
  const controller = createListboxOptionsFocusNavigator(context.optionsID);
  (0, import_solid_js112.createEffect)(() => {
    if (!selectProperties.hasSelected()) {
      controller.setFirstChecked();
    }
  });
  (0, import_solid_js112.createEffect)(() => {
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
      (0, import_solid_js112.onCleanup)(() => {
        ref.removeEventListener("focusout", onBlur);
      });
    }
  });
  return (0, import_solid_js112.createComponent)(ListboxOptionsContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "ul";
        },
        (0, import_solid_js112.mergeProps)(
          (0, import_solid_use61.omitProps)(props, [
            "as",
            "children",
            "ref"
          ]),
          LISTBOX_OPTIONS_TAG,
          {
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
          },
          createDisabled(() => {
            const internalDisabled = properties.disabled();
            const granularDisabled = props.disabled;
            return internalDisabled || granularDisabled;
          }),
          createHeadlessSelectChild(props)
        )
      );
    }
  });
}

// src/components/menu/Menu.ts
var import_solid_js114 = require("solid-js");
var import_solid_use62 = require("solid-use");

// src/components/menu/MenuContext.ts
var import_solid_js113 = require("solid-js");
var MenuContext = (0, import_solid_js113.createContext)();
function useMenuContext(componentName) {
  const context = (0, import_solid_js113.useContext)(MenuContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Menu>`);
}
function createMenuItemFocusNavigator() {
  return new FocusNavigator((0, import_solid_js113.createUniqueId)());
}

// src/components/menu/tags.ts
var MENU_TAG = createTag("menu");
var MENU_ITEM_TAG = createTag("menu-item");

// src/components/menu/Menu.ts
function Menu(props) {
  const controller = createMenuItemFocusNavigator();
  return (0, import_solid_js114.createComponent)(MenuContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js114.mergeProps)(
          (0, import_solid_use62.omitProps)(props, ["as", "ref"]),
          MENU_TAG,
          {
            id: controller.getId(),
            role: "menu",
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          }
        )
      );
    }
  });
}

// src/components/menu/MenuItem.ts
var import_solid_js116 = require("solid-js");
var import_solid_use63 = require("solid-use");

// src/components/menu/MenuChild.ts
var import_solid_js115 = require("solid-js");
function isMenuChildRenderProp(children) {
  return typeof children === "function" && children.length > 0;
}
function MenuChild(props) {
  return (0, import_solid_js115.createMemo)(() => {
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
  const [internalRef, setInternalRef] = (0, import_solid_js116.createSignal)();
  let characters = "";
  let timeout;
  (0, import_solid_js116.onCleanup)(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  (0, import_solid_js116.createEffect)(() => {
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
      (0, import_solid_js116.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js116.mergeProps)(
      (0, import_solid_use63.omitProps)(props, [
        "as",
        "disabled",
        "ref",
        "children"
      ]),
      MENU_ITEM_TAG,
      createOwnerAttribute(context.getId()),
      {
        role: "menuitem",
        tabindex: -1,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createDisabled(() => props.disabled),
      {
        get children() {
          return (0, import_solid_js116.createComponent)(MenuChild, {
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            }
          });
        }
      }
    )
  );
}

// src/components/popover/Popover.ts
var import_solid_js120 = require("solid-js");

// src/components/popover/PopoverControlled.ts
var import_solid_js118 = require("solid-js");
var import_solid_use64 = require("solid-use");

// src/components/popover/PopoverContext.ts
var import_solid_js117 = require("solid-js");
var PopoverContext = (0, import_solid_js117.createContext)();
function usePopoverContext(componentName) {
  const context = (0, import_solid_js117.useContext)(PopoverContext);
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
  const [hovering, setHovering] = (0, import_solid_js118.createSignal)(false);
  const ownerID = (0, import_solid_js118.createUniqueId)();
  const buttonID = (0, import_solid_js118.createUniqueId)();
  const panelID = (0, import_solid_js118.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js118.createComponent)(PopoverContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js118.mergeProps)(
          (0, import_solid_use64.omitProps)(props, [
            "isOpen",
            "as",
            "children",
            "disabled",
            "onChange"
          ]),
          POPOVER_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js118.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/popover/PopoverUncontrolled.ts
var import_solid_js119 = require("solid-js");
var import_solid_use65 = require("solid-use");
function PopoverUncontrolled(props) {
  const [hovering, setHovering] = (0, import_solid_js119.createSignal)(false);
  const ownerID = (0, import_solid_js119.createUniqueId)();
  const buttonID = (0, import_solid_js119.createUniqueId)();
  const panelID = (0, import_solid_js119.createUniqueId)();
  const fsp = useFocusStartPoint();
  return (0, import_solid_js119.createComponent)(PopoverContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js119.mergeProps)(
          (0, import_solid_use65.omitProps)(props, [
            "defaultOpen",
            "as",
            "children",
            "disabled",
            "onChange"
          ]),
          POPOVER_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js119.createComponent)(HeadlessDisclosureRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/popover/Popover.ts
function isPopoverUncontrolled(props) {
  return "defaultOpen" in props;
}
function Popover(props) {
  if (isPopoverUncontrolled(props)) {
    return (0, import_solid_js120.createComponent)(PopoverUncontrolled, props);
  }
  return (0, import_solid_js120.createComponent)(PopoverControlled, props);
}

// src/components/popover/PopoverButton.ts
var import_solid_js121 = require("solid-js");
var import_solid_use66 = require("solid-use");
function PopoverButton(props) {
  const context = usePopoverContext("PopoverButton");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js121.createSignal)();
  (0, import_solid_js121.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };
      ref.addEventListener("click", toggle);
      (0, import_solid_js121.onCleanup)(() => {
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
      (0, import_solid_js121.onCleanup)(() => {
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return (0, import_solid_js121.createComponent)(Button, (0, import_solid_js121.mergeProps)(
    (0, import_solid_use66.omitProps)(props, [
      "children",
      "ref"
    ]),
    POPOVER_BUTTON_TAG,
    {
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
    },
    createDisabled(() => {
      const internalDisabled = properties.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => properties.isOpen()),
    createHeadlessDisclosureChildProps(props)
  ));
}

// src/components/popover/PopoverOverlay.tsx
var import_solid_js122 = require("solid-js");
var import_solid_use67 = require("solid-use");
function PopoverOverlay(props) {
  usePopoverContext("PopoverOverlay");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js122.createSignal)();
  (0, import_solid_js122.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js122.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js122.mergeProps)(
      (0, import_solid_use67.omitProps)(props, [
        "as",
        "children",
        "ref"
      ]),
      POPOVER_OVERLAY_TAG,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        })
      },
      createHeadlessDisclosureChildProps(props)
    )
  );
}

// src/components/popover/PopoverPanel.ts
var import_solid_js123 = require("solid-js");
var import_solid_use68 = require("solid-use");
function PopoverPanel(props) {
  const context = usePopoverContext("PopoverPanel");
  const properties = useHeadlessDisclosureProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js123.createSignal)();
  (0, import_solid_js123.createEffect)(() => {
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
        (0, import_solid_js123.onCleanup)(() => {
          ref.removeEventListener("keydown", onKeyDown);
          ref.removeEventListener("focusout", onBlur);
        });
      }
    }
  });
  return createUnmountable(
    props,
    () => properties.isOpen(),
    () => createDynamic(
      () => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      },
      (0, import_solid_js123.mergeProps)(
        (0, import_solid_use68.omitProps)(props, [
          "as",
          "unmount",
          "children",
          "ref"
        ]),
        POPOVER_PANEL_TAG,
        {
          id: context.panelID,
          ref: createRef(props, (e) => {
            setInternalRef(() => e);
          })
        },
        createHeadlessDisclosureChildProps(props)
      )
    )
  );
}

// src/components/radio-group/RadioGroup.ts
var import_solid_js128 = require("solid-js");

// src/components/radio-group/RadioGroupControlled.ts
var import_solid_js126 = require("solid-js");
var import_web3 = require("solid-js/web");
var import_solid_use69 = require("solid-use");

// src/components/radio-group/RadioGroupContext.ts
var import_solid_js124 = require("solid-js");
var RadioGroupContext = (0, import_solid_js124.createContext)();
function useRadioGroupContext(componentName) {
  const context = (0, import_solid_js124.useContext)(RadioGroupContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`);
}

// src/components/radio-group/RadioGroupRootContext.ts
var import_solid_js125 = require("solid-js");
var RadioGroupRootContext = (0, import_solid_js125.createContext)();
function useRadioGroupRootContext(componentName) {
  const context = (0, import_solid_js125.useContext)(RadioGroupRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}
function createRadioGroupOptionFocusNavigator() {
  return new FocusNavigator((0, import_solid_js125.createUniqueId)());
}

// src/components/radio-group/tags.ts
var RADIO_GROUP_TAG = createTag("radio-group");
var RADIO_GROUP_DESCRIPTION_TAG = createTag("radio-group-description");
var RADIO_GROUP_LABEL_TAG = createTag("radio-group-label");
var RADIO_GROUP_OPTION_TAG = createTag("radio-group-option");

// src/components/radio-group/RadioGroupControlled.ts
function RadioGroupControlled(props) {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = (0, import_solid_js126.createUniqueId)();
  const labelID = (0, import_solid_js126.createUniqueId)();
  return (0, import_web3.createComponent)(RadioGroupRootContext.Provider, {
    value: controller,
    get children() {
      return (0, import_web3.createComponent)(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID
        },
        get children() {
          return createDynamic(
            () => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            },
            (0, import_solid_js126.mergeProps)(
              (0, import_solid_use69.omitProps)(props, [
                "as",
                "children",
                "value",
                "disabled",
                "onChange",
                "ref"
              ]),
              RADIO_GROUP_TAG,
              {
                role: "radiogroup",
                "aria-labelledby": labelID,
                "aria-describedby": descriptionID,
                ref: createRef(props, (e) => {
                  controller.setRef(e);
                })
              },
              createDisabled(() => props.disabled),
              createHeadlessSelectRootSingleControlledProps(props)
            )
          );
        }
      });
    }
  });
}

// src/components/radio-group/RadioGroupUncontrolled.ts
var import_solid_js127 = require("solid-js");
var import_web4 = require("solid-js/web");
var import_solid_use70 = require("solid-use");
function RadioGroupUncontrolled(props) {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = (0, import_solid_js127.createUniqueId)();
  const labelID = (0, import_solid_js127.createUniqueId)();
  return (0, import_web4.createComponent)(RadioGroupRootContext.Provider, {
    value: controller,
    get children() {
      return (0, import_web4.createComponent)(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID
        },
        get children() {
          return createDynamic(
            () => {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            },
            (0, import_solid_js127.mergeProps)(
              (0, import_solid_use70.omitProps)(props, [
                "as",
                "children",
                "defaultValue",
                "disabled",
                "onChange",
                "ref"
              ]),
              RADIO_GROUP_TAG,
              {
                role: "radiogroup",
                "aria-labelledby": labelID,
                "aria-describedby": descriptionID,
                ref: createRef(props, (e) => {
                  controller.setRef(e);
                })
              },
              createDisabled(() => props.disabled),
              createHeadlessSelectRootSingleUncontrolledProps(props)
            )
          );
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
    return (0, import_solid_js128.createComponent)(RadioGroupUncontrolled, props);
  }
  return (0, import_solid_js128.createComponent)(RadioGroupControlled, props);
}

// src/components/radio-group/RadioGroupDescription.ts
var import_solid_js129 = require("solid-js");
var import_solid_use71 = require("solid-use");
function RadioGroupDescription(props) {
  const context = useRadioGroupContext("RadioGroupDescription");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js129.mergeProps)(
      (0, import_solid_use71.omitProps)(props, ["as"]),
      RADIO_GROUP_DESCRIPTION_TAG,
      {
        id: context.descriptionID
      }
    )
  );
}

// src/components/radio-group/RadioGroupLabel.ts
var import_solid_js130 = require("solid-js");
var import_solid_use72 = require("solid-use");
function RadioGroupLabel(props) {
  const context = useRadioGroupContext("RadioGroupLabel");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "label";
    },
    (0, import_solid_js130.mergeProps)(
      (0, import_solid_use72.omitProps)(props, ["as"]),
      RADIO_GROUP_LABEL_TAG,
      {
        id: context.labelID
      }
    )
  );
}

// src/components/radio-group/RadioGroupOption.ts
var import_solid_js131 = require("solid-js");
var import_solid_use73 = require("solid-use");
function RadioGroupOption(props) {
  const context = useRadioGroupRootContext("RadioGroupOption");
  const properties = useHeadlessSelectProperties();
  const descriptionID = (0, import_solid_js131.createUniqueId)();
  const labelID = (0, import_solid_js131.createUniqueId)();
  const [internalRef, setInternalRef] = (0, import_solid_js131.createSignal)();
  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };
  (0, import_solid_js131.createEffect)(() => {
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
      (0, import_solid_js131.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return (0, import_solid_js131.createComponent)(RadioGroupContext.Provider, {
    value: { descriptionID, labelID },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js131.mergeProps)(
          (0, import_solid_use73.omitProps)(props, [
            "as",
            "children",
            "value",
            "disabled",
            "ref"
          ]),
          RADIO_GROUP_OPTION_TAG,
          createOwnerAttribute(context.getId()),
          {
            role: "radio",
            "aria-labelledby": labelID,
            "aria-describedby": descriptionID,
            ref: createRef(props, (e) => {
              setInternalRef(() => e);
            }),
            get tabindex() {
              const selected = properties.isSelected(props.value);
              return isDisabled() || !selected ? -1 : 0;
            }
          },
          createDisabled(isDisabled),
          createChecked(() => properties.isSelected(props.value)),
          createActive(() => properties.isActive(props.value)),
          createHeadlessSelectOptionProps(props)
        )
      );
    }
  });
}

// src/components/select/Select.ts
var import_solid_js137 = require("solid-js");

// src/components/select/SelectMultipleControlled.ts
var import_solid_js133 = require("solid-js");
var import_solid_use74 = require("solid-use");

// src/components/select/SelectContext.ts
var import_solid_js132 = require("solid-js");
var SelectContext = (0, import_solid_js132.createContext)();
function useSelectContext(componentName) {
  const context = (0, import_solid_js132.useContext)(SelectContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}
function createSelectOptionFocusNavigator() {
  return new FocusNavigator((0, import_solid_js132.createUniqueId)());
}

// src/components/select/tags.ts
var SELECT_TAG = createTag("select");
var SELECT_OPTION_TAG = createTag("select-option");

// src/components/select/SelectMultipleControlled.ts
function SelectMultipleControlled(props) {
  const controller = createSelectOptionFocusNavigator();
  return (0, import_solid_js133.createComponent)(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "ul";
        },
        (0, import_solid_js133.mergeProps)(
          (0, import_solid_use74.omitProps)(props, [
            "as",
            "children",
            "toggleable",
            "value",
            "onChange",
            "multiple",
            "horizontal",
            "disabled",
            "ref"
          ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: "listbox",
            "aria-multiselectable": true,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get "aria-orientation"() {
              return props.horizontal ? "horizontal" : "vertical";
            }
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js133.createComponent)(HeadlessSelectRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/select/SelectMultipleUncontrolled.ts
var import_solid_js134 = require("solid-js");
var import_solid_use75 = require("solid-use");
function SelectMultipleUncontrolled(props) {
  const controller = createSelectOptionFocusNavigator();
  return (0, import_solid_js134.createComponent)(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "ul";
        },
        (0, import_solid_js134.mergeProps)(
          (0, import_solid_use75.omitProps)(props, [
            "as",
            "children",
            "toggleable",
            "defaultValue",
            "onChange",
            "multiple",
            "horizontal",
            "disabled",
            "ref"
          ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: "listbox",
            "aria-multiselectable": true,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get "aria-orientation"() {
              return props.horizontal ? "horizontal" : "vertical";
            }
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js134.createComponent)(HeadlessSelectRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/select/SelectSingleControlled.ts
var import_solid_js135 = require("solid-js");
var import_solid_use76 = require("solid-use");
function SelectSingleControlled(props) {
  const controller = createSelectOptionFocusNavigator();
  return (0, import_solid_js135.createComponent)(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "ul";
        },
        (0, import_solid_js135.mergeProps)(
          (0, import_solid_use76.omitProps)(props, [
            "as",
            "children",
            "toggleable",
            "value",
            "onChange",
            "horizontal",
            "disabled",
            "ref"
          ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: "listbox",
            "aria-multiselectable": false,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get "aria-orientation"() {
              return props.horizontal ? "horizontal" : "vertical";
            }
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js135.createComponent)(HeadlessSelectRoot, {
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
          }
        )
      );
    }
  });
}

// src/components/select/SelectSingleUncontrolled.ts
var import_solid_js136 = require("solid-js");
var import_solid_use77 = require("solid-use");
function SelectSingleUncontrolled(props) {
  const controller = createSelectOptionFocusNavigator();
  return (0, import_solid_js136.createComponent)(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      }
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "ul";
        },
        (0, import_solid_js136.mergeProps)(
          (0, import_solid_use77.omitProps)(props, [
            "as",
            "children",
            "toggleable",
            "defaultValue",
            "onChange",
            "horizontal",
            "disabled",
            "ref"
          ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: "listbox",
            "aria-multiselectable": false,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get "aria-orientation"() {
              return props.horizontal ? "horizontal" : "vertical";
            }
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return (0, import_solid_js136.createComponent)(HeadlessSelectRoot, {
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
          }
        )
      );
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
      return (0, import_solid_js137.createComponent)(SelectMultipleUncontrolled, props);
    }
    return (0, import_solid_js137.createComponent)(SelectSingleUncontrolled, props);
  }
  if (isSelectMultiple(props)) {
    return (0, import_solid_js137.createComponent)(SelectMultipleControlled, props);
  }
  return (0, import_solid_js137.createComponent)(SelectSingleControlled, props);
}

// src/components/select/SelectOption.ts
var import_solid_js138 = require("solid-js");
var import_solid_use78 = require("solid-use");
function SelectOption(props) {
  const context = useSelectContext("Select");
  const properties = useHeadlessSelectProperties();
  const [internalRef, setInternalRef] = (0, import_solid_js138.createSignal)();
  let characters = "";
  let timeout;
  (0, import_solid_js138.onCleanup)(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  (0, import_solid_js138.createEffect)(() => {
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
      (0, import_solid_js138.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      });
    }
  });
  return (0, import_solid_js138.createComponent)(Button, (0, import_solid_js138.mergeProps)(
    {
      get as() {
        var _a;
        return (_a = props.as) != null ? _a : "li";
      }
    },
    (0, import_solid_use78.omitProps)(props, [
      "as",
      "children",
      "value",
      "ref"
    ]),
    SELECT_OPTION_TAG,
    createOwnerAttribute(context.controller.getId()),
    {
      role: "option",
      tabindex: -1,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      })
    },
    createDisabled(() => props.disabled),
    createSelected(() => properties.isSelected(props.value)),
    createActive(() => properties.isActive(props.value)),
    createHeadlessSelectOptionProps(props)
  ));
}

// src/components/tabs/Tab.ts
var import_solid_js141 = require("solid-js");
var import_solid_use79 = require("solid-use");

// src/components/tabs/TabGroupContext.ts
var import_solid_js139 = require("solid-js");
var TabGroupContext = (0, import_solid_js139.createContext)();
function useTabGroupContext(componentName) {
  const context = (0, import_solid_js139.useContext)(TabGroupContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TabGroup>`);
}

// src/components/tabs/TabListContext.ts
var import_solid_js140 = require("solid-js");
var TabListContext = (0, import_solid_js140.createContext)();
function useTabListContext(componentName) {
  const context = (0, import_solid_js140.useContext)(TabListContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TabList>`);
}
function createTabFocusNavigator() {
  return new FocusNavigator((0, import_solid_js140.createUniqueId)());
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
  const [internalRef, setInternalRef] = (0, import_solid_js141.createSignal)();
  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };
  (0, import_solid_js141.createEffect)(() => {
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
      (0, import_solid_js141.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("click", onClick);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("blur", onBlur);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js141.mergeProps)(
      (0, import_solid_use79.omitProps)(props, [
        "as",
        "children",
        "value",
        "disabled",
        "ref"
      ]),
      TAB_TAG,
      createOwnerAttribute(listContext.getId()),
      {
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
          return isDisabled() || !selected ? -1 : 0;
        }
      },
      createDisabled(isDisabled),
      createSelected(() => properties.isSelected(props.value)),
      createActive(() => properties.isActive(props.value)),
      createHeadlessSelectOptionProps(props)
    )
  );
}

// src/components/tabs/TabGroup.ts
var import_solid_js144 = require("solid-js");

// src/components/tabs/TabGroupControlled.ts
var import_solid_js142 = require("solid-js");
var import_solid_use80 = require("solid-use");
function TabGroupControlled(props) {
  const ownerID = (0, import_solid_js142.createUniqueId)();
  let id = 0;
  const ids = /* @__PURE__ */ new Map();
  return (0, import_solid_js142.createComponent)(TabGroupContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js142.mergeProps)(
          (0, import_solid_use80.omitProps)(props, [
            "as",
            "children",
            "value",
            "disabled",
            "onChange",
            "ref"
          ]),
          TAB_GROUP_TAG,
          createDisabled(() => props.disabled),
          createHeadlessSelectRootSingleControlledProps(props)
        )
      );
    }
  });
}

// src/components/tabs/TabGroupUncontrolled.ts
var import_solid_js143 = require("solid-js");
var import_solid_use81 = require("solid-use");
function TabGroupUncontrolled(props) {
  const ownerID = (0, import_solid_js143.createUniqueId)();
  let id = 0;
  const ids = /* @__PURE__ */ new Map();
  return (0, import_solid_js143.createComponent)(TabGroupContext.Provider, {
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
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js143.mergeProps)(
          (0, import_solid_use81.omitProps)(props, [
            "as",
            "children",
            "defaultValue",
            "disabled",
            "onChange",
            "ref"
          ]),
          TAB_GROUP_TAG,
          createDisabled(() => props.disabled),
          createHeadlessSelectRootSingleUncontrolledProps(props)
        )
      );
    }
  });
}

// src/components/tabs/TabGroup.ts
function isTabGroupUncontrolled(props) {
  return "defaultValue" in props;
}
function TabGroup(props) {
  if (isTabGroupUncontrolled(props)) {
    return (0, import_solid_js144.createComponent)(TabGroupUncontrolled, props);
  }
  return (0, import_solid_js144.createComponent)(TabGroupControlled, props);
}

// src/components/tabs/TabList.ts
var import_solid_js145 = require("solid-js");
var import_solid_use82 = require("solid-use");
function TabList(props) {
  const rootContext = useTabGroupContext("TabList");
  const controller = createTabFocusNavigator();
  return (0, import_solid_js145.createComponent)(TabListContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js145.mergeProps)(
          (0, import_solid_use82.omitProps)(props, ["as", "ref", "children"]),
          TAB_LIST_TAG,
          {
            role: "tablist",
            get "aria-orientation"() {
              return rootContext.horizontal ? "horizontal" : "vertical";
            },
            ref: createRef(props, (e) => {
              controller.setRef(e);
            })
          },
          createHeadlessSelectChild(props)
        )
      );
    }
  });
}

// src/components/tabs/TabPanel.ts
var import_solid_js146 = require("solid-js");
var import_solid_use83 = require("solid-use");
function TabPanel(props) {
  const rootContext = useTabGroupContext("TabPanel");
  const properties = useHeadlessSelectProperties();
  return createUnmountable(
    props,
    () => properties.isSelected(props.value),
    () => createDynamic(
      () => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      },
      (0, import_solid_js146.mergeProps)(
        (0, import_solid_use83.omitProps)(props, ["as", "children", "disabled", "unmount", "value"]),
        TAB_PANEL_TAG,
        {
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
        },
        createHeadlessSelectOptionProps(props)
      )
    )
  );
}

// src/components/toast/Toast.ts
var import_solid_js148 = require("solid-js");
var import_solid_use84 = require("solid-use");

// src/components/toast/tags.ts
var TOAST_TAG = createTag("toast");
var TOASTER_TAG = createTag("toaster");

// src/components/toast/ToastContext.ts
var import_solid_js147 = require("solid-js");
var ToastContext = (0, import_solid_js147.createContext)();
function useToastContext(componentName) {
  const context = (0, import_solid_js147.useContext)(ToastContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Toaster>`);
}

// src/components/toast/Toast.ts
function Toast(props) {
  useToastContext("Toast");
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js148.mergeProps)(
      (0, import_solid_use84.omitProps)(props, [
        "as"
      ]),
      TOAST_TAG,
      {
        role: "status",
        "aria-live": "polite"
      }
    )
  );
}

// src/components/toast/Toaster.ts
var import_solid_js149 = require("solid-js");
var import_solid_use85 = require("solid-use");
function Toaster(props) {
  const ownerID = (0, import_solid_js149.createUniqueId)();
  return (0, import_solid_js149.createComponent)(ToastContext.Provider, {
    value: {
      ownerID
    },
    get children() {
      return createDynamic(
        () => {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        },
        (0, import_solid_js149.mergeProps)(
          (0, import_solid_use85.omitProps)(props, [
            "as"
          ]),
          TOASTER_TAG
        )
      );
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
var import_solid_js150 = require("solid-js");
function useToaster(toaster) {
  const [signal, setSignal] = (0, import_solid_js150.createSignal)(toaster.getQueue());
  (0, import_solid_js150.createEffect)(() => {
    (0, import_solid_js150.onCleanup)(toaster.subscribe(setSignal));
  });
  return signal;
}

// src/components/toggle/index.ts
var import_solid_js153 = require("solid-js");

// src/components/toggle/ToggleControlled.ts
var import_solid_js151 = require("solid-js");
var import_solid_use86 = require("solid-use");

// src/components/toggle/tags.ts
var TOGGLE_TAG = createTag("toggle");

// src/components/toggle/ToggleControlled.ts
function ToggleControlled(props) {
  const [internalRef, setInternalRef] = (0, import_solid_js151.createSignal)();
  (0, import_solid_js151.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, !props.pressed);
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js151.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return (0, import_solid_js151.createComponent)(Button, (0, import_solid_js151.mergeProps)(
    (0, import_solid_use86.omitProps)(props, [
      "onChange",
      "pressed",
      "ref"
    ]),
    TOGGLE_TAG,
    {
      get "aria-pressed"() {
        return props.pressed;
      },
      get "data-sh-pressed"() {
        return props.pressed;
      },
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      })
    }
  ));
}

// src/components/toggle/ToggleUncontrolled.ts
var import_solid_js152 = require("solid-js");
var import_solid_use87 = require("solid-use");
function ToggleUncontrolled(props) {
  const [state, setState] = (0, import_solid_js152.createSignal)(!!props.defaultPressed);
  const [internalRef, setInternalRef] = (0, import_solid_js152.createSignal)();
  (0, import_solid_js152.createEffect)(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        const current = !(0, import_solid_js152.untrack)(state);
        (0, import_solid_js152.batch)(() => {
          var _a;
          setState(current);
          (_a = props.onChange) == null ? void 0 : _a.call(props, current);
        });
      };
      ref.addEventListener("click", onClick);
      (0, import_solid_js152.onCleanup)(() => {
        ref.removeEventListener("click", onClick);
      });
    }
  });
  return (0, import_solid_js152.createComponent)(Button, (0, import_solid_js152.mergeProps)(
    (0, import_solid_use87.omitProps)(props, [
      "onChange",
      "defaultPressed",
      "ref"
    ]),
    TOGGLE_TAG,
    {
      get "aria-pressed"() {
        return state();
      },
      get "data-sh-pressed"() {
        return state();
      },
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      })
    }
  ));
}

// src/components/toggle/index.ts
function isToggleUncontrolled(props) {
  return "defaultPressed" in props;
}
function Toggle(props) {
  if (isToggleUncontrolled(props)) {
    return (0, import_solid_js153.createComponent)(ToggleUncontrolled, props);
  }
  return (0, import_solid_js153.createComponent)(ToggleControlled, props);
}

// src/components/toolbar/index.ts
var import_solid_js154 = require("solid-js");
var import_solid_use88 = require("solid-use");
var TOOLBAR_TAG = createTag("toolbar");
function Toolbar(props) {
  const isHorizontal = () => {
    var _a;
    return (_a = props.horizontal) != null ? _a : true;
  };
  const [internalRef, setInternalRef] = (0, import_solid_js154.createSignal)();
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
  (0, import_solid_js154.createEffect)(() => {
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
      (0, import_solid_js154.onCleanup)(() => {
        ref.removeEventListener("keydown", onKeyDown);
        ref.removeEventListener("focus", onFocus);
        ref.removeEventListener("focusin", onFocusIn);
      });
    }
  });
  return createDynamic(
    () => {
      var _a;
      return (_a = props.as) != null ? _a : "div";
    },
    (0, import_solid_js154.mergeProps)(
      (0, import_solid_use88.omitProps)(props, [
        "as",
        "horizontal",
        "ref"
      ]),
      TOOLBAR_TAG,
      {
        role: "toolbar",
        tabindex: 0,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
        get "aria-orientation"() {
          return isHorizontal() ? "horizontal" : "vertical";
        }
      }
    )
  );
}

// src/components/transition/index.ts
var import_solid_js155 = require("solid-js");
var import_solid_use89 = require("solid-use");
var TransitionRootContext = (0, import_solid_js155.createContext)();
function useTransitionRootContext(componentName) {
  const context = (0, import_solid_js155.useContext)(TransitionRootContext);
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
  const [visible, setVisible] = (0, import_solid_js155.createSignal)(values.show);
  const [ref, setRef] = (0, import_solid_js155.createSignal)();
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
  (0, import_solid_js155.createEffect)(() => {
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
  return createUnmountable(
    props,
    visible,
    () => createDynamic(
      () => {
        var _a;
        return (_a = props.as) != null ? _a : "div";
      },
      (0, import_solid_js155.mergeProps)(
        (0, import_solid_use89.omitProps)(props, [
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
        ]),
        {
          ref: createRef(props, (e) => {
            setRef(() => e);
          })
        }
      )
    )
  );
}
function Transition(props) {
  const [local, others] = (0, import_solid_js155.splitProps)(props, [
    "show"
  ]);
  return (0, import_solid_js155.createComponent)(TransitionRootContext.Provider, {
    value: local,
    get children() {
      return (0, import_solid_js155.createComponent)(TransitionChild, others);
    }
  });
}
//# sourceMappingURL=index.cjs.map
