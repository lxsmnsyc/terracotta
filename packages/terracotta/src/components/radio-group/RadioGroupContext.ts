import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface RadioGroupContextData {
  labelID: string;
  descriptionID: string;
}

export const RadioGroupContext = createContext<RadioGroupContextData>();

/**
 * Reads the nearest `RadioGroupOption`'s internal context, which holds the
 * generated ids for its label and description. Throws when called outside a
 * `RadioGroupOption`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
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
