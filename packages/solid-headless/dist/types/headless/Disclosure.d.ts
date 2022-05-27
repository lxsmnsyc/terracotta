import { JSX } from 'solid-js';
export interface HeadlessDisclosureOptions {
    isOpen?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    onChange?: (state: boolean) => void;
    CONTROLLED?: boolean;
}
export interface HeadlessDisclosureProperties {
    isOpen(): boolean;
    setState(newState: boolean): void;
    disabled(): boolean;
}
export declare function useHeadlessDisclosure(options?: HeadlessDisclosureOptions): HeadlessDisclosureProperties;
export declare type HeadlessDisclosureRootRenderProp = ((properties: HeadlessDisclosureProperties) => JSX.Element);
export interface HeadlessDisclosureRootProps extends HeadlessDisclosureOptions {
    children?: HeadlessDisclosureRootRenderProp | JSX.Element;
}
export declare function HeadlessDisclosureRoot(props: HeadlessDisclosureRootProps): JSX.Element;
export declare function useHeadlessDisclosureChild(): HeadlessDisclosureProperties;
export declare type HeadlessDisclosureChildRenderProp = ((properties: HeadlessDisclosureProperties) => JSX.Element);
export interface HeadlessDisclosureChildProps {
    children?: HeadlessDisclosureChildRenderProp | JSX.Element;
}
export declare function HeadlessDisclosureChild(props: HeadlessDisclosureChildProps): JSX.Element;
