import { JSX } from 'solid-js';
import { HeadlessToggleProperties, HeadlessToggleOptions } from './useHeadlessToggle';
export declare type HeadlessToggleRootRenderProp = ((properties: HeadlessToggleProperties) => JSX.Element);
export interface HeadlessToggleRootChildren {
    children?: JSX.Element | HeadlessToggleRootRenderProp;
}
export declare type HeadlessToggleRootProps = HeadlessToggleOptions & HeadlessToggleRootChildren;
export declare function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element;
