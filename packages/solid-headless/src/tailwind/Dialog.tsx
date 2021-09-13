import {
  createContext,
  createEffect,
  createUniqueId,
  useContext,
  Show,
  onCleanup,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import {
  HeadlessDisclosureChild,
  HeadlessDisclosureChildProps,
  HeadlessDisclosureRoot,
  HeadlessDisclosureRootProps,
  useHeadlessDisclosureChild,
} from '../headless/Disclosure';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import getFocusableElements from '../utils/get-focusable-elements';
import useClickOutside from '../utils/use-click-outside';

interface TailwindDialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
  onClose?: () => void;
}

const TailwindDialogContext = createContext<TailwindDialogContext>();

function useTailwindDialogContext(componentName: string): TailwindDialogContext {
  const context = useContext(TailwindDialogContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindDialog>`);
}

export type TailwindDialogProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  onClose?: () => void;
} & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | 'unmount'>;

export function TailwindDialog<T extends ValidConstructor = 'div'>(
  props: TailwindDialogProps<T>,
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
    <TailwindDialogContext.Provider
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
    </TailwindDialogContext.Provider>
  );
}

export type TailwindDialogTitleProps<T extends ValidConstructor = 'h2'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDialogTitle<T extends ValidConstructor = 'h2'>(
  props: TailwindDialogTitleProps<T>,
): JSX.Element {
  const context = useTailwindDialogContext('TailwindDialogTitle');
  return (
    <Dynamic
      component={(props.as ?? 'h2') as T}
      {...excludeProps(props, [
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

export type TailwindDialogPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDialogPanel<T extends ValidConstructor = 'div'>(
  props: TailwindDialogPanelProps<T>,
): JSX.Element {
  const context = useTailwindDialogContext('TailwindDialogPanel');
  const properties = useHeadlessDisclosureChild();

  let internalRef: HTMLElement;

  createEffect(() => {
    if (properties.isOpen()) {
      const initialNodes = getFocusableElements(internalRef);
      if (initialNodes.length) {
        initialNodes[0].focus();
      }

      const onKeyDown = (e: KeyboardEvent) => {
        if (!props.disabled) {
          if (e.key === 'Tab') {
            e.preventDefault();

            const nodes = getFocusableElements(internalRef);
            if (e.shiftKey) {
              if (!document.activeElement || !internalRef.contains(document.activeElement)) {
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
            } else if (!document.activeElement || !internalRef.contains(document.activeElement)) {
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

      internalRef.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        internalRef.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  useClickOutside(() => internalRef, () => {
    if (context.onClose) {
      context.onClose();
    } else {
      properties.setState(false);
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
      data-sh-dialog-panel={context.ownerID}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
      }}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type TailwindDialogDescriptionProps<T extends ValidConstructor = 'p'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDialogDescription<T extends ValidConstructor = 'p'>(
  props: TailwindDialogDescriptionProps<T>,
): JSX.Element {
  const context = useTailwindDialogContext('TailwindDialogDescription');

  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...excludeProps(props, [
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
