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

export interface HeadlessSelectRootProps<T>
  extends HeadlessSelectOptions<T> {
  children: ((...properties: HeadlessSelectProperties<T>) => JSX.Element);
}

export function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element {
  const properties = useHeadlessSelect(props);
  return (
    <HeadlessSelectContext.Provider value={properties}>
      {props.children(...properties)}
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

export interface HeadlessSelectChildProps<T> {
  value: T;
  children: (...properties: HeadlessSelectChildProperties) => JSX.Element;
}

export function HeadlessDisclosureChild<T>(
  props: HeadlessSelectChildProps<T>,
): JSX.Element {
  return props.children(...useHeadlessSelectChild(() => props.value));
}
