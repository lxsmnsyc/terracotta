import { ValidConstructor, DynamicNode } from './dynamic-prop';
export declare function createOwnerAttribute(ownerID: string): {
    [x: string]: string;
};
export default class FocusNavigator<T extends ValidConstructor> {
    private ownerID;
    private internalRef?;
    constructor(ownerID: string);
    setRef(ref: DynamicNode<T>): void;
    private query;
    setChecked(node: Element): void;
    setNextChecked(node: Element, continuous?: boolean): void;
    setPrevChecked(node: Element, continuous?: boolean): void;
    setFirstChecked(): void;
    setLastChecked(): void;
    setFirstMatch(character: string): void;
    getId(): string;
}
