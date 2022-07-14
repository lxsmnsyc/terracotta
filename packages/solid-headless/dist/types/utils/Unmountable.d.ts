import { JSX } from 'solid-js';
export interface UnmountableProps {
    unmount?: boolean;
}
export declare function createUnmountable(props: UnmountableProps, shouldMount: () => boolean, render: () => JSX.Element): JSX.Element;
