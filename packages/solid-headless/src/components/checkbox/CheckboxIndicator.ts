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
} from '../../headless/toggle/HeadlessToggleChild';
import {
  useHeadlessToggleProperties,
} from '../../headless/toggle/HeadlessToggleContext';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  Button, ButtonProps,
} from '../button';
import {
  useCheckboxContext,
} from './CheckboxContext';

export type CheckboxIndicatorProps<T extends ValidConstructor = typeof Button> =
  HeadlessPropsWithRef<T, HeadlessToggleChildProps>;

export function CheckboxIndicator<T extends ValidConstructor = typeof Button>(
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
    {
      id: context.indicatorID,
      role: 'checkbox',
      'data-sh-checkbox-indicator': context.ownerID,
      'aria-labelledby': context.labelID,
      'aria-describedby': context.descriptionID,
      get disabled() {
        return state.disabled();
      },
      get 'aria-disabled'() {
        return state.disabled();
      },
      get 'data-sh-disabled'() {
        return state.disabled();
      },
      get 'aria-checked'() {
        return state.checked() == null ? 'mixed' : state.checked();
      },
      get 'data-sh-checked'() {
        return state.checked();
      },
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),

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
