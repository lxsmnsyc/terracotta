import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
export declare type ListboxOptionProps<V, T extends ValidConstructor = 'li'> = HeadlessPropsWithRef<T, OmitAndMerge<HeadlessSelectOptionProps<V>, ButtonProps<T>>>;
export declare function ListboxOption<V, T extends ValidConstructor = 'li'>(props: ListboxOptionProps<V, T>): JSX.Element;
