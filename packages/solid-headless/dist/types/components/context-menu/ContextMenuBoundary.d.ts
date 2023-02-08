import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type ContextMenuBoundaryProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function ContextMenuBoundary<T extends ValidConstructor = 'div'>(props: ContextMenuBoundaryProps<T>): JSX.Element;
