import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure/HeadlessDisclosureRoot';

export interface CommandBarBaseProps extends HeadlessDisclosureRootChildren {
  unmount?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}
