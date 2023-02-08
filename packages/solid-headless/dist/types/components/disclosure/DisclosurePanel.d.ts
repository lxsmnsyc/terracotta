import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { UnmountableProps } from '../../utils/Unmountable';
export type DisclosurePanelProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, HeadlessDisclosureChildProps & UnmountableProps>;
export declare function DisclosurePanel<T extends ValidConstructor = 'div'>(props: DisclosurePanelProps<T>): JSX.Element;
