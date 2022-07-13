import {
  createContext,
  useContext,
} from 'solid-js';

interface RadioGroupRootContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
}

export const RadioGroupRootContext = createContext<RadioGroupRootContext>();

export function useRadioGroupRootContext(componentName: string): RadioGroupRootContext {
  const context = useContext(RadioGroupRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}
