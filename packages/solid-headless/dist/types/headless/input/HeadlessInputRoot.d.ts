import { JSX } from 'solid-js';
import { HeadlessInputProperties, HeadlessInputOptions } from './useHeadlessInput';
export declare type HeadlessInputRootRenderProp = ((properties: HeadlessInputProperties) => JSX.Element);
export interface HeadlessInputRootChildren {
    children?: JSX.Element | HeadlessInputRootRenderProp;
}
export declare type HeadlessInputRootProps = HeadlessInputOptions & HeadlessInputRootChildren;
export declare function HeadlessInputRoot(props: HeadlessInputRootProps): JSX.Element;
