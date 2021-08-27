import { JSX } from 'solid-js/jsx-runtime';
import {
  Show,
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

export type TailwindDisclosureProps<T extends ValidConstructor = typeof Fragment> = {
  as?: T;
} & HeadlessDisclosureRootProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindDisclosure(props: TailwindDisclosureProps): JSX.Element {
  return (
    <HeadlessDisclosureRoot
      isOpen={props.isOpen}
      initialOpen={props.initialOpen}
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
        <HeadlessDisclosureChild>
          {props.children}
        </HeadlessDisclosureChild>
      </Dynamic>
    </HeadlessDisclosureRoot>
  );
}

export type TailwindDisclosureButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindDisclosureButton<T extends ValidConstructor = 'button'>(
  props: TailwindDisclosureButtonProps<T>,
): JSX.Element {
  const [visible, setVisible] = useHeadlessDisclosureChild();

  return (
    <Dynamic
      component={(props.as ?? 'button') as T}
      {...excludeProps(props, [
        'as',
        'onClick',
        'children',
      ])}
      onClick={() => {
        if (props.as && typeof props.as !== 'function' && 'onClick' in props) {
          props.onClick();
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
