import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { MenuChildProps } from './MenuChild';
export type MenuItemProps<T extends ValidConstructor = 'li'> = HeadlessPropsWithRef<T, MenuChildProps>;
export declare function MenuItem<T extends ValidConstructor = 'li'>(props: MenuItemProps<T>): JSX.Element;
