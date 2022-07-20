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
  HeadlessDisclosureChildProps,
  useHeadlessDisclosureProperties,
  createHeadlessDisclosureChildProps,
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
  useCommandBarContext,
} from './CommandBarContext';
import { COMMAND_BAR_PANEL_TAG } from './tags';

export type CommandBarPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;

export function CommandBarPanel<T extends ValidConstructor = 'div'>(
  props: CommandBarPanelProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarPanel');
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

        ref.addEventListener('keydown', onKeyDown);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
        });
      }
    }
  });

  return createDynamic(
    () => props.as ?? ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
        'ref',
      ]),
      COMMAND_BAR_PANEL_TAG,
      {
        id: context.panelID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
