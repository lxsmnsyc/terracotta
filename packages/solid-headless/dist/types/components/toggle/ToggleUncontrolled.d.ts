import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
interface ToggleUncontrolledBaseProps {
    defaultPressed: boolean;
    onChange?: (value: boolean) => void;
}
export declare type ToggleUncontrolledProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, OmitAndMerge<ToggleUncontrolledBaseProps, ButtonProps<T>>>;
export declare function ToggleUncontrolled<T extends ValidConstructor = 'button'>(props: ToggleUncontrolledProps<T>): JSX.Element;
export {};
