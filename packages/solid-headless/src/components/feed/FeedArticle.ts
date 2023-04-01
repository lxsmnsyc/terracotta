import {
  createComponent,
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  FeedArticleContext,
} from './FeedArticleContext';
import {
  useFeedContentContext,
} from './FeedContentContext';
import {
  useFeedContext,
} from './FeedContext';
import { FEED_ARTICLE_TAG } from './tags';

export type FeedArticleProps<T extends ValidConstructor = 'article'> =
  HeadlessPropsWithRef<T, { index: number }>;

export function FeedArticle<T extends ValidConstructor = 'article'>(
  props: FeedArticleProps<T>,
): JSX.Element {
  const rootContext = useFeedContext('FeedArticle');
  const contentContext = useFeedContentContext('FeedArticle');

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'PageUp':
            contentContext.setPrevChecked(ref);
            break;
          case 'PageDown':
            contentContext.setNextChecked(ref);
            break;
          default:
            break;
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const descriptionID = createUniqueId();

  return createComponent(FeedArticleContext.Provider, {
    value: {
      ownerID,
      labelID,
      descriptionID,
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('article' as T),
        mergeProps(
          omitProps(props, ['as']),
          FEED_ARTICLE_TAG,
          createOwnerAttribute(rootContext.ownerID),
          {
            id: ownerID,
            'aria-labelledby': labelID,
            'aria-describedby': descriptionID,
            tabindex: 0,
            get 'aria-posinset'() {
              return props.index + 1;
            },
            get 'aria-setsize'() {
              return rootContext.size;
            },
            ref: createRef<T>(props, (e) => {
              setInternalRef(() => e);
            }),
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
