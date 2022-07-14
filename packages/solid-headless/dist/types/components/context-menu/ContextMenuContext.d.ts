interface ContextMenuContext {
    ownerID: string;
    boundaryID: string;
    panelID: string;
    anchor?: HTMLElement | null;
}
export declare const ContextMenuContext: import("solid-js").Context<ContextMenuContext | undefined>;
export declare function useContextMenuContext(componentName: string): ContextMenuContext;
export {};
