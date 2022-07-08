import {
  HeadlessSelectProperties,
} from './useHeadlessSelectProperties';
import useHeadlessSelectMultiple, {
  HeadlessSelectMultipleOptions,
} from './useHeadlessSelectMultiple';
import useHeadlessSelectSingle, {
  HeadlessSelectSingleOptions,
} from './useHeadlessSelectSingle';

export type HeadlessSelectOptions<T> =
  | HeadlessSelectSingleOptions<T>
  | HeadlessSelectMultipleOptions<T>;

export default function useHeadlessSelect<T>(
  options: HeadlessSelectOptions<T>,
): HeadlessSelectProperties<T> {
  if ('multiple' in options) {
    return useHeadlessSelectMultiple(options);
  }

  return useHeadlessSelectSingle(options);
}
