import { JSX } from 'solid-js';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type TransitionBaseChildProps<T extends ValidConstructor = 'div'> = {
    as?: T;
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
};
export declare type TransitionChildProps<T extends ValidConstructor = 'div'> = TransitionBaseChildProps<T> & WithRef<T> & Omit<DynamicProps<T>, keyof TransitionBaseChildProps<T>>;
export declare function TransitionChild<T extends ValidConstructor = 'div'>(props: TransitionChildProps<T>): JSX.Element;
export declare type TransitionProps<T extends ValidConstructor = 'div'> = {
    show: boolean;
    appear?: boolean;
} & TransitionChildProps<T>;
export declare function Transition<T extends ValidConstructor = 'div'>(props: TransitionProps<T>): JSX.Element;
