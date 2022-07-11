import { HeadlessDisclosureRootChildren } from '../../headless/disclosure';

export interface PopoverBaseProps extends HeadlessDisclosureRootChildren {
  onClose?: () => void;
  onOpen?: () => void;
}
