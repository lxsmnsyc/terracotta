import {
  DynamicComponent,
  ValidConstructor,
} from '../../utils/dynamic-prop';

export interface CommandBarBaseProps<T extends ValidConstructor>
  extends DynamicComponent<T> {
  unmount?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}
