import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface CheckboxContextData {
  ownerID: string;
  labelID: string;
  indicatorID: string;
  descriptionID: string;
}

export const CheckboxContext = createContext<CheckboxContextData>();

/**
 * Reads the nearest `Checkbox`'s internal context, which holds the generated
 * ids for its label, description and indicator. Throws when called outside a
 * `Checkbox`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function useCheckboxContext(componentName: string): CheckboxContextData {
  const context = useContext(CheckboxContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Checkbox>`),
  );
  return context;
}
