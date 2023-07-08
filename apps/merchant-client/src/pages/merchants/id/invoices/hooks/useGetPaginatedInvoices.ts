import { getPaymentAssetInfo } from '@poluspay-frontend/api';
import { useGetPaymentByMerchantIdQuery } from '@poluspay-frontend/merchant-query';
import { Invoice } from 'apps/merchant-client/src/components/pages/merchants/id/invoices/Table';
import { useGetMerchantIdFromParams } from 'apps/merchant-client/src/hooks/useGetMerchantId';
import { useGetAssetsQuery } from 'apps/merchant-client/src/store/api/endpoints/asset/Asset';
import { useEffect, useState } from 'react';
import { formatDate } from 'tools';
import { formatUnits } from 'viem';

export const useGetPaginatedInvoices = ({
    current,
    limit,
}: {
    current: number;
    limit: number;
}) => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const merchantId = useGetMerchantIdFromParams();
    const { data: invoicesResponse, isFetching: isInvoiceLoading } =
        useGetPaymentByMerchantIdQuery({
            merchant_id: merchantId,
            limit,
            offset: current * limit - limit,
        });

    const { data: availableAssets, isLoading: isAvailableAssetsLoading } =
        useGetAssetsQuery();

    useEffect(() => {
        if (isAvailableAssetsLoading || isInvoiceLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isAvailableAssetsLoading, isInvoiceLoading]);

    useEffect(() => {
        console.log(invoices);
    }, [invoices]);

    useEffect(() => {
        if (invoicesResponse && availableAssets) {
            setInvoices(
                invoicesResponse.data.map((invoice): Invoice => {
                    const paymentInfo = getPaymentAssetInfo(invoice);
                    const createdAt = new Date(invoice.created_at);
                    let amount: string;
                    let currency: string;
                    if (paymentInfo.asset) {
                        amount = formatUnits(
                            BigInt(paymentInfo.asset.amount),
                            availableAssets.decimals[
                                paymentInfo.asset.blockchain
                            ][paymentInfo.asset.asset]
                        );
                        currency = paymentInfo.asset.asset;
                    } else {
                        amount = currency = "asset didn't set";
                    }
                    return {
                        id: invoice.id,
                        amount,
                        currency,
                        hash: {
                            value: invoice.transaction?.hash ?? '-',
                            link: invoice.transaction?.hash,
                            isSettled: Boolean(invoice.transaction?.hash),
                        },
                        date: formatDate(createdAt),
                        status:
                            invoice.status === 'pending' &&
                            new Date(invoice.expires_at).getTime() < Date.now()
                                ? 'expired'
                                : invoice.status,
                    };
                })
            );
        }
    }, [invoicesResponse, availableAssets]);
    return {
        invoices,
        isLoading,
        totalItems: invoicesResponse?.totalCount ?? 0,
    };
};