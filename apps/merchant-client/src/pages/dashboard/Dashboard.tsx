import { ErrorBlock } from '../../../../../libs/ui/src/lib/Error/Error';
import { Loader } from '../../components/ui/Loader/Loader';
import { DashboardTickers } from '../../components/pages/dashboard/Tickers/Tickers';
import { DashboardStats } from '../../components/pages/dashboard/Stats/Stats';
import { DashboardBarChart } from '../../components/pages/dashboard/BarChart/BarChart';
import { DashboardDoughnutChart } from '../../components/pages/dashboard/DoughnutChart/DoughnutChart';

import './Dashboard.scoped.scss';
import {
  DashBoardChartContainer
} from "./DashBoardChartContainer/DashBoardChartContainer";
import {useState} from "react";
import {SelectOption} from "@poluspay-frontend/ui";

export const DashboardPage: React.FC = () => {
  const [selectedMerchant, setSelectedMerchant] = useState<SelectOption[]>([]);
    return (
        <div className="dashboard">
            <div className="dashboard__tickers">
                <DashboardTickers />
            </div>
            <div className="dashboard__stats">
                <DashboardStats merchantOptions={selectedMerchant} setMerchantOptions={setSelectedMerchant} />
            </div>
            <div className="dashboard__charts">
                <h6 className="dashboard__charts-title">Statistics</h6>
              <DashBoardChartContainer />
            </div>
        </div>
    );
};
