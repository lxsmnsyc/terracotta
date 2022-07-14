import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { UnmountableProps } from '../../utils/Unmountable';
export declare type PopoverPanelProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps & UnmountableProps>;
export declare function PopoverPanel<T extends ValidConstructor = 'div'>(props: PopoverPanelProps<T>): JSX.Element;
