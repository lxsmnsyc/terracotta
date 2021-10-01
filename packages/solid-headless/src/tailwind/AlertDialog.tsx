import {
  createContext,
  createEffect,
  createUniqueId,
  useContext,
  Show,
  onCleanup,
  createSignal,
} from 'solid-js';
import {
  JSX,
} from 'solid-js/jsx-runtime';
import {
  Dynamic,
} from 'solid-js/web';
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
import {
  excludeProps,
} from '../utils/exclude-props';
import getFocusableElements from '../utils/get-focusable-elements';

interface TailwindAlertDialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
  onClose?: () => void;
}

const TailwindAlertDialogContext = createContext<TailwindAlertDialogContext>();

function useTailwindAlertDialogContext(componentName: string): TailwindAlertDialogContext {
  const context = useContext(TailwindAlertDialogContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindAlertDialog>`);
}

export type TailwindAlertDialogProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  onClose?: () => void;
} & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;

export function TailwindAlertDialog<T extends ValidConstructor = 'div'>(
  props: TailwindAlertDialogProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  const returnElement = document.activeElement as HTMLElement | null;

  createEffect(() => {
    if (!props.isOpen) {
      props.onClose?.();
      returnElement?.focus();
    }
  });

  onCleanup(() => {
    props.onClose?.();
    returnElement?.focus();
  });

  return (
    <TailwindAlertDialogContext.Provider
      value={{
        ownerID,
        panelID,
        titleID,
        descriptionID,
        onClose: props.onClose,
      }}
    >
      <HeadlessDisclosureRoot
        isOpen={props.isOpen}
        onChange={props.onChange}
        defaultOpen={props.defaultOpen}
        disabled={props.disabled}
      >
        {({ isOpen }) => (
          <Show
            when={props.unmount ?? true}
            fallback={(
              <Dynamic
                component={props.as ?? 'div'}
                {...excludeProps(props, [
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
                role="alertdialog"
                aria-modal
                aria-labelledby={titleID}
                aria-describedby={descriptionID}
                data-sh-alert-dialog={ownerID}
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
                {...excludeProps(props, [
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
                role="alertdialog"
                aria-modal
                aria-labelledby={titleID}
                aria-describedby={descriptionID}
                data-sh-alert-dialog={ownerID}
              >
                <HeadlessDisclosureChild>
                  {props.children}
                </HeadlessDisclosureChild>
              </Dynamic>
            </Show>
          </Show>
        )}
      </HeadlessDisclosureRoot>
    </TailwindAlertDialogContext.Provider>
  );
}

export type TailwindAlertDialogTitleProps<T extends ValidConstructor = 'h2'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindAlertDialogTitle<T extends ValidConstructor = 'h2'>(
  props: TailwindAlertDialogTitleProps<T>,
): JSX.Element {
  const context = useTailwindAlertDialogContext('TailwindAlertDialogTitle');
  return (
    <Dynamic
      component={(props.as ?? 'h2') as T}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.titleID}
      data-sh-alert-dialog-title={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type TailwindAlertDialogPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindAlertDialogPanel<T extends ValidConstructor = 'div'>(
  props: TailwindAlertDialogPanelProps<T>,
): JSX.Element {
  const context = useTailwindAlertDialogContext('TailwindAlertDialogPanel');
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
              if (context.onClose) {
                context.onClose();
              } else {
                properties.setState(false);
              }
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
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.panelID}
      data-sh-alert-dialog-panel={context.ownerID}
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

export type TailwindAlertDialogOverlayProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindAlertDialogOverlay<T extends ValidConstructor = 'div'>(
  props: TailwindAlertDialogOverlayProps<T>,
): JSX.Element {
  const context = useTailwindAlertDialogContext('TailwindAlertDialogOverlay');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = () => {
        if (context.onClose) {
          context.onClose();
        } else {
          properties.setState(false);
        }
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
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      data-sh-alert-dialog-overlay={context.ownerID}
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

export type TailwindAlertDialogDescriptionProps<T extends ValidConstructor = 'p'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindAlertDialogDescription<T extends ValidConstructor = 'p'>(
  props: TailwindAlertDialogDescriptionProps<T>,
): JSX.Element {
  const context = useTailwindAlertDialogContext('TailwindAlertDialogDescription');

  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.descriptionID}
      data-sh-alert-dialog-description={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
