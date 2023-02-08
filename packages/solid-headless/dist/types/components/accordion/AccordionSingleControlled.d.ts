import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectSingleControlledOptions } from '../../headless/select';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
export type AccordionSingleControlledBaseProps<V> = HeadlessSelectSingleControlledOptions<V> & HeadlessSelectRootChildren<V>;
export type AccordionSingleControlledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, AccordionSingleControlledBaseProps<V>>;
export declare function AccordionSingleControlled<V, T extends ValidConstructor = 'div'>(props: AccordionSingleControlledProps<V, T>): JSX.Element;
