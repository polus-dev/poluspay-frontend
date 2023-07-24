import type { StatsBlock } from '../../components/pages/dashboard/StatsBlock/StatsBlock';
import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';
import './Dashboard.scoped.scss';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';
import { StatsBlockContainer } from './StatsBlockContainer';
import { TickersContainer } from './TickersContainer';
import { ErrorBlock } from '../../../../../libs/ui/src/lib/Error/Error';

export const DashboardPage: React.FC = () => {
    // const staticsBlock: StatsBlock[] = [
    //     {
    //         id: 1,
    //         value: '429.607$',
    //         description: 'Amount of proceeds',
    //     },
    //     {
    //         id: 2,
    //         value: '429.607',
    //         description: 'Successful payments',
    //         additional: '73% conversion rate',
    //     },
    //     {
    //         id: 3,
    //         value: '429.607$',
    //         description: 'Average bill',
    //     },
    //     {
    //         id: 4,
    //         value: '1 min ago',
    //         description: 'Last payment',
    //     },
    // ];

    return (
        <div className="dashboard">
            <TickersContainer />
            <StatsBlockContainer />
            {import.meta.env.DEV ? (
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
            ) : (
                <ErrorBlock title={'Charts temporarily unavailable'} />
            )}
        </div>
    );
};
