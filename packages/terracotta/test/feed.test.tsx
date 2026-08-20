import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { describedBy, labelledBy } from './aria';
import {
  Feed,
  FeedArticle,
  FeedArticleDescription,
  FeedArticleLabel,
  FeedContent,
  FeedLabel,
} from '../src';

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
});
