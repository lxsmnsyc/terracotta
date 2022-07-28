import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { ToggleControlledProps } from './ToggleControlled';
import { ToggleUncontrolledProps } from './ToggleUncontrolled';
export { ToggleUncontrolledProps, ToggleControlledProps, };
export declare type ToggleProps<T extends ValidConstructor = 'button'> = ToggleControlledProps<T> | ToggleUncontrolledProps<T>;
export declare function Toggle<T extends ValidConstructor = 'button'>(props: ToggleProps<T>): JSX.Element;
