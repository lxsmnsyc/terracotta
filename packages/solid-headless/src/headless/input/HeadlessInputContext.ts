import {
  createContext,
  useContext,
} from 'solid-js';
import {
  HeadlessInputProperties,
} from './useHeadlessInput';

export const HeadlessInputContext = createContext<HeadlessInputProperties>();

export function useHeadlessInputProperties(): HeadlessInputProperties {
  const properties = useContext(HeadlessInputContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessInputProperties` must be used within `<HeadlessInputRoot>`.');
}
