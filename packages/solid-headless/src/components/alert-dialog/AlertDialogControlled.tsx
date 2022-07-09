import {
  createUniqueId,
  JSX,
  Show,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  HeadlessDisclosureRoot,
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure/HeadlessDisclosureRoot';
import {
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  AlertDialogContext,
} from './AlertDialogContext';
import {
  AlertDialogBaseProps,
} from './types';

export type AlertDialogControlledBaseProps<T extends ValidConstructor = 'div'> =
  & AlertDialogBaseProps<T>
  & HeadlessDisclosureControlledOptions
  & HeadlessDisclosureRootChildren;

export type AlertDialogControlledProps<T extends ValidConstructor = 'div'> =
  OmitAndMerge<AlertDialogControlledBaseProps<T>, DynamicProps<T>>;

export function AlertDialogControlled<T extends ValidConstructor = 'div'>(
  props: AlertDialogControlledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  const fsp = useFocusStartPoint();

  return (
    <AlertDialogContext.Provider
      value={{
        ownerID,
        panelID,
        titleID,
        descriptionID,
      }}
    >
      <HeadlessDisclosureRoot
        isOpen={props.isOpen}
        onChange={(value) => {
          props.onChange?.(value);
          if (!value) {
            props.onClose?.();
            fsp.load();
          } else {
            fsp.save();
            props.onOpen?.();
          }
        }}
        disabled={props.disabled}
      >
        {({ isOpen }) => (
          <Show
            when={props.unmount ?? true}
            fallback={(
              <Dynamic
                component={props.as ?? 'div'}
                {...omitProps(props, [
                  'as',
                  'children',
                  'unmount',
                  'isOpen',
                  'disabled',
                  'onOpen',
                  'onClose',
                  'onChange',
                ])}
                id={ownerID}
                role="alertdialog"
                aria-modal
                aria-labelledby={titleID}
                aria-describedby={descriptionID}
                data-sh-alert-dialog={ownerID}
              >
                <HeadlessDisclosureChild>
                  {props.children}
                </HeadlessDisclosureChild>
              </Dynamic>
            )}
          >
            <Show when={isOpen()}>
              <Dynamic
                component={props.as ?? 'div'}
                {...omitProps(props, [
                  'as',
                  'children',
                  'unmount',
                  'isOpen',
                  'disabled',
                  'onOpen',
                  'onClose',
                  'onChange',
                ])}
                id={ownerID}
                role="alertdialog"
                aria-modal
                aria-labelledby={titleID}
                aria-describedby={descriptionID}
                data-sh-alert-dialog={ownerID}
              >
                <HeadlessDisclosureChild>
                  {props.children}
                </HeadlessDisclosureChild>
              </Dynamic>
            </Show>
          </Show>
        )}
      </HeadlessDisclosureRoot>
    </AlertDialogContext.Provider>
  );
}
