import { useGetNotificationsQuery } from '@poluspay-frontend/merchant-query';

import { PDropdown } from '@poluspay-frontend/ui';
import { ErrorBlock } from 'libs/ui/src/lib/Error/Error';
import { Loader } from '../../../ui/Loader/Loader';
import { NotificationItem } from '../../../ui/Notification/Notification';
import { ReactComponent as IconNotification } from '../../../../assets/icons/notification.svg';

import './Notifications.scoped.scss';

export const AccountNotifications: React.FC = () => {
    const { data, isLoading, isError } = useGetNotificationsQuery({});

    return (
        <div className="notifications">
            <PDropdown
                border
                align="left"
                gap={12}
                minWidth={280}
                maxWidth={280}
                padding={[0, 0]}
                handler={
                    <div className="notifications__handler">
                        <IconNotification className="notifications__handler-icon" />
                    </div>
                }
                content={
                    <div className="notifications__content">
                        <div className="notifications__content-header">
                            <h6 className="notifications__content-header-title">
                                Notifications
                            </h6>
                        </div>
                        <div className="notifications__content-placeholder" />
                        <div className="notifications__content-inner">
                            {isLoading ? (
                                <Loader height={220} />
                            ) : isError || data?.total_count == 0 ? (
                                <ErrorBlock
                                    title="No notifications found"
                                    height={220}
                                />
                            ) : (
                                data?.notifications.map((el) => (
                                    <NotificationItem item={el} key={el.id} />
                                ))
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
};
