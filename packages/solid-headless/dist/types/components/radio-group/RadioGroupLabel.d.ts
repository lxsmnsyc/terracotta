import { JSX } from 'solid-js';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export declare type RadioGroupLabelProps<T extends ValidConstructor = 'label'> = HeadlessProps<T>;
export declare function RadioGroupLabel<T extends ValidConstructor = 'label'>(props: RadioGroupLabelProps<T>): JSX.Element;
