import { JSX } from 'solid-js';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type FeedProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    size: number;
    busy?: boolean;
} & WithRef<T> & Omit<DynamicProps<T>, 'size' | 'busy'>;
export declare function Feed<T extends ValidConstructor = 'div'>(props: FeedProps<T>): JSX.Element;
export declare type FeedLabelProps<T extends ValidConstructor = 'span'> = {
    as?: T;
} & DynamicProps<T>;
export declare function FeedLabel<T extends ValidConstructor = 'span'>(props: FeedLabelProps<T>): JSX.Element;
export declare type FeedContentProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & WithRef<T> & DynamicProps<T>;
export declare function FeedContent<T extends ValidConstructor = 'div'>(props: FeedContentProps<T>): JSX.Element;
export declare type FeedArticleProps<T extends ValidConstructor = 'article'> = {
    as?: T;
    index: number;
} & WithRef<T> & Omit<DynamicProps<T>, 'index'>;
export declare function FeedArticle<T extends ValidConstructor = 'article'>(props: FeedArticleProps<T>): JSX.Element;
export declare type FeedArticleLabelProps<T extends ValidConstructor = 'span'> = {
    as?: T;
} & DynamicProps<T>;
export declare function FeedArticleLabel<T extends ValidConstructor = 'span'>(props: FeedArticleLabelProps<T>): JSX.Element;
export declare type FeedArticleDescriptionProps<T extends ValidConstructor = 'p'> = {
    as?: T;
} & DynamicProps<T>;
export declare function FeedArticleDescription<T extends ValidConstructor = 'p'>(props: FeedArticleDescriptionProps<T>): JSX.Element;
