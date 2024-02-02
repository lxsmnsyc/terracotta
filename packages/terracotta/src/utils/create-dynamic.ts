import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { DynamicProps, ValidConstructor } from './dynamic-prop';

// This is just a shorthand for creating dynamic components
export default function createDynamic<T extends ValidConstructor>(
  source: () => T,
  props: DynamicProps<T>,
): JSX.Element {
  return createComponent(
    Dynamic,
    mergeProps(
      {
        get component() {
          return source();
        },
      },
      props,
    ) as any,
  );
}
