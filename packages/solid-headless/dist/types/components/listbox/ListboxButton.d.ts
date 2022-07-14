import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
export declare type ListboxButtonProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, OmitAndMerge<HeadlessDisclosureChildProps, ButtonProps<T>>>;
export declare function ListboxButton<T extends ValidConstructor = 'button'>(props: ListboxButtonProps<T>): JSX.Element;
