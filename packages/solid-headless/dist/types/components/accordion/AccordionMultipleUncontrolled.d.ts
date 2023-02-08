import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectMultipleUncontrolledOptions } from '../../headless/select';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
export type AccordionMultipleUncontrolledBaseProps<V> = HeadlessSelectMultipleUncontrolledOptions<V> & HeadlessSelectRootChildren<V>;
export type AccordionMultipleUncontrolledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, AccordionMultipleUncontrolledBaseProps<V>>;
export declare function AccordionMultipleUncontrolled<V, T extends ValidConstructor = 'div'>(props: AccordionMultipleUncontrolledProps<V, T>): JSX.Element;
