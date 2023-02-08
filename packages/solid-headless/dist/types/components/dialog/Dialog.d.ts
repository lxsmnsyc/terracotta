import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { DialogControlledProps } from './DialogControlled';
import { DialogUncontrolledProps } from './DialogUncontrolled';
export type DialogProps<T extends ValidConstructor = 'div'> = DialogControlledProps<T> | DialogUncontrolledProps<T>;
export declare function Dialog<T extends ValidConstructor = 'div'>(props: DialogProps<T>): JSX.Element;
