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

interface TailwindMenuContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

const TailwindMenuContext = createContext<TailwindMenuContext>();

function useTailwindMenuContext(componentName: string): TailwindMenuContext {
  const context = useContext(TailwindMenuContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindMenu>`);
}

interface TailwindMenuProperties {
  disabled: () => boolean;
}

type TailwindMenuChildRenderProp = (
  (properties: TailwindMenuProperties) => JSX.Element
);

function isTailwindMenuChildRenderProp(
  children: TailwindMenuChildRenderProp | JSX.Element,
): children is TailwindMenuChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

interface TailwindMenuChildProps {
  disabled?: boolean;
  children?: TailwindMenuChildRenderProp | JSX.Element;
}

function TailwindMenuChild(props: TailwindMenuChildProps): JSX.Element {
  const body = props.children;
  if (isTailwindMenuChildRenderProp(body)) {
    return body({
      disabled: () => !!props.disabled,
    });
  }
  return body;
}

export type TailwindMenuProps<T extends ValidConstructor = 'ul'> = {
  as?: T;
} & WithRef<T>
  & Omit<DynamicProps<T>, 'as'>;

export function TailwindMenu<T extends ValidConstructor = 'ul'>(
  props: TailwindMenuProps<T>,
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
    <TailwindMenuContext.Provider
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
        ])}
        id={ownerID}
        role="menu"
        data-sh-menu={ownerID}
        ref={createRef(props, (e) => {
          internalRef = e;
        })}
      />
    </TailwindMenuContext.Provider>
  );
}

export type TailwindMenuItemProps<T extends ValidConstructor = 'div'> = {
  as?: T;
}
  & TailwindMenuChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof TailwindMenuChildProps>;

export function TailwindMenuItem<T extends ValidConstructor = 'li'>(
  props: TailwindMenuItemProps<T>,
): JSX.Element {
  const context = useTailwindMenuContext('TailwindMenu');

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
      <TailwindMenuChild disabled={!!props.disabled}>
        {props.children}
      </TailwindMenuChild>
    </Dynamic>
  );
}
