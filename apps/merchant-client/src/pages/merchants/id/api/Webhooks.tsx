import type { WebhookHistoryItem } from '../../../../components/pages/merchants/id/api/WebhookItem';
import { useState } from 'react';

import { MerchantWebhookItem } from '../../../../components/pages/merchants/id/api/WebhookItem';
import { MerchantApiForm } from '../../../../components/pages/merchants/id/api/Form';
import { PPagination } from '@poluspay-frontend/ui';

import './Webhooks.scoped.scss';
import { useGetWebhookHistoryQuery } from '../../../../store/api/endpoints';
import { useParams } from 'react-router-dom';
import { Loader } from 'apps/merchant-client/src/components/ui/Loader/Loader';
import { ErrorBlock } from 'apps/merchant-client/src/components/ui/Error/Error';

export const MerchantApiPage: React.FC = () => {
    const { id: merchantId } = useParams<{ id: string }>();

    if (!merchantId) return null

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
            <h6 className="webhooks__title">
                WebHook History
            </h6>
            {isWebhooksLoading ? (
                <Loader />
            ) : !webhooks?.data.length ? (
                <ErrorBlock />
            ) : (
                <div className="webhooks__inner">
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
                    {webhooks.totalCount > limit && (
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
            )}
        </div>
    );
};
