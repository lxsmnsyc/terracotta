import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';
import { MATCHES_NODE } from '../../utils/namespace';

interface CommandContextData {
  multiple: boolean;
  controller: FocusNavigator;
  activeDescendant: string | undefined;
  selectedDescendant: string | undefined;
  inputID: string;
  labelID: string;
  optionsID: string;
  anchor?: HTMLElement | null;
  optionsHovering: boolean;
}

export const CommandContext = createContext<CommandContextData>();

export function useCommandContext(componentName: string): CommandContextData {
  const context = useContext(CommandContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Command>`),
  );
  return context;
}

export function createCommandOptionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId(), {
    virtual: true,
    base: MATCHES_NODE,
  });
}
