import { ReactComponent as IconLoading } from '../../../../../assets/icons/loading.svg';

import './Processing.scoped.scss';

export const FormProcessing: React.FC = () => {
    return (
        <div className="processing">
            <div className="processing__inner">
                <IconLoading className="processing__inner-icon" />
                <p className="processing__inner-text">
                    The payment is being processed
                </p>
            </div>
        </div>
    );
};
