import type { StatsBlock } from '../../components/pages/dashboard/StatsBlock/StatsBlock';


import { PSelect } from '@poluspay-frontend/ui';
import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';

import './Dashboard.scoped.scss';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';
import {useMerchantOptions} from "./hooks/useMerchantOptions";
import {StatsBlockContainer} from "./StatsBlockContainer";
import {TickersContainer} from "./TickersContainer";

export const DashboardPage: React.FC = () => {
  const {merchantsOptions, selectedMerchant, setSelectedMerchant} = useMerchantOptions();

    const staticsBlock: StatsBlock[] = [
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
          <TickersContainer />
          <StatsBlockContainer />
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
