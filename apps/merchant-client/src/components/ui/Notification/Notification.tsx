import { INotification } from '../../../store/api/endpoints/user/User.interface';
import classNames from 'classnames';

import './Notification.scoped.scss';

interface NotificationItemProps {
    item: INotification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
    return (
        <div className="notification">
            <div
                className={classNames({
                    notification__inner: true,
                    'notification__inner--readed': false,
                })}
            >
                <div
                    className={classNames({
                        'notification__inner-status': true,
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
                            {item.created_at}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
