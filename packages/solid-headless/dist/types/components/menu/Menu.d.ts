import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type MenuProps<T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T>;
export declare function Menu<T extends ValidConstructor = 'ul'>(props: MenuProps<T>): JSX.Element;
