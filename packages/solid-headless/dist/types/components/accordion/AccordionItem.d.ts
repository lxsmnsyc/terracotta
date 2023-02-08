import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps } from '../../headless/select';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export type AccordionItemProps<V, T extends ValidConstructor = 'div'> = HeadlessProps<T, HeadlessSelectOptionProps<V>>;
export declare function AccordionItem<V, T extends ValidConstructor = 'div'>(props: AccordionItemProps<V, T>): JSX.Element;
