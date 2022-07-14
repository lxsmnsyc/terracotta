interface CheckboxContext {
    ownerID: string;
    labelID: string;
    indicatorID: string;
    descriptionID: string;
}
export declare const CheckboxContext: import("solid-js").Context<CheckboxContext | undefined>;
export declare function useCheckboxContext(componentName: string): CheckboxContext;
export {};
