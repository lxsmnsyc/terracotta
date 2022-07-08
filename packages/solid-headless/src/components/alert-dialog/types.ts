import {
  DynamicComponentWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';

export interface AlertDialogBaseProps<T extends ValidConstructor>
  extends DynamicComponentWithRef<T> {
  as?: T;
  unmount?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
