export interface HeadlessInputControlledOptions {
    value: string | undefined;
    disabled?: string;
    onChange?: (state?: string) => void;
}
export interface HeadlessInputUncontrolledOptions {
    defaultValue: string | undefined;
    disabled?: boolean;
    onChange?: (state?: string) => void;
}
export declare type HeadlessInputOptions = HeadlessInputControlledOptions | HeadlessInputUncontrolledOptions;
export interface HeadlessInputProperties {
    value(): string | undefined;
    setState(newState?: string): void;
    disabled(): boolean;
}
export declare function useHeadlessInput(options: HeadlessInputOptions): HeadlessInputProperties;
