import { useState } from 'react';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

import { PTabs } from '@poluspay-frontend/ui';

import './DoughnutChart.scoped.scss';

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);
ChartJS.defaults.plugins.legend.display = false;

const doughnutData = {
    labels: ['BNB', 'Ethereum', 'MATIC', 'USDT', 'USDC', 'PLS'],
    datasets: [
        {
            label: 'qwe',
            data: [123, 321, 234, 432, 456, 654],
            backgroundColor: [
                '#FAF305',
                '#1B9628',
                '#A5EAAC',
                '#39E849',
                '#FD6438',
                '#FCAD1E',
            ],
            borderWidth: 0,
            borderRadius: 12,
            offset: 30,
            hoverOffset: 20,
        },
    ],
    options: {
        legend: {
            display: false,
        },
    },
};

const barOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
        x: {
            ticks: {
                display: false,
            },
        },
    },
};

const barData = {
    labels: ['BNB', 'Ethereum', 'MATIC', 'USDT', 'USDC', 'PLS'],
    datasets: [
        {
            label: 'qwe',
            data: [123, 321, 234, 432, 456, 654],
            backgroundColor: [
                '#FAF305',
                '#1B9628',
                '#A5EAAC',
                '#39E849',
                '#FD6438',
                '#FCAD1E',
            ],
            barPercentage: 0.2,
            categoryPercentage: 1,
            borderRadius: 40,
            borderSkipped: false,
        },
    ],
};

export const DashboardDoughnutChart: React.FC = () => {
    const tabs = [
        { id: 'day', text: 'Day' },
        { id: 'week', text: 'Week' },
        { id: 'month', text: 'Month' },
    ];

    const [tab, setTab] = useState(tabs[2]);

    return (
        <div className="doughnut">
            <div className="doughnut__header">
                <h6 className="doughnut__header-title">Currencies</h6>
                <div className="doughnut__header-tabs">
                    <PTabs
                        size="sm"
                        active={tab}
                        items={tabs}
                        onChange={(item) => setTab(item)}
                    />
                </div>
            </div>
            <div className="doughnut__container">
                <div className="doughnut__container-chart">
                    <Doughnut data={doughnutData} />
                </div>
                <div className="doughnut__container-bar">
                    <div className="doughnut__container-bar__stats">
                        <p className="doughnut__container-bar__stats-value">
                            $123 123
                        </p>
                        <p className="doughnut__container-bar__stats-description">
                            this month sale volume is 7.3% larger than last
                            month
                        </p>
                    </div>
                    <div className="doughnut__container-bar__chart">
                        <Bar options={barOptions} data={barData} />
                    </div>
                </div>
            </div>
        </div>
    );
};
