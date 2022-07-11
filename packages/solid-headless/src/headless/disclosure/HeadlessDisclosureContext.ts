import {
  createContext,
  useContext,
} from 'solid-js';
import {
  HeadlessDisclosureProperties,
} from './useHeadlessDisclosure';

export const HeadlessDisclosureContext = createContext<HeadlessDisclosureProperties>();

export function useHeadlessDisclosureProperties(): HeadlessDisclosureProperties {
  const properties = useContext(HeadlessDisclosureContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessDisclosureProperties` must be used within `<HeadlessDisclosureRoot>`.');
}
