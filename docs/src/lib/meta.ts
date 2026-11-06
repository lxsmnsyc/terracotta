import type { HeadTag } from '@solidjs/web';

const SITE_NAME = 'Terracotta';
const IMAGE_ALT =
  'Terracotta: Behaviour, not decoration. Accessible headless components for SolidJS.';

/** An absolute URL on the site. Link previews ignore relative ones. */
export function siteURL(path: string): string {
  return new URL(path, import.meta.env.SITE_URL).href;
}

function meta(key: string, props: Record<string, string>): HeadTag {
  return { tag: 'meta', key, props };
}

/**
 * The head of a page: its title and description, a canonical link, the Open
 * Graph tags, and a large-image Twitter card. Every page shares one image,
 * `public/og.png`, rendered by `pnpm og`. Each tag carries a key, so moving
 * between pages replaces the tags rather than adding to them.
 */
export function pageHead(page: { title: string; description: string; path: string }): HeadTag[] {
  const url = siteURL(page.path);
  const image = siteURL('/og.png');
  return [
    { tag: 'title', key: 'title', props: { children: page.title } },
    meta('description', { name: 'description', content: page.description }),
    { tag: 'link', key: 'canonical', props: { rel: 'canonical', href: url } },
    meta('og:type', { property: 'og:type', content: 'website' }),
    meta('og:site_name', { property: 'og:site_name', content: SITE_NAME }),
    meta('og:title', { property: 'og:title', content: page.title }),
    meta('og:description', { property: 'og:description', content: page.description }),
    meta('og:url', { property: 'og:url', content: url }),
    meta('og:image', { property: 'og:image', content: image }),
    meta('og:image:width', { property: 'og:image:width', content: '1200' }),
    meta('og:image:height', { property: 'og:image:height', content: '630' }),
    meta('og:image:alt', { property: 'og:image:alt', content: IMAGE_ALT }),
    meta('twitter:card', { name: 'twitter:card', content: 'summary_large_image' }),
  ];
}
