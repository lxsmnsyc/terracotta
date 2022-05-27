import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
import { ButtonProps } from './Button';
export declare type PopoverProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    onClose?: () => void;
    onOpen?: () => void;
} & Omit<HeadlessDisclosureRootProps, 'CONTROLLED'> & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps>;
export declare function Popover<T extends ValidConstructor = 'div'>(props: PopoverProps<T>): JSX.Element;
export declare type PopoverButtonProps<T extends ValidConstructor = 'button'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<ButtonProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function PopoverButton<T extends ValidConstructor = 'button'>(props: PopoverButtonProps<T>): JSX.Element;
export declare type PopoverPanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function PopoverPanel<T extends ValidConstructor = 'div'>(props: PopoverPanelProps<T>): JSX.Element;
export declare type PopoverOverlayProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function PopoverOverlay<T extends ValidConstructor = 'p'>(props: PopoverOverlayProps<T>): JSX.Element;
