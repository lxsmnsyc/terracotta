import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export declare type CommandBarTitleProps<T extends ValidConstructor = 'h2'> = HeadlessProps<T, HeadlessDisclosureChildProps>;
export declare function CommandBarTitle<T extends ValidConstructor = 'h2'>(props: CommandBarTitleProps<T>): JSX.Element;
