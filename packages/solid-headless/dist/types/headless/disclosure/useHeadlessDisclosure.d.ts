export interface HeadlessDisclosureControlledOptions {
    isOpen: boolean;
    disabled?: boolean;
    onChange?: (state: boolean) => void;
}
export interface HeadlessDisclosureUncontrolledOptions {
    defaultOpen: boolean;
    disabled?: boolean;
    onChange?: (state: boolean) => void;
}
export declare type HeadlessDisclosureOptions = HeadlessDisclosureControlledOptions | HeadlessDisclosureUncontrolledOptions;
export interface HeadlessDisclosureProperties {
    isOpen(): boolean;
    setState(newState: boolean): void;
    disabled(): boolean;
}
export declare function useHeadlessDisclosure(options: HeadlessDisclosureOptions): HeadlessDisclosureProperties;
