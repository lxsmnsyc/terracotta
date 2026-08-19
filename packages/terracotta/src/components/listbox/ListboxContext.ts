import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface ListboxContextData {
  ownerID: string;
  labelID: string;
  buttonID: string;
  optionsID: string;
  anchor?: HTMLElement | null;

  // TODO use triangle algorithm
  buttonHovering: boolean;
  optionsHovering: boolean;

  multiple?: boolean;
  isHorizontal(): boolean | undefined;
}

export const ListboxContext = createContext<ListboxContextData>();

/**
 * Reads the nearest `Listbox`'s internal context, which holds the generated
 * ids for its button, label and options. Throws when called outside a
 * `Listbox`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/listbox.md}
 */
export function useListboxContext(componentName: string): ListboxContextData {
  const context = useContext(ListboxContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Listbox>`),
  );
  return context;
}
