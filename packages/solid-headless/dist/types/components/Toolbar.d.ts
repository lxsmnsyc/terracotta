import { JSX } from 'solid-js';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type ToolbarProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    horizontal?: boolean;
} & Omit<DynamicProps<T>, 'as'> & WithRef<T>;
export declare function Toolbar<T extends ValidConstructor = 'div'>(props: ToolbarProps<T>): JSX.Element;
