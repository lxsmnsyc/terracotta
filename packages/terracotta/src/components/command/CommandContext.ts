import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';
import { MATCHES_NODE } from '../../utils/namespace';

interface CommandContextData {
  multiple: boolean;
  controller: FocusNavigator;
  inputID: string;
  labelID: string;
  optionsID: string;
  anchor?: HTMLElement | null;
  optionsHovering: boolean;

  getActiveDescendant(): string | undefined;
  setActiveDescendant(current: string | undefined): void;
  getSelectedDescendant(): string | undefined;
  setSelectedDescendant(current: string | undefined): void;
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
