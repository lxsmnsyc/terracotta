import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectSingleUncontrolledOptions } from '../../headless/select';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
export type AccordionSingleUncontrolledBaseProps<V> = HeadlessSelectSingleUncontrolledOptions<V> & HeadlessSelectRootChildren<V>;
export type AccordionSingleUncontrolledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, AccordionSingleUncontrolledBaseProps<V>>;
export declare function AccordionSingleUncontrolled<V, T extends ValidConstructor = 'div'>(props: AccordionSingleUncontrolledProps<V, T>): JSX.Element;
