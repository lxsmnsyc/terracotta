import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
interface ToggleControlledBaseProps {
    pressed: boolean;
    onChange?: (value: boolean) => void;
}
export type ToggleControlledProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, OmitAndMerge<ToggleControlledBaseProps, ButtonProps<T>>>;
export declare function ToggleControlled<T extends ValidConstructor = 'button'>(props: ToggleControlledProps<T>): JSX.Element;
export {};
