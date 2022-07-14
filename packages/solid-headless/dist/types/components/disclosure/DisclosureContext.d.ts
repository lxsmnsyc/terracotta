interface DisclosureContext {
    ownerID: string;
    buttonID: string;
    panelID: string;
}
export declare const DisclosureContext: import("solid-js").Context<DisclosureContext | undefined>;
export declare function useDisclosureContext(componentName: string): DisclosureContext;
export {};
