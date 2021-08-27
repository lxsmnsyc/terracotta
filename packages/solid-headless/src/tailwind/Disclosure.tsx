import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createUniqueId,
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

interface TailwindDisclosureContext {
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
} & HeadlessDisclosureRootProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindDisclosure(props: TailwindDisclosureProps): JSX.Element {
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return (
    <TailwindDisclosureContext.Provider
      value={{
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...excludeProps(props, [
          'initialOpen',
          'isOpen',
          'as',
          'children',
        ])}
      >
        <HeadlessDisclosureRoot
          isOpen={props.isOpen}
          initialOpen={props.initialOpen}
        >
          {props.children}
        </HeadlessDisclosureRoot>
      </Dynamic>
    </TailwindDisclosureContext.Provider>
  );
}

export type TailwindDisclosureButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindDisclosureButton<T extends ValidConstructor = 'button'>(
  props: TailwindDisclosureButtonProps<T>,
): JSX.Element {
  const context = useTailwindDisclosureContext('TailwindDisclosureButton');
  const [visible, setVisible] = useHeadlessDisclosureChild();

  return (
    <Dynamic
      component={(props.as ?? 'button') as T}
      {...excludeProps(props, [
        'as',
        'onClick',
        'children',
      ])}
      id={context.buttonID}
      aria-expanded={visible()}
      aria-controls={visible() && context.panelID}
      onClick={(e) => {
        if (props.as && typeof props.as !== 'function' && 'onClick' in props) {
          props.onClick(e);
        }
        setVisible(!visible());
      }}
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
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindDisclosurePanel<T extends ValidConstructor = 'div'>(
  props: TailwindDisclosurePanelProps<T>,
): JSX.Element {
  const context = useTailwindDisclosureContext('TailwindDisclosurePanel');
  const [visible] = useHeadlessDisclosureChild();
  return (
    <>
      {(() => {
        const constructor = (props.as ?? 'div') as T;
        const unmount = props.unmount ?? true;
        if (unmount) {
          return (
            <Show when={visible()}>
              <Dynamic
                component={constructor}
                {...excludeProps(props, [
                  'as',
                  'unmount',
                  'children',
                ])}
                id={context.panelID}
              >
                <HeadlessDisclosureChild>
                  {props.children}
                </HeadlessDisclosureChild>
              </Dynamic>
            </Show>
          );
        }
        return (
          <Dynamic
            component={constructor}
            {...excludeProps(props, [
              'as',
              'unmount',
              'children',
            ])}
            id={context.panelID}
          >
            <HeadlessDisclosureChild>
              {props.children}
            </HeadlessDisclosureChild>
          </Dynamic>
        );
      })()}
    </>
  );
}
