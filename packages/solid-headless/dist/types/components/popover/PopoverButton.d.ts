import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
export declare type PopoverButtonProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, OmitAndMerge<HeadlessDisclosureChildProps, ButtonProps<T>>>;
export declare function PopoverButton<T extends ValidConstructor = 'button'>(props: PopoverButtonProps<T>): JSX.Element;
