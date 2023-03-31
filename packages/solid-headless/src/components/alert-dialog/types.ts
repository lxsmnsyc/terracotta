import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure';
import {
  UnmountableProps,
} from '../../utils/create-unmountable';

export interface AlertDialogBaseProps
  extends HeadlessDisclosureRootChildren, UnmountableProps {
  onOpen?: () => void;
  onClose?: () => void;
}
