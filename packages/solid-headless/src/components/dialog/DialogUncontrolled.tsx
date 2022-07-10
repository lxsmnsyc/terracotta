import {
  createUniqueId,
  Show,
  JSX,
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
} from '../../headless/disclosure/HeadlessDisclosureRoot';
import {
  HeadlessDisclosureUncontrolledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  ValidConstructor,
  HeadlessProps,
} from '../../utils/dynamic-prop';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  DialogContext,
} from './DialogContext';
import {
  DialogBaseProps,
} from './types';

type DialogUncontrolledBaseProps =
  & DialogBaseProps
  & HeadlessDisclosureUncontrolledOptions;

export type DialogUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DialogUncontrolledBaseProps>;

export function DialogUncontrolled<T extends ValidConstructor = 'div'>(
  props: DialogUncontrolledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  const fsp = useFocusStartPoint();

  return (
    <DialogContext.Provider
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
                  'defaultOpen',
                  'disabled',
                  'onOpen',
                  'onClose',
                  'onChange',
                ])}
                id={ownerID}
                role="dialog"
                aria-modal
                aria-labelledby={titleID}
                aria-describedby={descriptionID}
                data-sh-dialog={ownerID}
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
                  'defaultOpen',
                  'disabled',
                  'onOpen',
                  'onClose',
                  'onChange',
                ])}
                id={ownerID}
                role="dialog"
                aria-modal
                aria-labelledby={titleID}
                aria-describedby={descriptionID}
                data-sh-dialog={ownerID}
              >
                <HeadlessDisclosureChild>
                  {props.children}
                </HeadlessDisclosureChild>
              </Dynamic>
            </Show>
          </Show>
        )}
      </HeadlessDisclosureRoot>
    </DialogContext.Provider>
  );
}
