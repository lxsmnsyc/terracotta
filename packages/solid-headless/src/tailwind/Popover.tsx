import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  Show,
  useContext,
} from 'solid-js';
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
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import { TailwindButton, TailwindButtonProps } from './Button';
import getFocusableElements from '../utils/get-focusable-elements';

interface TailwindPopoverContext {
  ownerID: string;
  buttonID: string;
  panelID: string;
  hovering: boolean;
  anchor?: HTMLElement | null;
}

const TailwindPopoverContext = createContext<TailwindPopoverContext>();

function useTailwindPopoverContext(componentName: string): TailwindPopoverContext {
  const context = useContext(TailwindPopoverContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindPopover>`);
}

export type TailwindPopoverProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindPopover<T extends ValidConstructor = 'div'>(
  props: TailwindPopoverProps<T>,
): JSX.Element {
  const [hovering, setHovering] = createSignal(false);
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  const returnElement = document.activeElement as HTMLElement | null;

  createEffect(() => {
    if (!props.isOpen) {
      returnElement?.focus();
    }
  });

  onCleanup(() => {
    if (!props.isOpen) {
      returnElement?.focus();
    }
  });

  return (
    <TailwindPopoverContext.Provider
      value={{
        ownerID,
        buttonID,
        panelID,
        get hovering() {
          return hovering();
        },
        set hovering(value: boolean) {
          setHovering(value);
        },
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
          'isOpen',
          'as',
          'children',
          'disabled',
          'defaultOpen',
          'onChange',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-popover={ownerID}
      >
        <HeadlessDisclosureRoot
          isOpen={props.isOpen}
          onChange={props.onChange}
          disabled={props.disabled}
          defaultOpen={props.defaultOpen}
        >
          {props.children}
        </HeadlessDisclosureRoot>
      </Dynamic>
    </TailwindPopoverContext.Provider>
  );
}

export type TailwindPopoverButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<TailwindButtonProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindPopoverButton<T extends ValidConstructor = 'button'>(
  props: TailwindPopoverButtonProps<T>,
): JSX.Element {
  const context = useTailwindPopoverContext('TailwindPopoverButton');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const ref = internalRef();
    if (ref) {
      const toggle = () => {
        if (!properties.disabled()) {
          properties.setState(!properties.isOpen());
        }
      };

      ref.addEventListener('click', toggle);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
      });

      const onMouseEnter = () => {
        context.hovering = true;
      };
      const onMouseLeave = () => {
        context.hovering = false;
      };

      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  return (
    <Dynamic
      component={TailwindButton}
      {...excludeProps(props, [
        'children',
      ])}
      id={context.buttonID}
      aria-disabled={properties.disabled()}
      aria-expanded={properties.isOpen()}
      aria-controls={properties.isOpen() && context.panelID}
      data-sh-disabled={properties.disabled()}
      data-sh-expanded={properties.isOpen()}
      disabled={properties.disabled()}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        setInternalRef(e);
        context.anchor = e;
      }}
      data-sh-popover-button={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type TailwindPopoverPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindPopoverPanel<T extends ValidConstructor = 'div'>(
  props: TailwindPopoverPanelProps<T>,
): JSX.Element {
  const context = useTailwindPopoverContext('TailwindPopoverPanel');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const ref = internalRef();
    if (ref) {
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

        const onBlur = (e: FocusEvent) => {
          if (context.hovering) {
            return;
          }
          if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
            properties.setState(false);
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        ref.addEventListener('focusout', onBlur);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
          ref.removeEventListener('focusout', onBlur);
        });
      }
    }
  });

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
            'as',
            'unmount',
            'children',
          ])}
          id={context.panelID}
          data-sh-popover-panel={context.ownerID}
          ref={(e) => {
            const outerRef = props.ref;
            if (typeof outerRef === 'function') {
              outerRef(e);
            } else {
              props.ref = e;
            }
            setInternalRef(e);
          }}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      )}
    >
      <Show when={properties.isOpen()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
            'as',
            'unmount',
            'children',
          ])}
          id={context.panelID}
          data-sh-popover-panel={context.ownerID}
          ref={(e) => {
            const outerRef = props.ref;
            if (typeof outerRef === 'function') {
              outerRef(e);
            } else {
              props.ref = e;
            }
            setInternalRef(e);
          }}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      </Show>
    </Show>
  );
}

export type TailwindPopoverOverlayProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindPopoverOverlay<T extends ValidConstructor = 'p'>(
  props: TailwindPopoverOverlayProps<T>,
): JSX.Element {
  const context = useTailwindPopoverContext('TailwindPopoverOverlay');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const ref = internalRef();
    if (ref) {
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
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      data-sh-popover-overlay={context.ownerID}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        setInternalRef(e);
      }}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
