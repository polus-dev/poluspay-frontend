import type { StatsElement } from '../../components/pages/dashboard/Stats/StatsElement/StatsElement';

import { useEffect, useState } from 'react';

import { useGetMerchantStatisticsQuery } from '@poluspay-frontend/merchant-query';

interface IUseMerchantStatistics {
    merchantId?: string;
    fromData: string;
    toData: string;
}

export const useMerchantStatistics = ({
    merchantId,
    toData,
    fromData,
}: IUseMerchantStatistics) => {
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
                    0
                ) || 0;
            const successFullPayments = statistics.success_payments;
            const conversationRate =
                (successFullPayments / statistics.total_payments) * 100 || 0;
            const averageBill = amountOfProceeds / successFullPayments || 0;
          const isRed = conversationRate < 1;
          const isYellow = conversationRate <= 10;
          const isGreen = conversationRate > 10;
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
                    additional: `${conversationRate.toFixed(
                        2
                    )}% conversion rate`,
                  additionalColor: {
                      red: isRed,
                      yellow: isYellow,
                      green: isGreen
                  }
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
