import {
  HeadlessDisclosureRootChildren,
} from '../../headless/disclosure';

export interface CommandBarBaseProps extends HeadlessDisclosureRootChildren {
  unmount?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}
