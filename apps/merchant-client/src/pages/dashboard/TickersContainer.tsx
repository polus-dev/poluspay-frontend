import {DashboardTicker} from "../../components/pages/dashboard/Ticker/Ticker";
import {useTicker} from "./hooks/useTicker";
import {useAutoAnimate} from "@formkit/auto-animate/react";

import './Dashboard.scoped.scss';
export const TickersContainer = () => {
  const {tickers} = useTicker();
  const [animateRef] = useAutoAnimate();

  return (
    <div ref={animateRef} className="dashboard__tickers">
    {tickers?.map((ticker) => (
      <div className="dashboard__tickers-item" key={ticker.fullName}>
        <DashboardTicker {...ticker} />
      </div>
    ))}
  </div>
  )
}
