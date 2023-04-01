import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface RadioGroupContext {
  labelID: string;
  descriptionID: string;
}

export const RadioGroupContext = createContext<RadioGroupContext>();

export function useRadioGroupContext(componentName: string): RadioGroupContext {
  const context = useContext(RadioGroupContext);
  assert(context, new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`));
  return context;
}
