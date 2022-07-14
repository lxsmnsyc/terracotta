import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
export declare const AccordionContext: import("solid-js").Context<FocusNavigator<any> | undefined>;
export declare function useAccordionContext<T extends ValidConstructor>(componentName: string): FocusNavigator<T>;
export declare function createAccordionFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T>;
