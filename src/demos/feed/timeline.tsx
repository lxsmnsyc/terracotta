import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  Feed,
  FeedArticle,
  FeedArticleDescription,
  FeedArticleLabel,
  FeedContent,
  FeedLabel,
} from 'terracotta/feed';

interface Post {
  id: string;
  title: string;
  body: string;
}

const INITIAL: Post[] = [
  { id: '1', title: 'Release 2.0.0-next.8', body: 'Per-component entry points land.' },
  { id: '2', title: 'Docs site', body: 'Every example now runs in its own document.' },
  { id: '3', title: 'Theme contract', body: 'One stylesheet restyles the whole site.' },
];

export default function FeedTimeline(): JSX.Element {
  const [posts, setPosts] = createSignal(INITIAL);
  const [loading, setLoading] = createSignal(false);

  function loadMore(): void {
    setLoading(true);
    setTimeout(() => {
      setPosts((current) => [
        ...current,
        {
          id: String(current.length + 1),
          title: `Older post ${current.length + 1}`,
          body: 'Loaded after the button was pressed.',
        },
      ]);
      setLoading(false);
    }, 600);
  }

  return (
    <div class="stack">
      <Feed class="feed" size={posts().length} busy={loading()}>
        <FeedLabel class="feed-label">Latest posts</FeedLabel>
        <FeedContent class="feed-content">
          <For each={posts()}>
            {(post, index) => (
              <FeedArticle class="feed-article" index={index()}>
                <FeedArticleLabel class="feed-article-title">{post.title}</FeedArticleLabel>
                <FeedArticleDescription class="feed-article-body">
                  {post.body}
                </FeedArticleDescription>
              </FeedArticle>
            )}
          </For>
        </FeedContent>
      </Feed>

      <button type="button" class="button" onClick={loadMore} disabled={loading()}>
        {loading() ? 'Loading…' : 'Load more'}
      </button>
      <p class="hint">
        Focus an article, then use <kbd>Page Down</kbd> and <kbd>Page Up</kbd> to move between them,
        or <kbd>Control</kbd> + <kbd>End</kbd> to leave the feed.
      </p>
    </div>
  );
}
