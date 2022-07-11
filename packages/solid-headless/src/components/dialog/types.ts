import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure';

export interface DialogBaseProps extends HeadlessDisclosureRootChildren {
  unmount?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
