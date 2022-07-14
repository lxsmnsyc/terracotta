import { JSX } from 'solid-js';
import { HeadlessDisclosureOptions, HeadlessDisclosureProperties } from './useHeadlessDisclosure';
export declare type HeadlessDisclosureRootRenderProp = ((properties: HeadlessDisclosureProperties) => JSX.Element);
export interface HeadlessDisclosureRootChildren {
    children?: JSX.Element | HeadlessDisclosureRootRenderProp;
}
export declare type HeadlessDisclosureRootProps = HeadlessDisclosureOptions & HeadlessDisclosureRootChildren;
export declare function HeadlessDisclosureRoot(props: HeadlessDisclosureRootProps): JSX.Element;
