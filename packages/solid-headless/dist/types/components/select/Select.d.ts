import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { SelectMultipleControlledProps } from './SelectMultipleControlled';
import { SelectMultipleUncontrolledProps } from './SelectMultipleUncontrolled';
import { SelectSingleControlledProps } from './SelectSingleControlled';
import { SelectSingleUncontrolledProps } from './SelectSingleUncontrolled';
export type SelectProps<V, T extends ValidConstructor = 'ul'> = SelectSingleControlledProps<V, T> | SelectSingleUncontrolledProps<V, T> | SelectMultipleControlledProps<V, T> | SelectMultipleUncontrolledProps<V, T>;
export declare function Select<V, T extends ValidConstructor = 'ul'>(props: SelectProps<V, T>): JSX.Element;
