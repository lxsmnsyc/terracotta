import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type FeedContentProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T>;
export declare function FeedContent<T extends ValidConstructor = 'div'>(props: FeedContentProps<T>): JSX.Element;
