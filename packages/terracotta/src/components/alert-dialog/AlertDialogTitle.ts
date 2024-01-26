import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_TITLE_TAG } from './tags';

export type AlertDialogTitleProps<T extends ValidConstructor = 'h2'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function AlertDialogTitle<T extends ValidConstructor = 'h2'>(
  props: AlertDialogTitleProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogTitle');
  const state = useDisclosureState();

  return createDynamic(
    () => props.as || ('h2' as T),
    mergeProps(
      omitProps(props, ['as', 'children']),
      ALERT_DIALOG_TITLE_TAG,
      {
        id: context.titleID,
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
