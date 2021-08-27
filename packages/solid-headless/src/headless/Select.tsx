import {
  createContext,
  createEffect,
  createSignal,
  JSX,
  untrack,
  useContext,
} from 'solid-js';

export interface HeadlessSelectOptions<T> {
  value: T;
}

export type HeadlessSelectProperties<T> = [
  () => T,
  (selectedValue: T) => void,
];

export function useHeadlessSelect<T>(
  options: HeadlessSelectOptions<T>,
): HeadlessSelectProperties<T> {
  const [signal, setSignal] = createSignal(untrack(() => options.value));

  createEffect(() => {
    setSignal(() => options.value);
  });

  return [
    signal,
    (selected) => setSignal(() => selected),
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
  if (isHeadlessSelectRootRenderProp(props.children)) {
    return (
      <HeadlessSelectContext.Provider value={properties}>
        {props.children(...properties)}
      </HeadlessSelectContext.Provider>
    );
  }
  return (
    <HeadlessSelectContext.Provider value={properties}>
      {props.children}
    </HeadlessSelectContext.Provider>
  );
}

export type HeadlessSelectChildProperties = [
  () => boolean,
  () => void,
];

export function useHeadlessSelectChild<T>(value: () => T): HeadlessSelectChildProperties {
  const properties = useContext(HeadlessSelectContext);
  if (properties) {
    const [selected, setSelected] = properties;
    return [
      () => Object.is(value(), selected()),
      () => setSelected(value),
    ];
  }
  throw new Error('`useHeadlessSelectChild` must be used within HeadlessSelectRoot.');
}

export type HeadlessSelectChildRenderProp = (
  (...properties: HeadlessSelectChildProperties) => JSX.Element
);

function isHeadlessSelectChildRenderProp(
  children: HeadlessSelectChildRenderProp | JSX.Element,
): children is HeadlessSelectChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessSelectChildProps<T> {
  value: T;
  children?: HeadlessSelectChildRenderProp | JSX.Element;
}

export function HeadlessDisclosureChild<T>(
  props: HeadlessSelectChildProps<T>,
): JSX.Element {
  const [state, setState] = useHeadlessSelectChild(() => props.value);
  if (isHeadlessSelectChildRenderProp(props.children)) {
    return props.children(state, setState);
  }
  return props.children;
}
