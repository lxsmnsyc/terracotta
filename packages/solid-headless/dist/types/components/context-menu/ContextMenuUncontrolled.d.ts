import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { ContextMenuBaseProps } from './types';
export type ContextMenuUncontrolledBaseProps = ContextMenuBaseProps & HeadlessDisclosureUncontrolledOptions;
export type ContextMenuUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, ContextMenuUncontrolledBaseProps>;
export declare function ContextMenuUncontrolled<T extends ValidConstructor = 'div'>(props: ContextMenuUncontrolledProps<T>): JSX.Element;
