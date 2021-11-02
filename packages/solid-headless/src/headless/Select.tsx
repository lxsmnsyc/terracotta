import {
  createContext,
  createSignal,
  JSX,
  untrack,
  useContext,
} from 'solid-js';
import { Ref } from '../utils/types';
import useControlledSignal from '../utils/use-controlled-signal';

export interface HeadlessSelectMultipleOptions<T> {
  multiple: true;
  toggleable?: boolean;
  defaultValue?: T[];
  value?: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  CONTROLLED?: boolean;
}

export interface HeadlessSelectSingleOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  defaultValue?: T;
  value?: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
  CONTROLLED?: boolean;
}

export type HeadlessSelectOptions<T> =
  | HeadlessSelectSingleOptions<T>
  | HeadlessSelectMultipleOptions<T>;

export interface HeadlessSelectProperties<T> {
  isSelected(value: T): boolean;
  select(value: T): void;
  hasSelected(): boolean;
  isActive(value: T): boolean;
  hasActive(): boolean;
  focus(value: T): void;
  blur(): void;
  disabled(): boolean;
}

export function useHeadlessSelect<T>(
  options: HeadlessSelectOptions<T>,
): HeadlessSelectProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  if (options.multiple) {
    const [selectedValues, setSelectedValues] = useControlledSignal(
      options.defaultValue ?? [],
      ('value' in options) ? (() => options.value ?? []) : undefined,
      (value) => options.onChange?.(value ?? []),
    );

    return {
      isSelected(value) {
        return new Set(selectedValues()).has(value);
      },
      select(value) {
        setSelectedValues([
          ...new Set([
            ...untrack(selectedValues),
            value,
          ]),
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
          value,
        });
      },
      blur() {
        return setActive(undefined);
      },
    };
  }

  const [selectedValue, setSelectedValue] = useControlledSignal(
    options.defaultValue ?? undefined,
    (options.CONTROLLED || ('value' in options)) ? (() => options.value) : undefined,
    (value) => options.onChange?.(value),
  );

  return {
    isSelected(value) {
      return Object.is(selectedValue(), value);
    },
    select(value) {
      setSelectedValue(value);
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
        value,
      });
    },
    blur() {
      return setActive(undefined);
    },
  };
}

const HeadlessSelectContext = createContext<HeadlessSelectProperties<any>>();

export type HeadlessSelectRootRenderProp<T> = (
  (properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectRootRenderProp<T>(
  children: HeadlessSelectRootRenderProp<T> | JSX.Element,
): children is HeadlessSelectRootRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export type HeadlessSelectRootProps<T> = {
  children?: HeadlessSelectRootRenderProp<T> | JSX.Element;
} & HeadlessSelectOptions<T>;

export function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element {
  const properties = useHeadlessSelect(props);
  return (
    <HeadlessSelectContext.Provider value={properties}>
      {(() => {
        const body = props.children;
        if (isHeadlessSelectRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      })()}
    </HeadlessSelectContext.Provider>
  );
}

export function useHeadlessSelectChild<T>(): HeadlessSelectProperties<T> {
  const properties = useContext(HeadlessSelectContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessSelectChild` must be used within HeadlessSelectRoot.');
}

export type HeadlessSelectChildRenderProp<T> = (
  (properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectChildRenderProp<T>(
  children: HeadlessSelectChildRenderProp<T> | JSX.Element,
): children is HeadlessSelectChildRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessSelectChildProps<T> {
  children?: HeadlessSelectChildRenderProp<T> | JSX.Element;
}

export function HeadlessSelectChild<T>(props: HeadlessSelectChildProps<T>): JSX.Element {
  const properties = useHeadlessSelectChild<T>();
  const body = props.children;
  if (isHeadlessSelectChildRenderProp(body)) {
    return body(properties);
  }
  return body;
}

export interface HeadlessSelectOptionProperties {
  isSelected(): boolean;
  select(): void;
  isActive(): boolean;
  focus(): void;
  blur(): void;
  disabled(): boolean;
}

export function useHeadlessSelectOption<T>(
  value: () => T,
  disabled?: () => boolean,
): HeadlessSelectOptionProperties {
  const properties = useHeadlessSelectChild<T>();
  const isDisabled = () => disabled?.() || properties.disabled();
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
    disabled: isDisabled,
  };
}

export type HeadlessSelectOptionRenderProp = (
  (properties: HeadlessSelectOptionProperties) => JSX.Element
);

function isHeadlessSelectOptionRenderProp(
  children: HeadlessSelectOptionRenderProp | JSX.Element,
): children is HeadlessSelectOptionRenderProp {
  return typeof children === 'function' && children.length > 0;
}

const HeadlessSelectOptionContext = createContext<HeadlessSelectOptionProperties>();

export interface HeadlessSelectOptionProps<T> {
  value: T;
  disabled?: boolean,
  children?: HeadlessSelectOptionRenderProp | JSX.Element;
}

export function HeadlessSelectOption<T>(
  props: HeadlessSelectOptionProps<T>,
): JSX.Element {
  const properties = useHeadlessSelectOption(
    () => props.value,
    () => !!props.disabled,
  );
  return (
    <HeadlessSelectOptionContext.Provider value={properties}>
      {(() => {
        const body = props.children;
        if (isHeadlessSelectOptionRenderProp(body)) {
          return body(properties);
        }
        return body;
      })()}
    </HeadlessSelectOptionContext.Provider>
  );
}

export function useHeadlessSelectOptionChild(): HeadlessSelectOptionProperties {
  const properties = useContext(HeadlessSelectOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessSelectChild` must be used within HeadlessSelectOption');
}

export interface HeadlessSelectOptionChildProps {
  children?: HeadlessSelectOptionRenderProp | JSX.Element;
}

export function HeadlessSelectOptionChild(
  props: HeadlessSelectOptionChildProps,
): JSX.Element {
  const properties = useHeadlessSelectOptionChild();
  const body = props.children;
  if (isHeadlessSelectOptionRenderProp(body)) {
    return body(properties);
  }
  return body;
}
