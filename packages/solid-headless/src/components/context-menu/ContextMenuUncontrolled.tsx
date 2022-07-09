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
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  ContextMenuContext,
} from './ContextMenuContext';
import {
  ContextMenuBaseProps,
} from './types';

export type ContextMenuUncontrolledProps<T extends ValidConstructor = 'div'> =
  & ContextMenuBaseProps<T>
  & HeadlessDisclosureUncontrolledOptions
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureUncontrolledOptions>
  & HeadlessDisclosureRootChildren;

export function ContextMenuUncontrolled<T extends ValidConstructor = 'div'>(
  props: ContextMenuUncontrolledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const boundaryID = createUniqueId();
  const panelID = createUniqueId();

  const fsp = useFocusStartPoint();

  return (
    <ContextMenuContext.Provider
      value={{
        ownerID,
        boundaryID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
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
        data-sh-context-menu={ownerID}
      >
        <HeadlessDisclosureRoot
          defaultOpen={props.defaultOpen}
          onChange={(value) => {
            props.onChange?.(value);
            if (!value) {
              fsp.load();
              props.onClose?.();
            } else {
              fsp.save();
              props.onOpen?.();
            }
          }}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessDisclosureRoot>
      </Dynamic>
    </ContextMenuContext.Provider>
  );
}
