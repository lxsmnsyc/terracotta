import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export declare type ListboxLabelProps<T extends ValidConstructor = 'label'> = HeadlessProps<T, HeadlessDisclosureChildProps>;
export declare function ListboxLabel<T extends ValidConstructor = 'label'>(props: ListboxLabelProps<T>): JSX.Element;
