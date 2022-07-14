import { JSX } from 'solid-js';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export declare type FeedLabelProps<T extends ValidConstructor = 'span'> = HeadlessProps<T>;
export declare function FeedLabel<T extends ValidConstructor = 'span'>(props: FeedLabelProps<T>): JSX.Element;
