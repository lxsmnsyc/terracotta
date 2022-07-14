import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { PopoverBaseProps } from './types';
export declare type PopoverUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, PopoverBaseProps & HeadlessDisclosureUncontrolledOptions>;
export declare function PopoverUncontrolled<T extends ValidConstructor = 'div'>(props: PopoverUncontrolledProps<T>): JSX.Element;
