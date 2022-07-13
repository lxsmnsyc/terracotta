import {
  createContext,
  useContext,
} from 'solid-js';

interface RadioGroupContext {
  labelID: string;
  descriptionID: string;
}

export const RadioGroupContext = createContext<RadioGroupContext>();

export function useRadioGroupContext(componentName: string): RadioGroupContext {
  const context = useContext(RadioGroupContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`);
}
