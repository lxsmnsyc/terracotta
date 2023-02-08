import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { CheckboxControlledProps } from './CheckboxControlled';
import { CheckboxUncontrolledProps } from './CheckboxUncontrolled';
export type CheckboxProps<T extends ValidConstructor = typeof Fragment> = CheckboxControlledProps<T> | CheckboxUncontrolledProps<T>;
export declare function Checkbox<T extends ValidConstructor = typeof Fragment>(props: CheckboxProps<T>): JSX.Element;
