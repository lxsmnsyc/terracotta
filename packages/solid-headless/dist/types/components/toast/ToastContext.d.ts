interface ToastContext {
    ownerID: string;
}
export declare const ToastContext: import("solid-js").Context<ToastContext | undefined>;
export declare function useToastContext(componentName: string): ToastContext;
export {};
