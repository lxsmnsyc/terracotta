import { JSX } from 'solid-js/jsx-runtime';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type AlertDialogProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
} & Omit<HeadlessDisclosureRootProps, 'CONTROLLED'> & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;
export declare function AlertDialog<T extends ValidConstructor = 'div'>(props: AlertDialogProps<T>): JSX.Element;
export declare type AlertDialogTitleProps<T extends ValidConstructor = 'h2'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function AlertDialogTitle<T extends ValidConstructor = 'h2'>(props: AlertDialogTitleProps<T>): JSX.Element;
export declare type AlertDialogPanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function AlertDialogPanel<T extends ValidConstructor = 'div'>(props: AlertDialogPanelProps<T>): JSX.Element;
export declare type AlertDialogOverlayProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function AlertDialogOverlay<T extends ValidConstructor = 'div'>(props: AlertDialogOverlayProps<T>): JSX.Element;
export declare type AlertDialogDescriptionProps<T extends ValidConstructor = 'p'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function AlertDialogDescription<T extends ValidConstructor = 'p'>(props: AlertDialogDescriptionProps<T>): JSX.Element;
