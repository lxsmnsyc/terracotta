import {
  createContext,
  useContext,
} from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const FeedContentContext = createContext<FocusNavigator<any>>();

export function useFeedContentContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(FeedContentContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedContent>`);
}

export function createFeedArticleFocusNavigator<T extends ValidConstructor>(
  owner: string,
): FocusNavigator<T> {
  return new FocusNavigator(owner);
}
