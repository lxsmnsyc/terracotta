import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type ContextMenuOverlayProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function ContextMenuOverlay<T extends ValidConstructor = 'div'>(props: ContextMenuOverlayProps<T>): JSX.Element;
