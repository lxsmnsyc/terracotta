import { JSX } from 'solid-js';
import { HeadlessInputProperties } from './useHeadlessInput';
export type HeadlessInputChildRenderProp = ((properties: HeadlessInputProperties) => JSX.Element);
export interface HeadlessInputChildProps {
    children?: JSX.Element | HeadlessInputChildRenderProp;
}
export declare function HeadlessInputChild(props: HeadlessInputChildProps): JSX.Element;
