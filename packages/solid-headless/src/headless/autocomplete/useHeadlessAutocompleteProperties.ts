import {
  createContext, useContext,
} from 'solid-js';

export interface HeadlessAutocompleteProperties {
  value(): string | undefined;
  setValue(value?: string): void;
  matches(value: string): boolean;
  isActive(value: string): boolean;
  hasActive(): boolean;
  focus(value: string): void;
  blur(): void;
  disabled(): boolean;
}

export const HeadlessAutocompleteContext = createContext<HeadlessAutocompleteProperties>();

export function useHeadlessAutocompleteProperties(): HeadlessAutocompleteProperties {
  const properties = useContext(HeadlessAutocompleteContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessAutocompleteProperties` must be used within HeadlessAutocompleteRoot.');
}
