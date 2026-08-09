import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { DynamicProps, HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_DESCRIPTION_TAG } from './tags';

export type AlertDialogDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible description of an `AlertDialog`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function AlertDialogDescription<T extends ValidConstructor = 'p'>(
  props: AlertDialogDescriptionProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogDescription');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as ?? ('p' as T),
    mergeProps(
      omitProps(props, ['as', 'children']),
      ALERT_DIALOG_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => state.disabled()),
      createExpandedState(() => state.isOpen()),
    ) as DynamicProps<T>,
  );
}
