interface FeedContext {
    ownerID: string;
    labelID: string;
    contentID: string;
    size: number;
    busy: boolean;
    focusPrev: () => void;
    focusNext: () => void;
}
export declare const FeedContext: import("solid-js").Context<FeedContext | undefined>;
export declare function useFeedContext(componentName: string): FeedContext;
export {};
