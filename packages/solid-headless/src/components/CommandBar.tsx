import {
  createContext,
  createEffect,
  createUniqueId,
  useContext,
  Show,
  onCleanup,
  createSignal,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChild,
  HeadlessDisclosureChildProps,
  HeadlessDisclosureRoot,
  HeadlessDisclosureRootProps,
  useHeadlessDisclosureChild,
} from '../headless/Disclosure';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import getFocusableElements from '../utils/get-focusable-elements';

interface CommandBarContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const CommandBarContext = createContext<CommandBarContext>();

function useCommandBarContext(componentName: string): CommandBarContext {
  const context = useContext(CommandBarContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <CommandBar>`);
}

export type CommandBarProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
} & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;

function CommandBarEvents(props: { children: JSX.Element }): JSX.Element {
  const properties = useHeadlessDisclosureChild();

  createEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === 'k' && ev.defaultPrevented === false) {
        ev.preventDefault();
        properties.setState(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    onCleanup(() => {
      window.removeEventListener('keydown', onKeyDown);
    });
  });

  return () => props.children;
}

export function CommandBar<T extends ValidConstructor = 'div'>(
  props: CommandBarProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  let returnElement: HTMLElement | null = null;
  if (typeof document !== 'undefined') {
    returnElement = document.activeElement as HTMLElement | null;
  }

  onCleanup(() => {
    returnElement?.focus();
  });

  return (
    <CommandBarContext.Provider
      value={{
        ownerID,
        panelID,
        titleID,
        descriptionID,
      }}
    >
      <HeadlessDisclosureRoot
        CONTROLLED={'isOpen' in props}
        isOpen={props.isOpen}
        onChange={(value) => {
          props.onChange?.(value);
          if (!value) {
            props.onClose?.();
            returnElement?.focus();
          } else {
            returnElement = document.activeElement as HTMLElement | null;
            props.onOpen?.();
          }
        }}
        defaultOpen={props.defaultOpen}
        disabled={props.disabled}
      >
        {({ isOpen }) => (
          <CommandBarEvents>
            <Show
              when={props.unmount ?? true}
              fallback={(
                <Dynamic
                  component={props.as ?? 'div'}
                  {...omitProps(props, [
                    'as',
                    'children',
                    'defaultOpen',
                    'unmount',
                    'isOpen',
                    'disabled',
                    'onClose',
                    'onChange',
                  ])}
                  id={ownerID}
                  role="dialog"
                  aria-modal
                  aria-labelledby={titleID}
                  aria-describedby={descriptionID}
                  data-sh-command-bar={ownerID}
                >
                  <HeadlessDisclosureChild>
                    {props.children}
                  </HeadlessDisclosureChild>
                </Dynamic>
              )}
            >
              <Show when={isOpen()}>
                <Dynamic
                  component={props.as ?? 'div'}
                  {...omitProps(props, [
                    'as',
                    'children',
                    'defaultOpen',
                    'unmount',
                    'isOpen',
                    'disabled',
                    'onClose',
                    'onChange',
                  ])}
                  id={ownerID}
                  role="dialog"
                  aria-modal
                  aria-labelledby={titleID}
                  aria-describedby={descriptionID}
                  data-sh-command-bar={ownerID}
                >
                  <HeadlessDisclosureChild>
                    {props.children}
                  </HeadlessDisclosureChild>
                </Dynamic>
              </Show>
            </Show>
          </CommandBarEvents>
        )}
      </HeadlessDisclosureRoot>
    </CommandBarContext.Provider>
  );
}

export type CommandBarTitleProps<T extends ValidConstructor = 'h2'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function CommandBarTitle<T extends ValidConstructor = 'h2'>(
  props: CommandBarTitleProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarTitle');
  return (
    <Dynamic
      component={(props.as ?? 'h2') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.titleID}
      data-sh-command-bar-title={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type CommandBarPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function CommandBarPanel<T extends ValidConstructor = 'div'>(
  props: CommandBarPanelProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarPanel');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const initialNodes = getFocusableElements(ref);
        if (initialNodes.length) {
          initialNodes[0].focus();
        }

        const onKeyDown = (e: KeyboardEvent) => {
          if (!props.disabled) {
            if (e.key === 'Tab') {
              e.preventDefault();

              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  for (let i = 0, len = nodes.length; i < len; i += 1) {
                    if (document.activeElement === nodes[i]) {
                      if (i === 0) {
                        nodes[len - 1].focus();
                      } else {
                        nodes[i - 1].focus();
                      }
                      break;
                    }
                  }
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                for (let i = 0, len = nodes.length; i < len; i += 1) {
                  if (document.activeElement === nodes[i]) {
                    if (i === len - 1) {
                      nodes[0].focus();
                    } else {
                      nodes[i + 1].focus();
                    }
                    break;
                  }
                }
              }
            } else if (e.key === 'Escape') {
              properties.setState(false);
            }
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
        });
      }
    }
  });

  return (
    <Dynamic
      component={(props.as ?? 'div') as T}
      {...omitProps(props, [
        'as',
        'children',
        'ref',
      ])}
      id={context.panelID}
      data-sh-command-bar-panel={context.ownerID}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type CommandBarOverlayProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function CommandBarOverlay<T extends ValidConstructor = 'p'>(
  props: CommandBarOverlayProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarOverlay');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };

      ref.addEventListener('click', onClick);

      onCleanup(() => {
        ref.removeEventListener('click', onClick);
      });
    }
  });

  return (
    <Dynamic
      component={(props.as ?? 'div') as T}
      {...omitProps(props, [
        'as',
        'children',
        'ref',
      ])}
      data-sh-command-bar-overlay={context.ownerID}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type CommandBarDescriptionProps<T extends ValidConstructor = 'p'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function CommandBarDescription<T extends ValidConstructor = 'p'>(
  props: CommandBarDescriptionProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarDescription');

  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.descriptionID}
      data-sh-command-bar-description={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
