import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_DESCRIPTION_TAG } from './tags';

export type AlertDialogDescriptionProps<T extends ValidComponent = 'p'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function AlertDialogDescription<T extends ValidComponent = 'p'>(
  props: AlertDialogDescriptionProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogDescription');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as || ('p' as T),
    merge(
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
    ) as ComponentProps<T>,
  );
}
