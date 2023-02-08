import { JSX } from 'solid-js';
import { HeadlessAutocompleteOptionProperties } from './useHeadlessAutocompleteOption';
export type HeadlessAutocompleteOptionRenderProp = ((properties: HeadlessAutocompleteOptionProperties) => JSX.Element);
export interface HeadlessAutocompleteOptionProps {
    value: string;
    disabled?: boolean;
    children?: JSX.Element | HeadlessAutocompleteOptionRenderProp;
}
export declare function HeadlessAutocompleteOption(props: HeadlessAutocompleteOptionProps): JSX.Element;
export declare function createHeadlessAutocompleteOptionProps(props: HeadlessAutocompleteOptionProps): {
    children?: JSX.Element | HeadlessAutocompleteOptionRenderProp;
};
export interface HeadlessAutocompleteOptionChildProps {
    children?: JSX.Element | HeadlessAutocompleteOptionRenderProp;
}
export declare function HeadlessAutocompleteOptionChild(props: HeadlessAutocompleteOptionChildProps): JSX.Element;
export declare function createHeadlessAutocompleteOptionChildProps(props: HeadlessAutocompleteOptionChildProps): HeadlessAutocompleteOptionChildProps;
