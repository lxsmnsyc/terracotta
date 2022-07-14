import { JSX } from 'solid-js';
import { HeadlessToggleChildProps } from '../../headless/toggle';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export declare type CheckboxDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<T, HeadlessToggleChildProps>;
export declare function CheckboxDescription<T extends ValidConstructor = 'p'>(props: CheckboxDescriptionProps<T>): JSX.Element;
