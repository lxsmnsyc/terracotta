import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
interface TransitionRootContext {
    show: boolean;
}
declare const TransitionRootContext: import("solid-js").Context<TransitionRootContext | undefined>;
interface TransitionBaseChildProps {
    unmount?: boolean;
    appear?: boolean;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    entered?: string;
    leave?: string;
    leaveFrom?: string;
    leaveTo?: string;
    beforeEnter?: () => void;
    afterEnter?: () => void;
    beforeLeave?: () => void;
    afterLeave?: () => void;
}
export declare type TransitionChildProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, TransitionBaseChildProps>;
export declare function TransitionChild<T extends ValidConstructor = 'div'>(props: TransitionChildProps<T>): JSX.Element;
export declare type TransitionProps<T extends ValidConstructor = 'div'> = TransitionRootContext & TransitionChildProps<T>;
export declare function Transition<T extends ValidConstructor = 'div'>(props: TransitionProps<T>): JSX.Element;
export {};
