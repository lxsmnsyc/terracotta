import { JSX } from 'solid-js';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type FeedArticleProps<T extends ValidConstructor = 'article'> = HeadlessPropsWithRef<T, {
    index: number;
}>;
export declare function FeedArticle<T extends ValidConstructor = 'article'>(props: FeedArticleProps<T>): JSX.Element;
