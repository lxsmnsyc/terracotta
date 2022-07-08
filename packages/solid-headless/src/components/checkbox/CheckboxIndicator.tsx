import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
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
  DynamicComponentWithRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useCheckboxContext,
} from './CheckboxContext';

export type CheckboxIndicatorProps<T extends ValidConstructor = 'button'> =
  & DynamicComponentWithRef<T>
  & HeadlessToggleChildProps
  & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;

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

  return (
    <Dynamic
      component={props.as ?? 'button'}
      {...omitProps(props, [
        'as',
        'children',
        'ref',
      ])}
      id={context.indicatorID}
      role="checkbox"
      data-sh-checkbox-indicator={context.ownerID}
      aria-labelledby={context.labelID}
      aria-describedby={context.descriptionID}
      aria-disabled={state.disabled()}
      aria-checked={state.checked() == null ? 'mixed' : state.checked()}
      data-sh-disabled={state.disabled()}
      data-sh-checked={state.checked()}
      disabled={state.disabled()}
      tabindex={0}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    >
      <HeadlessToggleChild>
        {props.children}
      </HeadlessToggleChild>
    </Dynamic>
  );
}
