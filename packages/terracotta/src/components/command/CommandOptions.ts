import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabledState,
} from '../../utils/state-props';
import {
  useCommandContext,
} from './CommandContext';
import { COMMAND_OPTIONS_TAG } from './tags';
import {
  SelectStateChild,
  SelectStateRenderProps,
  useSelectState,
} from '../../states/create-select-state';

export type CommandOptionsProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, SelectStateRenderProps<V>>;

export function CommandOptions<V, T extends ValidConstructor = 'ul'>(
  props: CommandOptionsProps<V, T>,
): JSX.Element {
  const context = useCommandContext('CommandOptions');
  const state = useSelectState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      context.controller.setRef(ref);

      const onFocusIn = (e: FocusEvent) => {
        if (e.target && e.target !== ref) {
          context.controller.setCurrent(e.target as HTMLElement);
        }
      };
      ref.addEventListener('focusin', onFocusIn);
      onCleanup(() => {
        ref.removeEventListener('focusin', onFocusIn);
      });
    }
  });

  return createDynamic(
    () => props.as || ('ul' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
        'ref',
      ]),
      COMMAND_OPTIONS_TAG,
      {
        id: context.optionsID,
        role: 'listbox',
        'aria-multiselectable': context.multiple,
        ref: setInternalRef,
        // TODO should Command support "horizontal"?
        'aria-orientation': 'vertical',
        tabindex: -1,
      },
      createDisabledState(() => state.disabled()),
      {
        get children() {
          return createComponent(SelectStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
