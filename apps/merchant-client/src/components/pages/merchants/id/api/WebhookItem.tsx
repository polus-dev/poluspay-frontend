import { useState } from 'react';

import { ReactComponent as IconChevron } from '../../../../../assets/icons/chevron.svg';

import classNames from 'classnames';

import './WebhookItem.scoped.scss';

export interface WebhookHistoryItem {
    uuid: string;
    date: string;
    status: 200 | 500;
    webhookURL: string;
}

interface WebhookItemProps {
    item: WebhookHistoryItem;
}

export const MerchantWebhookItem: React.FC<WebhookItemProps> = ({ item }) => {
    const [opened, setOpened] = useState(false);

    const toggle = () => {
        setOpened(!opened);
    };

    const getShortId = () => {
        return `${item.uuid.slice(0, 5)}...${item.uuid.slice(-5)}`;
    };

    return (
        <div className="webhook" onClick={toggle}>
            <div className="webhook__inner">
                <div className="webhook__inner-id">
                    <p className="webhook__inner-id-text">{getShortId()}</p>
                </div>
                <div className="webhook__inner-date">
                    <p className="webhook__inner-date-text">{item.date}</p>
                </div>
                <div className="webhook__inner-status">
                    <p
                        className={classNames({
                            'webhook__inner-status-text': true,
                            'webhook__inner-status-text--success':
                                item.status === 200,
                            'webhook__inner-status-text--error':
                                item.status === 500,
                        })}
                    >
                        {item.status}
                    </p>
                </div>
                <div className="webhook__inner-handler">
                    <IconChevron
                        className={classNames({
                            'webhook__inner-handler-icon': true,
                            'webhook__inner-handler-icon--active': opened,
                        })}
                    />
                </div>
            </div>
            {opened && (
                <div onClick={(event) => event.stopPropagation()}>
                    <div className="webhook__divider" />
                    <div className="webhook__extended">
                        <div className="webhook__extended-item">
                            <p className="webhook__extended-item-text webhook__extended-item-text--fixed">
                                Webhook URL:
                            </p>
                            <p className="webhook__extended-item-text">
                                {item.webhookURL}
                            </p>
                        </div>
                        <div className="webhook__extended-item">
                            <p className="webhook__extended-item-text webhook__extended-item-text--fixed">
                                Payment ID:
                            </p>
                            <p className="webhook__extended-item-text">
                                {item.uuid}
                            </p>
                        </div>
                        {/* replace with the condition if webhook has any details
                        or whatever it's called */}
                        {true && (
                            <div className="webhook__extended-details">
                                <p className="webhook__extended-details-text">
                                    "detail": "unauthorized"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
