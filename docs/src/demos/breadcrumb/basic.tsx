import type { JSX } from '@solidjs/web';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from 'terracotta/breadcrumb';

/**
 * The separators are drawn in CSS, so screen readers do not read them out.
 */
export default function BasicBreadcrumb(): JSX.Element {
  return (
    <Breadcrumb class="breadcrumb">
      <BreadcrumbList class="breadcrumb-list">
        <BreadcrumbItem class="breadcrumb-item">
          <BreadcrumbLink class="breadcrumb-link" href="#home">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem class="breadcrumb-item">
          <BreadcrumbLink class="breadcrumb-link" href="#components">
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem class="breadcrumb-item">
          <BreadcrumbLink class="breadcrumb-link" href="#breadcrumb" current>
            Breadcrumb
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
