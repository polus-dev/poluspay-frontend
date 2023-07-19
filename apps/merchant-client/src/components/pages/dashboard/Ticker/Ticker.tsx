import classNames from 'classnames';
import './Ticker.scoped.scss';

export const DashboardTicker: React.FC = () => {
    const shift: number = 1;

    const getShiftSymbol = () => {
        if (shift === 0) return undefined;

        return shift > 0 ? '+' : '-';
    };

    return (
        <div className="ticker">
            <div className="ticker__data">
                <img
                    className="ticker__data-image"
                    src="/images/wallets/bitcoin.png"
                    alt="Asset logo"
                />
                <div className="ticker__data-inner">
                    <p className="ticker__data-inner-name">BTC</p>
                    <p className="ticker__data-inner-label">Bitcoin</p>
                </div>
            </div>
            <div className="ticker__price">
                <p className="ticker__price-value">265.40$</p>
                <p
                    className={classNames({
                        'ticker__price-shift': true,
                        'ticker__price-shift--positive': shift > 0,
                        'ticker__price-shift--negative': shift < 0,
                    })}
                >
                    {getShiftSymbol()}
                    {shift}%
                </p>
            </div>
        </div>
    );
};
