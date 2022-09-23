export interface HeadlessAutocompleteProperties {
    value(): string | undefined;
    setValue(value?: string): void;
    matches(value: string): boolean;
    isActive(value: string): boolean;
    hasActive(): boolean;
    focus(value: string): void;
    blur(): void;
    disabled(): boolean;
}
export declare const HeadlessAutocompleteContext: import("solid-js").Context<HeadlessAutocompleteProperties | undefined>;
export declare function useHeadlessAutocompleteProperties(): HeadlessAutocompleteProperties;
