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
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  ContextMenuContext,
} from './ContextMenuContext';
import {
  ContextMenuBaseProps,
} from './types';

export type ContextMenuControlledBaseProps<T extends ValidConstructor = 'div'> =
  & ContextMenuBaseProps<T>
  & HeadlessDisclosureControlledOptions
  & HeadlessDisclosureRootChildren;

export type ContextMenuControlledProps<T extends ValidConstructor = 'div'> =
  OmitAndMerge<ContextMenuControlledBaseProps<T>, DynamicProps<T>>

export function ContextMenuControlled<T extends ValidConstructor = 'div'>(
  props: ContextMenuControlledProps<T>,
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
          'isOpen',
          'as',
          'children',
          'disabled',
          'onChange',
          'onOpen',
          'onClose',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-context-menu={ownerID}
      >
        <HeadlessDisclosureRoot
          isOpen={props.isOpen}
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
