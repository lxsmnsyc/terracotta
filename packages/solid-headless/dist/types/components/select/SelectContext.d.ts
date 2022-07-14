import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
interface SelectContext<T extends ValidConstructor> {
    horizontal: boolean;
    controller: FocusNavigator<T>;
}
export declare const SelectContext: import("solid-js").Context<SelectContext<any> | undefined>;
export declare function useSelectContext<T extends ValidConstructor>(componentName: string): SelectContext<T>;
export declare function createSelectOptionFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T>;
export {};
