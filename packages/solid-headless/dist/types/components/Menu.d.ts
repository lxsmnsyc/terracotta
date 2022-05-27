import { JSX } from 'solid-js/jsx-runtime';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
interface MenuProperties {
    disabled: () => boolean;
}
declare type MenuChildRenderProp = ((properties: MenuProperties) => JSX.Element);
interface MenuChildProps {
    disabled?: boolean;
    children?: MenuChildRenderProp | JSX.Element;
}
export declare type MenuProps<T extends ValidConstructor = 'ul'> = {
    as?: T;
} & WithRef<T> & Omit<DynamicProps<T>, 'as'>;
export declare function Menu<T extends ValidConstructor = 'ul'>(props: MenuProps<T>): JSX.Element;
export declare type MenuItemProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & MenuChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof MenuChildProps>;
export declare function MenuItem<T extends ValidConstructor = 'li'>(props: MenuItemProps<T>): JSX.Element;
export {};
