# Breadcrumb

A trail of links to the parent pages of the current page, following the
[ARIA breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).

:::hero breadcrumb/basic
:::

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

:::demo breadcrumb/basic
:::

### The current page

Pass `current` to the link to the page the user is on. It gets
`aria-current="page"`. If the current page is plain text instead of a link,
leave out `BreadcrumbLink` there.

### Separators

Draw separators in CSS, as the demo does, so screen readers do not read them:

```css
.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
}
```

If you put a separator in the markup instead, give it `aria-hidden="true"`.

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
