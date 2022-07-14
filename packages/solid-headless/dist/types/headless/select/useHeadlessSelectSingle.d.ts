import { HeadlessSelectProperties } from './useHeadlessSelectProperties';
export interface HeadlessSelectSingleControlledOptions<T> {
    toggleable?: boolean;
    value: T;
    onChange?: (value?: T) => void;
    disabled?: boolean;
}
export interface HeadlessSelectSingleUncontrolledOptions<T> {
    toggleable?: boolean;
    defaultValue: T;
    onChange?: (value?: T) => void;
    disabled?: boolean;
}
export declare type HeadlessSelectSingleOptions<T> = HeadlessSelectSingleControlledOptions<T> | HeadlessSelectSingleUncontrolledOptions<T>;
export declare function useHeadlessSelectSingle<T>(options: HeadlessSelectSingleOptions<T>): HeadlessSelectProperties<T>;
