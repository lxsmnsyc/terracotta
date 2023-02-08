import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type PopoverOverlayProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function PopoverOverlay<T extends ValidConstructor = 'div'>(props: PopoverOverlayProps<T>): JSX.Element;
