import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
export declare const ListboxOptionsContext: import("solid-js").Context<FocusNavigator<any> | undefined>;
export declare function useListboxOptionsContext<T extends ValidConstructor>(componentName: string): FocusNavigator<T>;
export declare function createListboxOptionsFocusNavigator<T extends ValidConstructor>(owner: string): FocusNavigator<T>;
