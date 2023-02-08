import { JSX } from 'solid-js';
import { HeadlessToggleProperties } from './useHeadlessToggle';
export type HeadlessToggleChildRenderProp = ((properties: HeadlessToggleProperties) => JSX.Element);
export interface HeadlessToggleChildProps {
    children?: JSX.Element | HeadlessToggleChildRenderProp;
}
export declare function HeadlessToggleChild(props: HeadlessToggleChildProps): JSX.Element;
