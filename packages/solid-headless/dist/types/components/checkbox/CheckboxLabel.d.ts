import { JSX } from 'solid-js';
import { HeadlessToggleChildProps } from '../../headless/toggle';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export declare type CheckboxLabelProps<T extends ValidConstructor = 'label'> = HeadlessProps<T, HeadlessToggleChildProps>;
export declare function CheckboxLabel<T extends ValidConstructor = 'label'>(props: CheckboxLabelProps<T>): JSX.Element;
