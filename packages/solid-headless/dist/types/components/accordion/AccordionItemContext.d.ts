interface AccordionItemContext {
    buttonID: string;
    panelID: string;
}
export declare const AccordionItemContext: import("solid-js").Context<AccordionItemContext | undefined>;
export declare function useAccordionItemContext(componentName: string): AccordionItemContext;
export {};
