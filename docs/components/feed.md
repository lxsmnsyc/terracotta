# Feed

An [ARIA feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) is a stream of
articles: a timeline, a comment thread, an infinite-scrolling list. Each article
is a focus stop, and the user can page between them with the keyboard.

The pattern exists because an endless list breaks normal reading order. A feed
tells assistive technology how many articles there are (`aria-setsize`), where
each one sits in that set (`aria-posinset`), and when more are loading
(`aria-busy`).

```tsx
import {
  Feed,
  FeedLabel,
  FeedContent,
  FeedArticle,
  FeedArticleLabel,
  FeedArticleDescription,
} from 'terracotta';
```

## Anatomy

```tsx
<Feed size busy>            {/* owns size/busy, focus in and out of the feed */}
  <FeedLabel/>              {/* names the feed */}
  <FeedContent>             {/* role="feed", handles PageUp/PageDown */}
    <FeedArticle index>     {/* one article, focusable */}
      <FeedArticleLabel/>   {/* names the article */}
      <FeedArticleDescription/>
    </FeedArticle>
  </FeedContent>
</Feed>
```

## Examples

### A timeline

```tsx
import { For, createSignal, type JSX } from 'solid-js';
import {
  Feed, FeedArticle, FeedArticleDescription, FeedArticleLabel,
  FeedContent, FeedLabel,
} from 'terracotta';

interface Post { id: string; title: string; body: string }

export function Timeline(props: { posts: Post[] }): JSX.Element {
  const [loading, setLoading] = createSignal(false);

  return (
    <Feed class="feed" size={props.posts.length} busy={loading()}>
      <FeedLabel class="feed-label">Latest posts</FeedLabel>

      <FeedContent class="feed-content">
        <For each={props.posts}>
          {(post, index) => (
            <FeedArticle class="feed-article" index={index()}>
              <FeedArticleLabel class="feed-article-title">
                {post.title}
              </FeedArticleLabel>
              <FeedArticleDescription class="feed-article-body">
                {post.body}
              </FeedArticleDescription>
            </FeedArticle>
          )}
        </For>
      </FeedContent>
    </Feed>
  );
}
```

```css
.feed {
  inline-size: min(36rem, 100%);
}

.feed-label {
  display: block;
  margin-block-end: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.feed-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feed-article {
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  padding: 1rem;
}

.feed-article:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.feed-article-title {
  display: block;
  font-weight: 500;
}

.feed-article-body {
  margin: 0.25rem 0 0;
  color: #52525b;
}
```

Where you know it, `size` should be the total number of articles in the feed,
not the number currently rendered. That is what tells a screen reader "3 of
120".

### Loading more

Set `busy` while you fetch. The feed is then not announced mid-update:

```tsx
const [posts, setPosts] = createSignal<Post[]>([]);
const [total, setTotal] = createSignal(0);
const [loading, setLoading] = createSignal(false);

async function loadMore(): Promise<void> {
  setLoading(true);
  const page = await fetchPage(posts().length);
  setPosts(previous => [...previous, ...page.items]);
  setTotal(page.total);
  setLoading(false);
}

<Feed class="feed" size={total()} busy={loading()}>
  <FeedLabel class="feed-label">Latest posts</FeedLabel>
  <FeedContent class="feed-content">
    <For each={posts()}>{/* … */}</For>
  </FeedContent>
  <button type="button" onClick={loadMore} disabled={loading()}>
    Load more
  </button>
</Feed>
```

```css
/* The busy state is a real ARIA attribute, so it styles directly */
.feed-content[aria-busy="true"] {
  opacity: 0.6;
  cursor: progress;
}
```

### Articles with interactive content

An article is a focus stop. Anything focusable inside it stays reachable by
<kbd>Tab</kbd> as usual:

```tsx
<FeedArticle class="feed-article" index={index()}>
  <FeedArticleLabel class="feed-article-title">{post.title}</FeedArticleLabel>
  <FeedArticleDescription class="feed-article-body">{post.excerpt}</FeedArticleDescription>
  <div class="feed-article-actions">
    <button type="button" onClick={() => like(post)}>Like</button>
    <a href={`/posts/${post.id}`}>Read more</a>
  </div>
</FeedArticle>
```

```css
.feed-article-actions {
  display: flex;
  gap: 0.5rem;
  margin-block-start: 0.75rem;
}
```

### Highlighting the current article

The article is focusable, so `:focus-within` marks the one the user is on. That
holds even when focus is on a button inside it:

```css
.feed-article:focus-within {
  border-color: #2563eb;
  background: #f8fafc;
}
```

### A comment thread

The same component with different semantics. Change the elements with `as`:

