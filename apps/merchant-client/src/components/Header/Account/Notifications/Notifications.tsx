import { useEffect, useState } from 'react';
import { useNotifications } from '../../../../store/api/hooks/useNotifications';

import { PDropdown } from '@poluspay-frontend/ui';
import { ErrorBlock } from 'libs/ui/src/lib/Error/Error';
import { Loader } from '../../../ui/Loader/Loader';
import { NotificationItem } from '../../../ui/Notification/Notification';
import { ReactComponent as IconNotification } from '../../../../assets/icons/notification.svg';

import './Notifications.scoped.scss';

export const AccountNotifications: React.FC = () => {
    const store = useNotifications();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        store
            .getNotifications()
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

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
                            {loading ? (
                                <Loader height={220} />
                            ) : error || !store.notifications?.length ? (
                                <ErrorBlock
                                    title="No notifications found"
                                    height={220}
                                />
                            ) : (
                                store.notifications.map((el) => (
                                    <NotificationItem
                                        item={el}
                                        key={el.id}
                                        onClick={(id) =>
                                            store.handleNotificationRead(id)
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
};
