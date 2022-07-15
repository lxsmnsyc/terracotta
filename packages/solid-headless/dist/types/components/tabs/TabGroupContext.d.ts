interface TabGroupContext<V> {
    horizontal: boolean;
    getId(kind: string, value: V): string;
}
export declare const TabGroupContext: import("solid-js").Context<TabGroupContext<any> | undefined>;
export declare function useTabGroupContext<V>(componentName: string): TabGroupContext<V>;
export {};
