import { HeadlessDisclosureRootChildren } from '../../headless/disclosure';
import { UnmountableProps } from '../../utils/Unmountable';
export interface AlertDialogBaseProps extends HeadlessDisclosureRootChildren, UnmountableProps {
    onOpen?: () => void;
    onClose?: () => void;
}
