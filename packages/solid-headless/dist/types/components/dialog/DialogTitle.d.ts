import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { DynamicComponent, DynamicProps, ValidConstructor } from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
export declare type DialogTitleProps<T extends ValidConstructor = 'h2'> = OmitAndMerge<DynamicComponent<T> & HeadlessDisclosureChildProps, DynamicProps<T>>;
export declare function DialogTitle<T extends ValidConstructor = 'h2'>(props: DialogTitleProps<T>): JSX.Element;
