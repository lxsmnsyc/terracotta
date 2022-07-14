interface DialogContext {
    ownerID: string;
    panelID: string;
    titleID: string;
    descriptionID: string;
}
export declare const DialogContext: import("solid-js").Context<DialogContext | undefined>;
export declare function useDialogContext(componentName: string): DialogContext;
export {};
