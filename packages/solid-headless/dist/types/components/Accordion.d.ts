import { JSX } from 'solid-js/jsx-runtime';
import { HeadlessSelectOptionChildProps, HeadlessSelectOptionProps, HeadlessSelectRootProps } from '../headless/Select';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
import { ButtonProps } from './Button';
export declare type AccordionProps<V, T extends ValidConstructor = 'div'> = {
    as?: T;
} & Omit<HeadlessSelectRootProps<V>, 'CONTROLLED'> & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;
export declare function Accordion<V, T extends ValidConstructor = 'div'>(props: AccordionProps<V, T>): JSX.Element;
export declare type AccordionItemProps<V, T extends ValidConstructor = 'div'> = {
    as?: T;
} & HeadlessSelectOptionProps<V> & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;
export declare function AccordionItem<V, T extends ValidConstructor = 'div'>(props: AccordionItemProps<V, T>): JSX.Element;
export declare type AccordionHeaderProps<T extends ValidConstructor = 'h3'> = {
    as?: T;
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;
export declare function AccordionHeader<T extends ValidConstructor = 'h3'>(props: AccordionHeaderProps<T>): JSX.Element;
export declare type AccordionButtonProps<T extends ValidConstructor = 'button'> = {
    as?: T;
} & HeadlessSelectOptionChildProps & WithRef<T> & Omit<ButtonProps<T>, keyof HeadlessSelectOptionChildProps>;
export declare function AccordionButton<T extends ValidConstructor = 'button'>(props: AccordionButtonProps<T>): JSX.Element;
export declare type AccordionPanelProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    unmount?: boolean;
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;
export declare function AccordionPanel<T extends ValidConstructor = 'div'>(props: AccordionPanelProps<T>): JSX.Element;
