import { HeadlessDisclosureRootChildren } from '../../headless/disclosure';
import { UnmountableProps } from '../../utils/Unmountable';
export interface CommandBarBaseProps extends HeadlessDisclosureRootChildren, UnmountableProps {
    onClose?: () => void;
    onOpen?: () => void;
}
