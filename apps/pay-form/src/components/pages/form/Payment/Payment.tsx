import { FormCurrencies } from './Currencies/Currencies';
import { FormSelect } from './Select/Select';
import { FormTimer } from './Timer/Timer';

import './Payment.scoped.scss';

export const FormPayment: React.FC = () => {
    return (
        <div className="payment">
            <div className="payment__select">
                <FormSelect
                    item={{ image: '', text: '' }}
                    onClick={() => console.log('open modal')}
                />
            </div>
            <div className="payment__currencies">
                <FormCurrencies />
            </div>
            <div className="payment__timer">
                <FormTimer />
            </div>
        </div>
    );
};
