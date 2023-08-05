import { FormFooter } from '../../Footer/Footer';
import { FormHeader } from '../../Header/Header';
import { ReactComponent as IconCheckmark } from '../../../../../assets/icons/checkmark.svg';

import './Success.scoped.scss';

const MockHeaderData = {
    description: 'desc',
    amount: '1',
    currency: 'usdt',
};

export const FormSuccess: React.FC = () => {
    return (
        <div className="success">
            <div className="success__header">
                <FormHeader payment={{ ...MockHeaderData }} />
            </div>
            <div className="success__content">
                <IconCheckmark className="success__content-icon" />
                <p className="success__content-text">The invoice is paid</p>
            </div>
            <div className="success__footer">
                <FormFooter hasLegal={false} />
            </div>
        </div>
    );
};
