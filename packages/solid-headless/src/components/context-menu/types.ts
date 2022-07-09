import {
  DynamicComponent,
  ValidConstructor,
} from '../../utils/dynamic-prop';

export interface ContextMenuBaseProps<T extends ValidConstructor> extends DynamicComponent<T> {
  onOpen?: () => void;
  onClose?: () => void;
}
