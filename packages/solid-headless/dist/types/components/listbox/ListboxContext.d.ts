interface ListboxContext {
    horizontal?: boolean;
    multiple?: boolean;
    ownerID: string;
    labelID: string;
    buttonID: string;
    optionsID: string;
    hovering: boolean;
    anchor?: HTMLElement | null;
}
export declare const ListboxContext: import("solid-js").Context<ListboxContext | undefined>;
export declare function useListboxContext(componentName: string): ListboxContext;
export {};
