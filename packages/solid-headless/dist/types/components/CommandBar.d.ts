import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type CommandBarProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
} & HeadlessDisclosureRootProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;
export declare function CommandBar<T extends ValidConstructor = 'div'>(props: CommandBarProps<T>): JSX.Element;
export declare type CommandBarTitleProps<T extends ValidConstructor = 'h2'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function CommandBarTitle<T extends ValidConstructor = 'h2'>(props: CommandBarTitleProps<T>): JSX.Element;
export declare type CommandBarPanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function CommandBarPanel<T extends ValidConstructor = 'div'>(props: CommandBarPanelProps<T>): JSX.Element;
export declare type CommandBarOverlayProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function CommandBarOverlay<T extends ValidConstructor = 'p'>(props: CommandBarOverlayProps<T>): JSX.Element;
export declare type CommandBarDescriptionProps<T extends ValidConstructor = 'p'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function CommandBarDescription<T extends ValidConstructor = 'p'>(props: CommandBarDescriptionProps<T>): JSX.Element;
