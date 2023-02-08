import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { CommandBarBaseProps } from './types';
export type CommandBarControlledBaseProps = CommandBarBaseProps & HeadlessDisclosureControlledOptions;
export type CommandBarControlledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, CommandBarControlledBaseProps>;
export declare function CommandBarControlled<T extends ValidConstructor = 'div'>(props: CommandBarControlledProps<T>): JSX.Element;
