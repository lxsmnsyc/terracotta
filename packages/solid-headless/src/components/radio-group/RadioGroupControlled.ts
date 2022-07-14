import {
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  createComponent,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessSelectRootSingleControlledProps,
  HeadlessSelectRootChildren,
  HeadlessSelectSingleControlledOptions,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
} from '../../utils/state-props';
import {
  RadioGroupContext,
} from './RadioGroupContext';
import {
  createRadioGroupOptionFocusNavigator,
  RadioGroupRootContext,
} from './RadioGroupRootContext';
import { RADIO_GROUP_TAG } from './tags';

export type RadioGroupControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<
    T,
    HeadlessSelectSingleControlledOptions<V> & HeadlessSelectRootChildren<V>
  >;

export function RadioGroupControlled<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupControlledProps<V, T>,
): JSX.Element {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  return createComponent(RadioGroupRootContext.Provider, {
    value: controller,
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID,
        },
        get children() {
          return createDynamic(
            () => props.as ?? ('div' as T),
            mergeProps(
              omitProps(props, [
                'as',
                'children',
                'value',
                'disabled',
                'onChange',
                'ref',
              ]),
              RADIO_GROUP_TAG,
              {
                role: 'radiogroup',
                'aria-labelledby': labelID,
                'aria-describedby': descriptionID,
                ref: createRef(props, (e) => {
                  controller.setRef(e);
                }),
              },
              createDisabled(() => props.disabled),
              createHeadlessSelectRootSingleControlledProps(props),
            ) as DynamicProps<T>,
          );
        },
      });
    },
  });
}
