interface FeedArticleContext {
    ownerID: string;
    labelID: string;
    descriptionID: string;
}
export declare const FeedArticleContext: import("solid-js").Context<FeedArticleContext | undefined>;
export declare function useFeedArticleContext(componentName: string): FeedArticleContext;
export {};
