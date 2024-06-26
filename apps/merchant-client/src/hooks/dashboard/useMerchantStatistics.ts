import type { StatsElement } from '../../components/pages/dashboard/Stats/StatsElement/StatsElement';

import { useEffect, useState } from 'react';

import { useGetMerchantStatisticsQuery } from '@poluspay-frontend/merchant-query';
import { IGetMerchantStatisticsResponse } from '../../store/api/endpoints/merchant/Merchant.interface';

interface IUseMerchantStatistics {
    merchantId?: string;
    fromData: string;
    toData: string;
}

export interface ChartData
    extends Pick<
        IGetMerchantStatisticsResponse,
        'success_payments_per_day' | 'total_payments_per_day'
    > {}

export const useMerchantStatistics = ({
    merchantId,
    toData,
    fromData,
}: IUseMerchantStatistics) => {
    const {
        data: statistics,
        isLoading,
        isError,
    } = useGetMerchantStatisticsQuery({
        merchant_id: merchantId,
        from_date: fromData,
        to_date: toData,
    });

    const [staticsBlock, setStaticsBlock] = useState<StatsElement[]>();
    const [chartData, setChartData] = useState<ChartData>();

    useEffect(() => {
        if (statistics) {
            const amountOfProceeds =
                statistics.turnover_detalization?.reduce(
                    (acc, item) => acc + +item.amount_decimals,
                    0
                ) || 0;

            const successFullPayments = statistics.success_payments;
            const conversationRate =
                (successFullPayments / statistics.total_payments) * 100 || 0;
            const averageBill = amountOfProceeds / successFullPayments || 0;
            const isRed = conversationRate < 1;
            const isYellow = conversationRate >= 1 && conversationRate <= 10;
            const isGreen = conversationRate > 10;

            setStaticsBlock([
                {
                    id: 1,
                    value: `${amountOfProceeds.toFixed(2)}$`,
                    description: 'Amount of proceeds',
                },
                {
                    id: 2,
                    value: successFullPayments.toString(),
                    description: 'Successful payments',
                    additional: successFullPayments
                        ? `${conversationRate.toFixed(2)}% conversion rate`
                        : undefined,
                    additionalColor: {
                        red: isRed,
                        yellow: isYellow,
                        green: isGreen,
                    },
                },
                {
                    id: 3,
                    value: `${averageBill.toFixed(2)}$`,
                    description: 'Average bill',
                },
                {
                    id: 4,
                    value: `${statistics.total_payments}`,
                    description: 'Total payments',
                },
                // {
                //   id: 5,
                //   value: '1 min ago',
                //   description: 'Last payment',
                // },
            ]);
            setChartData({
                total_payments_per_day: statistics.total_payments_per_day,
                success_payments_per_day: statistics.success_payments_per_day,
            });
        }
    }, [statistics]);

    return { staticsBlock, isError, isLoading, chartData };
};
