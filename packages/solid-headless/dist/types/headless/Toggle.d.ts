import { JSX } from 'solid-js';
export interface HeadlessToggleOptions {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (state?: boolean) => void;
    CONTROLLED?: boolean;
}
export interface HeadlessToggleProperties {
    checked(): boolean | undefined;
    setState(newState?: boolean): void;
    disabled(): boolean;
}
export declare function useHeadlessToggle(options?: HeadlessToggleOptions): HeadlessToggleProperties;
export declare type HeadlessToggleRootRenderProp = ((properties: HeadlessToggleProperties) => JSX.Element);
export interface HeadlessToggleRootProps extends HeadlessToggleOptions {
    children?: HeadlessToggleRootRenderProp | JSX.Element;
}
export declare function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element;
export declare function useHeadlessToggleChild(): HeadlessToggleProperties;
export declare type HeadlessToggleChildRenderProp = ((properties: HeadlessToggleProperties) => JSX.Element);
export interface HeadlessToggleChildProps {
    children?: HeadlessToggleChildRenderProp | JSX.Element;
}
export declare function HeadlessToggleChild(props: HeadlessToggleChildProps): JSX.Element;
