import {useCallback, useState} from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ScriptableContext,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { PTabs } from '@poluspay-frontend/ui';

import './BarChart.scoped.scss';
import {DateUnion} from "../../../../../../../tools";
import {ChartData} from "../../../../hooks/dashboard/useMerchantStatistics";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
    scales: {
        y: {
            grid: {
                color: '#2D2D37',
            },
        },
    },
};


interface DashBoardBarChartProps {
    fromData: DateUnion;
    setFromData: (d: DateUnion) => void;
    statistics: ChartData;
}

export const DashboardBarChart = (props: DashBoardBarChartProps) => {
    const tabs: {id:DateUnion, text: DateUnion}[] = [
        { id: 'day', text: 'day' },
        { id: 'week', text: 'week' },
        { id: 'month', text: 'month' },
    ];



    const data = useCallback(() => {
        const successPayments: number[] = props.statistics.total_payments_per_day.map(totalEL =>  {
            const successEL = props.statistics.success_payments_per_day.find(successEL => successEL.posting_date === totalEL.posting_date)
            return successEL ? successEL.count : 0
        });
        return {
            labels: props.statistics.total_payments_per_day.map((el) => el.posting_date),

            datasets: [
                {
                    label: 'total payments',
                    data: props.statistics.total_payments_per_day.map(el => el.count),
                    barPercentage: 0.8,
                    categoryPercentage: 0.3,
                    backgroundColor: (context: ScriptableContext<'bar'>) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 600);
                        gradient.addColorStop(0, '#FBE945');
                        gradient.addColorStop(1, '#B4801B');

                        return gradient;
                    },
                    borderRadius: 40,
                    borderSkipped: false,
                },
                {
                    label: 'success payments',
                    data: successPayments,
                    barPercentage: 0.8,
                    categoryPercentage: 0.3,
                    backgroundColor: (context: ScriptableContext<'bar'>) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 600);
                        gradient.addColorStop(0, '#24C190');
                        gradient.addColorStop(1, '#0E7C3A');

                        return gradient;
                    },
                    borderRadius: 40,
                    borderSkipped: false,
                },
            ],
        };
    }, [props.statistics]);


    return (
        <div className="bar">
            <div className="bar__header">
                <h6 className="bar__header-title">Invoices</h6>
                <div className="bar__header-tabs">
                    <PTabs
                        size="sm"
                        active={{id: props.fromData, text: props.fromData}}
                        items={tabs}
                        onChange={(item) => props.setFromData(item.id as DateUnion)}
                    />
                </div>
            </div>
            <div className="bar__chart">
                <Bar options={options} data={data()} />
            </div>
        </div>
    );
};
