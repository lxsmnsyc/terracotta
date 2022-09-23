import { HeadlessAutocompleteProperties } from './useHeadlessAutocompleteProperties';
export interface HeadlessAutocompleteControlledOptions {
    toggleable?: boolean;
    value: string | undefined;
    onChange?: (value?: string) => void;
    disabled?: boolean;
    matches?: (base: string, search: string) => boolean;
}
export interface HeadlessAutocompleteUncontrolledOptions {
    toggleable?: boolean;
    defaultValue: string | undefined;
    onChange?: (value?: string) => void;
    disabled?: boolean;
    matches?: (base: string, search: string) => boolean;
}
export declare type HeadlessAutocompleteOptions = HeadlessAutocompleteControlledOptions | HeadlessAutocompleteUncontrolledOptions;
export declare function useHeadlessAutocomplete(options: HeadlessAutocompleteOptions): HeadlessAutocompleteProperties;
