import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure/HeadlessDisclosureRoot';

export interface ContextMenuBaseProps extends HeadlessDisclosureRootChildren {
  onOpen?: () => void;
  onClose?: () => void;
}
