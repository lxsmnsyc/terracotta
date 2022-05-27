import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
import Fragment from '../utils/Fragment';
import { ButtonProps } from './Button';
export declare type DisclosureProps<T extends ValidConstructor = typeof Fragment> = {
    as?: T;
} & HeadlessDisclosureRootProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps>;
export declare function Disclosure<T extends ValidConstructor = typeof Fragment>(props: DisclosureProps<T>): JSX.Element;
export declare type DisclosureButtonProps<T extends ValidConstructor = 'button'> = {
    as?: T;
} & Omit<HeadlessDisclosureChildProps, 'CONTROLLED'> & WithRef<T> & Omit<ButtonProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function DisclosureButton<T extends ValidConstructor = 'button'>(props: DisclosureButtonProps<T>): JSX.Element;
export declare type DisclosurePanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function DisclosurePanel<T extends ValidConstructor = 'div'>(props: DisclosurePanelProps<T>): JSX.Element;
