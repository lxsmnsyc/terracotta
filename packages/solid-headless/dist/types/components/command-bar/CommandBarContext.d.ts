interface CommandBarContext {
    ownerID: string;
    panelID: string;
    titleID: string;
    descriptionID: string;
    onOpen?: () => void;
    onClose?: () => void;
}
export declare const CommandBarContext: import("solid-js").Context<CommandBarContext | undefined>;
export declare function useCommandBarContext(componentName: string): CommandBarContext;
export {};
