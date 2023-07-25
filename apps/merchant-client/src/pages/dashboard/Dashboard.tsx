import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';
import './Dashboard.scoped.scss';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';
import { StatsBlockContainer } from './StatsBlockContainer';
import { TickersContainer } from './TickersContainer';
import { ErrorBlock } from '../../../../../libs/ui/src/lib/Error/Error';

export const DashboardPage: React.FC = () => {
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
