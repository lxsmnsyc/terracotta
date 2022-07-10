import {
  Show,
  JSX,
  mergeProps,
  createComponent,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure/HeadlessDisclosureContext';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useDisclosureContext,
} from './DisclosureContext';

export type DisclosurePanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, HeadlessDisclosureChildProps & { unmount?: boolean }>;

export function DisclosurePanel<T extends ValidConstructor = 'div'>(
  props: DisclosurePanelProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosurePanel');
  const properties = useHeadlessDisclosureProperties();

  function renderChildren() {
    return createDynamic(
      () => props.as ?? ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'unmount',
          'children',
        ]),
        {
          id: context.panelID,
          'data-sh-disclosure-panel': context.ownerID,
          get children() {
            return createComponent(HeadlessDisclosureChild, {
              get children() {
                return props.children;
              },
            });
          },
        },
      ) as DynamicProps<T>,
    );
  }

  return createComponent(Show, {
    get when() {
      return props.unmount ?? true;
    },
    get fallback() {
      return renderChildren();
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return properties.isOpen();
        },
        get children() {
          return renderChildren();
        },
      });
    },
  });
}
