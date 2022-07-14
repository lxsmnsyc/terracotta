import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
export declare const MenuContext: import("solid-js").Context<FocusNavigator<any> | undefined>;
export declare function useMenuContext<T extends ValidConstructor>(componentName: string): FocusNavigator<T>;
export declare function createMenuItemFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T>;
