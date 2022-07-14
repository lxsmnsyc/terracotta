interface AlertDialogContext {
    ownerID: string;
    panelID: string;
    titleID: string;
    descriptionID: string;
}
export declare const AlertDialogContext: import("solid-js").Context<AlertDialogContext | undefined>;
export declare function useAlertDialogContext(componentName: string): AlertDialogContext;
export {};
