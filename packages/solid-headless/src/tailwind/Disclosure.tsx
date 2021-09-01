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
import Fragment from '../utils/Fragment';
import { TailwindButton, TailwindButtonProps } from './Button';

interface TailwindDisclosureContext {
  ownerID: string;
  buttonID: string;
  panelID: string;
}

const TailwindDisclosureContext = createContext<TailwindDisclosureContext>();

function useTailwindDisclosureContext(componentName: string): TailwindDisclosureContext {
  const context = useContext(TailwindDisclosureContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindDisclosure>`);
}

export type TailwindDisclosureProps<T extends ValidConstructor = typeof Fragment> = {
  as?: T;
} & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDisclosure(props: TailwindDisclosureProps): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return (
    <TailwindDisclosureContext.Provider
      value={{
        ownerID,
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...excludeProps(props, [
          'isOpen',
          'as',
          'children',
          'disabled',
          'defaultOpen',
        ])}
        data-sh-disclosure={ownerID}
      >
        <HeadlessDisclosureRoot
          isOpen={props.isOpen}
          defaultOpen={props.defaultOpen}
        >
          {props.children}
        </HeadlessDisclosureRoot>
      </Dynamic>
    </TailwindDisclosureContext.Provider>
  );
}

export type TailwindDisclosureButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & Omit<TailwindButtonProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDisclosureButton<T extends ValidConstructor = 'button'>(
  props: TailwindDisclosureButtonProps<T>,
): JSX.Element {
  const context = useTailwindDisclosureContext('TailwindDisclosureButton');
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
      }}
      data-sh-disclosure-button={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type TailwindDisclosurePanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
} & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDisclosurePanel<T extends ValidConstructor = 'div'>(
  props: TailwindDisclosurePanelProps<T>,
): JSX.Element {
  const context = useTailwindDisclosureContext('TailwindDisclosurePanel');
  const properties = useHeadlessDisclosureChild();
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
          data-sh-disclosure-panel={context.ownerID}
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
          data-sh-disclosure-panel={context.ownerID}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      </Show>
    </Show>
  );
}
