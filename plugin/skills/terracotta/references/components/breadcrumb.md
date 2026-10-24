<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Breadcrumb

A trail of links to the parent pages of the current page, following the
[ARIA breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from 'terracotta/breadcrumb';
```

## Anatomy

```tsx
<Breadcrumb>        {/* <nav>, named "Breadcrumb" */}
  <BreadcrumbList>  {/* <ol> */}
    <BreadcrumbItem>{/* <li> */}
      <BreadcrumbLink current/>{/* <a>, aria-current="page" when current */}
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Examples

### Basic

### The current page

Pass `current` to the link to the page the user is on. It gets
`aria-current="page"`. If the current page is plain text instead of a link,
leave out `BreadcrumbLink` there.

### Separators

Screen readers read the separators unless you hide them. Two ways to do it:

- Draw them in CSS with empty alternative text, as the demo does. In
  `content: '/' / ''`, the string after the second slash is what screen readers
  read. Browsers without this syntax skip that declaration and use the first
  one, which screen readers still read.

  ```css
  .breadcrumb-item + .breadcrumb-item::before {
    content: '/';
    content: '/' / '';
  }
  ```

- Put them in the markup with `aria-hidden="true"`. This hides them in every
  browser.

### Naming

The landmark is named "Breadcrumb". Pass `aria-label` or `aria-labelledby` for
another name, such as when the page has a second trail.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Breadcrumb` | `tc-breadcrumb` | Always |
| `BreadcrumbList` | `tc-breadcrumb-list` | Always |
| `BreadcrumbItem` | `tc-breadcrumb-item` | Always |
| `BreadcrumbLink` | `tc-breadcrumb-link` | Always |
| `BreadcrumbLink` | `tc-current` | The link is to the current page |

## Keyboard

None of its own. Links work as links do.

## API

| Component | Renders | Props |
| --- | --- | --- |
| `<Breadcrumb>` | `<nav>` | `as`. A name other than "Breadcrumb" through `aria-label` or `aria-labelledby`. |
| `<BreadcrumbList>` | `<ol>` | `as` |
| `<BreadcrumbItem>` | `<li>` | `as` |
| `<BreadcrumbLink>` | `<a>` | `as`, and `current` for the link to the page the user is on |

Every part forwards the rest of its props, such as `href`.
