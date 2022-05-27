import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type ContextMenuProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    onOpen?: () => void;
    onClose?: () => void;
} & Omit<HeadlessDisclosureRootProps, 'CONTROLLED'> & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps>;
export declare function ContextMenu<T extends ValidConstructor = 'div'>(props: ContextMenuProps<T>): JSX.Element;
export declare type ContextMenuBoundaryProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function ContextMenuBoundary<T extends ValidConstructor = 'div'>(props: ContextMenuBoundaryProps<T>): JSX.Element;
export declare type ContextMenuPanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function ContextMenuPanel<T extends ValidConstructor = 'div'>(props: ContextMenuPanelProps<T>): JSX.Element;
export declare type ContextMenuOverlayProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function ContextMenuOverlay<T extends ValidConstructor = 'div'>(props: ContextMenuOverlayProps<T>): JSX.Element;
