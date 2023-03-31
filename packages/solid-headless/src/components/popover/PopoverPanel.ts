import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessDisclosureChildProps,
  HeadlessDisclosureChildProps,
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  createUnmountable,
  UnmountableProps,
} from '../../utils/create-unmountable';
import {
  usePopoverContext,
} from './PopoverContext';
import { POPOVER_PANEL_TAG } from './tags';

export type PopoverPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps & UnmountableProps>;

export function PopoverPanel<T extends ValidConstructor = 'div'>(
  props: PopoverPanelProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverPanel');
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        focusFirst(getFocusableElements(ref));

        const onKeyDown = (e: KeyboardEvent) => {
          if (!props.disabled) {
            if (e.key === 'Tab') {
              e.preventDefault();

              lockFocus(ref, e.shiftKey);
            } else if (e.key === 'Escape') {
              properties.setState(false);
            }
          }
        };

        const onBlur = (e: FocusEvent) => {
          if (context.hovering) {
            return;
          }
          if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
            properties.setState(false);
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        ref.addEventListener('focusout', onBlur);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
          ref.removeEventListener('focusout', onBlur);
        });
      }
    }
  });

  return createUnmountable(
    props,
    () => properties.isOpen(),
    () => createDynamic(
      () => props.as ?? ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'unmount',
          'children',
          'ref',
        ]),
        POPOVER_PANEL_TAG,
        {
          id: context.panelID,
          ref: createRef(props, (e) => {
            setInternalRef(() => e);
          }),
        },
        createHeadlessDisclosureChildProps(props),
      ) as DynamicProps<T>,
    ),
  );
}
