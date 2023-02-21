import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface CheckboxContext {
  ownerID: string;
  labelID: string;
  indicatorID: string;
  descriptionID: string;
}

export const CheckboxContext = createContext<CheckboxContext>();

export function useCheckboxContext(componentName: string): CheckboxContext {
  const context = useContext(CheckboxContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Checkbox>`));
  return context;
}
