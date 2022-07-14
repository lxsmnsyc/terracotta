import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { PopoverBaseProps } from './types';
export declare type PopoverControlledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, PopoverBaseProps & HeadlessDisclosureControlledOptions>;
export declare function PopoverControlled<T extends ValidConstructor = 'div'>(props: PopoverControlledProps<T>): JSX.Element;
