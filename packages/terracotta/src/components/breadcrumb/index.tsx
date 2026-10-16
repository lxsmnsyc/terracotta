import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const BREADCRUMB_TAG = createTag('breadcrumb');
const BREADCRUMB_LIST_TAG = createTag('breadcrumb-list');
const BREADCRUMB_ITEM_TAG = createTag('breadcrumb-item');
const BREADCRUMB_LINK_TAG = createTag('breadcrumb-link');

export type BreadcrumbProps<T extends ValidComponent = 'nav'> = HeadlessProps<T>;

/**
 * A trail of links to the parent pages of the current page, following the
 * ARIA breadcrumb pattern. It is a navigation landmark named "Breadcrumb"
 * unless you give it another name.
 *
 * Renders a `<nav>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/breadcrumb.md}
 */
export function Breadcrumb<T extends ValidComponent = 'nav'>(
  props: BreadcrumbProps<T>,
): JSX.Element {
  const naming = props as { 'aria-label'?: string; 'aria-labelledby'?: string };
  // The default name gives way to a name of the consumer's, from either prop.
  const label = (): string | undefined =>
    naming['aria-labelledby'] ? naming['aria-label'] : (naming['aria-label'] ?? 'Breadcrumb');
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'nav');
  // Spread after `rest`, since `label()` already holds the consumer's name.
  return <Root {...BREADCRUMB_TAG} {...rest} aria-label={label()} />;
}

export type BreadcrumbListProps<T extends ValidComponent = 'ol'> = HeadlessProps<T>;

/**
 * The ordered list of the trail, from the top of the site down to the current
 * page.
 *
 * Renders an `<ol>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/breadcrumb.md}
 */
export function BreadcrumbList<T extends ValidComponent = 'ol'>(
  props: BreadcrumbListProps<T>,
): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'ol');
  return <Root {...BREADCRUMB_LIST_TAG} {...rest} />;
}

export type BreadcrumbItemProps<T extends ValidComponent = 'li'> = HeadlessProps<T>;

/**
 * One step of the trail.
 *
 * Renders an `<li>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/breadcrumb.md}
 */
export function BreadcrumbItem<T extends ValidComponent = 'li'>(
  props: BreadcrumbItemProps<T>,
): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'li');
  return <Root {...BREADCRUMB_ITEM_TAG} {...rest} />;
}

export type BreadcrumbLinkProps<T extends ValidComponent = 'a'> = HeadlessProps<
  T,
  {
    /** Marks the link to the page the user is on, with `aria-current="page"`. */
    current?: boolean;
  }
>;

/**
 * A link in the trail. Pass `current` on the link to the page the user is on.
 *
 * Renders an `<a>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/breadcrumb.md}
 */
export function BreadcrumbLink<T extends ValidComponent = 'a'>(
  props: BreadcrumbLinkProps<T>,
): JSX.Element {
  const rest = omit(props, 'as', 'current');
  const Root = dynamic(() => props.as || 'a');
  return (
    <Root
      {...BREADCRUMB_LINK_TAG}
      aria-current={props.current ? 'page' : undefined}
      tc-current={props.current ? '' : undefined}
      {...rest}
    />
  );
}
