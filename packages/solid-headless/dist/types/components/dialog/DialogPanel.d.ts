import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type DialogPanelProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function DialogPanel<T extends ValidConstructor = 'div'>(props: DialogPanelProps<T>): JSX.Element;
