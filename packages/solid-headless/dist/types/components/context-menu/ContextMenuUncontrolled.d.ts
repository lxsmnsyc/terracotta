import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { ContextMenuBaseProps } from './types';
export declare type ContextMenuUncontrolledBaseProps = ContextMenuBaseProps & HeadlessDisclosureUncontrolledOptions;
export declare type ContextMenuUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, ContextMenuUncontrolledBaseProps>;
export declare function ContextMenuUncontrolled<T extends ValidConstructor = 'div'>(props: ContextMenuUncontrolledProps<T>): JSX.Element;
