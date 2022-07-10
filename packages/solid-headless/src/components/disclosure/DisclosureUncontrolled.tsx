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
  HeadlessDisclosureUncontrolledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  DisclosureContext,
} from './DisclosureContext';

type DisclosureUncontrolledBaseProps =
  & HeadlessDisclosureUncontrolledOptions
  & HeadlessDisclosureRootChildren;

export type DisclosureUncontrolledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, DisclosureUncontrolledBaseProps>;

export function DisclosureUncontrolled<T extends ValidConstructor = typeof Fragment>(
  props: DisclosureUncontrolledProps<T>,
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
          'defaultOpen',
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
          defaultOpen={props.defaultOpen}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessDisclosureRoot>
      </Dynamic>
    </DisclosureContext.Provider>
  );
}
