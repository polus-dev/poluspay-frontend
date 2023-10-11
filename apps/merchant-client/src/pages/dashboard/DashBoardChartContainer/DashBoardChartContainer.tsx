import { useRef, useState } from 'react';

import { useMerchantStatistics } from '../../../hooks/dashboard/useMerchantStatistics';
import { DateUnion, getBeginningOfDate } from '@poluspay-frontend/utils';

import { Loader, ErrorBlock } from '@poluspay-frontend/ui';
import { DashboardBarChart } from '../../../components/pages/dashboard/BarChart/BarChart';
import { DashboardDoughnutChart } from '../../../components/pages/dashboard/DoughnutChart/DoughnutChart';

import '../Dashboard.scoped.scss';

interface DashBoardChartContainerProps {
    merchantId?: string;
}

export const DashBoardChartContainer = (
    props: DashBoardChartContainerProps
) => {
    const errorTitle = 'Temporarily unavailable';
    const emptyTitle = 'No data available';
    const toData = useRef(new Date().toISOString());
    const [fromData, setFromData] = useState<DateUnion>('month');

    const { staticsBlock, isError, isLoading, chartData } =
        useMerchantStatistics({
            merchantId: props.merchantId,
            toData: toData.current,
            fromData: getBeginningOfDate(fromData).toISOString(),
        });

    const isBarLoading = isLoading;
    const isDoughnutLoading = isLoading;

    const isBarError = isError;
    const isDoughnutError = true;

    return (
        <div className="dashboard__charts-container">
            <div className="dashboard__charts-container-item">
                {isBarLoading ? (
                    <Loader hasBackground={false} />
                ) : isBarError ||
                  chartData?.total_payments_per_day.length === 0 ? (
                    <ErrorBlock
                        title={
                            chartData?.total_payments_per_day.length === 0
                                ? emptyTitle
                                : errorTitle
                        }
                        hasBackground={false}
                    />
                ) : chartData ? (
                    <DashboardBarChart
                        statistics={chartData}
                        fromData={fromData}
                        setFromData={setFromData}
                    />
                ) : null}
            </div>
            <div className="dashboard__charts-container-item">
                {isDoughnutLoading ? (
                    <Loader hasBackground={false} />
                ) : isDoughnutError ? (
                    <ErrorBlock title={errorTitle} hasBackground={false} />
                ) : staticsBlock ? (
                    <DashboardDoughnutChart />
                ) : null}
            </div>
        </div>
    );
};
