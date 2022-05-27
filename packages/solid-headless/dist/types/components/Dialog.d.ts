import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type DialogProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
} & HeadlessDisclosureRootProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;
export declare function Dialog<T extends ValidConstructor = 'div'>(props: DialogProps<T>): JSX.Element;
export declare type DialogTitleProps<T extends ValidConstructor = 'h2'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function DialogTitle<T extends ValidConstructor = 'h2'>(props: DialogTitleProps<T>): JSX.Element;
export declare type DialogPanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function DialogPanel<T extends ValidConstructor = 'div'>(props: DialogPanelProps<T>): JSX.Element;
export declare type DialogOverlayProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function DialogOverlay<T extends ValidConstructor = 'p'>(props: DialogOverlayProps<T>): JSX.Element;
export declare type DialogDescriptionProps<T extends ValidConstructor = 'p'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function DialogDescription<T extends ValidConstructor = 'p'>(props: DialogDescriptionProps<T>): JSX.Element;
