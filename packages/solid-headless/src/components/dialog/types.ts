import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure';
import {
  UnmountableProps,
} from '../../utils/create-unmountable';

export interface DialogBaseProps
  extends HeadlessDisclosureRootChildren, UnmountableProps {
  onOpen?: () => void;
  onClose?: () => void;
}
