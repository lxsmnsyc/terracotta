import { JSX } from 'solid-js';
import { HeadlessToggleProperties, HeadlessToggleOptions } from './useHeadlessToggle';
export type HeadlessToggleRootRenderProp = ((properties: HeadlessToggleProperties) => JSX.Element);
export interface HeadlessToggleRootChildren {
    children?: JSX.Element | HeadlessToggleRootRenderProp;
}
export type HeadlessToggleRootProps = HeadlessToggleOptions & HeadlessToggleRootChildren;
export declare function HeadlessToggleRoot(props: HeadlessToggleRootProps): JSX.Element;
