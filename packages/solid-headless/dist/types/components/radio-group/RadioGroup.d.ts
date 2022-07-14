import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { RadioGroupControlledProps } from './RadioGroupControlled';
import { RadioGroupUncontrolledProps } from './RadioGroupUncontrolled';
export declare type RadioGroupProps<V, T extends ValidConstructor = 'div'> = RadioGroupControlledProps<V, T> | RadioGroupUncontrolledProps<V, T>;
export declare function RadioGroup<V, T extends ValidConstructor = 'div'>(props: RadioGroupProps<V, T>): JSX.Element;
