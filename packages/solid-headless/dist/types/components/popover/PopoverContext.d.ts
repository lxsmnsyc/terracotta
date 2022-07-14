interface PopoverContext {
    ownerID: string;
    buttonID: string;
    panelID: string;
    hovering: boolean;
    anchor?: HTMLElement | null;
}
export declare const PopoverContext: import("solid-js").Context<PopoverContext | undefined>;
export declare function usePopoverContext(componentName: string): PopoverContext;
export {};
