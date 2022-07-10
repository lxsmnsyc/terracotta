import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure/HeadlessDisclosureRoot';

export interface DialogBaseProps extends HeadlessDisclosureRootChildren {
  unmount?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
