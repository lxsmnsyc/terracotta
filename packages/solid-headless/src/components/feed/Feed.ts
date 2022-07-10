import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { focusNext, focusPrev } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/get-focusable-elements';
import {
  FeedContext,
} from './FeedContext';

interface FeedBaseProps {
  size: number;
  busy?: boolean;
}

export type FeedProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, FeedBaseProps>;

export function Feed<T extends ValidConstructor = 'div'>(
  props: FeedProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const contentID = createUniqueId();

  let internalRef: DynamicNode<T>;

  return createComponent(FeedContext.Provider, {
    value: {
      ownerID,
      labelID,
      contentID,
      get size() {
        return props.size;
      },
      get busy() {
        return !!props.busy;
      },
      focusNext() {
        focusNext(
          getFocusableElements(document.documentElement),
          internalRef,
        );
      },
      focusPrev() {
        focusPrev(
          getFocusableElements(document.documentElement),
          internalRef,
        );
      },
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'busy',
            'size',
          ]),
          {
            id: ownerID,
            'data-sh-feed': ownerID,
            ref: createRef(props, (e) => {
              internalRef = e;
            }),
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
