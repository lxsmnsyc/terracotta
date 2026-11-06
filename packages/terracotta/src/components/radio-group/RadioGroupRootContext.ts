import type { Accessor } from 'solid-js';
import { createContext, createMemo, createSignal, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export interface RadioGroupOptionEntry {
  element: HTMLElement;
  disabled: Accessor<boolean>;
  checked: Accessor<boolean>;
}

export interface RadioGroupRootContextData {
  controller: FocusNavigator;
  /** The option that takes part in the tab sequence. */
  tabStop: Accessor<HTMLElement | undefined>;
  register: (entry: RadioGroupOptionEntry) => () => void;
}

export const RadioGroupRootContext = createContext<RadioGroupRootContextData | null>(null);

/**
 * Reads the nearest `RadioGroup`'s internal context, which holds the focus
 * navigator shared by its options. Throws when called outside a `RadioGroup`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
export function useRadioGroupRootContext(componentName: string): RadioGroupRootContextData {
  const context = useContext(RadioGroupRootContext);
  assert(context, new Error(`<${componentName}> must be used inside a <RadioGroup>`));
  return context;
}

export function createRadioGroupOptionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}

/**
 * Picks the option that holds the group's tab stop.
 * - The checked option holds it when it is enabled.
 * - Otherwise the first enabled option in document order holds it.
 */
export function createRadioGroupRoot(controller: FocusNavigator): RadioGroupRootContextData {
  const [entries, setEntries] = createSignal<RadioGroupOptionEntry[]>([]);

  const tabStop = createMemo(() => {
    let first: HTMLElement | undefined;
    for (const entry of entries()) {
      if (!entry.disabled()) {
        if (entry.checked()) {
          return entry.element;
        }
        if (
          !first ||
          first.compareDocumentPosition(entry.element) & Node.DOCUMENT_POSITION_PRECEDING
        ) {
          first = entry.element;
        }
      }
    }
    return first;
  });

  return {
    controller,
    tabStop,
    register(entry): () => void {
      setEntries((current) => [...current, entry]);
      return () => {
        setEntries((current) => current.filter((item) => item !== entry));
      };
    },
  };
}
