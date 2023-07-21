import type { SelectOption } from '@poluspay-frontend/ui';
import type { StatsBlock } from '../../components/pages/dashboard/StatsBlock/StatsBlock';

import { useState } from 'react';

import { PSelect } from '@poluspay-frontend/ui';
import { DashboardTicker } from '../../components/pages/dashboard/Ticker/Ticker';
import { DashboardStatsBlock } from '../../components/pages/dashboard/StatsBlock/StatsBlock';
import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';

import './Dashboard.scoped.scss';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';

export const DashboardPage: React.FC = () => {
    const options: SelectOption[] = [
        { id: 'all', text: 'All merchants' },
        { id: 'me', text: 'My merchants' },
        { id: 'his', text: 'His merchants' },
        { id: 'her', text: 'Her merchants' },
    ];

    const [selected, setSelected] = useState<SelectOption[]>([options[0]]);

    const stats: StatsBlock[] = [
        {
            id: 1,
            value: '429.607$',
            description: 'Amount of proceeds',
        },
        {
            id: 2,
            value: '429.607',
            description: 'Successful payments',
            additional: '73% conversion rate',
        },
        {
            id: 3,
            value: '429.607$',
            description: 'Average bill',
        },
        {
            id: 4,
            value: '1 min ago',
            description: 'Last payment',
        },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard__tickers">
                {[1, 2, 3].map((el) => (
                    <div className="dashboard__tickers-item" key={el}>
                        <DashboardTicker />
                    </div>
                ))}
            </div>
            <div className="dashboard__stats">
                <div className="dashboard__stats-header">
                    <h6 className="dashboard__stats-header-title">
                        Dashboard total
                    </h6>
                    <div className="dashboard__stats-header-select">
                        <PSelect
                            options={options}
                            active={selected}
                            onChange={(value) => setSelected(value)}
                        />
                    </div>
                </div>
                <div className="dashboard__stats-container">
                    {stats.map((el) => (
                        <div
                            className="dashboard__stats-container-item"
                            key={el.id}
                        >
                            <DashboardStatsBlock item={el} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="dashboard__charts">
                <h6 className="dashboard__charts-title">Statistics</h6>
                <div className="dashboard__charts-container">
                    <div className="dashboard__charts-container-item">
                        <DashboardBarChart />
                    </div>
                    <div className="dashboard__charts-container-item">
                        <DashboardDoughnutChart />
                    </div>
                </div>
            </div>
        </div>
    );
};
