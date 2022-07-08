import {
  createContext,
  useContext,
} from 'solid-js';

interface CheckboxContext {
  ownerID: string;
  labelID: string;
  indicatorID: string;
  descriptionID: string;
}

export const CheckboxContext = createContext<CheckboxContext>();

export function useCheckboxContext(componentName: string): CheckboxContext {
  const context = useContext(CheckboxContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Checkbox>`);
}
