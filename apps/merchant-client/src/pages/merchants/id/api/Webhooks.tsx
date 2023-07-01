import type { WebhookHistoryItem } from '../../../../components/pages/merchants/id/api/WebhookItem';
import { useState } from 'react';

import { MerchantWebhookItem } from '../../../../components/pages/merchants/id/api/WebhookItem';
import { MerchantApiForm } from '../../../../components/pages/merchants/id/api/Form';
import { PPagination } from '@poluspay-frontend/ui';

import './Webhooks.scoped.scss';
import { useGetWebhookHistoryQuery } from '../../../../store/api/endpoints';
import { useParams } from 'react-router-dom';

export const MerchantApiPage: React.FC = () => {
    const { id: merchantId } = useParams<{ id: string }>();
    if (!merchantId) {
        return null;
    }
    // const webhooks: WebhookHistoryItem[] = [
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b44e351e59',
    //         date: '28-05-2023, 18:00',
    //         status: 200,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b44e1e5',
    //         date: '28-05-2023, 18:00',
    //         status: 500,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b44e351e9',
    //         date: '28-05-2023, 18:00',
    //         status: 200,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b44e35159',
    //         date: '28-05-2023, 18:00',
    //         status: 500,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b44e35e59',
    //         date: '28-05-2023, 18:00',
    //         status: 200,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b44e351e5',
    //         date: '28-05-2023, 18:00',
    //         status: 500,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf5-52b44e351e9',
    //         date: '28-05-2023, 18:00',
    //         status: 200,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-b53-52b44e35159',
    //         date: '28-05-2023, 18:00',
    //         status: 500,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4bd-bf53-52b44e351e5',
    //         date: '28-05-2023, 18:00',
    //         status: 500,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca217e-e429-4cbd-bf53-52b4e351e9',
    //         date: '28-05-2023, 18:00',
    //         status: 200,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    //     {
    //         uuid: '90ca17e-e429-4cbd-bf53-52b44e35159',
    //         date: '28-05-2023, 18:00',
    //         status: 500,
    //         webhookURL: 'app.polus.fi/game/shop/hyeta',
    //     },
    // ];

    const { data: webhooks, isLoading: isWebhooksLoading } =
        useGetWebhookHistoryQuery({
            merchant_id: merchantId,
        });

    const [current, setCurrent] = useState(1);
    const limit = 10;

    const webhooksPaginated =
        webhooks?.data.slice(
            (current - 1) * limit,
            (current - 1) * limit + limit
        ) ?? [];

    const onPageChange = (value: number) => {
        setCurrent(value);
    };

    return (
        <div className="webhooks">
            <div className="webhooks__form">
                <MerchantApiForm merchantId={merchantId} />
            </div>
            {!webhooks && isWebhooksLoading && <div>Loading...</div>}
            <div className="webhooks__inner">
                <h6 className="webhooks__inner-title">WebHook History</h6>
                <div className="webhooks__inner-table-wrapper">
                    <div className="webhooks__inner-table">
                        <div className="webhooks__inner-table__headline">
                            <div className="webhooks__inner-table__headline-id">
                                UUID
                            </div>
                            <div className="webhooks__inner-table__headline-date">
                                Date
                            </div>
                            <div className="webhooks__inner-table__headline-status">
                                Status
                            </div>
                        </div>
                        <div className="webhooks__inner-table__container">
                            {webhooksPaginated.map((el) => (
                                <MerchantWebhookItem
                                    item={{
                                        date: el.created_at,
                                        status: el.response_status_code,
                                        uuid: el.id,
                                        webhookURL: el.endpoint,
                                    }}
                                    key={el.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {webhooks && webhooks.totalCount > limit && (
                    <div className="webhooks__inner-pagination">
                        <PPagination
                            current={current}
                            totalItems={webhooks.totalCount}
                            pageItems={limit}
                            onPageChange={(value) => onPageChange(value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
