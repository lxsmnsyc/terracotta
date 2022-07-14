import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessToggleChildProps,
  HeadlessToggleChild,
  useHeadlessToggleProperties,
} from '../../headless/toggle';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createChecked,
  createDisabled,
} from '../../utils/state-props';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  useCheckboxContext,
} from './CheckboxContext';
import { CHECKBOX_INDICATOR } from './tags';

export type CheckboxIndicatorProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, HeadlessToggleChildProps>;

export function CheckboxIndicator<T extends ValidConstructor = 'button'>(
  props: CheckboxIndicatorProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxIndicator');
  const state = useHeadlessToggleProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const toggle = () => {
        state.setState(!state.checked());
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') {
          toggle();
        }
      };

      ref.addEventListener('click', toggle);
      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('click', toggle);
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'children',
      'ref',
    ]),
    CHECKBOX_INDICATOR,
    {
      id: context.indicatorID,
      role: 'checkbox',
      'aria-labelledby': context.labelID,
      'aria-describedby': context.descriptionID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
    },
    createDisabled(() => state.disabled()),
    createChecked(() => state.checked()),
    {
      get children() {
        return createComponent(HeadlessToggleChild, {
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
