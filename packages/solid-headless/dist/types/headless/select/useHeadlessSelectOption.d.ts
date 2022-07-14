export interface HeadlessSelectOptionProperties {
    isSelected(): boolean;
    select(): void;
    isActive(): boolean;
    focus(): void;
    blur(): void;
    disabled(): boolean;
}
export declare const HeadlessSelectOptionContext: import("solid-js").Context<HeadlessSelectOptionProperties | undefined>;
export declare function useHeadlessSelectOptionProperties(): HeadlessSelectOptionProperties;
export declare function useHeadlessSelectOption<T>(value: () => T, disabled?: () => boolean): HeadlessSelectOptionProperties;
