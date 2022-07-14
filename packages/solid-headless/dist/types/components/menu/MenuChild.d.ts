import { JSX } from 'solid-js';
export interface MenuProperties {
    disabled: () => boolean;
}
export declare type MenuChildRenderProp = ((properties: MenuProperties) => JSX.Element);
export interface MenuChildProps {
    disabled?: boolean;
    children?: JSX.Element | MenuChildRenderProp;
}
export declare function MenuChild(props: MenuChildProps): JSX.Element;
