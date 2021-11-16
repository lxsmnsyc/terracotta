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

interface DialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

const DialogContext = createContext<DialogContext>();

function useDialogContext(componentName: string): DialogContext {
  const context = useContext(DialogContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Dialog>`);
}

export type DialogProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
} & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;

export function Dialog<T extends ValidConstructor = 'div'>(
  props: DialogProps<T>,
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
    <DialogContext.Provider
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
                data-sh-dialog={ownerID}
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
                data-sh-dialog={ownerID}
              >
                <HeadlessDisclosureChild>
                  {props.children}
                </HeadlessDisclosureChild>
              </Dynamic>
            </Show>
          </Show>
        )}
      </HeadlessDisclosureRoot>
    </DialogContext.Provider>
  );
}

export type DialogTitleProps<T extends ValidConstructor = 'h2'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function DialogTitle<T extends ValidConstructor = 'h2'>(
  props: DialogTitleProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogTitle');
  return (
    <Dynamic
      component={(props.as ?? 'h2') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.titleID}
      data-sh-dialog-title={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type DialogPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function DialogPanel<T extends ValidConstructor = 'div'>(
  props: DialogPanelProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogPanel');
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
      data-sh-dialog-panel={context.ownerID}
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

export type DialogOverlayProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function DialogOverlay<T extends ValidConstructor = 'p'>(
  props: DialogOverlayProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogOverlay');
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
      data-sh-dialog-overlay={context.ownerID}
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

export type DialogDescriptionProps<T extends ValidConstructor = 'p'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function DialogDescription<T extends ValidConstructor = 'p'>(
  props: DialogDescriptionProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogDescription');

  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.descriptionID}
      data-sh-dialog-description={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