```tsx
<Feed class="feed" size={comments().length}>
  <FeedLabel class="feed-label" as="h2">Comments</FeedLabel>
  <FeedContent class="feed-content" as="ol">
    <For each={comments()}>
      {(comment, index) => (
        <FeedArticle class="comment" as="li" index={index()}>
          <FeedArticleLabel class="comment-author">{comment.author}</FeedArticleLabel>
          <FeedArticleDescription class="comment-body">
            {comment.body}
          </FeedArticleDescription>
        </FeedArticle>
      )}
    </For>
  </FeedContent>
</Feed>
```

```css
.feed-content { margin: 0; padding: 0; list-style: none; }

.comment {
  border-block-end: 1px solid #e4e4e7;
  padding-block: 0.75rem;
}

.comment-author { font-weight: 500; }
.comment-body { margin: 0.25rem 0 0; }
```

### A skeleton while loading

```tsx
<FeedContent class="feed-content">
  <For each={posts()}>{/* … */}</For>
  <Show when={loading()}>
    <div class="feed-skeleton" aria-hidden="true" />
  </Show>
</FeedContent>
```

```css
.feed-skeleton {
  block-size: 5rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #f4f4f5, #e4e4e7, #f4f4f5);
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .feed-skeleton { animation: none; }
}
```

## State attributes

`Feed` has no selection or open state, so the markers are the only `tc-`
attributes it writes. Its live state — size, position and busy — goes through
real ARIA attributes instead, because that is what assistive technology reads.

| Element | Attribute | Present when |
| --- | --- | --- |
| `Feed` | `tc-feed` | Always |
| `FeedLabel` | `tc-feed-label` | Always |
| `FeedContent` | `tc-feed-content` | Always |
| `FeedContent` | `aria-busy` | `"true"` while `busy` is set on the `Feed` |
| `FeedArticle` | `tc-feed-article` | Always |
| `FeedArticle` | `tc-owner` | Always — ties the article to the feed's keyboard navigation |
| `FeedArticle` | `aria-posinset`, `aria-setsize` | Always — one-based position, and the feed's `size` |
| `FeedArticleLabel` | `tc-feed-article-label` | Always |
| `FeedArticleDescription` | `tc-feed-article-description` | Always |

### Styling

```css
[tc-feed-content] {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

[tc-feed-article] {
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  padding: 1rem;
}

/* Busy is a real ARIA attribute — style from it directly */
[tc-feed-content][aria-busy="true"] { opacity: 0.6; }

/* Position-aware styling, straight from the ARIA attribute */
[tc-feed-article][aria-posinset="1"] { border-color: #2563eb; }

[tc-feed-article]:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

### Reading the state in code

`Feed` exposes no state object and no render prop. `size` and `busy` are props
you already own, and the position of each article is the `index` you passed.
Keep them in your own signals, as in the "loading more" example above.

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Page Down</kbd> | Next article |
| <kbd>Page Up</kbd> | Previous article |
| <kbd>Ctrl</kbd>+<kbd>End</kbd> | Moves focus past the feed, to the next focusable element on the page |
| <kbd>Ctrl</kbd>+<kbd>Home</kbd> | Moves focus before the feed, to the previous focusable element on the page |
| <kbd>Tab</kbd> | Moves through every article and every focusable element inside them |

Article navigation does not wrap. <kbd>Page Down</kbd> on the last article stays
put. The Ctrl shortcuts search the whole document, which is what lets a user
escape a long feed without tabbing through it.

## API

### `<Feed>`

The outer container. It owns `size` and `busy`, and provides the "jump out of
the feed" behaviour. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `size` | `number` | *required* | Total number of articles in the feed. Published on each article as `aria-setsize`. |
| `busy` | `boolean` | `false` | Whether the feed is loading. Published on `FeedContent` as `aria-busy`. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` | — | The label and content. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<FeedLabel>`

Names the feed. `FeedContent`'s `aria-labelledby` points at it. Renders a
`<span>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'span'` | Element or component to render as. |
| `children` | `JSX.Element` | — | The label text. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<FeedContent>`

The region that carries `role="feed"` and handles article navigation. Renders a
`<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` | — | The articles. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<FeedArticle>`

One article. It is focusable and positioned within the set. Renders an
`<article>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'article'` | Element or component to render as. |
| `index` | `number` | *required* | Zero-based position in the feed. Published as `aria-posinset` (one-based). |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` | — | The article's contents. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `tabindex="0"`, `aria-labelledby` and
`aria-describedby`.

### `<FeedArticleLabel>`

Names the article. Renders a `<span>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'span'` | Element or component to render as. |
| `children` | `JSX.Element` | — | The label text. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<FeedArticleDescription>`

Describes the article. Renders a `<p>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'p'` | Element or component to render as. |
| `children` | `JSX.Element` | — | The description. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

`FeedLabel`, `FeedContent` and `FeedArticle` throw outside a `<Feed>`.
`FeedArticleLabel` and `FeedArticleDescription` throw outside a `<FeedArticle>`.
