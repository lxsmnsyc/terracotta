import {
  createContext,
  useContext,
} from 'solid-js';
import {
  HeadlessToggleProperties,
} from './useHeadlessToggle';

export const HeadlessToggleContext = createContext<HeadlessToggleProperties>();

export function useHeadlessToggleProperties(): HeadlessToggleProperties {
  const properties = useContext(HeadlessToggleContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessToggleProperties` must be used within `<HeadlessToggleRoot>`.');
}
