import {
  createUniqueId,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureRoot,
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure/HeadlessDisclosureRoot';
import {
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  DisclosureContext,
} from './DisclosureContext';

type DisclosureControlledBaseProps =
  & HeadlessDisclosureControlledOptions
  & HeadlessDisclosureRootChildren;

export type DisclosureControlledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, DisclosureControlledBaseProps>;

export function DisclosureControlled<T extends ValidConstructor = typeof Fragment>(
  props: DisclosureControlledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return (
    <DisclosureContext.Provider
      value={{
        ownerID,
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...omitProps(props, [
          'isOpen',
          'as',
          'children',
          'disabled',
          'onChange',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-disclosure={ownerID}
      >
        <HeadlessDisclosureRoot
          isOpen={props.isOpen}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessDisclosureRoot>
      </Dynamic>
    </DisclosureContext.Provider>
  );
}
