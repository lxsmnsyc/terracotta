import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import {
  HeadlessToggleProperties,
} from './useHeadlessToggle';

export const HeadlessToggleContext = createContext<HeadlessToggleProperties>();

export function useHeadlessToggleProperties(): HeadlessToggleProperties {
  const properties = useContext(HeadlessToggleContext);
  assert(properties, new Error('`useHeadlessToggleProperties` must be used within `<HeadlessToggleRoot>`.'));
  return properties;
}
