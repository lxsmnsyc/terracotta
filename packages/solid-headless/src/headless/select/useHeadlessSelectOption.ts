import {
  createContext,
  useContext,
} from 'solid-js';
import {
  useHeadlessSelectProperties,
} from './useHeadlessSelectProperties';

export interface HeadlessSelectOptionProperties {
  isSelected(): boolean;
  select(): void;
  isActive(): boolean;
  focus(): void;
  blur(): void;
  disabled(): boolean;
}

export const HeadlessSelectOptionContext = createContext<HeadlessSelectOptionProperties>();

export function useHeadlessSelectOptionProperties(): HeadlessSelectOptionProperties {
  const properties = useContext(HeadlessSelectOptionContext);
  if (properties) {
    return properties;
  }
  throw new Error('`useHeadlessSelectOptionProperties` must be used within HeadlessSelectOption');
}

export function useHeadlessSelectOption<T>(
  value: () => T,
  disabled?: () => boolean,
): HeadlessSelectOptionProperties {
  const properties = useHeadlessSelectProperties<T>();
  const isDisabled = () => disabled?.() || properties.disabled();
  return {
    isSelected() {
      return properties.isSelected(value());
    },
    isActive() {
      return properties.isActive(value());
    },
    select() {
      if (!isDisabled()) {
        properties.select(value());
      }
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
