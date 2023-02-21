import {
  createContext, useContext,
} from 'solid-js';
import assert from '../../utils/assert';

export interface HeadlessSelectProperties<T> {
  isSelected(value: T): boolean;
  select(value: T): void;
  hasSelected(): boolean;
  isActive(value: T): boolean;
  hasActive(): boolean;
  focus(value: T): void;
  blur(): void;
  disabled(): boolean;
}

export const HeadlessSelectContext = createContext<HeadlessSelectProperties<any>>();

export function useHeadlessSelectProperties<T>(): HeadlessSelectProperties<T> {
  const properties = useContext(HeadlessSelectContext);
  assert(properties, new Error('`useHeadlessSelectProperties` must be used within HeadlessSelectRoot.'));
  return properties;
}
