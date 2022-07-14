export interface HeadlessSelectProperties<T> {
    isSelected(value: T): boolean;
    select(value: T): void;
    hasSelected(): boolean;
    isActive(value: T): boolean;
    hasActive(): boolean;
    focus(value: T): void;
    blur(): void;
    disabled(): boolean;
}
export declare const HeadlessSelectContext: import("solid-js").Context<HeadlessSelectProperties<any> | undefined>;
export declare function useHeadlessSelectProperties<T>(): HeadlessSelectProperties<T>;
