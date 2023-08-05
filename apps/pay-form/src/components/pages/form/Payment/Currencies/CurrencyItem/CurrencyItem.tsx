import classNames from 'classnames';

import './CurrencyItem.scoped.scss';

interface CurrencyItemProps {
    active: boolean;
}

export const FormCurrencyItem: React.FC<CurrencyItemProps> = ({ active }) => {
    return (
        <div
            className={classNames({
                currency: true,
                'currency--active': active,
            })}
        >
            <div className="currency__inner">
                <img
                    className="currency__inner-image"
                    src="/images/polygon.png"
                    alt="MATIC"
                />
                <p className="currency__inner-text">MATIC</p>
            </div>
        </div>
    );
};
