import { useState } from 'react';

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

const data = () => {
    return {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        datasets: [
            {
                label: 'turnover',
                data: [
                    123, 321, 435, 456, 234, 678, 453, 634, 254, 263, 568, 122,
                ],
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
                label: 'invoices',
                data: [
                    468, 301, 475, 780, 806, 467, 678, 345, 978, 568, 235, 465,
                ],
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
};

export const DashboardBarChart: React.FC = () => {
    const tabs = [
        { id: 'day', text: 'Day' },
        { id: 'week', text: 'Week' },
        { id: 'month', text: 'Month' },
    ];

    const [tab, setTab] = useState(tabs[2]);

    return (
        <div className="bar">
            <div className="bar__header">
                <h6 className="bar__header-title">Invoices</h6>
                <div className="bar__header-tabs">
                    <PTabs
                        size="sm"
                        active={tab}
                        items={tabs}
                        onChange={(item) => setTab(item)}
                    />
                </div>
            </div>
            <div className="bar__chart">
                <Bar options={options} data={data()} />
            </div>
        </div>
    );
};
