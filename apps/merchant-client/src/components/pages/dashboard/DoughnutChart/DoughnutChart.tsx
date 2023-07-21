import type { FilledBar } from '../FilledBar/FilledBar';

import { useState } from 'react';

import { useModal } from '../../../../hooks/useModal';

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { PTabs } from '@poluspay-frontend/ui';
import { DashboardFilledBar } from '../FilledBar/FilledBar';
import { ModalDashboardCurrencies } from '../../../modals/DashboardCurrencies/DashboardCurrencies';

import './DoughnutChart.scoped.scss';

ChartJS.register(ArcElement, Tooltip);
ChartJS.defaults.plugins.legend.display = false;

const doughnutData = {
    labels: ['BNB', 'Ethereum', 'MATIC', 'USDT', 'USDC', 'PLS'],
    datasets: [
        {
            label: 'qwe',
            data: [123, 321, 234, 432, 456, 654],
            backgroundColor: [
                '#FCAD1E',
                '#FAF305',
                '#1B9628',
                '#A5EAAC',
                '#39E849',
                '#FD6438',
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

const filledConf: FilledBar[] = [
    { label: 'BNB', value: '$125000', color: '#FCAD1E', fill: 100 },
    { label: 'Ethereum', value: '$125000', color: '#FAF305', fill: 65 },
    { label: 'MATIC', value: '$125000', color: '#1B9628', fill: 54 },
    { label: 'USDT', value: '$125000', color: '#39E849', fill: 32 },
    { label: 'Other', value: '$125000', color: '#A5EAAC', fill: 12 },
];

export const DashboardDoughnutChart: React.FC = () => {
    const tabs = [
        { id: 'day', text: 'Day' },
        { id: 'week', text: 'Week' },
        { id: 'month', text: 'Month' },
    ];

    const [tab, setTab] = useState(tabs[2]);

    const modal = useModal();

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
                        {filledConf.map((item, index) => (
                            <div key={item.label}>
                                <DashboardFilledBar
                                    item={item}
                                    clickable={index === filledConf.length - 1}
                                    onClick={modal.open}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalDashboardCurrencies
                visible={modal.visible}
                onClose={modal.close}
            />
        </div>
    );
};
