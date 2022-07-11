import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure';
import {
  UnmountableProps,
} from '../../utils/Unmountable';

export interface DialogBaseProps
  extends HeadlessDisclosureRootChildren, UnmountableProps {
  onOpen?: () => void;
  onClose?: () => void;
}
