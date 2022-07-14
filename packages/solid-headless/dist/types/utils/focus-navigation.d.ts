import { DynamicNode, ValidConstructor } from './dynamic-prop';
export declare function focusNextContinuous<T extends ValidConstructor>(nodes: HTMLElement[] | NodeListOf<HTMLElement>, targetNode: DynamicNode<T>): void;
export declare function focusPrevContinuous<T extends ValidConstructor>(nodes: HTMLElement[] | NodeListOf<HTMLElement>, targetNode: DynamicNode<T>): void;
export declare function focusNext<T extends ValidConstructor>(nodes: HTMLElement[] | NodeListOf<HTMLElement>, targetNode: DynamicNode<T>): void;
export declare function focusPrev<T extends ValidConstructor>(nodes: HTMLElement[] | NodeListOf<HTMLElement>, targetNode: DynamicNode<T>): void;
export declare function focusFirst(nodes: HTMLElement[] | NodeListOf<HTMLElement>): void;
export declare function focusLast(nodes: HTMLElement[] | NodeListOf<HTMLElement>): void;
export declare function focusMatch(nodes: HTMLElement[] | NodeListOf<HTMLElement>, character: string): void;
