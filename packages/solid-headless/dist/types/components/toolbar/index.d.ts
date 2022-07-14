import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type ToolbarProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, {
    horizontal?: boolean;
}>;
export declare function Toolbar<T extends ValidConstructor = 'div'>(props: ToolbarProps<T>): JSX.Element;
