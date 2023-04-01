import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { focusNext, focusPrev } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  FeedContext,
} from './FeedContext';
import { FEED_TAG } from './tags';

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

  const [ref, setRef] = createForwardRef(props);

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
          ref(),
        );
      },
      focusPrev() {
        focusPrev(
          getFocusableElements(document.documentElement),
          ref(),
        );
      },
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'busy',
            'size',
          ]),
          FEED_TAG,
          {
            id: ownerID,
            ref: setRef,
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
