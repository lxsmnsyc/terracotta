export interface HeadlessToggleControlledOptions {
    checked: boolean | undefined;
    disabled?: boolean;
    onChange?: (state?: boolean) => void;
}
export interface HeadlessToggleUncontrolledOptions {
    defaultChecked: boolean | undefined;
    disabled?: boolean;
    onChange?: (state?: boolean) => void;
}
export type HeadlessToggleOptions = HeadlessToggleControlledOptions | HeadlessToggleUncontrolledOptions;
export interface HeadlessToggleProperties {
    checked(): boolean | undefined;
    setState(newState?: boolean): void;
    disabled(): boolean;
}
export declare function useHeadlessToggle(options: HeadlessToggleOptions): HeadlessToggleProperties;
