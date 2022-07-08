import {
  Accessor,
  createContext,
  createMemo,
  createSignal,
  JSX,
  untrack,
  useContext,
} from 'solid-js';
import { Ref } from '../utils/types';

export interface HeadlessSelectMultipleControlledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  value: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

export interface HeadlessSelectMultipleUncontrolledOptions<T> {
  multiple: true;
  toggleable?: boolean;
  defaultValue: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

export type HeadlessSelectMultipleOptions<T> =
  | HeadlessSelectMultipleControlledOptions<T>
  | HeadlessSelectMultipleUncontrolledOptions<T>;

export interface HeadlessSelectSingleControlledOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  value: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
}

export interface HeadlessSelectSingleUncontrolledOptions<T> {
  multiple?: false;
  toggleable?: boolean;
  defaultValue: T;
  onChange?: (value?: T) => void;
  disabled?: boolean;
}

export type HeadlessSelectSingleOptions<T> =
  | HeadlessSelectSingleControlledOptions<T>
  | HeadlessSelectSingleUncontrolledOptions<T>;

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

function useHeadlessSelectSingle<T>(
  options: HeadlessSelectSingleOptions<T>,
): HeadlessSelectProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValue: Accessor<T | undefined>;
  let setSelectedValue: (value: T | undefined) => void;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T | undefined>(options.defaultValue);
    selectedValue = selected;
    setSelectedValue = (value) => {
      setSelected(() => value);
      options.onChange?.(value);
    };
  } else {
    selectedValue = () => options.value;
    setSelectedValue = (value) => options.onChange?.(value);
  }

  return {
    isSelected(value) {
      return Object.is(value, selectedValue());
    },
    select(value) {
      if (options.toggleable && Object.is(untrack(selectedValue), value)) {
        setSelectedValue(undefined);
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
        value,
      });
    },
    blur() {
      return setActive(undefined);
    },
  };
}

function useHeadlessSelectMultiple<T>(
  options: HeadlessSelectMultipleOptions<T>,
): HeadlessSelectProperties<T> {
  const [active, setActive] = createSignal<Ref<T>>();

  let selectedValues: Accessor<T[]>;
  let setSelectedValues: (value: T[]) => void;

  if ('defaultValue' in options) {
    const [selected, setSelected] = createSignal<T[]>(options.defaultValue);
    selectedValues = selected;
    setSelectedValues = (value) => {
      setSelected(() => value);
      options.onChange?.(value);
    };
  } else {
    selectedValues = () => options.value;
    setSelectedValues = (value) => options.onChange?.(value);
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
        ...set,
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

export function useHeadlessSelect<T>(
  options: HeadlessSelectOptions<T>,
): HeadlessSelectProperties<T> {
  if (options.multiple) {
    return useHeadlessSelectMultiple(options);
  }

  return useHeadlessSelectSingle(options);
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
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessSelectChildRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
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
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessSelectOptionRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}
