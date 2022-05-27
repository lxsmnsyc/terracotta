import { JSX } from 'solid-js';
export interface HeadlessSelectMultipleOptions<T> {
    multiple: true;
    toggleable?: boolean;
    defaultValue?: T[];
    value?: T[];
    onChange?: (value: T[]) => void;
    disabled?: boolean;
    CONTROLLED?: boolean;
}
export interface HeadlessSelectSingleOptions<T> {
    multiple?: false;
    toggleable?: boolean;
    defaultValue?: T;
    value?: T;
    onChange?: (value?: T) => void;
    disabled?: boolean;
    CONTROLLED?: boolean;
}
export declare type HeadlessSelectOptions<T> = HeadlessSelectSingleOptions<T> | HeadlessSelectMultipleOptions<T>;
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
export declare function useHeadlessSelect<T>(options: HeadlessSelectOptions<T>): HeadlessSelectProperties<T>;
export declare type HeadlessSelectRootRenderProp<T> = ((properties: HeadlessSelectProperties<T>) => JSX.Element);
export declare type HeadlessSelectRootProps<T> = {
    children?: HeadlessSelectRootRenderProp<T> | JSX.Element;
} & HeadlessSelectOptions<T>;
export declare function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element;
export declare function useHeadlessSelectChild<T>(): HeadlessSelectProperties<T>;
export declare type HeadlessSelectChildRenderProp<T> = ((properties: HeadlessSelectProperties<T>) => JSX.Element);
export interface HeadlessSelectChildProps<T> {
    children?: HeadlessSelectChildRenderProp<T> | JSX.Element;
}
export declare function HeadlessSelectChild<T>(props: HeadlessSelectChildProps<T>): JSX.Element;
export interface HeadlessSelectOptionProperties {
    isSelected(): boolean;
    select(): void;
    isActive(): boolean;
    focus(): void;
    blur(): void;
    disabled(): boolean;
}
export declare function useHeadlessSelectOption<T>(value: () => T, disabled?: () => boolean): HeadlessSelectOptionProperties;
export declare type HeadlessSelectOptionRenderProp = ((properties: HeadlessSelectOptionProperties) => JSX.Element);
export interface HeadlessSelectOptionProps<T> {
    value: T;
    disabled?: boolean;
    children?: HeadlessSelectOptionRenderProp | JSX.Element;
}
export declare function HeadlessSelectOption<T>(props: HeadlessSelectOptionProps<T>): JSX.Element;
export declare function useHeadlessSelectOptionChild(): HeadlessSelectOptionProperties;
export interface HeadlessSelectOptionChildProps {
    children?: HeadlessSelectOptionRenderProp | JSX.Element;
}
export declare function HeadlessSelectOptionChild(props: HeadlessSelectOptionChildProps): JSX.Element;
