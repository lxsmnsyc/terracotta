import { JSX } from 'solid-js';
import { HeadlessSelectOptionChildProps } from '../../headless/select';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> = HeadlessProps<T, HeadlessSelectOptionChildProps>;
export declare function AccordionHeader<T extends ValidConstructor = 'h3'>(props: AccordionHeaderProps<T>): JSX.Element;
