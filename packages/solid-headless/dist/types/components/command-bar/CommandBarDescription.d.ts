import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export declare type CommandBarDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<T, HeadlessDisclosureChildProps>;
export declare function CommandBarDescription<T extends ValidConstructor = 'p'>(props: CommandBarDescriptionProps<T>): JSX.Element;
