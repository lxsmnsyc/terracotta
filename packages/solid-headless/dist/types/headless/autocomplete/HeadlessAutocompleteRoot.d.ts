import { JSX } from 'solid-js';
import { HeadlessAutocompleteProperties } from './useHeadlessAutocompleteProperties';
import { HeadlessAutocompleteOptions, HeadlessAutocompleteControlledOptions, HeadlessAutocompleteUncontrolledOptions } from './useHeadlessAutocomplete';
export type HeadlessAutocompleteRootRenderProp = ((properties: HeadlessAutocompleteProperties) => JSX.Element);
export interface HeadlessAutocompleteRootChildren {
    children?: JSX.Element | HeadlessAutocompleteRootRenderProp;
}
export type HeadlessAutocompleteRootProps = HeadlessAutocompleteRootChildren & HeadlessAutocompleteOptions;
export declare function HeadlessAutocompleteRoot(props: HeadlessAutocompleteRootProps): JSX.Element;
export declare function createHeadlessAutocompleteRootControlledProps(props: HeadlessAutocompleteControlledOptions & HeadlessAutocompleteRootChildren): HeadlessAutocompleteRootChildren;
export declare function createHeadlessAutocompleteRootUncontrolledProps(props: HeadlessAutocompleteUncontrolledOptions & HeadlessAutocompleteRootChildren): HeadlessAutocompleteRootChildren;
