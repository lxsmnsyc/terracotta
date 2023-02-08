import { JSX } from 'solid-js';
export interface MenuProperties {
    disabled: () => boolean;
}
export type MenuChildRenderProp = ((properties: MenuProperties) => JSX.Element);
export interface MenuChildProps {
    disabled?: boolean;
    children?: JSX.Element | MenuChildRenderProp;
}
export declare function MenuChild(props: MenuChildProps): JSX.Element;
