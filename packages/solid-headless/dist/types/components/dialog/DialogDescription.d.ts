import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export type DialogDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<T, HeadlessDisclosureChildProps>;
export declare function DialogDescription<T extends ValidConstructor = 'p'>(props: DialogDescriptionProps<T>): JSX.Element;
