interface RadioGroupContext {
    labelID: string;
    descriptionID: string;
}
export declare const RadioGroupContext: import("solid-js").Context<RadioGroupContext | undefined>;
export declare function useRadioGroupContext(componentName: string): RadioGroupContext;
export {};
