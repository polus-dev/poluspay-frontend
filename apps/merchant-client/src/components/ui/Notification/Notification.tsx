import type { INotification } from '../../../store/api/hooks/useNotifications';

import { formatDate } from '@poluspay-frontend/utils';

import classNames from 'classnames';

import './Notification.scoped.scss';

interface NotificationItemProps {
    item: INotification;
    onClick: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
    item,
    onClick,
}) => {
    const createdAt = new Date(item.created_at);
    const date = formatDate(createdAt);

    const handleClick = () => {
        if (item.viewed_at) return undefined;

        onClick(item.id);
    };

    return (
        <div className="notification" onClick={handleClick}>
            <div
                className={classNames({
                    notification__inner: true,
                    'notification__inner--readed': item.viewed_at !== null,
                })}
            >
                <div
                    className={classNames({
                        'notification__inner-status': true,
                        [`notification__inner-status--${item.status}`]: true,
                    })}
                />
                <div className="notification__inner-data">
                    <div className="notification__inner-data__container">
                        {item.merchant?.name && (
                            <p className="notification__inner-data__container-merchant">
                                {item.merchant.name}
                            </p>
                        )}
                        <h6 className="notification__inner-data__container-title">
                            {item.title}
                        </h6>
                        <p className="notification__inner-data__container-description">
                            {item.text}
                        </p>
                    </div>
                    <div className="notification__inner-data__date">
                        <p className="notification__inner-data__date-text">
                            {date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
