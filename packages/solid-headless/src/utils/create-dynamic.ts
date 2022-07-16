import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  DynamicProps,
  ValidConstructor,
} from './dynamic-prop';

export default function createDynamic<T extends ValidConstructor>(
  source: () => T,
  props: DynamicProps<T>,
): JSX.Element {
  return createComponent(Dynamic, mergeProps({
    get component() {
      return source();
    },
  }, props) as any);
}
