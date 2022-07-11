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
      const items = queryMenuItems(internalRef, ownerID);
      for (let i = 0, len = items.length; i < len; i += 1) {
        if (node === items[i]) {
          if (i === len - 1) {
            setChecked(items[0]);
          } else {
            setChecked(items[i + 1]);
          }
          break;
        }
      }
    }
  }

  function setPrevChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      for (let i = 0, len = items.length; i < len; i += 1) {
        if (node === items[i]) {
          if (i === 0) {
            setChecked(items[len - 1]);
          } else {
            setChecked(items[i - 1]);
          }
          break;
        }
      }
    }
  }

  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      setChecked(items[0]);
    }
  }

  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      setChecked(items[items.length - 1]);
    }
  }

  function setFirstMatch(character: string) {
    if (internalRef instanceof HTMLElement) {
      const items = queryMenuItems(internalRef, ownerID);
      const lower = character.toLowerCase();
      for (let i = 0, l = items.length; i < l; i += 1) {
        if (items[i].textContent?.toLowerCase().startsWith(lower)) {
          setChecked(items[i]);
          return;
        }
      }
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
