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
} from '../../headless/disclosure/HeadlessDisclosureRoot';
import {
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  CommandBarContext,
} from './CommandBarContext';
import CommandBarEvents from './CommandBarEvents';
import {
  CommandBarBaseProps,
} from './types';

export type CommandBarControlledBaseProps =
  & CommandBarBaseProps
  & HeadlessDisclosureControlledOptions;

export type CommandBarControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, CommandBarControlledBaseProps>;

export function CommandBarControlled<T extends ValidConstructor = 'div'>(
  props: CommandBarControlledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();
  const fsp = useFocusStartPoint();

  return (
    <CommandBarContext.Provider
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
          <CommandBarEvents>
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
                  role="dialog"
                  aria-modal
                  aria-labelledby={titleID}
                  aria-describedby={descriptionID}
                  data-sh-command-bar={ownerID}
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
                  role="dialog"
                  aria-modal
                  aria-labelledby={titleID}
                  aria-describedby={descriptionID}
                  data-sh-command-bar={ownerID}
                >
                  <HeadlessDisclosureChild>
                    {props.children}
                  </HeadlessDisclosureChild>
                </Dynamic>
              </Show>
            </Show>
          </CommandBarEvents>
        )}
      </HeadlessDisclosureRoot>
    </CommandBarContext.Provider>
  );
}
