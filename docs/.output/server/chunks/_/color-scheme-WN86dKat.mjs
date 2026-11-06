import { u as useEventListener, f as assert } from '../routes/_..._.mjs';
import { createSignal, createMemo, createEffect, onSettled, createContext, useContext } from 'solid-js';

var MEDIA = /* @__PURE__ */ new Map();
function getMediaMatcher(query) {
  const media = MEDIA.get(query);
  if (media) return media;
  const newMedia = window.matchMedia(query);
  MEDIA.set(query, newMedia);
  return newMedia;
}
function useMediaQuery(query) {
  const [state, setState] = createSignal(false, { ownedWrite: true });
  onSettled(() => {
    const media = getMediaMatcher(query);
    const callback = () => {
      setState(media.matches);
    };
    callback();
    media.addEventListener("change", callback, false);
    return () => {
      media.removeEventListener("change", callback, false);
    };
  });
  return state;
}
function usePrefersDark() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
function usePageVisibility() {
  const [state, setState] = createSignal(true, { ownedWrite: true });
  onSettled(() => {
    const callback = () => {
      setState(document.visibilityState === "visible");
    };
    callback();
    document.addEventListener("visibilitychange", callback, false);
    return () => {
      document.removeEventListener("visibilitychange", callback, false);
    };
  });
  return state;
}
var _m$ = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].children;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.value = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var ColorSchemeContext = createContext(null);
var STORAGE_KEY = "theme-preference";
function ColorSchemeProvider(props) {
  let get;
  let set;
  if ("initialValue" in props) {
    const [scheme, setScheme] = createSignal(props.initialValue);
    get = scheme;
    set = (value) => {
      setScheme(value);
      if (props.onChange) props.onChange(value);
    };
  } else {
    get = () => props.value;
    set = (value) => {
      if (props.onChange) props.onChange(value);
    };
  }
  const prefersDark = usePrefersDark();
  const isVisible = usePageVisibility();
  const shouldToggle = createMemo(() => get() === "system" && prefersDark() || get() === "dark");
  createEffect(isVisible, () => {
    const onChange = () => {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value) set(value);
      else set("system");
    };
    onChange();
    return useEventListener(window, "storage", onChange, false);
  });
  createEffect(get, (value) => {
    localStorage.setItem(STORAGE_KEY, value);
  });
  createEffect(shouldToggle, (value) => {
    document.documentElement.classList.toggle("dark", value);
  });
  return ColorSchemeContext(new _P$(props, {
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
  }));
}
function useColorSchemeContext() {
  const ctx = useContext(ColorSchemeContext);
  assert(ctx, /* @__PURE__ */ new Error("Missing <ColorSchemeProvider>"));
  return ctx;
}
function useColorScheme() {
  const ctx = useColorSchemeContext();
  return [() => ctx.value, ctx.setValue];
}
function useNativeColorScheme() {
  const ctx = useColorSchemeContext();
  return () => ctx.native;
}
function usePreferredColorScheme() {
  const ctx = useColorSchemeContext();
  return () => ctx.preferred;
}

export { ColorSchemeProvider as C, usePreferredColorScheme as a, useNativeColorScheme as b, useColorScheme as u };
//# sourceMappingURL=color-scheme-WN86dKat.mjs.map
