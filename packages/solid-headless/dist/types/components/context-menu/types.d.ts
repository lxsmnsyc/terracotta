import { HeadlessDisclosureRootChildren } from '../../headless/disclosure';
export interface ContextMenuBaseProps extends HeadlessDisclosureRootChildren {
    onOpen?: () => void;
    onClose?: () => void;
}
