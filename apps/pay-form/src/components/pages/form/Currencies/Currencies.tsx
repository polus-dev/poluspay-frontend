import { FormCurrencyItem } from './CurrencyItem/CurrencyItem';

import './Currencies.scoped.scss';

export const FormCurrencies: React.FC = () => {
    return (
        <div className="currencies">
            {[1, 2, 3, 4].map((el) => (
                <div
                    className="currencies__item"
                    key={el}
                    onClick={() => console.log('set selected')}
                >
                    <FormCurrencyItem active={el === 1} />
                </div>
            ))}
        </div>
    );
};
