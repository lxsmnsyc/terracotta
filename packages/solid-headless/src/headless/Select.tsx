import {
  createContext,
  createEffect,
  createSignal,
  JSX,
  on,
  useContext,
} from 'solid-js';

export interface HeadlessSelectOptions<T> {
  type: 'single' | 'multiple';
  value: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export type HeadlessSelectProperties<T> = [
  (value: T) => boolean,
  (selectedValue: T) => void,
  () => boolean,
];

export function useHeadlessSelect<T>(
  options: HeadlessSelectOptions<T>,
): HeadlessSelectProperties<T> {
  const selectedValues = new Set();
  const [track, updateTrack] = createSignal(0);

  function isSelected(value: T): boolean {
    track();
    return selectedValues.has(value);
  }

  function select(value: T) {
    if (!options.disabled) {
      if (selectedValues.has(value)) {
        selectedValues.delete(value);
      } else {
        options.onChange?.(value);
        if (options.type !== 'multiple') {
          selectedValues.clear();
        }
        selectedValues.add(value);
      }
      updateTrack((current) => current + 1);
    }
  }

  createEffect(on(() => options.value, (current) => {
    select(current);
  }));

  return [
    isSelected,
    select,
    () => !!options.disabled,
  ];
}

const HeadlessSelectContext = createContext<HeadlessSelectProperties<any>>();

export type HeadlessSelectRootRenderProp<T> = (
  (...properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectRootRenderProp<T>(
  children: HeadlessSelectRootRenderProp<T> | JSX.Element,
): children is HeadlessSelectRootRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessSelectRootProps<T>
  extends HeadlessSelectOptions<T> {
  children?: HeadlessSelectRootRenderProp<T> | JSX.Element;
}

export function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element {
  const properties = useHeadlessSelect(props);
  return (
    <HeadlessSelectContext.Provider value={properties}>
      {(() => {
        const body = props.children;
        if (isHeadlessSelectRootRenderProp(body)) {
          return body(...properties);
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
  (...properties: HeadlessSelectProperties<T>) => JSX.Element
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
    return body(...properties);
  }
  return body;
}

export type HeadlessSelectOptionProperties = [
  () => boolean,
  () => void,
  () => boolean,
];

export function useHeadlessSelectOption<T>(
  value: () => T,
  disabled?: () => boolean,
): HeadlessSelectOptionProperties {
  const [isSelected, toggleSelected, parentDisabled] = useHeadlessSelectChild<T>();
  const isDisabled = () => disabled?.() || parentDisabled();
  return [
    () => isSelected(value()),
    () => {
      if (!isDisabled()) {
        toggleSelected(value());
      }
    },
    isDisabled,
  ];
}

export type HeadlessSelectOptionRenderProp = (
  (...properties: HeadlessSelectOptionProperties) => JSX.Element
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
          return body(...properties);
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
    return body(...properties);
  }
  return body;
}
