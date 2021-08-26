import { JSX } from 'solid-js/jsx-runtime';

export type ValidElements = keyof JSX.IntrinsicElements;
export type ValidComponent<P> = (props: P) => JSX.Element;
export type ValidConstructor = ValidElements | ValidComponent<any>;

export type DynamicProps<T extends ValidConstructor> =
  T extends ValidElements
    ? JSX.IntrinsicElements[T]
    :
  T extends ValidComponent<infer U>
    ? U
    : never;
