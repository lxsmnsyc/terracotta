import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure/HeadlessDisclosureRoot';

export interface AlertDialogBaseProps extends HeadlessDisclosureRootChildren {
  unmount?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
