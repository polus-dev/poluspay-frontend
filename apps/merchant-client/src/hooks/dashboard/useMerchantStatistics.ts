import type { StatsElement } from '../../components/pages/dashboard/Stats/StatsElement/StatsElement';

import { useEffect, useState } from 'react';

import { useGetMerchantStatisticsQuery } from '@poluspay-frontend/merchant-query';

interface IUseMerchantStatistics {
    merchantId: string;
    fromData: string;
    toData: string;
}

export const useMerchantStatistics = ({
    merchantId,
    toData,
    fromData,
}: IUseMerchantStatistics) => {
    // const {data: statistics} = useGetMerchantStatisticsQuery({merchant_id: "b971ae03-b78c-4b62-823b-59e751691e01", from_date: "2023-06-30T21:00:00.000Z", to_date: "2023-07-24T10:57:00.418Z"});
    const { data: statistics } = useGetMerchantStatisticsQuery({
        merchant_id: merchantId,
        from_date: fromData,
        to_date: toData,
    });
    const [staticsBlock, setStaticsBlock] = useState<StatsElement[]>();
    useEffect(() => {
        if (statistics) {
            const amountOfProceeds =
                statistics.turnover_detalization?.reduce(
                    (acc, item) => acc + +item.amount_decimals,
                    0,
                ) || 0;
            const successFullPayments = statistics.success_payments;
            const conversationRate =
                (successFullPayments / statistics.total_payments) * 100 || 0;
            const averageBill = amountOfProceeds / successFullPayments || 0;
            setStaticsBlock([
                {
                    id: 1,
                    value: `${amountOfProceeds}$`,
                    description: 'Amount of proceeds',
                },
                {
                    id: 2,
                    value: successFullPayments.toString(),
                    description: 'Successful payments',
                    additional: `${conversationRate}% conversion rate`,
                },
                {
                    id: 3,
                    value: `${averageBill}$`,
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
        }
    }, [statistics]);
    return { staticsBlock };
};
