import { Dynamic, type DynamicProps, type JSX, type ValidComponent } from '@solidjs/web';
import { createComponent, merge } from 'solid-js';

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
