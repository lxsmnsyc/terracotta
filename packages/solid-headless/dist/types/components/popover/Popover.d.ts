import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { PopoverControlledProps } from './PopoverControlled';
import { PopoverUncontrolledProps } from './PopoverUncontrolled';
export declare type PopoverProps<T extends ValidConstructor = 'div'> = PopoverControlledProps<T> | PopoverUncontrolledProps<T>;
export declare function Popover<T extends ValidConstructor = 'div'>(props: PopoverProps<T>): JSX.Element;
