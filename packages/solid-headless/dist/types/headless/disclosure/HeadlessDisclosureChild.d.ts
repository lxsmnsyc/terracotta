import { JSX } from 'solid-js';
import { HeadlessDisclosureProperties } from './useHeadlessDisclosure';
export type HeadlessDisclosureChildRenderProp = ((properties: HeadlessDisclosureProperties) => JSX.Element);
export interface HeadlessDisclosureChildProps {
    children?: JSX.Element | HeadlessDisclosureChildRenderProp;
}
export declare function HeadlessDisclosureChild(props: HeadlessDisclosureChildProps): JSX.Element;
export declare function createHeadlessDisclosureChildProps(props: HeadlessDisclosureChildProps): HeadlessDisclosureChildProps;
