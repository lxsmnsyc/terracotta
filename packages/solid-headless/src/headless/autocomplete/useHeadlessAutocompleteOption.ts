import {
  createContext,
  useContext,
} from 'solid-js';
import {
  useHeadlessAutocompleteProperties,
} from './useHeadlessAutocompleteProperties';

export interface HeadlessAutocompleteOptionProperties {
  matches(): boolean;
  isActive(): boolean;
  focus(): void;
  blur(): void;
  disabled(): boolean;
}

export const HeadlessAutocompleteOptionContext = (
  createContext<HeadlessAutocompleteOptionProperties>()
);

export function useHeadlessAutocompleteOptionProperties(): HeadlessAutocompleteOptionProperties {
  const properties = useContext(HeadlessAutocompleteOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessAutocompleteOptionProperties` must be used within HeadlessAutocompleteOption');
}

export function useHeadlessAutocompleteOption(
  value: () => string,
  disabled?: () => boolean,
): HeadlessAutocompleteOptionProperties {
  const properties = useHeadlessAutocompleteProperties();
  const isDisabled = () => {
    const local = disabled?.();
    const parent = properties.disabled();
    return local || parent;
  };
  return {
    matches() {
      return properties.matches(value());
    },
    isActive() {
      return properties.isActive(value());
    },
    focus() {
      if (!isDisabled()) {
        properties.focus(value());
      }
    },
    blur() {
      if (!isDisabled() && this.isActive()) {
        properties.blur();
      }
    },
    disabled: isDisabled,
  };
}
