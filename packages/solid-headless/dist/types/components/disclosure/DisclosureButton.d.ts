import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
export type DisclosureButtonProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, OmitAndMerge<HeadlessDisclosureChildProps, ButtonProps<T>>>;
export declare function DisclosureButton<T extends ValidConstructor = 'button'>(props: DisclosureButtonProps<T>): JSX.Element;
