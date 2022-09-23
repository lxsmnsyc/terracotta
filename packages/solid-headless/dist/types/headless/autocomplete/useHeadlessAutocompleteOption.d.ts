export interface HeadlessAutocompleteOptionProperties {
    matches(): boolean;
    isActive(): boolean;
    focus(): void;
    blur(): void;
    disabled(): boolean;
}
export declare const HeadlessAutocompleteOptionContext: import("solid-js").Context<HeadlessAutocompleteOptionProperties | undefined>;
export declare function useHeadlessAutocompleteOptionProperties(): HeadlessAutocompleteOptionProperties;
export declare function useHeadlessAutocompleteOption(value: () => string, disabled?: () => boolean): HeadlessAutocompleteOptionProperties;
