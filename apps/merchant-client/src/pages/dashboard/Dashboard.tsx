import { ErrorBlock } from '../../../../../libs/ui/src/lib/Error/Error';
import { DashboardTickers } from '../../components/pages/dashboard/Tickers/Tickers';
import { DashboardStats } from '../../components/pages/dashboard/Stats/Stats';
import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';

import './Dashboard.scoped.scss';

export const DashboardPage: React.FC = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__tickers">
                <DashboardTickers />
            </div>
            <div className="dashboard__stats">
                <DashboardStats />
            </div>
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
                <ErrorBlock title="Charts temporarily unavailable" />
            )}
        </div>
    );
};
