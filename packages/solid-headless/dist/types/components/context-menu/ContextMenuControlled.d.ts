import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { ContextMenuBaseProps } from './types';
export type ContextMenuControlledBaseProps = ContextMenuBaseProps & HeadlessDisclosureControlledOptions;
export type ContextMenuControlledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, ContextMenuControlledBaseProps>;
export declare function ContextMenuControlled<T extends ValidConstructor = 'div'>(props: ContextMenuControlledProps<T>): JSX.Element;
