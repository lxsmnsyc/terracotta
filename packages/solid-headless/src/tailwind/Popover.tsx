import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createEffect,
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
import useClickOutside from '../utils/use-click-outside';
import getFocusableElements from '../utils/get-focusable-elements';

interface TailwindPopoverContext {
  ownerID: string;
  buttonID: string;
  panelID: string;
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

export function TailwindPopover(props: TailwindPopoverProps): JSX.Element {
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

  let internalRef: HTMLElement;

  createEffect(() => {
    const toggle = () => {
      if (!properties.disabled()) {
        properties.setState(!properties.isOpen());
      }
    };

    internalRef.addEventListener('click', toggle);

    onCleanup(() => {
      internalRef.removeEventListener('click', toggle);
    });
  });

  return (
    <Dynamic
      component={TailwindButton}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      as={props.as}
      id={context.buttonID}
      aria-expanded={properties.isOpen()}
      aria-controls={properties.isOpen() && context.panelID}
      disabled={properties.disabled()}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
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
            properties.setState(false);
          }
        }
      };

      internalRef.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        internalRef.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  useClickOutside(
    () => internalRef,
    () => {
      properties.setState(false);
    },
    () => context.anchor,
  );

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
            internalRef = e;
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
            internalRef = e;
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
