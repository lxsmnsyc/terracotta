import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface RadioGroupContextData {
  labelID: string;
  descriptionID: string;
}

export const RadioGroupContext = createContext<RadioGroupContextData>();

export function useRadioGroupContext(
  componentName: string,
): RadioGroupContextData {
  const context = useContext(RadioGroupContext);
  assert(
    context,
    new Error(
      `<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`,
    ),
  );
  return context;
}
