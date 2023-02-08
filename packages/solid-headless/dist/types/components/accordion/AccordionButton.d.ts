import { JSX } from 'solid-js';
import { HeadlessSelectOptionChildProps } from '../../headless/select';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import { ButtonProps } from '../button';
export type AccordionButtonProps<T extends ValidConstructor = 'button'> = HeadlessPropsWithRef<T, OmitAndMerge<HeadlessSelectOptionChildProps, ButtonProps<T>>>;
export declare function AccordionButton<T extends ValidConstructor = 'button'>(props: AccordionButtonProps<T>): JSX.Element;
