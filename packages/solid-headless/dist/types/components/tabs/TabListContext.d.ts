import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
export declare const TabListContext: import("solid-js").Context<FocusNavigator<any> | undefined>;
export declare function useTabListContext<T extends ValidConstructor>(componentName: string): FocusNavigator<T>;
export declare function createTabFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T>;
