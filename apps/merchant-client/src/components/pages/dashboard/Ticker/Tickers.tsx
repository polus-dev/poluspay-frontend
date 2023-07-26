import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTicker } from "../../../../hooks/dashboard/useTicker";

import { DashboardTickerElement } from "./TickerElement/TickerElement";

import './Tickers.scoped.scss';

export const DashboardTickers: React.FC = () => {
    const [animateRef] = useAutoAnimate();

    const {tickers} = useTicker();

    return (
        <div ref={animateRef} className="tickers">
            {tickers?.map((ticker) => (
                <div className="tickers__item" key={ticker.fullName}>
                    <DashboardTickerElement {...ticker} />
                </div>
            ))}
        </div>
    )
}
