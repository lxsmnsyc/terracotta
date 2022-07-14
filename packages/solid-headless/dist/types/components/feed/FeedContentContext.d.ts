import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';
export declare const FeedContentContext: import("solid-js").Context<FocusNavigator<any> | undefined>;
export declare function useFeedContentContext<T extends ValidConstructor>(componentName: string): FocusNavigator<T>;
export declare function createFeedArticleFocusNavigator<T extends ValidConstructor>(owner: string): FocusNavigator<T>;
