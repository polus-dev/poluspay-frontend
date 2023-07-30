import { ErrorBlock } from '../../../../../libs/ui/src/lib/Error/Error';
import { Loader } from '../../components/ui/Loader/Loader';
import { DashboardTickers } from '../../components/pages/dashboard/Tickers/Tickers';
import { DashboardStats } from '../../components/pages/dashboard/Stats/Stats';
import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';

import './Dashboard.scoped.scss';

export const DashboardPage: React.FC = () => {
    // change to 'no data found...' when charts will become available
    const errorTitle = 'Temporarily unavailable';

    const isBarLoading = false;
    const isDoughnutLoading = false;

    const isBarError = true;
    const isDoughnutError = true;

    return (
        <div className="dashboard">
            <div className="dashboard__tickers">
                <DashboardTickers />
            </div>
            <div className="dashboard__stats">
                <DashboardStats />
            </div>
            <div className="dashboard__charts">
                <h6 className="dashboard__charts-title">Statistics</h6>
                <div className="dashboard__charts-container">
                    <div className="dashboard__charts-container-item">
                        {isBarLoading ? (
                            <Loader hasBackground={false} />
                        ) : isBarError ? (
                            <ErrorBlock
                                title={errorTitle}
                                hasBackground={false}
                            />
                        ) : (
                            <DashboardBarChart />
                        )}
                    </div>
                    <div className="dashboard__charts-container-item">
                        {isDoughnutLoading ? (
                            <Loader hasBackground={false} />
                        ) : isDoughnutError ? (
                            <ErrorBlock
                                title={errorTitle}
                                hasBackground={false}
                            />
                        ) : (
                            <DashboardDoughnutChart />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
