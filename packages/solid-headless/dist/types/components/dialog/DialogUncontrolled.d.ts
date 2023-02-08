import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
import { DialogBaseProps } from './types';
type DialogUncontrolledBaseProps = DialogBaseProps & HeadlessDisclosureUncontrolledOptions;
export type DialogUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, DialogUncontrolledBaseProps>;
export declare function DialogUncontrolled<T extends ValidConstructor = 'div'>(props: DialogUncontrolledProps<T>): JSX.Element;
export {};
