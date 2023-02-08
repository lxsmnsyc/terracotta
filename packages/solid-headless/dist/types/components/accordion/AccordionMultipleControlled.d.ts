import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectMultipleControlledOptions } from '../../headless/select';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
type AccordionMultipleControlledBaseProps<V> = HeadlessSelectMultipleControlledOptions<V> & HeadlessSelectRootChildren<V>;
export type AccordionMultipleControlledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, AccordionMultipleControlledBaseProps<V>>;
export declare function AccordionMultipleControlled<V, T extends ValidConstructor = 'div'>(props: AccordionMultipleControlledProps<V, T>): JSX.Element;
export {};
