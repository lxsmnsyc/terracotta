import {
  createComponent,
  createUniqueId,
  mergeProps,
  JSX,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  focusFirst,
  focusLast,
  focusMatch,
  focusNext,
  focusPrev,
} from '../../utils/focus-navigation';
import {
  queryMenuItems,
} from '../../utils/query-nodes';
import {
  MenuContext,
} from './MenuContext';

export type MenuProps<T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T>;

export function Menu<T extends ValidConstructor = 'ul'>(
  props: MenuProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();

  let internalRef: DynamicNode<T>;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      focusNext(
        queryMenuItems(internalRef, ownerID) ,
        node,
      );
    }
  }

  function setPrevChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      focusPrev(
        queryMenuItems(internalRef, ownerID) ,
        node,
      );
    }
  }

  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      focusFirst(queryMenuItems(internalRef, ownerID) );
    }
  }

  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      focusLast(queryMenuItems(internalRef, ownerID) );
    }
  }

  function setFirstMatch(character: string) {
    if (internalRef instanceof HTMLElement) {
      focusMatch(
        queryMenuItems(internalRef, ownerID) ,
        character,
      );
    }
  }

  return createComponent(MenuContext.Provider, {
    value: {
      ownerID,
      setChecked,
      setFirstChecked,
      setLastChecked,
      setNextChecked,
      setPrevChecked,
      setFirstMatch,
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'ref']),
          {
            id: ownerID,
            'data-sh-menu': ownerID,
            role: 'menu',
            ref: createRef(props, (e) => {
              internalRef = e;
            }),
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
