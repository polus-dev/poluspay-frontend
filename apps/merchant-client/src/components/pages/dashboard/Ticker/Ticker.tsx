import classNames from 'classnames';
import './Ticker.scoped.scss';
export interface TickerProps {
    shift: string;
    shiftPercent: string;
    name: string;
    fullName: string;
    price: string;
    image: string;
}
export const DashboardTicker = (props: TickerProps) => {
    const getShiftSymbol = (shift: number) => {
        if (shift === 0) return undefined;

        return shift > 0 ? '+' : '-';
    };

    return (
        <div className="ticker">
            <div className="ticker__data">
                <img
                    className="ticker__data-image"
                    src={props.image}
                    alt="Asset logo"
                />
                <div className="ticker__data-inner">
                    <p className="ticker__data-inner-name">{props.name}</p>
                    <p className="ticker__data-inner-label">{props.fullName}</p>
                </div>
            </div>
            <div className="ticker__price">
                <p className="ticker__price-value">{props.price}$</p>
                <p
                    className={classNames({
                        'ticker__price-shift': true,
                        'ticker__price-shift--positive': +props.shiftPercent > 0,
                        'ticker__price-shift--negative': +props.shiftPercent < 0,
                    })}
                >
                    {getShiftSymbol(+props.shiftPercent)}
                    {Math.abs(+props.shiftPercent)}%
                </p>
            </div>
        </div>
    );
};
