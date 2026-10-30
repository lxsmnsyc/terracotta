import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  merge,
  omit,
  untrack,
} from 'solid-js';
import {
  createMultipleSelectState,
  createSingleSelectState,
  type MultipleSelectStateControlledOptions,
  type MultipleSelectStateUncontrolledOptions,
  SelectStateProvider,
  type SelectStateRenderProps,
  type SingleSelectStateControlledOptions,
  type SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import createTypeAhead from '../../utils/create-type-ahead';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import isEqual from '../../utils/is-equal';
import { mergeFunc } from '../../utils/merge-func';
import { DATA_SET_NAMESPACE } from '../../utils/namespace';
import { createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { TreeItemEntry } from './TreeContext';
import { TreeContext } from './TreeContext';
import { TREE_TAG } from './tags';

const OWNER_ATTRIBUTE = `${DATA_SET_NAMESPACE}-owner`;

export interface TreeExpansionOptions<V> {
  /** The values of the items that start expanded, uncontrolled. */
  defaultExpanded?: V[];
  /** The values of the expanded items, controlled. */
  expanded?: V[];
  onExpandedChange?: (expanded: V[]) => void;
}

type TreeBaseProps<V> = TreeExpansionOptions<V> & SelectStateRenderProps<V>;

export type TreeSingleControlledProps<V, T extends ValidComponent = 'ul'> = HeadlessPropsWithRef<
  T,
  SingleSelectStateControlledOptions<V> & TreeBaseProps<V>
>;

export type TreeSingleUncontrolledProps<V, T extends ValidComponent = 'ul'> = HeadlessPropsWithRef<
  T,
  SingleSelectStateUncontrolledOptions<V> & TreeBaseProps<V>
>;

export type TreeMultipleControlledProps<V, T extends ValidComponent = 'ul'> = HeadlessPropsWithRef<
  T,
  MultipleSelectStateControlledOptions<V> & TreeBaseProps<V>
>;

export type TreeMultipleUncontrolledProps<
  V,
  T extends ValidComponent = 'ul',
> = HeadlessPropsWithRef<T, MultipleSelectStateUncontrolledOptions<V> & TreeBaseProps<V>>;

export type TreeProps<V, T extends ValidComponent = 'ul'> =
  | TreeSingleControlledProps<V, T>
  | TreeSingleUncontrolledProps<V, T>
  | TreeMultipleControlledProps<V, T>
  | TreeMultipleUncontrolledProps<V, T>;

function isTreeMultiple<V, T extends ValidComponent>(
  props: TreeProps<V, T>,
): props is TreeMultipleControlledProps<V, T> | TreeMultipleUncontrolledProps<V, T> {
  return !!props.multiple;
}

/** Puts elements in document order. */
function byDocumentOrder(a: HTMLElement, b: HTMLElement): number {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

/**
 * A hierarchical list, such as a file browser, following the ARIA tree view
 * pattern. It is one stop in the tab sequence. The arrow keys move through
 * the items on screen, and open and close them.
 *
 * Renders a `<ul>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tree.md}
 */
export function Tree<V, T extends ValidComponent = 'ul'>(props: TreeProps<V, T>): JSX.Element {
  const ownerID = createUniqueId();
  const multiple = untrack(() => isTreeMultiple(props));

  const [ref, setRef] = createForwardRef(props);

  // In a multi-select tree, Space toggles a node, so selecting a selected node
  // deselects it unless `toggleable` is turned off.
  const selection = isTreeMultiple(props)
    ? createMultipleSelectState<V>(
        merge(props, {
          get toggleable(): boolean {
            return props.toggleable ?? true;
          },
        }),
      )
    : createSingleSelectState<V>(props);

  const equals = (a: V, b: V): boolean => (props.by ?? isEqual)(a, b);

  const [internalExpanded, setInternalExpanded] = createSignal<V[]>(
    untrack(() => props.defaultExpanded ?? []),
  );

  const expanded = createMemo((): V[] =>
    'expanded' in props && props.expanded ? props.expanded : internalExpanded(),
  );

  function isExpanded(value: V): boolean {
    return expanded().some((item) => equals(item, value));
  }

  function setExpanded(value: V, open: boolean): void {
    const current = untrack(expanded);
    if (untrack(() => isExpanded(value)) === open) {
      return;
    }
    const next = open ? [...current, value] : current.filter((item) => !equals(item, value));
    if (!('expanded' in props && props.expanded)) {
      setInternalExpanded(next);
    }
    props.onExpandedChange?.(next);
  }

  const [entries, setEntries] = createSignal<TreeItemEntry[]>([]);
  let serverTabStopClaimed = false;
  const [focused, setFocused] = createSignal<HTMLElement>();

  // The one item in the tab sequence: the focused one, else the first
  // selected one, else the first item.
  const tabStop = createMemo((): HTMLElement | undefined => {
    const visible = entries().filter((entry) => entry.isVisible());
    const current = focused();
    if (current && visible.some((entry) => entry.element === current)) {
      return current;
    }
    const sorted = visible.map((entry) => entry.element).sort(byDocumentOrder);
    const selected = visible
      .filter((entry) => entry.isSelected())
      .map((entry) => entry.element)
      .sort(byDocumentOrder);
    return selected.at(0) ?? sorted.at(0);
  });

  createEffect(ref, (current) => {
    if (!(current instanceof HTMLElement)) {
      return undefined;
    }
    const root = current;

    function visibleEntries(): TreeItemEntry[] {
      return untrack(entries)
        .filter((entry) => entry.isVisible() && root.contains(entry.element))
        .sort((a, b) => byDocumentOrder(a.element, b.element));
    }

    function visibleItems(): HTMLElement[] {
      return visibleEntries().map((entry) => entry.element);
    }

    function ownItem(target: EventTarget | null): HTMLElement | undefined {
      if (!(target instanceof Element)) {
        return undefined;
      }
      const item = target.closest<HTMLElement>(
        `[role="treeitem"][${OWNER_ATTRIBUTE}="${ownerID}"]`,
      );
      return item && root.contains(item) ? item : undefined;
    }

    function parentItem(item: HTMLElement): HTMLElement | undefined {
      const parent = item.parentElement;
      return parent ? ownItem(parent) : undefined;
    }

    function nameOf(item: HTMLElement): string {
      const labelledBy = item.getAttribute('aria-labelledby');
      const label = labelledBy ? document.getElementById(labelledBy) : null;
      return (label ?? item).textContent.trim().toLowerCase();
    }

    const pushCharacter = createTypeAhead((value) => {
      const items = visibleItems();
      const query = value.toLowerCase();
      const index = items.findIndex((item) => item === document.activeElement);
      // A single character searches after the focused item, so pressing it
      // again moves to the next match.
      let start = 0;
      if (index !== -1) {
        start = value.length === 1 ? index + 1 : index;
      }
      for (let i = 0; i < items.length; i += 1) {
        const item = items[(start + i) % items.length];
        if (nameOf(item).startsWith(query)) {
          item.focus();
          return;
        }
      }
    });

    return mergeFunc(
      useEventListener(root, 'keydown', (e) => {
        const item = ownItem(e.target);
        const entry = untrack(entries).find((candidate) => candidate.element === item);
        if (!item || !entry) {
          return;
        }
        const items = visibleItems();
        const index = items.indexOf(item);
        const isParent = entry.isParent();
        const isOpen = isParent && entry.isExpanded();
        switch (e.key) {
          case 'ArrowDown':
            items.at(index + 1)?.focus();
            break;
          case 'ArrowUp':
            if (index > 0) {
              items[index - 1].focus();
            }
            break;
          case 'Home':
            items.at(0)?.focus();
            break;
          case 'End':
            items.at(-1)?.focus();
            break;
          case 'ArrowRight':
            if (isParent && !isOpen) {
              entry.setExpanded(true);
            } else if (isOpen) {
              const next = items.at(index + 1);
              if (next && parentItem(next) === item) {
                next.focus();
              }
            }
            break;
          case 'ArrowLeft':
            if (isOpen) {
              entry.setExpanded(false);
            } else {
              parentItem(item)?.focus();
            }
            break;
          case 'Enter':
          case ' ':
            if (!entry.disabled()) {
              entry.select();
            }
            break;
          default:
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
              pushCharacter(e.key);
              break;
            }
            return;
        }
        e.preventDefault();
      }),
    );
  });

  const disabledState = createDisabledState(() => selection.disabled());
  // The props are a union of four shapes, and `omit` needs one shape to name
  // the keys it removes.
  const rest = omit(
    props as Record<string, unknown>,
    'as',
    'children',
    'ref',
    'multiple',
    'toggleable',
    'value',
    'defaultValue',
    'onChange',
    'disabled',
    'by',
    'expanded',
    'defaultExpanded',
    'onExpandedChange',
  );
  const Root = dynamic(() => props.as || 'ul');
  return (
    <TreeContext
      value={{
        ownerID,
        selection,
        multiple,
        isExpanded,
        setExpanded,
        register(entry): () => void {
          setEntries((list) => [...list, entry]);
          return () => {
            setEntries((list) => list.filter((item) => item !== entry));
          };
        },
        tabStop,
        claimServerTabStop(): boolean {
          if (serverTabStopClaimed) {
            return false;
          }
          serverTabStopClaimed = true;
          return true;
        },
        setFocused,
      }}
    >
      <Root
        {...TREE_TAG}
        role="tree"
        aria-multiselectable={multiple ? 'true' : undefined}
        ref={setRef}
        {...disabledState}
        {...rest}
      >
        <SelectStateProvider state={selection}>{props.children}</SelectStateProvider>
      </Root>
    </TreeContext>
  );
}
