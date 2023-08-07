import { PDropdown } from '@poluspay-frontend/ui';
import { ReactComponent as IconNotification } from '../../../../assets/icons/notification.svg';

import './Notifications.scoped.scss';

export const AccountNotifications: React.FC = () => {
    return (
        <div className="notifications">
            <PDropdown
                border
                gap={12}
                align="left"
                handler={
                    <div className="notifications__handler">
                        <IconNotification className="notifications__handler-icon" />
                    </div>
                }
                content={<></>}
            />
        </div>
    );
};
