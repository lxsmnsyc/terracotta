import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
interface FeedBaseProps {
    size: number;
    busy?: boolean;
}
export declare type FeedProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, FeedBaseProps>;
export declare function Feed<T extends ValidConstructor = 'div'>(props: FeedProps<T>): JSX.Element;
export {};
