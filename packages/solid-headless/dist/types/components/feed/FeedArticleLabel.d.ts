import { JSX } from 'solid-js';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export declare type FeedArticleLabelProps<T extends ValidConstructor = 'span'> = HeadlessProps<T>;
export declare function FeedArticleLabel<T extends ValidConstructor = 'span'>(props: FeedArticleLabelProps<T>): JSX.Element;
