import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type CommandBarPanelProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function CommandBarPanel<T extends ValidConstructor = 'div'>(props: CommandBarPanelProps<T>): JSX.Element;
