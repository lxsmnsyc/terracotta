import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import {
  HeadlessDisclosureProperties,
} from './useHeadlessDisclosure';

export const HeadlessDisclosureContext = createContext<HeadlessDisclosureProperties>();

export function useHeadlessDisclosureProperties(): HeadlessDisclosureProperties {
  const properties = useContext(HeadlessDisclosureContext);
  assert(properties, new Error('`useHeadlessDisclosureProperties` must be used within `<HeadlessDisclosureRoot>`.'));
  return properties;
}
