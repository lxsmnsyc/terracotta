import {
  createContext,
  createUniqueId,
  useContext,
  Show,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import {
  Dynamic,
} from 'solid-js/web';
import {
  HeadlessSelectOption,
  HeadlessSelectOptionChild,
  HeadlessSelectOptionChildProps,
  HeadlessSelectOptionProps,
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
  useHeadlessSelectOptionChild,
} from '../headless/Select';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';

interface TailwindAccordionItemContext {
  buttonID: string;
  panelID: string;
}

const TailwindAccordionItemContext = createContext<TailwindAccordionItemContext>();

function useTailwindAccordionItemContext(componentName: string): TailwindAccordionItemContext {
  const context = useContext(TailwindAccordionItemContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindAccordionItem>`);
}

export type TailwindAccordionProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectRootProps<V> & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordion<V, T extends ValidConstructor = 'div'>(
  props: TailwindAccordionProps<V, T>,
): JSX.Element {
  return (
    <Dynamic
      component={props.as ?? 'div'}
      {...excludeProps(props, [
        'as',
        'children',
        'disabled',
        'onChange',
        'type',
        'value',
      ])}
    >
      <HeadlessSelectRoot
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
      >
        {props.children}
      </HeadlessSelectRoot>
    </Dynamic>
  );
}

export type TailwindAccordionItemProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectOptionProps<V> & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordionItem<V, T extends ValidConstructor = 'div'>(
  props: TailwindAccordionItemProps<V, T>,
): JSX.Element {
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return (
    <TailwindAccordionItemContext.Provider
      value={{
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
          'as',
          'children',
          'value',
          'disabled',
        ])}
      >
        <HeadlessSelectOption
          value={props.value}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessSelectOption>
      </Dynamic>
    </TailwindAccordionItemContext.Provider>
  );
}

export type TailwindAccordionHeaderProps<T extends ValidConstructor = 'h3'> = {
  as?: T;
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordionHeader<T extends ValidConstructor = 'h3'>(
  props: TailwindAccordionHeaderProps<T>,
): JSX.Element {
  return (
    <Dynamic
      component={props.as ?? 'h3'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
    >
      <HeadlessSelectOptionChild>
        {props.children}
      </HeadlessSelectOptionChild>
    </Dynamic>
  );
}

export type TailwindAccordionButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordionButton<T extends ValidConstructor = 'button'>(
  props: TailwindAccordionButtonProps<T>,
): JSX.Element {
  const context = useTailwindAccordionItemContext('TailwindAccordionButton');
  const [isSelected, addSelected, disabled] = useHeadlessSelectOptionChild();

  return (
    <Dynamic
      component={props.as ?? 'button'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.buttonID}
      aria-expanded={isSelected()}
      aria-controls={isSelected() && context.panelID}
      onClick={(e) => {
        if (props.as && typeof props.as !== 'function' && 'onClick' in props) {
          props.onClick(e);
        }
        addSelected();
      }}
      disabled={disabled()}
    >
      <HeadlessSelectOptionChild>
        {props.children}
      </HeadlessSelectOptionChild>
    </Dynamic>
  );
}

export type TailwindAccordionPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordionPanel<T extends ValidConstructor = 'div'>(
  props: TailwindAccordionPanelProps<T>,
): JSX.Element {
  const context = useTailwindAccordionItemContext('TailwindAccordionPanel');
  const [isSelected] = useHeadlessSelectOptionChild();

  return (
    <>
      {(() => {
        const constructor = (props.as ?? 'div') as T;
        const unmount = props.unmount ?? true;
        if (unmount) {
          return (
            <Show when={isSelected()}>
              <Dynamic
                component={constructor}
                {...excludeProps(props, [
                  'as',
                  'children',
                ])}
                id={context.panelID}
                aria-labelledby={context.buttonID}
              >
                <HeadlessSelectOptionChild>
                  {props.children}
                </HeadlessSelectOptionChild>
              </Dynamic>
            </Show>
          );
        }
        return (
          <Dynamic
            component={constructor}
            {...excludeProps(props, [
              'as',
              'children',
            ])}
            id={context.panelID}
            aria-labelledby={context.buttonID}
          >
            <HeadlessSelectOptionChild>
              {props.children}
            </HeadlessSelectOptionChild>
          </Dynamic>
        );
      })()}
    </>
  );
}
