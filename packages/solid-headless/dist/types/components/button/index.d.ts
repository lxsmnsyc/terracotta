import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
interface ButtonBaseProps {
    disabled?: boolean;
}
export type ButtonProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, ButtonBaseProps>;
export declare function Button<T extends ValidConstructor = 'button'>(props: ButtonProps<T>): JSX.Element;
export {};
