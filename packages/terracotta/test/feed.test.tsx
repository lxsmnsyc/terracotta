import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, describedBy, labelledBy } from './aria';
import {
  Feed,
  FeedArticle,
  FeedArticleDescription,
  FeedArticleLabel,
  FeedContent,
  FeedLabel,
} from '../src/components/feed';

const POSTS = ['first post', 'second post', 'third post'];

function renderFeed(props: { busy?: boolean } = {}): ReturnType<typeof render> {
  return render(() => (
    <Feed size={POSTS.length} busy={props.busy}>
      <FeedLabel>Recent activity</FeedLabel>
      <FeedContent>
        {POSTS.map((post, index) => (
          <FeedArticle index={index}>
            <FeedArticleLabel>{post}</FeedArticleLabel>
            <FeedArticleDescription>{post} body</FeedArticleDescription>
          </FeedArticle>
        ))}
      </FeedContent>
    </Feed>
  ));
}

describe('Feed accessibility', () => {
  it('exposes the feed role', () => {
    renderFeed();

    expect(screen.getByRole('feed')).toBeInTheDocument();
  });

  it('names the feed from its label', () => {
    renderFeed();
    const feed = screen.getByRole('feed');

    expect(labelledBy(feed)).toHaveTextContent('Recent activity');
  });

  it('reports the loading state through `aria-busy`', () => {
    renderFeed();
    expect(screen.getByRole('feed')).toHaveAttribute('aria-busy', 'false');

    screen.getByRole('feed').remove();
    renderFeed({ busy: true });
    expect(screen.getByRole('feed')).toHaveAttribute('aria-busy', 'true');
  });

  it('positions every article within the set', () => {
    renderFeed();
    const articles = screen.getAllByRole('article');

    expect(articles).toHaveLength(POSTS.length);
    articles.forEach((article, index) => {
      expect(article).toHaveAttribute('aria-posinset', String(index + 1));
      expect(article).toHaveAttribute('aria-setsize', String(POSTS.length));
    });
  });

  it('names and describes every article', () => {
    renderFeed();
    const article = screen.getAllByRole('article')[0];

    expect(labelledBy(article)).toHaveTextContent('first post');
    expect(describedBy(article)).toHaveTextContent('first post body');
  });

  it('makes every article a tab stop', () => {
    renderFeed();

    for (const article of screen.getAllByRole('article')) {
      expect(article).toHaveAttribute('tabindex', '0');
    }
  });

  it('keeps the article role when rendered as another element', () => {
    render(() => (
      <Feed size={1}>
        <FeedContent>
          <FeedArticle as="div" index={0}>
            post
          </FeedArticle>
        </FeedContent>
      </Feed>
    ));

    expect(screen.getByRole('article')).toHaveTextContent('post');
  });

  it('omits the label and description references when those parts are missing', () => {
    render(() => (
      <Feed size={1}>
        <FeedContent>
          <FeedArticle index={0}>post</FeedArticle>
        </FeedContent>
      </Feed>
    ));

    expect(screen.getByRole('feed')).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('article')).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('article')).not.toHaveAttribute('aria-describedby');
  });

  it('moves focus out of the feed with Ctrl+Home and Ctrl+End', async () => {
    render(() => (
      <>
        <button type="button">before</button>
        <Feed size={POSTS.length}>
          <FeedLabel>Recent activity</FeedLabel>
          <FeedContent>
            {POSTS.map((post, index) => (
              <FeedArticle index={index}>
                <FeedArticleLabel>{post}</FeedArticleLabel>
                <button type="button">{post} action</button>
              </FeedArticle>
            ))}
          </FeedContent>
          <button type="button">load more</button>
        </Feed>
        <button type="button">after</button>
      </>
    ));
    const articles = screen.getAllByRole('article');

    articles[1].focus();
    fireEvent.keyDown(articles[1], { key: 'End', ctrlKey: true });
    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'load more' }));

    articles[1].focus();
    fireEvent.keyDown(articles[1], { key: 'Home', ctrlKey: true });
    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'before' }));
  });
});
