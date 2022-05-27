import { JSX } from 'solid-js/jsx-runtime';
import { HeadlessToggleChildProps, HeadlessToggleRootProps } from '../headless/Toggle';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
import Fragment from '../utils/Fragment';
export declare type CheckboxProps<T extends ValidConstructor = typeof Fragment> = {
    as?: T;
} & Omit<HeadlessToggleRootProps, 'CONTROLLED'> & Omit<DynamicProps<T>, keyof HeadlessToggleRootProps>;
export declare function Checkbox<T extends ValidConstructor = typeof Fragment>(props: CheckboxProps<T>): JSX.Element;
export declare type CheckboxIndicatorProps<T extends ValidConstructor = 'button'> = {
    as?: T;
} & HeadlessToggleChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;
export declare function CheckboxIndicator<T extends ValidConstructor = 'button'>(props: CheckboxIndicatorProps<T>): JSX.Element;
export declare type CheckboxLabelProps<T extends ValidConstructor = 'label'> = {
    as?: T;
} & HeadlessToggleChildProps & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;
export declare function CheckboxLabel<T extends ValidConstructor = 'label'>(props: CheckboxLabelProps<T>): JSX.Element;
export declare type CheckboxDescriptionProps<T extends ValidConstructor = 'p'> = {
    as?: T;
} & HeadlessToggleChildProps & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;
export declare function CheckboxDescription<T extends ValidConstructor = 'p'>(props: CheckboxDescriptionProps<T>): JSX.Element;
