import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const FeedContentContext = createContext<FocusNavigator>();

export function useFeedContentContext(
  componentName: string,
) {
  const context = useContext(FeedContentContext);
  assert(context, new Error(`<${componentName}> must be used inside a <FeedContent>`));
  return context;
}

export function createFeedArticleFocusNavigator(
  owner: string,
) {
  return new FocusNavigator(owner);
}
