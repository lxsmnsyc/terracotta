import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import {
  HeadlessInputProperties,
} from './useHeadlessInput';

export const HeadlessInputContext = createContext<HeadlessInputProperties>();

export function useHeadlessInputProperties(): HeadlessInputProperties {
  const properties = useContext(HeadlessInputContext);
  assert(properties, new Error('`useHeadlessInputProperties` must be used within `<HeadlessInputRoot>`.'));
  return properties;
}
