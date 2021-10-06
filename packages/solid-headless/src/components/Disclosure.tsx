import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  Show,
  useContext,
  JSX,
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
import Fragment from '../utils/Fragment';
import {
  TailwindButton,
  TailwindButtonProps,
} from './Button';

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

export function TailwindDisclosure<T extends ValidConstructor = typeof Fragment>(
  props: TailwindDisclosureProps<T>,
): JSX.Element {
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
          'onChange',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-disclosure={ownerID}
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
    </TailwindDisclosureContext.Provider>
  );
}

export type TailwindDisclosureButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessDisclosureChildProps
  & WithRef<T>
  & Omit<TailwindButtonProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindDisclosureButton<T extends ValidConstructor = 'button'>(
  props: TailwindDisclosureButtonProps<T>,
): JSX.Element {
  const context = useTailwindDisclosureContext('TailwindDisclosureButton');
  const properties = useHeadlessDisclosureChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };

      ref.addEventListener('click', toggle);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
      });
    }
  });

  return (
    <Dynamic
      component={TailwindButton}
      {...excludeProps(props, [
        'children',
        'ref',
      ])}
      id={context.buttonID}
      aria-disabled={properties.disabled() || props.disabled}
      aria-expanded={properties.isOpen()}
      aria-controls={properties.isOpen() && context.panelID}
      data-sh-expanded={properties.isOpen()}
      data-sh-disabled={properties.disabled() || props.disabled}
      disabled={properties.disabled() || props.disabled}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
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