import { HeadlessSelectProperties } from './useHeadlessSelectProperties';
export interface HeadlessSelectMultipleControlledOptions<T> {
    multiple: true;
    toggleable?: boolean;
    value: T[];
    onChange?: (value: T[]) => void;
    disabled?: boolean;
}
export interface HeadlessSelectMultipleUncontrolledOptions<T> {
    multiple: true;
    toggleable?: boolean;
    defaultValue: T[];
    onChange?: (value: T[]) => void;
    disabled?: boolean;
}
export type HeadlessSelectMultipleOptions<T> = HeadlessSelectMultipleControlledOptions<T> | HeadlessSelectMultipleUncontrolledOptions<T>;
export declare function useHeadlessSelectMultiple<T>(options: HeadlessSelectMultipleOptions<T>): HeadlessSelectProperties<T>;
