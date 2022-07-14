import { JSX } from 'solid-js';
import { HeadlessToggleChildProps } from '../../headless/toggle';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type CheckboxIndicatorProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, HeadlessToggleChildProps>;
export declare function CheckboxIndicator<T extends ValidConstructor = 'button'>(props: CheckboxIndicatorProps<T>): JSX.Element;
