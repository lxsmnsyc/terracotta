import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
import { DialogBaseProps } from './types';
type DialogControlledBaseProps = DialogBaseProps & HeadlessDisclosureControlledOptions;
export type DialogControlledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, DialogControlledBaseProps>;
export declare function DialogControlled<T extends ValidConstructor = 'div'>(props: DialogControlledProps<T>): JSX.Element;
export {};
