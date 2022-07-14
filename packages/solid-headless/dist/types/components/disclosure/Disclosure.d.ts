import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { DisclosureControlledProps } from './DisclosureControlled';
import { DisclosureUncontrolledProps } from './DisclosureUncontrolled';
export declare type DisclosureProps<T extends ValidConstructor = 'div'> = DisclosureControlledProps<T> | DisclosureUncontrolledProps<T>;
export declare function Disclosure<T extends ValidConstructor = 'div'>(props: DisclosureProps<T>): JSX.Element;
