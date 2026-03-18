import { Dynamic } from '@solidjs/web';
import type { JSX, ValidComponent } from 'solid-js';
import { createComponent, merge } from 'solid-js';
import type { DynamicProps } from './dynamic-prop';

// This is just a shorthand for creating dynamic components
export default function createDynamic<T extends ValidComponent>(
  source: () => T,
  props: DynamicProps<T>,
): JSX.Element {
  return createComponent(
    Dynamic,
    merge(
      {
        get component() {
          return source();
        },
      },
      props,
    ) as any,
  );
}
