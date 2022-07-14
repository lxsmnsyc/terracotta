import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
export declare const RadioGroupRootContext: import("solid-js").Context<FocusNavigator<any> | undefined>;
export declare function useRadioGroupRootContext<T extends ValidConstructor>(componentName: string): FocusNavigator<T>;
export declare function createRadioGroupOptionFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T>;
