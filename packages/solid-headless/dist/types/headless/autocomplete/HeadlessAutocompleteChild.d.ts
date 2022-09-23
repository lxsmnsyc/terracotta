import { JSX } from 'solid-js';
import { HeadlessAutocompleteProperties } from './useHeadlessAutocompleteProperties';
export declare type HeadlessAutocompleteChildRenderProp = ((properties: HeadlessAutocompleteProperties) => JSX.Element);
export interface HeadlessAutocompleteChildProps {
    children?: JSX.Element | HeadlessAutocompleteChildRenderProp;
}
export declare function HeadlessAutocompleteChild(props: HeadlessAutocompleteChildProps): JSX.Element;
export declare function createHeadlessAutocompleteChild(props: HeadlessAutocompleteChildProps): {
    children: JSX.Element;
};
