import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { CommandBarBaseProps } from './types';
export type CommandBarUncontrolledBaseProps = CommandBarBaseProps & HeadlessDisclosureUncontrolledOptions;
export type CommandBarUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, CommandBarUncontrolledBaseProps>;
export declare function CommandBarUncontrolled<T extends ValidConstructor = 'div'>(props: CommandBarUncontrolledProps<T>): JSX.Element;
