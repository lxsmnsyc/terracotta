import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessSelectOptionProps,
  HeadlessSelectOptionProps,
  useHeadlessSelectProperties,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createDisabled,
  createSelected,
} from '../../utils/state-props';
import {
  useTabGroupContext,
} from './TabGroupContext';
import { useTabListContext } from './TabListContext';
import { TAB_TAG } from './tags';

export type TabProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessSelectOptionProps<V>>;

export function Tab<V, T extends ValidConstructor = 'div'>(
  props: TabProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('Tab');
  const listContext = useTabListContext('Tab');
  const properties = useHeadlessSelectProperties<V>();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!isDisabled()) {
          switch (e.key) {
            case 'ArrowUp':
              if (!rootContext.horizontal) {
                e.preventDefault();
                listContext.setPrevChecked(ref);
              }
              break;
            case 'ArrowLeft':
              if (rootContext.horizontal) {
                e.preventDefault();
                listContext.setPrevChecked(ref);
              }
              break;
            case 'ArrowDown':
              if (!rootContext.horizontal) {
                e.preventDefault();
                listContext.setNextChecked(ref);
              }
              break;
            case 'ArrowRight':
              if (rootContext.horizontal) {
                e.preventDefault();
                listContext.setNextChecked(ref);
              }
              break;
            case ' ':
            case 'Enter':
              if (ref.tagName === 'BUTTON') {
                e.preventDefault();
              }
              listContext.setChecked(ref);
              break;
            case 'Home':
              e.preventDefault();
              listContext.setFirstChecked();
              break;
            case 'End':
              e.preventDefault();
              listContext.setLastChecked();
              break;
            default:
              break;
          }
        }
      };
      const onClick = () => {
        if (!isDisabled()) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!isDisabled()) {
          properties.focus(props.value);
          properties.select(props.value);
        }
      };
      const onBlur = () => {
        if (!isDisabled()) {
          properties.blur();
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
      });
    }
  });

  return createDynamic(
    () => props.as ?? ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
        'value',
        'disabled',
        'ref',
      ]),
      TAB_TAG,
      createOwnerAttribute(listContext.getId()),
      {
        role: 'tab',
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
        get tabindex() {
          return properties.isSelected(props.value) ? 0 : -1;
        },
        get id() {
          return rootContext.getId('tab', props.value);
        },
        get 'aria-controls'() {
          return rootContext.getId('tab-panel', props.value);
        },
      },
      createDisabled(isDisabled),
      createSelected(() => properties.isSelected(props.value)),
      createHeadlessSelectOptionProps(props),
    ) as DynamicProps<T>,
  );
}
