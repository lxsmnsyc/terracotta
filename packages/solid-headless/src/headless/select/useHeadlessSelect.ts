import {
  HeadlessSelectProperties,
} from './useHeadlessSelectProperties';
import {
  useHeadlessSelectMultiple,
  HeadlessSelectMultipleOptions,
} from './useHeadlessSelectMultiple';
import {
  useHeadlessSelectSingle,
  HeadlessSelectSingleOptions,
} from './useHeadlessSelectSingle';

export type HeadlessSelectOptions<T> =
  | HeadlessSelectSingleOptions<T>
  | HeadlessSelectMultipleOptions<T>;

function isHeadlessSelectMultiple<T>(
  options: HeadlessSelectOptions<T>,
): options is HeadlessSelectMultipleOptions<T> {
  return 'multiple' in options && options.multiple;
}

export function useHeadlessSelect<T>(
  options: HeadlessSelectOptions<T>,
): HeadlessSelectProperties<T> {
  if (isHeadlessSelectMultiple(options)) {
    return useHeadlessSelectMultiple(options);
  }

  return useHeadlessSelectSingle(options);
}
