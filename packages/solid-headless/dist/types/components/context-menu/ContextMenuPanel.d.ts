import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { UnmountableProps } from '../../utils/Unmountable';
export declare type ContextMenuPanelProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps & UnmountableProps>;
export declare function ContextMenuPanel<T extends ValidConstructor = 'div'>(props: ContextMenuPanelProps<T>): JSX.Element;
