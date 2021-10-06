import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  useContext,
} from 'solid-js';
import {
  JSX,
} from 'solid-js/jsx-runtime';
import {
  Dynamic,
} from 'solid-js/web';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';
import { queryMenuItems } from '../utils/query-nodes';

interface MenuContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

const MenuContext = createContext<MenuContext>();

function useMenuContext(componentName: string): MenuContext {
  const context = useContext(MenuContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Menu>`);
}

interface MenuProperties {
  disabled: () => boolean;
}

type MenuChildRenderProp = (
  (properties: MenuProperties) => JSX.Element
);

function isMenuChildRenderProp(
  children: MenuChildRenderProp | JSX.Element,
): children is MenuChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

interface MenuChildProps {
  disabled?: boolean;
  children?: MenuChildRenderProp | JSX.Element;
}

function MenuChild(props: MenuChildProps): JSX.Element {
  const body = props.children;
  if (isMenuChildRenderProp(body)) {
    return body({
      disabled: () => !!props.disabled,
    });
  }
  return body;
}

export type MenuProps<T extends ValidConstructor = 'ul'> = {
  as?: T;
} & WithRef<T>
  & Omit<DynamicProps<T>, 'as'>;

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

  return (
    <MenuContext.Provider
      value={{
        ownerID,
        setChecked,
        setFirstChecked,
        setLastChecked,
        setNextChecked,
        setPrevChecked,
        setFirstMatch,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
          'as',
          'ref',
        ])}
        id={ownerID}
        role="menu"
        data-sh-menu={ownerID}
        ref={createRef(props, (e) => {
          internalRef = e;
        })}
      />
    </MenuContext.Provider>
  );
}

export type MenuItemProps<T extends ValidConstructor = 'div'> = {
  as?: T;
}
  & MenuChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof MenuChildProps>;

export function MenuItem<T extends ValidConstructor = 'li'>(
  props: MenuItemProps<T>,
): JSX.Element {
  const context = useMenuContext('Menu');

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  let characters = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!props.disabled) {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
              context.setPrevChecked(ref);
              break;
            case 'ArrowDown':
            case 'ArrowRight':
              context.setNextChecked(ref);
              break;
            case ' ':
            case 'Enter':
              if (ref.tagName === 'BUTTON') {
                e.preventDefault();
              }
              ref.click();
              break;
            case 'Home':
              context.setFirstChecked();
              break;
            case 'End':
              context.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.setFirstMatch(characters);
                  characters = '';
                }, 100);
              }
              break;
          }
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  return (
    <Dynamic
      component={props.as ?? 'div'}
      {...excludeProps(props, [
        'as',
        'disabled',
        'ref',
      ])}
      disabled={props.disabled}
      role="menuitem"
      tabindex={-1}
      aria-disabled={props.disabled}
      data-sh-menu-item={context.ownerID}
      data-sh-disabled={props.disabled}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    >
      <MenuChild disabled={!!props.disabled}>
        {props.children}
      </MenuChild>
    </Dynamic>
  );
}
