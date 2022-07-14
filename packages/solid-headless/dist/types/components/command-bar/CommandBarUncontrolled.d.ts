import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { CommandBarBaseProps } from './types';
export declare type CommandBarUncontrolledBaseProps = CommandBarBaseProps & HeadlessDisclosureUncontrolledOptions;
export declare type CommandBarUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, CommandBarUncontrolledBaseProps>;
export declare function CommandBarUncontrolled<T extends ValidConstructor = 'div'>(props: CommandBarUncontrolledProps<T>): JSX.Element;
